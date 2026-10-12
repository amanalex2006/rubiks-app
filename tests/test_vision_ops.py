"""Selected OpenCL kernels preserve CPU results and recover from device failure."""

import time
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from scanner.frame_worker import LatestFrameWorker
from scanner.vision_ops import FrameOps


def patterned_frame(*, large=False):
    frame = np.zeros((600, 800, 3), np.uint8)
    colors = [(0, 0, 220), (0, 125, 220), (0, 220, 220),
              (0, 220, 0), (220, 0, 0), (220, 220, 220)]
    for index, color in enumerate(colors):
        row, col = divmod(index, 3)
        frame[40 + row*230:240 + row*230, 45 + col*230:250 + col*230] = color
    return cv.resize(frame, (1280, 720), interpolation=cv.INTER_NEAREST) if large else frame


class VisionOpsTests(unittest.TestCase):
    def test_cpu_selection_matches_opencv_and_reports_cpu(self):
        ops = FrameOps({"processing_backend": "cpu"})
        frame = patterned_frame()
        gray, hsv = ops.begin_frame(frame)
        np.testing.assert_array_equal(gray, cv.cvtColor(frame, cv.COLOR_BGR2GRAY))
        np.testing.assert_array_equal(hsv, cv.cvtColor(frame, cv.COLOR_BGR2HSV))
        self.assertFalse(ops.active)
        self.assertEqual(ops.info["name"], "CPU")
        self.assertEqual(ops.info["state"], "cpu")

    def test_real_opencl_conversion_mask_edges_and_warp_preserve_cpu_results(self):
        gpu = FrameOps("gpu")
        if not gpu.wait_ready(20):
            self.skipTest(f"No ready OpenCL GPU: {gpu.info}")
        cpu = FrameOps("cpu")
        frame = patterned_frame(large=True)
        cpu_gray, cpu_hsv = cpu.begin_frame(frame)
        gpu_gray, gpu_hsv = gpu.begin_frame(frame)
        self.assertTrue(gpu.active, gpu.info)
        self.assertTrue(gpu.info["device"])
        np.testing.assert_allclose(gpu_gray, cpu_gray, atol=1)
        hue_delta = np.abs(gpu_hsv[:, :, 0].astype(int) - cpu_hsv[:, :, 0].astype(int))
        self.assertLessEqual(int(np.minimum(hue_delta, 180-hue_delta).max()), 1)
        np.testing.assert_allclose(gpu_hsv[:, :, 1:], cpu_hsv[:, :, 1:], atol=1)
        kernel = cv.getStructuringElement(cv.MORPH_RECT, (15, 15))
        cpu_mask = cpu.cube_mask(cpu_hsv, 70, 40, 60, 90, kernel)
        gpu_mask = gpu.cube_mask(gpu_hsv, 70, 40, 60, 90, kernel)
        np.testing.assert_array_equal(gpu_mask, cpu_mask)
        cpu_edges, gpu_edges = cpu.edges(cpu_gray, 35, 100), gpu.edges(gpu_gray, 35, 100)
        self.assertGreaterEqual(float((gpu_edges == cpu_edges).mean()), .99)
        transform = np.array([[.91, .02, 5], [.015, .9, 8], [0, 0, 1]], np.float64)
        np.testing.assert_array_equal(
            gpu.warp(gpu_hsv, transform, (800, 600), flags=cv.INTER_NEAREST),
            cpu.warp(cpu_hsv, transform, (800, 600), flags=cv.INTER_NEAREST))

    def test_device_failure_falls_back_without_losing_the_frame(self):
        frame = patterned_frame(large=True)
        with patch.object(FrameOps, "_start_runtime"):
            ops = FrameOps("gpu")
        runtime = {"available": True, "device": "Test device", "state": "ready", "error": None}
        with patch.object(FrameOps, "_runtime", runtime), \
             patch("scanner.vision_ops.cv.UMat", side_effect=RuntimeError("Device disappeared")):
            gray, hsv = ops.begin_frame(frame)
            self.assertFalse(ops.active)
            self.assertEqual(ops.info["state"], "fallback")
            self.assertIn("Device disappeared", ops.info["error"])
        np.testing.assert_array_equal(gray, cv.cvtColor(frame, cv.COLOR_BGR2GRAY))
        np.testing.assert_array_equal(hsv, cv.cvtColor(frame, cv.COLOR_BGR2HSV))
        next_frame = frame.copy()
        next_frame[0, 0] = (30, 40, 50)
        self.assertEqual(int(ops.begin_frame(next_frame)[0][0, 0]),
                         int(cv.cvtColor(next_frame, cv.COLOR_BGR2GRAY)[0, 0]))

    def test_selected_backend_operates_on_the_camera_processing_thread(self):
        ops = FrameOps("auto")
        ops.wait_ready(20)

        def process(frame, context):
            cv.ocl.setUseOpenCL(False)
            gray, hsv = ops.begin_frame(frame)
            ops.edges(gray, 35, 100)
            return gray, hsv, ops.info, bool(cv.ocl.useOpenCL())

        worker = LatestFrameWorker(process)
        try:
            frame = patterned_frame()
            sequence = worker.submit(frame)
            deadline = time.monotonic() + 3
            result = None
            while time.monotonic() < deadline:
                result = worker.poll()
                if result is not None:
                    break
                time.sleep(.005)
            self.assertIsNotNone(result)
            self.assertEqual(result.sequence, sequence)
            self.assertIsNone(result.error)
            gray, hsv, info, enabled_in_worker = result.value
            np.testing.assert_allclose(gray, cv.cvtColor(frame, cv.COLOR_BGR2GRAY), atol=1)
            self.assertEqual(hsv.shape, frame.shape)
            if info["active"]:
                self.assertTrue(enabled_in_worker)
        finally:
            worker.close()


if __name__ == "__main__":
    unittest.main()
