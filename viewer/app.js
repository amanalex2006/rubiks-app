import { TwistyPlayer, cube3x3x3 } from "/vendor/cubing.js";
import { MoveStepper, SOLVED_STATE, moveDescription, parseMoves, patternToState } from "/stepper.js";

const byId = (id) => document.getElementById(id);
const query = new URLSearchParams(location.search);
document.documentElement.dataset.embedded = query.get("embedded") === "1" ? "true" : "false";
const token = query.get("token");
const selectedSolver = query.get("solver") === "java" ? "java" : "kociemba";
const motionReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let themeOverride = null;
let currentTheme = "dark";
let closed = false;
let pollTimer = null;
let startingKey = null;
let startingPattern = null;
let lastPayload = null;
const kpuzzle = await cube3x3x3.kpuzzle();

if (query.get("embedded") !== "1") {
  try { themeOverride = localStorage.getItem("cube-studio-viewer-theme"); } catch { /* Storage is optional. */ }
}
if (!["dark", "light"].includes(themeOverride)) themeOverride = null;

function setTheme(theme) {
  currentTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = currentTheme;
  const next = currentTheme === "dark" ? "light" : "dark";
  byId("theme-toggle").textContent = `${next[0].toUpperCase()}${next.slice(1)} mode`;
  byId("theme-toggle").setAttribute("aria-label", `Switch to ${next} mode`);
  for (const panel of Object.values(panels)) {
    if (panel.player) panel.player.colorScheme = currentTheme;
  }
}

function errorMessage(error) {
  return typeof error === "string" ? error : error?.message ?? "The solver did not return a usable solution.";
}

function solverMessage(solver, ready, total) {
  if (ready) return total ? "Verified against your exact cube. Each arrow performs one turn." : "Your cube is already solved. No turns are needed.";
  if (solver.status === "pending" || solver.status === "running") return "Java is still searching. This panel will update when its result arrives; you can follow Kociemba now.";
  if (solver.status === "timed_out" || solver.status === "timeout") return "Java reached its search time limit. Your Kociemba solution remains available.";
  if (solver.status === "not_run") return "Java has not produced a solution for this cube.";
  return errorMessage(solver.error);
}

function statusLabel(status, ready, total) {
  if (ready) return total ? "VERIFIED" : "ALREADY SOLVED";
  if (status === "pending" || status === "running") return "SEARCHING";
  if (status === "timed_out" || status === "timeout") return "TIME LIMIT";
  if (status === "not_run") return "NOT RUN";
  return "UNAVAILABLE";
}

