import copy
import json
from collections import Counter


FACE_ORDER = ["U", "R", "F", "D", "L", "B"]
FACE_SIZE = 9
STATE_SIZE = 54
SOLVED_STATE = "".join(face * FACE_SIZE for face in FACE_ORDER)


def _flatten_faces(faces):
    return "".join("".join(faces[face]) for face in FACE_ORDER)


def _state_to_faces(state):
    return {
        face: list(state[index * FACE_SIZE:(index + 1) * FACE_SIZE])
        for index, face in enumerate(FACE_ORDER)
    }


def _rotate_face(values, turns):
    rotated = list(values)
    for _ in range(turns % 4):
        rotated = [
            rotated[6], rotated[3], rotated[0],
            rotated[7], rotated[4], rotated[1],
            rotated[8], rotated[5], rotated[2],
        ]
    return rotated


def solve_state(state):
    if state == SOLVED_STATE:
        return ""
    import kociemba

    return kociemba.solve(state)


def validate_state(state):
    problems = []
    if len(state) != STATE_SIZE:
        problems.append({
            "type": "invalid_length",
            "message": "Cube state must contain exactly 54 stickers.",
        })
        return False, problems, None

    invalid_letters = sorted(set(state) - set(FACE_ORDER))
    if invalid_letters:
        problems.append({
            "type": "invalid_symbols",
            "message": "Cube state contains symbols outside U/R/F/D/L/B.",
            "symbols": invalid_letters,
        })

    counts = Counter(state)
    bad_counts = {
        face: counts.get(face, 0)
        for face in FACE_ORDER
        if counts.get(face, 0) != FACE_SIZE
    }
    if bad_counts:
        problems.append({
            "type": "invalid_counts",
            "message": "Each face letter must occur exactly 9 times.",
            "counts": dict(counts),
        })

    if problems:
        return False, problems, None

    try:
        notation = solve_state(state)
    except ModuleNotFoundError as exc:
        problems.append({
            "type": "solver_unavailable",
            "message": "The kociemba solver is not installed, so physical legality could not be checked.",
            "detail": str(exc),
        })
        return False, problems, None
    except ValueError as exc:
        problems.append({
            "type": "illegal_cube",
            "message": "Cube state is not physically solvable.",
            "detail": str(exc),
        })
        return False, problems, None

    return True, [], notation


def color_centers_to_mapping(raw_faces):
    mapping = {}
    problems = []
    for face in FACE_ORDER:
        stickers = raw_faces.get(face)
        if not stickers or len(stickers) != FACE_SIZE:
            problems.append({
                "type": "missing_face",
                "message": f"Face {face} does not contain exactly 9 stickers.",
                "face": face,
            })
            continue
        center = stickers[4]
        if center in mapping and mapping[center] != face:
            problems.append({
                "type": "duplicate_center_color",
                "message": f"Center color {center} appears on multiple faces.",
                "color": center,
            })
        mapping[center] = face

    missing = sorted(set(FACE_ORDER) - set(mapping.values()))
    if missing:
        problems.append({
            "type": "missing_center_mapping",
            "message": "Not every face letter has a center-color mapping.",
            "missing_faces": missing,
        })
    return mapping, problems


def convert_raw_faces(raw_faces, center_mapping):
    faces = {}
    problems = []
    for face in FACE_ORDER:
        converted = []
        for index, color in enumerate(raw_faces.get(face, [])):
            notation = center_mapping.get(color)
            if notation is None:
                problems.append({
                    "type": "unknown_color",
                    "message": f"Sticker color {color} has no center mapping.",
                    "face": face,
                    "index": index,
                    "color": color,
                })
                notation = "X"
            converted.append(notation)
        faces[face] = converted
    return faces, problems


def suspicious_from_counts(state):
    counts = Counter(state)
    over = [face for face in FACE_ORDER if counts.get(face, 0) > FACE_SIZE]
    under = [face for face in FACE_ORDER if counts.get(face, 0) < FACE_SIZE]
    return over, under


