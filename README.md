# Cube Studio: v4 scanner with Kociemba and Java BiBFS

One local desktop application combines the v4 Python/OpenCV scanner and Java solver.
Kociemba continues to validate scans, process correction candidates, and generate
its solution. The same final cube state is also sent to the existing Java
bidirectional BFS solver through anonymous stdin/stdout pipes. Both results have
their own labels and are saved in the scan report.

The solvers communicate through local pipes. The embedded 3D viewer uses a
loopback server for bundled assets; it makes no Internet requests. Dependency
installation can download packages during setup.

## Setup on Windows

Install Python 3.10 or later and a JDK 17 or later on 64-bit Windows. Put `python`,
`java`, and `javac` on PATH. The in-window 3D viewer also needs the
[Microsoft Edge WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/).
In PowerShell, from this directory:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup.ps1
.\.venv\Scripts\python.exe run.py
```

Once the environment is activated, the launcher is simply:

```powershell
python run.py
```

The Windows setup helper installs Kociemba's bundled Python fallback when
Kociemba is not already installed. This avoids requiring C++ build tools. Its
algorithm is unchanged, but this fallback is slower than Kociemba's native
extension, especially on difficult scrambles and correction searches. If a
working native Kociemba installation is already available in the environment,
setup keeps it.

For an environment that can build native Python extensions:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe scripts\build_java.py
.\.venv\Scripts\python.exe run.py
```

Java compilation uses the local JDK and targets Java 17 without Maven, Gradle,
or downloaded Java libraries. The launcher builds a missing or outdated JAR
automatically. After building, only a compatible Java runtime is needed to solve.
An unavailable Java build/runtime is reported without disabling Kociemba.

## Scanning

The default interface is Cube Studio, a native desktop window with light and dark
themes, a large camera preview, six guided scan steps, and separate Kociemba and
Java BiBFS solution cards. Select **Manual input** to paint a cube without using a
webcam, or launch with `--manual` to avoid opening the camera at all.

Use the existing scanner orientation: red facing the camera and blue on top.
Scan **red → yellow → orange → white → blue → green**, keeping the same
orientations described in [the v4 scanner instructions](scanner/UPSTREAM_README.md).
The current scanner uses camera index 0 with the Windows DirectShow backend.
Use **Mirror cam: Off / On** beside the camera tabs to invert the preview left
to right. The grid and calibration clicks follow the mirrored view. Detection
and the final cube state retain the original sticker order. This preference is
saved alongside your theme and does not restart or discard the current scan.

In Cube Studio, before the first camera scan, select **Calibrate colors**. Hold each requested
physical center sticker in the preview and click its middle, following
**red → yellow → orange → white → blue → green**. Each click explicitly labels
that camera sample; this lets the scanner distinguish colors when the camera's
white balance makes red look orange or blue look cyan. Keep the lighting and
camera consistent throughout calibration and scanning.

Use **Retake last**, `u`, or `r` to redo an incorrect calibration click.
**Cancel calibration** keeps the previous saved profile. Completing calibration
starts a fresh scan and saves six RGB medians in `.color_calibration.json` beside
the launcher; no camera images are saved. Select **Recalibrate colors** when
the cube, camera, or lighting changes. Samples that are too dark, overexposed,
mixed, or too similar are rejected with a message. A complete, usable profile
activates calibrated color comparison for grid detection; the original HSV rules remain the
fallback when a profile is absent. Manual color painting uses the selected
palette colors directly.

V4 uses **grid detection**, with **cube tracking enabled** by default. Present
the expected colored face clearly to the camera. The sampling
grid follows that face as it moves or tilts. **FINDING CUBE** means the scanner is
looking for the requested face, **CUBE TRACKED** means its preview is ready, and
**CAPTURING** means scanning is collecting readings. **HOLD STEADY** appears when
the face is visible but a reading is unreliable. The outline can follow a face
while color readings wait. Collection pauses on uncertain readings; a lost face,
blur, fast motion, or obscured/wrong center clears partial votes. One or two
brief uncertain non-center readings can keep earlier votes, but cannot add new
votes or capture a face until all nine stickers are reliable again.
Each sticker is accepted when at least **80% of its sampled pixels agree on one
color**. Dark pixels do not vote. The frozen candidate frame is fitted to a
square and checked for coherent 3×3 dividers, finite outer boundaries, and
uniform sticker surfaces before it can supply a scan reading. A low sharpness
number alone does not reject a clearly fitted face with readable colors.

