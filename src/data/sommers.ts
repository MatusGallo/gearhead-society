import { locale, type L, type Lang } from "../i18n";
import { ph, type Photo } from "./placeholder";

const b = (cs: string, en: string): L => ({ cs, en });
const bl = (cs: string[], en: string[]): L<string[]> => ({ cs, en });

export const sommers = {
  name: "Sommers",
  email: "Sommers-srazy@post.cz",
  hosts: "Sommers, Iglite, Magnas",
  /**
   * Sommers podcast on Spotify (SommersPodcast.astro): one series, newest episode first. The page features the latest
   * one and lists the rest on request. An episode's player is embedded only after a click, as Spotify sets its own
   * cookies. `demo: true` renders the mock episodes and producer below and never contacts Spotify.
   * TODO: replace them with the real ones (`url` = https://open.spotify.com/episode/<id>) and set `demo: false`.
   */
  podcast: {
    demo: true,
    /** Who makes the podcast for Sommers, credited with their socials */
    producer: {
      name: "Podcast Studio",
      socials: [
        { label: "Instagram", href: "https://instagram.com/", icon: "instagram-logo" },
        { label: "Spotify", href: "https://open.spotify.com/", icon: "spotify-logo" },
        { label: "YouTube", href: "https://youtube.com/", icon: "youtube-logo" },
      ],
    },
    episodes: [
      {
        slug: "jak-vznika-sraz",
        title: b("Jak vzniká sraz", "How a meetup comes together"),
        text: b(
          "Od výběru chaty po poslední úklid: co všechno stojí za jedním víkendem.",
          "From picking the lodge to the last clean-up: everything behind one weekend.",
        ),
        date: "2026-09-12",
        length: "48:20",
        url: "https://open.spotify.com/",
        cover: ph("comms"),
      },
      {
        slug: "poprve-na-srazu",
        title: b("Poprvé na srazu", "First time at a meetup"),
        text: b(
          "Co čekat, co si vzít a jak se neztratit mezi lidmi, které ještě neznáš.",
          "What to expect, what to pack and how not to feel lost among people you have not met yet.",
        ),
        date: "2026-08-15",
        length: "41:05",
        url: "https://open.spotify.com/",
        cover: ph("boots-row"),
      },
      {
        slug: "souhlas",
        title: b("Souhlas není formalita", "Consent is not a formality"),
        text: b(
          "Proč se ptáme a jak vypadá jasné ano v praxi.",
          "Why we ask and what a clear yes looks like in practice.",
        ),
        date: "2026-07-18",
        length: "52:47",
        url: "https://open.spotify.com/",
        cover: ph("harness"),
      },
      {
        slug: "fetis-oblecky",
        title: b("Fetiš oblečky", "Fetish outfits"),
        text: b(
          "Latex, kůže, gumáky i uniformy: jak začít a kde to sehnat.",
          "Latex, leather, rubber boots and uniforms: how to start and where to find them.",
        ),
        date: "2026-06-20",
        length: "38:12",
        url: "https://open.spotify.com/",
        cover: ph("reflective"),
      },
      {
        slug: "tym-za-srazem",
        title: b("Tým za srazem", "The team behind the meetup"),
        text: b(
          "Kdo vaří, kdo fotí a kdo drží pořádek, když ostatní tančí.",
          "Who cooks, who shoots and who keeps order while everyone else dances.",
        ),
        date: "2026-05-23",
        length: "45:36",
        url: "https://open.spotify.com/",
        cover: ph("team-backs"),
      },
    ] as PodcastEpisode[],
  },

  intro: bl(
    [
      "Srazy jsou pořádány pro všechny fetišisty a BDSM pozitivní lidi bez rozdílu fetiše a zaměření, kteří se chtějí seznámit a pobavit se s podobně naladěnými přáteli. Akce je společenská, nikoliv „akční, erotická“. Fetiš oblečky jsou velmi vítány.",
      "Protože nejde o komerční aktivitu a účastníci tedy platí jen náklady spojené se srazem, jsou ceny srazů různé podle ceny ubytování a stravování v objektu, kde se sraz koná.",
      "Prosíme o sdílení srazů na sociálních sítích a pozvání vašich BDSM a fetiš zaměřených přátel.",
    ],
    [
      "The meetups are for all fetishists and BDSM-positive people, whatever their fetish or orientation, who want to meet and have fun with like-minded friends. It is a social event, not an “action, erotic” one. Fetish outfits are very welcome.",
      "This is not a commercial activity and participants only pay the costs of the meetup, so prices vary with the accommodation and food at each venue.",
      "Please share the meetups on social media and invite your BDSM and fetish friends.",
    ],
  ),
  readFirst: b(
    "Vím, že popisy srazů jsou si hodně podobné, přesto Tě prosím o jejich čtení před registrací, ať víš, do čeho jdeš, a neboj se zeptat na to, co Ti z popisu není zcela jasné, zvláště jedeš-li poprvé.",
    "The descriptions of our meetups are very similar, but please read them before you register so you know what you are signing up for. Ask about anything that is not clear, especially if it is your first time.",
  ),
  safety: bl(
    [
      "Vstup od 18 let a není třeba ručitel.",
      "Je přísný zákaz vozit na sraz veškeré zakázané návykové látky a funkční zbraně.",
      "Z důvodu bezpečnosti účastníků srazu se smí jakékoliv aktivity vyvíjet jen k těm osobám, které k nim daly zřejmý souhlas.",
      "Velmi děkujeme za pochopení srazových pravidel, jejich respektování a dodržování organizačních pokynů pro zdárný a hlavně bezpečný průběh srazu.",
    ],
    [
      "Entry from 18, no guarantor needed.",
      "Bringing any illegal drugs or working weapons to the meetup is strictly forbidden.",
      "For everyone's safety, any activity may only involve people who have clearly consented to it.",
      "Thank you for understanding and respecting the rules and following the organisers' instructions, so the meetup runs smoothly and above all safely.",
    ],
  ),
  registration: bl(
    [
      "Registrace probíhá pouze na e-mailové adrese Sommers-srazy@post.cz.",
      "Do registračního e-mailu prosím napiš svoji přezdívku, pod kterou budeš uveden/a/ v registrační tabulce a budeš ji mít i na jmenovce. Jen na adresu, ze které mi registrační e-mail přijde, pošlu veškeré další informace.",
      "Zájemcům o sraz ze zahraničí pošlu IBAN, na který je třeba zadat platbu jako SEPA v eurech. Případné rozdíly dorovnáme na sraze v hotovosti v korunách. Na bankovní poplatky za převod peněz je nutné se informovat ve vlastní bance.",
      "Každý zájemce o sraz se musí registrovat sám za sebe. Registrace typu „Přijedu já a možná vezmu kámoše, napiš mi, kde to přesně je“ nebude z důvodu bezpečnosti účastníků srazu akceptována!",
      "Pro ubytování jsou potřeba osobní data (stejně jako u každého hotelu či penzionu, nespíme na pasece v lese). Bez dat k ubytování a zaplacení srazového poplatku nebude nikdo do areálu na sraz vpuštěn.",
    ],
    [
      "Registration is by e-mail only, to Sommers-srazy@post.cz.",
      "Please include the nickname you want on the registration list and on your name tag. All further information goes only to the address your registration came from.",
      "Guests from abroad get an IBAN for a SEPA payment in euros. Any difference is settled in cash in Czech crowns at the meetup. Check any transfer fees with your own bank.",
      "Everyone registers for themselves. Registrations like “I'm coming and maybe bringing a friend, tell me where exactly it is” will not be accepted, for the safety of all participants.",
      "Accommodation requires personal details, like any hotel or guesthouse (we are not sleeping in a forest clearing). Nobody gets in without accommodation details and a paid fee.",
    ],
  ),
};

