"""Result labels and wrapping kept separate from camera detection."""

import textwrap
import cv2 as cv


def result_lines(kociemba_notation, inverse_notation, java_result, width):
    columns = max(35, int((width - 24) / 9))
    status = java_result["status"]
    if status == "solved":
        java_text = java_result["notation"] or "Already solved (0 moves)"
    elif status == "pending":
        java_text = "Solving..."
    else:
        detail = (java_result.get("error") or {}).get("message", "")
        java_text = status.replace("_", " ") + (": " + detail[:200] if detail else "")
    lines = []
    for label, text in (
        ("Kociemba", kociemba_notation or "Already solved (0 moves)"),
        ("Kociemba inverse", inverse_notation or "0 moves"),
        ("Java BiBFS", java_text),
    ):
        lines.extend(textwrap.wrap(f"{label}: {text}", columns, subsequent_indent="  ") or [label + ":"])
    lines.append("q: restart   x: quit   c: toggle center mode")
    return lines


def draw_solution_panel(frame, notation, inverse_notation, java_result):
    lines = result_lines(notation, inverse_notation, java_result, frame.shape[1])
    panel = cv.copyMakeBorder(frame, 0, 24 * len(lines) + 16, 0, 0,
                              cv.BORDER_CONSTANT, value=(254, 217, 255))
    for index, text in enumerate(lines):
        cv.putText(panel, text, (12, frame.shape[0] + 24 * (index + 1)),
                   cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv.LINE_AA)
    return panel