The tracker uses local OpenCV image processing: perspective correction, optical
flow between frames, and confidence checks before capture. It requires no AI
model downloads or additional dependencies. Keep the displayed cube orientation
and all nine stickers visible. Enough light, distinct colors, and a clear view
are still needed; hidden stickers and extreme angles cannot be recovered.

Use **Auto tracking: On / Auto tracking: Off** to switch to v4's centered guide when needed.
With tracking off, center a complete cube face inside the visible 3×3 guide.
The guide initially occupies **55% of the smaller camera dimension**.
**− Smaller / + Larger** and `−` / `+` (`=` also works) resize it in
3 percentage point steps between **20% and 95%**. Guide-size controls are
shown when tracking is off. Both modes preview the actual sampling grid before
scanning starts; previewing and pausing do not collect readings.

- **Space**: start or pause scanning in Cube Studio.
- **Undo face**, `u`, or `r`: discard the last captured face and return to it,
  including after all six faces are complete. Repeated undo follows capture
  history; partial readings for the current face are discarded.
- `q`: start over and cancel pending work.
- `x`: quit and terminate pending workers.
- `c`: toggle square/circle center detection in **contour mode** and restart.
  This control is hidden in grid mode.

The default `scanner/config.json` contains:

```json
{
  "processing_backend": "auto",
  "detection_mode": "grid",
  "grid": {
    "tracking": true,
    "guide_fraction": 0.55,
    "auto_locate": false
  }
}
```

Set `grid.tracking` to `false` for v4's guide mode. In that mode,
`grid.auto_locate: true` enables v4's optional face location; a failed location
falls back to the centered guide. Tracking pauses collection when it loses the
face and does not fall back to sampling a fixed guide. Set `detection_mode` to `"contour"`
to retain the earlier contour detector and its square/circle center options.
Keep the remaining configuration fields when changing these settings.

Cube Studio reads the webcam continuously on a dedicated capture thread. The
preview displays the latest camera image independently of cube detection, so
expensive tracking cannot hold the video on an older frame. A separate detection
thread keeps one newest pending frame and discards replaced frames. The grid is
drawn from the latest detection result and can update less often than the video.
Restart, undo, and input-mode changes discard results from abandoned work.

The header's FPS measures new preview images. The local `.vision_status.json`
diagnostic reports that rate separately from detection FPS, processing time,
tracking status, and the current waiting reason; it contains no camera images.
Detection FPS measures completed tracking and color checks.
Both rates count completed frames over a rolling second, so alternating slow and
fast detection work cannot inflate the reported speed.
Increasing GPU work can improve some detection operations but does not increase
the webcam's own frame rate. When a detected face cannot be accepted, the scan
guide explains whether the camera needs a steadier view, the requested center
color, or a clearer view of all nine stickers.

For a requested camera diagnosis, launch with `--debug-snapshot`. A one-line
identifier in `.camera_snapshot.request` saves one raw detector input, its matching
overlay, and fit metadata under `.diagnostics/`. No snapshots are saved without
that request. These files are excluded from Git.

### 3D solution steps

After solving, select **3D steps** on either successful solver card. Cube Studio
shows separate **Kociemba** and **Java BiBFS** cubes inside the same window.
Use **Back to cube** to return to scanning or painting. Reopening the viewer
keeps both step positions until the cube input changes.

- **< Previous** reverses one completed move.
- **> Next** animates the next move.
- **Replay twist** returns to the start of the current move and repeats it
  without advancing the step count.
- **Reset** returns that solver's cube to the initial scanned or painted state.

Each cube starts from the exact validated state, including any applied scan
correction. Both solutions are replayed independently before controls are
enabled. Pending, timed-out, failed, or invalid Java results show their status;
an already solved cube has zero steps. Java's card updates when its search
finishes. Each viewer keeps its own progress and supports light and dark themes.

