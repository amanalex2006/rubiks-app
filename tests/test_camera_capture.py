"""Camera reads cannot stall the GUI or build a queue of old video frames."""

from dataclasses import FrozenInstanceError
import queue
import threading
import time
import unittest

import numpy as np

from scanner.camera_capture import CameraCapture


class BlockingCapture:
    """A driver that stays in read until a frame arrives or release interrupts it."""

    def __init__(self):
        self.frames = queue.Queue()
        self.read_calls = 0
        self.release_calls = 0
        self.read_thread = None
        self.entered = threading.Event()

    def read(self):
        self.read_thread = threading.get_ident()
        self.read_calls += 1
        self.entered.set()
        value = self.frames.get(timeout=3)
        if isinstance(value, Exception):
            raise value
        if value is None:
            return False, None
        return True, value

    def release(self):
        self.release_calls += 1
        self.frames.put(None)


class CameraCaptureTests(unittest.TestCase):
    def frame(self, value):
        return np.full((12, 16, 3), value, np.uint8)

    def wait_until(self, condition, timeout=3):
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            if condition():
                return
            time.sleep(.002)
        self.fail("The camera reader did not reach the expected state")

    def test_slow_camera_read_does_not_block_polling(self):
        cap = BlockingCapture()
        capture = CameraCapture(cap)
        try:
            self.assertTrue(cap.entered.wait(3))
            self.assertNotEqual(cap.read_thread, threading.get_ident())
            started = time.monotonic()
            for _ in range(1000):
                self.assertIsNone(capture.poll())
            self.assertLess(time.monotonic() - started, .1)
            self.assertTrue(capture._thread.is_alive())
        finally:
            capture.close()

    def test_frame_owns_driver_pixels_and_is_read_only(self):
        cap = BlockingCapture()
        capture = CameraCapture(cap)
        try:
            original = self.frame(11)
            cap.frames.put(original)
            self.wait_until(lambda: cap.read_calls >= 2)
            result = capture.poll()
            original[:] = 99
            self.assertEqual(result.sequence, 1)
            self.assertEqual(int(result.frame[0, 0, 0]), 11)
            self.assertIsNone(result.error)
            self.assertGreater(result.captured_at, 0)
            with self.assertRaises(ValueError):
                result.frame[0, 0, 0] = 7
            with self.assertRaises(FrozenInstanceError):
                result.sequence = 7
            self.assertIsNone(capture.poll())
        finally:
            capture.close()

    def test_only_newest_unread_frame_is_retained(self):
        cap = BlockingCapture()
        capture = CameraCapture(cap)
        try:
            for value in range(1, 9):
                cap.frames.put(self.frame(value))
            self.wait_until(lambda: cap.read_calls >= 9)
            result = capture.poll()
            self.assertEqual(result.sequence, 8)
            self.assertEqual(int(result.frame[0, 0, 0]), 8)
            self.assertIsNone(capture.poll())
            cap.frames.put(self.frame(9))
            self.wait_until(lambda: cap.read_calls >= 10)
            next_result = capture.poll()
            self.assertEqual(next_result.sequence, 9)
            self.assertGreaterEqual(next_result.captured_at, result.captured_at)
        finally:
            capture.close()

    def test_failed_read_is_reported_once_and_reader_stops(self):
        cap = BlockingCapture()
        capture = CameraCapture(cap)
        try:
            cap.frames.put(None)
            capture._thread.join(3)
            self.assertFalse(capture._thread.is_alive())
            result = capture.poll()
            self.assertEqual(result.sequence, 1)
            self.assertIsNone(result.frame)
            self.assertEqual(result.error, "The camera stopped delivering frames")
            self.assertIsNone(capture.poll())
            self.assertEqual(cap.read_calls, 1)
        finally:
            capture.close()

    def test_driver_exception_is_reported_without_retrying(self):
        cap = BlockingCapture()
        capture = CameraCapture(cap)
        try:
            cap.frames.put(OSError("Camera disconnected"))
            capture._thread.join(3)
            result = capture.poll()
            self.assertEqual(result.error, "OSError: Camera disconnected")
            self.assertIsNone(result.frame)
            self.assertIsNone(capture.poll())
            self.assertEqual(cap.read_calls, 1)
        finally:
            capture.close()

    def test_close_interrupts_blocked_driver_and_releases_exactly_once(self):
        cap = BlockingCapture()
        capture = CameraCapture(cap)
        self.assertTrue(cap.entered.wait(3))
        started = time.monotonic()
        capture.close()
        self.assertLess(time.monotonic() - started, 1)
        self.assertTrue(capture.closed)
        self.assertTrue(capture.released)
        self.assertEqual(cap.release_calls, 1)
        self.assertFalse(capture._thread.is_alive())
        self.assertIsNone(capture.poll())
        capture.close()
        self.assertEqual(cap.release_calls, 1)
        cap.frames.put(self.frame(42))
        self.assertIsNone(capture.poll())

    def test_immediate_driver_is_paced_and_wait_is_interruptible(self):
        class ImmediateCapture:
            def __init__(self):
                self.read_times = []
                self.read_enough = threading.Event()
                self.release_calls = 0
                self.frame = np.zeros((12, 16, 3), np.uint8)

            def read(self):
                self.read_times.append(time.monotonic())
                if len(self.read_times) >= 5:
                    self.read_enough.set()
                return True, self.frame

            def release(self):
                self.release_calls += 1

        cap = ImmediateCapture()
        capture = CameraCapture(cap, max_fps=20)
        try:
            self.assertTrue(cap.read_enough.wait(3))
            intervals = [later - earlier for earlier, later in
                         zip(cap.read_times[:4], cap.read_times[1:5])]
            self.assertTrue(all(interval >= .04 for interval in intervals), intervals)
            started = time.monotonic()
            capture.close()
            self.assertLess(time.monotonic() - started, .1)
            self.assertFalse(capture._thread.is_alive())
            self.assertEqual(cap.release_calls, 1)
        finally:
            capture.close()

    def test_invalid_pacing_does_not_take_ownership_of_device(self):
        for fps in (0, -1, float("nan"), float("inf"), -float("inf"), None, "bad"):
            with self.subTest(fps=fps):
                cap = BlockingCapture()
                with self.assertRaisesRegex(ValueError, "positive and finite"):
                    CameraCapture(cap, max_fps=fps)
                self.assertEqual(cap.read_calls, 0)
                self.assertEqual(cap.release_calls, 0)


if __name__ == "__main__":
    unittest.main()
