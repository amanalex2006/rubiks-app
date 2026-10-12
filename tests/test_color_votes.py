"""Conservative white-label recovery for calibrated sticker majority votes."""
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from scanner.color_model import ColorModel, NAMES


PASTEL_HSV = np.array([(176, 120, 250), (12, 128, 250), (25, 75, 250),
                       (68, 90, 240), (96, 220, 250), (120, 7, 250)], np.uint8)


def pastel_model(reference_hsv=PASTEL_HSV):
    model = ColorModel()
    rgb = cv.cvtColor(reference_hsv.reshape(-1, 1, 3), cv.COLOR_HSV2RGB).reshape(-1, 3)
    for name, pixel in zip(NAMES, rgb):
        model.add_sample(name, pixel)
    return model


class ColorVoteTests(unittest.TestCase):
    def setUp(self):
        self.model = pastel_model()

    def fixed_distances(self, colored=3, white=True):
        distances = np.full(6, 50.0, np.float32)
        distances[colored] = 20.0 if white else 5.0
        distances[5] = 10.0
        return lambda pixels: np.tile(distances, (len(pixels), 1))

    def vote_fixed(self, pixels, colored=3, white=True):
        pixels = np.asarray(pixels, np.uint8)
        with patch.object(self.model, "_distances", side_effect=self.fixed_distances(colored, white)):
            base, strict_valid = self.model.classify_valid(pixels)
            votes, vote_valid = self.model.classify_votes(pixels)
        np.testing.assert_array_equal(vote_valid, strict_valid)
        return base, votes

    def test_desaturated_green_patch_recovers_an_eighty_percent_majority(self):
        rng = np.random.default_rng(14)
        pixels = np.c_[rng.integers(68, 76, 400), rng.integers(38, 69, 400),
                       rng.integers(174, 190, 400)].astype(np.uint8)
        base, strict_valid = self.model.classify_valid(pixels)
        votes, vote_valid = self.model.classify_votes(pixels)
        self.assertLess(float((base == 3).mean()), 0.80)
        self.assertGreaterEqual(float((votes == 3).mean()), 0.80)
        np.testing.assert_array_equal(vote_valid, strict_valid)
        self.assertTrue(((votes >= 0) & (votes <= 5)).all())
        np.testing.assert_array_equal(self.model.classify_pixels(pixels), base)

    def test_neutral_pixels_and_dark_pixels_retain_white_labels(self):
        pixels = [(68, 7, 200), (68, 20, 200), (68, 29, 200),
                  (68, 60, 39), (68, 60, 20), (68, 30, 200)]
        base, votes = self.vote_fixed(pixels)
        self.assertEqual(base.tolist(), [5]*6)
        self.assertEqual(votes.tolist(), [5, 5, 5, 5, 5, 3])

    def test_hue_window_is_circular_and_capped_at_twelve(self):
        _, votes = self.vote_fixed([(56, 60, 200), (55, 60, 200)])
        self.assertEqual(votes.tolist(), [3, 5])  # Green calibration hue is 68.
        _, votes = self.vote_fixed([(179, 60, 200), (0, 60, 200)], colored=0)
        self.assertEqual(votes.tolist(), [0, 0])  # Red hue wraps around 179 -> 0.

    def test_red_orange_boundary_needs_four_hue_units_of_separation(self):
        _, votes = self.vote_fixed([(2, 60, 200), (3, 60, 200), (4, 60, 200)], colored=0)
        self.assertEqual(votes.tolist(), [0, 5, 5])
        _, votes = self.vote_fixed([(176, 60, 200)], colored=1)
        self.assertEqual(votes.tolist(), [5], "Hue and nearest colored Lab ID must agree")

    def test_colored_lab_and_calibrated_hue_must_agree(self):
        _, votes = self.vote_fixed([(68, 60, 200)], colored=2)
        self.assertEqual(votes.tolist(), [5])
        _, votes = self.vote_fixed([(68, 60, 200)], colored=3)
        self.assertEqual(votes.tolist(), [3])

    def test_existing_nonwhite_labels_are_never_replaced(self):
        for colored in range(5):
            with self.subTest(color=NAMES[colored]):
                base, votes = self.vote_fixed([(68, 60, 200)], colored=colored, white=False)
                self.assertEqual(base.tolist(), [colored])
                np.testing.assert_array_equal(votes, base)

    def test_saturation_guard_accounts_for_a_warm_white_reference(self):
        refs = PASTEL_HSV.copy()
        refs[5] = (24, 30, 250)
        self.model = pastel_model(refs)
        _, votes = self.vote_fixed([(68, 49, 200), (68, 50, 200)])
        self.assertEqual(votes.tolist(), [5, 3])

    def test_vote_pass_shares_one_lab_calculation_and_keeps_strict_validity(self):
        pixels = np.array([(72, 45, 180), (68, 90, 240), (120, 7, 250)], np.uint8)
        before_samples = self.model.samples
        _, strict_valid = self.model.classify_valid(pixels)
        with patch.object(self.model, "_distances", wraps=self.model._distances) as distances:
            votes, vote_valid = self.model.classify_votes(pixels)
        self.assertEqual(distances.call_count, 1)
        self.assertEqual(votes.tolist(), [3, 3, 5])
        np.testing.assert_array_equal(vote_valid, strict_valid)
        self.assertEqual(self.model.samples, before_samples)

    def test_partial_profiles_empty_pixels_and_invalid_hsv_keep_original_contract(self):
        model = ColorModel()
        model.add_sample("red", self.model.samples["red"])
        pixels = np.array([(0, 220, 220), (65, 80, 180), (0, 0, 220)], np.uint8)
        original = model.classify_valid(pixels)
        votes = model.classify_votes(pixels)
        for actual, expected in zip(votes, original):
            np.testing.assert_array_equal(actual, expected)
        empty_ids, empty_valid = self.model.classify_votes(np.empty((0, 3), np.uint8))
        self.assertEqual(empty_ids.dtype, np.int8)
        self.assertEqual(empty_valid.dtype, bool)
        self.assertEqual(len(empty_ids), 0)
        for malformed in ([(180, 40, 200)], [(-1, 40, 200)], [(68, 300, 200)], [(68, 40, float("nan"))]):
            with self.subTest(pixels=malformed), self.assertRaises(ValueError):
                self.model.classify_votes(malformed)


if __name__ == "__main__":
    unittest.main()
