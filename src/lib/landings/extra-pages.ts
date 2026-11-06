import { SERVICE_AREA_NAMES } from "@/lib/areas";
import { BRAND_SLIDES, brandSlideAlt, brandSlideCaption } from "@/lib/brand-slides";
import type { CityId, ServiceId } from "@/lib/landings/slugs";
import type { Crumb, LandingLink, LandingPage } from "@/lib/landings/types";

const home: Crumb = { name: "Accueil", pathname: "/" };
const servicesCrumb: Crumb = { name: "Nos services", pathname: "/nos-services" };

type Area = {
  id: CityId;
  name: string;
  inCity: string;
  summary: string;
  /** Short phrase used only to keep the meta description inside 140–160 characters. */
  meta: string;
  climate: string;
  buildings: string;
  works: string;
  soil: string;
};

const AREAS: Record<CityId, Area> = {
  casablanca: {
    id: "casablanca",
    name: "Casablanca",
    inCity: "à Casablanca",
    summary: "immeubles et villas face à l'humidité atlantique, parfois au sel de la corniche.",
    meta: "immeubles et villas du littoral.",
    climate: "L'humidité atlantique, et le sel vers la corniche, pèsent sur les prises d'air et les appareils extérieurs.",
    buildings: "les immeubles d'Anfa ou de Californie et les villas",
    works: "Les syndics limitent souvent ce qui se voit en façade.",
    soil: "l'humidité et le sel",
  },
  rabat: {
    id: "rabat",
    name: "Rabat",
    inCity: "à Rabat",
    summary: "maisons de Souissi, appartements d'Agdal et villas de Hay Riad, sous un air océanique humide.",
    meta: "Souissi, Agdal et Hay Riad.",
    climate: "L'air océanique reste humide, sans le même sel qu'à Ain Diab.",
    buildings: "les maisons de Souissi, les appartements d'Agdal et Hay Riad",
    works: "Les hauteurs sous plafond changent beaucoup d'un quartier à l'autre.",
    soil: "l'humidité marine",
  },
  marrakech: {
    id: "marrakech",
    name: "Marrakech",
    inCity: "à Marrakech",
    summary: "villas de la Palmeraie, logements de Guéliz et de l'Hivernage, sous une chaleur sèche et de la poussière.",
    meta: "la Palmeraie, Guéliz et l'Hivernage.",
    climate: "La chaleur est sèche, le soleil est fort et la poussière circule.",
    buildings: "les villas de la Palmeraie, Guéliz et l'Hivernage",
    works: "Les toitures exposées encrassent filtres et prises d'air plus vite que sur le littoral.",
    soil: "la poussière",
  },
  mohammedia: {
    id: "mohammedia",
    name: "Mohammedia",
    inCity: "à Mohammedia",
    summary: "logements et locaux d'activité sur le littoral, entre Casablanca et Rabat.",
    meta: "le littoral entre Casablanca et Rabat.",
    climate: "La ville est côtière, entre Casablanca et Rabat : l'air marin y est humide.",
    buildings: "les logements et les locaux d'activité",
    works: "Habitat et zones d'activité se suivent sur un court linéaire.",
    soil: "l'air marin",
  },
  bouskoura: {
    id: "bouskoura",
    name: "Bouskoura",
    inCity: "à Bouskoura",
    summary: "villas et lotissements récents au sud-ouest de Casablanca, plus exposés à la poussière qu'au sel.",
    meta: "les villas au sud-ouest de Casablanca.",
    climate: "La poussière de jardin ou de chantier domine, plus que le sel de l'océan.",
    buildings: "les villas et les lotissements récents",
    works: "En neuf, les réseaux se réservent souvent avant la plâtrerie.",
    soil: "la poussière de chantier ou de jardin",
  },
  tamaris: {
    id: "tamaris",
    name: "Tamaris",
    inCity: "à Tamaris",
    summary: "villas du littoral, côté Dar Bouazza, exposées au vent et à l'air marin.",
    meta: "les villas face à l'air marin.",
    climate: "Les villas du littoral, côté Dar Bouazza, prennent l'air marin de face.",
    buildings: "les maisons exposées au vent et à l'humidité",
    works: "Le sel atteint plus directement les appareils extérieurs qu'à l'intérieur de Casablanca.",
    soil: "le sel et le vent",
  },
  zenata: {
    id: "zenata",
    name: "Zenata",
    inCity: "à Zenata",
    summary: "immeubles récents et chantiers entre Casablanca et Mohammedia.",
    meta: "les immeubles neufs du secteur.",
    climate: "Le secteur est neuf, entre Casablanca et Mohammedia, encore proche du littoral.",
    buildings: "les immeubles récents et les chantiers en cours",
    works: "Les fourreaux et les gaines se prévoient avant les finitions.",
    soil: "la poussière de chantier",
  },
};

