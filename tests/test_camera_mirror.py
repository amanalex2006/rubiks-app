"""Horizontal camera mirroring changes the view, never scanned sticker order."""
import gc
import json
from pathlib import Path
import tempfile
import time
import tkinter as tk
from types import SimpleNamespace
import unittest
from unittest.mock import MagicMock, patch

import numpy as np

from gui import app as desktop
from run import parse_args
from scanner.camera_capture import CapturedFrame
from scanner.color_model import ColorModel


class CameraMirrorTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory(prefix="rubiks-camera-mirror-")
        folder = Path(self.directory.name)
        self.settings = folder / "settings.json"
        self.settings.write_text(json.dumps({"theme": "dark", "keep_setting": 17}))
        config = json.loads((desktop.APP_ROOT / "scanner" / "config.json").read_text())
        config["processing_backend"] = "cpu"
        self.config = folder / "config.json"
        self.config.write_text(json.dumps(config))
        self.patches = [patch.object(desktop, "SETTINGS", self.settings),
                        patch.object(desktop.detector, "COLOR_PROFILE_PATH", str(folder / "colors.json"))]
        for item in self.patches:
            item.start()
        self.root = tk.Tk()
        self.root.withdraw()
        self.args = parse_args(["--manual", "--config", str(self.config), "--output", str(folder / "report.json")])
        self.app = desktop.CubeApp(self.root, self.args)
        self.app.mode = "camera"
        self.app.scan_cube = desktop.detector.CubeMap()
        self.app.video.winfo_width = lambda: 120
        self.app.video.winfo_height = lambda: 80
        self.frame = np.zeros((80, 120, 3), np.uint8)
        self.frame[:, :40] = (18, 17, 200)
        self.frame[:, 40:] = (220, 85, 25)
        self.app._frame = self.app._raw_frame = self.frame
        self.app._preview_sequence += 1

    def tearDown(self):
        try:
            if not self.app.closed:
                self.app.close()
        finally:
            self.app = self.root = None
            gc.collect()
            for item in reversed(self.patches):
                item.stop()
            self.directory.cleanup()

    def test_preview_and_grid_flip_together_without_changing_raw_pixels_or_votes(self):
        quad = np.array([[10, 10], [30, 10], [30, 50], [10, 50]], np.float32)
        self.app._camera_snapshot = {"quad": quad, "source_shape": (80, 120),
                                     "captured_at": time.monotonic(), "status": "tracking"}
        self.app.scan_cube.total_readings = 3
        self.app.scan_cube.history = [2]
        self.app.scanning = True
        self.app.render_video()
        self.assertEqual(self.app._photo.get(0, 40), (200, 17, 18))
        self.app.toggle_camera_mirror()
        self.assertEqual(self.app._photo.get(0, 40), (25, 85, 220))
        polygon = self.app.video.find_withtag("overlay")[0]
        np.testing.assert_allclose(self.app.video.coords(polygon),
                                   [109, 10, 89, 10, 89, 50, 109, 50])
        self.assertIs(self.app._raw_frame, self.frame)
        self.assertEqual(self.app.scan_cube.total_readings, 3)
        self.assertEqual(self.app.scan_cube.history, [2])
        self.assertTrue(self.app.scanning)

    def test_mirrored_calibration_click_samples_original_matching_sticker(self):
        self.app.mirror_camera = True
        self.app.calibrating = True
        self.app.calibration_model = ColorModel(desktop.detector.GRID_CONFIG)
        # Red is at raw x=20, which is displayed at x=99 after mirroring.
        with patch.object(ColorModel, "sample_patch", wraps=ColorModel.sample_patch) as sample:
            self.app.sample_calibration(SimpleNamespace(x=99, y=40))
        self.assertEqual(sample.call_args.args[1:3], (20, 40))
        self.assertEqual(self.app.calibration_model.samples["red"], (200, 17, 18))

    def test_detector_receives_unmirrored_frame(self):
        self.app.mirror_camera = True
        worker, capture = MagicMock(), MagicMock()
        worker.poll.return_value = None
        capture.poll.return_value = CapturedFrame(1, self.frame, time.monotonic())
        self.app._camera_worker, self.app._capture_worker = worker, capture
        self.app.camera = SimpleNamespace(tracking_enabled=True)
        try:
            with patch.object(desktop.detector, "LOW_RES_CAMERA", True), \
                 patch.object(self.app, "render_video"), patch.object(self.app, "refresh"), \
                 patch.object(self.app, "_write_vision_status"), patch.object(self.root, "after"):
                self.app.tick()
            np.testing.assert_array_equal(worker.submit.call_args.args[0], self.frame)
            self.assertIs(self.app._raw_frame, self.frame)
        finally:
            self.app._camera_worker = self.app._capture_worker = self.app.camera = None
            self.app._after_id = None

    def test_mirror_preference_survives_theme_change_and_next_launch(self):
        self.app.toggle_camera_mirror()
        self.app.toggle_theme()
        saved = json.loads(self.settings.read_text())
        self.assertEqual(saved, {"theme": "light", "keep_setting": 17, "mirror_camera": True})
        self.app.close()
        self.app = self.root = None
        gc.collect()
        self.root = tk.Tk()
        self.root.withdraw()
        self.app = desktop.CubeApp(self.root, self.args)
        self.assertTrue(self.app.mirror_camera)
        self.app.mode = "camera"
        self.app._switch_view()
        self.assertEqual(self.app.mirror_button["text"], "Mirror cam: On")
        self.app.mode = "manual"
        self.app._switch_view()
        self.assertEqual(self.app.mirror_button.winfo_manager(), "")


if __name__ == "__main__":
    unittest.main()
