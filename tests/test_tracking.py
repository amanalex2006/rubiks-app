"""Cube tracking checks with controlled perspective, motion, and obscured frames."""

import gc
import json
from pathlib import Path
import tempfile
import tkinter as tk
import unittest
from unittest.mock import patch

import cv2 as cv
import numpy as np

from bridge.report_session import ReportSession
from gui.model import ManualCube, SAMPLE, SCAN
from run import parse_args
from scanner import main as scanner_main
from scanner.cube_state import build_cube_report
from scanner.color_model import ColorModel
from scanner.grid_detect import GridDetector
from scanner.grid_tracking import FaceTracker
from scripts.build_java import APP_ROOT

try:
    from .test_integration import SOLVED, notation_ids, reference_state
    from .test_v4 import CONFIG, FakeCapture, HSV_COLORS, NAMES
except ImportError:
    from test_integration import SOLVED, notation_ids, reference_state
    from test_v4 import CONFIG, FakeCapture, HSV_COLORS, NAMES


BASE_QUAD = np.array([[230, 145], [565, 130], [590, 470], [210, 490]], np.float32)
PATTERN = "bygrrwoyo"


def moving_face(colors=PATTERN, quad=None, *, border=3, hsv_colors=None):
    """Project a bordered 3x3 face into a camera frame without changing cell order."""
    quad = BASE_QUAD if quad is None else np.asarray(quad, np.float32)
    face = np.zeros((300, 300, 3), np.uint8)
    for index, color in enumerate(colors):
        row, col = divmod(index, 3)
        face[row * 100 + border:(row + 1) * 100 - border,
             col * 100 + border:(col + 1) * 100 - border] = (hsv_colors or HSV_COLORS)[color]
    face = cv.cvtColor(face, cv.COLOR_HSV2BGR)
    transform = cv.getPerspectiveTransform(
        np.array([[0, 0], [299, 0], [299, 299], [0, 299]], np.float32), quad)
    return cv.warpPerspective(face, transform, (800, 600), flags=cv.INTER_NEAREST)


def jitter_quad(step):
    offset = np.array([step * 1.2 + 3 * np.sin(step * .8), 4 * np.cos(step * .6)], np.float32)
    return BASE_QUAD + offset


