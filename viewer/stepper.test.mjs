import test from "node:test";
import assert from "node:assert/strict";
import { MoveStepper, SOLVED_STATE, moveDescription, parseMoves, patternToState } from "./stepper.js";
import { cube3x3x3 } from "./vendor/cubing.js";

test("previous, next and reset respect bounds", () => {
  const stepper = new MoveStepper(["R", "U'", "F2"]);
  assert.equal(stepper.begin("previous"), null);
  assert.equal(stepper.begin("replay"), null);
  assert.equal(stepper.begin("reset"), null);
  for (let index = 0; index < 3; index++) {
    const plan = stepper.begin("next");
    assert.equal(plan.moveIndex, index);
    assert.equal(stepper.position, index);
    assert.equal(stepper.complete(plan), true);
    assert.equal(stepper.position, index + 1);
  }
  assert.equal(stepper.begin("next"), null);
  const previous = stepper.begin("previous");
  assert.equal(previous.fromIndex, 3);
  assert.equal(previous.toIndex, 2);
  stepper.complete(previous);
  const reset = stepper.begin("reset");
  assert.equal(reset.toIndex, 0);
  stepper.complete(reset);
  assert.equal(stepper.position, 0);
});

test("replay rewinds and reanimates current move without advancing", () => {
  const stepper = new MoveStepper(["R", "U"]);
  stepper.complete(stepper.begin("next"));
  const replay = stepper.begin("replay");
  assert.deepEqual([replay.fromIndex, replay.toIndex, replay.moveIndex], [0, 1, 0]);
  stepper.complete(replay);
  assert.equal(stepper.position, 1);
  assert.equal(stepper.currentMove, "R");
  assert.equal(stepper.nextMove, "U");
});

test("busy state rejects all queued clicks", () => {
  const stepper = new MoveStepper(["R", "U"]);
  const active = stepper.begin("next");
  assert.equal(stepper.activePlan, active);
  for (const action of ["next", "previous", "replay", "reset"]) {
    assert.equal(stepper.allowed(action), false);
    assert.equal(stepper.begin(action), null);
  }
  stepper.complete(active);
  assert.equal(stepper.position, 1);
  assert.equal(stepper.activePlan, null);
});

test("stale completion after replacement or cancellation is ignored", () => {
  const stepper = new MoveStepper(["R"]);
  const stale = stepper.begin("next");
  stepper.setMoves(["U", "F"]);
  assert.equal(stepper.complete(stale), false);
  const active = stepper.begin("next");
  stepper.cancel();
  assert.equal(stepper.complete(active), false);
  assert.equal(stepper.position, 0);
  assert.equal(stepper.busy, false);
});

test("unchanged polling payload preserves progress and active animation", () => {
  const stepper = new MoveStepper(["R", "U"]);
  stepper.complete(stepper.begin("next"));
  const active = stepper.begin("next");
  assert.equal(stepper.setMoves(["R", "U"]), false);
  assert.equal(stepper.isCurrent(active), true);
  stepper.complete(active);
  assert.equal(stepper.position, 2);
});

test("already solved empty move list disables movement", () => {
  const stepper = new MoveStepper([]);
  assert.equal(stepper.total, 0);
  assert.equal(stepper.currentMove, null);
  for (const action of ["next", "previous", "replay", "reset"]) assert.equal(stepper.allowed(action), false);
  assert.deepEqual(parseMoves(""), []);
});

test("notation accepts all18 outer moves and rejects extensions", () => {
  const moves = [..."URFDLB"].flatMap((face) => [face, `${face}2`, `${face}'`]);
  assert.deepEqual(parseMoves(moves.join(" ")), moves);
  for (const notation of ["Rw", "x", "[R,U]", "R3", "R;alert(1)", null]) assert.throws(() => parseMoves(notation));
  assert.match(moveDescription("F'"), /front face 90° counterclockwise/);
  assert.match(moveDescription("B2"), /back face 180°/);
});

const fixtures = {
  U: "UUUUUUUUUBBBRRRRRRRRRFFFFFFDDDDDDDDDFFFLLLLLLLLLBBBBBB",
  U2: "UUUUUUUUULLLRRRRRRBBBFFFFFFDDDDDDDDDRRRLLLLLLFFFBBBBBB",
  "U'": "UUUUUUUUUFFFRRRRRRLLLFFFFFFDDDDDDDDDBBBLLLLLLRRRBBBBBB",
  R: "UUFUUFUUFRRRRRRRRRFFDFFDFFDDDBDDBDDBLLLLLLLLLUBBUBBUBB",
  R2: "UUDUUDUUDRRRRRRRRRFFBFFBFFBDDUDDUDDULLLLLLLLLFBBFBBFBB",
  "R'": "UUBUUBUUBRRRRRRRRRFFUFFUFFUDDFDDFDDFLLLLLLLLLDBBDBBDBB",
  F: "UUUUUULLLURRURRURRFFFFFFFFFRRRDDDDDDLLDLLDLLDBBBBBBBBB",
  F2: "UUUUUUDDDLRRLRRLRRFFFFFFFFFUUUDDDDDDLLRLLRLLRBBBBBBBBB",
  "F'": "UUUUUURRRDRRDRRDRRFFFFFFFFFLLLDDDDDDLLULLULLUBBBBBBBBB",
  D: "UUUUUUUUURRRRRRFFFFFFFFFLLLDDDDDDDDDLLLLLLBBBBBBBBBRRR",
  D2: "UUUUUUUUURRRRRRLLLFFFFFFBBBDDDDDDDDDLLLLLLRRRBBBBBBFFF",
  "D'": "UUUUUUUUURRRRRRBBBFFFFFFRRRDDDDDDDDDLLLLLLFFFBBBBBBLLL",
  L: "BUUBUUBUURRRRRRRRRUFFUFFUFFFDDFDDFDDLLLLLLLLLBBDBBDBBD",
  L2: "DUUDUUDUURRRRRRRRRBFFBFFBFFUDDUDDUDDLLLLLLLLLBBFBBFBBF",
  "L'": "FUUFUUFUURRRRRRRRRDFFDFFDFFBDDBDDBDDLLLLLLLLLBBUBBUBBU",
  B: "RRRUUUUUURRDRRDRRDFFFFFFFFFDDDDDDLLLULLULLULLBBBBBBBBB",
  B2: "DDDUUUUUURRLRRLRRLFFFFFFFFFDDDDDDUUURLLRLLRLLBBBBBBBBB",
  "B'": "LLLUUUUUURRURRURRUFFFFFFFFFDDDDDDRRRDLLDLLDLLBBBBBBBBB",
};

test("3D model matches canonical row-major state for all18 moves", async () => {
  const puzzle = await cube3x3x3.kpuzzle();
  const solved = puzzle.defaultPattern();
  assert.equal(patternToState(solved), SOLVED_STATE);
  for (const [move, expected] of Object.entries(fixtures)) {
    assert.equal(patternToState(solved.applyMove(move)), expected, move);
  }
});

test("each solver begins from same pattern and replay leaves same endpoint", async () => {
  const puzzle = await cube3x3x3.kpuzzle();
  const start = puzzle.defaultPattern().applyAlg("R U F2");
  const solutions = ["F2 U' R'", "F2 U' R' U U'"];
  for (const notation of solutions) {
    const moves = parseMoves(notation);
    assert.equal(patternToState(start.applyAlg(notation)), SOLVED_STATE);
    const first = start.applyMove(moves[0]);
    assert.equal(patternToState(first.applyMove(moves[0]).applyMove(moves[0])), patternToState(first));
  }
});
