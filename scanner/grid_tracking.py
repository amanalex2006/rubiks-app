"""Offline perspective face tracking, with reliable reads separated from preview."""
import cv2 as cv
import numpy as np
from scanner.grid_detect import GRID_MIN_EVIDENCE


class FaceTracker:
    """Re-anchor geometry and follow its features between detections.

    Scan votes require a current finite face/grid fit, clear sticker majorities,
    and stable motion. No fixed guide is sampled when tracking fails.
    """
    def __init__(self, detector, cfg=None):
        self.detector = detector
        settings = (cfg or {}).get("grid", cfg or {})
        self.reanchor_interval = max(1, int(settings.get("tracking_detection_interval", 4)))
        self.reset()

    def reset(self):
        self.quad = None
        self.previous_gray = None
        self.features = None
        self.expected_color = None
        self.frame_index = 0
        self.frames_since_detection = 0
        self.stable_frames = 0
        self.unreadable_frames = 0
        self.status = "searching"
        self.reason = "Keep all nine stickers visible"
        self.confidence = 0.0
        self.stable_progress = 0.0
        self.grid_evidence = 0.0
        self.sharpness = 0.0
        self.fit_confidence = 0.0
        self.fit_quality = {}
        self.movement = 0.0
        self.reanchor_rejected = False
        self.reset_votes = True

    @staticmethod
    def _matching_anchor(detected_quad, flow_quad):
        """Keep a detection tied to the same physical face while flow is valid.

        Corners already have cyclic correspondence from the detector. Comparing
        them, as well as overlap, avoids switching to a larger room rectangle or
        an adjacent face merely because its detection score is higher.
        """
        detected = np.asarray(detected_quad, np.float32).reshape(4, 2)
        tracked = np.asarray(flow_quad, np.float32).reshape(4, 2)
        if not np.isfinite(detected).all() or not np.isfinite(tracked).all():
            return False
        tracked_area = abs(float(cv.contourArea(tracked)))
        detected_area = abs(float(cv.contourArea(detected)))
        if min(tracked_area, detected_area) <= 0:
            return False
        corner_distance = np.linalg.norm(detected-tracked, axis=1)/np.sqrt(tracked_area)
        if corner_distance.max() > 0.22 or corner_distance.mean() > 0.16:
            return False
        if not 0.65 <= detected_area/tracked_area <= 1.55:
            return False
        overlap, _ = cv.intersectConvexConvex(detected, tracked)
        return float(overlap)/min(tracked_area, detected_area) >= 0.70

    def _lose_face(self, reason):
        self.quad = self.features = self.previous_gray = None
        self.stable_frames = 0
        self.unreadable_frames = 0
        self.reset_votes = True
        self.status = "searching"
        self.reason = reason
        self.confidence = self.stable_progress = 0.0
        return None, None, self.status

    def _features(self, gray, quad):
        mask = np.zeros_like(gray)
        cv.fillConvexPoly(mask, np.rint(quad).astype(np.int32), 255)
        # Include the face border: solved faces often have no texture inside a sticker.
        return cv.goodFeaturesToTrack(gray, maxCorners=100, qualityLevel=0.012,
                                      minDistance=5, blockSize=5, mask=mask)

    def _flow_quad(self, gray):
        if self.previous_gray is None or self.features is None or len(self.features) < 8:
            return None
        next_points, found, _ = self.detector.ops.optical_flow(
            self.previous_gray, gray, self.features, winSize=(25, 25), maxLevel=3,
            criteria=(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 30, 0.01))
        if next_points is None:
            return None
        back, reverse_found, _ = self.detector.ops.optical_flow(
            gray, self.previous_gray, next_points, winSize=(25, 25), maxLevel=3)
        if back is None:
            return None
        good = ((found.ravel() == 1) & (reverse_found.ravel() == 1)
                & (np.linalg.norm(back-self.features, axis=2).ravel() < 1.5))
        if good.sum() < 8:
            return None
        old, new = self.features[good], next_points[good]
        transform, inliers = cv.findHomography(old, new, cv.RANSAC, 2.4)
        if transform is None or inliers is None or inliers.sum() < 8 or inliers.mean() < 0.65:
            return None
        quad = cv.perspectiveTransform(self.quad.reshape(1, 4, 2), transform).reshape(4, 2)
        if not self.detector.valid_quad(quad, gray.shape):
            return None
        return quad

    def update(self, frame_bgr, expected_color=None):
        if expected_color != self.expected_color:
            self.reset()
            self.expected_color = expected_color
        self.reset_votes = False
        self.reanchor_rejected = False
        gray, hsv = self.detector.ops.begin_frame(frame_bgr, force=True)
        flow_quad = self._flow_quad(gray) if self.quad is not None else None
        self.frames_since_detection += 1
        due = (self.quad is None or flow_quad is None
               or self.frame_index % self.reanchor_interval == 0)
        candidate = flow_quad
        if due:
            _, detected_quad = self.detector.detect_quad(
                frame_bgr, hsv, expected_color, reference=(flow_quad if flow_quad is not None else self.quad))
            if detected_quad is not None:
                if flow_quad is None or self._matching_anchor(detected_quad, flow_quad):
                    candidate = detected_quad
                    self.frames_since_detection = 0
                else:
                    self.reanchor_rejected = True
        self.frame_index += 1
        if candidate is None:
            self.grid_evidence = self.sharpness = self.movement = 0.0
            self.fit_confidence = 0.0
            self.fit_quality = {}
            return self._lose_face(
                self.detector.last_rejection or "Cube face lost; keep all nine stickers visible")
        side = np.sqrt(max(1.0, cv.contourArea(candidate)))
        movement = 0.0 if self.quad is None else float(np.linalg.norm(candidate-self.quad, axis=1).max())/side
        # Smooth subpixel jitter, but snap to large motion to avoid sampling a
        # stale location. The returned quad is used for both pixels and drawing.
        if self.quad is not None and movement < 0.035:
            candidate = self.quad*0.20 + candidate*0.80
        fit = self.detector.measure_fit(gray, hsv, candidate)
        self.fit_quality = {key: value for key, value in fit.items() if key != "cells"}
        self.fit_confidence = float(fit.get("confidence", 0.0))
        self.grid_evidence = float(fit.get("grid_evidence", 0.0))
        self.sharpness = float(fit.get("sharpness", 0.0))
        self.movement = movement
        # Fit finite outer boundaries, real dividers, and uniform cell surfaces
        # on this exact frame. Laplacian variance remains useful diagnostics,
        # but a large flat face can have low variance and still fit clearly.
        fit_valid = (bool(fit.get("accepted")) and np.isfinite(self.fit_confidence)
                     and self.fit_confidence >= 0.60 and np.isfinite(self.grid_evidence)
                     and self.grid_evidence >= GRID_MIN_EVIDENCE)
        if not fit_valid:
            return self._lose_face(fit.get("reason") or
                                   "No clear 3 by 3 grid; keep all nine stickers visible")
        cells = fit.get("cells")
        evidence = self.detector.read_quality
        same_center = (evidence.get("center") is not None and
                       expected_color in (None, evidence["center"]))
        if evidence.get("center") is not None and not same_center:
            evidence["reason"] = f"Show the {expected_color} face; center looks {evidence['center']}"
            cells = None
        reliable = cells is not None and same_center and movement <= 0.14
        self.confidence = float(evidence.get("readable_count", 0))/9.0
        self.reason = evidence.get("reason", "")
        if reliable:
            self.stable_frames = min(3, self.stable_frames+1)
            self.unreadable_frames = 0
            self.reason = "Cube locked" if self.stable_frames >= 3 else "Face found; checking stable colors"
        else:
            self.unreadable_frames += 1
            # Retain collected votes across one or two bad non-center patches.
            # Nothing is captured from these frames. A real blur, lost center,
            # face change or large movement immediately invalidates the votes.
            grace = (self.stable_frames >= 3 and self.unreadable_frames <= 2
                     and same_center and fit_valid and movement <= 0.08
                     and evidence.get("readable_count", 0) >= 7)
            if not grace:
                self.stable_frames = 0
                self.reset_votes = True
            if movement > 0.14:
                self.reason = "Cube moving quickly; steady briefly"
            elif not self.reason:
                self.reason = "Center sticker is obscured; keep it visible"
        self.stable_progress = self.stable_frames/3.0
        self.quad = np.asarray(candidate, np.float32)
        self.previous_gray = gray
        self.features = self._features(gray, self.quad)
        self.status = "tracking" if reliable and self.stable_frames >= 3 else "unstable"
        if self.status != "tracking":
            cells = None
            if reliable:
                self.reset_votes = True
        return cells, self.quad.copy(), self.status
