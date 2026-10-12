"""Grid identity and bounded line recovery in cluttered camera scenes."""
import json
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from scanner.grid_detect import GridDetector
from tests.test_tracking import BASE_QUAD, PATTERN, moving_face
from tests.test_v4 import CONFIG, NAMES


def projected_lines(quad):
    """Four boundaries/dividers per axis in Hough's half-resolution space."""
    tl, tr, br, bl = np.asarray(quad, np.float32)
    lines = []
    for fraction in (0, 1/3, 2/3, 1):
        for first, second in ((tl+(bl-tl)*fraction, tr+(br-tr)*fraction),
                              (tl+(tr-tl)*fraction, bl+(br-bl)*fraction)):
            lines.append(np.rint(np.r_[first, second]/2).astype(np.int32))
    return lines


class GridAcquisitionTests(unittest.TestCase):
    def setUp(self):
        config = json.loads(CONFIG.read_text())
        config["processing_backend"] = "cpu"
        self.detector = GridDetector(config)

    def test_one_divider_per_axis_is_not_a_three_by_three_grid(self):
        # This off-center cross passed the old max-of-two-separators check.
        frame = np.full((600, 800, 3), (20, 20, 20), np.uint8)
        hsv = np.array([[[0, 235, 210]]], np.uint8)
        color = tuple(int(value) for value in cv.cvtColor(hsv, cv.COLOR_HSV2BGR)[0, 0])
        cv.rectangle(frame, (200, 100), (600, 500), color, -1)
        cv.line(frame, (333, 100), (333, 500), (0, 0, 0), 5)
        cv.line(frame, (200, 233), (600, 233), (0, 0, 0), 5)
        quad = np.array([[200, 100], [600, 100], [600, 500], [200, 500]], np.float32)
        score, _ = self.detector.grid_quality(cv.cvtColor(frame, cv.COLOR_BGR2GRAY), quad)
        self.assertLess(score, 0.26)
        cells, acquired = self.detector.detect_quad(frame, cv.cvtColor(frame, cv.COLOR_BGR2HSV), "red")
        self.assertIsNone(cells)
        self.assertIsNone(acquired)

    def test_uniform_two_by_two_colored_rectangle_is_rejected(self):
        face = moving_face("r"*9, border=0)
        for first, second in (((400, 160), (400, 470)), ((230, 310), (585, 310))):
            cv.line(face, first, second, (0, 0, 0), 5)
        cells, quad = self.detector.detect_quad(face, cv.cvtColor(face, cv.COLOR_BGR2HSV), "red")
        self.assertIsNone(cells)
        self.assertIsNone(quad)

    def test_mixed_stickerless_face_keeps_all_nine_colors(self):
        frame = moving_face(border=0)
        cells, quad = self.detector.detect_quad(frame, cv.cvtColor(frame, cv.COLOR_BGR2HSV), "red")
        self.assertIsNotNone(quad)
        self.assertIsNotNone(cells)
        self.assertEqual([name for _, name in cells], [NAMES[color] for color in PATTERN])

    def test_colored_bevels_supply_both_separators_without_black_gaps(self):
        face = np.full((300, 300, 3), (0, 235, 220), np.uint8)
        for at in (100, 200):
            cv.line(face, (at, 0), (at, 299), (0, 235, 105), 2)
            cv.line(face, (0, at), (299, at), (0, 235, 105), 2)
        face = cv.cvtColor(face, cv.COLOR_HSV2BGR)
        quad = np.array([[0, 0], [300, 0], [300, 300], [0, 300]], np.float32)
        score, _ = self.detector.grid_quality(cv.cvtColor(face, cv.COLOR_BGR2GRAY), quad)
        self.assertGreaterEqual(score, 0.26)

    def test_unrelated_curved_texture_cannot_fill_straight_grid_bands(self):
        # Every row/column has an edge in the old broad sampling band, but
        # these curves never form straight one-third cube separators.
        gray = np.full((300, 300), 180, np.uint8)
        coordinates = np.arange(12, 288)
        for at in (100, 200):
            positions = np.rint(at+8*np.sin(coordinates*.12)).astype(np.int32)
            cv.polylines(gray, [np.c_[positions, coordinates]], False, 45, 1)
            cv.polylines(gray, [np.c_[coordinates, positions]], False, 45, 1)
        quad = np.array([[0, 0], [300, 0], [300, 300], [0, 300]], np.float32)
        score, _ = self.detector.grid_quality(gray, quad)
        self.assertLess(score, 0.26)

    def recovered_quads(self, expected, extra=()):
        lines = np.asarray(projected_lines(expected)+list(extra), np.int32).reshape(-1, 1, 4)
        with patch("scanner.grid_detect.cv.HoughLinesP", return_value=lines):
            return self.detector._line_quads(np.zeros((600, 800), np.uint8), (600, 800, 3), None)

    def assert_has_quad(self, candidates, expected):
        self.assertLessEqual(len(candidates), 24)
        self.assertTrue(any(np.max(np.linalg.norm(quad-expected, axis=1)) < 5 for quad in candidates),
                        "The real face boundaries must survive the bounded fallback shortlist")

    def test_long_diagonal_room_edge_does_not_choose_only_cube_direction(self):
        expected = np.array([[220, 120], [580, 120], [580, 480], [220, 480]], np.float32)
        room_edge = np.array([5, 10, 385, 260], np.int32)
        self.assert_has_quad(self.recovered_quads(expected, [room_edge]), expected)

    def test_oblique_projected_axes_below_fifty_degrees_are_recovered(self):
        expected = np.array([[140, 140], [520, 140], [740, 295], [360, 295]], np.float32)
        self.assertTrue(self.detector.valid_quad(expected, (600, 800, 3)))
        self.assert_has_quad(self.recovered_quads(expected), expected)

    def test_fallback_shortlist_stays_bounded_in_line_clutter(self):
        expected = np.array([[220, 120], [580, 120], [580, 480], [220, 480]], np.float32)
        clutter = [np.array([10, at, 390, at+140], np.int32) for at in range(10, 150, 20)]
        self.assert_has_quad(self.recovered_quads(expected, clutter), expected)

    def test_wrong_center_contour_does_not_block_requested_center_line_search(self):
        red = np.array([[125, 165], [345, 165], [345, 395], [125, 395]], np.float32)
        blue = np.array([[410, 110], [735, 110], [735, 460], [410, 460]], np.float32)
        frame = np.maximum(moving_face("r"*9, red), moving_face("b"*9, blue))
        # A cube connected to a hand can lose its closed contour while a
        # different face still supplies a convincing closed contour.
        contour = np.rint(blue).astype(np.int32).reshape(-1, 1, 2)
        with patch("scanner.grid_detect.cv.findContours", return_value=([contour], None)), \
                patch.object(self.detector, "_line_quads", return_value=[red]) as fallback:
            cells, quad = self.detector.detect_quad(frame, cv.cvtColor(frame, cv.COLOR_BGR2HSV), "red")
        fallback.assert_called_once()
        self.assertIsNotNone(cells)
        self.assertEqual([name for _, name in cells], ["red"]*9)
        np.testing.assert_allclose(quad, red)


if __name__ == "__main__":
    unittest.main()
