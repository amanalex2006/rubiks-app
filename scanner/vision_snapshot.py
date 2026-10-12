"""Save an explicitly requested, matching raw/overlay diagnostic frame pair.

The detector worker calls this helper only in debug mode. Without the fixed
request marker it performs no image encoding and creates no files.
"""

from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import tempfile

import cv2 as cv
import numpy as np


REQUEST_NAME = ".camera_snapshot.request"
DIAGNOSTICS_NAME = ".diagnostics"
FILE_NAMES = {"raw": "camera-raw.png", "overlay": "camera-overlay.png",
              "metadata": "camera-snapshot.json"}


def _json_value(value):
    if isinstance(value, np.ndarray):
        return value.tolist()
    if isinstance(value, np.generic):
        return value.item()
    raise TypeError(f"Unsupported snapshot metadata type: {type(value).__name__}")


def _atomic_write(path, payload):
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=path.parent, prefix=f".{path.name}.",
                                         suffix=".tmp", delete=False) as stream:
            temporary = Path(stream.name)
            stream.write(payload)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


def _read_request(marker):
    with marker.open("r", encoding="utf-8") as stream:
        contents = stream.read(257)
    request_id = contents.strip()
    if len(contents) > 256 or not request_id or "\n" in request_id or "\r" in request_id:
        raise ValueError("Snapshot request must contain one identifier of at most 256 characters")
    return contents, request_id


def capture_requested_snapshot(app_root, raw_bgr, processed_bgr, metadata):
    """Save one requested frame pair; return ``None`` when no marker exists.

    The caller must supply raw and processed images from the same detector
    invocation. Both are encoded losslessly in their existing pixel coordinates
    and never modified. Matching uint8 BGR dimensions are required. Existing
    tracker metadata (including frame identity, quad, reason and status) is
    retained; helper-owned fields identify the request and output files.

    On success return ``{"ok": True, "status": "saved", ...}``. Any failure
    returns ``{"ok": False, "status": "error", "error": ...}`` instead of
    interrupting camera processing, and the request remains available to retry.
    Each output is atomically replaced, with JSON written last. The marker is
    removed only after all three writes succeed. A newer request is preserved.
    No request contents or metadata can choose output paths.
    """
    request_id = None
    try:
        root = Path(app_root).resolve()
        marker = root / REQUEST_NAME
        if not marker.exists():
            return None
        if marker.resolve().parent != root:
            raise ValueError("Snapshot request must stay within the application directory")
        original_request, request_id = _read_request(marker)
        if not isinstance(raw_bgr, np.ndarray) or not isinstance(processed_bgr, np.ndarray):
            raise ValueError("Snapshot images must be numpy BGR arrays")
        if (raw_bgr.dtype != np.uint8 or processed_bgr.dtype != np.uint8
                or raw_bgr.ndim != 3 or raw_bgr.shape[2] != 3
                or raw_bgr.shape != processed_bgr.shape or raw_bgr.size == 0):
            raise ValueError("Snapshot images must have matching nonempty uint8 BGR dimensions")

        payloads = {}
        for key, frame in (("raw", raw_bgr), ("overlay", processed_bgr)):
            encoded, pixels = cv.imencode(".png", frame)
            if not encoded:
                raise RuntimeError(f"Could not encode the {key} snapshot")
            payloads[key] = pixels.tobytes()

        saved_at = datetime.now(timezone.utc).isoformat()
        report = dict(metadata)
        report.setdefault("pid", os.getpid())
        report.setdefault("time", saved_at)
        report.update(snapshot_version=1, request_id=request_id, saved_at_utc=saved_at,
                      files={key: f"{DIAGNOSTICS_NAME}/{name}"
                             for key, name in FILE_NAMES.items()},
                      image_shape=list(raw_bgr.shape),
                      raw_png_sha256=hashlib.sha256(payloads["raw"]).hexdigest(),
                      overlay_png_sha256=hashlib.sha256(payloads["overlay"]).hexdigest())
        payloads["metadata"] = (json.dumps(report, indent=2, ensure_ascii=False,
                                           allow_nan=False, default=_json_value) + "\n").encode("utf-8")

        directory = root / DIAGNOSTICS_NAME
        if directory.resolve().parent != root:
            raise ValueError("Snapshot outputs must stay within the application directory")
        directory.mkdir(exist_ok=True)
        paths = {key: directory / name for key, name in FILE_NAMES.items()}
        for key in ("raw", "overlay", "metadata"):
            _atomic_write(paths[key], payloads[key])

        try:
            current_request, _ = _read_request(marker)
        except FileNotFoundError:
            current_request = None
        if current_request == original_request:
            marker.unlink(missing_ok=True)
        return {"ok": True, "status": "saved", "request_id": request_id,
                "files": {key: str(path) for key, path in paths.items()}}
    except Exception as error:
        return {"ok": False, "status": "error", "request_id": request_id,
                "error": f"{type(error).__name__}: {error}"}
