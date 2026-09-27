import type { L } from "../i18n";
import { site } from "./site";

/**
 * Everything the site stores in the browser or loads from third parties, shown on /cookies and summarised in the
 * banner (CookieConsent.astro). Keep it true: add a row whenever a script starts storing something.
 */
export type ConsentCategory = "necessary" | "analytics";

export const consentCookie = { name: "gh_consent", days: 180, version: 1 };

export const categories: { id: ConsentCategory; name: L; text: L; required?: boolean }[] = [
  {
    id: "necessary",
    required: true,
    name: { cs: "Nezbytné", en: "Necessary" },
    text: {
      cs: "Bez nich web nefunguje: pamatují si tvoji volbu cookies a načítají mapu místa konání. Nejdou vypnout.",
      en: "The site needs these to work: they remember your cookie choice and load the venue map. They cannot be switched off.",
    },
  },
  {
    id: "analytics",
    name: { cs: "Statistiky", en: "Statistics" },
    text: {
      cs: "Anonymní počty návštěv, abychom věděli, které stránky lidé čtou. Bez reklamy a bez sledování napříč weby.",
      en: "Anonymous visit counts, so we know which pages people read. No advertising and no cross-site tracking.",
    },
  },
];

export type StoredItem = {
  name: string;
  category: ConsentCategory;
  provider: string;
  kind: L;
  purpose: L;
  expiry: L;
};

export const stored: StoredItem[] = [
  {
    name: consentCookie.name,
    category: "necessary",
    provider: site.name,
    kind: { cs: "Cookie, první strana", en: "Cookie, first party" },
    purpose: { cs: "Uloží tvoji volbu kategorií cookies.", en: "Stores which cookie categories you allowed." },
    expiry: { cs: `${consentCookie.days} dní`, en: `${consentCookie.days} days` },
  },
  {
    name: "tiles.openfreemap.org",
    category: "necessary",
    provider: "OpenFreeMap",
    kind: { cs: "Načtení mapových podkladů, bez cookies", en: "Map tile request, no cookies" },
    purpose: {
      cs: "Mapa místa konání a mapa na úvodní stránce. Poskytovatel vidí IP adresu, nic neukládá do prohlížeče.",
      en: "The venue map and the home page map. The provider sees your IP address and stores nothing in your browser.",
    },
    expiry: { cs: "Neukládá se", en: "Not stored" },
  },
  // TODO: add the analytics tool's cookies here (category "analytics") once `site.analytics.src` is set
];
