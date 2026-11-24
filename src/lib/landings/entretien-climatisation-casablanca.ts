import { BRAND_SLIDES } from "@/lib/brand-slides";
import type { LandingPage } from "@/lib/landings/types";

/**
 * Primary page for « entretien climatisation casablanca ».
 * The contract page stays on the multi-trade agreement. City pages stay on
 * installation and dépannage, and link here for the visit itself.
 */

export const entretienClimatisationCasablancaPage: LandingPage = {
  slug: "entretien-climatisation-casablanca",
  locales: ["fr"],
  serviceId: "entretien-climatisation",
  serviceType: "Entretien de climatisation",
  cityId: "casablanca",
  areaServed: ["Casablanca", "Bouskoura", "Mohammedia", "Tamaris", "Zenata"],
  title: "Entretien climatisation Casablanca",
  description:
    "Entretien climatisation Casablanca : filtres, unités, condensats, pressions et contrôles électriques. Villas, appartements et bureaux, visite ou contrat.",
  h1: "Entretien climatisation Casablanca",
  headings: {
    services: "Ce que comprend une visite",
    comparison: "Villas, appartements et bureaux",
    process: "Comment demander la visite",
    faq: "Questions sur l'entretien à Casablanca",
  },
  lead: [
    "Cette page décrit l'entretien climatisation Casablanca : une visite sur un appareil déjà en place, pour contrôler et nettoyer ce qui est accessible. Elle ne décrit pas une installation neuve. Le choix d'un split, d'un gainable ou d'un VRF se fait sur les pages climatisation de la ville.",
    "À Casablanca, l'humidité du littoral remplit les bacs de condensats et le sel se dépose sur le groupe extérieur. À Bouskoura, à Zenata ou près d'un chantier, c'est plutôt la poussière qui colmate les filtres. Mohammedia et Tamaris restent sur le même air marin que le littoral casaoui.",
    "La visite peut être ponctuelle, par exemple avant l'été, ou entrer dans un contrat d'entretien. Le contrat peut regrouper d'autres équipements et d'autres villes. Il est décrit à part. Ici, il s'agit de la climatisation à Casablanca et dans les secteurs voisins.",
  ],
  servicesIntro:
    "Cinq contrôles reviennent sur une visite. Le devis retient ceux qui sont utiles et accessibles. Un appoint de fluide n'est pas un geste automatique.",
  services: [
    {
      title: "Filtres",
      body: "Dépoussiérage des filtres de l'unité intérieure. Entre deux visites, l'occupant peut les rincer en période d'usage, après avoir coupé l'appareil. La visite ne remplace pas ce geste.",
    },
    {
      title: "Unités intérieure et extérieure",
      body: "Nettoyage de l'échangeur et de la turbine à l'intérieur, et lavage de l'ailettage du groupe extérieur quand on peut l'atteindre. À Casablanca, le sel et la poussière s'y déposent.",
    },
    {
      title: "Évacuation des condensats",
      body: "Contrôle du bac et du tuyau d'évacuation. Un circuit bouché fait goutter l'eau, souvent chez le voisin du dessous dans un appartement.",
    },
    {
      title: "Pressions et fluide frigorigène",
      body: "Lecture des pressions, et recherche d'une fuite si le froid baisse. Le fluide circule en circuit fermé : un appoint sans recherche de fuite ne règle pas le problème. La manipulation du fluide reste au technicien.",
    },
    {
      title: "Contrôles électriques",
      body: "Regard sur les connexions, l'alimentation et les températures de soufflage, quand le coffret et les borniers sont accessibles.",
    },
  ],
  comparisonIntro:
    "Le rythme dépend du logement et des heures de fonctionnement. Cette page ne fixe pas un calendrier unique, et aucun tarif n'y est affiché.",
  showHvacComparison: false,
  points: [
    {
      title: "Villas",
      body: "Une villa à Bouskoura, à Tamaris ou dans Casablanca a souvent plusieurs pièces, et un groupe au jardin ou en toiture. Une visite avant les fortes chaleurs, plus un rinçage des filtres par l'occupant pendant la saison, couvre un usage d'été. Si la maison est aussi chauffée par la climatisation, un second regard en automne se discute sur devis.",
    },
    {
      title: "Appartements",
      body: "Dans un appartement, le groupe est parfois en façade ou en toiture, et le syndic ou le gardien doit laisser passer. Le bac de condensats se bouche plus vite avec l'humidité. Une visite avant l'été est le rythme courant quand l'appareil ne sert qu'en saison chaude.",
    },
    {
      title: "Bureaux",
      body: "Un bureau ou un local qui tourne de longues heures, parfois aussi en chauffage, use les filtres plus vite qu'un logement. Le nombre de visites se définit sur devis, selon l'usage et l'accès. Il n'est pas annoncé à l'avance sur cette page.",
    },
  ],
  image: {
    src: BRAND_SLIDES.preventive,
    alt: "Visuel de présentation AEROVENTIS sur la maintenance préventive : filtres, manomètres et contrôle d'une unité extérieure. Pas la photo d'un chantier identifié.",
    caption: "",
    width: 1600,
    height: 900,
  },
  processIntro: "Quatre étapes, du message au compte rendu. Le contenu de la visite dépend de l'appareil et de l'accès.",
  processTitles: ["Message", "Passage", "Compte rendu", "Suite"],
  process: [
    "Écrire sur WhatsApp au 06 60 98 96 98. Indiquez Casablanca ou le secteur voisin, s'il s'agit d'une villa, d'un appartement ou d'un bureau, et le type d'appareil : split, gainable, cassette ou VRF.",
    "Le passage sert à voir les unités accessibles, les filtres, les condensats et ce qui peut être contrôlé. Un groupe qu'on ne peut pas atteindre ne se lave pas depuis la rue.",
    "Un compte rendu simple dit ce qui a été nettoyé et ce qui devra l'être plus souvent.",
    "La visite peut rester ponctuelle. Si vous voulez des passages planifiés, le contrat d'entretien fixe le nombre de visites sur devis.",
  ],
  sections: [
    {
      heading: "Signes qu'une climatisation a besoin d'entretien",
      intro:
        "Ces signes ne donnent pas le diagnostic. Ils indiquent qu'une visite est utile, plutôt que d'attendre une panne en pleine chaleur.",
      items: [
        {
          title: "Air moins froid",
          body: "Le soufflage faiblit ou reste tiède, alors que les filtres viennent d'être rincés et que le mode froid est bien sélectionné.",
        },
        {
          title: "Eau qui goutte",
          body: "Des gouttes sous l'unité intérieure, ou une tache au plafond du voisin. Le bac ou le tuyau de condensats est souvent en cause.",
        },
        {
          title: "Odeur ou bruit",
          body: "Une odeur au démarrage, un bruit nouveau, ou un groupe extérieur qui vibre. Mieux vaut couper l'appareil et le faire voir.",
        },
        {
          title: "Givre",
          body: "Du givre sur les liaisons en mode froid. Arrêtez le froid et laissez dégivrer. Si le givre revient, il faut un contrôle, pas un appoint systématique.",
        },
      ],
    },
    {
      heading: "Split, gainable, cassette et VRF",
      intro:
        "La visite change selon l'appareil. On ne démonte pas un plafond pour atteindre un filtre qui n'a pas de trappe.",
      items: [
        {
          title: "Split et multi-split",
          body: "Les filtres sont en façade de l'unité murale, et la turbine est accessible. Le groupe est souvent en façade, en courette ou en toiture. En immeuble, le syndic doit laisser passer pour le lavage.",
        },
        {
          title: "Gainable",
          body: "Le filtre est derrière une trappe. Les bouches et la reprise s'ajoutent à l'unité. Sans trappe prévue à la pose, l'entretien devient un démontage de plafond.",
        },
        {
          title: "Cassette",
          body: "L'unité est dans le plafond d'un local, d'un commerce ou d'un bureau. Le filtre et le bac se contrôlent par la façade de la cassette, si elle s'ouvre.",
        },
        {
          title: "VRF",
          body: "Plusieurs unités intérieures partagent un circuit de fluide à débit variable. Le contrôle prend plus de temps. Il se cale avec le gestionnaire de l'immeuble ou du plateau.",
        },
      ],
    },
    {
      heading: "Contrat d'entretien ou visite ponctuelle",
      paragraphs: [
        "Une visite ponctuelle convient quand vous voulez un contrôle avant l'été, ou après un signe : odeur, gouttes, air tiède. Vous écrivez, la visite a lieu, le compte rendu dit ce qui a été fait.",
        "Un contrat d'entretien planifie des visites dans l'année. Il peut regrouper la climatisation et d'autres équipements, à Casablanca comme dans d'autres villes. Le nombre de visites et le périmètre se définissent sur devis. Aucun tarif n'est affiché ici. Le contrat ne reprend pas le détail de cette page.",
      ],
      links: [{ href: "/contrat-entretien", label: "Contrat d'entretien" }],
    },
    {
      heading: "Casablanca et les secteurs voisins",
      intro:
        "La visite couvre Casablanca et les secteurs proches où AEROVENTIS se déplace déjà. Le climat n'y est pas le même d'un bout à l'autre.",
      items: [
        {
          title: "Casablanca",
          body: "Immeubles, appartements et maisons, du littoral vers l'intérieur. L'accès au groupe et l'eau des condensats ouvrent la visite.",
        },
        {
          title: "Bouskoura",
          body: "Villas et jardins. La poussière encrasse les filtres. Le groupe est souvent au sol, plus simple à laver s'il n'est pas enfermé.",
        },
        {
          title: "Mohammedia",
          body: "Air du littoral, tout près de Casablanca. Même attention au sel sur l'échangeur extérieur et aux bacs de condensats.",
        },
        {
          title: "Tamaris",
          body: "Villas proches de la mer. Le groupe doit rester accessible pour le lavage, à l'abri des embruns directs quand l'emplacement le permet.",
        },
        {
          title: "Zenata",
          body: "Maisons et locaux récents. Quand le quartier se construit encore, la poussière de chantier charge les filtres plus vite.",
        },
      ],
    },
  ],
  cta: {
    title: "Demander une visite sur WhatsApp",
    body: "Aucun tarif n'est affiché. Le bouton ouvre la conversation au 06 60 98 96 98. Précisez le secteur, le logement et l'appareil : split, gainable, cassette ou VRF.",
    whatsapp: "Écrire sur WhatsApp",
  },
  faqs: [
    {
      question: "Que comprend l'entretien climatisation Casablanca ?",
      answer:
        "La visite peut couvrir les filtres, le nettoyage des unités intérieure et extérieure si elles sont accessibles, l'évacuation des condensats, la lecture des pressions et un regard sur les connexions électriques. La liste retenue est celle du devis, après avoir vu les lieux.",
    },
    {
      question: "À quelle fréquence prévoir une visite ?",
      answer:
        "Pour une villa ou un appartement utilisé surtout en été, une visite avant les fortes chaleurs est le rythme courant, avec un nettoyage des filtres par l'occupant pendant la saison. Un bureau qui tourne longtemps peut demander plus de passages. Le nombre se fixe sur devis.",
    },
    {
      question: "Quels appareils sont suivis ?",
      answer:
        "Les splits, les multi-splits, les gainables, les cassettes et les VRF. L'accès compte : sans trappe, un gainable ne se nettoie pas comme un split mural.",
    },
    {
      question: "Faut-il un contrat ou une visite ponctuelle ?",
      answer:
        "Une visite ponctuelle suffit pour un contrôle avant l'été ou après un signe. Le contrat planifie plusieurs visites et peut inclure d'autres équipements. Son cadre est sur la page contrat d'entretien. Aucun tarif n'est affiché ici.",
    },
    {
      question: "Quels secteurs autour de Casablanca sont couverts ?",
      answer:
        "Casablanca, Bouskoura, Mohammedia, Tamaris et Zenata. Pour Rabat ou Marrakech, partez de la page climatisation de la ville, ou du contrat d'entretien si vous voulez des visites planifiées.",
    },
    {
      question: "Comment écrire sur WhatsApp ?",
      answer:
        "Le bouton de cette page ouvre WhatsApp au 06 60 98 96 98. Indiquez la ville ou le secteur, villa, appartement ou bureau, et le type d'appareil.",
    },
  ],
  links: [
    { href: "/contrat-entretien", label: "Contrat d'entretien" },
    { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
    { href: "/climatisation-gainable-casablanca", label: "Gainable à Casablanca" },
    { href: "/climatisation-vrf", label: "Climatisation VRF" },
    { href: "/climatisation-bouskoura", label: "Climatisation à Bouskoura" },
    { href: "/climatisation-mohammedia", label: "Climatisation à Mohammedia" },
    { href: "/climatisation-tamaris", label: "Climatisation à Tamaris" },
    { href: "/climatisation-zenata", label: "Climatisation à Zenata" },
    { href: "/blog/climatiseur-ne-refroidit-plus", label: "Climatiseur qui ne refroidit plus" },
    { href: "/zone-intervention", label: "Zone d'intervention" },
    { href: "/contact", label: "Contact" },
  ],
  breadcrumbs: [
    { name: "Accueil", pathname: "/" },
    { name: "Nos services", pathname: "/nos-services" },
    { name: "Entretien climatisation Casablanca" },
  ],
};