export type PodcastEpisode = {
  slug: string;
  title: L;
  text: L;
  /** ISO date of release */
  date: string;
  length: string;
  /** Spotify episode link, https://open.spotify.com/episode/<id> */
  url?: string;
  /** Square cover photo, toned violet on the page; greyscale gear shots like every other plate */
  cover?: Photo;
};

export type DayBlock = { day: L; items: L<string[]> };

export type SommersEdition = {
  slug: string;
  kind: "sraz" | "setkani";
  /** Meetup number */
  number?: number;
  title: L;
  /** ISO date, e.g. "2026-10-02" */
  start: string;
  end?: string;
  place: L;
  /** [latitude, longitude] of the town, shown to the arc minute; never the venue, whose address stays secret */
  gps?: [number, number];
  price?: L;
  capacity?: L;
  summary: L;
  /** Free text, mainly for smaller meetups */
  body?: L<string[]>;
  team?: { organizer: L; coordinator: string; photographer: string };
  accommodation?: L<string[]>;
  menuNote?: L;
  menu?: DayBlock[];
  programIntro?: L<string[]>;
  schedule?: DayBlock[];
  extras?: { title: L; text: L }[];
  other?: L<string[]>;
  deadlines?: { label: L; value: L }[];
  sponsors?: string[];
  /** Seed for the generated scan visual */
  seed: number;
};

