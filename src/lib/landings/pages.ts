import { composeTitle } from "@/lib/seo/metadata";
import { COMPARISON_ROWS, PROCESS_TITLES } from "@/lib/landings/shared";
import { LANDING_ROUTES, type CityId, type ServiceId } from "@/lib/landings/slugs";
import type { Locale } from "@/i18n/routing";

export type LandingLink = { href: `/${string}`; label: string };
export type Crumb = { name: string; pathname?: `/${string}` | "/" };

export type LandingPage = {
  slug: string;
  locales: readonly Locale[];
  serviceId: ServiceId;
  serviceType: string;
  cityId?: CityId;
  areaServed: readonly string[];
  title: string;
  description: string;
  h1: string;
  lead: readonly string[];
  servicesIntro: string;
  services: readonly { title: string; body: string }[];
  comparisonIntro: string;
  localFit: { split: string; gainable: string; vrv: string };
  processIntro: string;
  process: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  links: readonly LandingLink[];
  breadcrumbs: readonly Crumb[];
};

const BANNED = [
  /24\s*h/i,
  /sous\s+24/i,
  /certifi/i,
  /garantie/i,
  /devis\s+gratuit/i,
  /\b\d+[\s\u00a0]*(?:dh|mad)\b/i,
];

function assertClean(text: string, id: string) {
  for (const pattern of BANNED) {
    if (pattern.test(text)) {
      throw new Error(`Landing ${id} contains an unverified claim (${pattern}): ${text}`);
    }
  }
}

function assertLanding(page: LandingPage) {
  const fullTitle = composeTitle(page.title);
  if (fullTitle.length > 60) {
    throw new Error(`Landing ${page.slug} title is ${fullTitle.length} chars (max 60): ${fullTitle}`);
  }
  const length = page.description.length;
  if (length < 140 || length > 160) {
    throw new Error(
      `Landing ${page.slug} description is ${length} chars (need 140-160): ${page.description}`
    );
  }
  if (page.faqs.length < 5 || page.faqs.length > 6) {
    throw new Error(`Landing ${page.slug} must have 5 or 6 FAQs, has ${page.faqs.length}`);
  }
  if (page.process.length !== PROCESS_TITLES.length) {
    throw new Error(`Landing ${page.slug} process steps do not match the shared titles`);
  }
  const blobs = [
    page.title,
    page.description,
    page.h1,
    page.servicesIntro,
    page.comparisonIntro,
    page.processIntro,
    page.localFit.split,
    page.localFit.gainable,
    page.localFit.vrv,
    ...page.lead,
    ...page.services.flatMap((item) => [item.title, item.body]),
    ...page.process,
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...COMPARISON_ROWS.flatMap((row) => [row.label, row.split, row.gainable, row.vrv]),
  ];
  for (const blob of blobs) assertClean(blob, page.slug);
}

const home: Crumb = { name: "Accueil", pathname: "/" };

