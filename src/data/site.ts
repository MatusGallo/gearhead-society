import { ui, type L } from "../i18n";

/** Operator as one line for legal copy, or a placeholder until `site.operator` is filled in */
export const operatorLine = (lang: "cs" | "en") => {
  const o = site.operator;
  if (!o.name) return lang === "cs" ? "provozovatel Gearhead Society (údaje v tiráži)" : "the operator of Gearhead Society (see the imprint)";
  return [o.name, o.address, o.id && `IČO ${o.id}`].filter(Boolean).join(", ");
};

export const site = {
  name: "Gearhead Society",
  tagline: { cs: "Gear. Zvuk. Komunita.", en: "Gear. Sound. Society." } as L,
  description: {
    cs: "Gearhead Society je série gear a fetiš akcí pro všechny gendery. Pečlivě vybraní DJové, syrové prostory a lidé, kteří k sobě mají respekt.",
    en: "Gearhead Society is a gear and fetish event series for all genders. Curated DJs, raw venues and a crowd that respects each other.",
  } as L,
  city: { cs: "Praha", en: "Prague" } as L,
  email: "hello@gearheadsociety.com",
  /** Canonical origin, keep in sync with `site` in astro.config.mjs */
  url: "https://gearheadsociety.com",
  ticketsPath: "/events",
  /**
   * Ticket orders (src/pages/[lang]/events/[slug]/tickets.astro). With `endpoint` set, the form POSTs the order as JSON
   * there (Formspree, a serverless function, the shop's API); without it the order goes out as a prefilled e-mail.
   * TODO: set `endpoint` once the order inbox or ticket shop exists.
   */
  orders: {
    endpoint: undefined as string | undefined,
    maxPerOrder: 4,
    /** Days to pay before an unpaid reservation lapses, quoted in the checkout and the terms */
    payDays: 3,
  },
  /**
   * Optional analytics, loaded only after the visitor allows them in the cookie banner (CookieConsent.astro).
   * TODO: set `src` (e.g. a Plausible or Umami script) and list its cookies in src/data/cookies.ts. Until then the
   * analytics category stays in the banner but loads nothing.
   */
  analytics: { src: undefined as string | undefined, attrs: {} as Record<string, string> },
  /**
   * Operator for the imprint, the privacy policy and the terms of sale.
   * TODO: fill in before launch; empty fields render as a visible placeholder.
   */
  operator: {
    name: "",
    address: "",
    /** IČO */
    id: "",
    /** DIČ, only if VAT registered */
    vat: "",
    /** e.g. "Spolek zapsaný u Městského soudu v Praze, oddíl L, vložka 12345" */
    register: "",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram-logo" },
    { label: "Discord", href: "https://discord.gg/", icon: "discord-logo" },
    { label: "X", href: "https://x.com/", icon: "x-logo" },
  ],
};

/** Paths without the language prefix; `sommers` marks the section with its own accent */
export const nav: { label: L; path: string; sommers?: boolean }[] = [
  { label: ui.nav.home, path: "/" },
  { label: ui.nav.events, path: "/events" },
  { label: ui.nav.sommers, path: "/sommers", sommers: true },
  { label: ui.nav.galleries, path: "/galleries" },
  { label: ui.nav.about, path: "/about" },
  { label: ui.nav.contact, path: "/contact" },
];