const NEW_CLIM_CITIES: readonly CityId[] = ["mohammedia", "bouskoura", "tamaris", "zenata"];
const TRADE_CITIES: readonly CityId[] = [
  "casablanca",
  "rabat",
  "marrakech",
  "mohammedia",
  "bouskoura",
  "tamaris",
  "zenata",
];

const NEIGHBORS: Record<CityId, readonly CityId[]> = {
  casablanca: ["mohammedia", "bouskoura", "tamaris"],
  rabat: ["mohammedia", "casablanca"],
  marrakech: ["casablanca", "rabat"],
  mohammedia: ["casablanca", "zenata", "rabat"],
  bouskoura: ["casablanca", "tamaris"],
  tamaris: ["casablanca", "bouskoura"],
  zenata: ["mohammedia", "casablanca"],
};

function link(path: string, label: string): LandingLink {
  if (!path.startsWith("/")) throw new Error(`Bad link ${path}`);
  return { href: path as `/${string}`, label };
}

function metaDescription(slug: string, lead: string, pads: readonly string[]): string {
  let text = lead.replace(/\s+/g, " ").trim();
  if (text.length > 160) throw new Error(`long ${slug} ${text.length}: ${text}`);
  const fillers = [...pads, "Le relevé tranche.", "Visite sur place.", "Avant la pose."];
  for (const pad of fillers) {
    if (text.length >= 140) break;
    const next = `${text} ${pad}`;
    if (next.length <= 160) text = next;
  }
  if (text.length < 140 || text.length > 160) {
    throw new Error(`${slug} description ${text.length}: ${text}`);
  }
  return text;
}

function pageTitle(slug: string, title: string): string {
  const full = /aeroventis/i.test(title) ? title : `${title} | AEROVENTIS`;
  if (full.length > 60) throw new Error(`title ${slug} ${full.length}: ${full}`);
  return title;
}

function slide(src: string, subject: string): LandingPage["image"] {
  return {
    src,
    alt: brandSlideAlt(subject),
    caption: brandSlideCaption(subject),
  };
}

function visitFaq(areaName: string): { question: string; answer: string } {
  return {
    question: "Comment demander une visite ?",
    answer: `Indiquez ${areaName}, le type de bâtiment et s'il s'agit de neuf ou de rénovation sur la page contact. Un technicien convient ensuite d'un passage pour voir les lieux.`,
  };
}

function ventilationCity(area: Area): LandingPage {
  const slug = `ventilation-${area.id}`;
  const pads = [
    "Le débit se mesure sur place.",
    "L'extraction et le désenfumage sont d'autres réseaux.",
  ];
  return {
    slug,
    locales: ["fr"],
    serviceId: "ventilation",
    serviceType: "Ventilation",
    cityId: area.id,
    areaServed: [area.name],
    title: pageTitle(slug, `Ventilation à ${area.name}`),
    description: metaDescription(
      slug,
      `Ventilation ${area.inCity} : air neuf et gaines pour ${area.meta}`,
      pads
    ),
    h1: `Ventilation à ${area.name}`,
    lead: [
      `La ventilation ${area.inCity} sert à renouveler l'air, pas seulement à le brasser. ${area.climate}`,
      `${area.works} ${area.buildings.charAt(0).toUpperCase()}${area.buildings.slice(1)} ne partent pas du même plan de gaines. L'extraction des pièces humides peut s'y rattacher. Le désenfumage, lui, reste un réseau de sécurité à part.`,
    ],
    servicesIntro: `Trois points se regardent ${area.inCity} avant de dessiner un réseau.`,
    services: [
      {
        title: "Air neuf",
        body: "Entrées d'air ou prise extérieure, placées loin des rejets et des sources de poussière du site.",
      },
      {
        title: "Gaines et bouches",
        body: "Sections et parcours pour limiter le bruit et les pertes, dans le plénum disponible.",
      },
      {
        title: "Débits",
        body: "Équilibre entre l'air apporté et l'air extrait, pièce par pièce, après le relevé.",
      },
    ],
    comparisonIntro: `Ce qui se décide sur le terrain ${area.inCity}, une fois le logement vu.`,
    showHvacComparison: false,
    points: [
      {
        title: "Compensation",
        body: "Une extraction sans entrée d'air met le volume en dépression. On le vérifie avant la pose.",
      },
      {
        title: "Bruit",
        body: "La vitesse dans les gaines et l'emplacement du ventilateur se jugent sur le plan réel.",
      },
      {
        title: "Entretien",
        body: `Filtres et ventilateurs doivent rester accessibles : ${area.soil} les encrasse.`,
      },
    ],
    image: slide(BRAND_SLIDES.ventilation, "ventilation et qualité d'air, y compris l'extraction"),
    processIntro: `Le déroulé est le même partout. Le contenu de la visite, ${area.inCity}, ne l'est pas.`,
    process: [
      `Voir ${area.buildings}, les prises d'air possibles et les rejets. ${area.works}`,
      "Choisir le réseau d'air neuf et, s'il le faut, l'extraction des pièces humides, sans ratio unique.",
      `Poser les gaines, équilibrer les débits et contrôler le sens de l'air ${area.inCity}.`,
      `Laisser un accès pour le suivi : ${area.soil} encrasse filtres et prises d'air.`,
    ],
    faqs: [
      {
        question: `Qu'est-ce qui change la ventilation ${area.inCity} ?`,
        answer: `${area.climate} ${area.works} Le débit se calcule sur le logement réel.`,
      },
      {
        question: "La ventilation remplace-t-elle la climatisation ?",
        answer:
          "Non. La ventilation renouvelle l'air. La climatisation traite la température. Les deux réseaux se coordonnent, ils ne se confondent pas.",
      },
      {
        question: "Extraction et désenfumage sont-ils inclus ?",
        answer:
          "L'extraction des cuisines et sanitaires peut faire partie du projet. Le désenfumage est un autre réseau, décrit sur sa page, prévu pour les fumées et non pour le confort quotidien.",
      },
      {
        question: "Faut-il un faux plafond ?",
        answer: `${area.works} S'il n'y a pas de plénum, le parcours des gaines se trouve autrement, ou le projet se limite aux pièces qui peuvent être traitées.`,
      },
      visitFaq(area.name),
    ],
    links: tradeLinks("ventilation", area.id),
    breadcrumbs: [
      home,
      servicesCrumb,
      { name: "Ventilation", pathname: "/ventilation" },
      { name: `Ventilation à ${area.name}` },
    ],
  };
}