function createText(tag, text, className = "") {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

class SolverPanel {
  constructor(key) {
    this.key = key;
    this.element = byId(`panel-${key}`);
    this.stage = byId(`stage-${key}`);
    this.stepper = new MoveStepper();
    this.player = null;
    this.identity = null;
    this.ready = false;
    this.rendering = false;
    this.solver = {};
    this.boundaries = [];
    this._cancelAnimation = null;
    for (const action of ["previous", "replay", "next", "reset"]) {
      byId(`${action}-${key}`).addEventListener("click", () => { void this.perform(action); });
    }
    this.element.addEventListener("pointerdown", () => {
      for (const other of Object.values(panels)) other.element.classList.toggle("selected", other === this);
    });
  }

  async apply(payload) {
    const reported = payload.solvers?.[this.key] ?? { status: "not_run", verified: false };
    const solver = { ...reported };
    let moves = [];
    let verified = solver.verified === true && solver.status === "solved";
    if (verified) {
      try {
        moves = parseMoves(solver.notation);
        if (!Array.isArray(solver.moves) || solver.moves.join(" ") !== moves.join(" ")) throw new Error("Move list and notation disagree.");
        if (patternToState(startingPattern.applyAlg(solver.notation)) !== SOLVED_STATE) throw new Error("This solution does not solve the displayed cube.");
      } catch (error) {
        verified = false;
        solver.status = "invalid_solution";
        solver.error = { message: error.message };
        moves = [];
      }
    }
    this.solver = solver;
    const identity = JSON.stringify([payload.state, verified, verified ? moves.join(" ") : ""]);
    if (identity !== this.identity) {
      this._cancelAnimation?.();
      this.stepper.cancel();
      this.ready = false;
      this.rendering = verified;
      this.stepper = new MoveStepper(moves);
      this.identity = identity;
      this.player?.pause();
      this.stage.replaceChildren();
      this.player = new TwistyPlayer({
        puzzle: "3x3x3", visualization: "3D", alg: moves.join(" "),
        experimentalSetupAlg: payload.setup_alg, experimentalSetupAnchor: "start",
        controlPanel: "none", viewerLink: "none", background: "none", backView: "none",
        hintFacelets: "none", experimentalInitialHintFaceletsAnimation: "none",
        experimentalMovePressInput: "none", experimentalDragInput: "auto",
        colorScheme: currentTheme, cameraLatitude: 28, cameraLongitude: 30,
      });
      this.player.setAttribute("aria-label", `${solver.label ?? this.key} interactive cube`);
      this.player.pause();
      this.player.timestamp = 0;
      this.stage.appendChild(this.player);
      const indexer = await this.player.experimentalModel.indexer.get();
      if (identity !== this.identity) return;
      if (indexer.numAnimatedLeaves() !== moves.length) throw new Error("Cube animation and move sequence disagree.");
      this.boundaries = moves.map((_, index) => indexer.indexToMoveStartTimestamp(index));
      this.boundaries.push(indexer.algDuration());
      this.renderMoves();
      void this.waitForRenderer(this.player, identity, verified);
    }
    this.renderStatus();
    this.renderPosition();
  }

  renderStatus() {
    const badge = byId(`badge-${this.key}`);
    badge.textContent = this.rendering ? "LOADING 3D" : statusLabel(this.solver.status, this.ready, this.stepper.total);
    badge.className = `solver-badge${this.ready ? " verified" : this.rendering || ["pending", "running", "not_run"].includes(this.solver.status) ? "" : " failed"}`;
    byId(`detail-${this.key}`).textContent = this.rendering ? "Your solution is verified. Preparing the 3D cube…" : solverMessage(this.solver, this.ready, this.stepper.total);
    const metrics = [];
    if (Number.isFinite(this.solver.elapsed_ms)) metrics.push(`${(this.solver.elapsed_ms / 1000).toFixed(2)} s`);
    if (Number.isFinite(this.solver.searched_moves)) metrics.push(`${this.solver.searched_moves.toLocaleString()} searched`);
    if (Number.isFinite(this.solver.visited_moves)) metrics.push(`${this.solver.visited_moves.toLocaleString()} visited`);
    byId(`metrics-${this.key}`).textContent = metrics.join(" · ");
  }

  async waitForRenderer(player, identity, verified) {
    try {
      // cubing.js initializes offscreen players when they first become visible.
      // Run this independently of report polling so a lower mobile panel does
      // not delay the visible panel or Java status updates.
      await player.experimentalCurrentThreeJSPuzzleObject();
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (player !== this.player || identity !== this.identity || closed) return;
      const canvases = await player.experimentalCurrentCanvases();
      if (!canvases.length || canvases.some((canvas) => {
        const bounds = canvas.getBoundingClientRect();
        return bounds.width <= 0 || bounds.height <= 0 || canvas.width <= 0 || canvas.height <= 0;
      })) throw new Error("The 3D cube could not obtain a visible rendering area.");
      this.rendering = false;
      this.ready = verified;
      this.renderMoves();
      this.renderStatus();
      this.renderPosition();
    } catch (error) {
      if (player !== this.player || identity !== this.identity || closed) return;
      this.rendering = false;
      this.fail(`Could not display the 3D cube: ${error.message}`);
    }
  }

  renderMoves() {
    const list = byId(`moves-${this.key}`);
    list.replaceChildren();
    if (!this.stepper.total) {
      list.appendChild(createText("li", this.ready ? "No moves needed." : "A verified move sequence will appear here.", "empty-sequence"));
      return;
    }
    this.stepper.moves.forEach((move, index) => {
      const item = createText("li", "");
      item.appendChild(createText("span", String(index + 1), "move-number"));
      item.appendChild(createText("span", move));
      item.title = moveDescription(move);
      item.dataset.moveIndex = String(index);
      list.appendChild(item);
    });
  }

  renderPosition(plan = this.stepper.activePlan) {
    const { position, total } = this.stepper;
    this.element.dataset.position = String(position);
    this.element.dataset.busy = String(this.stepper.busy);
    byId(`counter-${this.key}`).textContent = `${position} / ${total} moves`;
    for (const action of ["previous", "replay", "next", "reset"]) {
      byId(`${action}-${this.key}`).disabled = !this.ready || !this.stepper.allowed(action);
    }
    const selectedIndex = plan ? plan.moveIndex : position - 1;
    for (const item of byId(`moves-${this.key}`).querySelectorAll("li[data-move-index]")) {
      const index = Number(item.dataset.moveIndex);
      item.classList.toggle("completed", index < position);
      item.classList.toggle("current", index === selectedIndex);
      item.classList.toggle("upcoming", !plan && index === position);
      if (index === selectedIndex) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    }
    const current = byId(`current-${this.key}`);
    current.replaceChildren();
    if (plan) {
      current.append(createText("span", `${plan.action === "previous" ? "UNDOING" : plan.action === "replay" ? "REPLAYING" : "TURNING"} MOVE ${plan.moveIndex + 1}`, "current-label"),
        createText("strong", this.stepper.moves[plan.moveIndex]),
        createText("p", moveDescription(this.stepper.moves[plan.moveIndex])));
    } else if (this.rendering) {
      current.append(createText("span", "PREPARING 3D VIEW", "current-label"), createText("strong", "Your cube"),
        createText("p", "Your solution is verified. Step controls activate when the cube is visible."));
    } else if (!this.ready) {
      current.append(createText("span", "SAME STARTING CUBE", "current-label"), createText("strong", "Your cube"),
        createText("p", "This panel needs its own verified solver result before stepping."));
    } else if (total === 0) {
      current.append(createText("span", "COMPLETE", "current-label"), createText("strong", "Already solved"), createText("p", "All six faces are complete. No turns are needed."));
    } else if (position === 0) {
      current.append(createText("span", "STARTING POSITION", "current-label"), createText("strong", `First turn: ${this.stepper.nextMove}`),
        createText("p", "Keep blue on top and red in front, then press Next."));
    } else {
      current.append(createText("span", position === total ? "SOLUTION COMPLETE" : `MOVE ${position} OF ${total}`, "current-label"),
        createText("strong", position === total ? `Solved · ${this.stepper.currentMove}` : this.stepper.currentMove),
        createText("p", position === total ? "Your cube is solved. Replay the last turn or go back to review." : moveDescription(this.stepper.currentMove)));
    }
  }

  animate(plan) {
    const from = this.boundaries[plan.fromIndex];
    const to = this.boundaries[plan.toIndex];
    this.player.pause();
    this.player.timestamp = from;
    const duration = motionReduced ? 160 : 620;
    return new Promise((resolve) => {
      let request = null;
      let started = null;
      const cancel = () => {
        if (request !== null) cancelAnimationFrame(request);
        if (this._cancelAnimation === cancel) this._cancelAnimation = null;
        resolve(false);
      };
      this._cancelAnimation = cancel;
      const tick = (now) => {
        if (!this.stepper.isCurrent(plan)) { cancel(); return; }
        if (started === null) started = now;
        const fraction = Math.min(1, (now - started) / duration);
        const eased = fraction * fraction * (3 - 2 * fraction);
        this.player.timestamp = from + (to - from) * eased;
        if (fraction < 1) request = requestAnimationFrame(tick);
        else {
          this.player.timestamp = to;
          this._cancelAnimation = null;
          resolve(true);
        }
      };
      // Allow the instantaneous rewind of Replay to render before its turn.
      request = requestAnimationFrame(() => { request = requestAnimationFrame(tick); });
    });
  }

  async perform(action) {
    if (!this.ready) return;
    const plan = this.stepper.begin(action);
    if (!plan) return;
    this.renderPosition(plan.action === "reset" ? null : plan);
    try {
      if (action === "reset") {
        this.player.pause();
        this.player.timestamp = 0;
      } else if (!await this.animate(plan)) return;
      if (this.stepper.complete(plan)) this.renderPosition();
    } catch (error) {
      this.stepper.cancel();
      this.player.timestamp = this.boundaries[this.stepper.position];
      byId(`detail-${this.key}`).textContent = `Could not animate this turn: ${error.message}`;
      this.renderPosition();
    }
  }

  fail(message) {
    this._cancelAnimation?.();
    this.stepper.cancel();
    this.ready = false;
    this.rendering = false;
    this.solver = { status: "failed", error: { message } };
    this.renderStatus();
    this.renderPosition();
  }
}

const panels = { kociemba: new SolverPanel("kociemba"), java: new SolverPanel("java") };
addEventListener("cube-studio-select-solver", ({detail}) => {
  if (!panels[detail]) return;
  for (const [key, panel] of Object.entries(panels)) panel.element.classList.toggle("selected", key === detail);
});
panels[selectedSolver].element.classList.add("selected");
setTheme(themeOverride ?? "dark");
byId("theme-toggle").addEventListener("click", () => {
  themeOverride = currentTheme === "dark" ? "light" : "dark";
  try { localStorage.setItem("cube-studio-viewer-theme", themeOverride); } catch { /* Optional preference. */ }
  setTheme(themeOverride);
});

function renderLegend(colors) {
  const names = { U: "Top · blue", R: "Right · yellow", F: "Front · red", D: "Bottom · green", L: "Left · white", B: "Back · orange" };
  byId("face-legend").replaceChildren();
  for (const face of "URFDLB") {
    const item = createText("span", "", "face-item");
    const swatch = createText("span", "", "face-swatch");
    if (/^#[0-9a-f]{6}$/i.test(colors?.[face] ?? "")) swatch.style.backgroundColor = colors[face];
    item.append(swatch, createText("strong", face), createText("span", names[face]));
    byId("face-legend").appendChild(item);
  }
}

async function applyPayload(payload) {
  if (payload.schema !== "cube-studio-viewer-v1" || payload.valid !== true || typeof payload.state !== "string" || !/^[URFDLB]{54}$/.test(payload.state)) {
    throw new Error(errorMessage(payload.error ?? "This viewer needs a validated cube state."));
  }
  if (typeof payload.setup_alg !== "string") throw new Error("No verified solution is available to reconstruct your cube.");
  const key = JSON.stringify([payload.state, payload.setup_alg]);
  if (key !== startingKey) {
    parseMoves(payload.setup_alg);
    const pattern = kpuzzle.defaultPattern().applyAlg(payload.setup_alg);
    if (patternToState(pattern) !== payload.state) throw new Error("The 3D starting cube does not match your cube's stickers.");
    startingPattern = pattern;
    startingKey = key;
  }
  setTheme(themeOverride ?? payload.theme);
  renderLegend(payload.face_colors);
  const results = await Promise.allSettled(Object.values(panels).map((panel) => panel.apply(payload)));
  results.forEach((result, index) => {
    if (result.status === "rejected") Object.values(panels)[index].fail(result.reason.message);
  });
  byId("page-error").hidden = true;
  byId("session-status").textContent = [payload.solvers?.java?.status].some((status) => status === "pending" || status === "running")
    ? "Java search in progress" : "Both panels use your cube";
  lastPayload = payload;
}

async function poll() {
  if (closed) return;
  try {
    if (!token) throw new Error("Open 3D steps from Cube Studio to load your cube.");
    const response = await fetch(`/api/report?token=${encodeURIComponent(token)}`, { cache: "no-store" });
    if (!response.ok) throw new Error("This viewer session is no longer available. Open 3D steps again from Cube Studio.");
    await applyPayload(await response.json());
  } catch (error) {
    byId("session-status").textContent = lastPayload ? "Cube Studio connection unavailable" : "Could not load cube";
    if (!lastPayload) {
      byId("page-error").textContent = error.message;
      byId("page-error").hidden = false;
      for (const panel of Object.values(panels)) panel.fail(error.message);
    }
  } finally {
    if (!closed && token) pollTimer = setTimeout(poll, 1000);
  }
}

addEventListener("pagehide", () => {
  closed = true;
  clearTimeout(pollTimer);
  for (const panel of Object.values(panels)) {
    panel._cancelAnimation?.();
    panel.stepper.cancel();
    panel.player?.pause();
  }
});

void poll();
