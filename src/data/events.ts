import { href, locale, ui, type L, type Lang } from "../i18n";
import { ph, type Photo } from "./placeholder";

/** Tickets sell in waves, each dearer than the last: Early bird, Classic, Late runner */
export type TicketTier = {
  name: L;
  /** CZK; omit while the price is not announced */
  price?: number;
  note?: L;
  soldOut?: boolean;
  /** ISO end of the wave; past it the next wave takes over */
  until?: string;
};

export type WaveState = "past" | "current" | "next";
export type TicketWave = TicketTier & { state: WaveState; /** Price step from the previous wave */ rise?: number };

export type EventItem = {
  slug: string;
  /** Proper name, same in both languages */
  title: string;
  edition: L;
  /** ISO start time; omit when the date is not announced yet */
  start?: string;
  end?: string;
  city: L;
  venue: L;
  /** Exact address with coordinates, drives the venue map; omit while the venue is secret */
  location?: EventLocation;
  summary: L;
  description: L<string[]>;
  /** Artist names; an empty list renders "to be announced" */
  lineup: string[];
  dressCode: L;
  tickets: TicketTier[];
  /**
   * True once the sale runs; before that no wave is marked as current and the event is on the waiting list only
   * (`isWaitlist`): the site shows its name, edition, summary and the waiting list, nothing about date, venue or tickets
   */
  saleOpen?: boolean;
  ticketUrl?: string;
  /** People on the waiting list, the real count from the sign-ups; omit to hide the counter */
  waitlist?: number;
  /** Imported photo (src/assets) or a path under /public. TODO: ph() placeholders (src/data/placeholder.ts) stand in until real photos exist */
  image?: Photo;
  /** Seed for the generated scan visual */
  seed: number;
};

export type EventLocation = {
  street: string;
  district: string;
  city: L;
  country: L;
  /** [longitude, latitude] of the entrance */
  coords: [number, number];
};

const prague: L = { cs: "Praha", en: "Prague" };
const tba: L = { cs: "Místo bude upřesněno", en: "Venue TBA" };
const earlyBird: L = { cs: "Early bird", en: "Early bird" };
const classic: L = { cs: "Classic", en: "Classic" };
const lateRunner: L = { cs: "Late runner", en: "Late runner" };
/** The three waves at the usual prices */
const waves = (prices: [number?, number?, number?] = []): TicketTier[] => [
  { name: earlyBird, price: prices[0] },
  { name: classic, price: prices[1] },
  { name: lateRunner, price: prices[2] },
];

export const events: EventItem[] = [
  {
    slug: "pressure-2026",
    title: "Pressure",
    edition: { cs: "Podzimní edice", en: "Autumn Edition" },
    start: "2026-11-14T22:00:00+01:00",
    end: "2026-11-15T08:00:00+01:00",
    city: prague,
    venue: { cs: "Libeňský plynojem", en: "Libeň Gasholder" },
    location: {
      street: "Ke Kouli",
      district: "Libeň",
      city: { cs: "Praha 8", en: "Prague 8" },
      country: { cs: "Česko", en: "Czechia" },
      coords: [14.47548, 50.10085],
    },
    summary: {
      cs: "Deset hodin tvrdého techna v syrové industriální hale. Latex, kůže, sportswear: ukaž svůj gear.",
      en: "Ten hours of hard techno in a raw industrial hall. Rubber, leather, sportswear: show your gear.",
    },
    description: {
      cs: [
        "Pressure otevírá sezónu. Opuštěná industriální hala, zvuk, který cítíš v hrudi, a plný parket lidí, kteří se přišli ukázat.",
        "Čekají tě dvě stage, kontrola dress codu u vstupu, pořádná šatna a chill zóna, když se potřebuješ nadechnout.",
      ],
      en: [
        "Pressure opens the season. An abandoned industrial hall, a sound system that hits you in the chest and a floor full of people who came dressed for it.",
        "Expect two floors, a gear check at the door, a proper cloakroom and a chill-out zone when you need to breathe.",
      ],
    },
    lineup: ["DJ Kontakt", "Ruby Voltage", "M.A.R.T.", "Hydraulic Sister"],
    dressCode: {
      cs: "Striktně gear: latex, kůže, uniforma, sportswear, puppy gear. Na parket žádné civilní oblečení.",
      en: "Strict gear: rubber, leather, uniform, sportswear, puppy gear. No street clothes on the floor.",
    },
    tickets: [
      { name: earlyBird, price: 450, soldOut: true },
      { name: classic, price: 650, until: "2026-11-07T23:59:00+01:00" },
      { name: lateRunner, price: 850, note: { cs: "I na místě, pokud zbudou", en: "Also at the door, if available" } },
    ],
    saleOpen: true,
    image: ph("team-backs"),
    seed: 11,
  },
  {
    slug: "frostbite-2027",
    title: "Frostbite",
    edition: { cs: "Zimní edice", en: "Winter Edition" },
    start: "2027-01-23T22:00:00+01:00",
    end: "2027-01-24T07:00:00+01:00",
    city: prague,
    venue: tba,
    summary: {
      cs: "Venku mráz, uvnitř horko. Zimní edice promění prostor v ocelově modrý mrazák.",
      en: "Cold outside, heat inside. The winter edition turns the venue into a steel-blue freezer.",
    },
    description: {
      cs: ["Frostbite je náš zimní rituál. Studené světlo, mlha a lineup postavený na dlouhou noc.", "Celý program a místo oznámíme v prosinci."],
      en: ["Frostbite is our winter ritual. Cold light, fog and a lineup built for the long night.", "Full programme and venue will be announced in December."],
    },
    lineup: [],
    dressCode: {
      cs: "Gear povinný. Zimní vrstvy vítány, šatna je v ceně vstupenky.",
      en: "Gear required. Winter layers welcome, the cloakroom is included in your ticket.",
    },
    tickets: waves([450, 650, 850]),
    image: ph("dust-storm"),
    seed: 23,
    // TODO: demo count to show the waiting-list counter; replace with the real number of sign-ups before launch
    waitlist: 181,
  },
  {
    slug: "pride-gear-2027",
    title: "Pride Gear",
    edition: { cs: "Pride edice", en: "Pride Edition" },
    start: "2027-06-12T21:00:00+02:00",
    end: "2027-06-13T08:00:00+02:00",
    city: prague,
    venue: tba,
    summary: {
      cs: "Naše oficiální party o víkendu Prague Pride. Hlasitější, hrdější a v plných barvách.",
      en: "Our official Prague Pride weekend party. Louder, prouder, and in full colour.",
    },
    description: {
      cs: ["Největší noc Gearhead roku, souběžně s Prague Pride."],
      en: ["The biggest Gearhead night of the year, running alongside Prague Pride."],
    },
    lineup: [],
    dressCode: { cs: "Gear a barvy. Ukaž, kdo jsi.", en: "Gear and colour. Show who you are." },
    tickets: waves(),
    image: ph("mx-field"),
    seed: 37,
  },
  {
    slug: "summer-grease",
    title: "Summer Grease",
    edition: { cs: "Letní edice", en: "Summer Edition" },
    city: prague,
    venue: { cs: "Open-air, místo bude upřesněno", en: "Open-air venue TBA" },
    summary: { cs: "Open air, pot a východ slunce. Termín oznámíme.", en: "Open air, sweat and sunrise. Date to be announced." },
    description: { cs: ["Letní edice se stěhuje ven. Víc brzy."], en: ["The summer edition moves outside. More soon."] },
    lineup: [],
    dressCode: { cs: "Letní gear. Sportswear, postroje, kraťasy.", en: "Summer gear. Sportswear, harnesses, shorts." },
    tickets: [],
    image: ph("mx-dust"),
    seed: 41,
  },
];

