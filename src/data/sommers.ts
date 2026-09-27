import { locale, type L, type Lang } from "../i18n";

const b = (cs: string, en: string): L => ({ cs, en });
const bl = (cs: string[], en: string[]): L<string[]> => ({ cs, en });

export const sommers = {
  name: "Sommers",
  email: "Sommers-srazy@post.cz",
  hosts: "Sommers, Iglite, Magnas",
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
  {
    slug: "oralni-odpoledne-tuklaty",
    kind: "setkani",
    title: b("Open Hangar", "Open Hangar"),
    start: "2026-06-06",
    place: b("Tuklaty, prostor za obecním úřadem", "Tuklaty, behind the municipal office"),
    gps: [50.086, 14.769],
    summary: b("Neformální odpolední pokec v Tuklatech. Výstavy, gulášování a občerstvení.", "An informal afternoon chat in Tuklaty. Exhibitions, goulash and refreshments."),
    body: bl(
      [
        "Sejdeme se v sobotu 6. června v Tuklatech v prostoru za obecním úřadem. Čas není přesně stanovený, ale budeme tam mezi třináctou a osmnáctou hodinou. Tak kdo chcete, přijďte za námi na pokec.",
        "Parkovat auto se dá u kostela, který je poblíž, nebo přímo před OÚ.",
        "V ten den v Tuklatech probíhají dvě výstavy. Uvidíte historické hornické předměty a výstroj do ČS stíhaček. Vstupné je dobrovolné. V areálu bude gulášování a další zábavné atrakce a ukázky. Dá se tam koupit občerstvení, jídlo i nápoje.",
        "Na Open Hangar se prosím zaregistrujte mailem na Sommers-srazy@post.cz.",
        "Děkuji za účast. Bylo to moc fajn setkání.",
      ],
      [
        "We meet on Saturday 6 June in Tuklaty, behind the municipal office. No fixed time, but we will be there between 13:00 and 18:00. Come and join us for a chat.",
        "You can park by the church nearby or right in front of the municipal office.",
        "Two exhibitions run in Tuklaty that day: historic mining equipment and Czechoslovak fighter-pilot gear. Admission is voluntary. There will be a goulash cook-off, other attractions and demonstrations, and food and drinks to buy.",
        "Please register for Open Hangar by e-mail at Sommers-srazy@post.cz.",
        "Thank you for coming. It was a really lovely meetup.",
      ],
    ),
    seed: 606,
  },
  {
    slug: "48-sraz-berounkovani-po-nasem",
    kind: "sraz",
    number: 48,
    title: b("River Camp", "River Camp"),
    start: "2026-05-29",
    end: "2026-05-31",
    place: b("Řevnice u Prahy", "Řevnice near Prague"),
    gps: [49.914, 14.236],
    price: b("1 590 Kč", "1,590 CZK"),
    capacity: b("78 osob", "78 people"),
    summary: b("Jarní sraz v rekreačním areálu u řeky. Chatky, Bazárek, špekáčkování a soutěž.", "A spring meetup at a riverside holiday site. Cabins, a swap market, a sausage roast and a contest."),
    team,
    accommodation: bl(
      [
        "Příjezd do areálu je možný od 15:00 hodin.",
        "Ubytování je zajištěno v rekreačním areálu u řeky ve čtyř-, pěti- a šestilůžkových chatkách. Kapacita areálu je 78 osob. O počtu účastníků nerozhoduje registrace, ale zaplacení účastnického poplatku.",
        "Přesnou adresu obdržíš na základě zaplacení účastnického poplatku 1 590 Kč, několik dnů před akcí. V této ceně je ubytování na dvě noci, veškeré jídlo od páteční večeře do nedělní snídaně včetně a špekáčkování. Po celou dobu pobytu je k dispozici káva, čaj, mléko, kakao, limo, voda a buchty.",
        "Naše srazy jsou bez personálu, proto se všichni srazující obsluhují sami a též po sobě sami uklízejí. Je NUTNÉ si s sebou vzít povlečení a prostěradlo.",
        "Na srazu bude k dispozici točené pivo (Kozel 11°), půllitr za 30 Kč. Alkohol si můžeš dovézt i svůj. Pokud budeš pít pivo, vezmi si prosím s sebou vlastní půllitr.",
      ],
      [
        "Arrival at the site from 15:00.",
        "Accommodation is in four-, five- and six-bed cabins at a riverside holiday site that holds 78 people. Places go to those who have paid the fee, not to those who registered.",
        "You get the exact address a few days before the event, once you have paid the 1,590 CZK fee. It covers two nights, all meals from Friday dinner to Sunday breakfast and the sausage roast. Coffee, tea, milk, cocoa, lemonade, water and cakes are available the whole time.",
        "Our meetups have no staff, so everyone serves themselves and cleans up after themselves. You MUST bring your own bed linen and sheet.",
        "Draught beer (Kozel 11°) is available at 30 CZK a pint. You can bring your own alcohol. If you drink beer, please bring your own pint glass.",
      ],
    ),
    menuNote: b("Diety prosím hlaste předem.", "Please report dietary needs in advance."),
    menu: [
      { day: day.friDinner, items: bl(["knedlíčková polévka s nudlemi", "pečená krkovice, vařené brambory, špenát"], ["dumpling soup with noodles", "roast pork neck, boiled potatoes, spinach"]) },
      {
        day: day.satBreakfast,
        items: bl(
          ["paštika, máslo, salám suchý, měkký, sýr plátky, sýr k namazání", "jogurt bílý, ovocný, marmeláda, med, müsli, cornflakes", "rohlíky, chleba, buchty"],
          ["pâté, butter, dry and soft salami, sliced cheese, cream cheese", "plain and fruit yoghurt, jam, honey, muesli, cornflakes", "rolls, bread, cakes"],
        ),
      },
      {
        day: day.satLunch,
        items: bl(
          ["hovězí vývar s nudlemi", "svíčková na smetaně, houskový knedlík", "odpoledne opékání špekáčků na ohni"],
          ["beef broth with noodles", "svíčková (beef in cream sauce), bread dumplings", "afternoon sausage roast over the fire"],
        ),
      },
      { day: day.satDinner, items: bl(["vepřová kotleta na slanině, rýže"], ["pork chop with bacon, rice"]) },
      {
        day: day.sunBreakfast,
        items: bl(
          ["paštika, máslo, salám suchý, měkký, sýr plátky, sýr k namazání", "jogurt bílý, ovocný, marmeláda, med, müsli, cornflakes", "rohlíky, chleba, buchty"],
          ["pâté, butter, dry and soft salami, sliced cheese, cream cheese", "plain and fruit yoghurt, jam, honey, muesli, cornflakes", "rolls, bread, cakes"],
        ),
      },
    ],
    programIntro: bl(
      [
        "Pro hravé účastníky je přichystána soutěž a další aktivity, jejichž podrobný popis rozešlu mailem. Povinného není nic, jen časy k jídlu a dresscode na společné foto.",
        "V areálu máme k dispozici menší místnost, ve které v sobotu proběhne Bazárek, po zbytek pobytu ji budeme používat jako hernu a pro všechny v ní platí pravidla bezpečnosti BDSM.",
      ],
      [
        "A contest and other activities are ready for playful guests; details go out by e-mail. Nothing is compulsory except meal times and the dress code for the group photo.",
        "A smaller room on site hosts the swap market on Saturday; the rest of the stay it is our playroom, and the BDSM safety rules apply to everyone in it.",
      ],
    ),
    schedule: [
      { day: day.fri, items: bl(["příjezd od 15 hodin", "19:00 večeře", "dle zájmu taneček, volná zábava"], ["arrival from 15:00", "19:00 dinner", "dancing if you like, free time"]) },
      {
        day: day.sat,
        items: bl(
          ["po probuzení snídaně", "11:00-13:00 Bazárek", "14:00 oběd", "15:30 soutěž", "opékání špekáčků", "19:00 večeře", "20:30 společné foto", "vyhlášení výherců soutěže", "pasování nováčků", "dle zájmu taneček, volná zábava"],
          ["breakfast when you wake up", "11:00-13:00 swap market", "14:00 lunch", "15:30 contest", "sausage roast", "19:00 dinner", "20:30 group photo", "contest winners announced", "newcomer initiation", "dancing if you like, free time"],
        ),
      },
      {
        day: day.sun,
        items: bl(
          ["po probuzení snídaně", "úklid chatek, společenské místnosti a kuchyně", "do 12 hodin loučení a rozjezd k domovům"],
          ["breakfast when you wake up", "clean-up of cabins, common room and kitchen", "goodbyes and departure by 12:00"],
        ),
      },
    ],
    other: {
      cs: [
        "V chatkách je přísný zákaz kouření. Kouřit se smí pouze ve vyhrazeném prostoru.",
        "Do Řevnic se dostaneš pohodlně vlakem. Zastávka vlaku se nachází 1 km od areálu. V případě zájmu zajistím odvoz z nádraží.",
        carpool.cs,
        "Změna programu a jídelníčku vyhrazena.",
      ],
      en: [
        "Smoking is strictly forbidden in the cabins. Smoking only in the designated area.",
        "Řevnice is easy to reach by train. The station is 1 km from the site; a pick-up from the station can be arranged.",
        carpool.en,
        "Programme and menu may change.",
      ],
    },
    sponsors: ["Lykra", "RubberLTX", "Princezna", "Magnas"],
    seed: 48,
  },
  {
    slug: "jarni-vabeni-xii",
    kind: "setkani",
    title: b("Lookout XII", "Lookout XII"),
    start: "2026-04-11",
    place: b("Brno-Komín, rozhledna Holedná", "Brno-Komín, Holedná lookout tower"),
    gps: [49.217, 16.515],
    summary: b("Jarní procházka na rozhlednu Holedná a pozdní oběd v restauraci U Dvořáků.", "A spring walk to the Holedná lookout tower and a late lunch at U Dvořáků restaurant."),
    body: bl(
      [
        "Sešli jsme se v sobotu 11. dubna 2026 ve 12 hodin v Brně-Komíně na břehu řeky Svratky před budovou Sokola a šli jsme se pomalou procházkou podívat na Brno shora z rozhledny Holedná v Jundrově.",
        "Na procházce nám vyhládlo, a tak následoval pozdní oběd v restauraci U Dvořáků v Brně-Komíně. Kdo nechtěl jít na procházku, přidal se až v restauraci.",
        "Rodinní příslušníci a Quálíci jsou žádoucí, neboť akce je civilní.",
      ],
      [
        "We met on Saturday 11 April 2026 at noon in Brno-Komín, on the bank of the Svratka in front of the Sokol building, and took a slow walk up to the Holedná lookout tower in Jundrov to see Brno from above.",
        "The walk made us hungry, so a late lunch followed at U Dvořáků in Brno-Komín. Those who skipped the walk joined us at the restaurant.",
        "Family members and non-kinky friends are welcome, as this is a plain-clothes event.",
      ],
    ),
    seed: 411,
  },
  {
    slug: "47-sraz-radostne-vanoce-a-rozverny-silvestr",
    kind: "sraz",
    number: 47,
    title: b("Zero Hour", "Zero Hour"),
    start: "2026-02-06",
    end: "2026-02-08",
    place: destne,
    gps: destneGps,
    price: b("1 890 Kč", "1,890 CZK"),
    capacity: b("100 lidí", "100 people"),
    summary: b(
      "Zimní sraz v duchu Vánoc a silvestra: Dárečkování, soutěž Chlebíčkování a silvestrovská půlnoc.",
      "A winter meetup in the spirit of Christmas and New Year's Eve: a gift swap, an open-sandwich contest and a midnight toast.",
    ),
    team,
    accommodation: bl(
      [
        "Příjezd do areálu je možný od 15 hodin.",
        "Ubytování pro 50 lidí je zajištěno v pokojích v patře horské chaty, další v apartmánu nebo bungalovech po 5 až 12 lidech. Kapacita areálu je 100 lidí.",
        "V ceně 1 890 Kč je ubytování na dvě noci, jídlo od páteční večeře do nedělní snídaně včetně, buchty a nealko nápoje, vánoční cukroví, silvestrovský přípitek a dva chlebíčky.",
      ],
      [
        "Arrival at the site from 15:00.",
        "Rooms for 50 people are on the upper floor of the lodge, more in an apartment or bungalows for 5 to 12 people. The site holds 100 people.",
        "The 1,890 CZK fee covers two nights, meals from Friday dinner to Sunday breakfast, cakes and soft drinks, Christmas cookies, a New Year's toast and two open sandwiches.",
      ],
    ),
    menuNote: b(
      "Diety prosím hlaste předem. Do registračního e-mailu napište výběr páteční večeře.",
      "Please report dietary needs in advance and include your Friday dinner choice in the registration e-mail.",
    ),
    menu: [
      {
        day: day.friDinner,
        items: bl(
          ["polévka rybí nebo hrášková, obě s rohlíkovými krutony", "smažený řízek: kapr, kuřecí prsa nebo vepřová krkovice", "bramborový salát nebo vařené brambory, kompot, zelenina"],
          ["fish or pea soup, both with croutons", "breaded schnitzel: carp, chicken breast or pork neck", "potato salad or boiled potatoes, compote, vegetables"],
        ),
      },
      { day: day.satLunch, items: bl(["masový vývar", "kuřecí prsa na žampionech, rýže"], ["meat broth", "chicken breast with mushrooms, rice"]) },
      { day: day.satDinner, items: bl(["pečené vepřové maso, houskový knedlík, špenát"], ["roast pork, bread dumplings, spinach"]) },
    ],
    programIntro: bl(
      ["Tímto srazem nás provázel duch Vánoc a silvestra. Jednu chatku jsme využívali jako hernu."],
      ["This meetup was all about Christmas and New Year's Eve. One cabin served as our playroom."],
    ),
    schedule: [
      {
        day: b("Pátek 6. února: Vánoce", "Friday 6 February: Christmas"),
        items: bl(
          ["příjezd od 15:00", "19:00 společná večeře, oblečky vítány", "po večeři Dárečkování", "volná zábava, dle zájmu taneček"],
          ["arrival from 15:00", "19:00 dinner together, outfits welcome", "gift swap after dinner", "free time, dancing if you like"],
        ),
      },
      {
        day: b("Sobota 7. února: silvestr", "Saturday 7 February: New Year's Eve"),
        items: bl(
          ["po probuzení snídaně", "14:00 oběd", "15:30 soutěž Chlebíčkování", "19:00 večeře", "20:30 společné foto", "vyhlášení výherců", "pasování nováčků", "24:00 silvestrovská půlnoc při přípitku, hymně a tanečku"],
          ["breakfast when you wake up", "14:00 lunch", "15:30 open-sandwich contest", "19:00 dinner", "20:30 group photo", "winners announced", "newcomer initiation", "24:00 midnight with a toast, the anthem and a dance"],
        ),
      },
      {
        day: b("Neděle 8. února", "Sunday 8 February"),
        items: bl(
          ["po probuzení snídaně", "úklid ubytovacích a společných prostor", "do 12 hodin loučení a rozjezd k domovům"],
          ["breakfast when you wake up", "clean-up of rooms and shared spaces", "goodbyes and departure by 12:00"],
        ),
      },
    ],
    extras: [
      {
        title: b("Dárečkování", "Gift swap"),
        text: b(
          "Dobrovolná aktivita, při které účastníci obdarují ostatní srazující malinkou pozorností v ceně 10 až 15 Kč za dárek. Kdo dárky donese, ten i dárky dostane. Jde o princip Vánoc, ne o zruinování.",
          "A voluntary activity where guests give each other tiny presents worth 10 to 15 CZK each. Whoever brings gifts gets gifts. It is about the spirit of Christmas, not about going broke.",
        ),
      },
    ],
    other: {
      cs: ["Celá chata, apartmány i bungalovy jsou striktně nekuřácké.", transportDestne.cs],
      en: ["The whole lodge, apartments and bungalows are strictly non-smoking.", transportDestne.en],
    },
    sponsors: ["Lykra"],
    seed: 47,
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

export const upcomingEditions = () => editions.filter(isUpcomingEdition).sort((a, b) => a.start.localeCompare(b.start));

export const pastEditions = () => editions.filter((e) => !isUpcomingEdition(e)).sort((a, b) => b.start.localeCompare(a.start));

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
