"""Scanner and desktop integration checks using synthetic cube faces."""

import copy
import gc
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import time
import tkinter as tk
from types import SimpleNamespace
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from bridge.report_session import ReportSession
from gui.model import COLORS, ManualCube, SAMPLE, SCAN, net_cells
from run import parse_args
from scanner import main as scanner_main
from scanner.cube_state import build_cube_report
from scanner.grid_detect import GridDetector, NAME_BY_ID
from scripts.build_java import APP_ROOT

try:
    from .test_integration import SOLVED, notation_ids, reference_state
except ImportError:
    from test_integration import SOLVED, notation_ids, reference_state


CONFIG = APP_ROOT / "scanner" / "config.json"
HSV_COLORS = {
    "r": (0, 240, 220), "o": (12, 240, 220), "y": (30, 240, 220),
    "g": (80, 240, 220), "b": (110, 240, 220), "w": (0, 0, 220),
}
NAMES = {"r": "red", "o": "orange", "y": "yellow", "g": "green", "b": "blue", "w": "white"}


def face_frame(colors, *, border=0, box=(235, 135, 565, 465)):
    """A cube face in an otherwise black 800 x 600 camera image."""
    hsv = np.zeros((600, 800, 3), dtype=np.uint8)
    x0, y0, x1, y1 = box
    for i, color in enumerate(colors):
        row, col = divmod(i, 3)
        left = round(x0 + (x1 - x0) * col / 3) + border
        right = round(x0 + (x1 - x0) * (col + 1) / 3) - border
        top = round(y0 + (y1 - y0) * row / 3) + border
        bottom = round(y0 + (y1 - y0) * (row + 1) / 3) - border
        hsv[top:bottom, left:right] = HSV_COLORS[color]
    return cv.cvtColor(hsv, cv.COLOR_HSV2BGR), hsv


class FakeCapture:
    def __init__(self, colors="rrrrrrrrr"):
        self.colors = colors
        self.reads = 0
        self.released = False

    def read(self):
        self.reads += 1
        return True, face_frame(self.colors)[0]

    def release(self):
        self.released = True

    def isOpened(self):
        return True


def capture_face(camera, colors):
    for _ in range(max(scanner_main.MIN_TOTAL_READING_BUFFER, scanner_main.MIN_COLOR_COUNT_THRESHOLD)):
        camera.process_frame(face_frame(colors)[0])


class GridDetectorTests(unittest.TestCase):
    def setUp(self):
        self.detector = GridDetector(json.loads(CONFIG.read_text()))

    def test_hue_boundaries_and_white_override(self):
        # Hue is OpenCV's integer 0..179. Boundary pixels have one classification.
        pixels = np.array([
            (0, 240, 220), (3, 240, 220), (4, 240, 220), (22, 240, 220),
            (23, 240, 220), (52, 240, 220), (53, 240, 220), (97, 240, 220),
            (98, 240, 220), (146, 240, 220), (147, 240, 220), (179, 240, 220),
            (110, 60, 90), (110, 61, 90), (110, 60, 89),
        ], dtype=np.uint8)
        names = [NAME_BY_ID[i] for i in self.detector.classify_pixels(pixels)]
        self.assertEqual(names, [
            "red", "red", "orange", "orange", "yellow", "yellow", "green",
            "green", "blue", "blue", "red", "red", "white", "blue", "blue",
        ])

    def test_box_reads_stickers_in_row_major_order(self):
        colors = "rygbrowyo"
        _, hsv = face_frame(colors)
        cells = self.detector.read_box(hsv, 235, 135, 565, 465)
        self.assertEqual([name for point, name in cells], [NAMES[color] for color in colors])
        self.assertEqual([point for point, name in cells],
                         [(50, 50), (150, 50), (250, 50), (50, 150), (150, 150),
                          (250, 150), (50, 250), (150, 250), (250, 250)])

    def test_auto_location_handles_stickerless_and_black_bordered_faces(self):
        colors = "rygbrowyo"
        for border in (0, 4):
            with self.subTest(border=border):
                frame, hsv = face_frame(colors, border=border)
                cells, quad = self.detector.detect(frame, hsv)
                self.assertIsNotNone(quad)
                self.assertEqual([name for point, name in cells], [NAMES[color] for color in colors])
                np.testing.assert_allclose(quad, [[235 + border, 135 + border],
                                                 [564 - border, 135 + border],
                                                 [564 - border, 464 - border],
                                                 [235 + border, 464 - border]], atol=2)

    def test_rejects_inconsistent_sampling_patch(self):
        _, hsv = face_frame("rrrrrrrrr")
        # Split the upper-left sample patch evenly between three colors.
        hsv[168:212, 268:283] = HSV_COLORS["r"]
        hsv[168:212, 283:298] = HSV_COLORS["b"]
        hsv[168:212, 298:313] = HSV_COLORS["y"]
        self.assertIsNone(self.detector.read_box(hsv, 235, 135, 565, 465))