def find_correction_candidates(raw_faces, faces, ambiguous=None, max_candidates=25):
    ambiguous = ambiguous or {}
    candidates = []

    def add_candidate(kind, corrected_faces, detail):
        state = _flatten_faces(corrected_faces)
        valid, _, notation = validate_state(state)
        if valid:
            candidates.append({
                "type": kind,
                "faces": corrected_faces,
                "state": state,
                "notation": notation,
                "detail": detail,
            })

    for face in FACE_ORDER:
        for turns in (1, 2, 3):
            rotated = copy.deepcopy(faces)
            rotated[face] = _rotate_face(rotated[face], turns)
            add_candidate("face_rotation", rotated, {
                "face": face,
                "turns_clockwise": turns,
            })
            if len(candidates) >= max_candidates:
                return candidates

    state = _flatten_faces(faces)
    over, under = suspicious_from_counts(state)
    if over and under:
        for face in FACE_ORDER:
            for index, value in enumerate(faces[face]):
                if value not in over:
                    continue
                for replacement in under:
                    corrected = copy.deepcopy(faces)
                    corrected[face][index] = replacement
                    add_candidate("single_sticker_substitution", corrected, {
                        "face": face,
                        "index": index,
                        "from": value,
                        "to": replacement,
                    })
                    if len(candidates) >= max_candidates:
                        return candidates

    # Swaps are useful when counts are already balanced but cubies are illegal.
    positions = [
        (face, index)
        for face in FACE_ORDER
        for index in range(FACE_SIZE)
        if index != 4
    ]
    for pos_a_index, (face_a, index_a) in enumerate(positions):
        for face_b, index_b in positions[pos_a_index + 1:]:
            if faces[face_a][index_a] == faces[face_b][index_b]:
                continue
            corrected = copy.deepcopy(faces)
            corrected[face_a][index_a], corrected[face_b][index_b] = (
                corrected[face_b][index_b],
                corrected[face_a][index_a],
            )
            add_candidate("two_sticker_swap", corrected, {
                "a": {"face": face_a, "index": index_a},
                "b": {"face": face_b, "index": index_b},
            })
            if len(candidates) >= max_candidates:
                return candidates

    for key, alternatives in ambiguous.items():
        face, index_text = key.split(":")
        index = int(index_text)
        for replacement in alternatives:
            if replacement == faces[face][index]:
                continue
            corrected = copy.deepcopy(faces)
            corrected[face][index] = replacement
            add_candidate("ambiguous_color_substitution", corrected, {
                "face": face,
                "index": index,
                "to": replacement,
            })
            if len(candidates) >= max_candidates:
                return candidates

    return candidates


def build_cube_report(raw_faces, ambiguous=None):
    center_mapping, problems = color_centers_to_mapping(raw_faces)
    faces, conversion_problems = convert_raw_faces(raw_faces, center_mapping)
    problems.extend(conversion_problems)

    state = _flatten_faces(faces)
    valid, validation_problems, notation = validate_state(state)
    problems.extend(validation_problems)

    corrections = []
    candidate_summaries = []
    final_faces = copy.deepcopy(faces)
    final_state = state
    final_notation = notation
    final_valid = valid

    if not valid and not conversion_problems:
        candidates = find_correction_candidates(raw_faces, faces, ambiguous)
        candidate_summaries = [
            {"type": candidate["type"], "detail": candidate["detail"]}
            for candidate in candidates
        ]
        unique_states = {candidate["state"]: candidate for candidate in candidates}
        if len(unique_states) == 1:
            candidate = next(iter(unique_states.values()))
            final_faces = candidate["faces"]
            final_state = candidate["state"]
            final_notation = candidate["notation"]
            final_valid = True
            corrections.append({
                "type": candidate["type"],
                "detail": candidate["detail"],
                "message": "Applied the only legal correction candidate.",
            })
            problems = [
                problem for problem in problems
                if problem["type"] not in {"illegal_cube", "invalid_counts"}
            ]
        elif len(unique_states) > 1:
            problems.append({
                "type": "ambiguous_correction",
                "message": "Multiple legal correction candidates were found.",
                "candidate_count": len(unique_states),
            })

    return {
        "valid": final_valid,
        "state": final_state,
        "faces": final_faces,
        "problems": problems,
        "corrections": corrections,
        "notation": final_notation,
        "order": FACE_ORDER,
        "raw_faces": raw_faces,
        "raw_state": state,
        "center_color_mapping": center_mapping,
        "correction_candidates": candidate_summaries,
        "schema": {
            "state": "54 characters in U,R,F,D,L,B order, with faces ordered as order.",
            "faces": "Each face is indexed row-major: 0 1 2 / 3 4 5 / 6 7 8.",
        },
    }


def write_cube_report(path, report):
    with open(path, "w", encoding="utf-8") as output_file:
        json.dump(report, output_file, indent=4)
        output_file.write("\n")