class FaceTrackingTests(unittest.TestCase):
    def setUp(self):
        config = json.loads(CONFIG.read_text())
        self.tracker = FaceTracker(GridDetector(config), config)

    def acquire(self, frame, expected="red"):
        result = (None, None, "searching")
        for _ in range(8):
            result = self.tracker.update(frame.copy(), expected)
            if result[2] == "tracking":
                return result
        self.fail("A visible, sharp cube face was not acquired")

    def test_perspective_face_reads_all_nine_cells_in_original_order(self):
        quads = [BASE_QUAD,
                 np.array([[250, 175], [575, 90], [650, 440], [185, 520]], np.float32),
                 np.array([[170, 90], [625, 140], [560, 490], [240, 445]], np.float32)]
        for quad in quads:
            with self.subTest(quad=quad.tolist()):
                self.tracker.reset()
                cells, actual_quad, status = self.acquire(moving_face(quad=quad))
                self.assertEqual(status, "tracking")
                self.assertEqual([name for _, name in cells], [NAMES[color] for color in PATTERN])
                np.testing.assert_allclose(actual_quad, quad, atol=15)

    def test_tracks_jitter_translation_and_preserves_corner_identity(self):
        self.acquire(moving_face())
        tracked = 0
        for step in range(1, 25):
            quad = jitter_quad(step)
            cells, actual_quad, status = self.tracker.update(moving_face(quad=quad), "red")
            if status == "tracking":
                tracked += 1
                self.assertEqual([name for _, name in cells], [NAMES[color] for color in PATTERN])
                np.testing.assert_allclose(actual_quad, quad, atol=15)
        self.assertGreaterEqual(tracked, 20, "Small hand motion should not repeatedly lose a sharp face")

    def test_all_six_uniform_faces_with_sticker_borders_remain_readable(self):
        for color in "ryowbg":
            with self.subTest(color=color):
                self.tracker.reset()
                cells, _, status = self.acquire(moving_face(color * 9), NAMES[color])
                self.assertEqual(status, "tracking")
                self.assertEqual([name for _, name in cells], [NAMES[color]] * 9)

    def test_gradual_camera_roll_keeps_sticker_and_corner_correspondence(self):
        self.acquire(moving_face())
        center = BASE_QUAD.mean(axis=0)
        tracked = 0
        for degrees in range(3, 61, 3):
            angle = np.deg2rad(degrees)
            rotation = np.array([[np.cos(angle), -np.sin(angle)],
                                 [np.sin(angle), np.cos(angle)]], np.float32)
            quad = (BASE_QUAD - center) @ rotation.T + center
            cells, actual_quad, status = self.tracker.update(moving_face(quad=quad), "red")
            if status == "tracking":
                tracked += 1
                self.assertEqual([name for _, name in cells], [NAMES[color] for color in PATTERN])
                # The sampling face may be inset from the physical outer border.
                # Each corner must continue to refer to the same physical corner.
                for index, corner in enumerate(actual_quad):
                    self.assertEqual(int(np.argmin(np.linalg.norm(quad - corner, axis=1))), index)
        self.assertGreaterEqual(tracked, 15, "Slow rotation must keep the same sticker correspondence")

    def test_rejects_wrong_center_and_colored_room_rectangle(self):
        frame = moving_face()
        for _ in range(8):
            cells, _, status = self.tracker.update(frame.copy(), "blue")
            self.assertIsNone(cells)
            self.assertNotEqual(status, "tracking")
        self.tracker.reset()
        room = moving_face("rrrrrrrrr", border=0)
        for _ in range(8):
            cells, _, status = self.tracker.update(room.copy(), "red")
            self.assertIsNone(cells)
            self.assertNotEqual(status, "tracking")

    def test_acquires_against_bright_wall_with_adjacent_skin_colored_hand(self):
        for wall in (160, 230):
            with self.subTest(wall=wall):
                self.tracker.reset()
                frame = moving_face()
                mask = np.zeros(frame.shape[:2], np.uint8)
                cv.fillConvexPoly(mask, BASE_QUAD.astype(np.int32), 255)
                frame[mask == 0] = (wall, wall, wall)
                skin = cv.cvtColor(np.array([[[12, 95, 175]]], np.uint8), cv.COLOR_HSV2BGR)[0, 0]
                cv.ellipse(frame, (175, 365), (72, 115), 20, 0, 360,
                           tuple(int(value) for value in skin), -1)
                # Keep the hand outside sticker centers; outer-left face edge may be touched.
                cells, _, status = self.acquire(frame)
                self.assertEqual(status, "tracking")
                self.assertEqual([name for _, name in cells], [NAMES[color] for color in PATTERN])

    def test_blur_and_center_occlusion_pause_readings_then_reacquire(self):
        good = moving_face()
        self.acquire(good)
        obscured = good.copy()
        cv.rectangle(obscured, (350, 260), (460, 365), (0, 0, 0), -1)
        for bad in (cv.GaussianBlur(good, (61, 61), 18), obscured):
            with self.subTest(blurred=bad is not obscured):
                cells, _, status = self.tracker.update(bad, "red")
                self.assertIsNone(cells)
                self.assertNotEqual(status, "tracking")
                self.acquire(good)

    def test_lost_and_partly_outside_frame_do_not_produce_cells(self):
        self.acquire(moving_face())
        blank = np.zeros((600, 800, 3), np.uint8)
        for _ in range(4):
            cells, quad, status = self.tracker.update(blank.copy(), "red")
            self.assertIsNone(cells)
            self.assertNotEqual(status, "tracking")
        self.acquire(moving_face())
        clipped = BASE_QUAD - np.array([360, 0], np.float32)
        for _ in range(4):
            cells, _, status = self.tracker.update(moving_face(quad=clipped), "red")
            self.assertIsNone(cells)
            self.assertNotEqual(status, "tracking")
        self.acquire(moving_face())