const team = { organizer: b("Sommers a tým", "Sommers and team"), coordinator: "Sommers", photographer: "Iglite" };
const destne = b("u Deštného v Orlických horách", "near Deštné, Orlické Mountains");
const destneGps: [number, number] = [50.307, 16.351];

const transportDestne = b(
  "Autobusová zastávka je cca 750 m od chaty. Z Prahy, Brna, Zlína, Olomouce a Ostravy se lze na místo srazu dostat s jedním až třemi přestupy, z Hradce Králové a Dobrušky existuje přímé spojení busem.",
  "The bus stop is about 750 m from the lodge. From Prague, Brno, Zlín, Olomouc and Ostrava it takes one to three changes; there is a direct bus from Hradec Králové and Dobruška.",
);
const carpool = b(
  "Máš-li v autě místo a rád/a/ bys vzal/a/ spolujezdce, toto místo mi prosím nabídni. Napiš prosím i v případě, že bys rád/a/ spolujezdcem byl/a/. Ráda pomohu s vyřešením dopravy na sraz zkontaktováním řidičů a spolujezdců.",
  "If you have a free seat in your car and would take a passenger, please offer it to me. Write also if you would like a ride. I am happy to connect drivers and passengers.",
);
const breakfastDestne = (extraCs: string, extraEn: string) =>
  bl(
    [
      `pomazánka, paštika, máslo, salám suchý i měkký, slanina, sýr plátky obyč i uzený, sýr k namazání, ${extraCs}`,
      "jogurt bílý, marmeláda, müsli, cornflakes",
      "rohlíky, chleba",
      "krupičná kaše",
    ],
    [
      `spread, pâté, butter, dry and soft salami, bacon, sliced plain and smoked cheese, cream cheese, ${extraEn}`,
      "plain yoghurt, jam, muesli, cornflakes",
      "rolls, bread",
      "semolina porridge",
    ],
  );
const day = {
  friDinner: b("Pátek večeře", "Friday dinner"),
  satBreakfast: b("Sobota snídaně", "Saturday breakfast"),
  satLunch: b("Sobota oběd", "Saturday lunch"),
  satDinner: b("Sobota večeře", "Saturday dinner"),
  sunBreakfast: b("Neděle snídaně", "Sunday breakfast"),
  fri: b("Pátek", "Friday"),
  sat: b("Sobota", "Saturday"),
  sun: b("Neděle", "Sunday"),
};

