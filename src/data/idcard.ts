import { locale, type L, type Lang } from "../i18n";

/**
 * Gearhead ID card: what a member can put on it. The card itself is printed in English for everyone (it is a
 * networking card for an international crowd, like the country and language fields say); the page around it is
 * bilingual as usual. No photo and no surname on the card: only what the member chooses to show.
 */
export type IdCardData = {
  handle: string;
  pronouns?: string;
  /** ISO 3166 region code, printed as is */
  country: string;
  /** ISO 639 codes, printed upper case, at most `maxLangs` */
  langs: string[];
  /** Keys of `gearTags`, at most `maxGear` */
  gear: string[];
  /** Member number; omitted in the configurator, where it is assigned with the order */
  no?: string;
  since: number;
};

export const maxHandle = 16;
export const maxLangs = 3;
export const maxGear = 3;

/** Countries offered first in the select; any other goes in as "other" and we sort it out by e-mail */
export const countries = ["CZ", "SK", "DE", "AT", "PL", "HU", "GB", "NL", "BE", "FR", "IT", "ES", "DK", "SE", "CH", "US"];
export const languages = ["cs", "sk", "en", "de", "pl", "hu", "fr", "es", "it", "nl", "pt", "uk"];
export const pronounOptions = ["he/him", "she/her", "they/them", "he/they", "she/they", "any"];

/** Gear the member wears, scene words kept in English on the card */
export const gearTags: { key: string; label: L }[] = [
  { key: "tactical", label: { cs: "Tactical", en: "Tactical" } },
  { key: "uniform", label: { cs: "Uniforma", en: "Uniform" } },
  { key: "mx", label: { cs: "MX", en: "MX" } },
  { key: "rubber", label: { cs: "Rubber", en: "Rubber" } },
  { key: "leather", label: { cs: "Kůže", en: "Leather" } },
  { key: "boots", label: { cs: "Boty", en: "Boots" } },
  { key: "neoprene", label: { cs: "Neopren", en: "Neoprene" } },
  { key: "sports", label: { cs: "Sportswear", en: "Sportswear" } },
];

export const countryName = (code: string, lang: Lang) => new Intl.DisplayNames([locale[lang]], { type: "region" }).of(code) ?? code;
export const languageName = (code: string, lang: Lang) => new Intl.DisplayNames([locale[lang]], { type: "language" }).of(code) ?? code;

/** Sample member for the showcase and the anatomy; clearly a sample, never a real person */
export const sampleCard: IdCardData = {
  handle: "Visor",
  pronouns: "they/them",
  country: "CZ",
  langs: ["cs", "en", "de"],
  gear: ["tactical", "mx", "boots"],
  no: "0417",
  since: 2026,
};

/**
 * Bar widths (1..3) for the decorative barcode under the member number, derived from the number so every card
 * carries its own pattern. Not a scannable code: the NFC chip and the short link do the linking.
 */
export function barcode(seed: string, bars = 26) {
  let h = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 2166136261);
  return Array.from({ length: bars }, () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return 1 + (h >>> 29) % 3;
  });
}
