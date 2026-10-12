"""Own the Windows WebView2 child attached to a Cube Studio frame."""
from collections import deque
import ctypes
from ctypes import wintypes
import json
import os
from pathlib import Path
import queue
import subprocess
import threading
import time
from urllib.parse import urlsplit

APP_ROOT = Path(__file__).resolve().parents[1]
HOST_EXE = APP_ROOT / "viewer" / "native" / "bin" / "CubeStudioWebView.exe"


class _ProcessJob:
    """Reap only this viewer's renderer descendants if its owner exits."""
    def __init__(self, process):
        class Basic(ctypes.Structure):
            _fields_ = [("process_time", ctypes.c_int64), ("job_time", ctypes.c_int64),
                        ("flags", wintypes.DWORD), ("min_working", ctypes.c_size_t),
                        ("max_working", ctypes.c_size_t), ("active_processes", wintypes.DWORD),
                        ("affinity", ctypes.c_size_t), ("priority", wintypes.DWORD),
                        ("scheduling", wintypes.DWORD)]
        class IO(ctypes.Structure):
            _fields_ = [(name, ctypes.c_uint64) for name in
                        ("read_ops", "write_ops", "other_ops", "read_bytes", "write_bytes", "other_bytes")]
        class Extended(ctypes.Structure):
            _fields_ = [("basic", Basic), ("io", IO), ("process_memory", ctypes.c_size_t),
                        ("job_memory", ctypes.c_size_t), ("peak_process", ctypes.c_size_t),
                        ("peak_job", ctypes.c_size_t)]
        self.api = ctypes.WinDLL("kernel32", use_last_error=True)
        self.api.CreateJobObjectW.argtypes = [ctypes.c_void_p, wintypes.LPCWSTR]
        self.api.CreateJobObjectW.restype = wintypes.HANDLE
        self.api.SetInformationJobObject.argtypes = [wintypes.HANDLE, ctypes.c_int, ctypes.c_void_p, wintypes.DWORD]
        self.api.SetInformationJobObject.restype = wintypes.BOOL
        self.api.AssignProcessToJobObject.argtypes = [wintypes.HANDLE, wintypes.HANDLE]
        self.api.AssignProcessToJobObject.restype = wintypes.BOOL
        self.api.CloseHandle.argtypes = [wintypes.HANDLE]
        self.handle = self.api.CreateJobObjectW(None, None)
        if not self.handle:
            raise ctypes.WinError(ctypes.get_last_error())
        info = Extended()
        info.basic.flags = 0x2000  # JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE
        if not self.api.SetInformationJobObject(self.handle, 9, ctypes.byref(info), ctypes.sizeof(info)) or \
                not self.api.AssignProcessToJobObject(self.handle, int(process._handle)):
            error = ctypes.WinError(ctypes.get_last_error())
            self.close()
            raise error

    def close(self):
        if self.handle:
            self.api.CloseHandle(self.handle)
            self.handle = None


