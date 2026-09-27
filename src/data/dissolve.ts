// Pixels breaking off a `.tix` block (violet unless `fill` says otherwise). Density falls with distance from the block edge; a fixed seed keeps
// the pattern identical on every build. The tile repeats down the block, passed in as `--dl` / `--dr`.
export function dissolve(seed: number, flip: boolean, fill = "#5200ff") {
  const cols = 18, rows = 20, cell = 5, px = 5;
  let a = seed;
  const rand = () => ((a = (a * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  let rects = "";
  for (let c = 0; c < cols; c++) {
    const p = (1 - c / cols) ** 2.2;
    for (let r = 0; r < rows; r++) {
      if (rand() < p) rects += `<rect x="${(flip ? cols - 1 - c : c) * cell}" y="${r * cell}" width="${px}" height="${px}"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * cell}" height="${rows * cell}" fill="${fill}">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// The same break-up running vertically. Default: a mask band for the bottom edge of a block (`.dissolve-b`, `--db`).
// The tile repeats across; density falls away from the block (downwards, or upwards with `up`). With `fill` it is
// drawn instead of masked, e.g. the violet pixels above and below a `.tix` block (`--dt` / `--dbm`).
export function dissolveDown(seed: number, { rows = 24, cell = 6, fill = "#000", up = false, falloff = 1.8 } = {}) {
  const cols = Math.round(384 / cell);
  let a = seed;
  const rand = () => ((a = (a * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  let rects = "";
  for (let r = 0; r < rows; r++) {
    const p = (1 - r / rows) ** falloff;
    const y = (up ? rows - 1 - r : r) * cell;
    for (let c = 0; c < cols; c++) {
      if (rand() < p) rects += `<rect x="${c * cell}" y="${y}" width="${cell}" height="${cell}"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * cell}" height="${rows * cell}" fill="${fill}">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
