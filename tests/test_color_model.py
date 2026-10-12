"""Camera-shifted colors, lighting variation and explicit calibration checks."""
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from scanner.color_model import ColorModel, NAMES


SHIFTED_HSV = np.array([
    (6, 235, 215), (14, 235, 215), (31, 235, 215),
    (67, 235, 215), (92, 235, 215), (24, 30, 220),
], np.uint8)


def rgb_samples(hsv=SHIFTED_HSV):
    rgb = cv.cvtColor(hsv.reshape(-1, 1, 3), cv.COLOR_HSV2RGB).reshape(-1, 3)
    return {name: tuple(int(channel) for channel in pixel) for name, pixel in zip(NAMES, rgb)}


def calibrated():
    model = ColorModel()
    for name, sample in rgb_samples().items():
        model.add_sample(name, sample)
    return model


class ColorModelTests(unittest.TestCase):
    def test_explicit_centers_correct_shifted_red_and_cyan_blue(self):
        model = ColorModel()
        self.assertEqual(model.classify_pixels(SHIFTED_HSV).tolist(), [1, 1, 2, 3, 3, 5])
        for name, sample in rgb_samples().items():
            model.add_sample(name, sample)
        self.assertTrue(model.ready)
        self.assertEqual(model.classify_pixels(SHIFTED_HSV).tolist(), list(range(6)))
        self.assertTrue(model.valid_pixels(SHIFTED_HSV).all())

    def test_calibration_tolerates_brightness_and_small_camera_color_variation(self):
        model = calibrated()
        for brightness in (75, 125, 220, 245):
            with self.subTest(brightness=brightness):
                hsv = SHIFTED_HSV.copy()
                hsv[:, 2] = brightness
                hsv[:5, 1] = 225
                hsv[0, 0] = 7
                hsv[4, 0] = 94
                hsv[5, 1] = 35
                self.assertEqual(model.classify_pixels(hsv).tolist(), list(range(6)))
                self.assertTrue(model.valid_pixels(hsv).all())

    def test_dark_and_ambiguous_pixels_are_invalid_with_nonnegative_ids(self):
        model = calibrated()
        dark = SHIFTED_HSV.copy()
        dark[:, 2] = 20
        self.assertFalse(model.valid_pixels(dark).any())
        ambiguous = np.array([(hue, 235, 215) for hue in range(8, 13)], np.uint8)
        self.assertFalse(model.valid_pixels(ambiguous).all())
        ids = model.classify_pixels(np.concatenate((dark, ambiguous)))
        self.assertTrue(((ids >= 0) & (ids <= 5)).all())
        self.assertEqual(np.bincount(ids, minlength=6).sum(), len(ids))

    def test_partial_calibration_retains_original_hsv_fallback(self):
        model = ColorModel()
        before = model.classify_pixels(SHIFTED_HSV)
        model.add_sample("red", rgb_samples()["red"])
        self.assertFalse(model.ready)
        np.testing.assert_array_equal(model.classify_pixels(SHIFTED_HSV), before)
        self.assertIn("six", model.validate_samples(model.samples))

    def test_duplicate_labels_dark_glare_and_unseparated_centers_are_rejected(self):
        model = ColorModel()
        red = rgb_samples()["red"]
        model.add_sample("red", red)
        with self.assertRaisesRegex(ValueError, "too similar"):
            model.add_sample("orange", np.asarray(red) * 0.75)
        self.assertEqual(set(model.samples), {"red"})
        for name, sample, message in (
            ("blue", (15, 20, 30), "too dark"),
            ("white", (255, 255, 255), "overexposed"),
            ("green", (190, 190, 190), "little color"),
            ("white", (210, 30, 30), "strongly colored"),
            ("purple", red, "six"),
        ):
            with self.subTest(name=name, sample=sample), self.assertRaisesRegex(ValueError, message):
                model.add_sample(name, sample)
        malformed = rgb_samples()
        malformed["red"] = [float("nan"), 30, 20]
        self.assertIn("finite", model.validate_samples(malformed))

    def test_sample_patch_is_robust_to_few_highlights_and_allows_uniform_centers(self):
        sample = rgb_samples()["blue"]
        frame = np.full((70, 70, 3), tuple(reversed(sample)), np.uint8)
        frame[30:32, 30:32] = 255
        rgb, quality = ColorModel.sample_patch(frame, 35, 35)
        self.assertEqual(rgb, sample)
        self.assertEqual(quality["usable_fraction"], 1.0)
        self.assertLess(quality["glare_fraction"], 0.02)
        white = np.full((70, 70, 3), (235, 235, 235), np.uint8)
        self.assertEqual(ColorModel.sample_patch(white, 35, 35)[0], (235, 235, 235))

    def test_sample_patch_rejects_dark_overexposed_and_mixed_edges(self):
        for value, message in ((10, "dark"), (255, "overexposed")):
            frame = np.full((70, 70, 3), value, np.uint8)
            with self.subTest(value=value), self.assertRaisesRegex(ValueError, message):
                ColorModel.sample_patch(frame, 35, 35)
        frame = np.full((70, 70, 3), (20, 20, 210), np.uint8)
        frame[:, 35:] = (210, 210, 20)
        with self.assertRaisesRegex(ValueError, "edge or reflection"):
            ColorModel.sample_patch(frame, 35, 35)

    def test_profile_round_trip_missing_malformed_and_failed_atomic_save(self):
        model = calibrated()
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "calibration.json"
            self.assertIsNone(ColorModel.load(path))
            model.save(path)
            original = path.read_text()
            loaded = ColorModel.load(path)
            self.assertEqual(loaded.samples, model.samples)
            self.assertEqual(loaded.classify_pixels(SHIFTED_HSV).tolist(), list(range(6)))
            with patch("scanner.color_model.os.replace", side_effect=OSError("locked")):
                with self.assertRaisesRegex(OSError, "locked"):
                    model.save(path)
            self.assertEqual(path.read_text(), original)
            self.assertEqual(list(Path(directory).glob("*.tmp")), [])
            malformed = ["not json", json.dumps({"version": 2, "color_space": "RGB", "samples": model.samples}),
                         json.dumps({"version": 1, "color_space": "RGB", "samples": {"red": [20, 10, 5]}})]
            for content in malformed:
                with self.subTest(content=content):
                    path.write_text(content)
                    with self.assertRaises(ValueError):
                        ColorModel.load(path)


if __name__ == "__main__":
    unittest.main()
