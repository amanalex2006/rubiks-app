"""Capture safety when geometry is visible but a camera color patch is weak."""
import json
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from scanner.color_model import ColorModel, NAMES as COLOR_NAMES
from scanner.grid_detect import GridDetector
from scanner.grid_tracking import FaceTracker
from tests.test_tracking import BASE_QUAD, moving_face
from tests.test_v4 import CONFIG, NAMES


CAMERA_RGB = {
    "red": (131, 17, 22), "orange": (210, 89, 71),
    "yellow": (192, 164, 58), "green": (50, 135, 68),
    "blue": (28, 98, 154), "white": (202, 202, 211),
}


def scene(reflect=False):
    colors = {letter: tuple(int(x) for x in cv.cvtColor(
        np.array([[CAMERA_RGB[name]]], np.uint8), cv.COLOR_RGB2HSV)[0, 0])
        for letter, name in NAMES.items()}
    frame = moving_face(hsv_colors=colors)
    if reflect:
        # Occlude only one non-center sampling patch, leaving real grid edges
        # and the requested center in view. No fixed guide is substituted.
        mask = np.zeros((300, 300), np.uint8)
        mask[28:73, 28:73] = 255
        transform = cv.getPerspectiveTransform(
            np.array([[0, 0], [299, 0], [299, 299], [0, 299]], np.float32), BASE_QUAD)
        mask = cv.warpPerspective(mask, transform, (800, 600))
        frame[mask > 0] = 0
    return frame


class LockRecoveryTests(unittest.TestCase):
    def setUp(self):
        cfg = json.loads(CONFIG.read_text())
        cfg["processing_backend"] = "cpu"
        self.detector = GridDetector(cfg)
        self.model = ColorModel(cfg)
        for name, rgb in CAMERA_RGB.items():
            self.model.add_sample(name, rgb)
        self.detector.color_model = self.model
        self.tracker = FaceTracker(self.detector, cfg)

    def acquire(self):
        for _ in range(6):
            cells, quad, status = self.tracker.update(scene(), "red")
            if status == "tracking":
                return cells, quad
        self.fail("A calibrated sharp face was not acquired")

    def test_geometry_remains_visible_when_one_color_cannot_be_captured(self):
        frame = scene(reflect=True)
        cells, quad = self.detector.detect_quad(frame, cv.cvtColor(frame, cv.COLOR_BGR2HSV), "red")
        self.assertIsNotNone(quad)
        self.assertIsNone(cells)
        self.assertEqual(self.detector.read_quality["readable_count"], 8)
        self.assertEqual(self.detector.read_quality["center"], "red")
        self.assertIn("Sticker", self.detector.last_rejection)
        cells, quad, status = self.tracker.update(frame, "red")
        self.assertIsNotNone(quad)
        self.assertIsNone(cells)
        self.assertEqual(status, "unstable")

    def test_isolated_noncenter_failure_preserves_votes_but_never_returns_cells(self):
        self.acquire()
        for _ in range(2):
            cells, quad, status = self.tracker.update(scene(reflect=True), "red")
            self.assertIsNotNone(quad)
            self.assertIsNone(cells)
            self.assertEqual(status, "unstable")
            self.assertFalse(self.tracker.reset_votes)
        cells, _, status = self.tracker.update(scene(), "red")
        self.assertIsNotNone(cells)
        self.assertEqual(status, "tracking")
        self.assertFalse(self.tracker.reset_votes)
        for _ in range(3):
            cells, _, _ = self.tracker.update(scene(reflect=True), "red")
        self.assertIsNone(cells)
        self.assertTrue(self.tracker.reset_votes)
        self.assertEqual(self.tracker.stable_progress, 0.0)

    def test_requested_center_mismatch_explains_itself_without_hiding_geometry(self):
        for _ in range(5):
            cells, quad, status = self.tracker.update(scene(), "blue")
            self.assertIsNone(cells)
            self.assertIsNotNone(quad)
            self.assertNotEqual(status, "tracking")
            self.assertTrue(self.tracker.reset_votes)
            self.assertIn("blue", self.tracker.reason)
            self.assertIn("red", self.tracker.reason)

    def test_two_visible_faces_prefer_requested_center_even_if_other_face_is_larger(self):
        left = np.array([[125, 165], [345, 165], [345, 395], [125, 395]], np.float32)
        right = np.array([[410, 110], [735, 110], [735, 460], [410, 460]], np.float32)
        frame = np.maximum(moving_face("r"*9, left), moving_face("b"*9, right))
        # Use the original color references for this fixture's original HSVs.
        self.detector.color_model = None
        cells, quad = self.detector.detect_quad(frame, cv.cvtColor(frame, cv.COLOR_BGR2HSV), "red")
        self.assertIsNotNone(cells)
        self.assertEqual([name for _, name in cells], ["red"]*9)
        self.assertLess(float(quad[:, 0].mean()), 400)

    def test_blur_and_center_loss_clear_votes_immediately_after_acquisition(self):
        self.acquire()
        blurred = cv.GaussianBlur(scene(), (61, 61), 18)
        cells, _, status = self.tracker.update(blurred, "red")
        self.assertIsNone(cells)
        self.assertNotEqual(status, "tracking")
        self.assertTrue(self.tracker.reset_votes)
        self.acquire()
        cells, _, status = self.tracker.update(np.zeros_like(scene()), "red")
        self.assertIsNone(cells)
        self.assertNotEqual(status, "tracking")
        self.assertTrue(self.tracker.reset_votes)

    def test_combined_color_pass_handles_camera_noise_without_duplicate_distances(self):
        rgb = np.asarray([CAMERA_RGB[name] for name in COLOR_NAMES], np.float32)
        noisy = np.clip(rgb[:, None, :] + np.random.default_rng(19).normal(0, 4, (6, 400, 3)),
                        0, 255).astype(np.uint8)
        hsv = cv.cvtColor(noisy.reshape(-1, 1, 3), cv.COLOR_RGB2HSV).reshape(-1, 3)
        with patch.object(self.model, "_distances", wraps=self.model._distances) as distances:
            ids, valid = self.model.classify_valid(hsv)
        self.assertEqual(distances.call_count, 1)
        self.assertGreater(valid.mean(), 0.97)
        np.testing.assert_array_equal(ids, np.repeat(np.arange(6), 400))
        frame = scene()
        with patch.object(self.model, "_distances", wraps=self.model._distances) as distances:
            cells = self.detector.read_quad(cv.cvtColor(frame, cv.COLOR_BGR2HSV), BASE_QUAD, "red")
        self.assertEqual(distances.call_count, 1)
        self.assertIsNotNone(cells)

    def test_outliers_need_a_clear_supermajority_and_cannot_replace_dark_cell_colors(self):
        hsv = np.full((300, 300, 3), (0, 0, 0), np.uint8)
        for row in range(3):
            for col in range(3):
                rgb = np.array([[CAMERA_RGB["red"]]], np.uint8)
                hsv[row*100:(row+1)*100, col*100:(col+1)*100] = cv.cvtColor(rgb, cv.COLOR_RGB2HSV)[0, 0]
        quad = np.array([[0, 0], [300, 0], [300, 300], [0, 300]], np.float32)
        # A limited reflection can be ignored, while its pixels cannot vote.
        hsv[30:70, 30:38] = 0
        self.assertIsNotNone(self.detector.read_quad(hsv, quad, "red"))
        # With most of this sticker unreadable, all capture is withheld.
        hsv[30:70, 30:62] = 0
        self.assertIsNone(self.detector.read_quad(hsv, quad, "red"))


if __name__ == "__main__":
    unittest.main()
