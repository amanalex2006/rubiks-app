"""Validate explicit input without applying scanner corrections."""

from scanner.cube_state import FACE_ORDER, validate_state


def build_state_report(state):
    # Manual input is validated as supplied; never silently reorient or correct it.
    valid, problems, notation = validate_state(state)
    faces = {face: list(state[i * 9:(i + 1) * 9]) for i, face in enumerate(FACE_ORDER)}
    return {
        "valid": valid, "state": state, "faces": faces, "problems": problems,
        "corrections": [], "notation": notation, "order": FACE_ORDER,
        "raw_faces": faces, "raw_state": state,
        "center_color_mapping": {face: face for face in FACE_ORDER},
        "correction_candidates": [],
        "schema": {
            "state": "54 characters in U,R,F,D,L,B order, with faces ordered as order.",
            "faces": "Each face is indexed row-major: 0 1 2 / 3 4 5 / 6 7 8.",
        },
    }


