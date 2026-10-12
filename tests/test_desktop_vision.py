"""Desktop camera processing and color calibration integration checks."""

import gc
import json
from pathlib import Path
import tempfile
import threading
import time
import tkinter as tk
from types import SimpleNamespace
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from gui.model import SAMPLE, SCAN
from run import parse_args
from scanner import main as scanner_main
from scanner.color_model import ColorModel, NAMES

try:
    from .test_v4 import CONFIG, FakeCapture, HSV_COLORS
except ImportError:
    from test_v4 import CONFIG, FakeCapture, HSV_COLORS


class DesktopVisionTests(unittest.TestCase):
    def setUp(self):
        from gui import app as desktop
        self.directory = tempfile.TemporaryDirectory(prefix="rubiks-desktop-vision-")
        directory = Path(self.directory.name)
        self.profile = directory / "colors.json"
        config = directory / "config.json"
        config.write_text(CONFIG.read_text())
        args = parse_args(["--manual", "--theme", "dark", "--config", str(config),
                           "--output", str(directory / "report.json")])
        self.settings_patch = patch.object(desktop, "SETTINGS", directory / "theme.json")
        self.profile_patch = patch.object(scanner_main, "COLOR_PROFILE_PATH", str(self.profile))
        self.capture_patch = patch.object(scanner_main.cv, "VideoCapture", return_value=FakeCapture())
        for mocked in (self.settings_patch, self.profile_patch, self.capture_patch):
            mocked.start()
        self.root = tk.Tk()
        self.root.withdraw()
        self.app = desktop.CubeApp(self.root, args)

    def tearDown(self):
        try:
            if not self.app.closed:
                self.app.close()
        finally:
            # Tk interpreters must be finalized on their creating thread,
            # before a later solver worker can trigger cyclic collection.
            self.app = None
            self.root = None
            gc.collect()
            for mocked in (self.capture_patch, self.profile_patch, self.settings_patch):
                mocked.stop()
            self.directory.cleanup()

    def pump_until(self, predicate, timeout=3):
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            self.root.update()
            if predicate():
                return
            time.sleep(.005)
        self.fail("The desktop operation did not finish")

    def sample(self, hsv):
        self.app._raw_frame = cv.cvtColor(np.full((600, 800, 3), hsv, np.uint8), cv.COLOR_HSV2BGR)
        self.app.sample_calibration(SimpleNamespace(x=self.app.video.winfo_width()/2,
                                                   y=self.app.video.winfo_height()/2))

    def test_six_clicks_save_calibration_and_cancel_preserves_saved_profile(self):
        self.app.switch_mode("camera")
        self.app.start_calibration()
        self.assertTrue(self.app.calibrating)
        self.assertFalse(self.app.scanning)
        calibrated = dict(HSV_COLORS)
        calibrated["r"] = (4, 240, 220)  # Default HSV boundary calls this orange.
        calibrated["b"] = (83, 240, 220)  # Default HSV boundary calls this green.
        calibrated["g"] = (61, 240, 220)
        for face_index, *_ in SCAN:
            self.sample(calibrated[scanner_main.CubeMap.Color.from_index[face_index]])
        self.assertFalse(self.app.calibrating)
        self.assertTrue(self.profile.exists())
        self.assertTrue(scanner_main.COLOR_MODEL.ready)
        saved = self.profile.read_bytes()
        model = ColorModel.load(self.profile, scanner_main.GRID_CONFIG)
        colors = "roygbw"
        labels = model.classify_pixels(np.array([calibrated[color] for color in colors], np.uint8))
        self.assertEqual([NAMES[int(label)] for label in labels],
                         [dict(r="red", o="orange", y="yellow", g="green", b="blue", w="white")[color] for color in colors])
        self.assertEqual(self.app.camera.cube_map.total_readings, 0)
        self.assertEqual(self.app.camera.cube_map.history, [])
        self.app.start_calibration()
        self.sample(calibrated["r"])
        self.sample(calibrated["y"])
        self.assertEqual(self.app.calibration_step, 2)
        self.app.rescan()
        self.assertEqual(self.app.calibration_step, 1)
        self.assertEqual(set(self.app.calibration_model.samples), {"red"})
        self.sample(calibrated["y"])
        self.app.cancel_calibration()
        self.assertEqual(self.profile.read_bytes(), saved)
        self.assertTrue(scanner_main.COLOR_MODEL.ready)

    def test_calibration_preview_skips_capture_and_keeps_manual_cube(self):
        self.app.fill_manual("sample")
        self.app.start_calibration()
        cap = self.app.camera.cap
        self.pump_until(lambda: cap.reads >= 7)
        self.assertTrue(self.app.calibrating)
        self.assertEqual(self.app.scan_cube.total_readings, 0)
        self.assertEqual(self.app.scan_cube.history, [])
        self.assertIsNotNone(self.app._raw_frame)
        np.testing.assert_array_equal(self.app._frame, self.app._raw_frame)
        # Detection may be processing an older image; calibration samples the
        # newest raw image actually displayed, independently of that worker.
        self.assertGreater(self.app._capture_sequence, 0)
        worker = self.app._camera_worker
        self.app.switch_mode("manual")
        self.assertFalse(self.app.calibrating)
        self.assertEqual(self.app.manual.state(), SAMPLE)
        self.assertIsNone(self.app._camera_worker)
        self.assertFalse(worker._thread.is_alive())
        self.assertFalse(self.profile.exists())

    def test_slow_frame_processing_does_not_block_tk_and_quit_joins_worker(self):
        self.app.switch_mode("camera")
        entered, release = threading.Event(), threading.Event()
        camera = self.app.camera
        process_frame = camera.process_frame

        def slow(frame, accumulate=True):
            entered.set()
            release.wait(2)
            return process_frame(frame, accumulate=accumulate)

        camera.process_frame = slow
        worker = self.app._camera_worker
        timer = threading.Timer(.65, release.set)
        timer.start()
        heartbeats = []
        beat_after = [None]

        def beat():
            heartbeats.append(time.monotonic())
            if not self.app.closed:
                beat_after[0] = self.root.after(20, beat)

        beat_after[0] = self.root.after(20, beat)
        try:
            self.pump_until(entered.is_set)
            deadline = time.monotonic() + .8
            while time.monotonic() < deadline:
                self.root.update()
                time.sleep(.005)
            gaps = np.diff(heartbeats)
            self.assertGreater(len(gaps), 12)
            self.assertLess(float(gaps.max()), .13, "Tk stopped servicing events while detection was busy")
            self.assertGreater(worker.dropped, 0, "Pending frames should be replaced during expensive detection")
            self.root.after_cancel(beat_after[0])
            beat_after[0] = None
            self.app.close()
            self.assertFalse(worker._thread.is_alive())
            self.assertTrue(camera.cap.released)
        finally:
            release.set()
            timer.cancel()
            if not self.app.closed and beat_after[0]:
                self.root.after_cancel(beat_after[0])


if __name__ == "__main__":
    unittest.main()
