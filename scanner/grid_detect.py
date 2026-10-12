"""
Grid-based face detector that works for BOTH:
  * classic black-bordered cubes, and
  * stickerless cubes (no gaps between stickers).

Instead of "find 9 separate coloured blobs", it
  1. finds the whole 3x3 face as one square-ish region (union of all colour masks,
     morphologically closed so thin black borders / bevel lines don't split it),
  2. perspective-warps that square to an upright 300x300 image,
  3. samples the centre of each of the 9 cells and classifies it by hue,
  4. rejects the candidate unless every cell is a confident, single-colour reading.

Output matches what CubeMap.process() already expects:
  [((x, y), 'yellow'), ...]  (9 items, positions in the upright warped image)
"""
import cv2 as cv
import numpy as np
from collections import Counter
from scanner.vision_ops import FrameOps

WARP = 300
CELL = WARP // 3
PATCH = 0.40            # fraction of a cell (centre) used for sampling
GRID_MIN_EVIDENCE = 0.25

# Reuse five straight-line stencils for the fixed-size perspective warp.
# Precomputing these avoids rebuilding tiny coordinate arrays per candidate.
_LINE_ROWS = np.arange(WARP-24)[None, :, None]
_LINE_INDICES = (np.arange(21)[None, None, :] + np.rint(
    np.array([-12, -6, 0, 6, 12])[:, None, None] *
    np.linspace(-0.5, 0.5, WARP-24)[None, :, None]).astype(np.int32))
_LINE_INSIDE = (_LINE_INDICES >= 0) & (_LINE_INDICES < 21)
_LINE_INDICES = np.clip(_LINE_INDICES, 0, 20)
_SIDE_FRACTIONS = np.linspace(0.04, 0.96, 96)[:, None]
_REFINE_FRACTIONS = np.linspace(-0.46, 0.46, 96)[None, :, None]
_REFINE_ANGLES = np.repeat(np.deg2rad(np.arange(-12, 13, 3)), 17)
_REFINE_OFFSETS = np.tile(np.linspace(-1.0, 1.0, 17), 9)
_REFINE_COS, _REFINE_SIN = np.cos(_REFINE_ANGLES), np.sin(_REFINE_ANGLES)

NAME_BY_ID = ['red', 'orange', 'yellow', 'green', 'blue', 'white']


