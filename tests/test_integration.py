import copy
import json
import os
from pathlib import Path
import random
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import unittest
from unittest.mock import patch
import warnings

from bridge.java_solver import DEFAULT_JAR, JavaSolveJob, parse_response, solver_result
from bridge.report_session import ReportSession
from run import parse_args, state_report
from scripts.build_java import APP_ROOT, build, needs_build

with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    from kociemba.pykociemba.cubiecube import CubieCube, moveCube
    from kociemba.pykociemba.facecube import FaceCube


SOLVED = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"


def reference_state(moves, state=SOLVED):
    cube = FaceCube(state).toCubieCube()
    for move in moves:
        for _ in range(move // 6 + 1):
            cube.multiply(moveCube[move % 6])
    return cube.toFaceCube().to_String()


def notation_ids(notation):
    return ["URFDLB".index(move[0]) + {"": 0, "2": 6, "'": 12}[move[1:]]
            for move in notation.split()]


def swap_stickers(*pairs):
    values = list(SOLVED)
    for a, b in pairs:
        values[a], values[b] = values[b], values[a]
    return "".join(values)


class JavaModelTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if needs_build():
            build()
        cls.classes = tempfile.TemporaryDirectory(prefix="rubiks-model-")
        subprocess.run(["javac", "--release", "17", "-cp", str(DEFAULT_JAR),
                        "-d", cls.classes.name, str(APP_ROOT / "tests" / "CubeModelProbe.java")],
                       check=True, capture_output=True)
        cls.classpath = str(DEFAULT_JAR) + os.pathsep + cls.classes.name

    @classmethod
    def tearDownClass(cls):
        cls.classes.cleanup()

    def model(self, state, moves):
        result = subprocess.run(["java", "-cp", self.classpath, "CubeModelProbe", state,
                                 *map(str, moves)], check=True, capture_output=True, text=True, timeout=10)
        return result.stdout.strip()

    def test_all_18_moves_against_independent_kociemba_model(self):
        seed_state = reference_state([1, 0, 8, 16, 5])
        for state in (SOLVED, seed_state):
            for move in range(18):
                with self.subTest(state=state, move=move):
                    self.assertEqual(self.model(state, [move]), reference_state([move], state))

    def test_inverse_and_four_turns(self):
        for face in range(6):
            with self.subTest(face=face):
                self.assertEqual(self.model(SOLVED, [face, face + 12]), SOLVED)
                self.assertEqual(self.model(SOLVED, [face] * 4), SOLVED)
                self.assertEqual(self.model(SOLVED, [face + 6] * 2), SOLVED)

    def test_random_move_sequences_and_facelet_round_trip(self):
        rng = random.Random(2026)
        for _ in range(6):
            moves = [rng.randrange(18) for _ in range(15)]
            state = reference_state(moves)
            self.assertEqual(self.model(SOLVED, moves), state)
            self.assertEqual(self.model(state, []), state)

    def test_real_solver_solved_and_short_scrambles(self):
        for moves in ([], [0], [1], [2], [3], [4], [5], [7], [14], [1, 0, 8], [16, 5, 6, 2]):
            with self.subTest(moves=moves):
                state = reference_state(moves)
                job = JavaSolveJob(state).start()
                try:
                    result = job.wait(10)
                    self.assertIsNotNone(result)
                    self.assertEqual(result["status"], "solved", result)
                    self.assertEqual(reference_state(notation_ids(result["notation"]), state), SOLVED)
                    if not moves:
                        self.assertEqual(result["notation"], "")
                    self.assertIsNotNone(job.process.poll())
                finally:
                    job.close()

    def test_illegal_cubes_and_input(self):
        cases = [
            ("", "invalid_input"),
            ("X" + SOLVED[1:], "invalid_input"),
            ("R" + SOLVED[1:], "invalid_input"),
            (swap_stickers((4, 13)), "invalid_input"),
            (swap_stickers((5, 10)), "invalid_cube"),  # flipped edge
            (swap_stickers((8, 9), (9, 20)), "invalid_cube"),  # twisted corner
            (swap_stickers((5, 7), (10, 19)), "invalid_cube"),  # edge permutation parity
            (swap_stickers((9, 18)), "invalid_cube"),  # impossible piece colors
        ]
        for state, status in cases:
            with self.subTest(state=state):
                job = JavaSolveJob(state).start()
                self.assertEqual(job.wait(5)["status"], status)
                job.close()

    def test_runtime_path_uses_no_python_sockets(self):
        with patch.object(socket, "socket", side_effect=AssertionError("Networking is disabled")):
            report = state_report(reference_state([1]))
            self.assertTrue(report["valid"])
            job = JavaSolveJob(report["state"]).start()
            self.assertEqual(job.wait(5)["status"], "solved")
            job.close()

    def test_jar_path_containing_spaces(self):
        with tempfile.TemporaryDirectory(prefix="rubiks jar space ") as directory:
            jar = Path(directory) / "solver with spaces.jar"
            shutil.copyfile(DEFAULT_JAR, jar)
            job = JavaSolveJob(SOLVED, jar=jar).start()
            self.assertEqual(job.wait(5)["status"], "solved")
            job.close()


class PipeFailureTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory(prefix="rubiks-pipes-")
        self.log = Path(self.directory.name) / "input.txt"
        self.real_popen = subprocess.Popen

    def tearDown(self):
        self.directory.cleanup()

    def launcher(self, mode):
        def launch(command, **kwargs):
            self.assertEqual(command[1], "-Xmx512m")
            self.assertFalse(kwargs["shell"])
            return self.real_popen([sys.executable, str(APP_ROOT / "tests" / "fake_worker.py"),
                                    mode, str(self.log)], **kwargs)
        return launch

    def run_fake(self, mode, **options):
        with patch("bridge.java_solver.subprocess.Popen", side_effect=self.launcher(mode)):
            job = JavaSolveJob(SOLVED, **options).start()
            result = job.wait(5)
            if result is None:
                job.cancel()
                self.fail("Child process was not completed or terminated")
        self.assertIsNotNone(job.process.poll())
        return job, result

    def test_exact_input_and_stderr_drain(self):
        _, result = self.run_fake("flood")
        self.assertEqual(result["status"], "solved")
        self.assertEqual(self.log.read_text(), SOLVED + "\n")

    def test_malformed_response(self):
        _, result = self.run_fake("bad")
        self.assertEqual(result["status"], "malformed_response")

    def test_child_failure(self):
        _, result = self.run_fake("exit")
        self.assertEqual(result["status"], "process_failed")
        self.assertIn("Simulated child failure", result["error"]["message"])

    def test_timeout_reaps_process(self):
        _, result = self.run_fake("sleep", timeout=0.3)
        self.assertEqual(result["status"], "timed_out")

    def test_cancel_reaps_process(self):
        with patch("bridge.java_solver.subprocess.Popen", side_effect=self.launcher("sleep")):
            job = JavaSolveJob(SOLVED).start()
            deadline = time.monotonic() + 3
            while not self.log.exists() and time.monotonic() < deadline:
                time.sleep(0.01)
            self.assertTrue(self.log.exists())
            job.cancel()
        self.assertEqual(job.wait()["status"], "cancelled")
        self.assertIsNotNone(job.process.poll())

    def test_cancel_before_launch(self):
        job = JavaSolveJob(SOLVED)
        job.cancel()
        job.start()
        self.assertEqual(job.wait(3)["status"], "cancelled")
        self.assertIsNone(job.process)

    def test_missing_java_and_jar(self):
        job = JavaSolveJob(SOLVED, java=str(Path(self.directory.name) / "missing-java.exe")).start()
        self.assertEqual(job.wait(3)["status"], "missing_java")
        job = JavaSolveJob(SOLVED, jar=Path(self.directory.name) / "missing.jar").start()
        self.assertEqual(job.wait(3)["status"], "missing_jar")

    def test_reject_invalid_wire_messages(self):
        for output in ("", "RUBIKS_PIPE_V2\tSOLVED\t\t0\t0\t0\t\t\n",
                       "RUBIKS_PIPE_V1\tSOLVED\tX\t0\t0\t0\t\t\n",
                       "RUBIKS_PIPE_V1\tSOLVED\t\t-1\t0\t0\t\t\n",
                       "RUBIKS_PIPE_V1\tFAILED\t\t0\t0\t0\t\t\n",
                       "RUBIKS_PIPE_V1\tSOLVED\t\t0\t0\t0\t\t\nnoise\n"):
            with self.subTest(output=output), self.assertRaises(ValueError):
                parse_response(output)


class ReportTests(unittest.TestCase):
    def test_report_preserves_fields_and_corrected_final_state(self):
        report = state_report(reference_state([2, 0]))
        report["raw_state"] = SOLVED
        report["corrections"] = [{"type": "face_rotation", "detail": {"face": "F"}}]
        original = copy.deepcopy(report)
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "report.json"
            session = ReportSession(report, output).start()
            pending = json.loads(output.read_text())
            self.assertEqual(pending["java_solver"]["status"], "pending")
            self.assertEqual(session.job.state, original["state"])
            session.job.wait(5)
            self.assertTrue(session.poll())
            session.close()
            final = json.loads(output.read_text())
        for key, value in original.items():
            self.assertEqual(final[key], value, key)
        result = final["java_solver"]
        self.assertEqual(result["status"], "solved")
        self.assertEqual(reference_state(notation_ids(result["notation"]), final["state"]), SOLVED)

    def test_java_failure_keeps_kociemba_and_validity(self):
        report = state_report(reference_state([1]))
        original = copy.deepcopy(report)
        with tempfile.TemporaryDirectory() as directory:
            session = ReportSession(report, Path(directory) / "report.json",
                                    java=str(Path(directory) / "missing-java.exe")).start()
            session.job.wait(5)
            session.poll()
            session.close()
        self.assertEqual(report["notation"], original["notation"])
        self.assertTrue(report["valid"])
        self.assertEqual(report["java_solver"]["status"], "missing_java")

    def test_invalid_scan_does_not_launch_java(self):
        with tempfile.TemporaryDirectory() as directory:
            report = state_report("bad")
            with patch("bridge.report_session.JavaSolveJob") as job:
                session = ReportSession(report, Path(directory) / "report.json").start()
                job.assert_not_called()
                self.assertEqual(report["java_solver"]["status"], "not_run")
                session.close()

    def test_labels_and_defaults(self):
        from scanner.result_display import result_lines
        for status in ("pending", "timed_out", "solved"):
            lines = result_lines("R'", "R", solver_result(status, notation="F'"), 800)
            self.assertIn("Kociemba: R'", lines)
            self.assertTrue(any(line.startswith("Java BiBFS:") for line in lines))
        args = parse_args([])
        self.assertEqual(args.java_timeout, 30)
        self.assertEqual(args.java_heap_mb, 512)
        self.assertEqual(Path(args.config), APP_ROOT / "scanner" / "config.json")


class CameraLifecycleTests(unittest.TestCase):
    def test_pending_java_does_not_block_preview_and_controls_reap_child(self):
        import numpy as np
        from scanner import main as scanner_main

        class FakeCamera:
            def __init__(self):
                self.reads = 0
                self.released = False

            def read(self):
                self.reads += 1
                return True, np.zeros((600, 800, 3), dtype=np.uint8)

            def release(self):
                self.released = True

        for control in ("q", "x", "c"):
            with self.subTest(control=control), tempfile.TemporaryDirectory() as directory:
                config = Path(directory) / "config.json"
                config_data = json.loads((APP_ROOT / "scanner" / "config.json").read_text())
                config_data["grid"]["tracking"] = False
                if control == "c":
                    config_data["detection_mode"] = "contour"
                config.write_text(json.dumps(config_data))
                output = Path(directory) / "report.json"
                log = Path(directory) / "input.txt"
                cap = FakeCamera()
                real_popen = subprocess.Popen
                children = []
                shown = []

                def launch(command, **kwargs):
                    child = real_popen([sys.executable, str(APP_ROOT / "tests" / "fake_worker.py"),
                                        "sleep", str(log)], **kwargs)
                    children.append(child)
                    return child

                def completed_frame():
                    scanner_main.PAUSE_AT_END = True

                class ImmediateReportJob:
                    def __init__(self, source, payload):
                        self.finished = False

                    def poll(self):
                        if self.finished:
                            return None
                        self.finished = True
                        return "report", state_report(SOLVED)

                    def close(self):
                        self.finished = True

                deadline = time.monotonic() + 4

                def keypress(delay):
                    time.sleep(0.01)  # Give the real child time to start while frames keep updating.
                    if cap.reads >= 4 and log.exists():
                        return ord(control)
                    if time.monotonic() > deadline:
                        raise AssertionError("The camera stopped processing frames while Java was pending")
                    return -1

                with patch.object(scanner_main.cv, "VideoCapture", return_value=cap), \
                     patch.object(scanner_main.cv, "imshow", side_effect=lambda name, frame: shown.append(frame.shape)), \
                     patch.object(scanner_main.cv, "waitKey", side_effect=keypress), \
                     patch.object(scanner_main.cv, "destroyAllWindows"), \
                     patch.object(scanner_main.cv, "destroyWindow"), \
                     patch.object(scanner_main, "CONFIG_PATH", str(config)), \
                     patch.object(scanner_main, "OUTPUT_PATH", str(output)), \
                     patch.object(scanner_main, "ReportJob", ImmediateReportJob), \
                     patch("bridge.java_solver.subprocess.Popen", side_effect=launch):
                    scanner_main.load_runtime_config(str(config))
                    scanner_main.PAUSE_AT_END = False
                    camera = scanner_main.Camera()
                    camera.draw_cube_contour = lambda *args: None
                    camera.create_rotated_frame = lambda *args: False
                    camera.cube_map.process = completed_frame
                    camera.cube_map.draw_supercube = lambda *args: None
                    try:
                        if control == "x":
                            with self.assertRaises(SystemExit):
                                camera.run_main_process()
                        else:
                            camera.run_main_process()
                    finally:
                        camera.close()
                self.assertGreaterEqual(cap.reads, 4)
                self.assertTrue(any(height > 600 for height, width, channels in shown))
                self.assertTrue(cap.released)
                self.assertEqual(len(children), 1)
                self.assertIsNotNone(children[0].poll())
                saved = json.loads(output.read_text())
                self.assertEqual(saved["java_solver"]["status"], "cancelled")
                self.assertTrue(saved["valid"])
                self.assertIsNotNone(saved["notation"])
                self.assertEqual(log.read_text(), SOLVED + "\n")
                if control == "c":
                    self.assertEqual(json.loads(config.read_text())["hasCircleCenter"], "false")

    def test_camera_failure_cleans_up(self):
        from scanner import main as scanner_main
        from unittest.mock import Mock
        cap = Mock()
        cap.read.return_value = (False, None)
        with patch.object(scanner_main.cv, "VideoCapture", return_value=cap), \
             patch.object(scanner_main.cv, "destroyAllWindows"):
            scanner_main.load_runtime_config(str(APP_ROOT / "scanner" / "config.json"))
            camera = scanner_main.Camera()
            try:
                with self.assertRaisesRegex(RuntimeError, "webcam"):
                    camera.run_main_process()
            finally:
                camera.close()
        cap.release.assert_called_once()


if __name__ == "__main__":
    unittest.main()