function plomberieCity(area: Area): LandingPage {
  const slug = `plomberie-${area.id}`;
  const pads = [
    "Colonnes et évacuations se vérifient avant le tracé.",
    "La visite précède la pose.",
  ];
  return {
    slug,
    locales: ["fr"],
    serviceId: "plomberie",
    serviceType: "Plomberie",
    cityId: area.id,
    areaServed: [area.name],
    title: pageTitle(slug, `Plomberie à ${area.name}`),
    description: metaDescription(
      slug,
      `Plomberie ${area.inCity} : alimentation et évacuations pour ${area.meta}`,
      pads
    ),
    h1: `Plomberie à ${area.name}`,
    lead: [
      `La plomberie ${area.inCity} se décide sur l'état des alimentations, des évacuations et des pièces d'eau. ${area.climate}`,
      `${area.works} ${area.buildings.charAt(0).toUpperCase()}${area.buildings.slice(1)} n'offrent pas les mêmes colonnes ni les mêmes hauteurs de raccordement.`,
    ],
    servicesIntro: `Trois familles de travaux reviennent ${area.inCity}. Le relevé dit lesquelles s'appliquent.`,
    services: [
      {
        title: "Alimentation",
        body: "Distribution d'eau froide et d'eau chaude, avec le chemin réel des canalisations et les appareils prévus.",
      },
      {
        title: "Évacuations",
        body: "Pentes, diamètres et raccordement aux chutes existantes, vérifiés avant de figer un tracé.",
      },
      {
        title: "Pièces d'eau",
        body: "Salles d'eau et appareils, en neuf ou en rénovation, selon l'accès et l'état du support.",
      },
    ],
    comparisonIntro: `Ce qui se décide sur place ${area.inCity}.`,
    showHvacComparison: false,
    points: [
      {
        title: "Existant",
        body: "En rénovation, l'état des colonnes et des attentes se voit avant de promettre un nouveau tracé.",
      },
      {
        title: "Neuf",
        body: area.works,
      },
      {
        title: "Coordination",
        body: "Les évacuations de condensats d'une climatisation et les réseaux sanitaires se croisent souvent. On les relève ensemble.",
      },
    ],
    image: slide(BRAND_SLIDES.solutions, "solutions résidentielles et tertiaires"),
    processIntro: `Même déroulé d'un secteur à l'autre. ${area.inCity}, le relevé change.`,
    process: [
      `Voir ${area.buildings}, les arrivées d'eau et les chutes. ${area.works}`,
      "Choisir les diamètres et les parcours à partir de ce qui existe, pas d'un schéma type.",
      `Poser, mettre en eau et contrôler les évacuations ${area.inCity}.`,
      "Laisser les organes accessibles pour un contrôle ultérieur, sans démonter les finitions.",
    ],
    faqs: [
      {
        question: `Qu'est-ce qui change la plomberie ${area.inCity} ?`,
        answer: `${area.buildings.charAt(0).toUpperCase()}${area.buildings.slice(1)} n'ont pas les mêmes colonnes. ${area.works}`,
      },
      {
        question: "La plomberie est-elle liée à la climatisation ?",
        answer:
          "Les condensats d'une climatisation doivent partir vers une évacuation réelle. Ce raccord se vérifie avec le réseau sanitaire, il ne se suppose pas.",
      },
      {
        question: "Intervenez-vous en rénovation ?",
        answer:
          "Oui, après avoir vu les canalisations existantes. Un tracé dessiné sans ouvrir ou sans constater les attentes serait faux.",
      },
      {
        question: "Les pièces d'eau se traitent-elles toutes pareil ?",
        answer: `${area.climate} L'accès, la ventilation de la pièce et la position des évacuations comptent autant que l'appareil choisi.`,
      },
      visitFaq(area.name),
    ],
    links: tradeLinks("plomberie", area.id),
    breadcrumbs: [
      home,
      servicesCrumb,
      { name: "Plomberie", pathname: "/plomberie" },
      { name: `Plomberie à ${area.name}` },
    ],
  };
}