export const editions: SommersEdition[] = [
  {
    slug: "49-sraz-nesnesitelna-lehkost-biti",
    kind: "sraz",
    number: 49,
    title: b("Impact", "Impact"),
    start: "2026-10-02",
    end: "2026-10-04",
    place: destne,
    gps: destneGps,
    price: b("1 700 Kč", "1,700 CZK"),
    capacity: b("100 lidí", "100 people"),
    summary: b(
      "Podzimní víkend v horské chatě v Orlických horách. Soutěž, společné foto, pasování nováčků a spousta volného času na fetišení.",
      "An autumn weekend in a mountain lodge in the Orlické Mountains. A contest, group photo, newcomer initiation and lots of free time for fetish fun.",
    ),
    team,
    accommodation: bl(
      [
        "Příjezd do horské chaty je možný od 15:00.",
        "Ubytování pro 50 lidí je zajištěno v pokojích v patře horské chaty. V případě zájmu lze ubytovat v apartmánu nebo v bungalovu po 5 až 12 lidech. Tyto objekty se nacházejí blízko hlavní budovy. Na některé pokoje může být přidána jedna přistýlka. Jednolůžkové pokoje nejsou k dispozici. Kapacita areálu je 100 lidí. O počtu účastníků nerozhoduje registrace, ale počet lidí, kteří budou mít zaplaceno.",
        "Přesnou adresu, kde se sraz koná, obdržíš po zaplacení účastnického poplatku 1 700 Kč. V této ceně je ubytování na dvě noci, jídlo od páteční večeře do nedělní snídaně včetně, buchty a nealko nápoje (káva, čaj, kakao, limo, voda).",
        "V horské chatě je bar, který účastníkům nabízí točené pivo Primátor 11° za 40 Kč a Plzeň za 55 Kč, ostatní alkohol a sladké i slané pochutiny. Tato konzumace NENÍ v ceně srazu, tudíž si ji před odjezdem platí každý sám. Jako pokaždé si můžeš dovézt alkohol svůj. Naše srazy jsou bez personálu a srazující se obsluhují sami a též po sobě sami uklízejí.",
      ],
      [
        "Arrival at the lodge from 15:00.",
        "Rooms for 50 people are on the upper floor of the lodge. On request you can stay in an apartment or bungalow for 5 to 12 people near the main building. Some rooms can take one extra bed. There are no single rooms. The site holds 100 people. Places go to those who have paid, not to those who registered.",
        "You get the exact address after paying the 1,700 CZK fee. It covers two nights, all meals from Friday dinner to Sunday breakfast, cakes and soft drinks (coffee, tea, cocoa, lemonade, water).",
        "The lodge bar sells draught Primátor 11° for 40 CZK and Pilsner for 55 CZK, other drinks and snacks. These are NOT included, everyone settles their own tab before leaving. As always, you can bring your own alcohol. Our meetups have no staff: everyone serves themselves and cleans up after themselves.",
      ],
    ),
    menuNote: b("Dietu prosím nahlaš e-mailem předem.", "Please e-mail any dietary needs in advance."),
    menu: [
      { day: day.friDinner, items: bl(["květáková polévka", "kuřecí řízek, bramborová kaše, čerstvá zelenina"], ["cauliflower soup", "chicken schnitzel, mashed potatoes, fresh vegetables"]) },
      { day: day.satBreakfast, items: breakfastDestne("vejce", "eggs") },
      { day: day.satLunch, items: bl(["bramboračka", "milánská směs, špagety, čerstvá zelenina"], ["potato soup", "Milanese sauce, spaghetti, fresh vegetables"]) },
      { day: day.satDinner, items: bl(["masový vývar s nudlemi", "pečené vepřové maso, špenát, bramborový knedlík"], ["meat broth with noodles", "roast pork, spinach, potato dumpling"]) },
      { day: day.sunBreakfast, items: breakfastDestne("párky", "sausages") },
    ],
    programIntro: bl(
      [
        "V plánu je hravé soutěžení a další aktivity, jejichž podrobný popis rozešlu zájemcům o sraz mailem. K dispozici je spousta času, který se dá využít, jak kdo chce. Povinného není nic, jen časy k jídlu a dresscode na společné foto. Raději účastníkům srazu poskytneme prostor pro fetišení a jejich vlastní aktivity, než povinný program. Ale potěší mě, když se do srazových aktivit zapojíš a domů si odvezeš některou z výher.",
        "Chceš-li, vezmi s sebou hračky, se kterými se chceš pochlubit. Pro všechny účastníky na sraze platí pravidla bezpečnosti BDSM, která jistě všichni známe. Určitě s sebou přivez dobrou náladu, chuť se bavit, ale i velkou toleranci a ohleduplnost vůči ostatním.",
      ],
      [
        "Expect playful contests and other activities; registered guests get the details by e-mail. There is plenty of free time to use as you like. Nothing is compulsory except meal times and the dress code for the group photo. We would rather give you room for your own fetish fun than a fixed programme, but it is great when you join in and take home a prize.",
        "Bring any toys you want to show off. The BDSM safety rules we all know apply to everyone. Bring a good mood, an appetite for fun and plenty of tolerance and consideration for others.",
      ],
    ),
    schedule: [
      {
        day: day.fri,
        items: bl(
          ["Příjezd od 15:00", "Ubytování", "19:00 společná večeře, oblečky vítány", "Přivítání, seznámení se s novými účastníky", "Volná zábava, dle zájmu taneček"],
          ["Arrival from 15:00", "Check-in", "19:00 dinner together, outfits welcome", "Welcome, meet the newcomers", "Free time, dancing if you like"],
        ),
      },
      {
        day: day.sat,
        items: bl(
          [
            "Po probuzení snídaně",
            "Volná zábava: možnost jít na houby, výlet, nákup do Polska atd.",
            "14:00 oběd",
            "16:00 aktivita Radost Tobě",
            "17:00 soutěž",
            "18:30 večeře",
            "20:30 společné foto",
            "Vyhlášení výherců soutěže",
            "Pasování nováčků",
            "Volná zábava, dle zájmu taneček",
          ],
          [
            "Breakfast when you wake up",
            "Free time: mushroom picking, a trip, shopping in Poland and more",
            "14:00 lunch",
            "16:00 activity “Joy to You”",
            "17:00 contest",
            "18:30 dinner",
            "20:30 group photo",
            "Contest winners announced",
            "Newcomer initiation",
            "Free time, dancing if you like",
          ],
        ),
      },
      {
        day: day.sun,
        items: bl(
          ["Po probuzení snídaně", "Úklid ubytovacích a společných prostor", "Do 12 hodin loučení a rozjezd k domovům"],
          ["Breakfast when you wake up", "Clean-up of rooms and shared spaces", "Goodbyes and departure by 12:00"],
        ),
      },
    ],
    other: {
      cs: [
        "Celá chata, apartmány i bungalovy jsou striktně nekuřácké. Kouřit se bude smět pouze ve vyhrazeném prostoru. Děkuji za pochopení a respektování.",
        transportDestne.cs,
        carpool.cs,
        "Změna programu a jídelníčku vyhrazena. Děkuji za pochopení.",
      ],
      en: [
        "The whole lodge, apartments and bungalows are strictly non-smoking. Smoking only in the designated area. Thank you for respecting this.",
        transportDestne.en,
        carpool.en,
        "Programme and menu may change. Thank you for understanding.",
      ],
    },
    deadlines: [
      { label: b("Mail s informacemi k platbě", "Payment details e-mail"), value: b("úterý 1. září 2026, 18-19 h", "Tuesday 1 September 2026, 18:00-19:00") },
      { label: b("Uzávěrka registrací a plateb", "Registration and payment deadline"), value: b("úterý 29. září 2026 ve 23 h", "Tuesday 29 September 2026, 23:00") },
      { label: b("Adresa a seznam, co nezapomenout", "Address and packing list"), value: b("úterý 29. září 2026", "Tuesday 29 September 2026") },
    ],
    sponsors: ["Cipissek", "Lykra"],
    seed: 49,
  },
  // TODO: sample next editions until Sommers announces the real ones; dates, places and titles are placeholders
  {
    slug: "50-sraz",
    kind: "sraz",
    number: 50,
    title: b("Cold Start", "Cold Start"),
    start: "2027-02-05",
    end: "2027-02-07",
    place: destne,
    gps: destneGps,
    capacity: b("100 lidí", "100 people"),
    summary: b(
      "Jubilejní padesátý sraz, zimní víkend v horské chatě v Orlických horách. Cenu, jídelníček a program rozešleme s mailem k platbě.",
      "The fiftieth meetup, a winter weekend in a mountain lodge in the Orlické Mountains. Price, menu and programme follow in the payment e-mail.",
    ),
    team,
    other: {
      cs: [transportDestne.cs, carpool.cs],
      en: [transportDestne.en, carpool.en],
    },
    seed: 50,
  },
  {
    slug: "jarni-vabeni-xiii",
    kind: "setkani",
    title: b("Lookout XIII", "Lookout XIII"),
    start: "2027-04-10",
    place: b("Brno-Komín, rozhledna Holedná", "Brno-Komín, Holedná lookout tower"),
    gps: [49.217, 16.515],
    summary: b("Jarní procházka na rozhlednu Holedná a pozdní oběd v Brně-Komíně.", "A spring walk to the Holedná lookout tower and a late lunch in Brno-Komín."),
    body: bl(
      [
        "Sejdeme se v sobotu 10. dubna 2027 ve 12 hodin v Brně-Komíně na břehu řeky Svratky a pomalou procházkou dojdeme na rozhlednu Holedná v Jundrově.",
        "Po procházce následuje pozdní oběd v restauraci v Brně-Komíně. Kdo nechce jít na procházku, přidá se až v restauraci.",
        "Rodinní příslušníci a Quálíci jsou žádoucí, neboť akce je civilní. Přihlas se prosím mailem na Sommers-srazy@post.cz.",
      ],
      [
        "We meet on Saturday 10 April 2027 at noon in Brno-Komín, on the bank of the Svratka, and take a slow walk up to the Holedná lookout tower in Jundrov.",
        "A late lunch at a restaurant in Brno-Komín follows. If you would rather skip the walk, join us at the restaurant.",
        "Family members and non-kinky friends are welcome, as this is a plain-clothes event. Please sign up by e-mail at Sommers-srazy@post.cz.",
      ],
    ),
    seed: 410,
  },
];