class ScannerV4Tests(unittest.TestCase):
    def setUp(self):
        self.profile_directory = tempfile.TemporaryDirectory(prefix="rubiks-v4-colors-")
        self.profile_patch = patch.object(scanner_main, "COLOR_PROFILE_PATH",
                                          str(Path(self.profile_directory.name) / "colors.json"))
        self.profile_patch.start()
        scanner_main.load_runtime_config(str(CONFIG))
        scanner_main.PAUSE_AT_END = False
        self.cap = FakeCapture()
        self.capture_patch = patch.object(scanner_main.cv, "VideoCapture", return_value=self.cap)
        self.capture_patch.start()
        self.camera = scanner_main.Camera()
        self.camera.set_tracking(False)
        self.camera.cube_map.reset_mapping()

    def tearDown(self):
        self.camera.close()
        self.capture_patch.stop()
        self.profile_patch.stop()
        self.profile_directory.cleanup()
        scanner_main.PAUSE_AT_END = False

    def test_preview_and_pause_draw_grid_without_accumulating_votes(self):
        raw = face_frame("rrrrrrrrr")[0]
        initial_map = copy.deepcopy(self.camera.cube_map.map)
        for _ in range(8):
            preview = raw.copy()
            self.camera.process_frame(preview, accumulate=False)
            self.assertTrue(np.any(preview != raw), "The actual sampling grid must be visible before capture")
        self.assertEqual(self.camera.cube_map.total_readings, 0)
        self.assertEqual(self.camera.cube_map.map, initial_map)
        self.camera.process_frame(raw.copy(), accumulate=True)
        current_map = copy.deepcopy(self.camera.cube_map.map)
        current_votes = copy.deepcopy(self.camera.cube_map.Color.freq)
        for _ in range(8):
            self.camera.process_frame(raw.copy(), accumulate=False)
        self.assertEqual(self.camera.cube_map.total_readings, 1)
        self.assertEqual(self.camera.cube_map.map, current_map)
        self.assertEqual(self.camera.cube_map.Color.freq, current_votes)
        self.assertEqual(self.camera.cube_map.history, [])

    def test_auto_location_falls_back_to_the_current_guide(self):
        with patch.object(scanner_main, "AUTO_LOCATE", True), \
             patch.object(scanner_main.GRID_DETECTOR, "detect", return_value=(None, None)) as detect, \
             patch.object(scanner_main.GRID_DETECTOR, "read_box", wraps=scanner_main.GRID_DETECTOR.read_box) as read_box:
            self.camera.process_frame(face_frame("rrrrrrrrr")[0], accumulate=False)
        detect.assert_called_once()
        self.assertEqual(read_box.call_args.args[1:], (235, 135, 565, 465))
        self.assertEqual(self.camera.cube_map.total_readings, 0)

    def test_guide_resize_limits_and_discards_partial_current_face_only(self):
        capture_face(self.camera, "rrrrrrrrr")
        self.camera.process_frame(face_frame("yyyyyyyyy")[0])
        self.assertEqual(self.camera.cube_map.total_readings, 1)
        captured_red = copy.deepcopy(self.camera.cube_map.map[2])
        self.camera.adjust_guide(2)
        self.assertEqual(self.camera.guide_fraction, 0.95)
        self.assertEqual(self.camera.cube_map.total_readings, 0)
        self.assertEqual(self.camera.cube_map.history, [2])
        self.assertEqual(self.camera.cube_map.map[2], captured_red)
        self.camera.adjust_guide(-2)
        self.assertEqual(self.camera.guide_fraction, 0.2)
        self.assertEqual(self.camera.cube_map.map[3][1][1], "y")
        self.assertEqual(sum(value != "_" for row in self.camera.cube_map.map[3] for value in row), 1)

    def test_complete_capture_and_repeated_undo_clear_partial_and_completed_faces(self):
        manual = ManualCube()
        manual.load_state(SAMPLE)
        for face_index, face, *_ in SCAN:
            self.assertEqual(self.camera.cube_map.index, face_index)
            capture_face(self.camera, manual.faces[face])
        cube = self.camera.cube_map
        self.assertEqual(cube.index, -1)
        self.assertTrue(scanner_main.PAUSE_AT_END)
        self.assertEqual(cube.history, [2, 3, 4, 1, 0, 5])
        self.assertEqual(cube.raw_faces_by_notation(), manual.faces)
        self.assertEqual(cube.map[5][1][1], "g")
        cube.undo_last()
        self.assertEqual(cube.index, 5)
        self.assertFalse(scanner_main.PAUSE_AT_END)
        self.camera.process_frame(face_frame(manual.faces["D"])[0])
        self.assertEqual(cube.total_readings, 1)
        cube.undo_last()
        self.assertEqual(cube.index, 0)
        self.assertEqual(cube.total_readings, 0)
        self.assertEqual(sum(value != "_" for row in cube.map[5] for value in row), 1)
        for expected in (1, 4, 3, 2):
            cube.undo_last()
            self.assertEqual(cube.index, expected)
            self.assertEqual(cube.total_readings, 0)
        self.assertEqual(cube.history, [])
        cube.undo_last()
        self.assertEqual(cube.index, 2)
        for face_index in range(6):
            self.assertEqual(cube.map[face_index][1][1], cube.Color.from_index[face_index])
            self.assertEqual(sum(value != "_" for row in cube.map[face_index] for value in row), 1)

    def test_exact_scanned_state_reaches_both_real_solvers(self):
        manual = ManualCube()
        manual.load_state(SAMPLE)
        for _, face, *_ in SCAN:
            capture_face(self.camera, manual.faces[face])
        report = build_cube_report(self.camera.cube_map.raw_faces_by_notation())
        self.assertTrue(report["valid"], report["problems"])
        self.assertEqual(report["raw_state"], SAMPLE)
        self.assertEqual(report["state"], SAMPLE)
        self.assertEqual(report["corrections"], [])
        self.assertEqual(reference_state(notation_ids(report["notation"]), SAMPLE), SOLVED)
        original = copy.deepcopy(report)
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "scan.json"
            session = ReportSession(report, output).start()
            try:
                self.assertEqual(session.job.state, SAMPLE)
                self.assertEqual(json.loads(output.read_text())["java_solver"]["status"], "pending")
                self.assertEqual(session.job.wait(10)["status"], "solved")
                session.poll()
            finally:
                session.close()
            saved = json.loads(output.read_text())
        for key, value in original.items():
            self.assertEqual(saved[key], value, key)
        self.assertEqual(reference_state(notation_ids(saved["java_solver"]["notation"]), SAMPLE), SOLVED)


