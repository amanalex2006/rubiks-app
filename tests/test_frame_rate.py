"""Rolling FPS measures elapsed throughput, including irregular and stalled work."""

import math
import unittest
from unittest.mock import patch

from gui.frame_rate import FrameRate


class FrameRateTests(unittest.TestCase):
    def test_empty_and_first_event_have_no_interval(self):
        rate = FrameRate()
        self.assertEqual(rate.rate_at(10), 0)
        self.assertEqual(rate.record(10), 0)
        self.assertEqual(rate.rate_at(10.5), 0)

    def test_regular_stream_uses_elapsed_startup_then_full_window(self):
        rate = FrameRate(window_seconds=1)
        for number in range(121):
            measured = rate.record(number / 30)
            if number:
                self.assertAlmostEqual(measured, 30)
        self.assertAlmostEqual(rate.rate_at(4), 30)

    def test_irregular_slow_fast_pairs_do_not_average_reciprocals(self):
        rate = FrameRate(window_seconds=2)
        timestamp = 0.0
        rate.record(timestamp)
        for _ in range(12):
            timestamp += .125
            rate.record(timestamp)
            timestamp += .005
            rate.record(timestamp)
        # 24 completed intervals took 1.56 seconds. Averaging their reciprocal
        # rates would produce 104 FPS even though throughput is only 15.38 FPS.
        self.assertAlmostEqual(rate.rate_at(timestamp), 24 / 1.56)
        self.assertLess(rate.rate_at(timestamp), 16)

    def test_sliding_window_forgets_previous_fast_stream(self):
        rate = FrameRate(window_seconds=1)
        for number in range(61):
            rate.record(number / 60)
        self.assertAlmostEqual(rate.rate_at(1), 60)
        for number in range(1, 11):
            rate.record(1 + number / 10)
        self.assertAlmostEqual(rate.rate_at(2), 10)

    def test_stall_decays_and_reaches_zero_without_new_records(self):
        rate = FrameRate(window_seconds=1)
        for number in range(31):
            rate.record(number / 30)
        self.assertAlmostEqual(rate.rate_at(1), 30)
        self.assertAlmostEqual(rate.rate_at(1.5), 15)
        self.assertEqual(rate.rate_at(2), 0)
        self.assertEqual(rate.rate_at(100), 0)

    def test_reset_allows_new_clock_and_removes_previous_frames(self):
        rate = FrameRate()
        rate.record(100)
        self.assertEqual(rate.record(100.5), 2)
        rate.reset()
        self.assertEqual(rate.rate_at(0), 0)
        self.assertEqual(rate.record(0), 0)
        self.assertEqual(rate.record(.25), 4)

    def test_duplicate_and_backwards_events_are_ignored(self):
        rate = FrameRate()
        rate.record(10)
        rate.record(10.1)
        self.assertAlmostEqual(rate.record(10.1), 10)
        self.assertAlmostEqual(rate.record(9), 10)
        self.assertEqual(len(rate._timestamps), 2)
        self.assertAlmostEqual(rate.record(10.2), 10)

    def test_query_cannot_rewind_a_stalled_window(self):
        rate = FrameRate()
        rate.record(0)
        rate.record(.1)
        self.assertEqual(rate.rate_at(2), 0)
        self.assertEqual(rate.rate_at(.1), 0)

    def test_default_query_uses_monotonic_clock(self):
        rate = FrameRate()
        rate.record(10)
        rate.record(10.5)
        with patch("gui.frame_rate.time.monotonic", return_value=10.75):
            self.assertAlmostEqual(rate.rate, 1 / .75)

    def test_memory_bound_preserves_rate_over_retained_interval(self):
        rate = FrameRate(window_seconds=2, max_samples=8)
        for number in range(1000):
            rate.record(number / 1000)
        self.assertEqual(len(rate._timestamps), 8)
        self.assertAlmostEqual(rate.rate_at(.999), 1000)
        self.assertEqual(rate.rate_at(3), 0)

    def test_invalid_configuration_and_timestamps_are_rejected(self):
        for window in (0, -1, math.inf, math.nan):
            with self.subTest(window=window), self.assertRaises(ValueError):
                FrameRate(window_seconds=window)
        for capacity in (0, 1, 2.5, True):
            with self.subTest(capacity=capacity), self.assertRaises(ValueError):
                FrameRate(max_samples=capacity)
        rate = FrameRate()
        for timestamp in (math.inf, -math.inf, math.nan):
            with self.subTest(timestamp=timestamp):
                with self.assertRaises(ValueError):
                    rate.record(timestamp)
                with self.assertRaises(ValueError):
                    rate.rate_at(timestamp)


if __name__ == "__main__":
    unittest.main()
