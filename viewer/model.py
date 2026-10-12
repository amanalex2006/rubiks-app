"""Construct a small viewer payload from independently replayed solver results."""
from collections import Counter
import math
import re


FACE_ORDER = "URFDLB"
SOLVED = "".join(face * 9 for face in FACE_ORDER)
MOVE = re.compile(r"[URFDLB](?:2|')?\Z")
SCHEMA = "cube-studio-viewer-v1"
FACE_COLORS = {"U": "#639df4", "R": "#f6d75d", "F": "#f0646b",
               "D": "#54cfa0", "L": "#edf2f8", "B": "#f69a50"}


def notation_moves(notation):
    if not isinstance(notation, str) or len(notation) > 20000:
        raise ValueError("Solution notation must be a move string")
    moves = notation.split()
    if len(moves) > 2048 or any(MOVE.fullmatch(move) is None for move in moves):
        raise ValueError("Solution contains unsupported move notation")
    return moves


def inverse_notation(notation):
    moves = notation_moves(notation)
    return " ".join(move if move.endswith("2") else move[:-1] if move.endswith("'")
                    else move + "'" for move in reversed(moves))


def _state_cube(state):
    if not isinstance(state, str) or len(state) != 54 or set(state) != set(FACE_ORDER):
        raise ValueError("Expected 54 stickers in U/R/F/D/L/B order")
    if Counter(state) != Counter(SOLVED) or any(state[index*9+4] != face
                                               for index, face in enumerate(FACE_ORDER)):
        raise ValueError("Cube color counts or center positions are invalid")
    from kociemba.pykociemba.facecube import FaceCube
    cube = FaceCube(state).toCubieCube()
    if cube.verify() != 0 or cube.toFaceCube().to_String() != state:
        raise ValueError("Cube state is not physically solvable")
    return cube


def replay_notation(state, notation):
    """Use the existing Kociemba cube model without invoking either search."""
    moves = notation_moves(notation)
    cube = _state_cube(state)
    from kociemba.pykociemba.cubiecube import moveCube
    for move in moves:
        turns = 2 if move.endswith("2") else 3 if move.endswith("'") else 1
        for _ in range(turns):
            cube.multiply(moveCube[FACE_ORDER.index(move[0])])
    return cube.toFaceCube().to_String()


def _error(code, message):
    return {"code": code, "message": str(message)[:2000]}


def _solver(label, status, notation, state, valid, error=None, **stats):
    result = {"label": label, "status": status, "notation": None, "moves": [],
              "verified": False, "error": error}
    for key in ("elapsed_ms", "searched_moves", "visited_moves"):
        value = stats.get(key)
        available = isinstance(value, (int, float)) and not isinstance(value, bool)
        if available:
            try:
                available = math.isfinite(value) and value >= 0
            except OverflowError:
                available = False
        result[key] = value if available else None
    if status != "solved":
        return result
    if not valid:
        result.update(status="invalid_state", error=_error("invalid_state", "Cube state is invalid"))
        return result
    try:
        moves = notation_moves(notation)
        if replay_notation(state, notation) != SOLVED:
            raise ValueError("Returned moves do not solve the exact reported cube state")
    except (ValueError, ImportError, AssertionError, IndexError) as exc:
        result.update(status="invalid_solution", error=_error("invalid_solution", exc))
        return result
    result.update(notation=" ".join(moves), moves=moves, verified=True, error=None)
    return result


def _report_error(error):
    if not isinstance(error, dict):
        return None
    return _error(str(error.get("code", "solver_error"))[:64], error.get("message", "Solver failed"))


def build_payload(report, theme="dark"):
    """Ignore unrelated report fields, including any images or local paths."""
    report = report if isinstance(report, dict) else {}
    state = report.get("state")
    valid = report.get("valid") is True
    problem = None
    try:
        if not valid:
            raise ValueError("The report does not contain a validated cube state")
        _state_cube(state)
    except (ValueError, ImportError, AssertionError, IndexError) as exc:
        valid = False
        problem = _error("invalid_state", exc)
    kociemba = _solver("Kociemba", "solved" if valid else "invalid_state",
                       report.get("notation"), state, valid, error=problem)
    java_report = report.get("java_solver")
    java_report = java_report if isinstance(java_report, dict) else {}
    java_status = java_report.get("status", "not_run")
    java_status = java_status[:64] if isinstance(java_status, str) else "not_run"
    java = _solver("Java BiBFS", java_status, java_report.get("notation"), state, valid,
                   error=_report_error(java_report.get("error")),
                   **{key: java_report.get(key) for key in
                      ("elapsed_ms", "searched_moves", "visited_moves")})
    solvers = {"kociemba": kociemba, "java": java}
    setup_source = next((key for key, solver in solvers.items() if solver["verified"]), None)
    setup_alg = inverse_notation(solvers[setup_source]["notation"]) if setup_source else None
    return {"schema": SCHEMA, "state": state if valid else None, "valid": valid,
            "theme": theme if theme in ("dark", "light") else "dark",
            "setup_alg": setup_alg, "setup_source": setup_source,
            "face_colors": dict(FACE_COLORS), "solvers": solvers, "error": problem}
