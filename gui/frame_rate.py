"""Measure stream throughput without averaging reciprocal frame intervals."""

from collections import deque
import math
import time


class FrameRate:
    """Count frame events in a rolling time window.

    Timestamps use one monotonic clock, in seconds. The first event establishes
    the start of the stream, so a single frame has no measurable rate. During
    startup the denominator is the elapsed time since that first event; after
    startup it is ``window_seconds``. Queries keep advancing the window even
    when no new frames arrive, allowing a stalled stream to decay to zero.

    One event at or before the window boundary is retained as an anchor. Memory
    is bounded by ``max_samples``. If an unusually fast stream exceeds that
    capacity, its rate uses the shorter interval covered by retained samples.
    Duplicate or backwards event timestamps do not count as additional frames.
    """

    def __init__(self, window_seconds=1.0, max_samples=4096):
        window_seconds = float(window_seconds)
        if not math.isfinite(window_seconds) or window_seconds <= 0:
            raise ValueError("window_seconds must be finite and positive")
        if not isinstance(max_samples, int) or isinstance(max_samples, bool) or max_samples < 2:
            raise ValueError("max_samples must be an integer of at least two")
        self.window_seconds = window_seconds
        self._timestamps = deque(maxlen=max_samples)
        self._started_at = None
        self._last_event = None
        self._last_query = None

    @staticmethod
    def _timestamp(value):
        value = float(value)
        if not math.isfinite(value):
            raise ValueError("timestamps must be finite")
        return value

    def reset(self):
        """Forget the previous stream, for example when a camera restarts."""
        self._timestamps.clear()
        self._started_at = None
        self._last_event = None
        self._last_query = None

    def record(self, timestamp):
        """Record one new frame and return throughput at that timestamp."""
        timestamp = self._timestamp(timestamp)
        if self._last_event is None or timestamp > self._last_event:
            if self._started_at is None:
                self._started_at = timestamp
            self._timestamps.append(timestamp)
            self._last_event = timestamp
        return self.rate_at(timestamp)

    def rate_at(self, now=None):
        """Return frames/second at ``now`` (defaults to ``time.monotonic()``)."""
        now = self._timestamp(time.monotonic() if now is None else now)
        if self._last_event is None:
            return 0.0
        # A stale query must not rewind an already advanced observation window.
        now = max(now, self._last_event,
                  self._last_query if self._last_query is not None else now)
        self._last_query = now
        boundary = max(self._started_at, now - self.window_seconds)
        # Subtracting a window from a monotonic timestamp can move an exact
        # boundary a few floating-point units below its matching event.
        tolerance = max(1e-12, 4 * math.ulp(max(abs(now), abs(boundary))))
        while len(self._timestamps) > 1 and self._timestamps[1] <= boundary + tolerance:
            self._timestamps.popleft()
        if len(self._timestamps) < 2:
            return 0.0
        start = max(boundary, self._timestamps[0])
        elapsed = now - start
        return (len(self._timestamps) - 1) / elapsed if elapsed > 0 else 0.0

    @property
    def rate(self):
        """Current throughput, including elapsed time since the last frame."""
        return self.rate_at()
