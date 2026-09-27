/**
 * MapLibre map for VenueMap.astro, loaded only when the section nears the viewport.
 * Vector tiles from OpenFreeMap (OpenMapTiles schema), restyled into the site palette:
 * black ground, violet water and main roads, grey streets, mono-ish labels.
 */
import { Map as MLMap, setWorkerUrl, type StyleSpecification } from "maplibre-gl";
// Vite bundles the tile worker with its shared chunk into one file
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl(workerUrl);

const C = {
  ink: "#070707",
  coal: "#111111",
  steel: "#1c1c1c",
  line: "#2e2e2e",
  mute: "#8c8c8c",
  bone: "#f2f2f2",
  violet: "#5200ff",
  violetDeep: "#140a3a",
  violetMid: "#3a1fa0",
};

const font = ["Noto Sans Regular"];

/** Roads fade out while zooming out past city scale, so the country view shows only borders and towns */
const roadFade = ["interpolate", ["linear"], ["zoom"], 7, 0, 8.5, 1] as any;

function style(lang: string): StyleSpecification {
  const name = ["coalesce", ["get", `name:${lang}`], ["get", "name"]] as any;
  const label = {
    "text-color": C.mute,
    "text-halo-color": C.ink,
    "text-halo-width": 1.4,
  };
  return {
    version: 8,
    glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
    sources: { omt: { type: "vector", url: "https://tiles.openfreemap.org/planet" } },
    layers: [
      { id: "bg", type: "background", paint: { "background-color": C.ink } },
      { id: "park", type: "fill", source: "omt", "source-layer": "park", paint: { "fill-color": C.violet, "fill-opacity": 0.06 } },
      {
        id: "landuse",
        type: "fill",
        source: "omt",
        "source-layer": "landuse",
        filter: ["in", ["get", "class"], ["literal", ["industrial", "railway", "commercial", "retail"]]],
        paint: { "fill-color": C.coal },
      },
      { id: "water", type: "fill", source: "omt", "source-layer": "water", paint: { "fill-color": C.violetDeep } },
      {
        id: "waterway",
        type: "line",
        source: "omt",
        "source-layer": "waterway",
        paint: { "line-color": C.violetDeep, "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.5, 16, 3] },
      },
      {
        id: "building",
        type: "fill",
        source: "omt",
        "source-layer": "building",
        minzoom: 13,
        paint: { "fill-color": "#0e0f0a", "fill-outline-color": "rgba(192, 254, 4, 0.22)" },
      },
      {
        id: "rail",
        type: "line",
        source: "omt",
        "source-layer": "transportation",
        filter: ["==", ["get", "class"], "rail"],
        paint: { "line-color": C.line, "line-opacity": roadFade, "line-width": 1, "line-dasharray": [3, 2] },
      },
      {
        id: "road-minor",
        type: "line",
        source: "omt",
        "source-layer": "transportation",
        minzoom: 12,
        filter: ["in", ["get", "class"], ["literal", ["minor", "service", "tertiary", "path", "track"]]],
        paint: { "line-color": C.line, "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.4, 17, 4] },
      },
      {
        id: "road-mid",
        type: "line",
        source: "omt",
        "source-layer": "transportation",
        minzoom: 8,
        filter: ["in", ["get", "class"], ["literal", ["primary", "secondary"]]],
        paint: { "line-color": C.violetMid, "line-opacity": roadFade, "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.4, 17, 7] },
      },
      {
        id: "road-major",
        type: "line",
        source: "omt",
        "source-layer": "transportation",
        filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk"]]],
        paint: { "line-color": C.violet, "line-opacity": roadFade, "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0.6, 17, 9] },
      },
      {
        id: "border",
        type: "line",
        source: "omt",
        "source-layer": "boundary",
        filter: ["all", ["==", ["get", "admin_level"], 2], ["!=", ["get", "maritime"], 1]],
        paint: {
          "line-color": "#c0fe04",
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.8, 12, 0.3],
          "line-width": ["interpolate", ["linear"], ["zoom"], 5, 1.4, 12, 1],
          "line-dasharray": [4, 2],
        },
      },
      {
        id: "street-name",
        type: "symbol",
        source: "omt",
        "source-layer": "transportation_name",
        minzoom: 14,
        layout: {
          "symbol-placement": "line",
          "text-field": name,
          "text-font": font,
          "text-size": 11,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.08,
        },
        paint: label,
      },
      {
        id: "water-name",
        type: "symbol",
        source: "omt",
        "source-layer": "water_name",
        layout: { "text-field": name, "text-font": font, "text-size": 12, "text-transform": "uppercase", "text-letter-spacing": 0.2 },
        paint: { ...label, "text-color": "#7d6bd6" },
      },
      {
        id: "place",
        type: "symbol",
        source: "omt",
        "source-layer": "place",
        filter: ["in", ["get", "class"], ["literal", ["country", "city", "town", "suburb", "quarter", "neighbourhood"]]],
        layout: {
          "text-field": name,
          "text-font": font,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.14,
          "text-size": ["match", ["get", "class"], "country", 15, "city", 14, "town", 12, 11],
        },
        paint: { ...label, "text-color": ["match", ["get", "class"], ["country", "city"], C.bone, C.mute] },
      },
    ],
  };
}

export type Level = { key: string; zoom: number };

/**
 * Every level stays centred on the venue, so the HUD crosshair in the middle of the frame is
 * always on target and only the scale changes.
 */
export function mountVenueMap(opts: {
  container: HTMLElement;
  venue: [number, number];
  level: Level;
  lang: string;
  onView: (zoom: number, moving: boolean) => void;
}) {
  const map = new MLMap({
    container: opts.container,
    style: style(opts.lang),
    center: opts.venue,
    zoom: opts.level.zoom,
    interactive: false,
    attributionControl: false,
    fadeDuration: 0,
  });
  const report = (moving: boolean) => opts.onView(map.getZoom(), moving);
  map.once("load", () => {
    opts.container.setAttribute("data-ready", "");
    report(false);
  });
  map.on("move", () => report(true));
  map.on("moveend", () => report(false));

  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  return (level: Level) => {
    map.stop();
    if (reduce.matches) map.jumpTo({ center: opts.venue, zoom: level.zoom });
    else map.flyTo({ center: opts.venue, zoom: level.zoom, duration: 1600, curve: 1.4, essential: false });
  };
}

/**
 * Marathon map glyphs for the hero feed, drawn once into sprites: acid triangle, ring, diamond,
 * slashed square, and a pale blue light.
 */
function addGlyphs(map: MLMap) {
  const r = 2;
  const size = 24;
  const draw = (name: string, paint: (g: CanvasRenderingContext2D) => void) => {
    const c = document.createElement("canvas");
    c.width = c.height = size * r;
    const g = c.getContext("2d")!;
    g.scale(r, r);
    g.lineWidth = 2;
    g.strokeStyle = "#c0fe04";
    g.fillStyle = "#c0fe04";
    paint(g);
    map.addImage(name, g.getImageData(0, 0, c.width, c.height), { pixelRatio: r });
  };
  const path = (g: CanvasRenderingContext2D, pts: number[][]) => {
    g.beginPath();
    pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    g.closePath();
    g.stroke();
  };
  draw("tri", (g) => path(g, [[12, 5], [20, 19], [4, 19]]));
  draw("dia", (g) => path(g, [[12, 5], [19, 12], [12, 19], [5, 12]]));
  draw("ring", (g) => {
    g.beginPath();
    g.arc(12, 12, 7, 0, Math.PI * 2);
    g.stroke();
    g.beginPath();
    g.arc(12, 12, 2.5, 0, Math.PI * 2);
    g.fill();
  });
  draw("sq", (g) => {
    g.strokeRect(6, 7, 12, 10);
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(8, 15);
    g.lineTo(16, 9);
    g.stroke();
  });
  draw("glow", (g) => {
    g.shadowColor = "rgb(160 185 255 / 0.9)";
    g.shadowBlur = 7;
    g.fillStyle = "#dfe6ff";
    g.fillRect(7, 10, 10, 4);
  });
}

type TileFeature = ReturnType<MLMap["querySourceFeatures"]>[number];

/** Scatter of glyphs around the venue, the same on every visit; `b` is the wave it pops in with */
function glyphField(venue: [number, number]) {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const kinds = ["sq", "sq", "sq", "tri", "tri", "dia", "dia", "ring", "glow", "glow", "glow"];
  const mLat = 1 / 111320;
  const mLon = mLat / Math.cos((venue[1] * Math.PI) / 180);
  return {
    type: "FeatureCollection" as const,
    features: Array.from({ length: 56 }, (_, i) => {
      // A clear ring around the lock, thinning out toward the edge
      const d = 170 + Math.sqrt(rnd()) * 1250;
      const a = rnd() * Math.PI * 2;
      return {
        type: "Feature" as const,
        properties: { k: kinds[Math.floor(rnd() * kinds.length)], b: i % 3 },
        geometry: { type: "Point" as const, coordinates: [venue[0] + Math.cos(a) * d * mLon, venue[1] + Math.sin(a) * d * mLat] },
      };
    }),
  };
}

/**
 * A handful of real buildings around the venue (the venue itself first), taken from the loaded
 * tiles and re-drawn as orange stacked slabs, like the Marathon structures.
 */
function hotBuildings(features: TileFeature[], venue: [number, number]) {
  const mLon = 111320 * Math.cos((venue[1] * Math.PI) / 180);
  const seen = new Set<string>();
  const found: { f: TileFeature; area: number; dist: number; dy: number }[] = [];
  for (const f of features) {
    const g = f.geometry;
    const ring: number[][] | null = g.type === "Polygon" ? g.coordinates[0] : g.type === "MultiPolygon" ? g.coordinates[0][0] : null;
    if (!ring) continue;
    const pts = ring.map(([x, y]) => [(x - venue[0]) * mLon, (y - venue[1]) * 111320]);
    let area = 0;
    let cx = 0;
    let cy = 0;
    pts.forEach(([x, y], i) => {
      const [x2, y2] = pts[(i + 1) % pts.length];
      area += x * y2 - x2 * y;
      cx += x / pts.length;
      cy += y / pts.length;
    });
    // Tiles repeat a building cut at their edges; one per spot
    const key = `${Math.round(cx / 4)}:${Math.round(cy / 4)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    area = Math.abs(area) / 2;
    const dist = Math.hypot(cx, cy);
    if (area > 400 && dist < 520) found.push({ f, area, dist, dy: cy });
  }
  const venueBuilding = found.filter((b) => b.dist < 90).sort((a, b) => b.area - a.area)[0];
  const others = found
    // Beside the venue rather than far behind it (off the top of the tilted view) or under the headline
    .filter((b) => b.dist > 150 && Math.abs(b.dy) < 220)
    .sort((a, b) => b.area - a.area)
    .filter((_, i) => i % 2 === 0)
    .slice(0, 3);
  const slabs = [venueBuilding, ...others].filter(Boolean).flatMap(({ f }) => {
    const h = Math.min(60, Math.max(12, (Number(f.properties?.render_height) || 10) * 1.6));
    return Array.from({ length: Math.floor(h / 3.2) }, (_, i) => ({
      type: "Feature" as const,
      properties: { b: i * 3.2, t: i * 3.2 + 0.7 },
      geometry: f.geometry,
    }));
  });
  return { type: "FeatureCollection" as const, features: slabs };
}

/**
 * Hero variant (HeroOpsMap.astro): the same styled map as a camera the hero cycle drives.
 * Starts centred on the venue so its tiles are cached, then idles until a flight is asked for.
 * Renders only while moving; pixel ratio is capped so wide screens stay smooth.
 * On the way down the feed fills in: glyphs pop in three waves, then orange structures rise.
 */
export function mountOpsMap(opts: { container: HTMLElement; venue: [number, number]; lang: string; onReady?: () => void }) {
  const map = new MLMap({
    container: opts.container,
    style: style(opts.lang),
    center: opts.venue,
    zoom: 16.3,
    pitch: 55,
    bearing: -18,
    interactive: false,
    attributionControl: false,
    fadeDuration: 0,
    pixelRatio: Math.min(devicePixelRatio || 1, 1.25),
  });
  // The venue sits in the upper half, clear of the headline; HeroOpsMap shifts its lock to match
  const lift = () => map.setPadding({ top: 0, right: 0, left: 0, bottom: opts.container.clientHeight * (opts.container.clientWidth < 640 ? 0.4 : 0.2) });
  lift();
  // A flight or peek asked for before the first idle skips the warm-up jump below; otherwise
  // that jump would yank the camera back out to the city once the first flight lands
  let asked = false;
  let ready = false;
  let flights = 0;
  const markReady = () => {
    if (ready) return;
    ready = true;
    opts.container.setAttribute("data-ready", "");
    opts.onReady?.();
  };
  const show = () => (map.isStyleLoaded() ? markReady() : map.once("load", markReady));
  map.once("load", () => {
    addGlyphs(map);
    map.addSource("glyphs", { type: "geojson", data: glyphField(opts.venue) });
    [12.6, 13.4, 14.2].forEach((z, b) =>
      map.addLayer({
        id: `glyphs-${b}`,
        type: "symbol",
        source: "glyphs",
        filter: ["==", ["get", "b"], b],
        layout: {
          "icon-image": ["get", "k"],
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "icon-size": ["interpolate", ["linear"], ["zoom"], 12, 0.7, 16, 1.1],
        },
        paint: { "icon-opacity": ["step", ["zoom"], 0, z, 1] },
      }),
    );
  });
  map.once("idle", () => {
    // The venue's surroundings are loaded now: pick the orange structures from them
    const hot = hotBuildings(map.querySourceFeatures("omt", { sourceLayer: "building" }), opts.venue);
    map.addSource("hot", { type: "geojson", data: hot });
    map.addLayer(
      {
        id: "hot",
        type: "fill-extrusion",
        source: "hot",
        minzoom: 13.5,
        paint: {
          "fill-extrusion-color": "#ff6a2d",
          "fill-extrusion-base": ["get", "b"],
          "fill-extrusion-height": ["get", "t"],
          "fill-extrusion-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 15.2, 0.6],
        },
      },
      "glyphs-0",
    );
    if (asked) return markReady();
    // Warm the city-scale tiles too, so the opening wide shot of each flight is ready
    map.jumpTo({ zoom: 11.2, pitch: 0, bearing: 0 });
    map.once("idle", markReady);
  });
  return {
    /** Wide shot over the city, then dive onto the venue, tilted like a drone feed; `onLand`
     * runs when this flight ends (also if it is stopped, e.g. by the pause button) */
    approach(duration: number, onLand?: () => void) {
      asked = true;
      show();
      const flight = ++flights;
      map.stop();
      lift();
      map.jumpTo({ center: opts.venue, zoom: 11.2, pitch: 0, bearing: 0 });
      map.flyTo({ center: opts.venue, zoom: 16.3, pitch: 55, bearing: -18, duration, curve: 1.3, essential: true });
      map.once("moveend", () => flight === flights && onLand?.());
    },
    /** Still close-up of the venue for the hover lens, unless a flight is on */
    peek() {
      asked = true;
      show();
      if (map.isMoving()) return;
      lift();
      map.jumpTo({ center: opts.venue, zoom: 16.3, pitch: 55, bearing: -18 });
    },
    stop: () => map.stop(),
  };
}
