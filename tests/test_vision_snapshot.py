"""Explicit camera snapshots preserve matching pixels, metadata and retry safety."""

import hashlib
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from scanner import vision_snapshot as snapshots


class VisionSnapshotTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="rubiks-snapshot-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.marker = self.root / snapshots.REQUEST_NAME
        self.raw = np.random.default_rng(8).integers(0, 256, (48, 64, 3), dtype=np.uint8)
        self.overlay = self.raw.copy()
        self.quad = np.array([[12, 9], [42, 9], [42, 39], [12, 39]], dtype=np.int32)
        cv.polylines(self.overlay, [self.quad], True, (0, 255, 0), 1)
        self.metadata = {"pid": 123, "time": 55.5, "frame_sequence": 17,
                         "quad": self.quad, "reason": "No clear 3×3 grid",
                         "status": "searching"}

    def request(self, request_id="physical-cube-17"):
        self.marker.write_text(request_id + "\n", encoding="utf-8")

    def capture(self, raw=None, overlay=None, metadata=None):
        return snapshots.capture_requested_snapshot(
            self.root, self.raw if raw is None else raw,
            self.overlay if overlay is None else overlay,
            self.metadata if metadata is None else metadata)

    def test_no_request_creates_nothing_and_does_not_encode(self):
        with patch.object(snapshots.cv, "imencode") as encode:
            self.assertIsNone(self.capture())
        encode.assert_not_called()
        self.assertEqual(list(self.root.iterdir()), [])

    def test_pixels_coordinates_and_metadata_are_preserved(self):
        self.request()
        raw_before, overlay_before = self.raw.copy(), self.overlay.copy()
        self.raw.flags.writeable = False
        self.overlay.flags.writeable = False
        result = self.capture()
        self.assertTrue(result["ok"], result)
        self.assertFalse(self.marker.exists())
        raw_path = Path(result["files"]["raw"])
        overlay_path = Path(result["files"]["overlay"])
        np.testing.assert_array_equal(cv.imread(str(raw_path)), raw_before)
        np.testing.assert_array_equal(cv.imread(str(overlay_path)), overlay_before)
        np.testing.assert_array_equal(self.raw, raw_before)
        np.testing.assert_array_equal(self.overlay, overlay_before)
        report = json.loads(Path(result["files"]["metadata"]).read_text(encoding="utf-8"))
        self.assertEqual(report["request_id"], "physical-cube-17")
        self.assertEqual(report["quad"], self.quad.tolist())
        for key in ("pid", "time", "frame_sequence", "reason", "status"):
            self.assertEqual(report[key], self.metadata[key])
        self.assertEqual(report["image_shape"], [48, 64, 3])
        self.assertEqual(report["raw_png_sha256"], hashlib.sha256(raw_path.read_bytes()).hexdigest())
        self.assertEqual(report["overlay_png_sha256"], hashlib.sha256(overlay_path.read_bytes()).hexdigest())
        self.assertEqual(report["files"]["raw"], ".diagnostics/camera-raw.png")
        self.assertFalse(any(Path(result["files"]["metadata"]).parent.glob("*.tmp")))

    def test_output_paths_ignore_request_and_metadata_path_suggestions(self):
        self.request("../arbitrary-output")
        metadata = dict(self.metadata, files={"raw": "../arbitrary-output.png"},
                        request_id="override", snapshot_version=100)
        result = self.capture(metadata=metadata)
        self.assertTrue(result["ok"], result)
        self.assertEqual(Path(result["files"]["raw"]), self.root / ".diagnostics" / "camera-raw.png")
        report = json.loads(Path(result["files"]["metadata"]).read_text(encoding="utf-8"))
        self.assertEqual(report["snapshot_version"], 1)
        self.assertEqual(report["request_id"], "../arbitrary-output")
        self.assertEqual(report["files"]["raw"], ".diagnostics/camera-raw.png")

    def test_encode_failure_returns_error_and_keeps_request(self):
        self.request()
        with patch.object(snapshots.cv, "imencode", return_value=(False, None)):
            result = self.capture()
        self.assertFalse(result["ok"])
        self.assertIn("encode", result["error"])
        self.assertTrue(self.marker.exists())
        self.assertFalse((self.root / ".diagnostics").exists())

    def test_atomic_write_failure_keeps_request_and_cleans_temporary_file(self):
        self.request()
        with patch.object(snapshots.os, "replace", side_effect=OSError("disk unavailable")):
            result = self.capture()
        self.assertFalse(result["ok"])
        self.assertIn("disk unavailable", result["error"])
        self.assertTrue(self.marker.exists())
        self.assertEqual(list((self.root / ".diagnostics").iterdir()), [])

    def test_json_failure_does_not_write_partial_images(self):
        self.request()
        result = self.capture(metadata={"unsupported": object()})
        self.assertFalse(result["ok"])
        self.assertTrue(self.marker.exists())
        self.assertFalse((self.root / ".diagnostics").exists())

    def test_matching_dimensions_and_bgr_dtype_are_required(self):
        self.request()
        for overlay in (self.overlay[:-1], self.overlay[:, :, :2], self.overlay.astype(np.float32)):
            with self.subTest(shape=overlay.shape, dtype=overlay.dtype):
                result = self.capture(overlay=overlay)
                self.assertFalse(result["ok"])
                self.assertIn("matching", result["error"])
                self.assertTrue(self.marker.exists())

    def test_empty_and_multiline_request_ids_are_rejected_without_encoding(self):
        for request in ("", "first\nsecond", "x" * 257):
            with self.subTest(request=request):
                self.marker.write_text(request, encoding="utf-8")
                with patch.object(snapshots.cv, "imencode") as encode:
                    result = self.capture()
                self.assertFalse(result["ok"])
                encode.assert_not_called()
                self.assertTrue(self.marker.exists())

    def test_new_request_created_during_save_is_preserved(self):
        self.request("first")
        real_write = snapshots._atomic_write

        def replace_request(path, payload):
            real_write(path, payload)
            if path.name == snapshots.FILE_NAMES["metadata"]:
                self.request("second")

        with patch.object(snapshots, "_atomic_write", side_effect=replace_request):
            result = self.capture()
        self.assertTrue(result["ok"], result)
        self.assertEqual(result["request_id"], "first")
        self.assertEqual(self.marker.read_text().strip(), "second")


if __name__ == "__main__":
    unittest.main()