function tradeLinks(service: "ventilation" | "plomberie", city: CityId): LandingLink[] {
  const area = AREAS[city];
  const other = service === "ventilation" ? "plomberie" : "ventilation";
  const otherLabel = other === "ventilation" ? "Ventilation" : "Plomberie";
  const links: LandingLink[] = [
    link(`/${service}`, service === "ventilation" ? "Ventilation" : "Plomberie"),
    link(`/${other}-${city}`, `${otherLabel} ${area.inCity}`),
    link(`/climatisation-${city}`, `Climatisation ${area.inCity}`),
  ];
  if (service === "ventilation") {
    links.push(link("/extraction", "Extraction d'air"), link("/desenfumage", "Désenfumage"));
  }
  for (const neighbor of NEIGHBORS[city]) {
    links.push(
      link(`/${service}-${neighbor}`, `${service === "ventilation" ? "Ventilation" : "Plomberie"} à ${AREAS[neighbor].name}`)
    );
  }
  links.push(link("/zone-intervention", "Zone d'intervention"), link("/contact", "Contact"));
  return links;
}

function climCity(area: Area): LandingPage {
  const slug = `climatisation-${area.id}`;
  const pads = ["Le choix suit le relevé du logement.", "La hauteur sous plafond tranche souvent."];
  return {
    slug,
    locales: ["fr"],
    serviceId: "climatisation",
    serviceType: "Climatisation",
    cityId: area.id,
    areaServed: [area.name],
    title: pageTitle(slug, `Climatisation à ${area.name}`),
    description: metaDescription(
      slug,
      `Climatisation ${area.inCity} : split, gainable ou VRV pour ${area.meta}`,
      pads
    ),
    h1: `Climatisation à ${area.name}`,
    lead: [
      `La climatisation ${area.inCity} ne se résume pas à une puissance au mètre carré. ${area.climate}`,
      `${area.works} ${area.buildings.charAt(0).toUpperCase()}${area.buildings.slice(1)} imposent des emplacements de groupes et des hauteurs de plafond différents.`,
    ],
    servicesIntro: `Trois familles d'appareils. ${area.inCity}, le relevé dit laquelle a un sens.`,
    services: [
      {
        title: "Split et multi-split",
        body: "Quelques pièces, ou un plafond trop bas pour des gaines. Le groupe extérieur doit rester accessible et acceptable sur la façade.",
      },
      {
        title: "Gainable",
        body: "Plusieurs pièces depuis un plénum, quand la hauteur existe et que les gaines ont un parcours.",
      },
      {
        title: "VRV / DRV",
        body: "Plusieurs locaux sur peu de groupes, plutôt pour un petit ensemble que pour une seule pièce.",
      },
    ],
    comparisonIntro: `Le tableau rappelle les principes. La ligne du secteur dit ce qui pèse ${area.inCity}.`,
    showHvacComparison: true,
    localFit: {
      split: `${area.buildings.charAt(0).toUpperCase()}${area.buildings.slice(1)} : le split reste pertinent quand le plénum manque. ${area.climate}`,
      gainable: `Possible si un faux plafond continu existe. ${area.works}`,
      vrv: "Réservé à plusieurs locaux alimentés par peu de groupes. Inutile pour une seule pièce.",
    },
    image: slide(BRAND_SLIDES.exterieur, "unités extérieures et implantation"),
    processIntro: `Même étapes qu'ailleurs. ${area.inCity}, le contenu change.`,
    process: [
      `Relever ${area.buildings}, l'orientation et l'emplacement possible des groupes. ${area.works}`,
      "Choisir split, gainable ou VRV à partir de ce relevé, pièce par pièce.",
      `Poser les liaisons, évacuer les condensats et contrôler les températures de soufflage ${area.inCity}.`,
      `Prévoir le lavage : ${area.soil} encrasse filtres et groupes.`,
    ],
    faqs: [
      {
        question: `Quel système regarde-t-on d'abord ${area.inCity} ?`,
        answer: `${area.works} S'il n'y a pas de plénum, on part plutôt sur un split. Le gainable suppose une hauteur réelle, mesurée.`,
      },
      {
        question: "Le climat local change-t-il le choix ?",
        answer: `${area.climate} Ce n'est pas le même point de départ qu'une ville intérieure ou qu'un autre quartier du littoral.`,
      },
      {
        question: "La ventilation est-elle comprise ?",
        answer:
          "Non. La climatisation traite la température. L'air neuf, l'extraction et le désenfumage ont leurs pages : ce sont d'autres réseaux.",
      },
      {
        question: "Où voir les autres secteurs ?",
        answer:
          "Casablanca, Rabat et Marrakech ont leurs pages. Mohammedia, Bouskoura, Tamaris et Zenata aussi. Le hub climatisation relie l'ensemble.",
      },
      visitFaq(area.name),
    ],
    links: [
      link("/climatisation", "Climatisation au Maroc"),
      link(`/ventilation-${area.id}`, `Ventilation ${area.inCity}`),
      link(`/plomberie-${area.id}`, `Plomberie ${area.inCity}`),
      ...NEIGHBORS[area.id].map((id) => link(`/climatisation-${id}`, `Climatisation à ${AREAS[id].name}`)),
      link("/contact", "Contact"),
    ],
    breadcrumbs: [
      home,
      servicesCrumb,
      { name: "Climatisation", pathname: "/climatisation" },
      { name: `Climatisation à ${area.name}` },
    ],
  };
}

