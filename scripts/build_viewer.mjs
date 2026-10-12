/** Bundle the cloned cubing.js source; npm is used only for build dependencies. */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile, mkdir, writeFile, copyFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viewerRoot = path.join(appRoot, "viewer");
const sourceRoot = path.resolve(process.argv[2] ?? path.join(appRoot, "..", "cubing.js"));
const vendorRoot = path.join(viewerRoot, "vendor");
const require = createRequire(path.join(viewerRoot, "package.json"));
let esbuild;
try {
  esbuild = require("esbuild");
} catch {
  throw new Error("Viewer dependencies are missing. Run npm ci --prefix viewer first.");
}

const commit = execFileSync("git", ["-C", sourceRoot, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const sourcePackage = JSON.parse(await readFile(path.join(sourceRoot, "package.json"), "utf8"));
if (sourcePackage.name !== "cubing") throw new Error("Expected a cubing.js source checkout.");
await mkdir(vendorRoot, { recursive: true });

// The scanner's physical cube uses blue U, yellow R, red F, green D, white L,
// orange B. Preserve the cloned checkout and apply only this display adaptation
// while bundling. The move engine and solver code are unchanged.
const faceColors = { U: "#639df4", R: "#f6d75d", F: "#f0646b", D: "#54cfa0", L: "#edf2f8", B: "#f69a50" };
const axes = [
  ["U", "new Vector3(0, 1, 0)", "new Euler(-TAU / 4, 0, 0)"],
  ["L", "new Vector3(-1, 0, 0)", "new Euler(0, -TAU / 4, 0)"],
  ["F", "new Vector3(0, 0, 1)", "new Euler(0, 0, 0)"],
  ["R", "new Vector3(1, 0, 0)", "new Euler(0, TAU / 4, 0)"],
  ["B", "new Vector3(0, 0, -1)", "new Euler(0, TAU / 2, 0)"],
  ["D", "new Vector3(0, -1, 0)", "new Euler(TAU / 4, 0, 0)"],
];
const replacement = `const axesInfo: AxisInfo[] = [\n${axes.map(([face, vector, euler]) => {
  const regular = Number.parseInt(faceColors[face].slice(1), 16);
  const dim = ((Math.floor((regular >> 16) * 0.55) << 16) |
    (Math.floor(((regular >> 8) & 255) * 0.55) << 8) |
    Math.floor((regular & 255) * 0.55));
  return `  new AxisInfo(${vector}, ${euler}, 0x${regular.toString(16)}, 0x${dim.toString(16)}, 1),`;
}).join("\n")}\n];`;
let paletteAdapted = false;
let adaptedCubeSource = "";
const result = await esbuild.build({
  stdin: {
    contents: [
      `export { TwistyPlayer } from ${JSON.stringify(path.join(sourceRoot, "src/cubing/twisty/views/TwistyPlayer.ts"))};`,
      `export { Alg, Move } from ${JSON.stringify(path.join(sourceRoot, "src/cubing/alg/index.ts"))};`,
      `export { puzzles, cube3x3x3 } from ${JSON.stringify(path.join(sourceRoot, "src/cubing/puzzles/index.ts"))};`,
      `export { KPuzzle, KPattern } from ${JSON.stringify(path.join(sourceRoot, "src/cubing/kpuzzle/index.ts"))};`,
    ].join("\n"),
    sourcefile: "cube-studio-cubing-entry.ts",
    resolveDir: sourceRoot,
    loader: "ts",
  },
  outfile: path.join(vendorRoot, "cubing.js"),
  nodePaths: [path.join(viewerRoot, "node_modules")],
  bundle: true,
  format: "esm",
  target: "es2022",
  tsconfigRaw: { compilerOptions: { target: "ES2022", useDefineForClassFields: true } },
  platform: "browser",
  minify: true,
  metafile: true,
  legalComments: "eof",
  logLevel: "info",
  // One file also absorbs dynamic imports: no network, CDN, or remote chunks.
  splitting: false,
  plugins: [{
    name: "cube-studio-face-palette",
    setup(build) {
      build.onLoad({ filter: /[\\/]twisty[\\/]views[\\/]3D[\\/]puzzles[\\/]Cube3D\.ts$/ }, async ({ path: filePath }) => {
        const text = await readFile(filePath, "utf8");
        const pattern = /const axesInfo: AxisInfo\[\] = \[[\s\S]*?\n\];/;
        if (!pattern.test(text)) throw new Error("Cube3D face palette layout changed; review the adapter before rebuilding.");
        paletteAdapted = true;
        adaptedCubeSource = text.replace(pattern, replacement);
        return { contents: adaptedCubeSource, loader: "ts" };
      });
    },
  }],
});
if (!paletteAdapted) throw new Error("Cube3D palette adapter did not run.");
const externalImports = Object.values(result.metafile.outputs).flatMap((out) => out.imports.filter((item) => item.external));
if (externalImports.length) throw new Error(`Unexpected external runtime imports: ${JSON.stringify(externalImports)}`);

// Supply the modified MPL source alongside the executable bundle. All other
// cubing.js source files remain available at the recorded original commit.
const adaptedSourceRoot = path.join(vendorRoot, "source");
await mkdir(adaptedSourceRoot, { recursive: true });
await writeFile(path.join(adaptedSourceRoot, "Cube3D.ts"), adaptedCubeSource);
await writeFile(path.join(adaptedSourceRoot, "README.md"), `# cubing.js display adaptation\n\nCube3D.ts is the sole adapted upstream source file in this bundle. It is supplied under MPL-2.0, matching the bundled LICENSE-MPL.md. Only its six face materials were recolored for the scanner's physical color arrangement. All move logic remains unchanged.\n\nThe complete unmodified source snapshot is preserved in the sibling cubing.js checkout at commit ${commit}, and is available from https://github.com/amanalex2006/cubing.js/tree/${commit}.\n\nRebuild with npm ci --prefix viewer followed by node scripts/build_viewer.mjs. The adaptation itself is recorded in that script.\n`);

const licenseRoot = path.join(vendorRoot, "licenses");
await mkdir(licenseRoot, { recursive: true });
for (const name of ["LICENSE-MPL.md", "LICENSE-GPL.md"]) {
  await copyFile(path.join(sourceRoot, name), path.join(licenseRoot, name));
}
for (const [packageName, licenseName] of [["three", "LICENSE"], ["random-uint-below", "LICENSE.md"]]) {
  await copyFile(path.join(viewerRoot, "node_modules", packageName, licenseName), path.join(licenseRoot, `${packageName.replaceAll("/", "-")}.txt`));
}
// lazy-promise 0.1.3 declares MIT in package.json but publishes no license file.
// Preserve its declared author and the standard MIT permission notice.
await writeFile(path.join(licenseRoot, "@cubing-lazy-promise.txt"), `@cubing/lazy-promise 0.1.3\nAuthor: Lucas Garron <code@garron.net>\nRepository: https://codeberg.org/cubing/lazy-promise\nDeclared license: MIT (package.json; this release contains no separate license file).\n\nMIT License\n\nCopyright (c) Lucas Garron\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n`);
const contents = await readFile(path.join(vendorRoot, "cubing.js"));
const upstream = {
  repository: "https://github.com/amanalex2006/cubing.js",
  upstreamRepository: "https://github.com/cubing/cubing.js",
  commit,
  version: sourcePackage.version,
  license: sourcePackage.license,
  selectedLicense: "MPL-2.0",
  attribution: "The js.cubing.net team and cubing.js contributors; cloned from amanalex2006/cubing.js.",
  build: "npm ci --prefix viewer; node scripts/build_viewer.mjs [path-to-cubing.js]",
  source: "Preserved sibling checkout ../cubing.js. No solver changes.",
  displayAdaptation: "Cube3D face material palette is adapted at build time to match Cube Studio's scanner. Source checkout is unchanged.",
  faceColors,
  sha256: createHash("sha256").update(contents).digest("hex"),
  bytes: contents.length,
  dependencies: Object.fromEntries(await Promise.all(["three", "@cubing/lazy-promise", "random-uint-below", "esbuild"].map(async (name) => {
    const value = JSON.parse(await readFile(path.join(viewerRoot, "node_modules", name, "package.json"), "utf8"));
    return [name, { version: value.version, license: value.license }];
  }))),
};
await writeFile(path.join(vendorRoot, "UPSTREAM.json"), `${JSON.stringify(upstream, null, 2)}\n`);
await writeFile(path.join(vendorRoot, "BUILD-INPUTS.json"), `${JSON.stringify({
  commit, sources: Object.keys(result.metafile.inputs).map((name) => name.replaceAll("\\", "/")),
  externalImports: [],
}, null, 2)}\n`);
console.log(`Offline cubing.js bundle: ${contents.length} bytes, commit ${commit}`);
