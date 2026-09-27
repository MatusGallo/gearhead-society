# Gearhead Society

Website for the Gearhead Society event series. Built with [Astro](https://astro.build) + Tailwind CSS v4, static output.

## Commands

| Command           | Action                              |
| ----------------- | ----------------------------------- |
| `npm install`     | Install dependencies                |
| `npm run dev`     | Dev server at `localhost:4321`      |
| `npm run build`   | Build the static site to `./dist/`  |
| `npm run preview` | Preview the build locally           |

## Where things live

- `src/data/site.ts` — name, e-mail, socials, navigation
- `src/data/events.ts` — events (dates, lineup, tickets, dress code)
- `src/data/galleries.ts` — photo galleries
- `src/data/sommers.ts` — Sommers editions (srazy + setkání) and shared rules, in Czech and English; pages under
  `/sommers` use `data-theme="sommers"` (violet accent) from `global.css`
- `src/styles/global.css` — colours, fonts and shared styles (`@theme` tokens)
- `src/components/` — Header, Footer, cards, countdown, `Visual` image slot
- `src/pages/[lang]/` — routes, built for `/cs/…` and `/en/…` (`src/i18n.ts` holds shared UI strings)

## Before launch

- `src/data/site.ts`: fill in `operator` (imprint, terms, privacy), set `orders.endpoint` if orders should not go by
  e-mail, set `analytics.src` if you want statistics (then add its cookies to `src/data/cookies.ts`), real social links.
- Have `/terms`, `/privacy` and `/cookies` reviewed by a lawyer.
- The domain lives in `astro.config.mjs` (`site`, sitemap) and `site.url`; `public/robots.txt` points to the sitemap.

## Images

Put event photos in `public/images/…` and reference them by path, e.g. `image: "/images/events/pressure.jpg"`.
Anything without an image shows the generated scan-map visual.

Gallery photos go in `src/assets/galleries/<slug>/` (one folder per gallery, see the README there). They appear in
file-name order; the site builds thumbnails and a large view, and the lightbox download serves the original file.
A gallery with no photos shows placeholder boxes and a Discord link.

Photos are shown as graded plates (`src/components/Visual.astro`): export them greyscale with deep blacks and the site
tones them (acid or violet duotone, grain, dot screen).

`src/assets/placeholder/` holds CC0 stock stand-ins (tactical, uniforms, MX) until real event photos exist; sources
and licences are in `credits.tsv` there. Galleries marked `demo: true` use them too. Replace them before launch.

All copy is `{ cs, en }`: add both languages when editing data.

Note: which events count as "upcoming" is decided at build time — rebuild after an event has passed.
