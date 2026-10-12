"""Keep Kociemba's existing report builder off the GUI thread and cancellable."""

import multiprocessing as mp
import time


def _build_report(connection, source, payload):
    try:
        if source == "camera":
            from scanner.cube_state import build_cube_report
            report = build_cube_report(payload)
        else:
            from scanner.input_state import build_state_report
            report = build_state_report(payload)
        connection.send(("report", report))
    except Exception as exc:
        connection.send(("error", str(exc)))
    finally:
        connection.close()


class ReportJob:
    def __init__(self, source, payload, timeout=120):
        context = mp.get_context("spawn")
        self._reader, writer = context.Pipe(duplex=False)
        self.process = context.Process(target=_build_report, args=(writer, source, payload), daemon=True)
        self.timeout = timeout
        self.started = time.monotonic()
        self.finished = False
        self.process.start()
        writer.close()

    def poll(self):
        if self.finished:
            return None
        if self._reader.poll():
            try:
                result = self._reader.recv()
            except EOFError:
                result = ("error", "The cube check stopped unexpectedly. Try again.")
            self.close()
            return result
        if not self.process.is_alive():
            self.close()
            return "error", "The cube check stopped unexpectedly. Try again."
        if time.monotonic() - self.started > self.timeout:
            self.close()
            return "error", "Checking this cube took too long. Review the colors and try again."
        return None

    def close(self):
        if self.finished:
            return
        self.finished = True
        if self.process.is_alive():
            self.process.terminate()
        self.process.join(timeout=2)
        if self.process.is_alive():
            self.process.kill()
            self.process.join()
        self._reader.close()