The viewer uses the source cloned into `../cubing.js` from
[amanalex2006/cubing.js](https://github.com/amanalex2006/cubing.js), commit
`bd472ae4d47e72ec263dcbe7005214f7f3946bb5`. Its JavaScript and licenses are
bundled under `viewer/vendor/`; Node.js is needed only to rebuild these assets:

```powershell
npm ci --prefix viewer
node scripts/build_viewer.mjs
```

The viewer uses a WebView2 child control with WebGL. Its small Windows host and
pinned SDK libraries are bundled in `viewer/native/bin/`; no separate browser
window is opened. To rebuild the host using the Windows .NET Framework compiler:

```powershell
python scripts/build_native_viewer.py
```

The viewer serves bundled assets over `127.0.0.1` on an automatically selected
local port and closes its server and renderer processes when Cube Studio quits.
The solvers continue to communicate through their existing pipes.

The GPU backend uses OpenCV's **OpenCL/UMat** operations. Supported image masks,
edges, and larger filters can run on a compatible GPU, including an NVIDIA
RTX 4060 with its OpenCL driver. Small sampling warps, sparse optical flow,
contours, geometry, and calibrated color decisions use the CPU to avoid device
transfer and kernel-launch overhead. This is a hybrid pipeline; GPU availability
does not guarantee a faster complete scan. The installed OpenCV wheel does not
provide CUDA execution, and no CUDA wheel or extra GPU package is required.

`processing_backend: "auto"` is the default. Use `"cpu"` to keep all image
processing on the CPU, or `"gpu"` to request the OpenCL path. GPU initialization
warms up in the background; scanning can begin on the CPU and switches when the
backend is ready. An unavailable GPU or failed operation falls back to the CPU.

After the final face is captured, Cube Studio checks legality and generates
Kociemba's report in a background process, keeping the camera preview responsive.
Once that report is ready, it is saved with Java marked `pending`, and Java
receives the exact final validated state, including any scanner correction.
The Java result or failure appears in its own card and updates the report when
the process finishes. A Java timeout or failure does not change scan validity
or hide Kociemba's solution. Undo, restart, switching input modes, or quitting
cancels pending work so abandoned results cannot update the current scan.

## Manual color input and themes

Select a color, then click or drag over the unfolded cube to paint its stickers.
The six centers are fixed to the scanner's color convention: **U blue, R yellow,
F red, D green, L white, B orange**. Face letters and per-color counts help track
the input. All 54 stickers must be filled, with exactly nine of each color,
before **Solve cube** becomes available; the solver then checks physical legality.
Manual states are checked as entered and are not corrected automatically.

Use **Try a sample** for a known short scramble, **Solved cube** to fill a solved
state, or **Clear cube** to start painting again. `1`–`6` select palette colors, and
Space solves a complete cube. Editing the cube cancels pending work and clears
results from its earlier state. Both solution cards support text selection and
copying; **Export report** saves the current JSON report.

The header's theme control switches between dark and light without resetting
your cube. The selected theme is saved locally in `.ui_settings.json`; `--theme`
overrides it for startup. Dark is the default when no preference has been saved.

## Command-line options

```powershell
.\.venv\Scripts\python.exe run.py --help
.\.venv\Scripts\python.exe run.py --manual --theme light
.\.venv\Scripts\python.exe run.py --legacy-ui
.\.venv\Scripts\python.exe run.py --config scanner\config.json --output my_scan.json --debug
.\.venv\Scripts\python.exe run.py --java-timeout 10 --java-heap-mb 256
.\.venv\Scripts\python.exe run.py --vision-backend gpu
.\.venv\Scripts\python.exe run.py --vision-backend cpu
.\.venv\Scripts\python.exe run.py --state UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB
```

`--state` runs both solvers without opening a camera. Supply exactly 54 stickers
in `URFDLB` face order, with each face indexed row-major. Manual states are
validated as supplied, without scanner correction inference.

`--manual` opens Cube Studio directly in the color editor. `--theme dark|light`
selects its initial appearance. `--legacy-ui` opens the OpenCV camera window;
both desktop and legacy camera paths use the v4 detection integration, tracking,
guide resizing, and capture-history undo. The legacy camera window continues
scanning automatically; `t` toggles tracking there, and `+` / `−` resize the guide
while tracking is off.

`--vision-backend auto|gpu|cpu` overrides `processing_backend` from the scanner
configuration. Without the option, the configuration controls the backend.
Camera color calibration uses the app's saved `.color_calibration.json` profile.
The legacy grid detector reads that saved profile too; use Cube Studio to create
or update it.

Defaults: Java timeout **30 seconds**, maximum Java heap **512 MiB**. Use `--java`
to specify a Java executable path; `--solve-timeout` is an alias for
`--java-timeout`. Bundled configuration and JAR paths are relative to the app,
so the launcher works from another working directory. The default report goes
to `cube_state.json` beside `run.py`; explicit relative output/config paths use
the caller's working directory.

In camera-free mode, exit status 0 means the cube is valid and the report was
written; consult `java_solver.status` for Java success or failure. Invalid states
exit with status 1. Interrupting the application exits with status 130.

## Report compatibility

Existing fields such as `valid`, `state`, `faces`, `problems`, `corrections`,
`raw_faces`, `raw_state`, and `notation` retain their scanner meaning.
`notation` always contains the Kociemba solution. The additional field is:

```json
{
  "java_solver": {
    "algorithm": "BidirectionalBFS",
    "status": "solved",
    "notation": "R'",
    "elapsed_ms": 4,
    "searched_moves": 1,
    "visited_moves": 14,
    "error": null
  }
}
```

An empty Java notation means an already solved cube. Unavailable statistics and
unsuccessful notation are `null`. Errors have `code` and `message`. Statuses
include `pending`, `solved`, `not_run`, `cancelled`, `timed_out`, `missing_java`,
`missing_jar`, `invalid_input`, `invalid_cube`, `invalid_solution`, `failed`,
`process_failed`, and `malformed_response`.

## Module boundaries and protocol

`scanner/` contains the adapted v4 camera/detection code, local color calibration,
continuous camera capture, latest-frame detection, OpenCL/CPU image operations,
and Kociemba report logic.
`gui/` owns the themed desktop workspace and manual color editor.
`bridge/` owns the cancellable Kociemba report worker, Java process management,
and report-session updates.
`solver-java/` contains the imported Java algorithms and a small `cli.PipeMain`
adapter. The original demo entry point and other search algorithms remain in
the source tree; the executable JAR uses the pipe adapter.

Each solve starts one Java child with `shell=False`, sends one UTF-8 state line,
then closes stdin. The adapter emits exactly one tab-separated line:

```text
RUBIKS_PIPE_V1<TAB>STATUS<TAB>NOTATION<TAB>SEARCHED<TAB>VISITED<TAB>ELAPSED_MS<TAB>ERROR_CODE<TAB>DETAIL
```

Wire statuses: `SOLVED`, `INVALID_INPUT`, `INVALID_CUBE`, `INVALID_SOLUTION`,
or `FAILED`. Success has empty error fields; failure has empty notation. Only
protocol data goes to Java stdout. Both stdout and stderr are continuously
drained by `communicate`; timeout/cancellation kills and reaps the worker.
Only the UI/main thread writes reports, so abandoned jobs cannot overwrite
a restarted scan's report. The desktop report worker passes its result over
a local multiprocessing pipe; both solver integrations run offline after setup.

Every Java solution is replayed before success is returned. Search strategies,
heuristics, and pruning rules are unchanged. Front/back move-table fixes and
encoded move replay make the cube model consistent with standard notation.
The existing BFS algorithm can exceed its time or heap limit on deep scrambles;
such failures remain Java-specific results.

## Verification

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
node --test viewer/stepper.test.mjs
```

Checks cover all 18 move encodings against Kociemba's independent model,
inverse/four-turn identities, random model sequences, short actual solves,
illegal states, report compatibility, exact pipe input, large stderr output,
malformed responses, missing runtime, timeout/cancellation, process cleanup,
paths with spaces, and solving with Python sockets disabled.

Scanner checks cover synthetic grid classification and row-major ordering,
guide limits, perspective tracking, motion and loss, automatic-location fallback
in guide mode, six-face capture, repeated undo,
partial-reading reset, and undo after completion. GUI checks cover both themes,
manual solving, input changes, cancellation, and preview updates during solving.
Viewer checks cover independent solver progress, all move encodings, replay,
zero-move solutions, inline errors, and returning to the input workspace.
Color checks cover shifted camera hues, brightness changes, ambiguous readings,
sample rejection, and saved profile compatibility. Worker checks cover dropping
older pending frames and ignoring invalidated results. Preview checks use a slow
camera and slow detector to verify that new video images and Tk events continue
while detection is busy, and that closing the window releases both workers.
A live webcam scan is the remaining hardware acceptance step; it requires
presenting all six faces of a physical cube.

See [SOURCES.md](SOURCES.md) for source commits and retained attribution.