const pages: LandingPage[] = [
  {
    slug: "climatisation",
    locales: ["fr"],
    serviceId: "climatisation",
    serviceType: "Climatisation",
    areaServed: ["Casablanca", "Rabat", "Marrakech"],
    title: "Climatisation au Maroc – installation",
    description:
      "Climatisation au Maroc : installation split, gainable et VRV à Casablanca, Rabat et Marrakech. Étude technique, pose et entretien par AEROVENTIS.",
    h1: "Climatisation au Maroc",
    lead: [
      "Le choix d'une climatisation au Maroc ne se résume pas à une puissance au mètre carré. Casablanca et Rabat imposent l'humidité du littoral, Marrakech une chaleur sèche et des toitures très exposées. AEROVENTIS étudie le logement avant de proposer un split, un gainable ou un VRV.",
      "Cette page relie les trois villes. Le détail des quartiers, des contraintes de façade et des visites se trouve sur chaque page locale, pas dans un texte recopié.",
    ],
    servicesIntro:
      "Trois familles d'appareils couvrent les villas, les appartements et les petits ensembles tertiaires. La page ville précise lequel a du sens sur place.",
    services: [
      {
        title: "Split et multi-split",
        body: "Une ou plusieurs unités murales, quand le faux plafond est trop bas ou que seules quelques pièces sont à traiter.",
      },
      {
        title: "Gainable",
        body: "Un réseau de gaines dans le plénum, pour une villa ou un plateau où l'on peut cacher l'unité et répartir l'air.",
      },
      {
        title: "VRV / DRV",
        body: "Plusieurs unités intérieures sur un même circuit, lorsque peu de groupes extérieurs doivent desservir beaucoup de pièces.",
      },
    ],
    comparisonIntro:
      "Le tableau ci-dessous compare les principes. Il ne remplace pas le relevé : une villa de la Palmeraie et un appartement d'Agdal ne partent pas du même plan.",
    localFit: {
      split: "Utile à Casablanca et Rabat dans les appartements, et à Marrakech pour une pièce exposée en attendant un réseau complet.",
      gainable: "Pertinent pour les villas, en neuf à Bouskoura ou à Hay Riad comme en rénovation quand le couloir peut perdre quelques centimètres.",
      vrv: "Réservé aux immeubles et aux locaux professionnels des trois villes, là où le syndic limite les groupes en façade.",
    },
    processIntro:
      "Le déroulé est le même d'une ville à l'autre. Le contenu de la visite, lui, change : air salin, poussière ou hauteur de plafond.",
    process: [
      "Relevé du logement, de l'orientation et de l'emplacement possible des groupes extérieurs.",
      "Choix du système à partir du relevé, pièce par pièce, sans ratio unique.",
      "Liaisons, condensats, tirage au vide et contrôle des températures de soufflage.",
      "Filtres et contrôle périodique, avec une page dédiée pour Casablanca.",
    ],
    faqs: [
      {
        question: "Quelle page lire selon la ville ?",
        answer:
          "Casablanca, Rabat et Marrakech ont chacune une page climatisation. Le gainable casablancais et l'entretien à Casablanca ont aussi les leurs. Cette page sert de sommaire.",
      },
      {
        question: "Le même appareil convient-il aux trois villes ?",
        answer:
          "Non. L'humidité et l'air salin du littoral ne se traitent pas comme la chaleur sèche et la poussière de Marrakech. Le dimensionnement part du site.",
      },
      {
        question: "Split, gainable ou VRV : par où commencer ?",
        answer:
          "Par le nombre de pièces et la hauteur disponible au plafond. Le split équipe peu de pièces. Le gainable suppose un plénum. Le VRV vise un ensemble de locaux.",
      },
      {
        question: "Intervenez-vous en dehors de ces villes ?",
        answer:
          "Les pages publiées couvrent Casablanca, Rabat et Marrakech. Pour un autre secteur, la page contact permet de décrire le projet et de voir si un déplacement est réaliste.",
      },
      {
        question: "La ventilation est-elle incluse dans la climatisation ?",
        answer:
          "Non. La climatisation traite la température. Le renouvellement d'air est un réseau à part, décrit sur la page nos services.",
      },
      {
        question: "Faut-il prévoir l'entretien dès la pose ?",
        answer:
          "Oui, au moins le lavage des filtres et un contrôle avant la saison chaude. À Casablanca, la page entretien détaille ce que le littoral change.",
      },
    ],
    links: [
      { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
      { href: "/climatisation-rabat", label: "Climatisation à Rabat" },
      { href: "/climatisation-marrakech", label: "Climatisation à Marrakech" },
      { href: "/climatisation-gainable", label: "Climatisation gainable" },
      { href: "/climatisation-gainable-casablanca", label: "Gainable à Casablanca" },
      { href: "/entretien-climatisation-casablanca", label: "Entretien à Casablanca" },
      { href: "/nos-services", label: "Nos services" },
      { href: "/contact", label: "Contact" },
    ],
    breadcrumbs: [home, { name: "Climatisation au Maroc" }],
  },
  {
    slug: "climatisation-gainable",
    locales: ["fr"],
    serviceId: "climatisation-gainable",
    serviceType: "Climatisation gainable",
    areaServed: ["Casablanca", "Rabat", "Marrakech"],
    title: "Climatisation gainable – villas Maroc",
    description:
      "Climatisation gainable au Maroc : conception pour villas et immeubles à Casablanca, Rabat et Marrakech. Étude des gaines, zoning et mise en service.",
    h1: "Climatisation gainable",
    lead: [
      "Le gainable cache l'unité dans un faux plafond et distribue l'air par des gaines. Il se justifie quand plusieurs pièces doivent être traitées sans multiplier les splits au mur. Il ne se justifie pas si le plénum n'existe pas et ne peut pas être créé.",
      "À Casablanca, la page locale décrit Anfa, Californie, Ain Diab et Bouskoura. Rabat et Marrakech restent sur leurs pages climatisation tant qu'un texte gainable propre à chaque ville n'est pas publié.",
    ],
    servicesIntro:
      "Un gainable n'est pas un split dissimulé. L'étude porte sur les gaines, les bouches, la reprise d'air et l'accès aux filtres.",
    services: [
      {
        title: "Réseau de gaines",
        body: "Sections, isolation et longueurs pour limiter les pertes et le bruit avant même de parler de l'unité.",
      },
      {
        title: "Bouches et reprise",
        body: "Emplacement du soufflage et de la reprise pour que l'air circule dans la pièce, pas seulement près de la grille.",
      },
      {
        title: "Zoning",
        body: "Registres et thermostats de zone quand une suite et un séjour ne doivent pas être à la même consigne.",
      },
    ],
    comparisonIntro:
      "Le gainable est une option parmi trois. Le comparer au split et au VRV évite de l'imposer à un appartement qui n'a pas la hauteur.",
    localFit: {
      split: "Reste le bon choix pour une ou deux pièces, ou quand le plafond ne peut pas descendre.",
      gainable: "Vise la villa et le grand appartement rénové avec un couloir technique. La page Casablanca entre dans le détail des quartiers.",
      vrv: "Prend le relais dans un immeuble où plusieurs logements ou bureaux partagent les groupes extérieurs.",
    },
    processIntro:
      "La pose se coordonne avec le plâtrier et l'électricien. Sans cette coordination, les gaines arrivent trop tard.",
    process: [
      "Vérifier la hauteur libre, les descentes de plafond possibles et le chemin des condensats.",
      "Tracer le réseau, les bouches et l'emplacement de l'unique groupe extérieur.",
      "Poser l'unité, les gaines, puis équilibrer les débits à la mise en service.",
      "Laisser une trappe : sans accès, le filtre ne sera pas nettoyé.",
    ],
    faqs: [
      {
        question: "Le gainable est-il toujours plus discret qu'un split ?",
        answer:
          "Dans les pièces, oui, si l'unité est éloignée des chambres et si les gaines sont isolées. Un réseau mal dimensionné siffle. La discrétion se joue à l'étude.",
      },
      {
        question: "Peut-on en poser un dans un appartement ?",
        answer:
          "Seulement si un plénum suffisant existe ou peut être créé, souvent dans un couloir. Beaucoup d'appartements de Californie n'ont pas cette hauteur : la visite le dit.",
      },
      {
        question: "Une seule unité extérieure suffit-elle ?",
        answer:
          "C'est l'intérêt habituel pour une villa. La puissance et l'emplacement dépendent du linéaire de gaines et de l'exposition, pas d'un modèle unique.",
      },
      {
        question: "Où lire le cas casablancais ?",
        answer:
          "La page climatisation gainable à Casablanca traite Anfa, Californie, Ain Diab et Bouskoura. Elle renvoie vers la climatisation toutes solutions de la ville.",
      },
      {
        question: "Le gainable chauffe-t-il ?",
        answer:
          "En version réversible, il peut aussi chauffer. À Rabat, les hivers humides rendent cette question utile. Ce n'est pas un chauffage à part entière à dimensionner à l'aveugle.",
      },
      {
        question: "Quel lien avec l'entretien ?",
        answer:
          "Les filtres, les bouches et les condensats se contrôlent. La page entretien climatisation à Casablanca décrit le suivi sur le littoral.",
      },
    ],
    links: [
      { href: "/climatisation-gainable-casablanca", label: "Gainable à Casablanca" },
      { href: "/climatisation", label: "Climatisation au Maroc" },
      { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
      { href: "/climatisation-rabat", label: "Climatisation à Rabat" },
      { href: "/climatisation-marrakech", label: "Climatisation à Marrakech" },
      { href: "/entretien-climatisation-casablanca", label: "Entretien à Casablanca" },
      { href: "/contact", label: "Contact" },
    ],
    breadcrumbs: [home, { name: "Climatisation gainable" }],
  },
  {
    slug: "climatisation-casablanca",
    locales: ["fr"],
    serviceId: "climatisation",
    serviceType: "Climatisation",
    cityId: "casablanca",
    areaServed: ["Casablanca"],
    title: "Climatisation Casablanca – pose & entretien",
    description:
      "Installation et entretien de climatisation à Casablanca : split mural, gainable et VRV pour villas et appartements à Anfa, Californie, Ain Diab et Bouskoura.",
    h1: "Climatisation à Casablanca",
    lead: [
      "À Casablanca, la climatisation doit refroidir et déshumidifier. L'air atlantique, parfois chargé de sel vers Ain Diab et la corniche, n'use pas un groupe extérieur comme l'air plus sec de Bouskoura. Anfa et Californie mêlent immeubles de standing et maisons de ville, avec des syndics attentifs à la façade.",
      "AEROVENTIS relève le logement avant de choisir un split, un gainable ou un VRV. La page gainable de la ville détaille le faux plafond. L'entretien a sa page, parce que les condensats du littoral se bouchent plus vite qu'à l'intérieur des terres.",
    ],
    servicesIntro:
      "Les demandes casablancaises se répartissent entre l'appartement en copropriété et la villa, neuve ou déjà habitée.",
    services: [
      {
        title: "Appartements à Anfa et Californie",
        body: "Split ou multi-split quand la hauteur sous plafond est comptée et qu'une coursive ou un local technique peut recevoir le groupe, avec l'accord du syndic.",
      },
      {
        title: "Villas à Bouskoura et Anfa",
        body: "Gainable envisageable si le plénum est prévu au neuf ou si un couloir peut être abaissé. Le groupe peut souvent s'éloigner de la façade.",
      },
      {
        title: "Littoral d'Ain Diab",
        body: "Le groupe extérieur se place à l'abri du jet direct d'embruns et reste accessible pour un lavage, sinon l'échangeur se corrode.",
      },
    ],
    comparisonIntro:
      "Sur la métropole, le critère n'est pas seulement la surface. C'est l'étage, le syndic, la distance jusqu'au groupe et l'humidité de la pièce.",
    localFit: {
      split: "Convient aux appartements d'Anfa et de Californie où l'on ne peut pas créer de gaine, dès qu'un emplacement extérieur est accepté.",
      gainable: "Convient aux villas de Bouskoura et à certaines maisons d'Anfa. À Californie, beaucoup de dalles ne laissent pas la hauteur : la visite tranche.",
      vrv: "Convient aux petits immeubles et aux bureaux lorsque plusieurs pièces doivent partager peu de groupes en façade.",
    },
    processIntro:
      "La visite à Casablanca commence par la façade et l'évacuation d'eau, pas par le catalogue.",
    process: [
      "Voir l'étage, le syndic, le chemin des condensats et l'exposition, d'Ain Diab jusqu'à Bouskoura.",
      "Choisir split, gainable ou VRV selon la hauteur réelle du plafond et le nombre de pièces.",
      "Protéger le groupe de l'air salin s'il est près de la corniche, puis mettre en service.",
      "Prévoir le lavage des filtres et un contrôle avant l'été, détaillé sur la page entretien.",
    ],
    faqs: [
      {
        question: "Split ou gainable à Casablanca ?",
        answer:
          "Le split équipe un appartement d'Anfa ou de Californie sans plénum. Le gainable vise une villa de Bouskoura ou d'Anfa quand un faux plafond est possible. La page gainable de la ville développe ce cas.",
      },
      {
        question: "L'air d'Ain Diab change-t-il la pose ?",
        answer:
          "Oui. Le sel et l'humidité attaquent l'échangeur extérieur. L'emplacement, l'accès pour le lavage et le traitement de l'évacuation d'eau comptent autant que la puissance.",
      },
      {
        question: "Peut-on poser une unité en copropriété ?",
        answer:
          "Seulement si le règlement et le syndic acceptent l'emplacement. À Anfa comme à Californie, ce point se vérifie avant les percements.",
      },
      {
        question: "Bouskoura se traite-t-elle comme le centre ?",
        answer:
          "Non. Les villas y ont souvent un jardin pour éloigner le groupe, et le neuf permet de réserver les gaines. La poussière de chantier encrasse aussi les filtres plus vite.",
      },
      {
        question: "Qui s'occupe de l'entretien ensuite ?",
        answer:
          "La page entretien climatisation à Casablanca décrit filtres, condensats et groupe extérieur. Elle est le prolongement de l'installation, pas une offre à part sans lien.",
      },
      {
        question: "Et si le projet est à Rabat ou à Marrakech ?",
        answer:
          "Les pages climatisation de Rabat et de Marrakech décrivent d'autres quartiers et un autre climat. Le hub climatisation relie les trois.",
      },
    ],
    links: [
      { href: "/climatisation", label: "Climatisation au Maroc" },
      { href: "/climatisation-gainable-casablanca", label: "Gainable à Casablanca" },
      { href: "/entretien-climatisation-casablanca", label: "Entretien à Casablanca" },
      { href: "/climatisation-rabat", label: "Climatisation à Rabat" },
      { href: "/climatisation-marrakech", label: "Climatisation à Marrakech" },
      { href: "/zone-intervention", label: "Zone d'intervention" },
      { href: "/contact", label: "Contact" },
    ],
    breadcrumbs: [
      home,
      { name: "Climatisation", pathname: "/climatisation" },
      { name: "Climatisation à Casablanca" },
    ],
  },
  {
    slug: "climatisation-rabat",
    locales: ["fr"],
    serviceId: "climatisation",
    serviceType: "Climatisation",
    cityId: "rabat",
    areaServed: ["Rabat"],
    title: "Climatisation Rabat – installation & entretien",
    description:
      "Climatisation à Rabat : étude et pose de split, gainable ou VRV pour villas de Souissi et Hay Riad, et appartements d'Agdal. Entretien sur rendez-vous.",
    h1: "Climatisation à Rabat",
    lead: [
      "Rabat n'est pas un second Casablanca. L'humidité atlantique y est réelle, mais les hivers sont plus longs et plus mouillés : beaucoup de villas de Souissi et de Hay Riad demandent une machine réversible parce que le séjour sert aussi en janvier. Agdal, plus dense et plus ancien, offre peu de place en façade et des cages d'escalier étroites pour monter le matériel.",
      "Le gainable détaillé quartier par quartier est publié pour Casablanca. À Rabat, cette page dit où il est réaliste, et renvoie au hub gainable pour le principe des gaines.",
    ],
    servicesIntro:
      "Les trois tissus de la ville n'appellent pas le même appareil ni le même accès chantier.",
    services: [
      {
        title: "Villas de Souissi",
        body: "Grandes parcelles, parfois plusieurs ailes. Un gainable ou un petit VRV évite d'aligner des groupes le long d'un mur vu de la rue.",
      },
      {
        title: "Hay Riad",
        body: "Lotissements récents où le faux plafond peut être prévu avec le plâtrier. Le groupe se place sur le toit ou au fond du jardin, pas devant le salon.",
      },
      {
        title: "Agdal",
        body: "Appartements et petits immeubles. Le split ou le multi-split domine, parce que les hauteurs sont faibles et les cours intérieures déjà encombrées.",
      },
    ],
    comparisonIntro:
      "À Rabat, le chauffage d'appoint d'hiver pèse dans le choix autant que le coup de chaleur de juillet. Ce n'est pas le cas de la même façon à Marrakech.",
    localFit: {
      split: "Adapté à Agdal et aux appartements où l'on équipe le séjour et une chambre sans toucher au plafond.",
      gainable: "Adapté aux villas de Souissi et de Hay Riad lorsque le couloir ou les combles acceptent l'unité et les gaines.",
      vrv: "Adapté à une grande villa en plusieurs zones ou à un plateau de bureaux qui ne peut pas multiplier les groupes en terrasse.",
    },
    processIntro:
      "La visite rbati regarde la rue, le voisinage et la saison froide, pas seulement l'ensoleillement.",
    process: [
      "Relever Souissi, Hay Riad ou Agdal : accès, terrasse, et pièces réellement occupées l'hiver.",
      "Décider si la réversibilité sert le séjour, ou si seules les pièces d'été sont à traiter.",
      "Poser en limitant le bruit vers les chambres, les parcelles étant souvent proches.",
      "Contrôler filtres et condensats avant l'été, l'humidité du littoral bouchant les évacuations.",
    ],
    faqs: [
      {
        question: "Pourquoi parler de chauffage à Rabat ?",
        answer:
          "Les soirées d'hiver y sont humides, surtout dans les villas de Souissi. Une machine réversible peut tempérer le séjour. Elle ne remplace pas une étude si la maison est mal isolée.",
      },
      {
        question: "Agdal peut-il recevoir un gainable ?",
        answer:
          "Rarement sans gros travaux. Les hauteurs sont justes et les copropriétés strictes. Le split ou le multi-split est en général plus réaliste. Le hub gainable explique la hauteur minimale.",
      },
      {
        question: "Hay Riad est-il plus simple que le centre ?",
        answer:
          "Souvent oui pour le neuf : les réservations de gaines et l'emplacement du groupe se décident avec le chantier. En logement déjà livré, on vérifie le plénum avant de promettre un réseau.",
      },
      {
        question: "Le sel de l'océan concerne-t-il Rabat ?",
        answer:
          "Moins qu'Ain Diab, mais l'humidité marine existe. Un groupe en terrasse non lavé s'encrasse. L'accès pour l'entretien fait partie du choix d'emplacement.",
      },
      {
        question: "Où comparer avec Casablanca ?",
        answer:
          "La page climatisation à Casablanca détaille Anfa, Californie, Ain Diab et Bouskoura. Les syndics et l'air salin y pèsent davantage que dans Souissi.",
      },
      {
        question: "Qui contacter pour une visite ?",
        answer:
          "La page contact permet de décrire l'adresse à Rabat et le type de logement. La page zone d'intervention rappelle les trois villes couvertes.",
      },
    ],
    links: [
      { href: "/climatisation", label: "Climatisation au Maroc" },
      { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
      { href: "/climatisation-marrakech", label: "Climatisation à Marrakech" },
      { href: "/climatisation-gainable", label: "Climatisation gainable" },
      { href: "/entretien-climatisation-casablanca", label: "Entretien à Casablanca" },
      { href: "/zone-intervention", label: "Zone d'intervention" },
      { href: "/contact", label: "Contact" },
    ],
    breadcrumbs: [
      home,
      { name: "Climatisation", pathname: "/climatisation" },
      { name: "Climatisation à Rabat" },
    ],
  },
  {
    slug: "climatisation-marrakech",
    locales: ["fr"],
    serviceId: "climatisation",
    serviceType: "Climatisation",
    cityId: "marrakech",
    areaServed: ["Marrakech"],
    title: "Climatisation Marrakech – pose & entretien",
    description:
      "Climatisation à Marrakech : dimensionnement pour la chaleur sèche, pose split ou gainable à la Palmeraie, Hivernage et sur la route de l'Ourika.",
    h1: "Climatisation à Marrakech",
    lead: [
      "Marrakech chauffe autrement que le littoral. L'air est sec, les toitures-terrasses restent au soleil une grande partie de la journée, et la poussière revient avec le vent, surtout vers la route de l'Ourika. Une puissance copiée sur un appartement casablancais sous-dimensionne une villa de la Palmeraie aux baies larges.",
      "Hivernage mêle résidences et petits immeubles où la façade compte. La Palmeraie étire les liaisons entre le groupe, souvent loin de la maison, et les pièces. Ce ne sont pas les mêmes mètres de cuivre ni le même entretien de filtre.",
    ],
    servicesIntro:
      "Le service consiste à dimensionner pour la chaleur sèche et à placer le groupe à l'ombre relative, pas à coller un modèle de showroom.",
    services: [
      {
        title: "Palmeraie",
        body: "Villas isolées, linéaires longs, jardins qui imposent un tracé. Le gainable est souvent le plus cohérent si le plafond a été prévu ; sinon un multi-split limite les groupes visibles.",
      },
      {
        title: "Hivernage",
        body: "Résidences plus serrées. L'emplacement du groupe se négocie avec la copropriété, et le split reste fréquent dans les appartements sans plénum.",
      },
      {
        title: "Route de l'Ourika",
        body: "Maisons exposées au vent et à la poussière, avec des écarts de température plus marqués vers le piémont. Les filtres s'encrassent vite et le groupe doit rester dégageable.",
      },
    ],
    comparisonIntro:
      "Ici, le soleil sur la toiture et la longueur des liaisons comptent plus que l'humidité. Le tableau rappelle les trois familles, puis le quartier tranche.",
    localFit: {
      split: "Utile à Hivernage pour une ou deux pièces, et en appoint dans une aile de villa en attendant un réseau.",
      gainable: "Utile à la Palmeraie quand la maison a un plénum et que l'on veut une seule unité extérieure à l'ombre d'un local ou d'un auvent.",
      vrv: "Utile pour une grande propriété ou une résidence qui doit limiter le nombre de groupes sur une terrasse déjà chargée de citernes.",
    },
    processIntro:
      "La visite se fait aux heures chaudes si possible, pour voir quelles pièces décrochent vraiment.",
    process: [
      "Noter l'orientation des baies, l'ombre réelle du groupe et la distance jusqu'à la Palmeraie ou l'Ourika.",
      "Dimensionner pour la chaleur sèche, sans reprendre un ratio du littoral.",
      "Poser le groupe ventilé, pas en plein cagnard contre un mur ouest, puis mettre en service.",
      "Raccourcir l'intervalle de nettoyage des filtres : la poussière de l'Ourika n'attend pas la fin de l'été.",
    ],
    faqs: [
      {
        question: "Pourquoi un devis casablancais ne se transpose-t-il pas ?",
        answer:
          "Parce que la charge thermique n'est pas la même. Grandes baies, toiture exposée et air sec à Marrakech demandent un relevé local. La page de Casablanca décrit un autre climat.",
      },
      {
        question: "La Palmeraie impose-t-elle un gainable ?",
        answer:
          "Non. Elle l'autorise souvent, grâce au plafond des villas. Si le plénum manque, un multi-split reste possible. Le hub gainable explique les conditions de hauteur.",
      },
      {
        question: "Hivernage est-il un chantier de riad ?",
        answer:
          "Pas toujours. Beaucoup de biens sont des appartements ou des villas récentes avec des contraintes de façade proches d'une copropriété. On vérifie l'accès et le règlement avant le choix du système.",
      },
      {
        question: "La route de l'Ourika use-t-elle les filtres ?",
        answer:
          "Oui, le vent et la poussière les chargent plus vite qu'à Hivernage. Un groupe collé à un mur sans dégagement surchauffe. L'emplacement fait partie de l'étude.",
      },
      {
        question: "Faut-il une machine différente l'hiver ?",
        answer:
          "Les nuits peuvent fraîchir, surtout vers l'Ourika. Une version réversible peut servir en demi-saison. La priorité du dimensionnement reste la chaleur du jour.",
      },
      {
        question: "Où voir les autres villes ?",
        answer:
          "Rabat et Casablanca ont leurs pages. Le hub climatisation les relie. Pour décrire une villa de la Palmeraie, la page contact suffit à organiser la visite.",
      },
    ],
    links: [
      { href: "/climatisation", label: "Climatisation au Maroc" },
      { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
      { href: "/climatisation-rabat", label: "Climatisation à Rabat" },
      { href: "/climatisation-gainable", label: "Climatisation gainable" },
      { href: "/zone-intervention", label: "Zone d'intervention" },
      { href: "/contact", label: "Contact" },
    ],
    breadcrumbs: [
      home,
      { name: "Climatisation", pathname: "/climatisation" },
      { name: "Climatisation à Marrakech" },
    ],
  },
  {
    slug: "climatisation-gainable-casablanca",
    locales: ["fr"],
    serviceId: "climatisation-gainable",
    serviceType: "Climatisation gainable",
    cityId: "casablanca",
    areaServed: ["Casablanca"],
    title: "Gainable Casablanca – pose & entretien",
    description:
      "Climatisation gainable à Casablanca : étude, gaines et bouches pour villas d'Anfa, Californie et Bouskoura, et appartements avec faux plafond à Ain Diab.",
    h1: "Climatisation gainable à Casablanca",
    lead: [
      "Le gainable à Casablanca se décide plafond par plafond. À Bouskoura, le neuf laisse souvent réserver un plénum dans les couloirs avant la plâtrerie. À Anfa, certaines villas ont déjà un faux plafond technique ; d'autres non. À Californie, une grande partie des appartements n'a pas la hauteur : le promettre sans visite serait faux. Ain Diab ajoute la corrosion du groupe, même s'il n'y en a qu'un.",
      "Cette page ne reprend pas le texte de la climatisation toutes solutions. Elle ne parle que du réseau caché. Le principe national des gaines est sur le hub gainable.",
    ],
    servicesIntro:
      "L'installation porte sur l'unité intérieure, les gaines, les bouches, la reprise et le seul groupe extérieur.",
    services: [
      {
        title: "Neuf à Bouskoura",
        body: "Les gaines se calent avec le plâtrier et l'électricien. Une trappe de filtre se dessine avant la peinture, pas après.",
      },
      {
        title: "Villas d'Anfa",
        body: "On cherche un couloir ou un local dont le plafond peut descendre sans couper une porte. Le groupe s'éloigne des chambres à cause du bruit de voisinage.",
      },
      {
        title: "Californie et Ain Diab",
        body: "Appartements : on mesure le plénum réel. S'il manque, on reste sur un split, décrit sur la page climatisation de la ville. Près de la mer, le groupe unique se protège du sel.",
      },
    ],
    comparisonIntro:
      "Même à Casablanca, le gainable n'écarte pas le split ni le VRV. Il les remplace seulement quand le plafond et le nombre de pièces le permettent.",
    localFit: {
      split: "Meilleur choix à Californie et dans les appartements d'Anfa sans possibilité d'abaisser un couloir.",
      gainable: "Meilleur choix à Bouskoura en neuf et dans les maisons d'Anfa qui ont déjà un faux plafond continu.",
      vrv: "Meilleur choix pour un petit immeuble d'Anfa ou un plateau de bureaux où plusieurs gainables séparés multiplieraient les groupes en toiture.",
    },
    processIntro:
      "Le chantier gainable casablancais échoue quand les gaines arrivent après le staff. L'ordre compte plus que la marque.",
    process: [
      "Mesurer la hauteur libre à Anfa, Californie, Ain Diab ou Bouskoura, et le chemin des condensats vers une chute existante.",
      "Dessiner gaines, bouches et reprise. Prévoir le zoning seulement si les pièces ont des usages différents.",
      "Poser avant les finitions à Bouskoura, ou dans un plafond déposé à Anfa, puis équilibrer les débits.",
      "Montrer la trappe au client : sans elle, l'entretien de la page dédiée ne pourra pas se faire.",
    ],
    faqs: [
      {
        question: "Tous les appartements de Californie peuvent-ils passer en gainable ?",
        answer:
          "Non. Beaucoup n'ont pas le plénum. La visite mesure. Si la hauteur manque, la page climatisation à Casablanca oriente vers un split.",
      },
      {
        question: "Que change Bouskoura ?",
        answer:
          "Le neuf permet de réserver les passages avant le plâtre. Les parcelles laissent aussi éloigner le groupe. Ce n'est pas le cas d'un dernier étage à Californie.",
      },
      {
        question: "Ain Diab abîme-t-il le gainable ?",
        answer:
          "L'unité intérieure est au sec. Le groupe extérieur, lui, voit le sel. Un seul groupe se protège et se lave plus facilement que cinq splits en façade.",
      },
      {
        question: "Peut-on régler les chambres à part ?",
        answer:
          "Oui avec des registres de zone, si le réseau a été prévu pour. L'ajouter après coup sur des gaines trop justes n'est pas toujours possible.",
      },
      {
        question: "Le gainable est-il bruyant dans un tissu dense comme Anfa ?",
        answer:
          "L'unité doit être hors des chambres et les gaines isolées. Un réseau trop rapide s'entend. L'équilibrage à la mise en service sert à ça.",
      },
      {
        question: "Où lire l'entretien et les autres villes ?",
        answer:
          "L'entretien à Casablanca a sa page. Rabat et Marrakech sont sur leurs pages climatisation. Le hub gainable rappelle le principe, sans le détail des quartiers casaouis.",
      },
    ],
    links: [
      { href: "/climatisation-gainable", label: "Climatisation gainable" },
      { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
      { href: "/climatisation", label: "Climatisation au Maroc" },
      { href: "/entretien-climatisation-casablanca", label: "Entretien à Casablanca" },
      { href: "/climatisation-rabat", label: "Climatisation à Rabat" },
      { href: "/climatisation-marrakech", label: "Climatisation à Marrakech" },
      { href: "/contact", label: "Contact" },
    ],
    breadcrumbs: [
      home,
      { name: "Climatisation gainable", pathname: "/climatisation-gainable" },
      { name: "Climatisation gainable à Casablanca" },
    ],
  },
  {
    slug: "entretien-climatisation-casablanca",
    locales: ["fr"],
    serviceId: "entretien-climatisation",
    serviceType: "Entretien de climatisation",
    cityId: "casablanca",
    areaServed: ["Casablanca"],
    title: "Entretien clim Casablanca – maintenance",
    description:
      "Entretien de climatisation à Casablanca : filtres, condensats et unité extérieure, du littoral d'Ain Diab aux villas de Bouskoura, Anfa et Californie.",
    h1: "Entretien climatisation à Casablanca",
    lead: [
      "À Casablanca, l'entretien ne se résume pas à un filtre rincé en août. Sur le littoral, d'Ain Diab à la corniche, l'humidité remplit les bacs de condensats et le sel se dépose sur l'échangeur extérieur. À Bouskoura, c'est plutôt la poussière des chantiers et des jardins qui colmate les filtres. Anfa et Californie ajoutent des accès compliqués : groupe en courette, échelle, accord du gardien.",
      "Cette page décrit le suivi. L'installation split ou gainable est sur les pages climatisation et gainable de la ville.",
    ],
    servicesIntro:
      "La visite technique et les gestes entre deux visites ne portent pas sur les mêmes pièces selon le quartier.",
    services: [
      {
        title: "Filtres et échangeur intérieur",
        body: "Dépoussiérage régulier par l'occupant, puis nettoyage de l'échangeur et de la turbine lors de la visite, surtout après un épisode de chergui.",
      },
      {
        title: "Condensats",
        body: "À Ain Diab et dans les appartements humides d'Anfa, le bac et le tuyau se bouchent plus vite. C'est la cause habituelle des gouttes chez le voisin.",
      },
      {
        title: "Groupe extérieur",
        body: "Lavage de l'ailettage, contrôle des supports et de la ventilation. À Bouskoura le groupe est souvent au jardin ; en immeuble, il est parfois inaccessible sans nacelle : on le sait avant de promettre un lavage.",
      },
    ],
    comparisonIntro:
      "L'entretien dépend de la machine posée. Un gainable de villa ne se suit pas comme un split de chambre. Le tableau rappelle à quoi sert chaque système au moment du contrôle.",
    localFit: {
      split: "Filtres en façade d'unité, turbine accessible, groupe souvent en façade à Californie ou Anfa. Le syndic doit laisser passer pour le lavage.",
      gainable: "Le filtre est derrière une trappe. Sans trappe prévue à la pose, l'entretien de Bouskoura ou d'Anfa devient un démontage de plafond.",
      vrv: "Plusieurs unités et un circuit commun : le contrôle prend plus de temps et se cale avec le gestionnaire de l'immeuble.",
    },
    processIntro:
      "Le rythme casablancais colle à la saison chaude, pas à un calendrier copié d'une autre ville.",
    process: [
      "Repérer le type d'appareil, l'accès au groupe et le quartier : sel à Ain Diab, poussière à Bouskoura.",
      "Lister filtres, condensats, ailettes et températures de soufflage à contrôler.",
      "Intervenir de préférence avant les fortes chaleurs, quand les pièces sont encore utilisables pendant l'arrêt.",
      "Laisser un compte rendu simple : ce qui a été nettoyé, ce qui devra l'être plus souvent.",
    ],
    faqs: [
      {
        question: "À quelle fréquence laver les filtres à Casablanca ?",
        answer:
          "En période d'usage, toutes les quelques semaines. Plus souvent à Bouskoura s'il y a un chantier voisin, et après un vent de poussière. La visite annuelle ne remplace pas ce geste.",
      },
      {
        question: "Pourquoi une clim fuit-elle à Ain Diab ou à Anfa ?",
        answer:
          "Le plus souvent parce que l'évacuation des condensats est bouchée par le biofilm lié à l'humidité. Il faut arrêter l'appareil et faire déboucher le circuit, pas éponger indéfiniment.",
      },
      {
        question: "L'entretien d'un gainable est-il différent ?",
        answer:
          "Oui. Les bouches, la reprise et la trappe de filtre s'ajoutent à l'unité. La page gainable à Casablanca dit comment cette trappe doit être prévue dès la pose.",
      },
      {
        question: "Peut-on recharger le fluide soi-même ?",
        answer:
          "Non. La manipulation du fluide frigorigène relève d'un technicien. Une baisse de performance est d'abord un filtre sale ou une fuite à chercher, pas un appoint systématique.",
      },
      {
        question: "Californie et Bouskoura ont-ils le même suivi ?",
        answer:
          "Non. Californie : accès d'immeuble et groupes en façade. Bouskoura : poussière de jardin ou de chantier et groupes au sol, plus faciles à laver mais plus exposés au sable.",
      },
      {
        question: "Où demander une visite ?",
        answer:
          "La page contact sert à indiquer l'adresse et le type d'appareil. Pour une installation neuve, partir plutôt de la page climatisation à Casablanca ou du hub national.",
      },
    ],
    links: [
      { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
      { href: "/climatisation-gainable-casablanca", label: "Gainable à Casablanca" },
      { href: "/climatisation", label: "Climatisation au Maroc" },
      { href: "/nos-services", label: "Nos services" },
      { href: "/zone-intervention", label: "Zone d'intervention" },
      { href: "/contact", label: "Contact" },
    ],
    breadcrumbs: [
      home,
      { name: "Nos services", pathname: "/nos-services" },
      { name: "Entretien climatisation à Casablanca" },
    ],
  },
];

for (const page of pages) {
  assertLanding(page);
  const route = LANDING_ROUTES.find((item) => item.slug === page.slug);
  if (!route) throw new Error(`Landing ${page.slug} is missing from the route registry`);
  if (route.locales.join() !== page.locales.join()) {
    throw new Error(`Landing ${page.slug} locales do not match the registry`);
  }
}

for (const route of LANDING_ROUTES) {
  if (!pages.some((page) => page.slug === route.slug)) {
    throw new Error(`Route ${route.slug} has no landing copy`);
  }
}

const titles = pages.map((page) => composeTitle(page.title));
if (new Set(titles).size !== titles.length) {
  throw new Error("Landing titles must be unique");
}

export function getLandingPages(): readonly LandingPage[] {
  return pages;
}

export function getLandingPage(slug: string): LandingPage | undefined {
  return pages.find((page) => page.slug === slug);
}