class EmbeddedViewer:
    def __init__(self, parent, background="#11151d", executable=HOST_EXE):
        self.parent, self.background = parent, background
        self.executable = Path(executable)
        self.process = None
        self.state = "idle"
        self.error = None
        self.ready_info = {}
        self._job = None
        self._closed = False
        self._url = None
        self._events = queue.Queue()
        self._responses = {}
        self._request_id = 0
        self._streams = []
        self.diagnostics = deque(maxlen=30)

    def load(self, url):
        parsed = urlsplit(url)
        if parsed.scheme != "http" or parsed.hostname != "127.0.0.1":
            raise ValueError("Embedded viewer requires a local Cube Studio URL")
        if self._closed:
            raise RuntimeError("Embedded viewer has been closed")
        if self.process is not None:
            if self.process.poll() is not None:
                raise RuntimeError(self.error or "The embedded renderer stopped")
            if url != self._url:
                self._send({"action": "navigate", "url": url})
                self._url = url
            return
        if os.name != "nt":
            raise RuntimeError("The embedded 3D viewer currently requires Windows")
        if not self.executable.is_file():
            raise RuntimeError("Embedded viewer is missing. Run python scripts/build_native_viewer.py")
        self.parent.update_idletasks()
        command = [str(self.executable), "--parent", str(self.parent.winfo_id()),
                   "--parent-pid", str(os.getpid()), "--url", url,
                   "--data-folder", str(APP_ROOT / ".webview2" / str(os.getpid())),
                   "--background", self.background]
        self.process = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE, encoding="utf-8", errors="replace",
                                        bufsize=1, shell=False, creationflags=subprocess.CREATE_NO_WINDOW)
        try:
            self._job = _ProcessJob(self.process)
        except Exception:
            self.process.terminate()
            self.process.wait()
            raise
        self.state, self._url = "loading", url
        for stream, diagnostic in ((self.process.stdout, False), (self.process.stderr, True)):
            reader = threading.Thread(target=self._read, args=(stream, diagnostic),
                                      name="cube-webview-output", daemon=True)
            self._streams.append(reader)
            reader.start()

    def _read(self, stream, diagnostic):
        for line in stream:
            if diagnostic:
                self.diagnostics.append(line.rstrip())
            else:
                try:
                    self._events.put(json.loads(line))
                except ValueError:
                    self.diagnostics.append(line.rstrip())

    def _send(self, command):
        if self.process is None or self.process.poll() is not None:
            raise RuntimeError("Embedded viewer is not running")
        self.process.stdin.write(json.dumps(command) + "\n")
        self.process.stdin.flush()

    def poll(self):
        while True:
            try:
                event = self._events.get_nowait()
            except queue.Empty:
                break
            if event.get("type") == "ready":
                self.state, self.ready_info = "ready", event
            elif event.get("type") == "error" or (event.get("type") == "navigation" and not event.get("success")):
                self.error = event.get("message") or event.get("error") or "Could not load the embedded viewer"
                self.state = "failed"
            elif event.get("type") == "response" and event.get("id") is not None:
                self._responses[event["id"]] = event
        if not self._closed and self.process is not None and self.process.poll() is not None:
            self.state = "failed"
            self.error = self.error or "\n".join(self.diagnostics) or "The embedded renderer stopped"
        return self.state

    def request(self, action, **values):
        """Diagnostic requests also use the owned pipe, never an external browser."""
        self._request_id += 1
        self._send({"action": action, "id": self._request_id, **values})
        return self._request_id

    def response(self, request_id):
        self.poll()
        return self._responses.pop(request_id, None)

    def select_solver(self, key):
        if key not in ("java", "kociemba") or self.state != "ready":
            return
        self._send({"action": "evaluate", "script": "dispatchEvent(new CustomEvent('cube-studio-select-solver', {detail: " +
                    json.dumps(key) + "}));"})

    def close(self):
        if self._closed:
            return
        self._closed = True
        try:
            if self.process is not None:
                if self.process.poll() is None:
                    try:
                        self._send({"action": "quit"})
                        self.process.stdin.close()
                        # Destroying a cross-process child sends synchronous
                        # window messages to its Tk parent. Keep that owner's
                        # event loop moving while the child disposes WebView2.
                        deadline = time.monotonic() + 4
                        while self.process.poll() is None and time.monotonic() < deadline:
                            try:
                                self.parent.update()
                            except Exception:
                                pass
                            time.sleep(.01)
                        self.process.wait(timeout=.1)
                    except (BrokenPipeError, OSError, subprocess.TimeoutExpired):
                        self.process.terminate()
                        try:
                            self.process.wait(timeout=2)
                        except subprocess.TimeoutExpired:
                            self.process.kill()
                            self.process.wait()
        finally:
            if self._job:
                self._job.close()
            for reader in self._streams:
                reader.join(timeout=1)
            if self.process:
                for stream in (self.process.stdin, self.process.stdout, self.process.stderr):
                    if stream and not stream.closed:
                        stream.close()
            self.state = "closed"
