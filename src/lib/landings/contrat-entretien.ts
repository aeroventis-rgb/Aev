import { SERVICE_AREA_NAMES } from "@/lib/areas";
import type { CityId } from "@/lib/landings/slugs";
import type { LandingLink, LandingPage } from "@/lib/landings/types";

/**
 * Contract page. The Casablanca air-conditioning follow-up stays on
 * `/entretien-climatisation-casablanca` so the two URLs do not compete.
 */

const CITY_NAMES: Record<CityId, string> = {
  casablanca: "Casablanca",
  rabat: "Rabat",
  marrakech: "Marrakech",
  mohammedia: "Mohammedia",
  bouskoura: "Bouskoura",
  tamaris: "Tamaris",
  zenata: "Zenata",
};

function link(path: `/${string}`, label: string): LandingLink {
  return { href: path, label };
}

function cityLinks(prefix: "climatisation" | "plomberie", label: string): LandingLink[] {
  return (Object.keys(CITY_NAMES) as CityId[]).map((id) =>
    link(`/${prefix}-${id}`, `${label} à ${CITY_NAMES[id]}`)
  );
}

export const contratEntretienPage: LandingPage = {
  slug: "contrat-entretien",
  locales: ["fr"],
  serviceId: "contrat-entretien",
  serviceType: "Contrat d'entretien",
  areaServed: SERVICE_AREA_NAMES,
  title: "Contrat d'entretien clim et plomberie",
  description:
    "Contrat d'entretien climatisation et plomberie pour villas, immeubles et constructions neuves. Visites selon vos besoins, sur devis, via WhatsApp.",
  h1: "Contrat d'entretien climatisation et plomberie",
  headings: {
    services: "Ce qu'une visite peut inclure",
    comparison: "Pourquoi l'entretien compte",
    process: "Comment se met en place le contrat",
    faq: "Questions sur le contrat d'entretien",
  },
  lead: [
    "Un contrat d'entretien sert à planifier des contrôles sur des équipements déjà en place. Un filtre chargé de poussière laisse passer moins d'air. Un bac de condensats bouché peut faire déborder l'eau. Une vanne hors d'atteinte ne se contrôle pas. La visite porte sur ce qui est prévu et accessible. Elle ne remplace pas une étude d'installation.",
    "Le nombre de visites par an est adapté à chaque client. Il est défini sur le devis : selon vos besoins, sur devis. Aucun tarif n'est affiché. Le devis est personnalisé via WhatsApp, au 06 60 98 96 98.",
    "Le contrat s'adresse aux villas, aux immeubles et aux constructions neuves, à Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata. La page entretien climatisation Casablanca décrit le suivi d'une climatisation dans cette ville et aux alentours. Ici, il s'agit du cadre du contrat, une fois le devis établi.",
  ],
  servicesIntro:
    "Les contrôles ci-dessous peuvent être inclus après le devis. Ils ne sont pas tous retenus sur chaque contrat, et la liste n'est pas figée avant d'avoir vu les lieux.",
  services: [
    {
      title: "Climatisation : split, gainable, VRF",
      body: "Peut comprendre les filtres, l'échangeur ou la turbine si l'accès existe, l'évacuation des condensats, les ailettes et les supports du groupe extérieur. Un appoint de fluide n'est pas un geste systématique.",
    },
    {
      title: "Pompe à chaleur",
      body: "Peut comprendre les filtres et la circulation d'air du groupe, les vannes et le manomètre s'ils sont accessibles, et un regard sur les fuites visibles du circuit d'eau.",
    },
    {
      title: "Ventilation et extraction",
      body: "Peut comprendre les filtres, les grilles, l'accès au ventilateur et les signes d'obstruction. L'air neuf et l'extraction se regardent séparément.",
    },
    {
      title: "Chauffage au sol",
      body: "Peut comprendre les collecteurs, les départs accessibles et les traces d'humidité autour du collecteur. Le tube noyé dans la dalle ne s'ouvre pas pendant une visite.",
    },
    {
      title: "Plomberie",
      body: "Peut comprendre les raccords, les siphons et les vannes accessibles, ainsi que les suintements visibles. Un mur fermé ne se voit pas depuis une visite limitée aux parties accessibles.",
    },
  ],
  comparisonIntro:
    "Trois raisons pratiques de planifier une visite. Sans chiffre, et sans annoncer un résultat à l'avance.",
  showHvacComparison: false,
  points: [
    {
      title: "Débit d'air",
      body: "Un filtre ou une grille encrassés laissent passer moins d'air. Le contrôle consiste à les voir et, si le devis le prévoit, à les nettoyer.",
    },
    {
      title: "Eau",
      body: "Les condensats d'une climatisation et les suintements d'un réseau d'eau se voient souvent à un bac, un siphon ou une vanne. Les regarder évite de laisser une fuite visible s'installer.",
    },
    {
      title: "Accès",
      body: "On ne contrôle que ce qui s'atteint : trappe, collecteur, groupe extérieur, local technique. Le devis dit ce qui est inclus. Ce qui est fermé reste hors du passage.",
    },
  ],
  image: {
    src: "/services/traitement-d-air-3.webp",
    alt: "Centrales de traitement d'air alignées dans un local technique, avec les gaines en partie haute.",
    caption: "",
    width: 1600,
    height: 1200,
  },
  gallery: [
    {
      src: "/services/pac-air-eau-1.webp",
      alt: "Groupe de pompe à chaleur air-eau posé sur une toiture, avec les liaisons isolées au premier plan.",
      width: 1200,
      height: 1600,
    },
    {
      src: "/services/chauffage-sol-3.webp",
      alt: "Collecteur de plancher chauffant, avec les départs isolés qui descendent vers la dalle.",
      width: 720,
      height: 960,
    },
  ],
  processIntro: "Quatre étapes. Le contenu de chacune dépend des équipements et du bâtiment.",
  processTitles: ["Prise de contact", "Visite et diagnostic", "Devis adapté", "Visites planifiées"],
  process: [
    "Écrire sur WhatsApp au 06 60 98 96 98. Indiquez la ville, s'il s'agit d'une villa, d'un immeuble ou d'une construction neuve, et les équipements concernés.",
    "Un passage sert à voir les appareils accessibles et ce qui peut être contrôlé. Ce n'est pas encore la liste des visites.",
    "Le devis fixe le périmètre et le nombre de visites, selon vos besoins. Aucun prix n'est publié sur cette page. Devis personnalisé via WhatsApp.",
    "Les visites sont ensuite planifiées selon ce devis. Le rythme n'est pas le même pour chaque client.",
  ],
  cta: {
    title: "Devis personnalisé via WhatsApp",
    body: "Aucun tarif n'est affiché. Écrivez au 06 60 98 96 98 en indiquant la ville, le bâtiment et les équipements. Le nombre de visites se définit sur le devis, selon vos besoins.",
    whatsapp: "Devis personnalisé via WhatsApp",
  },
  faqs: [
    {
      question: "Combien de visites par an ?",
      answer:
        "Le nombre est adapté à chaque client. Il est défini sur le devis : selon vos besoins, sur devis. Cette page n'affiche pas de calendrier type.",
    },
    {
      question: "Quels équipements peuvent être couverts ?",
      answer:
        "La climatisation (split, gainable et VRF), la pompe à chaleur, la ventilation et l'extraction, le chauffage au sol et la plomberie. La liste retenue est celle du devis, après la visite.",
    },
    {
      question: "Le prix est-il affiché ?",
      answer:
        "Non. Devis personnalisé via WhatsApp, au 06 60 98 96 98. Le bouton de cette page ouvre cette conversation. Aucun montant n'est publié ici.",
    },
    {
      question: "À qui s'adresse le contrat, et dans quelles villes ?",
      answer:
        "Aux villas, aux immeubles et aux constructions neuves, à Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata.",
    },
    {
      question: "Une visite règle-t-elle une panne ?",
      answer:
        "Pas forcément. Le contrat porte sur les contrôles prévus au devis. Un appareil à l'arrêt se regarde à part. Rien ici n'annonce un délai d'intervention.",
    },
    {
      question: "Quelle différence avec l'entretien à Casablanca ?",
      answer:
        "Cette page décrit le contrat, pour plusieurs équipements et plusieurs villes. La page entretien climatisation Casablanca décrit le suivi d'une climatisation dans cette ville. Le contrat ne reprend pas le détail de la visite.",
    },
  ],
  links: [
    link("/entretien-climatisation-casablanca", "Entretien climatisation Casablanca"),
    link("/climatisation", "Climatisation"),
    link("/plomberie", "Plomberie"),
    link("/pompe-a-chaleur-air-eau", "Pompe à chaleur air-eau"),
    link("/chauffage-au-sol", "Chauffage au sol"),
    link("/extraction", "Extraction d'air"),
    link("/traitement-air", "Traitement d'air"),
    link("/ventilation", "Ventilation"),
    ...cityLinks("climatisation", "Climatisation"),
    ...cityLinks("plomberie", "Plomberie"),
  ],
  breadcrumbs: [
    { name: "Accueil", pathname: "/" },
    { name: "Nos services", pathname: "/nos-services" },
    { name: "Contrat d'entretien" },
  ],
};
