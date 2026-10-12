"""One cancellable Java child per solve. Only the worker owns its pipes."""

from pathlib import Path
import math
import re
import subprocess
import threading
import time


APP_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_JAR = APP_ROOT / "solver-java" / "build" / "solver.jar"
PROTOCOL_VERSION = "RUBIKS_PIPE_V1"
WIRE_STATUSES = {
    "SOLVED": "solved",
    "INVALID_INPUT": "invalid_input",
    "INVALID_CUBE": "invalid_cube",
    "INVALID_SOLUTION": "invalid_solution",
    "FAILED": "failed",
}


def solver_result(status, *, notation=None, elapsed_ms=0, searched_moves=None,
                  visited_moves=None, error=None):
    return {
        "algorithm": "BidirectionalBFS",
        "status": status,
        "notation": notation,
        "elapsed_ms": elapsed_ms,
        "searched_moves": searched_moves,
        "visited_moves": visited_moves,
        "error": error,
    }


def parse_response(output):
    lines = output.splitlines()
    if len(lines) != 1:
        raise ValueError("Expected exactly one Java protocol response")
    fields = lines[0].split("\t")
    if len(fields) != 8 or fields[0] != PROTOCOL_VERSION or fields[1] not in WIRE_STATUSES:
        raise ValueError("Unknown or malformed Java protocol response")
    _, wire_status, notation, searched, visited, elapsed, code, detail = fields
    numbers = []
    for value in (searched, visited, elapsed):
        if not re.fullmatch(r"[0-9]+", value):
            raise ValueError("Java response contains invalid statistics")
        numbers.append(int(value))
    status = WIRE_STATUSES[wire_status]
    if status == "solved":
        if code or detail or (notation and not re.fullmatch(r"[URFDLB](?:2|')?(?: [URFDLB](?:2|')?)*", notation)):
            raise ValueError("Java response contains invalid move notation")
        error = None
    else:
        if notation or not code or not detail:
            raise ValueError("Java response contains an incomplete error")
        error = {"code": code, "message": detail}
    return solver_result(status, notation=notation if status == "solved" else None,
                         searched_moves=numbers[0], visited_moves=numbers[1],
                         elapsed_ms=numbers[2], error=error)


class JavaSolveJob:
    def __init__(self, state, *, timeout=30.0, heap_mb=512, java="java", jar=DEFAULT_JAR):
        if not math.isfinite(timeout) or timeout <= 0:
            raise ValueError("Java timeout must be positive and finite")
        if isinstance(heap_mb, bool) or not isinstance(heap_mb, int) or heap_mb < 16:
            raise ValueError("Java heap must be an integer of at least 16 MiB")
        self.state = state
        self.timeout = timeout
        self.heap_mb = heap_mb
        self.java = str(java)
        self.jar = Path(jar).resolve()
        self._cancelled = threading.Event()
        self._done = threading.Event()
        self._lock = threading.Lock()
        self._process = None
        self._result = None
        self._thread = None

    @property
    def process(self):
        with self._lock:
            return self._process

    def start(self):
        if self._thread is not None:
            raise RuntimeError("A Java solve job can only be started once")
        self._thread = threading.Thread(target=self._run, name="java-cube-solve", daemon=True)
        self._thread.start()
        return self

    def poll(self):
        return self._result if self._done.is_set() else None

    def wait(self, timeout=None):
        if not self._done.wait(timeout):
            return None
        return self._result

    def cancel(self):
        self._cancelled.set()
        with self._lock:
            process = self._process
            if process is not None and process.poll() is None:
                try:
                    process.kill()
                except OSError:
                    pass  # The child may have exited between poll and kill.
        if self._thread is not None and self._thread is not threading.current_thread():
            self._thread.join()

    close = cancel

    def _run(self):
        started = time.monotonic()
        result = None
        process = None

        def failure(status, message):
            return solver_result(status, elapsed_ms=int((time.monotonic() - started) * 1000),
                                 error={"code": status, "message": message})

        try:
            if not isinstance(self.state, str) or not re.fullmatch(r"[URFDLB]{54}", self.state):
                result = failure("invalid_input", "Expected 54 U/R/F/D/L/B stickers")
            elif not self.jar.is_file():
                result = failure("missing_jar", "Build the solver with: python scripts/build_java.py")
            else:
                # Hold the lock while launching so cancellation cannot miss a new child.
                with self._lock:
                    if not self._cancelled.is_set():
                        flags = subprocess.CREATE_NO_WINDOW if hasattr(subprocess, "CREATE_NO_WINDOW") else 0
                        process = subprocess.Popen(
                            [self.java, f"-Xmx{self.heap_mb}m", "-jar", str(self.jar)],
                            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                            text=True, encoding="utf-8", errors="replace", shell=False,
                            creationflags=flags,
                        )
                        self._process = process
                if process is not None:
                    try:
                        # communicate writes the input, closes stdin, and drains both outputs.
                        output, diagnostics = process.communicate(self.state + "\n", timeout=self.timeout)
                    except subprocess.TimeoutExpired:
                        process.kill()
                        process.communicate()
                        result = failure("timed_out", f"Java exceeded the {self.timeout:g}-second solve limit")
                    else:
                        if process.returncode != 0:
                            detail = diagnostics.strip()[-2000:] or f"Java exited with code {process.returncode}"
                            result = failure("process_failed", detail)
                        else:
                            try:
                                result = parse_response(output)
                            except ValueError as exc:
                                result = failure("malformed_response", str(exc))
        except FileNotFoundError:
            result = failure("missing_java", f"Java executable not found: {self.java}")
        except (OSError, ValueError) as exc:
            result = failure("process_failed", str(exc))
        finally:
            if process is not None:
                if process.poll() is None:
                    process.kill()
                process.communicate()  # Reap the child and close pipes, including error paths.
            if self._cancelled.is_set():
                result = failure("cancelled", "Java solve cancelled")
            self._result = result or failure("process_failed", "Java solve produced no result")
            self._done.set()
