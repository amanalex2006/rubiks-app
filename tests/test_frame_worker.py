"""Camera processing keeps current frames and drops abandoned scan results."""

from dataclasses import FrozenInstanceError
import threading
import time
import unittest

import numpy as np

from scanner.frame_worker import LatestFrameWorker


class LatestFrameWorkerTests(unittest.TestCase):
    def frame(self, value):
        return np.full((12, 16, 3), value, np.uint8)

    def poll_until(self, worker, sequence, timeout=3):
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            result = worker.poll()
            if result is not None and result.sequence == sequence:
                return result
            time.sleep(.005)
        self.fail(f"Frame {sequence} did not finish")

    def test_slow_processor_keeps_only_latest_pending_frame(self):
        entered, release = threading.Event(), threading.Event()
        seen = []

        def process(frame, context):
            seen.append(int(frame[0, 0, 0]))
            if len(seen) == 1:
                entered.set()
                if not release.wait(3):
                    raise RuntimeError("Test did not release the processor")
            return int(frame[0, 0, 0])

        worker = LatestFrameWorker(process)
        try:
            worker.submit(self.frame(1))
            self.assertTrue(entered.wait(3))
            for value in range(2, 8):
                final_sequence = worker.submit(self.frame(value))
            self.assertTrue(worker.busy)
            self.assertEqual(worker.dropped, 5)
            release.set()
            result = self.poll_until(worker, final_sequence)
            self.assertEqual(seen, [1, 7])
            self.assertEqual(result.value, 7)
            self.assertIsNone(worker.poll())
            self.assertFalse(worker.busy)
        finally:
            release.set()
            worker.close()

    def test_inputs_are_owned_by_worker_and_result_record_is_frozen(self):
        entered, release = threading.Event(), threading.Event()
        caller_thread = threading.get_ident()

        def process(frame, context):
            entered.set()
            if not release.wait(3):
                raise RuntimeError("Test did not release the processor")
            return int(frame[0, 0, 0]), context["nested"][0], threading.get_ident()

        worker = LatestFrameWorker(process)
        try:
            frame, context = self.frame(11), {"nested": [7]}
            sequence = worker.submit(frame, context)
            self.assertTrue(entered.wait(3))
            frame[:] = 99
            context["nested"][0] = 42
            release.set()
            result = self.poll_until(worker, sequence)
            self.assertEqual(result.value[:2], (11, 7))
            self.assertEqual(result.context, {"nested": [7]})
            self.assertNotEqual(result.value[2], caller_thread)
            self.assertGreaterEqual(result.elapsed_ms, 0)
            with self.assertRaises(FrozenInstanceError):
                result.sequence = 0
        finally:
            release.set()
            worker.close()

    def test_invalidation_discards_active_and_queued_abandoned_results(self):
        entered, release = threading.Event(), threading.Event()
        seen = []

        def process(frame, context):
            seen.append(int(frame[0, 0, 0]))
            if len(seen) == 1:
                entered.set()
                release.wait(3)
            return context["scan"]

        worker = LatestFrameWorker(process)
        try:
            worker.submit(self.frame(1), {"scan": "old"})
            self.assertTrue(entered.wait(3))
            worker.submit(self.frame(2), {"scan": "old"})
            generation = worker.invalidate()
            self.assertIsNone(worker.poll())
            sequence = worker.submit(self.frame(3), {"scan": "new"})
            release.set()
            result = self.poll_until(worker, sequence)
            self.assertEqual(result.generation, generation)
            self.assertEqual(result.value, "new")
            self.assertEqual(seen, [1, 3])
            self.assertEqual(worker.dropped, 1)
        finally:
            release.set()
            worker.close()

    def test_processor_failure_is_reported_and_next_frame_can_succeed(self):
        def process(frame, context):
            if frame[0, 0, 0] == 1:
                raise ValueError("Bad input")
            return "recovered"

        worker = LatestFrameWorker(process)
        try:
            sequence = worker.submit(self.frame(1))
            failed = self.poll_until(worker, sequence)
            self.assertEqual(failed.error, "ValueError: Bad input")
            self.assertIsNone(failed.value)
            sequence = worker.submit(self.frame(2))
            recovered = self.poll_until(worker, sequence)
            self.assertIsNone(recovered.error)
            self.assertEqual(recovered.value, "recovered")
        finally:
            worker.close()

    def test_close_discards_pending_work_and_joins_active_processor(self):
        entered, release, closed = threading.Event(), threading.Event(), threading.Event()
        seen = []

        def process(frame, context):
            seen.append(int(frame[0, 0, 0]))
            entered.set()
            release.wait(3)

        worker = LatestFrameWorker(process)
        worker.submit(self.frame(1))
        self.assertTrue(entered.wait(3))
        worker.submit(self.frame(2))

        def close():
            worker.close()
            closed.set()

        closer = threading.Thread(target=close)
        closer.start()
        try:
            self.assertFalse(closed.wait(.05))
            with self.assertRaises(RuntimeError):
                worker.submit(self.frame(3))
            release.set()
            self.assertTrue(closed.wait(3))
            closer.join()
            self.assertEqual(seen, [1])
            self.assertIsNone(worker.poll())
            self.assertFalse(worker.busy)
            self.assertFalse(worker._thread.is_alive())
            worker.close()
        finally:
            release.set()
            closer.join(3)
            worker.close()


if __name__ == "__main__":
    unittest.main()
