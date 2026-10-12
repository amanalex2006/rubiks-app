"""Desktop result cards expose the local viewer and clean up its server."""
import copy
import gc
from pathlib import Path
import tempfile
import tkinter as tk
import unittest
from unittest.mock import patch

from bridge.java_solver import solver_result
from gui import app as desktop
from run import parse_args


SOLVED = "".join(face * 9 for face in "URFDLB")


class ViewerDesktopTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory(prefix="rubiks-viewer-desktop-")
        folder = Path(self.directory.name)
        self.patches = [patch.object(desktop, "SETTINGS", folder / "theme.json"),
                        patch.object(desktop.detector, "COLOR_PROFILE_PATH", str(folder / "colors.json")),
                        patch.object(desktop, "ViewerServer"),
                        patch.object(desktop, "EmbeddedViewer")]
        self.settings, self.profile, self.server_class, self.embedded_class = [item.start() for item in self.patches]
        self.server = self.server_class.return_value
        self.embedded = self.embedded_class.return_value
        self.embedded.poll.return_value = "ready"
        self.server.open_report.return_value = "http://127.0.0.1:12345/?token=test"
        self.root = tk.Tk()
        self.root.withdraw()
        self.app = desktop.CubeApp(self.root, parse_args(["--manual", "--theme", "dark",
                                                        "--output", str(folder / "report.json")]))
        self.report = {"state": SOLVED, "valid": True, "notation": "", "corrections": [],
                       "java_solver": solver_result("solved", notation="", elapsed_ms=0)}

    def tearDown(self):
        try:
            if not self.app.closed:
                self.app.close()
        finally:
            self.app = None
            self.root = None
            gc.collect()  # Finalize the destroyed Tk interpreter on this thread.
            for item in reversed(self.patches):
                item.stop()
            self.directory.cleanup()

    def test_zero_move_solutions_have_enabled_step_controls(self):
        self.assertEqual(str(self.app.kociemba.steps_button["state"]), "disabled")
        self.app.report = self.report
        self.app.update_results()
        for card in (self.app.kociemba, self.app.java):
            self.assertEqual(str(card.steps_button["state"]), "normal")
            self.assertEqual(str(card.copy_button["state"]), "disabled")

    def test_pending_and_failed_java_do_not_expose_a_fake_solution(self):
        for status in ("pending", "timed_out", "process_failed", "missing_java"):
            with self.subTest(status=status):
                report = copy.deepcopy(self.report)
                report["java_solver"] = solver_result(status)
                self.app.report = report
                self.app.update_results()
                self.assertEqual(str(self.app.kociemba.steps_button["state"]), "normal")
                self.assertEqual(str(self.app.java.steps_button["state"]), "disabled")

    def test_open_update_theme_clear_and_close_viewer(self):
        self.app.report = self.report
        self.app.update_results()
        self.app.java.steps_button.invoke()
        self.server_class.assert_called_once_with()
        self.server.open_report.assert_called_once_with(self.report, theme="dark", solver="java")
        self.embedded_class.assert_called_once_with(self.app.steps_pane, background=self.app.palette["bg"])
        self.embedded.load.assert_called_once_with(self.server.open_report.return_value + "&embedded=1")
        self.embedded.select_solver.assert_called_once_with("java")
        self.assertTrue(self.app.steps_visible)
        self.assertFalse(self.app.workspace.grid_info())
        self.assertFalse(self.app.solution_section.grid_info())
        self.app.toggle_theme()
        self.server.update_report.assert_called_with(self.report, theme="light")
        self.app.clear_results()
        self.assertFalse(self.app.steps_visible)
        self.embedded.close.assert_called_once_with()
        self.assertEqual(str(self.app.kociemba.steps_button["state"]), "disabled")
        self.assertEqual(str(self.app.java.steps_button["state"]), "disabled")
        self.app.close()
        self.server.close.assert_called_once_with()

    def test_failed_embedded_launch_shows_an_inline_error(self):
        self.app.report = self.report
        self.embedded.load.side_effect = RuntimeError("WebView2 is unavailable")
        self.app.open_steps("kociemba")
        self.assertIn("WebView2 is unavailable", self.app.steps_message["text"])
        self.assertTrue(self.app.steps_visible)

    def test_back_and_reopen_keep_the_same_view_and_solver_progress(self):
        self.app.report = self.report
        self.app.open_steps("kociemba")
        self.app.back_to_cube()
        self.assertFalse(self.app.steps_visible)
        self.assertTrue(self.app.workspace.grid_info())
        self.app.open_steps("java")
        self.server.open_report.assert_called_once()
        self.embedded_class.assert_called_once()
        self.assertEqual(self.embedded.load.call_args.args[0], self.server.open_report.return_value + "&embedded=1")
        self.embedded.select_solver.assert_called_with("java")


if __name__ == "__main__":
    unittest.main()
