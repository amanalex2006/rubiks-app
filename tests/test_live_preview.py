"""Real Tk preview events stay independent of blocking camera/detector work."""

import gc
import json
from pathlib import Path
import tempfile
import threading
import time
import tkinter as tk
import unittest
from unittest.mock import patch

import numpy as np

from run import parse_args
from scanner import main as scanner_main


class PacedCapture:
    """A driver-paced camera with a new identifiable image every 70 ms."""

    def __init__(self):
        self.reads = 0
        self.release_count = 0
        self.read_threads = set()
        self._closed = threading.Event()

    def isOpened(self):
        return not self._closed.is_set()

    def set(self, *_):
        return True

    def read(self):
        self.read_threads.add(threading.get_ident())
        if self._closed.wait(.07):
            return False, None
        self.reads += 1
        return True, np.full((600, 800, 3), self.reads % 180, np.uint8)

    def release(self):
        self.release_count += 1
        self._closed.set()


class LivePreviewTests(unittest.TestCase):
    def test_new_camera_images_continue_while_detection_waits(self):
        from gui import app as desktop

        with tempfile.TemporaryDirectory(prefix="rubiks-live-preview-") as folder:
            directory = Path(folder)
            config = json.loads((desktop.APP_ROOT / "scanner" / "config.json").read_text())
            config["processing_backend"] = "cpu"
            config_path = directory / "config.json"
            config_path.write_text(json.dumps(config))
            profile_path = directory / "colors.json"
            args = parse_args(["--manual", "--config", str(config_path),
                               "--output", str(directory / "report.json")])
            cap = PacedCapture()
            entered, release = threading.Event(), threading.Event()
            real_process = scanner_main.Camera.process_frame

            def slow(camera, frame, accumulate=True):
                entered.set()
                if not release.wait(3):
                    raise RuntimeError("Test did not release detection")
                return real_process(camera, frame, accumulate=accumulate)

            with patch.object(desktop, "APP_ROOT", directory), \
                 patch.object(desktop, "SETTINGS", directory / "theme.json"), \
                 patch.object(scanner_main, "COLOR_PROFILE_PATH", str(profile_path)), \
                 patch.object(scanner_main.cv, "VideoCapture", return_value=cap), \
                 patch.object(scanner_main.Camera, "process_frame", new=slow):
                root = tk.Tk()
                root.withdraw()
                app = desktop.CubeApp(root, args)
                heartbeats = []
                beat_id = [None]

                def beat():
                    heartbeats.append(time.monotonic())
                    beat_id[0] = root.after(20, beat)

                def pump_until(predicate, timeout):
                    deadline = time.monotonic() + timeout
                    while time.monotonic() < deadline:
                        root.update()
                        if predicate():
                            return
                        time.sleep(.003)
                    self.fail("The camera operation did not finish")

                capture_worker = detector_worker = None
                try:
                    app.switch_mode("camera")
                    capture_worker = app._capture_worker
                    detector_worker = app._camera_worker
                    beat_id[0] = root.after(20, beat)
                    pump_until(entered.is_set, 1.5)
                    previews = set()
                    deadline = time.monotonic() + .6
                    while time.monotonic() < deadline:
                        root.update()
                        if app._raw_frame is not None:
                            previews.add(int(app._raw_frame[0, 0, 0]))
                            self.assertIs(app._frame, app._raw_frame,
                                          "Preview must use the displayed raw image")
                        time.sleep(.003)
                    self.assertGreaterEqual(len(previews), 6,
                                            "Preview waited for detection instead of showing new camera images")
                    self.assertFalse(release.is_set())
                    self.assertGreaterEqual(len(heartbeats), 20)
                    self.assertLess(float(np.diff(heartbeats).max()), .14,
                                    "Camera reads or detection blocked Tk events")
                    self.assertNotIn(threading.get_ident(), cap.read_threads,
                                     "Camera.read must run outside the Tk thread")
                    self.assertGreater(app._frame_rate, 5)
                    self.assertEqual(app._processed_fps, 0,
                                     "Live-video rate must not be labelled as detection throughput")
                    self.assertGreater(detector_worker.dropped, 0)
                    self.assertFalse(profile_path.exists(), "Preview must not create a calibration profile")
                    root.after_cancel(beat_id[0])
                    beat_id[0] = None
                    release.set()
                    app.close()
                    self.assertFalse(detector_worker._thread.is_alive())
                    self.assertFalse(capture_worker._thread.is_alive())
                    self.assertEqual(cap.release_count, 1)
                finally:
                    release.set()
                    try:
                        if not app.closed:
                            if beat_id[0]:
                                root.after_cancel(beat_id[0])
                            app.close()
                    finally:
                        # The detector's bound processor retains CubeApp after
                        # its thread joins. Drop it before collecting Tk cycles.
                        capture_worker = detector_worker = None
                        app = root = None
                        gc.collect()


if __name__ == "__main__":
    unittest.main()
