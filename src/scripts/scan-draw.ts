/**
 * Terrain renderer for ScanField. Pure canvas drawing, shared by the worker (OffscreenCanvas)
 * and the main-thread fallback. Draws one frame per call; the component crossfades frames,
 * so this runs about once a second instead of every animation frame.
 */
export type Ctx2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

// Small seeded 3D value noise; enough for smooth, slowly morphing terrain.
function makeNoise(seed: number) {
  const hash = (x: number, y: number, z: number) => {
    let n = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1274126177) ^ seed;
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  };
  const fade = (t: number) => t * t * (3 - 2 * t);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const n3 = (x: number, y: number, z: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = fade(x - xi), yf = fade(y - yi), zf = fade(z - zi);
    const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz);
    return lerp(
      lerp(lerp(c(0, 0, 0), c(1, 0, 0), xf), lerp(c(0, 1, 0), c(1, 1, 0), xf), yf),
      lerp(lerp(c(0, 0, 1), c(1, 0, 1), xf), lerp(c(0, 1, 1), c(1, 1, 1), xf), yf),
      zf,
    );
  };
  return (x: number, y: number, z: number) => n3(x, y, z) * 0.62 + n3(x * 2.1, y * 2.1, z) * 0.28 + n3(x * 4.3, y * 4.3, z) * 0.1;
}

export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)) >>> 0) / 4294967295;
}

type Marker = { x: number; y: number; kind: number };
type Box = { x0: number; y0: number; x1: number; y1: number };

