"""Accept a clear fitted cube with 80% sticker votes, without a Laplacian veto."""
import json
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from scanner import main as scanner_main
from scanner.grid_detect import GridDetector, GRID_MIN_EVIDENCE
from scanner.grid_tracking import FaceTracker
from tests.test_tracking import moving_face
from tests.test_v4 import CONFIG


MAJORITY_QUAD = np.array([[200, 120], [500, 120], [500, 420], [200, 420]], np.float32)


def majority_face(minority_width=8, minority_cell=None):
    """Exactly 80% of each 40x40 sampling patch is red when width is eight."""
    hsv = np.zeros((300, 300, 3), np.uint8)
    for row in range(3):
        for col in range(3):
            hsv[row*100+3:(row+1)*100-3, col*100+3:(col+1)*100-3] = (0, 235, 220)
            if minority_cell is None or minority_cell == (row, col):
                hsv[row*100+30:row*100+70, col*100+70-minority_width:col*100+70] = (115, 235, 220)
    frame = np.zeros((600, 800, 3), np.uint8)
    frame[120:420, 200:500] = cv.cvtColor(hsv, cv.COLOR_HSV2BGR)
    return frame


class TrackingMajorityTests(unittest.TestCase):
    def setUp(self):
        cfg = json.loads(CONFIG.read_text())
        cfg["processing_backend"] = "cpu"
        self.detector = GridDetector(cfg)
        self.tracker = FaceTracker(self.detector, cfg)

    def acquire(self, frame, expected="red"):
        for _ in range(8):
            cells, quad, status = self.tracker.update(frame.copy(), expected)
            if status == "tracking":
                return cells, quad
        self.fail("Clear fitted face was not accepted: " + self.tracker.reason)

    def capture_face(self, frame):
        cube_map = scanner_main.CubeMap()
        with patch.object(scanner_main, "PAUSE_AT_END", False), \
                patch.object(scanner_main, "MIN_TOTAL_READING_BUFFER", 5), \
                patch.object(scanner_main, "MIN_COLOR_COUNT_THRESHOLD", 5):
            for _ in range(16):
                cells, _, _ = self.tracker.update(frame.copy(), "red")
                if self.tracker.reset_votes:
                    cube_map.reset_mapping()
                if cells is not None:
                    cube_map.ortho = list(cells)
                    if cube_map.process():
                        break
        self.assertEqual(cube_map.history, [2], self.tracker.reason)
        self.assertEqual(cube_map.index, 3)
        self.assertEqual(cube_map.map[2], [["r"]*3 for _ in range(3)])

    def test_soft_low_contrast_edges_with_clean_patches_can_capture(self):
        frame = cv.GaussianBlur(moving_face("r"*9), (17, 17), 2.5)
        self.capture_face(frame)
        self.assertLess(self.tracker.sharpness, 28.0,
                        "This fixture must exercise the removed global Laplacian veto")
        self.assertGreaterEqual(self.tracker.grid_evidence, GRID_MIN_EVIDENCE)
        self.assertGreaterEqual(self.tracker.fit_confidence, 0.60)
        self.assertTrue(self.tracker.fit_quality["accepted"])
        self.assertEqual(self.detector.read_quality["readable_count"], 9)

    def test_eighty_percent_whole_patch_votes_for_all_nine_stickers_can_capture(self):
        frame = majority_face()
        with patch.object(self.detector, "detect_quad", return_value=(None, MAJORITY_QUAD)):
            self.capture_face(frame)
        np.testing.assert_allclose(self.detector.read_quality["confidence"], [0.8]*9)
        self.assertEqual(self.tracker.status, "tracking")
        self.assertEqual(self.detector.read_quality["uniform_count"], 9)

    def test_below_eighty_percent_on_one_sticker_still_prevents_capture(self):
        frame = majority_face(minority_width=10, minority_cell=(0, 0))
        with patch.object(self.detector, "detect_quad", return_value=(None, MAJORITY_QUAD)):
            for _ in range(8):
                cells, quad, status = self.tracker.update(frame.copy(), "red")
                self.assertIsNone(cells)
                self.assertIsNotNone(quad)
                self.assertEqual(status, "unstable")
        self.assertEqual(self.detector.read_quality["readable_count"], 8)
        self.assertEqual(self.detector.read_quality["confidence"][0], 0.75)
        self.assertTrue(self.tracker.reset_votes)

    def test_heavy_blur_clears_votes_by_losing_grid_and_finite_boundary_fit(self):
        frame = moving_face("r"*9)
        self.acquire(frame)
        heavy_blur = cv.GaussianBlur(frame, (61, 61), 18)
        cells, quad, status = self.tracker.update(heavy_blur, "red")
        self.assertIsNone(cells)
        self.assertIsNone(quad)
        self.assertNotEqual(status, "tracking")
        self.assertTrue(self.tracker.reset_votes)
        self.assertLess(self.tracker.grid_evidence, GRID_MIN_EVIDENCE)
        self.acquire(frame)

    def test_fit_is_measured_on_every_flow_frame_and_does_not_reuse_acquisition_confidence(self):
        frame = moving_face("r"*9)
        self.acquire(frame)
        with patch.object(self.detector, "measure_fit", wraps=self.detector.measure_fit) as fit:
            self.tracker.update(frame.copy(), "red")
        self.assertGreaterEqual(fit.call_count, 1)
        self.assertEqual(self.tracker.fit_confidence, self.tracker.fit_quality["confidence"])
        self.assertNotIn("cells", self.tracker.fit_quality)


if __name__ == "__main__":
    unittest.main()
