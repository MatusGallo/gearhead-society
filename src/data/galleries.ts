import type { ImageMetadata } from "astro";
import { ph, placeholderSet } from "./placeholder";

export type GalleryKind = "photos" | "wall" | "shoot" | "film";

export type Gallery = {
  slug: string;
  /** Proper name, same in both languages */
  title: string;
  date: string;
  kind: GalleryKind;
  /** Cover image URL; defaults to the first photo */
  cover?: string;
  /** Aftermovie embed URL (YouTube/Vimeo "embed" link), for kind "film" */
  video?: string;
  /**
   * TODO: remove once real photos are in. Fills an empty gallery with the placeholder set so
   * the grid and the lightbox can be reviewed.
   */
  demo?: boolean;
  hue: number;
  /** Slug of the Sommers edition the gallery belongs to; kept off the Gearhead lists, shown on that edition */
  sommers?: string;
};

/**
 * Photos live in src/assets/galleries/<slug>/ (see the README there) and are picked up
 * automatically, in file-name order.
 */
const files = import.meta.glob<ImageMetadata>("../assets/galleries/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG}", { eager: true, import: "default" });

export function galleryPhotos(g: Gallery): ImageMetadata[] {
  const own = Object.keys(files)
    .filter((path) => path.split("/").at(-2) === g.slug)
    .sort()
    .map((path) => files[path]);
  if (own.length || !g.demo) return own;
  // Rotate the placeholder set per gallery so the demo galleries do not all look the same
  const start = g.hue % placeholderSet.length;
  return [...placeholderSet.slice(start), ...placeholderSet.slice(0, start)];
}

export const galleryCover = (g: Gallery) => g.cover ?? galleryPhotos(g)[0]?.src;

// TODO: ph() covers are CC0 stock stand-ins until the real photos are in
export const galleries: Gallery[] = [
  { slug: "pressure-2025", cover: ph("boots-row"), title: "Pressure 2025", date: "2025-11-15", kind: "photos", demo: true, hue: 72 },
  { slug: "pressure-2025-wall", cover: ph("reflective"), title: "Pressure 2025", date: "2025-11-15", kind: "wall", demo: true, hue: 90 },
  { slug: "pride-gear-2026", cover: ph("mx-roost"), title: "Pride Gear 2026", date: "2026-06-13", kind: "photos", demo: true, hue: 320 },
  // Left without photos on purpose: shows the "in progress" state
  { slug: "summer-grease-2026", cover: ph("boots-desert"), title: "Summer Grease 2026", date: "2026-08-08", kind: "shoot", hue: 28 },
  { slug: "frostbite-2026", cover: ph("mx-pair"), title: "Frostbite 2026", date: "2026-01-24", kind: "photos", demo: true, hue: 200 },
  { slug: "frostbite-2026-film", cover: ph("comms"), title: "Frostbite 2026", date: "2026-01-24", kind: "film", hue: 220 },
].sort((a, b) => b.date.localeCompare(a.date)) as Gallery[];

// Sommers meetups, one gallery per past edition (demo until the photographer delivers)
export const sommersGalleries: Gallery[] = [
  { slug: "sommers-tuklaty-2026", sommers: "oralni-odpoledne-tuklaty", title: "Sommers Tuklaty 2026", date: "2026-06-06", kind: "photos", demo: true, hue: 262 },
  { slug: "sommers-48", sommers: "48-sraz-berounkovani-po-nasem", title: "Sommers 48", date: "2026-05-29", kind: "photos", demo: true, hue: 248 },
  { slug: "sommers-holedna-2026", sommers: "jarni-vabeni-xii", title: "Sommers Holedná 2026", date: "2026-04-11", kind: "photos", demo: true, hue: 275 },
  { slug: "sommers-47", sommers: "47-sraz-radostne-vanoce-a-rozverny-silvestr", title: "Sommers 47", date: "2026-02-06", kind: "photos", demo: true, hue: 240 },
];

export const editionGalleries = (edition: string) => sommersGalleries.filter((g) => g.sommers === edition);