function hubShell(input: {
  slug: string;
  serviceId: ServiceId;
  serviceType: string;
  title: string;
  h1: string;
  descriptionLead: string;
  pads: readonly string[];
  lead: readonly string[];
  servicesIntro: string;
  services: LandingPage["services"];
  comparisonIntro: string;
  points: NonNullable<LandingPage["points"]>;
  image: LandingPage["image"];
  processIntro: string;
  process: readonly string[];
  faqs: LandingPage["faqs"];
  links: readonly LandingLink[];
}): LandingPage {
  return {
    slug: input.slug,
    locales: ["fr"],
    serviceId: input.serviceId,
    serviceType: input.serviceType,
    areaServed: SERVICE_AREA_NAMES,
    title: pageTitle(input.slug, input.title),
    description: metaDescription(input.slug, input.descriptionLead, input.pads),
    h1: input.h1,
    lead: input.lead,
    servicesIntro: input.servicesIntro,
    services: input.services,
    comparisonIntro: input.comparisonIntro,
    showHvacComparison: false,
    points: input.points,
    image: input.image,
    processIntro: input.processIntro,
    process: input.process,
    faqs: input.faqs,
    links: input.links,
    breadcrumbs: [home, servicesCrumb, { name: input.h1 }],
  };
}

const cityLinks = (prefix: "ventilation" | "plomberie", label: string): LandingLink[] =>
  TRADE_CITIES.map((id) => link(`/${prefix}-${id}`, `${label} à ${AREAS[id].name}`));

