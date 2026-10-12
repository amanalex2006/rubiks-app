"""Launch the webcam app, or solve a canonical state without using a camera."""

import argparse
import math
from pathlib import Path
import subprocess

from bridge.report_session import ReportSession
from scanner.input_state import build_state_report as state_report
from scripts.build_java import build, needs_build


APP_ROOT = Path(__file__).resolve().parent


def positive_timeout(value):
    number = float(value)
    if not math.isfinite(number) or number <= 0:
        raise argparse.ArgumentTypeError("Timeout must be positive and finite")
    return number


def heap_size(value):
    number = int(value)
    if number < 16:
        raise argparse.ArgumentTypeError("Java heap must be at least 16 MiB")
    return number


def parse_args(argv=None):
    parser = argparse.ArgumentParser(description="Scan and solve locally with Kociemba and Java BiBFS.")
    parser.add_argument("--config", default=str(APP_ROOT / "scanner" / "config.json"))
    parser.add_argument("--output", default=str(APP_ROOT / "cube_state.json"))
    parser.add_argument("--debug", action="store_true")
    parser.add_argument("--debug-snapshot", action="store_true",
                        help="Enable explicitly requested local camera diagnostics")
    parser.add_argument("--java-timeout", "--solve-timeout", type=positive_timeout, default=30.0,
                        help="Java search timeout in seconds (default: 30)")
    parser.add_argument("--java-heap-mb", type=heap_size, default=512,
                        help="Java maximum heap in MiB (default: 512)")
    parser.add_argument("--java", default="java", help="Java executable name or absolute path")
    parser.add_argument("--state", help="54 stickers in URFDLB order; solve without opening a camera")
    parser.add_argument("--manual", action="store_true", help="Open the color editor without accessing the webcam")
    parser.add_argument("--theme", choices=("dark", "light"), help="Override the saved desktop theme")
    parser.add_argument("--legacy-ui", action="store_true", help="Use the original OpenCV window")
    parser.add_argument("--vision-backend", choices=("auto", "gpu", "cpu"),
                        help="Camera frame processing backend (default: auto or configured backend)")
    return parser.parse_args(argv)


def solve_without_camera(args):
    report = state_report(args.state)
    session = ReportSession(report, args.output, timeout=args.java_timeout,
                            heap_mb=args.java_heap_mb, java=args.java).start()
    try:
        print("Kociemba:", (report["notation"] or "Already solved (0 moves)")
              if report["valid"] else "Invalid state")
        if session.job is not None:
            session.job.wait()
            session.poll()
        result = report["java_solver"]
        print("Java BiBFS:", (result["notation"] or "Already solved (0 moves)")
              if result["status"] == "solved" else result["status"])
        if result["error"]:
            print(result["error"]["message"])
        print("Wrote", Path(args.output).resolve())
        return 0 if report["valid"] else 1
    finally:
        session.close()


def main(argv=None):
    args = parse_args(argv)
    if needs_build():
        try:
            build()
        except (RuntimeError, OSError, subprocess.CalledProcessError) as exc:
            print(f"Java build unavailable: {exc}. Kociemba remains available.")
    try:
        if args.state is not None:
            return solve_without_camera(args)
        if args.legacy_ui:
            from scanner.main import main as scanner_main
            scanner_main(args)
        else:
            from gui.app import main as desktop_main
            desktop_main(args)
        return 0
    except KeyboardInterrupt:
        return 130
    except (RuntimeError, OSError, ValueError) as exc:
        print(f"Could not run the scanner: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
