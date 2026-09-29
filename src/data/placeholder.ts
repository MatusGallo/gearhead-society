import type { ImageMetadata } from "astro";

/**
 * TODO: CC0 stock stand-ins (tactical, uniforms, MX) until real event photos exist.
 * Sources and licences: src/assets/placeholder/credits.tsv. Replace before launch.
 */
const files = import.meta.glob<ImageMetadata>("../assets/placeholder/*.jpg", { eager: true, import: "default" });
const byName = Object.fromEntries(Object.entries(files).map(([path, meta]) => [path.split("/").pop()!.replace(/\.jpg$/, ""), meta]));

/** A placeholder photo by file name; image slots build responsive webp from it */
export function ph(name: string): ImageMetadata {
  const meta = byName[name];
  if (!meta) throw new Error(`Unknown placeholder photo: ${name}`);
  return meta;
}

export const placeholderSet: ImageMetadata[] = Object.keys(byName).sort().map((k) => byName[k]);

/** What an image slot takes: an imported photo (optimised at build) or a plain URL */
export type Photo = ImageMetadata | string;
