"""Process the latest camera frame without building a latency-producing queue.

The processor owns its mutable output and must not access Tk widgets. Invalidation
discards stale results, but does not interrupt the current processor call; callers
must serialize changes to state used by that call themselves.
"""

from copy import deepcopy
from dataclasses import dataclass
import threading
import time
from typing import Any, Callable

import numpy as np


@dataclass(frozen=True)
class FrameResult:
    sequence: int
    generation: int
    context: Any
    value: Any
    error: str | None
    elapsed_ms: float


@dataclass(frozen=True)
class _FrameTask:
    sequence: int
    generation: int
    frame: np.ndarray
    context: Any


class LatestFrameWorker:
    """One processing thread, one newest pending frame, and one newest result.

    ``processor(frame, context)`` receives independently owned input. ``submit``
    copies the image and metadata before enqueueing them. ``FrameResult`` is a
    frozen record; ownership of its arbitrary ``value`` is the processor's
    responsibility. Pending frames replaced before processing count as dropped.
    """

    def __init__(self, processor: Callable[[np.ndarray, Any], Any]):
        self._processor = processor
        self._condition = threading.Condition()
        self._pending = None
        self._completed = None
        self._processing = False
        self._closed = False
        self._generation = 0
        self._sequence = 0
        self._dropped = 0
        self._thread = threading.Thread(target=self._run, name="rubiks-frame-worker", daemon=True)
        self._thread.start()

    @property
    def busy(self):
        with self._condition:
            return self._processing or self._pending is not None

    @property
    def dropped(self):
        with self._condition:
            return self._dropped

    @property
    def generation(self):
        with self._condition:
            return self._generation

    def submit(self, frame, context=None):
        if not isinstance(frame, np.ndarray):
            raise TypeError("A camera frame must be a NumPy array")
        owned_frame = frame.copy()
        owned_context = deepcopy(context)
        with self._condition:
            if self._closed:
                raise RuntimeError("The frame worker is closed")
            self._sequence += 1
            if self._pending is not None:
                self._dropped += 1
            self._pending = _FrameTask(self._sequence, self._generation, owned_frame, owned_context)
            self._condition.notify()
            return self._sequence

    def poll(self):
        """Take the newest completed result once, or return ``None``."""
        with self._condition:
            result, self._completed = self._completed, None
            return result

    def invalidate(self):
        """Drop queued/results from this generation, including a later active result."""
        with self._condition:
            self._generation += 1
            if self._pending is not None:
                self._dropped += 1
            self._pending = self._completed = None
            return self._generation

    def close(self, wait=True):
        """Stop accepting frames; optionally wait for the active processor call."""
        with self._condition:
            self._closed = True
            if self._pending is not None:
                self._dropped += 1
            self._pending = self._completed = None
            self._condition.notify_all()
        if wait and threading.current_thread() is not self._thread:
            self._thread.join()
            # A bound processor can retain the desktop and its destroyed Tcl
            # interpreter. Release that callback on the joining owner thread.
            self._processor = None

    def _run(self):
        while True:
            with self._condition:
                while self._pending is None and not self._closed:
                    self._condition.wait()
                if self._closed:
                    return
                task, self._pending = self._pending, None
                self._processing = True
            started = time.perf_counter()
            value, error = None, None
            try:
                value = self._processor(task.frame, task.context)
            except Exception as exc:
                error = f"{type(exc).__name__}: {exc}"
            result = FrameResult(task.sequence, task.generation, task.context, value, error,
                                 (time.perf_counter() - started) * 1000)
            with self._condition:
                self._processing = False
                if not self._closed and task.generation == self._generation:
                    self._completed = result