class GridDetector:
    def __init__(self, cfg):
        c = cfg['colors']
        g = cfg.get('grid', {})
        self.ops = FrameOps(cfg)
        self.color_model = None
        # Hue boundaries derived from config so overlapping ranges (yellow/orange)
        # become ONE hard boundary instead of double detections.
        self.red_hi = c['red']['upper_bound'][0]
        self.orange_yellow = (c['yellow']['lower_bound'][0] + c['orange']['upper_bound'][0]) / 2.0
        self.yellow_green = (c['yellow']['upper_bound'][0] + c['green']['lower_bound'][0]) / 2.0
        self.green_blue = (c['green']['upper_bound'][0] + c['blue']['lower_bound'][0]) / 2.0
        self.blue_red = (c['blue']['upper_bound'][0] + c['red']['lower_bound2'][0]) / 2.0
        # Red/orange is the tightest boundary and is lighting/camera dependent.
        # On the test photos orange sat at H~4-9 and red at H~175-2, so default ~3.5.
        self.red_orange = g.get('red_orange_hue', 3.5)
        self.white_s_max = g.get('white_s_max', 60)
        self.white_v_min = g.get('white_v_min', 90)
        self.min_sat = g.get('min_saturation', 70)
        self.min_val = g.get('min_value', 40)
        self.max_ratio = g.get('max_aspect_ratio', 1.3)
        self.min_fill = g.get('min_fill', 0.75)
        self.min_conf = g.get('min_cell_confidence', 0.6)
        self.min_side_frac = g.get('min_side_fraction', 0.12)
        self.close_frac = g.get('close_kernel_fraction', 0.045)
        self.read_quality = {}
        self.fit_quality = {}
        self.last_rejection = "No cube face found"
        self.rejection_counts = Counter()

    def _reject(self, reason):
        self.last_rejection = reason
        self.rejection_counts[reason] += 1

    # ---------- colour classification ----------
    def classify_pixels(self, hsv):
        """hsv: (N,3) uint8/int -> (N,) ids into NAME_BY_ID"""
        if self.color_model is not None and self.color_model.ready:
            return self.color_model.classify_pixels(hsv)
        h = hsv[:, 0].astype(np.float32)
        s = hsv[:, 1]
        v = hsv[:, 2]
        out = np.full(len(h), 3, np.int8)  # default green
        out[(h >= self.red_orange) & (h < self.orange_yellow)] = 1  # orange
        out[(h >= self.orange_yellow) & (h < self.yellow_green)] = 2  # yellow
        out[(h >= self.yellow_green) & (h < self.green_blue)] = 3  # green
        out[(h >= self.green_blue) & (h < self.blue_red)] = 4  # blue
        out[(h < self.red_orange) | (h >= self.blue_red)] = 0  # red
        white = (s <= self.white_s_max) & (v >= self.white_v_min)
        out[white] = 5
        return out

    # ---------- locating the face ----------
    def _cube_mask(self, hsv):
        k = max(9, int(hsv.shape[1] * self.close_frac) | 1)
        kernel = cv.getStructuringElement(cv.MORPH_RECT, (k, k))
        return self.ops.cube_mask(hsv, self.min_sat, self.min_val,
                                  self.white_s_max, self.white_v_min, kernel)

    @staticmethod
    def _order(pts):
        pts = np.array(pts, dtype=np.float32)
        s = pts.sum(axis=1)
        d = np.diff(pts, axis=1).ravel()
        return np.array([pts[np.argmin(s)], pts[np.argmin(d)],
                         pts[np.argmax(s)], pts[np.argmax(d)]], dtype=np.float32)  # tl,tr,br,bl

    def _sample_cells(self, hsv_frame, quad):
        """Measure all nine patches together; weak colors do not erase geometry."""
        M = cv.getPerspectiveTransform(
            quad, np.array([[0, 0], [WARP, 0], [WARP, WARP], [0, WARP]], np.float32))
        warped = self.ops.warp(hsv_frame, M, (WARP, WARP), flags=cv.INTER_NEAREST)
        half = int(CELL * PATCH / 2)
        patches, positions = [], []
        for r in range(3):
            for c in range(3):
                cx, cy = c * CELL + CELL // 2, r * CELL + CELL // 2
                # 400 evenly distributed pixels still measure the entire patch;
                # doing one Lab conversion avoids 18 conversions per candidate.
                patches.append(warped[cy-half:cy+half:2, cx-half:cx+half:2].reshape(-1, 3))
                positions.append((cx, cy))
        pixels = np.concatenate(patches)
        if self.color_model is not None:
            classifier = getattr(self.color_model, "classify_votes", self.color_model.classify_valid)
            ids, valid = classifier(pixels)
        else:
            ids = self.classify_pixels(pixels)
            saturation, value = pixels[:, 1], pixels[:, 2]
            valid = (((saturation >= self.min_sat) & (value >= self.min_val))
                     | ((saturation <= self.white_s_max) & (value >= self.white_v_min)))
        ids, valid = ids.reshape(9, -1), valid.reshape(9, -1)
        rgb = cv.cvtColor(pixels.reshape(-1, 1, 3), cv.COLOR_HSV2RGB).reshape(9, -1, 3).astype(np.float32)
        medians = np.median(rgb, axis=1)
        spreads = np.percentile(np.linalg.norm(rgb-medians[:, None], axis=2), 75, axis=1)
        brightness = np.median(pixels.reshape(9, -1, 3)[:, :, 2], axis=1)
        uniform = (spreads <= 45.0) & (brightness >= self.min_val)
        cells, readable, fractions, confidence = [], [], [], []
        for index, position in enumerate(positions):
            fraction = float(valid[index].mean())
            bright = pixels.reshape(9, -1, 3)[index, :, 2] >= self.min_val
            votes = np.bincount(ids[index][bright], minlength=6)
            best = int(np.argmax(votes))
            # The user-selected rule is 80% of the entire sampled patch. Dark
            # pixels never vote, and saved-profile distance is diagnostic:
            # nearest calibrated labels remain usable in changed lighting.
            conf = float(votes[best]/ids.shape[1])
            readable.append(conf >= max(0.80, self.min_conf))
            fractions.append(fraction)
            confidence.append(conf)
            cells.append((position, NAME_BY_ID[best], conf))
        reason = ""
        rejected = next((index for index, good in enumerate(readable) if not good), None)
        if rejected is not None:
            row, col = divmod(rejected, 3)
            reason = (f"Sticker {row+1},{col+1} is too dark or reflective" if brightness[rejected] < self.min_val
                      else f"Sticker {row+1},{col+1} has an uncertain color")
        if (self.color_model is not None and self.color_model.ready and
                sum(readable) < 5 and int(uniform.sum()) >= 7 and
                int((brightness >= 70).sum()) >= 7):
            reason = "Cube colors differ from saved calibration; recalibrate in this light"
        self.read_quality = {"readable": readable, "readable_count": sum(readable),
                             "center": cells[4][1] if readable[4] else None,
                             "valid_fractions": fractions, "confidence": confidence,
                             "reason": reason, "rejected_cell": rejected,
                             "labels": [name for _, name, _ in cells],
                             "dominant_fractions": confidence,
                             "calibration_match_fractions": fractions,
                             "bright_fractions": (pixels.reshape(9, -1, 3)[:, :, 2] >= self.min_val).mean(axis=1).tolist(),
                             "uniform": uniform.tolist(), "uniform_count": int(uniform.sum()),
                             "surface_spreads": spreads.tolist(), "brightness": brightness.tolist()}
        return cells

    def _read_cells(self, hsv_frame, quad):
        cells = self._sample_cells(hsv_frame, np.asarray(quad, np.float32))
        if self.read_quality["readable_count"] != 9:
            self._reject(self.read_quality["reason"])
            return None
        return cells

    def read_box(self, hsv_frame, x0, y0, x1, y1):
        """Read the face inside an axis-aligned guide box. Returns cells or None."""
        quad = np.array([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], np.float32)
        cells = self._read_cells(hsv_frame, quad)
        if cells is None:
            return None
        return [(p, n) for p, n, _ in cells]

    def read_quad(self, hsv_frame, quad, expected_color=None):
        """Read a tracked perspective face, rejecting dark or mixed patches."""
        cells = self._read_cells(hsv_frame, quad)
        if expected_color is not None and self.read_quality["center"] not in (None, expected_color):
            self.read_quality["reason"] = f"Show the {expected_color} face; center looks {self.read_quality['center']}"
            self._reject(self.read_quality["reason"])
            return None
        return None if cells is None else [(p, n) for p, n, _ in cells]

    @staticmethod
    def order_quad(points, reference=None):
        """Clockwise corners, with a cyclic correspondence across camera roll."""
        points = np.asarray(points, np.float32).reshape(4, 2)
        center = points.mean(axis=0)
        points = points[np.argsort(np.arctan2(points[:, 1]-center[1], points[:, 0]-center[0]))]
        if reference is None:
            return np.roll(points, -int(np.argmin(points.sum(axis=1))), axis=0)
        return min((np.roll(points, n, axis=0) for n in range(4)),
                   key=lambda quad: float(np.linalg.norm(quad-reference, axis=1).mean()))

    def valid_quad(self, quad, shape):
        height, width = shape[:2]
        quad = np.asarray(quad, np.float32).reshape(4, 2)
        if not np.isfinite(quad).all() or not cv.isContourConvex(quad):
            return False
        area = cv.contourArea(quad)
        if area < (self.min_side_frac * min(width, height)) ** 2 or area > height*width*0.72:
            return False
        if (quad[:, 0] < 3).any() or (quad[:, 0] > width-4).any() or (quad[:, 1] < 3).any() or (quad[:, 1] > height-4).any():
            return False
        lengths = np.linalg.norm(np.roll(quad, -1, axis=0)-quad, axis=1)
        if lengths.min() < 28 or lengths.max()/lengths.min() > 3.0:
            return False
        for i in range(4):
            a, b = quad[i-1]-quad[i], quad[(i+1)%4]-quad[i]
            if abs(float(np.dot(a, b)/(np.linalg.norm(a)*np.linalg.norm(b)))) > 0.90:
                return False
        return True

    def grid_quality(self, gray, quad):
        """Require separators in both directions to distinguish a face from room objects."""
        target = np.array([[0, 0], [WARP, 0], [WARP, WARP], [0, WARP]], np.float32)
        warped = self.ops.warp(gray, cv.getPerspectiveTransform(
            np.asarray(quad, np.float32), target), (WARP, WARP))
        edges = self.ops.edges(warped, 30, 85)
        # A projected straight separator becomes one straight row or column.
        # Find a coherent line within the tolerance band. Taking any edge on
        # each successive row instead can combine unrelated shirt folds, hair,
        # or curved background texture into an imaginary divider.
        # Lines need not be black: stickerless bevels also leave gradients here.
        def line_support(band):
            band = band > 0
            # Small straight slopes tolerate an imperfect contour/homography.
            # The same slope must explain the entire divider; a wandering edge
            # cannot choose a different column on every row.
            aligned = band[_LINE_ROWS, _LINE_INDICES] & _LINE_INSIDE
            return float(aligned.mean(axis=1).max())

        vertical = [line_support(edges[12:-12, k-10:k+11]) for k in (100, 200)]
        horizontal = [line_support(edges[k-10:k+11, 12:-12].T) for k in (100, 200)]
        # A 3x3 face has TWO dividers in each direction. Requiring only the
        # stronger line lets a colored window/cross lock as a cube. Permit a
        # partly hidden divider, but never substitute the other divider for it.
        quality = min(float(np.mean(vertical)), float(np.mean(horizontal)),
                      min(vertical + horizontal) * 1.8)
        return quality, float(cv.Laplacian(warped, cv.CV_64F).var())

    def detect_quad(self, frame_bgr, hsv_frame, expected_color=None, reference=None):
        """Locate a genuine convex perspective face instead of a rotated rectangle."""
        self.rejection_counts.clear()
        self.last_rejection = "No cube face outline found; keep all nine stickers visible"
        self.fit_quality = {}
        gray, _ = self.ops.begin_frame(frame_bgr)
        mask = self._cube_mask(hsv_frame)
        edges = self.ops.edges(gray, 35, 100, np.ones((3, 3), np.uint8))
        candidates = []
        seen = set()
        refinement_count = 0
        sticker_seeds = []
        sticker_seen = set()

        def evaluate(quad):
            nonlocal refinement_count
            # Locate the grid before asking whether every sticker can be read.
            # A single reflection must not make a genuine face disappear.
            quality, sharpness = self.grid_quality(gray, quad)
            if quality < GRID_MIN_EVIDENCE:
                self._reject("No clear 3 by 3 grid; face angle may be too steep")
                return False
            outer_support = self.outer_support(edges, quad)
            boundary = float(np.mean(sorted(outer_support)[-3:]))
            if boundary < 0.85 and refinement_count < 4:
                refinement_count += 1
                refined = self.refine_quad(edges, quad)
                if refined is not None:
                    refined_quality, refined_sharpness = self.grid_quality(gray, refined)
                    refined_outer = self.outer_support(edges, refined)
                    refined_boundary = float(np.mean(sorted(refined_outer)[-3:]))
                    if (refined_quality >= max(GRID_MIN_EVIDENCE, quality*0.90) and
                            refined_boundary >= boundary+0.08):
                        quad = refined
                        quality, sharpness = refined_quality, refined_sharpness
                        outer_support, boundary = refined_outer, refined_boundary
            if sum(support >= 0.20 for support in outer_support) < 3 or boundary < 0.35:
                self._reject("Face outline does not match four visible cube sides")
                return False
            fit = self._surface_fit(hsv_frame, quad, quality, sharpness, outer_support)
            evidence = self.read_quality
            if not fit["accepted"]:
                self._reject(fit["reason"])
                return False
            cells = fit["cells"] if expected_color in (None, evidence["center"]) else None
            distance = (0.0 if reference is None else
                        float(np.linalg.norm(quad-reference, axis=1).mean()))
            score = (fit["confidence"] - distance/1000 + evidence["readable_count"]*0.005
                     + cv.contourArea(quad)/(frame_bgr.shape[0]*frame_bgr.shape[1])*0.05)
            candidates.append((score, cells, quad, dict(evidence), fit))
            return True

        for image in (mask, edges):
            contours, _ = cv.findContours(image, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
            for contour in sorted(contours, key=cv.contourArea, reverse=True)[:24]:
                hull = cv.convexHull(contour)
                rect = cv.minAreaRect(hull)
                short, long = sorted(rect[1])
                hull_area = cv.contourArea(hull)
                if (short >= 18 and long/short <= 2.8 and
                        250 <= hull_area <= gray.size*0.04 and hull_area/(short*long) >= 0.60):
                    sticker = self.order_quad(cv.boxPoints(rect), reference)
                    signature = tuple(np.rint(sticker.ravel()/4).astype(int))
                    if signature not in sticker_seen:
                        sticker_seen.add(signature)
                        sticker_seeds.append(sticker)
                perimeter = cv.arcLength(hull, True)
                for tolerance in (0.015, 0.025, 0.04):
                    polygon = cv.approxPolyDP(hull, tolerance*perimeter, True)
                    if len(polygon) != 4:
                        continue
                    quad = self.order_quad(polygon, reference)
                    if not self.valid_quad(quad, frame_bgr.shape):
                        continue
                    signature = tuple(np.rint(quad.ravel()/4).astype(int))
                    if signature in seen:
                        continue
                    seen.add(signature)
                    if evaluate(quad):
                        break
        if not candidates or (expected_color is not None and
                              not any(candidate[3]["center"] == expected_color for candidate in candidates)):
            # A rounded sticker can be isolated even when a hand joins the face
            # silhouette. Its location in the 3x3 is unknown, so try its nine
            # possible positions. Rank by finite side support before any warp;
            # only24 homographies then receive expensive grid/color checks.
            center = np.array([gray.shape[1]/2, gray.shape[0]/2]) if reference is None else np.mean(reference, axis=0)
            sticker_seeds.sort(key=lambda sticker: float(np.linalg.norm(sticker.mean(axis=0)-center)))
            proposals = []
            for sticker in sticker_seeds[:12]:
                origin = sticker.mean(axis=0)
                horizontal = ((sticker[1]-sticker[0])+(sticker[2]-sticker[3]))*0.5
                vertical = ((sticker[3]-sticker[0])+(sticker[2]-sticker[1]))*0.5
                for row in range(3):
                    for col in range(3):
                        proposed = origin+(sticker-origin)*3.1+(1-col)*horizontal+(1-row)*vertical
                        if not self.valid_quad(proposed, frame_bgr.shape):
                            continue
                        support = self.outer_support(edges, proposed)
                        boundary = float(np.mean(sorted(support)[-3:]))
                        if sum(part >= 0.20 for part in support) >= 3 and boundary >= 0.35:
                            proposals.append((boundary, proposed))
            proposals.sort(key=lambda proposal: proposal[0], reverse=True)
            for _, proposed in proposals[:24]:
                evaluate(proposed.astype(np.float32))
        if not candidates or (expected_color is not None and
                              not any(candidate[3]["center"] == expected_color for candidate in candidates)):
            # A hand can join the outer contour to the cube, while a bright wall
            # joins white stickers to the mask. Recover the face's four sides
            # from long grid edges instead of requiring a closed silhouette.
            # A different visible face/background must not block this search
            # for the center currently requested by the capture workflow.
            line_quads = self._line_quads(edges, frame_bgr.shape, reference)
            # The line search ranks repeated grid separators before large room
            # outlines. Keep expensive warps and color reads bounded.
            for quad in line_quads[:24]:
                evaluate(quad)
        if not candidates:
            return None, None
        # With two cube faces visible, prefer the requested center whenever a
        # plausible face with that center exists. Still outline a different
        # visible face when it is the only candidate so the user gets guidance.
        _, cells, quad, evidence, fit = max(candidates, key=lambda candidate:
            (expected_color is None or candidate[3]["center"] == expected_color, candidate[0]))
        self.read_quality = evidence
        self.fit_quality = fit
        if expected_color is not None and evidence["center"] not in (None, expected_color):
            self.last_rejection = f"Show the {expected_color} face; center looks {evidence['center']}"
            self.read_quality["reason"] = self.last_rejection
        else:
            self.last_rejection = "" if cells is not None else evidence["reason"]
        return cells, quad

    def _surface_fit(self, hsv, quad, grid_evidence, sharpness, boundary_support):
        measurements = self._sample_cells(hsv, quad)
        evidence = self.read_quality
        boundary = float(np.mean(sorted(boundary_support)[-3:]))
        confidence = float(0.45*min(1.0, grid_evidence)+0.30*boundary+0.25*evidence["uniform_count"]/9)
        accepted = (grid_evidence >= GRID_MIN_EVIDENCE and confidence >= 0.60 and
                    sum(support >= 0.20 for support in boundary_support) >= 3 and boundary >= 0.35 and
                    evidence["uniform_count"] >= 7 and evidence["uniform"][4])
        reason = (evidence["reason"] if accepted else
                  "Face patches do not fit one clear 3 by 3 cube surface")
        return {"confidence": confidence, "accepted": bool(accepted),
                "grid_evidence": float(grid_evidence), "boundary_support": boundary_support,
                "outer_support": boundary_support, "boundary_evidence": boundary,
                "uniform_count": evidence["uniform_count"], "sharpness": float(sharpness), "reason": reason,
                "cells": ([(position, name) for position, name, _ in measurements]
                          if evidence["readable_count"] == 9 else None)}

    def measure_fit(self, gray, hsv, quad, frame_edges=None):
        """Recheck a frozen frame's face fit separately from its color labels.

        Also samples colors exactly once. Callers can use ``cells`` only when
        accepted and all nine patches meet the 80% rule, then check the requested
        center before accumulating votes. Calibration data is never changed.
        """
        quality, sharpness = self.grid_quality(gray, quad)
        if frame_edges is None:
            frame_edges = self.ops.edges(gray, 35, 100, np.ones((3, 3), np.uint8))
        boundary = self.outer_support(frame_edges, quad)
        fit = self._surface_fit(hsv, quad, quality, sharpness, boundary)
        self.fit_quality = fit
        return fit

    @staticmethod
    def outer_support(edges, quad):
        """Finite edge evidence on the four actual sides, not infinite Hough lines."""
        height, width = edges.shape[:2]
        support = []
        for first, second in zip(quad, np.roll(quad, -1, axis=0)):
            delta = second-first
            normal = np.array([-delta[1], delta[0]])/max(1.0, float(np.linalg.norm(delta)))
            center = first+_SIDE_FRACTIONS*delta
            samples = center[:, None, :]+np.arange(-5, 6)[None, :, None]*normal
            xs = np.clip(np.rint(samples[:, :, 0]).astype(np.int32), 0, width-1)
            ys = np.clip(np.rint(samples[:, :, 1]).astype(np.int32), 0, height-1)
            support.append(float((edges[ys, xs]>0).any(axis=1).mean()))
        return support

    def refine_quad(self, edges, quad):
        """Fit coarse Hough boundaries to finite nearby sides on this same frame."""
        height, width = edges.shape[:2]
        equations = []
        for first, second in zip(quad, np.roll(quad, -1, axis=0)):
            delta = second-first
            length = max(1.0, float(np.linalg.norm(delta)))
            direction = delta/length
            center = (first+second)*0.5
            limit = min(40.0, length*0.15)
            offset = _REFINE_OFFSETS*limit
            vectors = np.c_[direction[0]*_REFINE_COS-direction[1]*_REFINE_SIN,
                            direction[0]*_REFINE_SIN+direction[1]*_REFINE_COS]
            normals = np.c_[-vectors[:, 1], vectors[:, 0]]
            centers = center+offset[:, None]*normals
            points = centers[:, None, :]+_REFINE_FRACTIONS*length*vectors[:, None, :]
            samples = points[:, :, None, :]+np.arange(-2, 3)[None, None, :, None]*normals[:, None, None, :]
            xs = np.rint(samples[:, :, :, 0]).astype(np.int32)
            ys = np.rint(samples[:, :, :, 1]).astype(np.int32)
            inside = (xs >= 0) & (xs < width) & (ys >= 0) & (ys < height)
            evidence = (edges[np.clip(ys, 0, height-1), np.clip(xs, 0, width-1)] > 0) & inside
            support = evidence.any(axis=2).mean(axis=1)
            score = support-np.abs(offset)*0.002-np.abs(np.rad2deg(_REFINE_ANGLES))*0.003
            best = int(np.argmax(score))
            normal = normals[best]
            equations.append(np.r_[normal, -float(np.dot(normal, centers[best]))])
        corners = []
        for previous, current in ((3, 0), (0, 1), (1, 2), (2, 3)):
            intersection = np.cross(equations[previous], equations[current])
            if abs(intersection[2]) < 1e-6:
                return None
            corners.append(intersection[:2]/intersection[2])
        refined = np.asarray(corners, np.float32)
        if (not self.valid_quad(refined, edges.shape) or
                np.linalg.norm(refined-quad, axis=1).max() > np.sqrt(cv.contourArea(quad))*0.22):
            return None
        return refined

    def _line_quads(self, edges, shape, reference):
        # A near-solid edge image has no useful face outline. Skip the costly
        # line search in noise, and search at half resolution in ordinary scenes.
        if np.count_nonzero(edges)/edges.size > 0.24:
            return []
        small = cv.resize(edges, None, fx=0.5, fy=0.5, interpolation=cv.INTER_AREA)
        small = ((small > 45).astype(np.uint8))*255
        lines = cv.HoughLinesP(small, 1, np.pi/180, threshold=25,
                              minLineLength=max(25, int(min(shape[:2])*0.045)), maxLineGap=11)
        if lines is None:
            return []
        lines = lines.astype(np.float32)*2
        records = []
        for x0, y0, x1, y1 in lines.reshape(-1, 4):
            a, b = np.array([x0, y0], np.float32), np.array([x1, y1], np.float32)
            delta = b-a
            length = float(np.linalg.norm(delta))
            angle = float(np.arctan2(delta[1], delta[0]) % np.pi)
            equation = np.cross(np.r_[a, 1.0], np.r_[b, 1.0])
            equation = equation/np.linalg.norm(equation[:2])
            records.append((length, angle, equation, (a+b)*0.5))
        records.sort(key=lambda record: record[0], reverse=True)

        def difference(a, b):
            return min(abs(a-b), np.pi-abs(a-b))

        # The longest scene line is often a table/window edge. Try a small
        # number of distinct directions rather than letting that line choose
        # the only possible cube orientation. Perspective faces need not have
        # perpendicular projected axes.
        seeds = []
        for record in records[:48]:
            if all(difference(record[1], direction) >= np.deg2rad(18) for direction in seeds):
                seeds.append(record[1])
                if len(seeds) == 6:
                    break
        groups = []
        for direction in seeds:
            group = []
            for record in records:
                if difference(direction, record[1]) > np.deg2rad(22):
                    continue
                if direction != min(seeds, key=lambda seed: difference(seed, record[1])):
                    continue
                if any(difference(record[1], prior[1]) < np.deg2rad(6)
                       and abs(float(np.dot(prior[2], np.r_[record[3], 1.0]))) < 11 for prior in group):
                    continue
                group.append(record)
                if len(group) >= 8:
                    break
            if len(group) >= 2:
                groups.append((direction, group))

        def boundary_pairs(direction, group):
            normal = np.array([-np.sin(direction), np.cos(direction)])
            positions = [float(np.dot(record[3], normal)) for record in group]
            pairs = []
            for i, first in enumerate(group):
                for j in range(i + 1, len(group)):
                    second = group[j]
                    lo, hi = sorted((positions[i], positions[j]))
                    span = hi-lo
                    if span < 28:
                        continue
                    inside = [(position-lo)/span for k, position in enumerate(positions)
                              if k not in (i, j) and lo < position < hi]
                    # Repeated one-third separators prioritize a real face's
                    # boundaries over unrelated room lines. Final pixel-grid
                    # verification still decides whether a candidate is real.
                    support = sum(any(abs(position-third) < 0.17 for position in inside)
                                  for third in (1/3, 2/3))
                    score = support*3 + min(len(inside), 2)
                    pairs.append((score, first, second))
            return sorted(pairs, key=lambda pair: pair[0], reverse=True)[:6]

        directions = []
        for i, (primary, first_group) in enumerate(groups):
            for secondary, second_group in groups[i+1:]:
                if difference(primary, secondary) < np.deg2rad(28):
                    continue
                first_pairs = boundary_pairs(primary, first_group)
                second_pairs = boundary_pairs(secondary, second_group)
                if first_pairs and second_pairs:
                    directions.append((first_pairs[0][0]+second_pairs[0][0], first_pairs, second_pairs))
        directions.sort(key=lambda direction: direction[0], reverse=True)
        result, seen = [], set()
        for _, first_pairs, second_pairs in directions[:4]:
            for first_score, first, second in first_pairs:
                for second_score, third, fourth in second_pairs:
                    points = []
                    for a, b in ((first, third), (first, fourth), (second, third), (second, fourth)):
                        a0, a1, a2 = a[2]
                        b0, b1, b2 = b[2]
                        determinant = a0*b1-a1*b0
                        if abs(determinant) < 1e-6:
                            break
                        points.append(((a1*b2-a2*b1)/determinant,
                                       (a2*b0-a0*b2)/determinant))
                    if len(points) != 4:
                        continue
                    quad = self.order_quad(points, reference)
                    if self.valid_quad(quad, shape):
                        signature = tuple(np.rint(quad.ravel()/4).astype(int))
                        if signature in seen:
                            continue
                        seen.add(signature)
                        # Nearby correspondence wins when already following
                        # a face; initial search favors actual grid support.
                        distance = (0.0 if reference is None else
                                    float(np.linalg.norm(quad-reference, axis=1).mean()))
                        score = first_score+second_score-distance/50
                        result.append((score, quad))
        result.sort(key=lambda candidate: candidate[0], reverse=True)
        return [quad for _, quad in result[:24]]

    def detect(self, frame_bgr, hsv_frame):
        """Return (cells, quad) or (None, None)."""
        fh, fw = frame_bgr.shape[:2]
        mask = self._cube_mask(hsv_frame)
        contours, _ = cv.findContours(mask, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        contours = sorted(contours, key=cv.contourArea, reverse=True)[:5]
        for cnt in contours:
            area = cv.contourArea(cnt)
            if area < (self.min_side_frac * min(fw, fh)) ** 2:
                continue
            rect = cv.minAreaRect(cnt)
            w, h = rect[1]
            if min(w, h) < 1:
                continue
            if max(w, h) / min(w, h) > self.max_ratio:
                continue
            if area / (w * h) < self.min_fill:
                continue
            quad = self._order(cv.boxPoints(rect))
            cells = self._read_cells(hsv_frame, quad)
            if cells is not None:
                return [(p, n) for p, n, _ in cells], quad
        return None, None
