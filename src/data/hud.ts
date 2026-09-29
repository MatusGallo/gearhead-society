/**
 * Which HudRail arrangement each page uses, so the strip changes from page to page.
 * The hero takes the route's variant, the content rail on the same page a different one.
 */
const routes: Record<string, number> = {
  events: 4,
  galleries: 1,
  about: 2,
  contact: 3,
  "code-of-conduct": 0,
  privacy: 1,
  imprint: 2,
  sommers: 3,
  "id-card": 1,
};

/** Variant for a page path like /cs/galleries/pressure-2025; detail pages shift by one */
export function hudVariant(pathname: string, offset = 0) {
  const [, , section = "", detail] = pathname.split("/");
  return ((routes[section] ?? 0) + (detail ? 1 : 0) + offset) % 5;
}
