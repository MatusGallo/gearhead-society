import type { ImageMetadata } from "astro";
import { ph, placeholderSet, type Photo } from "./placeholder";

export type GalleryKind = "photos" | "wall" | "shoot" | "film";

export type Gallery = {
  slug: string;
  /** Proper name, same in both languages */
  title: string;
  date: string;
  kind: GalleryKind;
  /** Cover photo; defaults to the first photo */
  cover?: Photo;
  /** Aftermovie embed URL (YouTube/Vimeo "embed" link), for kind "film" */
  video?: string;
  /**
   * TODO: remove once real photos are in. Fills an empty gallery with the placeholder set so
   * the grid and the lightbox can be reviewed.
   */
  demo?: boolean;
  hue: number;
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

export const galleryCover = (g: Gallery) => g.cover ?? galleryPhotos(g)[0];

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

