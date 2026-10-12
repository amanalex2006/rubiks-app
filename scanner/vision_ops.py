"""OpenCV OpenCL image operations with a safe CPU fallback.

Contours, geometry and color decisions stay on the CPU. UMat lets OpenCV use
the actual OpenCL GPU for supported image kernels; it does not require a CUDA
OpenCV build and does not imply every OpenCV operation runs on the GPU.
"""
from collections import OrderedDict
import threading

import cv2 as cv
import numpy as np


class FrameOps:
    _runtime_lock = threading.Lock()
    _runtime_ready = threading.Event()
    _runtime_started = False
    _runtime = {"available": False, "device": "", "state": "unavailable", "error": None}

    def __init__(self, backend="auto"):
        if isinstance(backend, dict):
            backend = backend.get("processing_backend", "auto")
        if backend not in ("auto", "gpu", "cpu"):
            raise ValueError("processing_backend must be 'auto', 'gpu', or 'cpu'")
        self.backend = backend
        self._failed = None
        self._cache = OrderedDict()
        self._frame = None
        self._gray = self._hsv = None
        if backend != "cpu":
            self._start_runtime()

    @classmethod
    def _start_runtime(cls):
        with cls._runtime_lock:
            if cls._runtime_started:
                return
            cls._runtime_started = True
            cls._runtime["state"] = "warming"
            threading.Thread(target=cls._warm_runtime, name="opencv-gpu-warmup", daemon=True).start()

    @classmethod
    def _warm_runtime(cls):
        try:
            if not cv.ocl.haveOpenCL():
                raise RuntimeError("OpenCV has no OpenCL runtime")
            cv.ocl.setUseOpenCL(True)
            device = cv.ocl.Device_getDefault()
            if not cv.ocl.useOpenCL() or not device.available() or not (device.type() & 4):
                raise RuntimeError("No usable OpenCL GPU was found")
            cls._runtime.update(available=True, device=device.name())
            # Build kernels away from the camera/UI. The real path uploads each
            # frame once and retains converted images for masks, warps and flow.
            frame = np.random.default_rng(17).integers(0, 256, (600, 800, 3), np.uint8)
            source = cv.UMat(frame)
            gray = cv.cvtColor(source, cv.COLOR_BGR2GRAY)
            hsv = cv.cvtColor(source, cv.COLOR_BGR2HSV)
            mask = cv.bitwise_or(cv.inRange(hsv, (0, 70, 40), (180, 255, 255)),
                                 cv.inRange(hsv, (0, 0, 90), (180, 60, 255)))
            for size in (3, 37):
                kernel = cv.getStructuringElement(cv.MORPH_RECT, (size, size))
                mask = cv.morphologyEx(mask, cv.MORPH_CLOSE, kernel)
                mask = cv.morphologyEx(mask, cv.MORPH_OPEN, kernel)
            edges = cv.Canny(gray, 35, 100)
            transform = np.array([[0.7, 0, 0], [0, 0.7, 0], [0, 0, 1]], np.float64)
            for flags in (cv.INTER_NEAREST, cv.INTER_LINEAR):
                cv.warpPerspective(hsv, transform, (300, 300), flags=flags).get()
                cv.warpPerspective(gray, transform, (300, 300), flags=flags).get()
            points = cv.UMat(np.array([[150, 150], [250, 150], [350, 150], [150, 250],
                                      [250, 250], [350, 250], [150, 350], [250, 350]],
                                     np.float32).reshape(-1, 1, 2))
            cv.calcOpticalFlowPyrLK(gray, gray, points, None, winSize=(25, 25), maxLevel=3)
            edges.get()
            mask.get()
            cv.ocl.finish()
            cls._runtime["state"] = "ready"
        except Exception as exc:
            cls._runtime.update(available=False, state="unavailable", error=str(exc))
        finally:
            cls._runtime_ready.set()

    def wait_ready(self, timeout=10):
        """Synchronize warmup for diagnostics; ordinary scanning never waits here."""
        if self.backend != "cpu":
            self._runtime_ready.wait(timeout)
        return self.active

    @property
    def active(self):
        return (self.backend != "cpu" and self._failed is None
                and self._runtime["available"] and self._runtime["state"] == "ready")

    @property
    def info(self):
        active = self.active
        return {"name": "OpenCL GPU + CPU" if active else "CPU",
                "device": self._runtime["device"] if self.backend != "cpu" else "",
                "active": active,
                "available": self._runtime["available"] if self.backend != "cpu" else False,
                "state": ("cpu" if self.backend == "cpu" else
                          "fallback" if self._failed else self._runtime["state"]),
                "error": self._failed or (self._runtime["error"] if self.backend != "cpu" else None)}

    def _fallback(self, error):
        self._failed = str(error)
        self._cache.clear()

    def _remember(self, array, device):
        self._cache[id(array)] = (array, device)
        self._cache.move_to_end(id(array))
        while len(self._cache) > 12:
            self._cache.popitem(last=False)
        return array

    def _device(self, array):
        item = self._cache.get(id(array))
        if item is not None and item[0] is array:
            self._cache.move_to_end(id(array))
            return item[1]
        device = cv.UMat(array)
        self._remember(array, device)
        return device

    def _download(self, device):
        return self._remember(device.get(), device)

    def begin_frame(self, frame_bgr, force=False):
        """Convert once per frame, reusing the same GPU allocation downstream."""
        if not force and self._frame is frame_bgr:
            return self._gray, self._hsv
        if self.active:
            try:
                cv.ocl.setUseOpenCL(True)
                if not cv.ocl.useOpenCL():
                    raise RuntimeError("OpenCL GPU is unavailable in the camera worker")
            except Exception as exc:
                self._fallback(exc)
        # At the scanner's 800x600 working size CPU conversion avoids downloading
        # a full HSV image from a discrete GPU on every sparse tracking frame.
        # Large color conversions retain the UMat path; expensive full-frame
        # masks/edges below use the GPU at every working size.
        if self.active and frame_bgr.shape[0]*frame_bgr.shape[1] >= 900000:
            try:
                source = cv.UMat(frame_bgr)
                self._remember(frame_bgr, source)
                gray = self._download(cv.cvtColor(source, cv.COLOR_BGR2GRAY))
                hsv = self._download(cv.cvtColor(source, cv.COLOR_BGR2HSV))
            except Exception as exc:
                self._fallback(exc)
                gray, hsv = cv.cvtColor(frame_bgr, cv.COLOR_BGR2GRAY), cv.cvtColor(frame_bgr, cv.COLOR_BGR2HSV)
        else:
            gray, hsv = cv.cvtColor(frame_bgr, cv.COLOR_BGR2GRAY), cv.cvtColor(frame_bgr, cv.COLOR_BGR2HSV)
        self._frame, self._gray, self._hsv = frame_bgr, gray, hsv
        return gray, hsv

    def cube_mask(self, hsv, min_sat, min_value, white_sat, white_value, kernel):
        if self.active:
            try:
                source = self._device(hsv)
                mask = cv.bitwise_or(cv.inRange(source, (0, int(min_sat), int(min_value)), (180, 255, 255)),
                                     cv.inRange(source, (0, 0, int(white_value)), (180, int(white_sat), 255)))
                mask = cv.morphologyEx(mask, cv.MORPH_CLOSE, kernel)
                mask = cv.morphologyEx(mask, cv.MORPH_OPEN, kernel)
                return self._download(mask)
            except Exception as exc:
                self._fallback(exc)
        saturation, value = hsv[:, :, 1], hsv[:, :, 2]
        mask = (((saturation >= min_sat) & (value >= min_value)
                | (saturation <= white_sat) & (value >= white_value)).astype(np.uint8))*255
        return cv.morphologyEx(cv.morphologyEx(mask, cv.MORPH_CLOSE, kernel), cv.MORPH_OPEN, kernel)

    def edges(self, gray, low, high, close_kernel=None):
        # Transfers and launch overhead outweigh small 300px grid patches. Keep
        # these on CPU; full camera edge images still use the selected GPU.
        if self.active and gray.shape[0]*gray.shape[1] >= 180000:
            try:
                result = cv.Canny(self._device(gray), low, high)
                if close_kernel is not None:
                    result = cv.morphologyEx(result, cv.MORPH_CLOSE, close_kernel)
                return self._download(result)
            except Exception as exc:
                self._fallback(exc)
        result = cv.Canny(gray, low, high)
        return result if close_kernel is None else cv.morphologyEx(result, cv.MORPH_CLOSE, close_kernel)

    def warp(self, image, transform, shape, flags=cv.INTER_LINEAR):
        if self.active and shape[0]*shape[1] >= 180000:
            try:
                return self._download(cv.warpPerspective(self._device(image), transform, shape, flags=flags))
            except Exception as exc:
                self._fallback(exc)
        return cv.warpPerspective(image, transform, shape, flags=flags)

    def optical_flow(self, old_gray, new_gray, points, **options):
        # A cube normally has fewer than100 points. Measured sparse LK on this
        # GPU is slower than CPU; large feature sets retain a UMat path.
        if self.active and len(points) >= 500:
            try:
                values = cv.calcOpticalFlowPyrLK(self._device(old_gray), self._device(new_gray),
                                               cv.UMat(points), None, **options)
                return tuple(value.get() if isinstance(value, cv.UMat) else value for value in values)
            except Exception as exc:
                self._fallback(exc)
        return cv.calcOpticalFlowPyrLK(old_gray, new_gray, points, None, **options)
