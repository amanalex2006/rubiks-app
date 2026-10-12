"""Tracking must keep the same face and revalidate grid evidence each frame."""
import unittest
from unittest.mock import patch

import numpy as np

from scanner.grid_tracking import FaceTracker
from scanner.grid_detect import GRID_MIN_EVIDENCE


QUAD = np.array([[120, 100], [320, 100], [320, 300], [120, 300]], np.float32)


class ControlledDetector:
    """Control geometry independently of color classification and real flow."""
    def __init__(self):
        self.ops = self
        self.detected = QUAD.copy()
        self.quality = (0.9, 100.0)
        self.cells = [(0, "red")] * 9
        self.read_quality = {}
        self.last_rejection = "No cube face outline found"
        self.read_calls = 0
        self.fit_accepted = True

    def begin_frame(self, frame, force=False):
        return frame[:, :, 0], frame

    def detect_quad(self, frame, hsv, expected_color, reference=None):
        return self.cells, None if self.detected is None else self.detected.astype(np.float32)

    def grid_quality(self, gray, quad):
        return self.quality

    def measure_fit(self, gray, hsv, quad):
        quality, sharpness = self.quality
        accepted = self.fit_accepted and quality >= GRID_MIN_EVIDENCE
        cells = self.read_quad(hsv, quad, "red") if accepted else None
        return {"confidence": 0.9 if accepted else 0.1, "accepted": accepted,
                "grid_evidence": quality, "sharpness": sharpness, "cells": cells,
                "reason": "" if accepted else "No clear 3 by 3 grid"}

    def read_quad(self, hsv, quad, expected_color):
        self.read_calls += 1
        self.read_quality = {"center": "red", "readable_count": 9 if self.cells else 8,
                             "reason": "" if self.cells else "Sticker 1 is uncertain"}
        return self.cells


