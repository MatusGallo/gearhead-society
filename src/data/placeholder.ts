import type { ImageMetadata } from "astro";

/**
 * TODO: CC0 stock stand-ins (tactical, uniforms, MX) until real event photos exist.
 * Sources and licences: src/assets/placeholder/credits.tsv. Replace before launch.
 */
const files = import.meta.glob<ImageMetadata>("../assets/placeholder/*.jpg", { eager: true, import: "default" });
const byName = Object.fromEntries(Object.entries(files).map(([path, meta]) => [path.split("/").pop()!.replace(/\.jpg$/, ""), meta]));

export function placeholder(name: string): ImageMetadata {
  const meta = byName[name];
  if (!meta) throw new Error(`Unknown placeholder photo: ${name}`);
  return meta;
}

/** URL of a placeholder photo, for image slots that take a path */
export const ph = (name: string) => placeholder(name).src;

export const placeholderSet: ImageMetadata[] = Object.keys(byName).sort().map((k) => byName[k]);