class DesktopV4Tests(unittest.TestCase):
    def setUp(self):
        from gui import app as desktop
        self.desktop = desktop
        self.directory = tempfile.TemporaryDirectory(prefix="rubiks-desktop-")
        self.output = Path(self.directory.name) / "report.json"
        self.config = Path(self.directory.name) / "config.json"
        config = json.loads(CONFIG.read_text())
        config["grid"]["tracking"] = False
        self.config.write_text(json.dumps(config))
        args = parse_args(["--manual", "--theme", "dark", "--config", str(self.config), "--output", str(self.output)])
        self.settings_patch = patch.object(desktop, "SETTINGS", Path(self.directory.name) / "theme.json")
        self.settings_patch.start()
        self.profile_patch = patch.object(scanner_main, "COLOR_PROFILE_PATH",
                                          str(Path(self.directory.name) / "colors.json"))
        self.profile_patch.start()
        self.camera_patch = patch.object(scanner_main.cv, "VideoCapture", return_value=FakeCapture())
        self.open_camera = self.camera_patch.start()
        self.root = tk.Tk()
        self.root.withdraw()
        self.app = desktop.CubeApp(self.root, args)

    def tearDown(self):
        try:
            if not self.app.closed:
                self.app.close()
        finally:
            self.app = None
            self.root = None
            gc.collect()  # Finalize the destroyed Tk interpreter on this thread.
            self.camera_patch.stop()
            self.settings_patch.stop()
            self.profile_patch.stop()
            self.directory.cleanup()

    def pump_until(self, predicate, timeout=10):
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            self.root.update()
            if predicate():
                return
            time.sleep(0.01)
        self.fail("Desktop did not finish the expected operation")

    def test_manual_input_without_camera_and_both_themes_solve_same_sample(self):
        self.root.update()
        self.open_camera.assert_not_called()
        self.app.fill_manual("sample")
        self.assertEqual(self.app.manual.state(), SAMPLE)
        self.app.toggle_theme()
        self.assertEqual(self.app.theme_name, "light")
        self.assertEqual(self.root.cget("background"), self.app.palette["bg"])
        self.assertEqual(self.app.manual.state(), SAMPLE)
        self.app.toggle_theme()
        self.assertEqual(self.app.theme_name, "dark")
        self.app.primary_action()
        self.pump_until(lambda: self.app.report is not None and self.app.report["java_solver"]["status"] == "solved")
        self.assertEqual(self.app.report["state"], SAMPLE)
        self.assertEqual(self.app.kociemba.badge.cget("text"), "SOLVED")
        self.assertEqual(self.app.java.badge.cget("text"), "SOLVED")
        for notation in (self.app.kociemba.notation, self.app.java.notation):
            self.assertEqual(reference_state(notation_ids(notation), SAMPLE), SOLVED)
        self.assertEqual(json.loads(self.output.read_text()), self.app.report)
        self.open_camera.assert_not_called()

    def test_manual_paint_locks_centers_and_invalidates_abandoned_worker(self):
        self.app.fill_manual("sample")
        self.app.choose_color("b")
        cells = net_cells(self.app.editor.winfo_width(), self.app.editor.winfo_height())
        front_center = next(rect for face, index, rect in cells if face == "F" and index == 4)
        event = SimpleNamespace(x=(front_center[0] + front_center[2]) / 2,
                                y=(front_center[1] + front_center[3]) / 2)
        self.app.paint(event)
        self.assertEqual(self.app.manual.faces["F"][4], "r")
        self.app.primary_action()
        worker = self.app.report_job
        front_corner = next(rect for face, index, rect in cells if face == "F" and index == 0)
        event.x, event.y = (front_corner[0] + front_corner[2]) / 2, (front_corner[1] + front_corner[3]) / 2
        self.app.paint(event)
        self.assertEqual(self.app.manual.faces["F"][0], "b")
        self.assertTrue(worker.finished)
        self.assertFalse(worker.process.is_alive())
        self.assertIsNone(self.app.report_job)
        self.assertIsNone(self.app.report)
        self.assertFalse(self.output.exists())

    def test_preview_and_paused_desktop_keep_camera_live_without_capturing(self):
        self.app.switch_mode("camera")
        cap = self.app.camera.cap
        self.pump_until(lambda: cap.reads >= 7)
        self.assertEqual(self.app.scan_cube.total_readings, 0)
        self.app.set_scanning(True)
        self.pump_until(lambda: self.app.scan_cube.total_readings >= 1)
        self.app.set_scanning(False)
        votes = self.app.scan_cube.total_readings
        reads = cap.reads
        self.pump_until(lambda: cap.reads >= reads + 7)
        self.assertEqual(self.app.scan_cube.total_readings, votes)
        self.assertIsNotNone(self.app._photo)
        self.app.adjust_guide(0.05)
        self.assertAlmostEqual(self.app.camera.guide_fraction, 0.60)
        self.assertEqual(self.app.scan_cube.total_readings, 0)

    def test_pending_cube_check_is_responsive_and_abandoned_results_are_ignored(self):
        class PendingCheck:
            closed = False

            def poll(self):
                if self.closed:
                    raise AssertionError("An abandoned cube check must never be polled again")
                return None

            def close(self):
                self.closed = True

        self.app.switch_mode("camera")
        for action in ("undo", "restart", "mode", "quit"):
            with self.subTest(action=action):
                worker = PendingCheck()
                self.app.report_job = worker
                cap = self.app.camera.cap
                reads = cap.reads
                self.pump_until(lambda: cap.reads >= reads + 5)
                if action == "undo":
                    self.app.rescan()
                elif action == "restart":
                    self.app.reset()
                elif action == "mode":
                    self.app.switch_mode("manual")
                else:
                    self.app.close()
                self.assertTrue(worker.closed)
                self.assertIsNone(self.app.report_job)
                self.assertIsNone(self.app.report)
                self.assertFalse(self.output.exists())
                if action != "quit":
                    self.root.update()
                if action == "mode":
                    self.app.switch_mode("camera")

    def test_grid_and_contour_controls_match_selected_detection_mode(self):
        self.app.switch_mode("camera")
        self.app.refresh()
        self.assertTrue(self.app.guide_controls.grid_info())
        self.assertFalse(self.app.center_button.grid_info())
        config = json.loads(self.config.read_text())
        config["detection_mode"] = "contour"
        self.config.write_text(json.dumps(config))
        self.app.reset()
        self.assertFalse(self.app.guide_controls.grid_info())
        self.assertTrue(self.app.center_button.grid_info())
        self.app.switch_mode("manual")
        self.assertFalse(self.app.guide_controls.grid_info())
        self.assertFalse(self.app.center_button.grid_info())

    def test_abandon_controls_reap_java_and_keep_preview_responsive(self):
        real_popen = subprocess.Popen
        log = Path(self.directory.name) / "input.txt"

        def launcher(command, **kwargs):
            return real_popen([sys.executable, str(APP_ROOT / "tests" / "fake_worker.py"), "sleep", str(log)], **kwargs)

        self.app.switch_mode("camera")
        for action in ("undo", "restart", "mode", "quit"):
            with self.subTest(action=action):
                if action == "mode":
                    # Return to camera before testing the next abandon action.
                    self.assertEqual(self.app.mode, "camera")
                cube = self.app.scan_cube
                cube.history = [2, 3, 4, 1, 0, 5]
                cube.index = -1
                scanner_main.PAUSE_AT_END = True
                report = build_cube_report({face: [COLORS[face]] * 9 for face in "URFDLB"})
                with patch("bridge.java_solver.subprocess.Popen", side_effect=launcher):
                    self.app.report = report
                    self.app.session = ReportSession(report, self.output).start()
                    job = self.app.session.job
                    self.pump_until(log.exists)
                cap = self.app.camera.cap
                reads = cap.reads
                self.pump_until(lambda: cap.reads >= reads + 5)
                self.assertEqual(job.poll(), None)
                if action == "undo":
                    self.app.rescan()
                    self.assertEqual(cube.index, 5)
                    self.assertEqual(len(cube.history), 5)
                elif action == "restart":
                    self.app.reset()
                    self.assertEqual(self.app.scan_cube.index, 2)
                    self.assertEqual(self.app.scan_cube.history, [])
                elif action == "mode":
                    self.app.switch_mode("manual")
                    self.assertTrue(cap.released)
                else:
                    self.app.close()
                self.assertEqual(job.wait(3)["status"], "cancelled")
                self.assertIsNotNone(job.process.poll())
                self.assertIsNone(self.app.session)
                self.assertEqual(json.loads(self.output.read_text())["java_solver"]["status"], "cancelled")
                if action == "mode":
                    self.app.switch_mode("camera")
                if log.exists():
                    log.unlink()


if __name__ == "__main__":
    unittest.main()