const ventilationHub: LandingPage = hubShell({
  slug: "ventilation",
  serviceId: "ventilation",
  serviceType: "Ventilation",
  title: "Ventilation et qualité d'air",
  h1: "Ventilation et qualité d'air",
  descriptionLead:
    "Ventilation et qualité d'air : apport d'air neuf, gaines et bouches pour villas et immeubles au Maroc.",
  pads: ["De Casablanca à Marrakech, littoral compris.", "Le débit se mesure sur place."],
  lead: [
    "La ventilation renouvelle l'air intérieur. Elle ne refroidit pas une pièce à la place d'une climatisation, et elle ne désenfume pas un parking.",
    "AEROVENTIS étudie l'apport d'air neuf, les gaines, les bouches et, quand le projet le demande, l'extraction des pièces humides. Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat et Marrakech n'ont pas le même air extérieur : chaque page locale le précise.",
  ],
  servicesIntro: "Trois sujets reviennent sur chaque visite. La page de la ville ajoute ce que le site change.",
  services: [
    {
      title: "Air neuf",
      body: "D'où vient l'air, et comment il entre sans reprendre un rejet ou une zone poussiéreuse.",
    },
    {
      title: "Réseau",
      body: "Gaines, bouches et ventilateur, avec un parcours qui reste visitable.",
    },
    {
      title: "Extraction associée",
      body: "Cuisines et sanitaires peuvent être raccordés. Le désenfumage, non : il a sa page.",
    },
  ],
  comparisonIntro: "Ce qui se tranche avant de parler d'un matériel.",
  points: [
    {
      title: "Besoin",
      body: "Renouvellement d'air, extraction de pièces humides, ou les deux. Le mot ventilation ne suffit pas.",
    },
    {
      title: "Compensation",
      body: "L'air sorti doit pouvoir être remplacé. Sinon le logement se met en dépression.",
    },
    {
      title: "Climat local",
      body: "Humidité du littoral ou poussière de Marrakech : le même débit ne se protège pas de la même façon.",
    },
  ],
  image: slide(BRAND_SLIDES.ventilation, "ventilation et qualité d'air, y compris l'extraction"),
  processIntro: "Le détail par ville est sur les pages locales. Ici, l'ordre des étapes.",
  process: [
    "Visiter le bâtiment, les prises d'air possibles et les pièces à traiter.",
    "Dimensionner l'air neuf et l'extraction utile, sans copier un débit d'une autre ville.",
    "Poser, équilibrer et vérifier le sens de l'air.",
    "Prévoir l'accès aux filtres et aux ventilateurs pour le suivi.",
  ],
  faqs: [
    {
      question: "Quelle page lire selon le secteur ?",
      answer:
        "Chaque ville ou secteur a une page ventilation : Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata. Cette page est le sommaire.",
    },
    {
      question: "En quoi l'extraction est-elle différente ?",
      answer:
        "L'extraction évacue l'air vicié d'une cuisine, d'un sanitaire ou d'un local technique. La ventilation d'ensemble apporte l'air neuf. Les deux se coordonnent. La page extraction détaille le premier cas.",
    },
    {
      question: "Et le désenfumage ?",
      answer:
        "C'est un réseau de sécurité pour les fumées, pas une ventilation de confort. Il est décrit sur la page désenfumage et ne se dimensionne pas comme un renouvellement d'air.",
    },
    {
      question: "Faut-il une climatisation en plus ?",
      answer:
        "Seulement si le besoin est la température. Une ventilation ne remplace pas un split ou un gainable. Les pages climatisation traitent ce sujet.",
    },
    {
      question: "Comment demander une visite ?",
      answer:
        "La page contact sert à indiquer la ville, le type de bâtiment et le besoin : air neuf, extraction, ou les deux.",
    },
  ],
  links: [
    ...cityLinks("ventilation", "Ventilation"),
    link("/extraction", "Extraction d'air"),
    link("/desenfumage", "Désenfumage"),
    link("/plomberie", "Plomberie"),
    link("/climatisation", "Climatisation"),
    link("/contact", "Contact"),
  ],
});

const plomberieHub: LandingPage = hubShell({
  slug: "plomberie",
  serviceId: "plomberie",
  serviceType: "Plomberie",
  title: "Plomberie résidentielle et tertiaire",
  h1: "Plomberie résidentielle et tertiaire",
  descriptionLead:
    "Plomberie pour villas et immeubles : alimentation, évacuations et pièces d'eau sur le littoral et à Marrakech.",
  pads: ["Le relevé des colonnes précède le tracé."],
  lead: [
    "La plomberie couvre l'alimentation, les évacuations et les pièces d'eau, en neuf comme en rénovation. Elle ne se résume pas à un appareil posé sur une attente inconnue.",
    "Les pages locales décrivent Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata. Les condensats d'une climatisation s'y raccordent quand une évacuation réelle existe.",
  ],
  servicesIntro: "Trois familles de travaux. La page de la ville dit ce que le bâti change.",
  services: [
    {
      title: "Alimentation",
      body: "Eau froide et eau chaude, selon les appareils prévus et le chemin des canalisations.",
    },
    {
      title: "Évacuations",
      body: "Pentes, diamètres et raccordement aux chutes, constatés avant le tracé.",
    },
    {
      title: "Pièces d'eau",
      body: "Salles d'eau résidentielles ou locaux tertiaires, avec l'accès réel du chantier.",
    },
  ],
  comparisonIntro: "Ce qui se vérifie avant de figer un plan.",
  points: [
    {
      title: "Existant",
      body: "En rénovation, colonnes et attentes se voient. Un plan sans cette visite serait une hypothèse.",
    },
    {
      title: "Neuf",
      body: "Les réservations se font avant les finitions, surtout à Bouskoura et à Zenata où le chantier est souvent encore ouvert.",
    },
    {
      title: "Condensats",
      body: "L'eau d'une climatisation part dans une évacuation. Ce point se relève avec le sanitaire.",
    },
  ],
  image: slide(BRAND_SLIDES.installation, "installation et mise en œuvre"),
  processIntro: "L'ordre est stable. Le contenu dépend du secteur, détaillé sur chaque page ville.",
  process: [
    "Voir les arrivées, les chutes et les pièces d'eau.",
    "Choisir parcours et diamètres à partir de ce relevé.",
    "Poser, mettre en eau et contrôler les écoulements.",
    "Laisser vannes et trappes accessibles pour un contrôle ultérieur.",
  ],
  faqs: [
    {
      question: "Où sont les pages par secteur ?",
      answer:
        "Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata ont chacune une page plomberie. Cette page les relie.",
    },
    {
      question: "Travaillez-vous avec la climatisation ?",
      answer:
        "Oui pour les condensats et les attentes à prévoir ensemble. Le choix du split ou du gainable reste sur les pages climatisation.",
    },
    {
      question: "La ventilation des pièces d'eau est-elle de la plomberie ?",
      answer:
        "Non. L'évacuation d'eau et l'extraction d'air sont deux réseaux. L'extraction est sur sa page.",
    },
    {
      question: "Un appartement et une villa se traitent-ils pareil ?",
      answer:
        "Non. L'immeuble ajoute le syndic, les colonnes communes et l'accès. La villa ajoute les longueurs de réseau et souvent un jardin ou un vide sanitaire.",
    },
    {
      question: "Comment demander une visite ?",
      answer:
        "Décrivez la ville et le type de pièces d'eau sur la page contact. Le passage sert à voir les canalisations, pas à envoyer un plan aveugle.",
    },
  ],
  links: [
    ...cityLinks("plomberie", "Plomberie"),
    link("/ventilation", "Ventilation"),
    link("/climatisation", "Climatisation"),
    link("/zone-intervention", "Zone d'intervention"),
    link("/contact", "Contact"),
  ],
});

