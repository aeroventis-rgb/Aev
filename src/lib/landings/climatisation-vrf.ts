import { SERVICE_AREA_NAMES } from "@/lib/areas";
import { COMPARISON_ROWS, PROCESS_TITLES } from "@/lib/landings/shared";
import type { LandingPage } from "@/lib/landings/types";

/**
 * National VRF / DRV page. City climate stays on each `/climatisation-{city}`
 * page. French copy says VRF, and DRV only as the French synonym.
 */

export const climatisationVrfPage: LandingPage = {
  slug: "climatisation-vrf",
  locales: ["fr"],
  serviceId: "climatisation-vrf",
  serviceType: "Climatisation VRF / DRV",
  areaServed: SERVICE_AREA_NAMES,
  title: "Climatisation VRF / DRV au Maroc",
  description:
    "Climatisation VRF / DRV au Maroc : un groupe extérieur et plusieurs unités intérieures, pour immeubles, hôtels et bureaux. Étude et devis sur WhatsApp.",
  h1: "Climatisation VRF / DRV au Maroc : immeubles, hôtels et bureaux",
  headings: {
    services: "Ce que couvre l'étude VRF",
    comparison: "VRF, split ou gainable",
    process: "Les étapes d'un projet VRF",
    faq: "Questions sur la climatisation VRF / DRV",
  },
  lead: [
    "Un système VRF, aussi appelé DRV, relie plusieurs unités intérieures à un seul groupe extérieur. VRF veut dire que le débit de fluide frigorigène varie. DRV est le nom français : débit de réfrigérant variable. Le fluide circule dans un réseau commun, et chaque local ne reçoit que le débit utile à cet instant.",
    "Le groupe se pose en toiture, sur une terrasse ou dans un local technique aéré. L'entretien doit rester possible. Les unités intérieures se choisissent local par local : murale si le plafond ne descend pas, cassette dans un faux plafond de bureau ou de hall, gainable quand un couloir technique existe. Ces formes peuvent coexister sur le même circuit.",
    "Certains VRF proposent une récupération de chaleur. Une pièce en demande de froid et une pièce en demande de chaud fonctionnent alors en même temps, le circuit réutilisant une partie de la chaleur prélevée. Ce n'est pas le montage de base. On ne le retient que si des locaux ont vraiment des besoins opposés au même moment. Sinon, un VRF réversible suffit : il climatise ou il chauffe l'ensemble.",
    "Le VRF convient aux immeubles, aux hôtels, aux bureaux, aux cliniques, aux grandes villas et aux autres bâtiments tertiaires, quand beaucoup de locaux doivent être traités sans multiplier les groupes en façade. Un petit appartement reste plus simple en split. Une villa avec un seul faux plafond continu se traite souvent mieux en gainable.",
    "AEROVENTIS part du bâtiment : bilan thermique, dimensionnement, unités intérieures, réseaux frigorifiques, régulation centralisée et mise en service. L'entretien se cadre ensuite sur la page contrat d'entretien. Aucun prix n'est affiché. Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata ont chacune une page. Le climat local change l'emplacement du groupe, pas le principe du VRF.",
  ],
  servicesIntro:
    "Six sujets se règlent pendant l'étude, avant de commander le matériel. Aucun ne se déduit d'une surface au mètre carré.",
  services: [
    {
      title: "Étude et bilan thermique",
      body: "Orientation, vitrages, occupation et horaires. Un hôtel, des bureaux et une clinique n'ont pas le même profil. Le relevé se fait sur place.",
    },
    {
      title: "Dimensionnement",
      body: "La puissance du groupe et celle de chaque unité partent du bilan. Un groupe trop juste peine aux heures chaudes. Un groupe trop large s'arrête et repart souvent.",
    },
    {
      title: "Unités intérieures",
      body: "Murales, cassettes ou gainables, parfois les trois sur le même groupe. Le choix suit la hauteur de plafond et la façon de diffuser l'air.",
    },
    {
      title: "Réseaux frigorifiques",
      body: "Les liaisons partent du groupe, passent par des dérivations, puis rejoignent chaque unité. Longueurs, dénivelés et diamètres se vérifient sur le plan. Les condensats s'évacuent à part.",
    },
    {
      title: "Régulation centralisée",
      body: "Chaque local peut avoir sa consigne. Un contrôleur d'ensemble montre les zones, pose des plages horaires et coupe les locaux vides. Son emplacement se décide avant les finitions.",
    },
    {
      title: "Mise en service",
      body: "Tirage au vide, contrôle d'étanchéité, ouverture du fluide, puis lecture des températures de soufflage et des modes. La mise en service vérifie que le réseau calculé se comporte comme prévu.",
    },
  ],
  comparisonIntro:
    "Le tableau compare les trois familles. Sur un immeuble, un hôtel ou des bureaux, le VRF est souvent le point de départ. Le split et le gainable restent justes pour une partie du bâtiment.",
  localFit: {
    split:
      "Utile pour une pièce isolée ou un local qui ne justifie pas un réseau commun. Plusieurs splits en façade compliquent le suivi d'un immeuble.",
    gainable:
      "Utile pour une villa ou un plateau avec un faux plafond continu et un seul groupe. Plusieurs gainables séparés recréent vite plusieurs groupes en toiture.",
    vrv: "Utile dès que de nombreux locaux partagent peu de groupes, avec des unités intérieures différentes. La récupération de chaleur s'ajoute seulement si des besoins opposés existent en même temps.",
  },
  image: {
    src: "/brand/13-unites-exterieures.webp",
    alt: "Groupes extérieurs de climatisation alignés sur une toiture, dans un visuel AEROVENTIS sur l'implantation et l'accès pour l'entretien.",
    caption: "",
    width: 1600,
    height: 900,
  },
  processIntro: "Quatre étapes. Le contenu de chacune dépend du bâtiment, pas d'un modèle unique.",
  process: [
    "Visite du site : nombre de locaux, hauteurs de plafond, accès en toiture ou en local technique, alimentation électrique et chemin des condensats. À ce stade, le VRF n'est pas encore retenu.",
    "Bilan thermique, choix des murales, cassettes ou gainables, tracé des liaisons et schéma de régulation. Le devis part de cette étude. Aucun prix n'est publié ici.",
    "Pose des supports, des liaisons, des unités et du contrôleur, puis tirage au vide et mise en service. Les faux plafonds se coordonnent avec les autres intervenants.",
    "Filtres, condensats, échangeurs et contrôle des modes. Le cadre des visites est sur la page contrat d'entretien. Le rythme se définit sur le devis, selon le bâtiment.",
  ],
  cta: {
    title: "Devis sur WhatsApp",
    body: "Aucun prix n'est affiché. Écrivez au 06 60 98 96 98 : la ville, le bâtiment et une idée du nombre de locaux. Le devis suit la visite.",
    whatsapp: "Devis sur WhatsApp",
  },
  faqs: [
    {
      question: "VRF et DRV, est-ce la même chose ?",
      answer:
        "Oui. VRF désigne le débit de fluide variable. DRV est le nom français, débit de réfrigérant variable. Le principe est le même : un groupe extérieur, plusieurs unités intérieures, un débit qui s'adapte.",
    },
    {
      question: "Le VRF remplace-t-il le split et le gainable ?",
      answer:
        "Non. Le split reste adapté à peu de pièces. Le gainable reste adapté à un volume avec un faux plafond continu. Le VRF prend le relais quand de nombreux locaux partagent peu de groupes.",
    },
    {
      question: "Peut-on climatiser et chauffer en même temps ?",
      answer:
        "Seulement avec la récupération de chaleur, si des locaux ont des besoins opposés au même moment. Un VRF réversible classique climatise ou chauffe l'ensemble, pas les deux à la fois.",
    },
    {
      question: "Quelles unités intérieures peut-on mélanger ?",
      answer:
        "Des murales, des cassettes et des gainables peuvent coexister sur le même circuit, dans la limite du groupe et des longueurs de liaison. Le mélange se dessine pièce par pièce.",
    },
    {
      question: "Dans quelles villes le projet peut-il être étudié ?",
      answer:
        "À Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata. Chaque ville a une page climatisation. Le littoral et Marrakech ne placent pas le groupe de la même façon.",
    },
    {
      question: "Comment demander un devis, et un prix est-il affiché ?",
      answer:
        "Aucun prix n'est affiché. Le bouton WhatsApp ouvre la conversation au 06 60 98 96 98. Indiquez la ville, le bâtiment et une idée du nombre de locaux. Le devis vient après la visite.",
    },
  ],
  links: [
    { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
    { href: "/climatisation-rabat", label: "Climatisation à Rabat" },
    { href: "/climatisation-marrakech", label: "Climatisation à Marrakech" },
    { href: "/climatisation-mohammedia", label: "Climatisation à Mohammedia" },
    { href: "/climatisation-bouskoura", label: "Climatisation à Bouskoura" },
    { href: "/climatisation-tamaris", label: "Climatisation à Tamaris" },
    { href: "/climatisation-zenata", label: "Climatisation à Zenata" },
    { href: "/climatisation", label: "Climatisation" },
    { href: "/climatisation-gainable", label: "Climatisation gainable" },
    { href: "/contrat-entretien", label: "Contrat d'entretien" },
    { href: "/nos-services", label: "Nos services" },
    { href: "/zone-intervention", label: "Zone d'intervention" },
    { href: "/contact", label: "Contact" },
  ],
  breadcrumbs: [
    { name: "Accueil", pathname: "/" },
    { name: "Climatisation", pathname: "/climatisation" },
    { name: "Climatisation VRF / DRV" },
  ],
};

function visibleWords(page: LandingPage): string[] {
  return [
    page.h1,
    page.title,
    page.description,
    ...(page.headings
      ? [page.headings.services, page.headings.comparison, page.headings.process, page.headings.faq]
      : []),
    ...page.lead,
    page.servicesIntro,
    ...page.services.flatMap((item) => [item.title, item.body]),
    page.comparisonIntro,
    page.localFit?.split,
    page.localFit?.gainable,
    page.localFit?.vrv,
    ...COMPARISON_ROWS.flatMap((row) => [row.label, row.split, row.gainable, row.vrv]),
    page.processIntro,
    ...PROCESS_TITLES,
    ...page.process,
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
    page.cta?.title,
    page.cta?.body,
    page.cta?.whatsapp,
    page.image?.alt,
    page.image?.caption,
  ].filter((part): part is string => Boolean(part));
}

const copy = visibleWords(climatisationVrfPage).join("\n");
const wordCount = copy.trim().split(/\s+/).filter(Boolean).length;
if (wordCount < 900 || wordCount > 1200) {
  throw new Error(`Climatisation VRF page is ${wordCount} words (need 900-1200)`);
}
if (/\bVRV\b/i.test(copy)) {
  throw new Error("Climatisation VRF page must not use the term VRV");
}
if (/illustration/i.test(copy)) {
  throw new Error("Climatisation VRF page must not use an Illustration label");
}
