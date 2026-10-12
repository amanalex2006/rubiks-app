"""The UI owns report writes; background workers never write stale scan results."""

from bridge.java_solver import JavaSolveJob, solver_result
from scanner.cube_state import write_cube_report


class ReportSession:
    def __init__(self, report, output_path, **java_options):
        self.report = report
        self.output_path = output_path
        self.job = None
        self._options = java_options

    def start(self):
        if self.report["valid"]:
            self.report["java_solver"] = solver_result("pending")
        else:
            self.report["java_solver"] = solver_result("not_run", error={
                "code": "invalid_scan", "message": "Java was not started because the scan is invalid"})
        write_cube_report(self.output_path, self.report)
        if self.report["valid"]:
            self.job = JavaSolveJob(self.report["state"], **self._options).start()
        return self

    def poll(self):
        if self.job is None:
            return False
        result = self.job.poll()
        if result is None:
            return False
        self.report["java_solver"] = result
        self.job = None
        write_cube_report(self.output_path, self.report)
        return True

    def close(self):
        if self.job is not None:
            self.job.cancel()
            self.report["java_solver"] = self.job.wait()
            self.job = None
            write_cube_report(self.output_path, self.report)