const extractionHub: LandingPage = hubShell({
  slug: "extraction",
  serviceId: "extraction",
  serviceType: "Extraction d'air",
  title: "Extraction d'air",
  h1: "Extraction d'air",
  descriptionLead:
    "Extraction d'air des cuisines, sanitaires et locaux techniques, distincte du désenfumage et de la climatisation.",
  pads: ["L'air de compensation se vérifie en même temps."],
  lead: [
    "L'extraction évacue l'air vicié : cuisine, salle d'eau, local technique. Elle ne renouvelle pas à elle seule tout un logement, et ce n'est pas un désenfumage.",
    "Sans entrée d'air de compensation, le volume se met en dépression. AEROVENTIS regarde les deux ensemble, de Casablanca à Marrakech, y compris Mohammedia, Bouskoura, Tamaris et Zenata.",
  ],
  servicesIntro: "Trois cas fréquents. Le bâtiment dit lequel est réellement en jeu.",
  services: [
    {
      title: "Cuisines",
      body: "Hotte ou extraction de cuisine, avec un rejet et une compensation, pas seulement un moteur.",
    },
    {
      title: "Sanitaires",
      body: "Pièces humides, où l'extraction limite la condensation si l'air peut entrer ailleurs.",
    },
    {
      title: "Locaux techniques",
      body: "Rejet d'air chargé, placé loin des prises d'air neuf et des ouvrants.",
    },
  ],
  comparisonIntro: "Ce qui évite de confondre trois réseaux.",
  points: [
    {
      title: "Extraction",
      body: "Air vicié du quotidien : cuisine, sanitaire, local. Débit et rejet se voient sur place.",
    },
    {
      title: "Ventilation",
      body: "Air neuf pour l'ensemble du volume. Page séparée, souvent complémentaire.",
    },
    {
      title: "Désenfumage",
      body: "Fumées en cas d'incendie. Autre réseau, autre page, pas un usage de confort.",
    },
  ],
  image: slide(BRAND_SLIDES.reseaux, "réseaux aérauliques et installation"),
  processIntro: "L'extraction se pose après avoir vu le rejet et la compensation.",
  process: [
    "Repérer la pièce, le rejet possible et l'endroit où l'air de compensation peut entrer.",
    "Choisir le débit et le parcours sans reprendre l'air extrait par une prise d'air neuf.",
    "Poser, vérifier le sens de l'air et le bruit dans la pièce.",
    "Laisser le ventilateur et le rejet accessibles pour le nettoyage.",
  ],
  faqs: [
    {
      question: "Extraction et ventilation, est-ce la même chose ?",
      answer:
        "Non. L'extraction sort l'air vicié d'une pièce. La ventilation apporte l'air neuf à l'ensemble. Une cuisine a souvent besoin des deux.",
    },
    {
      question: "Est-ce du désenfumage ?",
      answer:
        "Non. Le désenfumage concerne les fumées d'incendie dans des circulations, un parking ou une cage d'escalier. Une hotte de cuisine n'assure pas ce rôle.",
    },
    {
      question: "Pourquoi parler de compensation ?",
      answer:
        "L'air extrait doit être remplacé. Sinon les portes claquent, les débits chutent et les autres appareils se dérèglent.",
    },
    {
      question: "Dans quels secteurs ?",
      answer:
        "Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata. Le littoral ajoute l'humidité. Marrakech ajoute la poussière sur les rejets.",
    },
    {
      question: "Comment demander une visite ?",
      answer:
        "Indiquez la ville et la pièce concernée sur la page contact : cuisine, sanitaire ou local technique.",
    },
  ],
  links: [
    link("/ventilation", "Ventilation et qualité d'air"),
    link("/desenfumage", "Désenfumage"),
    ...cityLinks("ventilation", "Ventilation"),
    link("/contact", "Contact"),
  ],
});

