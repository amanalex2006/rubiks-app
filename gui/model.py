"""UI state and color conventions, independent of Tk and the solvers."""

from collections import Counter

FACES = "URFDLB"
COLORS = {"U": "b", "R": "y", "F": "r", "D": "g", "L": "w", "B": "o"}
LETTERS = {value: key for key, value in COLORS.items()}
COLOR_NAMES = {"r": "Red", "y": "Yellow", "o": "Orange", "w": "White", "b": "Blue", "g": "Green"}
STICKERS = {"r": "#f0646b", "y": "#f6d75d", "o": "#f69a50", "w": "#edf2f8", "b": "#639df4", "g": "#54cfa0"}
SCAN = [
    (2, "F", "Red", "Start with the red face", "Red toward you. Blue on top, white on the left."),
    (3, "R", "Yellow", "Turn left to yellow", "Keep blue on top. Red should be on your left."),
    (4, "B", "Orange", "Turn left to orange", "Keep blue on top. Yellow should be on your left."),
    (1, "L", "White", "Turn left to white", "Keep blue on top. Orange should be on your left."),
    (0, "U", "Blue", "Return to red, then tilt down", "Blue toward you. Orange on top and red below."),
    (5, "D", "Green", "Tilt down 180 degrees", "Green toward you. Red on top, white on the left."),
]
NET = {"U": (1, 0), "L": (0, 1), "F": (1, 1), "R": (2, 1), "B": (3, 1), "D": (1, 2)}
SAMPLE = "UUUUUUBDDLBBLRRDRRDFFDFFRRRFFFDDBDDBFFRLLRLLULLLUBBUBB"


class ManualCube:
    def __init__(self):
        self.clear()

    def clear(self):
        self.faces = {face: [COLORS[face] if i == 4 else "_" for i in range(9)] for face in FACES}

    def solved(self):
        self.faces = {face: [COLORS[face]] * 9 for face in FACES}

    def load_state(self, state):
        if (len(state) != 54 or set(state) - set(FACES)
                or any(state[i * 9 + 4] != face for i, face in enumerate(FACES))):
            raise ValueError("Invalid sample state")
        self.faces = {face: [COLORS[value] for value in state[i * 9:i * 9 + 9]]
                      for i, face in enumerate(FACES)}

    def paint(self, face, index, color):
        if face not in self.faces or not 0 <= index < 9 or color not in STICKERS:
            raise ValueError("Unknown sticker or color")
        if index == 4:
            return False
        changed = self.faces[face][index] != color
        self.faces[face][index] = color
        return changed

    @property
    def counts(self):
        return Counter(color for face in self.faces.values() for color in face if color != "_")

    @property
    def filled(self):
        return sum(self.counts.values())

    @property
    def ready(self):
        return self.filled == 54 and all(self.counts[color] == 9 for color in STICKERS)

    def state(self):
        return "".join(LETTERS.get(color, "X") for face in FACES for color in self.faces[face])


def scan_position(index):
    return next((i for i, item in enumerate(SCAN) if item[0] == index), 6)


def net_cells(width, height):
    """Shared layout for painting, hit testing, and the compact live preview."""
    gap = 8
    size = max(6, min((width - 24 - gap * 3) // 12, (height - 24 - gap * 2) // 9))
    face_size = size * 3
    x0 = (width - face_size * 4 - gap * 3) / 2
    y0 = (height - face_size * 3 - gap * 2) / 2
    return [(face, index, (x0 + gx * (face_size + gap) + (index % 3) * size + 2,
                           y0 + gy * (face_size + gap) + (index // 3) * size + 2,
                           x0 + gx * (face_size + gap) + (index % 3 + 1) * size - 2,
                           y0 + gy * (face_size + gap) + (index // 3 + 1) * size - 2))
            for face, (gx, gy) in NET.items() for index in range(9)]
