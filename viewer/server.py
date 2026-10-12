"""Small loopback-only, read-only server for local viewer assets and reports."""
from collections import OrderedDict
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import mimetypes
from pathlib import Path
import secrets
import socket
import threading
from urllib.parse import parse_qs, unquote, urlencode, urlsplit

from .model import build_payload


VIEWER_ROOT = Path(__file__).resolve().parent
STATIC_FILES = {"index.html", "app.js", "style.css", "stepper.js"}
VENDOR_SUFFIXES = {".js", ".mjs", ".json", ".wasm"}


class _HTTPServer(ThreadingHTTPServer):
    daemon_threads = False
    block_on_close = True

    def __init__(self, owner):
        self.owner = owner
        self.connections = set()
        self.connection_lock = threading.Lock()
        super().__init__(("127.0.0.1", 0), _Handler)

    def get_request(self):
        connection, address = super().get_request()
        # Local requests need no long header wait. A short deadline also bounds
        # shutdown on Windows, where an active buffered read can outlive socket
        # shutdown until its existing timeout expires.
        connection.settimeout(0.5)
        with self.connection_lock:
            self.connections.add(connection)
        return connection, address

    def shutdown_request(self, connection):
        try:
            super().shutdown_request(connection)
        finally:
            with self.connection_lock:
                self.connections.discard(connection)

    def close_connections(self):
        with self.connection_lock:
            connections = tuple(self.connections)
        for connection in connections:
            try:
                connection.shutdown(socket.SHUT_RDWR)
            except OSError:
                pass


class _Handler(BaseHTTPRequestHandler):
    def handle(self):
        try:
            super().handle()
        except OSError:
            # A renderer can disconnect during shutdown or while requesting
            # assets. These socket closures are part of normal cleanup.
            pass

    def log_message(self, *args):
        pass

    def _response(self, status, body=b"", content_type="text/plain; charset=utf-8", head=False):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Cross-Origin-Resource-Policy", "same-origin")
        self.send_header("Content-Security-Policy", "default-src 'self'; script-src 'self'; "
                         "style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; "
                         "worker-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'")
        self.send_header("Connection", "close")
        self.end_headers()
        if not head:
            try:
                self.wfile.write(body)
            except (BrokenPipeError, ConnectionResetError, TimeoutError):
                pass

    def _get(self, head=False):
        expected_host = "127.0.0.1:" + str(self.server.server_port)
        if self.headers.get("Host") != expected_host:
            self._response(403, b"Invalid local host", head=head)
            return
        try:
            url = urlsplit(self.path)
            path = unquote(url.path, errors="strict")
        except (ValueError, UnicodeDecodeError):
            self._response(404, b"Not found", head=head)
            return
        if url.scheme or url.netloc:
            self._response(404, b"Not found", head=head)
            return
        if path == "/api/report":
            query = parse_qs(url.query)
            tokens = query.get("token", [])
            body = self.server.owner._report_bytes(tokens[0]) if len(tokens) == 1 else None
            self._response(200 if body is not None else 404, body or b"Unknown viewer session",
                           "application/json; charset=utf-8" if body is not None else "text/plain; charset=utf-8",
                           head=head)
            return
        body, content_type = self.server.owner._static_bytes(path)
        self._response(200 if body is not None else 404, body if body is not None else b"Not found",
                       content_type, head=head)

    def do_GET(self):
        self._get()

    def do_HEAD(self):
        self._get(head=True)

    def do_POST(self):
        self._response(405, b"Viewer is read-only")

    do_PUT = do_DELETE = do_PATCH = do_OPTIONS = do_POST


class ViewerServer:
    def __init__(self, root=VIEWER_ROOT):
        self.root = Path(root).resolve()
        self._lock = threading.Lock()
        self._sessions = OrderedDict()
        self._server = None
        self._thread = None
        self._closed = False

    @property
    def port(self):
        with self._lock:
            return None if self._server is None else self._server.server_port

    @property
    def closed(self):
        with self._lock:
            return self._closed

    def _start_locked(self):
        if self._closed:
            raise RuntimeError("Solution viewer has been closed")
        if self._server is None:
            self._server = _HTTPServer(self)
            self._thread = threading.Thread(target=self._server.serve_forever,
                                             kwargs={"poll_interval": 0.1},
                                             name="cube-solution-viewer", daemon=True)
            self._thread.start()

    @staticmethod
    def _encode(payload):
        return json.dumps(payload, ensure_ascii=False, allow_nan=False).encode("utf-8")

    def open_report(self, report, theme="dark", solver="kociemba"):
        payload = build_payload(report, theme)
        token = secrets.token_urlsafe(32)
        with self._lock:
            self._start_locked()
            self._sessions[token] = {"state": payload["state"], "theme": payload["theme"],
                                     "body": self._encode(payload)}
            while len(self._sessions) > 64:
                self._sessions.popitem(last=False)
            return "http://127.0.0.1:" + str(self._server.server_port) + "/?" + urlencode(
                {"token": token, "solver": solver if solver in ("kociemba", "java") else "kociemba"})

    publish = open_report

    def update_report(self, report, theme=None):
        """Update opened views of this state; earlier scans retain their own data."""
        payload = build_payload(report, theme or "dark")
        with self._lock:
            if self._closed:
                return False
            changed = False
            for session in self._sessions.values():
                if session["state"] != payload["state"]:
                    continue
                session_payload = dict(payload)
                session_payload["theme"] = theme if theme in ("dark", "light") else session["theme"]
                session["theme"] = session_payload["theme"]
                session["body"] = self._encode(session_payload)
                changed = True
            return changed

    def _report_bytes(self, token):
        if not isinstance(token, str) or len(token) > 128:
            return None
        with self._lock:
            session = self._sessions.get(token)
            return None if self._closed or session is None else session["body"]

    def _static_bytes(self, path):
        if path == "/":
            name = "index.html"
        elif not path.startswith("/"):
            return None, "text/plain; charset=utf-8"
        else:
            name = path[1:]
        if any(character in name for character in ("\\", "\x00", ":")):
            return None, "text/plain; charset=utf-8"
        parts = name.split("/")
        if any(part in ("", ".", "..") for part in parts):
            return None, "text/plain; charset=utf-8"
        vendor = len(parts) >= 2 and parts[0] == "vendor" and Path(name).suffix in VENDOR_SUFFIXES
        if name not in STATIC_FILES and not vendor:
            return None, "text/plain; charset=utf-8"
        target = (self.root / name).resolve()
        if (not target.is_relative_to(self.root) or not target.is_file()
                or vendor and not target.is_relative_to(self.root / "vendor")):
            return None, "text/plain; charset=utf-8"
        try:
            body = target.read_bytes()
        except OSError:
            return None, "text/plain; charset=utf-8"
        content_type = "text/javascript; charset=utf-8" if target.suffix in (".js", ".mjs") else (
            mimetypes.guess_type(target.name)[0] or "application/octet-stream")
        return body, content_type

    def close(self):
        with self._lock:
            if self._closed:
                return
            self._closed = True
            server, thread = self._server, self._thread
            self._sessions.clear()
        if server is not None:
            server.shutdown()
            server.close_connections()
            server.server_close()
            if thread is not threading.current_thread():
                thread.join()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()
