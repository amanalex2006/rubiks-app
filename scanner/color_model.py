"""Explicit camera color calibration with the original HSV classifier as fallback.

Profiles contain six labeled RGB medians only. Pixel classification always
returns a 0..5 ID; unreliable pixels are reported separately by valid_pixels so
existing np.bincount callers never receive negative IDs.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import tempfile

import cv2 as cv
import numpy as np


NAMES = ("red", "orange", "yellow", "green", "blue", "white")
PROFILE_VERSION = 1


class ColorModel:
    def __init__(self, cfg=None):
        cfg = cfg or {}
        colors, grid = cfg.get("colors", {}), cfg.get("grid", {})

        def hue(name, bound, fallback):
            return colors.get(name, {}).get(bound, [fallback])[0]

        self.red_orange = float(grid.get("red_orange_hue", 3.5))
        self.orange_yellow = (hue("yellow", "lower_bound", 19) + hue("orange", "upper_bound", 26)) / 2
        self.yellow_green = (hue("yellow", "upper_bound", 40) + hue("green", "lower_bound", 65)) / 2
        self.green_blue = (hue("green", "upper_bound", 96) + hue("blue", "lower_bound", 100)) / 2
        self.blue_red = (hue("blue", "upper_bound", 123) + hue("red", "lower_bound2", 170)) / 2
        self.white_s_max = float(grid.get("white_s_max", 60))
        self.white_v_min = float(grid.get("white_v_min", 90))
        self.min_sat = float(grid.get("min_saturation", 70))
        self.min_val = float(grid.get("min_value", 40))
        self._samples = {}
        self._references = None
        self._radii = None
        self._hue_references = None
        self._white_reference_saturation = None

    @property
    def samples(self):
        return dict(self._samples)

    @property
    def ready(self):
        return self._references is not None

    @staticmethod
    def _rgb(value):
        sample = np.asarray(value)
        if sample.shape != (3,) or sample.dtype.kind not in "iuf" or not np.isfinite(sample).all():
            raise ValueError("Each color sample must contain three finite RGB numbers.")
        if (sample < 0).any() or (sample > 255).any():
            raise ValueError("Color sample RGB values must be between 0 and 255.")
        return np.rint(sample).astype(np.uint8)

    @staticmethod
    def _features_rgb(rgb):
        pixels = np.asarray(rgb, np.float32).reshape(-1, 3) / 255.0
        # Remove exposure magnitude before Lab conversion. This retains the
        # camera's measured chroma and relative channel brightness while making
        # the profile tolerate ordinary brighter/darker views of the same cube.
        maximum = np.maximum(pixels.max(axis=1, keepdims=True), 1.0 / 255.0)
        normalized = np.clip(pixels / maximum * 0.85, 0.0, 1.0)
        lab = cv.cvtColor(normalized.reshape(-1, 1, 3), cv.COLOR_RGB2Lab).reshape(-1, 3)
        lab[:, 0] *= 0.20
        return lab

    @classmethod
    def _sample_error(cls, samples, complete):
        if not isinstance(samples, dict) or any(name not in NAMES for name in samples):
            return "Use the six color labels: red, orange, yellow, green, blue, and white."
        if complete and set(samples) != set(NAMES):
            return "Calibrate all six cube center colors before saving."
        prepared = []
        labels = []
        for name, value in samples.items():
            try:
                rgb = cls._rgb(value)
            except (TypeError, ValueError) as error:
                return str(error)
            hsv = cv.cvtColor(rgb.reshape(1, 1, 3), cv.COLOR_RGB2HSV)[0, 0]
            if hsv[2] < 45:
                return f"The {name} sample is too dark. Improve the light and sample its center again."
            if (rgb >= 250).all():
                return f"The {name} sample is overexposed. Avoid glare and sample its center again."
            if name == "white" and hsv[1] > 115:
                return "The white sample is strongly colored. Aim at the white center and sample again."
            if name != "white" and hsv[1] < 65:
                return f"The {name} sample has little color. Avoid glare and sample its center again."
            labels.append(name)
            prepared.append(rgb)
        if len(prepared) > 1:
            features = cls._features_rgb(prepared)
            distances = np.linalg.norm(features[:, None] - features[None, :], axis=2)
            np.fill_diagonal(distances, np.inf)
            first, second = np.unravel_index(np.argmin(distances), distances.shape)
            if distances[first, second] < 9.0:
                return (f"The {labels[first]} and {labels[second]} samples are too similar. "
                        "Sample their separate centers in the same light.")
        return None

    @classmethod
    def validate_samples(cls, samples):
        """Return a readable error, or None for a usable complete profile."""
        return cls._sample_error(samples, complete=True)

    def add_sample(self, name, rgb):
        if name not in NAMES:
            raise ValueError("Choose one of the six cube center colors.")
        sample = tuple(int(value) for value in self._rgb(rgb))
        candidate = dict(self._samples, **{name: sample})
        error = self._sample_error(candidate, complete=False)
        if error:
            raise ValueError(error)
        self._samples = candidate
        self._references = self._radii = None
        self._hue_references = self._white_reference_saturation = None
        if len(candidate) == len(NAMES):
            reference_rgb = np.asarray([candidate[name] for name in NAMES], np.uint8)
            self._references = self._features_rgb(reference_rgb)
            separation = np.linalg.norm(self._references[:, None] - self._references[None, :], axis=2)
            np.fill_diagonal(separation, np.inf)
            self._radii = np.clip(separation.min(axis=1) * 0.80, 12.0, 32.0)
            reference_hsv = cv.cvtColor(reference_rgb.reshape(-1, 1, 3), cv.COLOR_RGB2HSV).reshape(-1, 3)
            self._hue_references = reference_hsv[:5, 0].astype(np.float32)
            self._white_reference_saturation = float(reference_hsv[5, 1])
        return sample

    @staticmethod
    def _hsv_pixels(hsv):
        pixels = np.asarray(hsv)
        if pixels.size == 0:
            return np.empty((0, 3), np.uint8)
        if pixels.shape[-1:] != (3,) or pixels.dtype.kind not in "iuf" or not np.isfinite(pixels).all():
            raise ValueError("Expected finite HSV pixels with three channels.")
        pixels = pixels.reshape(-1, 3)
        if (pixels < 0).any() or (pixels[:, 0] > 179).any() or (pixels[:, 1:] > 255).any():
            raise ValueError("Expected OpenCV HSV values: H 0–179, S/V 0–255.")
        return np.rint(pixels).astype(np.uint8)

    def _distances(self, pixels):
        rgb = cv.cvtColor(pixels.reshape(-1, 1, 3), cv.COLOR_HSV2RGB).reshape(-1, 3)
        features = self._features_rgb(rgb)
        return np.linalg.norm(features[:, None] - self._references[None, :], axis=2)

    def classify_pixels(self, hsv):
        return self.classify_valid(hsv)[0]

    def _ids_valid(self, pixels, distances):
        """Original calibrated IDs and validity, shared by both public passes."""
        ids = np.argmin(distances, axis=1).astype(np.int8)
        nearest = distances[np.arange(len(pixels)), ids]
        second = np.partition(distances, 1, axis=1)[:, 1]
        valid = ((pixels[:, 2] >= max(35.0, self.min_val))
                 & (nearest <= self._radii[ids]) & (second-nearest >= 2.5)
                 & (second >= (nearest+2.0)*1.35))
        return ids, valid

    def classify_valid(self, hsv):
        """Return IDs and usable pixels from one color-distance calculation."""
        pixels = self._hsv_pixels(hsv)
        if len(pixels) == 0:
            return np.empty(0, np.int8), np.empty(0, bool)
        if self.ready:
            distances = self._distances(pixels)
            return self._ids_valid(pixels, distances)
        h, saturation, value = pixels.T
        out = np.full(len(pixels), 3, np.int8)
        out[(h >= self.red_orange) & (h < self.orange_yellow)] = 1
        out[(h >= self.orange_yellow) & (h < self.yellow_green)] = 2
        out[(h >= self.yellow_green) & (h < self.green_blue)] = 3
        out[(h >= self.green_blue) & (h < self.blue_red)] = 4
        out[(h < self.red_orange) | (h >= self.blue_red)] = 0
        out[(saturation <= self.white_s_max) & (value >= self.white_v_min)] = 5
        valid = (((saturation >= self.min_sat) & (value >= self.min_val))
                 | ((saturation <= self.white_s_max) & (value >= self.white_v_min)))
        return out, valid

    def classify_votes(self, hsv):
        """Return sticker vote IDs and the original strict validity mask.

        Desaturation can move a colored sticker closer to calibrated white in
        Lab. Correct only that white label when measurable chroma and a clear
        calibrated hue agree with the nearest non-white Lab color. Existing
        color labels, ambiguous hues, dark pixels, and neutral whites retain
        their original IDs. This shares one Lab calculation with validity.
        """
        pixels = self._hsv_pixels(hsv)
        if not self.ready or len(pixels) == 0:
            return self.classify_valid(pixels)
        distances = self._distances(pixels)
        ids, valid = self._ids_valid(pixels, distances)
        hue_distance = np.abs(pixels[:, :1].astype(np.float32)-self._hue_references[None, :])
        hue_distance = np.minimum(hue_distance, 180.0-hue_distance)
        hue_color = np.argmin(hue_distance, axis=1)
        nearest_hue = hue_distance[np.arange(len(pixels)), hue_color]
        second_hue = np.partition(hue_distance, 1, axis=1)[:, 1]
        colored_lab = np.argmin(distances[:, :5], axis=1)
        rescue = ((ids == 5)
                  & (pixels[:, 1] >= max(30.0, self._white_reference_saturation+20.0))
                  & (pixels[:, 2] >= self.min_val)
                  & (nearest_hue <= 12.0) & (second_hue-nearest_hue >= 4.0)
                  & (colored_lab == hue_color))
        ids[rescue] = hue_color[rescue]
        return ids, valid

    def valid_pixels(self, hsv):
        """Mask dark, distant or ambiguous readings without changing class IDs."""
        return self.classify_valid(hsv)[1]

    @staticmethod
    def sample_patch(bgr, x, y, size=28):
        """Return (RGB median, quality), rejecting dark, glare or mixed patches.

        A center sticker can be uniformly colored, so this intentionally does
        not use a sharpness/texture threshold as a proxy for blur.
        """
        frame = np.asarray(bgr)
        if frame.ndim != 3 or frame.shape[2] != 3 or frame.dtype != np.uint8:
            raise ValueError("Expected an 8-bit BGR camera image.")
        if size < 6 or not np.isfinite([x, y]).all():
            raise ValueError("Choose a visible center sticker in the camera preview.")
        height, width = frame.shape[:2]
        x, y, half = round(float(x)), round(float(y)), int(size) // 2
        if not (0 <= x < width and 0 <= y < height):
            raise ValueError("Choose a center sticker inside the camera preview.")
        patch = frame[max(0, y-half):min(height, y+half), max(0, x-half):min(width, x+half)]
        if patch.shape[0] < 6 or patch.shape[1] < 6:
            raise ValueError("Move the center sticker away from the image edge.")
        rgb = cv.cvtColor(patch, cv.COLOR_BGR2RGB).reshape(-1, 3)
        hsv = cv.cvtColor(patch, cv.COLOR_BGR2HSV).reshape(-1, 3)
        usable = hsv[:, 2] >= 45
        usable_fraction = float(usable.mean())
        clipped = float((rgb >= 250).all(axis=1).mean())
        if usable_fraction < 0.80:
            raise ValueError("This sample is too dark. Improve the light and aim at the center sticker.")
        if clipped > 0.15:
            raise ValueError("This sample is overexposed. Avoid the reflection and try again.")
        median = np.median(rgb[usable], axis=0)
        spread = float(np.percentile(np.linalg.norm(rgb[usable].astype(float)-median, axis=1), 90))
        median_hsv = cv.cvtColor(np.rint(median).astype(np.uint8).reshape(1, 1, 3), cv.COLOR_RGB2HSV)[0, 0]
        glare_fraction = float(((hsv[:, 1] < 55) & (hsv[:, 2] > 235)).mean())
        if spread > 55 or (median_hsv[1] > 90 and glare_fraction > 0.20):
            raise ValueError("The sample includes an edge or reflection. Aim at the middle of one center sticker.")
        return tuple(int(round(value)) for value in median), {
            "usable_fraction": usable_fraction, "spread": spread, "glare_fraction": glare_fraction,
        }

    def save(self, path):
        if not self.ready:
            raise ValueError(self.validate_samples(self._samples))
        destination = Path(path)
        destination.parent.mkdir(parents=True, exist_ok=True)
        document = {"version": PROFILE_VERSION, "color_space": "RGB", "samples": self.samples}
        temporary = None
        try:
            with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=destination.parent,
                                             prefix=destination.name + ".", suffix=".tmp", delete=False) as stream:
                temporary = Path(stream.name)
                json.dump(document, stream, indent=2)
                stream.write("\n")
                stream.flush()
                os.fsync(stream.fileno())
            os.replace(temporary, destination)
            temporary = None
        finally:
            if temporary is not None:
                temporary.unlink(missing_ok=True)

    @classmethod
    def load(cls, path, cfg=None):
        """Load a valid profile; return None when no profile exists."""
        source = Path(path)
        if not source.exists():
            return None
        try:
            document = json.loads(source.read_text(encoding="utf-8"))
        except (OSError, UnicodeError, json.JSONDecodeError) as error:
            raise ValueError("Could not read the saved color calibration. Calibrate the six centers again.") from error
        if (not isinstance(document, dict) or type(document.get("version")) is not int
                or document["version"] != PROFILE_VERSION or document.get("color_space") != "RGB"):
            raise ValueError("Unsupported color calibration profile. Calibrate the six centers again.")
        error = cls.validate_samples(document.get("samples"))
        if error:
            raise ValueError("Invalid saved color calibration: " + error)
        model = cls(cfg)
        for name in NAMES:
            model.add_sample(name, document["samples"][name])
        return model
