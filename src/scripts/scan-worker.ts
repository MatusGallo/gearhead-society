/**
 * Draws every ScanField on the page off the main thread. Each field hands over one canvas
 * (still) or two (animated). Animated fields render the next terrain frame into the hidden
 * canvas, then tell the page to crossfade to it.
 */
import { createScene, DRIFT, STEP } from "./scan-draw";

type Field = {
  canvases: OffscreenCanvas[];
  scene: ReturnType<typeof createScene>;
  dpr: number;
  t: number;
  front: number;
  animated: boolean;
  visible: boolean;
  paused: boolean;
  timer: number;
};

const fields = new Map<number, Field>();

const render = (f: Field, index: number) => {
  const c = f.canvases[index];
  const ctx = c.getContext("2d")!;
  ctx.setTransform(f.dpr, 0, 0, f.dpr, 0, 0);
  f.scene.draw(ctx, f.t);
};

const schedule = (id: number, f: Field) => {
  clearTimeout(f.timer);
  if (!f.animated || !f.visible || f.paused) return;
  f.timer = setTimeout(() => {
    f.t += (STEP / 1000) * DRIFT;
    const back = 1 - f.front;
    render(f, back);
    f.front = back;
    // Let the drawn frame commit to the page before the crossfade starts
    setTimeout(() => postMessage({ id, front: back }), 40);
    schedule(id, f);
  }, STEP) as unknown as number;
};

const resize = (f: Field, w: number, h: number, dpr: number) => {
  f.dpr = dpr;
  for (const c of f.canvases) {
    c.width = Math.max(1, Math.round(w * dpr));
    c.height = Math.max(1, Math.round(h * dpr));
  }
  f.scene.layout(w, h);
  f.canvases.forEach((_, i) => render(f, i));
};

onmessage = (e: MessageEvent) => {
  const m = e.data;
  if (m.type === "init") {
    const f: Field = {
      canvases: m.canvases,
      scene: createScene(m.seed, m.mark),
      dpr: m.dpr,
      t: m.seed * 0.37,
      front: 0,
      animated: m.animated,
      visible: false,
      paused: false,
      timer: 0,
    };
    fields.set(m.id, f);
    resize(f, m.w, m.h, m.dpr);
    return;
  }
  const f = fields.get(m.id);
  if (!f) return;
  if (m.type === "resize") resize(f, m.w, m.h, m.dpr);
  if (m.type === "visible") f.visible = m.value;
  if (m.type === "paused") f.paused = m.value;
  schedule(m.id, f);
};