export function createScene(seed: number, mark: string) {
  const noise = makeNoise(seed * 7919);
  let w = 0, h = 0;
  let markers: Marker[] = [];
  let dots: [number, number][] = [];
  let hubs: { x: number; y: number; r: number }[] = [];
  let blocks: { x: number; y: number; w: number; h: number }[] = [];
  let towers: { x: number; y: number; rx: number; ry: number; n: number }[] = [];

  const layout = (W: number, H: number) => {
    w = W;
    h = H;
    const r = rng(seed);
    const area = w * h;
    markers = Array.from({ length: Math.round(area / 16000) }, () => ({ x: r() * w, y: r() * h, kind: Math.floor(r() * 5) }));
    dots = Array.from({ length: Math.round(area / 22000) }, () => [r() * w, r() * h]);
    hubs = Array.from({ length: 2 }, () => ({ x: w * (0.2 + r() * 0.6), y: h * (0.25 + r() * 0.5), r: Math.min(w, h) * (0.1 + r() * 0.08) }));
    blocks = [{ x: w * (0.15 + r() * 0.2), y: h * (0.55 + r() * 0.2), w: w * 0.14, h: h * 0.1 }];
    // Stacked ring slices, the "scanned buildings" of the reference
    towers = Array.from({ length: 3 }, () => ({ x: w * (0.1 + r() * 0.8), y: h * (0.2 + r() * 0.6), rx: 14 + r() * 26, ry: 5 + r() * 7, n: 8 + Math.floor(r() * 10) }));
  };

  // Marching squares over the noise field, restricted to `box`; one path per contour level.
  // `lift` shifts each level upwards, stacking the slices into a layered 3D terrain.
  const contours = (ctx: Ctx2D, t: number, cs: number, levels: number, color: (l: number) => string, width: number, lift: number, box: Box) => {
    const i0 = Math.max(0, Math.floor(box.x0 / cs)), j0 = Math.max(0, Math.floor(box.y0 / cs));
    const cols = Math.min(Math.ceil(w / cs) + 1, Math.ceil(box.x1 / cs) + 1) - i0;
    const rows = Math.min(Math.ceil(h / cs) + 1, Math.ceil(box.y1 / cs) + 1) - j0;
    if (cols < 2 || rows < 2) return;
    const v = new Float32Array(cols * rows);
    const sc = 0.0062;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) v[j * cols + i] = noise((i + i0) * cs * sc, (j + j0) * cs * sc, t);
    ctx.lineWidth = width;
    for (let l = 1; l <= levels; l++) {
      const iso = 0.16 + (l / (levels + 1)) * 0.68;
      ctx.strokeStyle = color(l);
      ctx.beginPath();
      const dy = -l * lift;
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = v[j * cols + i], b = v[j * cols + i + 1], c = v[(j + 1) * cols + i + 1], d = v[(j + 1) * cols + i];
          const k = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
          if (k === 0 || k === 15) continue;
          const x = (i + i0) * cs, y = (j + j0) * cs + dy;
          const tx = x + cs * ((iso - a) / (b - a)), rx = x + cs, bx = x + cs * ((iso - d) / (c - d)), lx = x;
          const ty = y, ry = y + cs * ((iso - b) / (c - b)), by = y + cs, ly = y + cs * ((iso - a) / (d - a));
          switch (k) {
            case 1: case 14: ctx.moveTo(lx, ly); ctx.lineTo(bx, by); break;
            case 2: case 13: ctx.moveTo(bx, by); ctx.lineTo(rx, ry); break;
            case 3: case 12: ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); break;
            case 4: case 11: ctx.moveTo(tx, ty); ctx.lineTo(rx, ry); break;
            case 5: ctx.moveTo(lx, ly); ctx.lineTo(tx, ty); ctx.moveTo(bx, by); ctx.lineTo(rx, ry); break;
            case 6: case 9: ctx.moveTo(tx, ty); ctx.lineTo(bx, by); break;
            case 7: case 8: ctx.moveTo(lx, ly); ctx.lineTo(tx, ty); break;
            case 10: ctx.moveTo(lx, ly); ctx.lineTo(bx, by); ctx.moveTo(tx, ty); ctx.lineTo(rx, ry); break;
          }
        }
      }
      ctx.stroke();
    }
  };

  const drawMarker = (ctx: Ctx2D, m: Marker) => {
    const { x, y } = m;
    ctx.beginPath();
    if (m.kind === 0) ctx.rect(x - 5, y - 4, 10, 8);
    else if (m.kind === 1) { ctx.rect(x - 11, y - 4, 8, 7); ctx.rect(x + 1, y - 4, 8, 7); }
    else if (m.kind === 2) { ctx.moveTo(x, y - 6); ctx.lineTo(x + 7, y + 5); ctx.lineTo(x - 7, y + 5); ctx.closePath(); }
    else if (m.kind === 3) { ctx.arc(x, y, 6, 0, 6.29); ctx.moveTo(x + 2.5, y); ctx.arc(x, y, 2.5, 0, 6.29); }
    else { ctx.moveTo(x, y - 6); ctx.lineTo(x + 6, y); ctx.lineTo(x, y + 6); ctx.lineTo(x - 6, y); ctx.closePath(); }
    ctx.stroke();
  };

  const draw = (ctx: Ctx2D, t: number) => {
    ctx.clearRect(0, 0, w, h);
    const all = { x0: 0, y0: 0, x1: w, y1: h + 40 };
    // Terrain
    contours(ctx, t, 8, 22, (l) => `rgba(${92 + l * 4}, ${30 + l * 2}, 255, ${0.42 + (l / 22) * 0.5})`, 1.3, 1.6, all);
    // Ring stacks
    ctx.lineWidth = 1;
    for (const tw of towers) {
      ctx.beginPath();
      for (let k = 0; k < tw.n; k++) {
        const s = 1 + 0.08 * Math.sin(t * 3 + k * 0.7);
        ctx.moveTo(tw.x + tw.rx * s, tw.y - k * 4.5);
        ctx.ellipse(tw.x, tw.y - k * 4.5, tw.rx * s, tw.ry, 0, 0, 6.29);
      }
      ctx.strokeStyle = "rgba(130, 70, 255, 0.75)";
      ctx.stroke();
    }
    // Orange structures: the same field, denser, only computed inside each hub
    for (const hub of hubs) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, hub.r, 0, 6.29);
      ctx.clip();
      contours(ctx, t * 1.6 + 3, 5, 12, (l) => `rgba(255, ${90 + l * 6}, 40, ${0.45 + l * 0.04})`, 1, 1.4, { x0: hub.x - hub.r, y0: hub.y - hub.r, x1: hub.x + hub.r, y1: hub.y + hub.r + 20 });
      ctx.restore();
    }
    // Extruded wireframe block
    ctx.strokeStyle = "rgba(255, 110, 45, 0.7)";
    ctx.lineWidth = 1;
    for (const b of blocks) {
      for (let k = 0; k < 9; k++) ctx.strokeRect(b.x + k * 1.5, b.y - k * 4, b.w, b.h);
      ctx.beginPath();
      for (let gx = 1; gx < 6; gx++) { ctx.moveTo(b.x + (b.w / 6) * gx, b.y); ctx.lineTo(b.x + (b.w / 6) * gx, b.y + b.h); }
      ctx.stroke();
    }
    // Lights and markers
    ctx.fillStyle = "rgba(210, 225, 255, 0.85)";
    for (const [x, y] of dots) ctx.fillRect(x, y, 3, 2);
    ctx.strokeStyle = mark;
    ctx.lineWidth = 1.4;
    ctx.globalAlpha = 0.9;
    for (const m of markers) drawMarker(ctx, m);
    ctx.globalAlpha = 1;
  };

  return { layout, draw };
}

/** Terrain time advance per second; slow enough that crossfaded frames read as a morph */
export const DRIFT = 0.07;
/** Milliseconds between terrain frames (and the crossfade length) */
export const STEP = 1400;
