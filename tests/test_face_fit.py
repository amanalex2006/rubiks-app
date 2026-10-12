"""Face geometry and the user-selected80% whole-patch color rule."""
import json
import unittest

import cv2 as cv
import numpy as np

from scanner.color_model import ColorModel
from scanner.grid_detect import GRID_MIN_EVIDENCE, GridDetector
from tests.test_lock_recovery import CAMERA_RGB
from tests.test_tracking import BASE_QUAD, moving_face
from tests.test_v4 import CONFIG, NAMES


class FaceFitTests(unittest.TestCase):
    def setUp(self):
        config = json.loads(CONFIG.read_text())
        config["processing_backend"] = "cpu"
        self.detector = GridDetector(config)
        self.model = ColorModel(config)
        for name, rgb in CAMERA_RGB.items():
            self.model.add_sample(name, rgb)
        self.detector.color_model = self.model

    def patch_frame(self):
        red = cv.cvtColor(np.array([[CAMERA_RGB["red"]]], np.uint8), cv.COLOR_RGB2HSV)[0, 0]
        return np.full((300, 300, 3), red, np.uint8)

    def test_exact_eighty_percent_accepts_but_seventy_nine_rejects(self):
        hsv = self.patch_frame()
        blue = cv.cvtColor(np.array([[CAMERA_RGB["blue"]]], np.uint8), cv.COLOR_RGB2HSV)[0, 0]
        hsv[30:70, 30:38] = blue
        quad = np.array([[0, 0], [300, 0], [300, 300], [0, 300]], np.float32)
        self.assertIsNotNone(self.detector.read_quad(hsv, quad, "red"))
        self.assertEqual(self.detector.read_quality["confidence"][0], 0.80)
        hsv[30:34, 38:42] = blue
        self.assertIsNone(self.detector.read_quad(hsv, quad, "red"))
        self.assertEqual(self.detector.read_quality["confidence"][0], 0.79)

    def test_dark_pixels_never_supply_a_color_vote(self):
        quad = np.array([[0, 0], [300, 0], [300, 300], [0, 300]], np.float32)
        self.assertIsNone(self.detector.read_quad(np.zeros((300, 300, 3), np.uint8), quad, "red"))
        self.assertEqual(self.detector.read_quality["confidence"], [0.0]*9)
        hsv = self.patch_frame()
        hsv[30:70, 30:38] = 0
        self.assertIsNotNone(self.detector.read_quad(hsv, quad, "red"))
        self.assertEqual(self.detector.read_quality["confidence"][0], 0.80)

    def test_changed_lighting_nearest_label_can_pass_despite_saved_radius(self):
        # Low saturation makes these surface colors fail the old strict Lab
        # radius, although their nearest calibrated hue remains unchanged.
        tinted = {"g": (133, 177, 149), "y": (214, 183, 140), "b": (86, 137, 204)}
        hsv_colors = {letter: tuple(int(value) for value in cv.cvtColor(
            np.array([[rgb]], np.uint8), cv.COLOR_RGB2HSV)[0, 0]) for letter, rgb in tinted.items()}
        frame = moving_face("gyyggbgyb", hsv_colors=hsv_colors)
        hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
        cells = self.detector.read_quad(hsv, BASE_QUAD, "green")
        self.assertIsNotNone(cells)
        self.assertEqual([name for _, name in cells], [NAMES[color] for color in "gyyggbgyb"])
        self.assertTrue(any(fraction < 0.65 for fraction in self.detector.read_quality["calibration_match_fractions"]))
        self.assertEqual(self.detector.read_quality["confidence"], [1.0]*9)

    def test_fit_is_measured_separately_from_requested_center(self):
        frame = moving_face("g"*9)
        hsv, gray = cv.cvtColor(frame, cv.COLOR_BGR2HSV), cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        fit = self.detector.measure_fit(gray, hsv, BASE_QUAD)
        self.assertTrue(fit["accepted"])
        self.assertGreaterEqual(fit["confidence"], 0.60)
        self.assertGreaterEqual(fit["grid_evidence"], GRID_MIN_EVIDENCE)
        self.assertEqual(fit["uniform_count"], 9)
        self.assertEqual(len(fit["boundary_support"]), 4)
        cells, quad = self.detector.detect_quad(frame, hsv, "red")
        self.assertIsNone(cells)
        self.assertIsNotNone(quad)
        self.assertIn("green", self.detector.last_rejection)

    def test_nine_uniform_room_patches_without_real_dividers_are_not_a_fit(self):
        frame = moving_face("r"*9, border=0)
        fit = self.detector.measure_fit(cv.cvtColor(frame, cv.COLOR_BGR2GRAY),
                                        cv.cvtColor(frame, cv.COLOR_BGR2HSV), BASE_QUAD)
        self.assertFalse(fit["accepted"])
        self.assertLess(fit["grid_evidence"], GRID_MIN_EVIDENCE)


if __name__ == "__main__":
    unittest.main()