// Czech typography: one- and two-letter words (u, v, po, na...) are tied to the next word, never left at a line end
const tie = (s: string) => s.replace(/(?<=^|\s)(\p{L}{1,2}) +/gu, "$1 ");
for (const e of editions) {
  e.title.cs = tie(e.title.cs);
  e.place.cs = tie(e.place.cs);
}

const today = () => new Date().toISOString().slice(0, 10);

export const isUpcomingEdition = (e: SommersEdition) => (e.end ?? e.start) >= today();

/**
 * Sommers lists only the current edition and at most two after it; one that is over drops off the site at the
 * next build, and anything further out waits for a free slot
 */
export const upcomingEditions = () => editions.filter(isUpcomingEdition).sort((a, b) => a.start.localeCompare(b.start)).slice(0, 3);

export const editionLabel = (e: SommersEdition, lang: Lang) =>
  e.number ? (lang === "cs" ? `${e.number}. sraz` : `Meetup ${e.number}`) : lang === "cs" ? "Setkání" : "Get-together";

/** [50.307, 16.351] -> ["50°18′N", "16°21′E"]: arc minutes, about 1.8 km, enough for the town and no closer */
export const formatGps = ([lat, lon]: [number, number]) => {
  const dm = (v: number, pos: string, neg: string) => {
    const m = Math.round(Math.abs(v) * 60);
    return `${Math.floor(m / 60)}°${String(m % 60).padStart(2, "0")}′${v < 0 ? neg : pos}`;
  };
  return [dm(lat, "N", "S"), dm(lon, "E", "W")];
};

const fmt = (iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString(locale[lang], { timeZone: "Europe/Prague", ...opts });

/** cs "2.-4. října 2026", en "2-4 October 2026"; across months "29. května - 1. června 2026" */
export function formatRange(start: string, end: string | undefined, lang: Lang) {
  const full = { day: "numeric", month: "long", year: "numeric" } as const;
  if (!end || end === start) return fmt(start, lang, full);
  if (start.slice(0, 7) === end.slice(0, 7)) return `${fmt(start, lang, { day: "numeric" })}-${fmt(end, lang, full)}`;
  return `${fmt(start, lang, { day: "numeric", month: "long" })} - ${fmt(end, lang, full)}`;
}