class TrackingCaptureTests(unittest.TestCase):
    def setUp(self):
        self.profile_directory = tempfile.TemporaryDirectory(prefix="rubiks-tracking-colors-")
        self.profile_patch = patch.object(scanner_main, "COLOR_PROFILE_PATH",
                                          str(Path(self.profile_directory.name) / "colors.json"))
        self.profile_patch.start()
        scanner_main.load_runtime_config(str(CONFIG))
        scanner_main.PAUSE_AT_END = False
        self.cap = FakeCapture()
        self.capture_patch = patch.object(scanner_main.cv, "VideoCapture", return_value=self.cap)
        self.capture_patch.start()
        self.camera = scanner_main.Camera()
        self.camera.set_tracking(True)

    def tearDown(self):
        self.camera.close()
        self.capture_patch.stop()
        self.profile_patch.stop()
        self.profile_directory.cleanup()
        scanner_main.PAUSE_AT_END = False

    def test_preview_tracks_without_votes_and_unreliable_frames_cannot_capture(self):
        frame = moving_face("rrrrrrrrr")
        for _ in range(10):
            self.camera.process_frame(frame.copy(), accumulate=False)
        self.assertEqual(self.camera.tracking_status, "tracking")
        self.assertEqual(self.camera.cube_map.total_readings, 0)
        self.assertEqual(self.camera.cube_map.history, [])
        self.camera.process_frame(frame.copy())
        self.camera.process_frame(np.zeros_like(frame))
        self.assertEqual(self.camera.cube_map.total_readings, 0)
        self.assertEqual(self.camera.cube_map.history, [])
        self.assertNotEqual(self.camera.tracking_status, "tracking")

    def test_moving_six_face_capture_keeps_exact_state_and_both_real_solutions(self):
        manual = ManualCube()
        manual.load_state(SAMPLE)
        for face_index, face, *_ in SCAN:
            for step in range(30):
                if self.camera.cube_map.index != face_index:
                    break
                self.camera.process_frame(moving_face(manual.faces[face], jitter_quad(step)))
            self.assertNotEqual(self.camera.cube_map.index, face_index, f"Face {face} was not captured while moving")
        report = build_cube_report(self.camera.cube_map.raw_faces_by_notation())
        self.assertTrue(report["valid"], report["problems"])
        self.assertEqual(report["raw_state"], SAMPLE)
        self.assertEqual(report["state"], SAMPLE)
        self.assertEqual(report["corrections"], [])
        self.assertEqual(reference_state(notation_ids(report["notation"]), SAMPLE), SOLVED)
        with tempfile.TemporaryDirectory() as directory:
            session = ReportSession(report, Path(directory) / "report.json").start()
            try:
                self.assertEqual(session.job.state, SAMPLE)
                self.assertEqual(session.job.wait(10)["status"], "solved")
                session.poll()
            finally:
                session.close()
        self.assertEqual(reference_state(notation_ids(report["java_solver"]["notation"]), SAMPLE), SOLVED)

    def test_saved_calibration_corrects_shifted_camera_colors_before_both_solvers(self):
        shifted = dict(HSV_COLORS)
        shifted.update(r=(4, 240, 220), b=(83, 240, 220), g=(61, 240, 220))
        config = json.loads(CONFIG.read_text())
        baseline = GridDetector(config)
        self.assertEqual(int(baseline.classify_pixels(np.array([shifted["r"]], np.uint8))[0]), 1)
        self.assertEqual(int(baseline.classify_pixels(np.array([shifted["b"]], np.uint8))[0]), 3)
        model = ColorModel(config)
        for color, hsv in shifted.items():
            rgb = cv.cvtColor(np.array([[hsv]], np.uint8), cv.COLOR_HSV2RGB)[0, 0]
            model.add_sample(NAMES[color], tuple(int(value) for value in rgb))
        model.save(scanner_main.COLOR_PROFILE_PATH)
        scanner_main.load_runtime_config(str(CONFIG))
        self.camera.close()
        self.camera = scanner_main.Camera()
        self.camera.set_tracking(True)
        manual = ManualCube()
        manual.load_state(SAMPLE)
        for face_index, face, *_ in SCAN:
            for step in range(30):
                if self.camera.cube_map.index != face_index:
                    break
                self.camera.process_frame(moving_face(manual.faces[face], jitter_quad(step), hsv_colors=shifted))
            self.assertNotEqual(self.camera.cube_map.index, face_index, f"Calibrated face {face} was not captured")
        report = build_cube_report(self.camera.cube_map.raw_faces_by_notation())
        self.assertTrue(report["valid"], report["problems"])
        self.assertEqual(report["raw_state"], SAMPLE)
        self.assertEqual(report["state"], SAMPLE)
        self.assertEqual(report["corrections"], [])
        self.assertEqual(reference_state(notation_ids(report["notation"]), SAMPLE), SOLVED)
        session = ReportSession(report, Path(self.profile_directory.name) / "report.json").start()
        try:
            self.assertEqual(session.job.state, SAMPLE)
            self.assertEqual(session.job.wait(10)["status"], "solved")
            session.poll()
        finally:
            session.close()
        self.assertEqual(reference_state(notation_ids(report["java_solver"]["notation"]), SAMPLE), SOLVED)


