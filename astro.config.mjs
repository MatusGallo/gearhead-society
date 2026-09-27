// @ts-check
// @ts-ignore: no @types/node in this project
import { writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Canonical origin, keep in sync with `site.url` in src/data/site.ts
const origin = 'https://gearheadsociety.com';

/** Writes sitemap.xml from the built pages (language pages only, no redirect or 404), with hreflang pairs */
const sitemap = () => ({
  name: 'sitemap',
  hooks: {
    /** @param {{ pages: { pathname: string }[], dir: URL }} opts */
    'astro:build:done': async ({ pages, dir }) => {
      const paths = pages
        .map((p) => '/' + p.pathname)
        .filter((p) => /^\/(cs|en)(\/|$)/.test(p))
        .map((p) => (p.endsWith('/') ? p : p + '/'))
        .sort();
      /** @param {string} p */
      const alt = (p) =>
        ['cs', 'en']
          .map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${origin}${p.replace(/^\/(cs|en)/, '/' + l)}"/>`)
          .join('');
      const urls = paths.map((p) => `<url><loc>${origin}${p}</loc>${alt(p)}</url>`).join('\n');
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
      await writeFile(new URL('sitemap.xml', dir), xml);
    },
  },
});

// https://astro.build/config
export default defineConfig({
  site: origin,
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
