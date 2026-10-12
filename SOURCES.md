# Imported source snapshots

| Module | Repository | Commit |
| --- | --- | --- |
| Original Python scanner ancestry | https://github.com/amanalex2006/rubiksssscannnnn | `d81969bb24ad19791c71045dbb12db9c4f1bcff4` |
| Java solver | https://github.com/amanalex2006/RubiksCubeSolver | `a823e3b0d5e6acf93a9048ccb82fd334e438ffb8` |

The active scanner is adapted from the local **`D:\ai rubics\v4`** snapshot
supplied by the user on 2026-10-12. It extends the original scanner with grid
detection, adjustable guide sizing, optional automatic face location, and
capture-history undo. No Git commit is asserted for this local folder.

The v4 README credits Aaron Wang's [rcube-scan](https://github.com/aaron-wang/rcube-scan).
The original license is preserved in `scanner/LICENSE`, and the supplied v4
README is preserved as `scanner/UPSTREAM_README.md`. The imported Java snapshot supplied
no license file, so no license has been assigned to that code by this integration.

The scanner retains the pinned `kociemba==1.2.1` dependency. Kociemba is maintained
at https://github.com/muodov/kociemba and includes its own GPL-2.0 license. The
Windows fallback installer preserves its source files, tables, and license.

V4's original files are identified by SHA-256 below and in
[`scanner/V4_SNAPSHOT.json`](scanner/V4_SNAPSHOT.json). These hashes identify the
source snapshot before adaptation; application files may differ because of
package imports, camera lifecycle handling, GUI integration, and asynchronous
report/solver handling. The generated `v4/src/cube_state.json` was excluded.

| Local v4 source file | SHA-256 |
| --- | --- |
| `src/main.py` | `02dcda8674a0bfa7a2d9a0fc0ac3d9fded331d249229065ce5e84a99a3e77032` |
| `src/grid_detect.py` | `1c2c1bbe3ac60c34c4a5908f7c308bb47a8b68aa30cdbd85811dd6e4669ccb85` |
| `src/cube_state.py` | `194a50d061e822060c189f96a9fa5779feccaabc9f9798e61ef4d83c0d3ad4d6` |
| `src/constants.py` | `68f4febd83cb58617ef6337c205cdabad9685303b23529876cf67093b9eab376` |
| `src/config.json` | `66cfb9f00687aa0193e6a5f057531d93a0e8014f3a0c68ec1ec02d1fffbaedac` |
| `README.md` | `27a31139a810cea34a886456f33701a77039fc7539f1db45a12afe7383b86ccc` |
| `requirements.txt` | `641a71be4ba2a13dc9efda3e1cd815d1b310d686da5187a3ea18c40af4a30ef1` |

Integration changes include the native light/dark desktop GUI, manual color
editor, launcher, scanner adapters, report worker, pipe adapter/bridge,
reporting, result display, local camera face tracking, explicit camera color
calibration, continuous capture and a latest-frame detection worker, optional
OpenCL image operations, and cube-model correctness.
The tracking layer and its default-on configuration are integration additions.
It uses OpenCV perspective transforms, Lucas–Kanade optical flow, RANSAC
geometry checks, and temporal confidence checks. It has no learned model or
model download. The snapshot hashes above still identify the unmodified supplied
v4 files. Java search classes, heuristics, and pruning logic are imported unchanged.

Color calibration is an integration addition using six user-labeled RGB center
medians and brightness-normalized Lab comparison. Its local profile contains
color metadata only. The vision backend uses the installed OpenCV package's
OpenCL/UMat operations with CPU fallback; it does not add a CUDA dependency or
replace the detector with a learned model. Small image patches and geometry
remain on the CPU while suitable larger image operations can use the GPU.

The desktop preview reads the latest raw camera image from a dedicated capture
thread, independently of detection completion. Geometry tracking and reliable
color capture have separate status checks so a visible grid can follow a face
while uncertain readings wait for a better view. The capture and detector drop
obsolete pending frames rather than building a growing queue.

Cube-model fixes in the combined copy:

- Front-face turns no longer swap the two back-bottom corners.
- Back-face edges now turn clockwise with the back-face corners.
- Move replay accepts all 18 encoded moves, including half and inverse turns.
- Canonical facelet input validates counts, centers, cubies, and physical legality.

The original repository checkouts and the local v4 folder remain separate from
this application and are preserved.

## cubing.js solution viewer

Source: https://github.com/amanalex2006/cubing.js, commit
`bd472ae4d47e72ec263dcbe7005214f7f3946bb5`, preserved in the sibling
`cubing.js` checkout. The local build bundles its `TwistyPlayer` and cube model
with all runtime dependencies. Build inputs and SHA256 are recorded in
`viewer/vendor/UPSTREAM.json` and `BUILD-INPUTS.json`.

The `Cube3D` face palette is adapted during the build to the scanner's face
colors. The adapted source and MPL/GPL and dependency notices are included in
`viewer/vendor`; the original checkout is unchanged. The loopback viewer,
independent solution replay checks, and step controls are integration additions.

## Embedded Windows viewer

`viewer/native/WebViewHost.cs` and `viewer/embedded.py` are integration additions
that attach a WebView2 child control to the Tk window and manage its pipes and
renderer lifetime. The host is built by `scripts/build_native_viewer.py` using
the Windows .NET Framework compiler.

The bundled SDK libraries come from Microsoft's
[Microsoft.Web.WebView2 NuGet package](https://www.nuget.org/packages/Microsoft.Web.WebView2/1.0.4258.31),
version `1.0.4258.31`. The package URL, source hash, and binary SHA-256 hashes are
recorded in `viewer/native/bin/UPSTREAM.json`; its redistribution license is
preserved in `viewer/native/bin/Microsoft-WebView2-LICENSE.txt`. The separately
installed WebView2 Runtime is not included in this repository.
