/** Pure state and cube-coordinate helpers used by the offline solution viewer. */
export const SOLVED_STATE = [..."URFDLB"].map((face) => face.repeat(9)).join("");
const MOVE = /^[URFDLB](?:2|')?$/;

export function parseMoves(notation) {
  if (typeof notation !== "string" || notation.length > 20000) {
    throw new Error("Solution notation is unavailable.");
  }
  const moves = notation.trim() ? notation.trim().split(/\s+/) : [];
  if (moves.length > 2048 || moves.some((move) => !MOVE.test(move))) {
    throw new Error("Solution contains unsupported moves.");
  }
  return moves;
}

export function moveDescription(move) {
  const face = { U: "top", R: "right", F: "front", D: "bottom", L: "left", B: "back" }[move?.[0]];
  if (!face) return "No move selected.";
  return `Turn the ${face} face ${move.endsWith("2") ? "180°" : move.endsWith("'") ? "90° counterclockwise" : "90° clockwise"}, looking directly at that face.`;
}

/** Serialize cubing.js's Reid piece order into scanner row-major URFDLB. */
export function patternToState(pattern) {
  const data = pattern.patternData ?? pattern;
  const faces = [...SOLVED_STATE];
  const groups = [
    ["EDGES", ["UF", "UR", "UB", "UL", "DF", "DR", "DB", "DL", "FR", "FL", "BR", "BL"],
      [[7, 19], [5, 10], [1, 46], [3, 37], [28, 25], [32, 16], [34, 52], [30, 43], [23, 12], [21, 41], [48, 14], [50, 39]]],
    ["CORNERS", ["UFR", "URB", "UBL", "ULF", "DRF", "DFL", "DLB", "DBR"],
      [[8, 20, 9], [2, 11, 45], [0, 47, 36], [6, 38, 18], [29, 15, 26], [27, 24, 44], [33, 42, 53], [35, 51, 17]]],
  ];
  for (const [orbit, colors, positions] of groups) {
    const value = data[orbit];
    if (!value || value.pieces.length !== positions.length || value.orientation.length !== positions.length) {
      throw new Error("Unexpected 3×3 cube model.");
    }
    positions.forEach((slots, index) => {
      const stickerColors = colors[value.pieces[index]];
      const orientation = value.orientation[index];
      if (!stickerColors || !Number.isInteger(orientation) || orientation < 0 || orientation >= slots.length) {
        throw new Error("Invalid cube piece orientation.");
      }
      slots.forEach((slot, facelet) => {
        faces[slot] = stickerColors[(facelet + orientation) % slots.length];
      });
    });
  }
  const centers = data.CENTERS;
  const centerFaces = "ULFRBD";
  if (!centers || centers.pieces.length !== 6) throw new Error("Unexpected cube centers.");
  [...centerFaces].forEach((face, index) => {
    faces["URFDLB".indexOf(face) * 9 + 4] = centerFaces[centers.pieces[index]];
  });
  return faces.join("");
}

/** No click queue: only one in-flight operation is allowed per cube. */
export class MoveStepper {
  constructor(moves = []) {
    this.moves = [];
    this.position = 0;
    this.busy = false;
    this._generation = 0;
    this._active = null;
    this.setMoves(moves);
  }

  get total() { return this.moves.length; }
  get currentMove() { return this.position > 0 ? this.moves[this.position - 1] : null; }
  get nextMove() { return this.moves[this.position] ?? null; }
  get activePlan() { return this._active; }

  setMoves(moves) {
    if (!Array.isArray(moves) || moves.some((move) => !MOVE.test(move))) throw new Error("Invalid move list.");
    if (moves.length === this.moves.length && moves.every((move, i) => move === this.moves[i])) return false;
    this.cancel();
    this.moves = [...moves];
    this.position = 0;
    return true;
  }

  allowed(action) {
    if (this.busy) return false;
    if (action === "next") return this.position < this.total;
    if (action === "previous" || action === "replay" || action === "reset") return this.position > 0;
    return false;
  }

  begin(action) {
    if (!this.allowed(action)) return null;
    const fromIndex = action === "replay" ? this.position - 1 : this.position;
    const toIndex = action === "next" ? this.position + 1 : action === "previous" ? this.position - 1 : action === "reset" ? 0 : this.position;
    const moveIndex = action === "next" ? this.position : this.position - 1;
    const plan = { action, fromIndex, toIndex, moveIndex, token: ++this._generation };
    this.busy = true;
    this._active = plan;
    return plan;
  }

  isCurrent(plan) { return this.busy && this._active === plan && plan.token === this._generation; }

  complete(plan) {
    if (!this.isCurrent(plan)) return false;
    this.position = plan.toIndex;
    this.busy = false;
    this._active = null;
    return true;
  }

  cancel() {
    ++this._generation;
    this.busy = false;
    this._active = null;
  }
}
