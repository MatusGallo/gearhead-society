/** Minimal i18n: every page lives under /cs/ or /en/, copy is stored as { cs, en } pairs. */
export const langs = ["cs", "en"] as const;
export type Lang = (typeof langs)[number];

/** A localized value */
export type L<T = string> = { cs: T; en: T };

export const locale: Record<Lang, string> = { cs: "cs-CZ", en: "en-GB" };
export const langName: Record<Lang, string> = { cs: "Čeština", en: "English" };

/** Translator bound to one language: t({ cs: "…", en: "…" }) */
export const translator = (lang: Lang) => <T>(v: L<T>): T => v[lang];

/** Link inside the current language, e.g. href("en", "/events") -> "/en/events" */
export const href = (lang: Lang, path = "/") => (path === "/" ? `/${lang}/` : `/${lang}${path}`);

/** Same page in another language */
export const switchLang = (pathname: string, to: Lang) =>
  pathname.replace(/^\/(cs|en)(?=\/|$)/, `/${to}`) || `/${to}/`;

/** Strip the language prefix, for active-link checks */
export const stripLang = (pathname: string) => pathname.replace(/^\/(cs|en)(?=\/|$)/, "") || "/";

export const langPaths = () => langs.map((lang) => ({ params: { lang } }));

/** Shared interface copy */
export const ui = {
  nav: {
    home: { cs: "Úvod", en: "Home" },
    events: { cs: "Akce", en: "Events" },
    sommers: { cs: "Sommers", en: "Sommers" },
    galleries: { cs: "Galerie", en: "Galleries" },
    about: { cs: "O nás", en: "About" },
    contact: { cs: "Kontakt", en: "Contact" },
    idCard: { cs: "ID karta", en: "ID card" },
  },
  tickets: { cs: "Vstupenky", en: "Tickets" },
  /** Sommers sells a single ticket per meetup, no tiers */
  ticket: { cs: "Vstupenka", en: "Ticket" },
  allEvents: { cs: "Všechny akce", en: "All events" },
  eventInfo: { cs: "Info o akci", en: "Event info" },
  copy: {
    label: { cs: "Kopírovat", en: "Copy" },
    action: { cs: "Zkopírovat e-mail", en: "Copy e-mail address" },
    done: { cs: "Zkopírováno", en: "Copied" },
  },
  buyTickets: { cs: "Koupit vstupenky", en: "Buy tickets" },
  saleSoon: { cs: "Prodej brzy spustíme", en: "Ticket sale opens soon" },
  viewAll: { cs: "Zobrazit vše", en: "View all" },
  openMenu: { cs: "Otevřít menu", en: "Open menu" },
  closeMenu: { cs: "Zavřít menu", en: "Close menu" },
  home: { cs: "úvodní stránka", en: "home" },
  skip: { cs: "Přeskočit na obsah", en: "Skip to content" },
  language: { cs: "Jazyk", en: "Language" },
  dateTba: { cs: "Termín bude upřesněn", en: "Date TBA" },
  countdown: { cs: ["Dní", "Hod", "Min", "Sek"], en: ["Days", "Hrs", "Min", "Sec"] } as L<[string, string, string, string]>,
  pause: { cs: "Pozastavit animaci", en: "Pause animation" },
  play: { cs: "Spustit animaci", en: "Play animation" },
  footer: {
    explore: { cs: "Procházet", en: "Explore" },
    follow: { cs: "Sledujte nás", en: "Follow" },
    contact: { cs: "Kontakt", en: "Contact" },
    adults: { cs: "Pouze 18+, nutný doklad s fotkou", en: "18+ only, photo ID required" },
    conduct: { cs: "Pravidla chování", en: "Code of conduct" },
    privacy: { cs: "Ochrana soukromí", en: "Privacy policy" },
    imprint: { cs: "Provozovatel", en: "Imprint" },
    terms: { cs: "Obchodní podmínky", en: "Terms of sale" },
    cookies: { cs: "Cookies", en: "Cookies" },
    cookieSettings: { cs: "Nastavení cookies", en: "Cookie settings" },
    legal: { cs: "Právní", en: "Legal" },
    manifesto: {
      cs: "Gear není kostým. Je to jazyk. Oblékni se, přijď a respektuj ostatní. Zbytek obstará noc.",
      en: "Gear is not a costume. It is a language. Dress for it, show up and respect each other. The night does the rest.",
    },
    next: { cs: "Příští akce", en: "Next event" },
    ageTitle: { cs: "Pouze pro dospělé", en: "Adults only" },
    backToTop: { cs: "Zpět nahoru", en: "Back to top" },
  },
  /** Column labels on the footer stencil plate (SpecPlate.astro) */
  spec: {
    event: { cs: "Akce", en: "Event" },
    date: { cs: "Datum", en: "Date" },
    duration: { cs: "Délka", en: "Duration" },
    venue: { cs: "Místo", en: "Venue" },
    coords: { cs: "Souřadnice", en: "Coordinates" },
    tickets: { cs: "Vstupné", en: "Tickets" },
    waves: { cs: "vlny", en: "waves" },
  },
  galleryKind: {
    photos: { cs: "Fotky z akce", en: "Event photos" },
    wall: { cs: "Fotostěna", en: "Photo wall" },
    shoot: { cs: "Komunitní focení", en: "Community shoot" },
    film: { cs: "Aftermovie", en: "Aftermovie" },
  },
  zones: {
    cs: ["Hlavní stage", "Šatna", "Bar", "Chill zóna", "Vstup"],
    en: ["Main floor", "Gear check", "Bar", "Chill zone", "Entry"],
  } as L<string[]>,
} as const;
