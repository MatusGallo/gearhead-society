## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Design

UI work follows the `design-taste-frontend` skill in `.claude/skills/` (from github.com/leonxlnx/taste-skill, MIT).
Visual direction: inspired by marathonthegame.com (Bungie). Project-specific decisions on top of the skill:

- Dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 5, VISUAL_DENSITY 5.
- Dark only, by brand choice. One accent: acid `#c0fe04`; `--color-violet` (#5200ff) only for rails and blocks.
  `/sommers` uses the same Marathon world with `data-theme="sommers"`, which swaps the accent to violet `#a98bff`.
  Sommers visuals are generated (`SommersPoster.astro`), never images taken from sommers.cz.
  Sommers has its own single ticket per meetup (the edition `price`, registration by e-mail), never Gearhead ticket
  tiers: on Sommers pages the header CTA reads `ui.ticket` and links to the next meetup's `#vstupenka` card.
- Photos are graded plates via `Visual.astro`: greyscale sources, toned in CSS (`tone` acid/violet duotone or mono,
  `fx` grain/dots/lines, `hover` tone/glitch), so the duotone follows `[data-theme]`. Subject matter is gear: tactical,
  uniforms, MX, boots, helmets; no readable faces of real service members, no weapons in focus. Until the event photos
  exist, CC0 stand-ins live in `src/assets/placeholder/` (use `ph()` / `placeholder()` from `src/data/placeholder.ts`,
  sources in `credits.tsv`), each used once on a page.
- Galleries: photos go in `src/assets/galleries/<slug>/` and are picked up by file name (`galleryPhotos()`); every shoot
  comes in one 1:1 format, so the grid is uniform (square tiles, `object-cover`), not masonry. The page builds webp thumbnails and a large view, the lightbox (`Lightbox.astro`) downloads the original. `demo: true`
  fills an empty gallery with placeholders; without photos the page shows empty boxes; `kind: "film"` takes `video`.
- `ScanField.astro` (canvas contour map) stays for the zone map band, Sommers and posters. The terrain is drawn in a
  Web Worker (`src/scripts/scan-worker.ts`, main-thread fallback) once per 1.4 s and crossfaded; keep per-frame work
  off the main thread and animate only transform/opacity on top of it (no `backdrop-filter` over the map).
  `animate={false}` for small tiles; it pauses off-screen, on its button and under reduced motion.
- Type: Archivo at 125% width (`.display`, stands in for Marathon's Shapiro) + Chivo Mono uppercase (`.mono`) for UI text.
- Reference-driven exceptions to the skill, used on purpose: vertical `rail` text, corner brackets (`.frame`),
  icon chips on media tiles (`.chip`), `+` marks, and the `HudRail.astro` glyph strip on hero rails (barcode, X,
  target square, rotated numerals, pixel glyph, vertical mono lines, tick ruler). Data readouts only ever show real
  event data, including the HudRail numerals and lines. The footer stencil band follows the same rule:
  `SpecPlate.astro` (cargo plate: numeral row, spec columns, notices, pixel glyph), `GlyphField.astro` (x/plus/dot
  field dissolving into a stepped accent block, seeded, `currentColor`) and `TagStrip.astro` (ink on accent vertical tag).
  All three take a `variant` (0..4, from `hudVariant()` like HudRail) so no two pages repeat the same field, tag or glyph;
  the footer uses offset 3 and seeds the field by path, a hero using the band on the same page takes another offset.
- Sharp corners everywhere (radius 0). Icons from `@phosphor-icons/core` via `src/components/Icon.astro`.
- No em or en dashes in visible text. Max one eyebrow label per three sections.
- Motion is CSS only and each section gets its own gesture, never one entrance everywhere (catalogue at the motion
  block in `global.css`): load `.hero-in` `.title-in` `.rule-draw` `.plate-fade` `.tune-in` (contact channels) (no scan line or boot flicker on hero photos); scroll-driven `.heading-in`
  `.wipe` `.settle` `.drift` `.parallax` `.boot-in` `.slide-in` `.reveal` `.surface` (footer wordmark) `.trace` (programme timeline rail fills down); click `.load-in`
  (load more past editions on `/sommers`: 3 per page, button bar fills, cards drop in behind an accent scan bar); hover `.frame`, tone, glitch.
  Load and scroll motion are off under reduced motion.
- Heroes: the contact page is a comms console (topics as TX channels with their mailto subjects, signal meter, address and reply time), never the generic `PageHero`. The events list (`/events`) has no photo, so it reads apart from the event pages: a departure board of every
  date with its sale state, a compact `Countdown` and `GlyphField` into `TagStrip` on the right. Photo heroes use `HeroPlate.astro` (no pointer lens or reticle; violet copy out of register,
  depth drift; its slot is in photo coordinates for `.track` detection boxes, as on the home hero). Sommers is an
  operations centre: `OpsLayer.astro` in the ScanField `world` slot (squad closing in, leader beam with T-minus,
  venue lock), pointer-steered tilt and the edition number as a giant outline. Both use `Pointer.astro` (`[data-pointer]` gives `--x/--y/--px/--py`, fine pointers only), a
  letter-by-letter `.char-in` wordmark and an acid HUD strip with real next-event data and a compact `Countdown`.
- The home hero cycles (`HeroCycle.astro`, markup contract in its header): photo, then a push-through cut (no flicker, no iris) swaps the date for the
  district, and `HeroOpsMap.astro` shows the real venue map (MapLibre, `mountOpsMap` in `venue-map.ts`) diving onto
  the venue while `OpsLayer run="cue" flat` replays the squad, lock and sprites; then it cuts back. The map loads in
  idle time a few seconds in, never on page load. The venue is held at 50% / 40% (30% on phones) via map padding, and
  `.hom-ops` shifts the OpsLayer lock onto it; change both together. One pause button; reduced motion keeps the photo.
  On the way down, map glyphs (triangles, rings, diamonds, slashed squares, blue lights) pop in by zoom and a few real
  buildings beside the venue rise as orange slabs. The flat OpsLayer has its own sequence, never the Sommers one: first the
  camera dives (5 s) with no squad on screen; once it lands (HeroOpsMap cues `[data-ops-run]`) three teams of
  triangles (SQ-A/B/C) come in on dashed routes from the city edge, meet at the lock and take one side each, the
  reticle contracts and the sprites turn up inside the lock. No cells in the lock. Photo phase 5 s; a click on the hero switches now (the only button is pause), and hovering the photo
  opens a lens onto the map (fine pointers). No scanlines or scan wipe on the home hero.
  Date and district share one spot (top left, same size), so the swap never jumps.

## Tickets, cookies, legal

- Gearhead tickets: "buy" goes to `ticketUrl` (external shop) when set, otherwise to the order page
  `/events/<slug>/tickets` (form: wave on sale, 1..`site.orders.maxPerOrder`, name, e-mail, 18+ and terms checks, then a
  confirmation with a numeric order number used as the variable symbol). It POSTs JSON to `site.orders.endpoint` when
  set, otherwise composes a prefilled e-mail. Sommers keeps its own e-mail registration.
- Cookies: `CookieConsent.astro` (in Layout) stores the choice in the `gh_consent` cookie; accept and reject have equal
  weight; footer "cookie settings" (`[data-consent-open]`) reopens it. Optional scripts load only after consent
  (`site.analytics`, `gh:consent` event). Everything stored or loaded from third parties is listed in
  `src/data/cookies.ts`, which drives `/cookies`; keep it true.
- Legal pages: `/terms`, `/privacy`, `/cookies`, `/imprint`; the operator comes from `site.operator` (placeholder until
  filled). Copy is a draft for legal review.

## Languages

Every page lives under `src/pages/[lang]/` and is built for `cs` and `en` (`src/i18n.ts`). `/` redirects by browser
language. Copy is stored as `{ cs, en }` pairs: shared UI strings in `ui` (i18n.ts), content in `src/data/*`, page-only
copy inline via `t({ cs, en })`. Any new text needs both languages.