const desenfumageHub: LandingPage = hubShell({
  slug: "desenfumage",
  serviceId: "desenfumage",
  serviceType: "Désenfumage",
  title: "Désenfumage",
  h1: "Désenfumage",
  descriptionLead:
    "Désenfumage des circulations, parkings et cages d'escalier : un réseau de sécurité, distinct de la ventilation.",
  pads: ["Il ne sert pas au confort quotidien."],
  lead: [
    "Le désenfumage vise les fumées en cas d'incendie, dans une circulation, un parking ou une cage d'escalier. Ce n'est ni une ventilation de confort ni l'extraction d'une cuisine.",
    "Le réseau se définit avec le bâtiment : volumes, ouvrants, accès des secours et implantation des ventilateurs. AEROVENTIS l'étudie sur le littoral casablancais, à Rabat et à Marrakech, sans le confondre avec le renouvellement d'air.",
  ],
  servicesIntro: "Trois ouvrages reviennent. Chacun se relève sur plan et sur place.",
  services: [
    {
      title: "Circulations",
      body: "Couloirs et halls où les fumées doivent pouvoir être extraites sans servir de ventilation quotidienne.",
    },
    {
      title: "Parkings",
      body: "Volumes fermés, avec un balayage et des rejets qui ne reprennent pas l'air neuf des logements.",
    },
    {
      title: "Cages d'escalier",
      body: "Protection du cheminement, distincte d'un simple extracteur de sanitaire.",
    },
  ],
  comparisonIntro: "Ce que le désenfumage n'est pas.",
  points: [
    {
      title: "Pas le confort",
      body: "Il n'est pas là pour rafraîchir un bureau ni pour assécher une salle de bain.",
    },
    {
      title: "Pas une hotte",
      body: "L'extraction de cuisine a sa page. Elle ne désenfume pas un parking.",
    },
    {
      title: "Accès",
      body: "Ventilateurs, trappes et commandes doivent rester atteignables pour les essais et le suivi.",
    },
  ],
  image: slide(BRAND_SLIDES.qualite, "qualité, sécurité et conformité"),
  processIntro: "L'étude part du bâtiment, pas d'un schéma unique.",
  process: [
    "Lire les volumes concernés, les issues et l'emplacement possible des ventilateurs.",
    "Distinguer ce réseau de la ventilation de confort et de l'extraction quotidienne.",
    "Poser, raccorder les commandes et contrôler le sens du balayage.",
    "Prévoir les essais et l'accès pour le suivi, sans démonter les finitions.",
  ],
  faqs: [
    {
      question: "Le désenfumage remplace-t-il la ventilation ?",
      answer:
        "Non. La ventilation renouvelle l'air au quotidien. Le désenfumage est prévu pour les fumées. Les deux peuvent coexister. Ils ne se dimensionnent pas l'un à la place de l'autre.",
    },
    {
      question: "Une extraction de cuisine suffit-elle ?",
      answer:
        "Non. Une hotte ou un extracteur de sanitaire n'est pas un désenfumage de circulation, de parking ou de cage d'escalier.",
    },
    {
      question: "Quels bâtiments sont concernés ?",
      answer:
        "Plutôt les immeubles et les locaux qui ont des circulations communes, un parking ou une cage d'escalier. Une villa isolée n'a en général pas le même sujet.",
    },
    {
      question: "Dans quels secteurs ?",
      answer:
        "Casablanca, Mohammedia, Zenata, Rabat, Marrakech, ainsi que Bouskoura et Tamaris quand le projet comporte ces ouvrages. La page zone d'intervention les liste.",
    },
    {
      question: "Comment demander une visite ?",
      answer:
        "Décrivez l'ouvrage — circulation, parking ou cage — et la ville sur la page contact. L'étude se fait sur les plans et sur place.",
    },
  ],
  links: [
    link("/extraction", "Extraction d'air"),
    link("/ventilation", "Ventilation"),
    link("/climatisation", "Climatisation"),
    link("/zone-intervention", "Zone d'intervention"),
    link("/contact", "Contact"),
  ],
});

function assertUnique(pages: readonly LandingPage[]) {
  const slugs = pages.map((page) => page.slug);
  if (new Set(slugs).size !== slugs.length) {
    throw new Error("Duplicate extra landing slug");
  }
}

export const extraLandingPages: readonly LandingPage[] = (() => {
  const pages: LandingPage[] = [
    ventilationHub,
    plomberieHub,
    extractionHub,
    desenfumageHub,
    ...NEW_CLIM_CITIES.map((id) => climCity(AREAS[id])),
    ...TRADE_CITIES.map((id) => ventilationCity(AREAS[id])),
    ...TRADE_CITIES.map((id) => plomberieCity(AREAS[id])),
  ];
  assertUnique(pages);
  return pages;
})();
