"""Read the camera continuously without making the GUI wait for a frame."""

from dataclasses import dataclass
import math
import threading
import time

import numpy as np


@dataclass(frozen=True)
class CapturedFrame:
    sequence: int
    frame: np.ndarray | None
    captured_at: float
    error: str | None = None


class CameraCapture:
    """Own a capture device and retain only its newest unread frame.

    The reader thread is the only caller of ``cap.read()``. Each published image
    owns its pixels and is read-only; consumers must copy it before drawing.
    ``poll()`` never waits for the camera and delivers each result at most once.
    Closing releases the device, including when a read is blocked in its driver.
    """

    def __init__(self, cap, max_fps=60):
        try:
            max_fps = float(max_fps)
        except (TypeError, ValueError) as exc:
            raise ValueError("Maximum camera FPS must be positive and finite") from exc
        if not math.isfinite(max_fps) or max_fps <= 0:
            raise ValueError("Maximum camera FPS must be positive and finite")
        self.cap = cap
        self._frame_interval = 1.0 / max_fps
        self._lock = threading.Lock()
        self._close_lock = threading.Lock()
        self._stop = threading.Event()
        self._latest = None
        self._sequence = 0
        self._released = False
        self._thread = threading.Thread(target=self._run, name="rubiks-camera-capture", daemon=True)
        self._thread.start()

    @property
    def released(self):
        """Whether this owner has already released the underlying device."""
        with self._lock:
            return self._released

    @property
    def closed(self):
        return self._stop.is_set()

    def poll(self):
        """Take the latest frame or terminal error once, without blocking."""
        with self._lock:
            result, self._latest = self._latest, None
            return result

    def close(self):
        """Stop and reap the reader, releasing its device exactly once.

        Give an ordinary in-progress read a short chance to return first. If the
        driver still blocks, releasing the device interrupts that read. A driver
        that fails to stop is reported explicitly instead of silently leaking a
        reader thread.
        """
        with self._close_lock:
            self._stop.set()
            with self._lock:
                self._latest = None
            if threading.current_thread() is self._thread:
                raise RuntimeError("The camera reader cannot close itself")
            self._thread.join(.1)
            with self._lock:
                release = not self._released
                self._released = True
            try:
                if release:
                    self.cap.release()
            finally:
                self._thread.join(1.9)
            if self._thread.is_alive():
                raise RuntimeError("The camera driver did not stop after release")

    def _run(self):
        while not self._stop.is_set():
            started = time.monotonic()
            try:
                ok, frame = self.cap.read()
                if not ok or not isinstance(frame, np.ndarray) or frame.size == 0:
                    frame, error = None, "The camera stopped delivering frames"
                else:
                    # Some backends reuse the same buffer on their next read.
                    frame, error = frame.copy(), None
                    frame.setflags(write=False)
            except Exception as exc:
                frame, error = None, f"{type(exc).__name__}: {exc}"
            captured_at = time.monotonic()
            with self._lock:
                if self._stop.is_set():
                    return
                self._sequence += 1
                self._latest = CapturedFrame(self._sequence, frame, captured_at, error)
            if error is not None:
                return
            # Normal camera reads already wait for the sensor. Cap unusually
            # fast backends or buffered reads without delaying ordinary frames.
            self._stop.wait(max(0, self._frame_interval - (time.monotonic() - started)))
