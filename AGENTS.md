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
Project-specific decisions on top of it:

- Dials: DESIGN_VARIANCE 7, MOTION_INTENSITY 5, VISUAL_DENSITY 4.
- Dark only, by brand choice (nightlife). Main accent is acid `--color-acid`; `/sommers` pages use `data-theme="sommers"`
  with the purple sommers.cz palette, including its light lavender content panels.
- Sharp corners everywhere (radius 0). Icons from `@phosphor-icons/core` via `src/components/Icon.astro`.
- No em or en dashes in visible text. Max one eyebrow label per three sections.
- Motion is CSS only: `.hero-in` (load stagger, `--i` per child) and `.reveal` (scroll-driven), both off under reduced motion.
