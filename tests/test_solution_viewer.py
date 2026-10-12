"""Verified move payloads and the local viewer's read-only HTTP lifecycle."""
import copy
import http.client
import json
from pathlib import Path
import socket
import tempfile
import threading
import time
import unittest
from urllib.parse import parse_qs, urlsplit

from viewer.model import SOLVED, build_payload, inverse_notation, replay_notation
from viewer.server import ViewerServer


def report(state=None, notation="U'", java_status="solved", java_notation="U'"):
    return {"valid": True, "state": state or replay_notation(SOLVED, "U"), "notation": notation,
            "raw_state": "not-exported", "image": "private-photo", "output": "private-path",
            "java_solver": {"status": java_status, "notation": java_notation,
                            "elapsed_ms": 14, "searched_moves": 9, "visited_moves": 20,
                            "error": None}}


class ViewerPayloadTests(unittest.TestCase):
    def test_both_solutions_are_replayed_and_exact_state_is_preserved(self):
        original = report()
        before = copy.deepcopy(original)
        payload = build_payload(original, "light")
        self.assertEqual(payload["state"], original["state"])
        self.assertTrue(payload["valid"])
        self.assertEqual(payload["theme"], "light")
        self.assertEqual(payload["setup_source"], "kociemba")
        self.assertEqual(replay_notation(SOLVED, payload["setup_alg"]), original["state"])
        self.assertEqual(payload["solvers"]["kociemba"]["label"], "Kociemba")
        self.assertEqual(payload["solvers"]["java"]["label"], "Java BiBFS")
        for solver in payload["solvers"].values():
            self.assertTrue(solver["verified"])
            self.assertEqual(solver["moves"], ["U'"])
            self.assertEqual(replay_notation(payload["state"], solver["notation"]), SOLVED)
        self.assertEqual(original, before)
        self.assertNotIn("private-photo", json.dumps(payload))
        self.assertNotIn("private-path", json.dumps(payload))

    def test_pending_and_failed_java_never_borrow_kociemba_solution(self):
        for status in ("pending", "failed", "timed_out", "missing_java", "not_run", "cancelled"):
            with self.subTest(status=status):
                original = report(java_status=status, java_notation="U'")
                original["java_solver"]["error"] = {"code": status, "message": "Unavailable"}
                payload = build_payload(original)
                self.assertTrue(payload["solvers"]["kociemba"]["verified"])
                java = payload["solvers"]["java"]
                self.assertEqual(java["status"], status)
                self.assertFalse(java["verified"])
                self.assertIsNone(java["notation"])
                self.assertEqual(java["moves"], [])
                self.assertEqual(java["error"]["message"], "Unavailable")

    def test_malformed_and_wrong_solutions_are_disabled_individually(self):
        for notation in ("U", "", "X", "U3", "<script>", None):
            with self.subTest(notation=notation):
                payload = build_payload(report(java_notation=notation))
                java = payload["solvers"]["java"]
                self.assertFalse(java["verified"])
                self.assertEqual(java["status"], "invalid_solution")
                self.assertTrue(payload["solvers"]["kociemba"]["verified"])
        payload = build_payload(report(notation="U"))
        self.assertFalse(payload["solvers"]["kociemba"]["verified"])
        self.assertTrue(payload["solvers"]["java"]["verified"])
        self.assertEqual(payload["setup_source"], "java")
        self.assertEqual(replay_notation(SOLVED, payload["setup_alg"]), payload["state"])

    def test_solved_cube_has_verified_empty_moves(self):
        payload = build_payload(report(state=SOLVED, notation="", java_notation=""))
        self.assertEqual(payload["setup_alg"], "")
        for solver in payload["solvers"].values():
            self.assertTrue(solver["verified"])
            self.assertEqual(solver["notation"], "")
            self.assertEqual(solver["moves"], [])

    def test_invalid_report_and_illegal_physical_state_cannot_enable_a_stepper(self):
        flipped = list(SOLVED)
        flipped[5], flipped[10] = flipped[10], flipped[5]
        for original in ({}, {"valid": False, "state": SOLVED, "notation": ""},
                         report(state="".join(flipped)), report(state="R" + SOLVED[1:])):
            with self.subTest(report=original):
                payload = build_payload(original)
                self.assertFalse(payload["valid"])
                self.assertIsNone(payload["state"])
                self.assertIsNone(payload["setup_alg"])
                self.assertFalse(any(solver["verified"] for solver in payload["solvers"].values()))

    def test_inverse_setup_matches_all_18_standard_move_encodings(self):
        for face in "URFDLB":
            for suffix in ("", "2", "'"):
                with self.subTest(move=face+suffix):
                    scramble = face + suffix
                    state = replay_notation(SOLVED, scramble)
                    solution = inverse_notation(scramble)
                    payload = build_payload(report(state=state, notation=solution, java_notation=solution))
                    self.assertTrue(payload["solvers"]["java"]["verified"])
                    self.assertEqual(replay_notation(SOLVED, payload["setup_alg"]), state)

    def test_real_kociemba_and_java_results_are_independently_verified(self):
        from bridge.java_solver import JavaSolveJob
        from run import state_report
        state = replay_notation(SOLVED, "R U F2")
        original = state_report(state)
        job = JavaSolveJob(state).start()
        try:
            original["java_solver"] = job.wait(10)
            self.assertIsNotNone(original["java_solver"])
            self.assertEqual(original["java_solver"]["status"], "solved")
            payload = build_payload(original)
        finally:
            job.close()
        self.assertEqual(payload["state"], state)
        self.assertTrue(all(solver["verified"] for solver in payload["solvers"].values()))
        self.assertEqual(replay_notation(SOLVED, payload["setup_alg"]), state)


class ViewerServerTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory(prefix="rubiks-viewer-")
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / "index.html").write_text("<!doctype html><title>Cube steps</title>", encoding="utf-8")
        (self.root / "app.js").write_text("export const offline = true;", encoding="utf-8")
        (self.root / "style.css").write_text("body { color: black; }", encoding="utf-8")
        (self.root / "stepper.js").write_text("export const step = 0;", encoding="utf-8")
        (self.root / "private.json").write_text('{"private":"secret"}', encoding="utf-8")
        (self.root / "vendor").mkdir()
        (self.root / "vendor" / "cubing.js").write_text("export const version = 1;", encoding="utf-8")
        self.viewer = ViewerServer(self.root)
        self.addCleanup(self.viewer.close)
        self.url = self.viewer.open_report(report(java_status="pending"), theme="light", solver="java")
        self.parsed = urlsplit(self.url)
        self.token = parse_qs(self.parsed.query)["token"][0]
        self.api = "/api/report?token=" + self.token

    def request(self, path, method="GET", headers=None):
        connection = http.client.HTTPConnection("127.0.0.1", self.viewer.port, timeout=3)
        try:
            connection.request(method, path, headers=headers or {})
            response = connection.getresponse()
            return response.status, dict(response.getheaders()), response.read()
        finally:
            connection.close()

    def test_loopback_static_assets_and_nonce_payload_are_served_offline(self):
        self.assertEqual(self.parsed.hostname, "127.0.0.1")
        self.assertEqual(parse_qs(self.parsed.query)["solver"], ["java"])
        self.assertGreaterEqual(len(self.token), 40)
        for path in ("/", "/index.html", "/app.js", "/style.css", "/stepper.js", "/vendor/cubing.js"):
            with self.subTest(path=path):
                status, headers, body = self.request(path)
                self.assertEqual(status, 200)
                self.assertTrue(body)
                self.assertEqual(headers["X-Content-Type-Options"], "nosniff")
                self.assertNotIn("Access-Control-Allow-Origin", headers)
        status, headers, body = self.request(self.api)
        self.assertEqual(status, 200)
        self.assertEqual(headers["Cache-Control"], "no-store")
        payload = json.loads(body)
        self.assertEqual(payload["theme"], "light")
        self.assertEqual(payload["solvers"]["java"]["status"], "pending")

    def test_pending_java_updates_matching_views_without_overwriting_an_earlier_scan(self):
        other = report(state=replay_notation(SOLVED, "R"), notation="R'", java_notation="R'")
        other_url = self.viewer.open_report(other, theme="dark")
        other_token = parse_qs(urlsplit(other_url).query)["token"][0]
        self.assertTrue(self.viewer.update_report(report()))
        payload = json.loads(self.request(self.api)[2])
        self.assertEqual(payload["theme"], "light")
        self.assertTrue(payload["solvers"]["java"]["verified"])
        other_payload = json.loads(self.request("/api/report?token=" + other_token)[2])
        self.assertEqual(other_payload["state"], other["state"])
        self.assertEqual(other_payload["theme"], "dark")
        self.assertTrue(self.viewer.update_report(report(), theme="dark"))
        self.assertEqual(json.loads(self.request(self.api)[2])["theme"], "dark")

    def test_missing_nonce_cross_host_write_and_traversal_requests_are_rejected(self):
        for path in ("/api/report", "/api/report?token=wrong", self.api + "&token=second",
                     "/private.json", "/../private.json", "/%2e%2e/private.json",
                     "/vendor/../private.json", "/vendor/%2e%2e/private.json",
                     "/vendor/%5c..%5cprivate.json", "/C:/Windows/win.ini", "/vendor/missing.js"):
            with self.subTest(path=path):
                self.assertEqual(self.request(path)[0], 404)
        self.assertEqual(self.request(self.api, headers={"Host": "attacker.example"})[0], 403)
        for method in ("POST", "PUT", "PATCH", "DELETE", "OPTIONS"):
            self.assertEqual(self.request(self.api, method=method)[0], 405)
        status, _, body = self.request(self.api, method="HEAD")
        self.assertEqual(status, 200)
        self.assertEqual(body, b"")

    def test_published_data_is_owned_and_does_not_follow_external_mutations(self):
        original = report()
        url = self.viewer.open_report(original)
        token = parse_qs(urlsplit(url).query)["token"][0]
        original["state"] = "mutated"
        original["java_solver"]["notation"] = "incorrect"
        payload = json.loads(self.request("/api/report?token=" + token)[2])
        self.assertEqual(payload["state"], replay_notation(SOLVED, "U"))
        self.assertEqual(payload["solvers"]["java"]["notation"], "U'")

    def test_close_interrupts_idle_request_and_reaps_all_owned_threads(self):
        idle = socket.create_connection(("127.0.0.1", self.viewer.port), timeout=2)
        self.addCleanup(idle.close)
        idle.sendall(b"GET / HTTP/1.1\r\n")
        deadline = time.monotonic() + 2
        while not self.viewer._server.connections and time.monotonic() < deadline:
            time.sleep(.005)
        port = self.viewer.port
        started = time.monotonic()
        self.viewer.close()
        self.assertLess(time.monotonic()-started, 1.0)
        self.assertTrue(self.viewer.closed)
        self.assertFalse(self.viewer._thread.is_alive())
        self.assertFalse(self.viewer._server.connections)
        self.assertFalse(any(thread.is_alive() for thread in self.viewer._server._threads))
        with self.assertRaises(OSError):
            socket.create_connection(("127.0.0.1", port), timeout=.3)
        with self.assertRaises(RuntimeError):
            self.viewer.open_report(report())
        self.assertFalse(self.viewer.update_report(report()))
        self.viewer.close()


if __name__ == "__main__":
    unittest.main()