class TrackingDesktopTests(unittest.TestCase):
    def setUp(self):
        from gui import app as desktop
        self.desktop = desktop
        self.directory = tempfile.TemporaryDirectory(prefix="rubiks-tracking-desktop-")
        self.config = Path(self.directory.name) / "config.json"
        config = json.loads(CONFIG.read_text())
        config["grid"]["tracking"] = True
        self.config.write_text(json.dumps(config))
        args = parse_args(["--manual", "--theme", "dark", "--config", str(self.config),
                           "--output", str(Path(self.directory.name) / "report.json")])
        self.settings_patch = patch.object(desktop, "SETTINGS", Path(self.directory.name) / "theme.json")
        self.settings_patch.start()
        self.profile_patch = patch.object(scanner_main, "COLOR_PROFILE_PATH",
                                          str(Path(self.directory.name) / "colors.json"))
        self.profile_patch.start()
        self.capture_patch = patch.object(scanner_main.cv, "VideoCapture", return_value=FakeCapture())
        self.capture_patch.start()
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
            self.capture_patch.stop()
            self.settings_patch.stop()
            self.profile_patch.stop()
            self.directory.cleanup()

    def test_tracking_toggle_resets_partial_votes_and_matches_controls(self):
        self.app.switch_mode("camera")
        self.app.refresh()
        camera = self.app.camera
        self.assertTrue(camera.tracking_enabled)
        self.assertTrue(self.app.tracking_button.grid_info())
        self.assertFalse(self.app.guide_controls.grid_info())
        frame = moving_face("rrrrrrrrr")
        for _ in range(10):
            camera.process_frame(frame.copy(), accumulate=False)
        camera.process_frame(frame.copy())
        self.assertEqual(camera.cube_map.total_readings, 1)
        self.app.scanning = True
        self.app.toggle_tracking()
        self.assertFalse(camera.tracking_enabled)
        self.assertFalse(self.app.scanning)
        self.assertEqual(camera.cube_map.total_readings, 0)
        self.assertTrue(self.app.guide_controls.grid_info())
        self.app.toggle_tracking()
        self.assertTrue(camera.tracking_enabled)
        self.assertFalse(self.app.guide_controls.grid_info())
        self.app.switch_mode("manual")
        self.assertFalse(self.app.tracking_button.grid_info())
        self.app.fill_manual("sample")
        self.app.toggle_theme()
        self.assertEqual(self.app.theme_name, "light")
        self.assertEqual(self.app.manual.state(), SAMPLE)
        self.app.toggle_theme()
        self.assertEqual(self.app.theme_name, "dark")
        self.assertEqual(self.app.manual.state(), SAMPLE)


if __name__ == "__main__":
    unittest.main()