class TrackingAnchorTests(unittest.TestCase):
    def setUp(self):
        self.detector = ControlledDetector()
        self.tracker = FaceTracker(self.detector, {"tracking_detection_interval": 1})
        self.frame = np.zeros((600, 800, 3), np.uint8)
        self.features_patch = patch.object(self.tracker, "_features", return_value=None)
        self.features_patch.start()
        self.addCleanup(self.features_patch.stop)

    def update_with_flow(self, flow=None):
        flow = self.tracker.quad.copy() if flow is None else np.asarray(flow, np.float32)
        with patch.object(self.tracker, "_flow_quad", return_value=flow):
            return self.tracker.update(self.frame, "red")

    def acquire(self):
        self.tracker.update(self.frame, "red")
        self.update_with_flow()
        cells, quad, status = self.update_with_flow()
        self.assertEqual(status, "tracking")
        self.assertIsNotNone(cells)
        return quad

    def test_competing_detection_cannot_replace_valid_flow_even_after_reanchor_age(self):
        actual = self.acquire()
        self.detector.detected = QUAD + (350, 0)
        for _ in range(20):
            cells, quad, status = self.update_with_flow()
            self.assertEqual(status, "tracking")
            self.assertIsNotNone(cells)
            np.testing.assert_allclose(quad, actual)
            self.assertTrue(self.tracker.reanchor_rejected)
            self.assertFalse(self.tracker.reset_votes)

    def test_near_matching_detection_corrects_flow_without_changing_face(self):
        self.acquire()
        self.detector.detected = QUAD + (8, 2)
        cells, quad, status = self.update_with_flow()
        self.assertFalse(self.tracker.reanchor_rejected)
        self.assertIsNotNone(quad)
        self.assertLess(float(np.linalg.norm(quad-self.detector.detected, axis=1).max()), 2)
        self.assertGreater(self.tracker.movement, 0.0)
        self.assertEqual(self.tracker.grid_evidence, 0.9)
        self.assertEqual(self.tracker.sharpness, 100.0)

    def test_lost_flow_can_recover_a_fast_moved_face_but_resets_capture_votes(self):
        self.acquire()
        self.detector.detected = QUAD + (300, 20)
        with patch.object(self.tracker, "_flow_quad", return_value=None):
            cells, quad, status = self.tracker.update(self.frame, "red")
        np.testing.assert_allclose(quad, self.detector.detected)
        self.assertFalse(self.tracker.reanchor_rejected)
        self.assertIsNone(cells)
        self.assertEqual(status, "unstable")
        self.assertTrue(self.tracker.reset_votes)
        self.assertGreater(self.tracker.movement, 0.14)
        for _ in range(3):
            cells, _, status = self.update_with_flow()
        self.assertEqual(status, "tracking")
        self.assertIsNotNone(cells)

    def test_sharp_color_readable_background_without_grid_loses_overlay_and_votes(self):
        self.acquire()
        self.detector.detected = None
        self.detector.quality = (0.05, 100.0)
        old_reads = self.detector.read_calls
        cells, quad, status = self.update_with_flow()
        self.assertIsNone(cells)
        self.assertIsNone(quad)
        self.assertEqual(status, "searching")
        self.assertTrue(self.tracker.reset_votes)
        self.assertEqual(self.tracker.stable_progress, 0.0)
        self.assertEqual(self.detector.read_calls, old_reads)
        self.assertEqual(self.tracker.grid_evidence, 0.05)
        self.assertEqual(self.tracker.sharpness, 100.0)
        self.assertIn("3 by 3 grid", self.tracker.reason)

    def test_uncertain_color_grace_requires_current_grid_evidence(self):
        self.acquire()
        self.detector.cells = None
        self.detector.detected = None
        self.detector.quality = (GRID_MIN_EVIDENCE-0.01, 100.0)
        cells, quad, status = self.update_with_flow()
        self.assertIsNone(cells)
        self.assertIsNone(quad)
        self.assertEqual(status, "searching")
        self.assertTrue(self.tracker.reset_votes)

    def test_low_laplacian_does_not_prevent_capture_when_actual_fit_is_clear(self):
        self.acquire()
        self.detector.quality = (0.9, 10.0)
        cells, quad, status = self.update_with_flow()
        self.assertIsNotNone(cells)
        self.assertIsNotNone(quad)
        self.assertEqual(status, "tracking")
        self.assertFalse(self.tracker.reset_votes)
        self.assertEqual(self.tracker.sharpness, 10.0)
        self.assertEqual(self.tracker.fit_confidence, 0.9)

    def test_fit_with_coherent_grid_just_above_shared_floor_can_stay_locked(self):
        self.acquire()
        self.detector.quality = (GRID_MIN_EVIDENCE+0.009, 10.0)
        cells, _, status = self.update_with_flow()
        self.assertIsNotNone(cells)
        self.assertEqual(status, "tracking")
        self.assertFalse(self.tracker.reset_votes)

    def test_grid_without_a_finite_cube_surface_fit_cannot_capture(self):
        self.acquire()
        self.detector.fit_accepted = False
        cells, quad, status = self.update_with_flow()
        self.assertIsNone(cells)
        self.assertIsNone(quad)
        self.assertEqual(status, "searching")
        self.assertTrue(self.tracker.reset_votes)
        self.assertEqual(self.tracker.fit_confidence, 0.1)

    def test_matching_anchor_requires_corner_correspondence_and_same_scale(self):
        self.assertTrue(FaceTracker._matching_anchor(QUAD + (12, 8), QUAD))
        self.assertFalse(FaceTracker._matching_anchor(np.roll(QUAD, 1, axis=0), QUAD))
        self.assertFalse(FaceTracker._matching_anchor(QUAD + (90, 0), QUAD))
        expanded = (QUAD-QUAD.mean(axis=0))*1.7 + QUAD.mean(axis=0)
        self.assertFalse(FaceTracker._matching_anchor(expanded, QUAD))


if __name__ == "__main__":
    unittest.main()