const now = () => Date.now();

export const isUpcoming = (e: EventItem) => !e.end || new Date(e.end).getTime() > now();

export const upcomingEvents = () =>
  events
    .filter(isUpcoming)
    .sort((a, b) => (a.start ? Date.parse(a.start) : Infinity) - (b.start ? Date.parse(b.start) : Infinity));

/** Not announced yet: only the name, edition, summary and the waiting list go on the site */
export const isWaitlist = (e: EventItem) => !e.saleOpen;

/** The next announced night; waiting-list events have no date to count down to */
export const nextEvent = () => upcomingEvents().find((e) => e.start && !isWaitlist(e));

/** Waves in order with their state; the current one is the first not sold out and not past its end */
export function ticketWaves(e: EventItem): TicketWave[] {
  let found = false;
  return e.tickets.map((tk, i) => {
    const prev = e.tickets[i - 1]?.price;
    const over = tk.soldOut || (tk.until ? Date.parse(tk.until) <= now() : false);
    let state: WaveState = "next";
    if (!found && over) state = "past";
    else if (!found) {
      found = true;
      state = e.saleOpen ? "current" : "next";
    }
    return { ...tk, state, rise: tk.price != null && prev != null ? tk.price - prev : undefined };
  });
}

/** The wave on sale right now, if the sale is open */
export const currentWave = (e: EventItem) => ticketWaves(e).find((w) => w.state === "current");

/**
 * Where "buy" goes while a wave is on sale: the shop when `ticketUrl` is set, otherwise our own order form
 * (`/events/<slug>/tickets`), which sends the order to `site.orders.endpoint` or by e-mail.
 */
export function ticketLink(e: EventItem, lang: Lang) {
  const w = currentWave(e);
  if (!w || !isUpcoming(e)) return undefined;
  return e.ticketUrl ?? href(lang, `/events/${e.slug}/tickets`);
}

export const formatPrice = (price?: number) => (price == null ? "TBA" : `${price.toLocaleString("cs-CZ")} CZK`);

const tz = { timeZone: "Europe/Prague" } as const;

export function formatDate(iso: string | undefined, lang: Lang) {
  if (!iso) return ui.dateTba[lang];
  return new Date(iso).toLocaleDateString(locale[lang], { ...tz, day: "numeric", month: "long", year: "numeric" });
}

/** Numeric date in the reference style, e.g. 14.11.2026 */
export function formatNumeric(iso: string | undefined, lang: Lang) {
  if (!iso) return ui.dateTba[lang];
  return new Date(iso).toLocaleDateString("cs-CZ", { ...tz, day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\s/g, "");
}

export function formatTime(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-GB", { ...tz, hour: "2-digit", minute: "2-digit" });
}

export function dateParts(iso: string | undefined, lang: Lang) {
  if (!iso) return { day: "TBA", month: "", weekday: "" };
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString(locale[lang], { ...tz, day: "2-digit" }).replace(".", ""),
    month: d.toLocaleDateString(locale[lang], { ...tz, month: "short" }),
    weekday: d.toLocaleDateString(locale[lang], { ...tz, weekday: "short" }),
  };
}
