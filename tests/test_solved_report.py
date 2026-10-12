"""Already solved input needs no identity sequence from either solver."""
import unittest
from unittest.mock import patch

from scanner.cube_state import SOLVED_STATE, build_cube_report
from scanner.input_state import build_state_report
from viewer.model import build_payload


class SolvedReportTests(unittest.TestCase):
    def test_solved_manual_and_scanned_input_have_empty_notation_without_search(self):
        colors = dict(U="b", R="y", F="r", D="g", L="w", B="o")
        raw_faces = {face: [color] * 9 for face, color in colors.items()}
        with patch("kociemba.solve", side_effect=AssertionError("A solved cube needs no search")):
            for report in (build_state_report(SOLVED_STATE), build_cube_report(raw_faces)):
                self.assertTrue(report["valid"])
                self.assertEqual(report["state"], SOLVED_STATE)
                self.assertEqual(report["notation"], "")
                report["java_solver"] = {"status": "solved", "notation": ""}
                payload = build_payload(report)
                for solver in payload["solvers"].values():
                    self.assertTrue(solver["verified"])
                    self.assertEqual(solver["moves"], [])


if __name__ == "__main__":
    unittest.main()
