import { SERVICE_AREA_NAMES } from "@/lib/areas";
import { addedServicePages } from "@/lib/landings/added-services";
import { citySeoPages } from "@/lib/landings/city-seo";
import { extraLandingPages } from "@/lib/landings/extra-pages";
import { COMPARISON_ROWS, PROCESS_TITLES } from "@/lib/landings/shared";
import { LANDING_ROUTES } from "@/lib/landings/slugs";
import type { Crumb, LandingPage, LandingTranslation } from "@/lib/landings/types";
import type { Locale } from "@/i18n/routing";
import { composeTitle } from "@/lib/seo/metadata";

export type { Crumb, LandingLink, LandingPage } from "@/lib/landings/types";

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

function assertShape(
  id: string,
  copy: {
    title: string;
    description: string;
    h1: string;
    servicesIntro: string;
    comparisonIntro: string;
    processIntro: string;
    localFit?: LandingPage["localFit"];
    points?: LandingPage["points"];
    imageAlt?: string;
    imageCaption?: string;
    headings?: LandingPage["headings"];
    lead: readonly string[];
    services: LandingPage["services"];
    process: readonly string[];
    faqs: LandingPage["faqs"];
    showHvacComparison?: boolean;
    extra?: readonly string[];
  }
) {
  const fullTitle = composeTitle(copy.title);
  if (fullTitle.length > 60) {
    throw new Error(`Landing ${id} title is ${fullTitle.length} chars (max 60): ${fullTitle}`);
  }
  const length = copy.description.length;
  if (length < 140 || length > 160) {
    throw new Error(`Landing ${id} description is ${length} chars (need 140-160): ${copy.description}`);
  }
  if (copy.faqs.length < 5 || copy.faqs.length > 6) {
    throw new Error(`Landing ${id} must have 5 or 6 FAQs, has ${copy.faqs.length}`);
  }
  if (copy.process.length !== PROCESS_TITLES.length) {
    throw new Error(`Landing ${id} process steps do not match the shared titles`);
  }
  if (copy.showHvacComparison === false) {
    if (!copy.points || copy.points.length < 3) {
      throw new Error(`Landing ${id} needs at least 3 decision points`);
    }
  } else if (!copy.localFit) {
    throw new Error(`Landing ${id} is missing the HVAC comparison`);
  }
  const blobs = [
    copy.title,
    copy.description,
    copy.h1,
    copy.servicesIntro,
    copy.comparisonIntro,
    copy.processIntro,
    ...(copy.localFit ? [copy.localFit.split, copy.localFit.gainable, copy.localFit.vrv] : []),
    ...(copy.points ? copy.points.flatMap((item) => [item.title, item.body]) : []),
    ...(copy.imageAlt ? [copy.imageAlt] : []),
    ...(copy.imageCaption ? [copy.imageCaption] : []),
    ...(copy.headings
      ? [copy.headings.services, copy.headings.comparison, copy.headings.process, copy.headings.faq].filter(
          (item): item is string => Boolean(item)
        )
      : []),
    ...copy.lead,
    ...copy.services.flatMap((item) => [item.title, item.body]),
    ...copy.process,
    ...copy.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...(copy.extra ?? []),
  ];
  for (const blob of blobs) assertClean(blob, id);
}

function assertLanding(page: LandingPage) {
  assertShape(page.slug, {
    ...page,
    imageAlt: page.image?.alt,
    imageCaption: page.image?.caption,
    extra: [
      ...COMPARISON_ROWS.flatMap((row) => [row.label, row.split, row.gainable, row.vrv]),
      ...(page.gallery?.map((shot) => shot.alt) ?? []),
    ],
  });
  for (const locale of page.locales) {
    if (locale === "fr") continue;
    const copy = page.translations?.[locale];
    if (!copy) throw new Error(`Landing ${page.slug} is missing ${locale} copy`);
    if (page.gallery && copy.galleryAlts?.length !== page.gallery.length) {
      throw new Error(`Landing ${page.slug} ${locale} gallery alts do not match the photos`);
    }
    assertShape(`${page.slug}:${locale}`, {
      ...copy,
      imageAlt: copy.image?.alt,
      imageCaption: copy.image?.caption,
      showHvacComparison: page.showHvacComparison,
      localFit: copy.localFit ?? page.localFit,
      points: copy.points ?? page.points,
      extra: copy.galleryAlts ? [...copy.galleryAlts] : [],
    });
  }
}

function presentLanding(page: LandingPage, locale: Locale): LandingPage {
  if (locale === "fr") return page;
  const copy: LandingTranslation | undefined = page.translations?.[locale];
  if (!copy || !page.locales.includes(locale)) return page;
  return {
    ...page,
    title: copy.title,
    description: copy.description,
    serviceType: copy.serviceType,
    h1: copy.h1,
    headings: copy.headings,
    lead: copy.lead,
    servicesIntro: copy.servicesIntro,
    services: copy.services,
    comparisonIntro: copy.comparisonIntro,
    points: copy.points ?? page.points,
    localFit: copy.localFit ?? page.localFit,
    image: page.image
      ? {
          ...page.image,
          alt: copy.image?.alt ?? page.image.alt,
          caption: copy.image?.caption ?? page.image.caption,
        }
      : undefined,
    gallery: page.gallery?.map((shot, index) => ({
      ...shot,
      alt: copy.galleryAlts?.[index] ?? shot.alt,
    })),
    processIntro: copy.processIntro,
    process: copy.process,
    faqs: copy.faqs,
    links: copy.links,
    breadcrumbs: copy.breadcrumbs,
  };
}

const home: Crumb = { name: "Accueil", pathname: "/" };

const handwritten: LandingPage[] = [
  {
    slug: "climatisation",
    locales: ["fr"],
    serviceId: "climatisation",
    serviceType: "Climatisation",
    areaServed: SERVICE_AREA_NAMES,
    title: "Installation climatisation Casablanca",
    description:
      "Installation de climatisation à Casablanca : split, gainable et VRV après étude du logement. Fourniture et pose de marques présentées sur l'accueil.",
    h1: "Installation de climatisation à Casablanca",
    headings: {
      services: "Split, gainable et VRV",
      comparison: "Comparer les systèmes",
      process: "De la visite à l'entretien",
      faq: "Questions sur l'installation à Casablanca",
    },
    lead: [
      "L'installation de climatisation à Casablanca part du logement, pas d'une puissance au mètre carré. Casablanca, Mohammedia, Tamaris et Rabat imposent l'humidité du littoral. Marrakech impose une chaleur sèche et des toitures très exposées. Bouskoura et Zenata ajoutent la poussière des lotissements et des chantiers. AEROVENTIS est une société de climatisation à Casablanca : elle étudie le site avant de proposer un split, un gainable ou un VRV.",
      "La fourniture des appareils fait partie du chantier. Pour qui cherche un fournisseur de climatisation à Casablanca, AEROVENTIS installe les marques déjà affichées sur l'accueil. Ce n'est pas une activité de négoce. Le détail des quartiers est sur la page de chaque ville.",
    ],
    servicesIntro:
      "Trois familles d'appareils couvrent l'installation, à Casablanca comme dans les autres villes : villas, appartements et petits ensembles tertiaires.",
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
      "Le tableau compare les principes d'une installation à Casablanca ou ailleurs. Il ne remplace pas le relevé : une villa de la Palmeraie et un appartement d'Agdal ne partent pas du même plan.",
    localFit: {
      split: "Utile à Casablanca et Rabat dans les appartements, et à Marrakech pour une pièce exposée en attendant un réseau complet.",
      gainable: "Pertinent pour les villas, en neuf à Bouskoura ou à Hay Riad comme en rénovation quand le couloir peut perdre quelques centimètres.",
      vrv: "Réservé aux immeubles et aux locaux professionnels, là où le syndic limite les groupes en façade.",
    },
    processIntro:
      "Le déroulé d'une installation est le même d'une ville à l'autre. Le contenu de la visite change : air salin, poussière ou hauteur de plafond.",
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
          "Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata ont chacune une page. Le gainable casablancais et l'entretien à Casablanca ont aussi les leurs.",
      },
      {
        question: "Le même appareil convient-il aux trois villes ?",
        answer:
          "Non. L'humidité et l'air salin du littoral ne se traitent pas comme la chaleur sèche et la poussière de Marrakech. Le dimensionnement part du site.",
      },
      {
        question: "Par où commence une installation de climatisation à Casablanca ?",
        answer:
          "Par le nombre de pièces et la hauteur disponible au plafond. Le split équipe peu de pièces. Le gainable suppose un plénum. Le VRV vise un ensemble de locaux. Les quartiers de Casablanca sont détaillés sur la page de la ville.",
      },
      {
        question: "Intervenez-vous en dehors de ces villes ?",
        answer:
          "Les pages publiées couvrent Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata. Pour un autre secteur, la page contact permet de décrire le projet.",
      },
      {
        question: "La ventilation est-elle incluse dans la climatisation ?",
        answer:
          "Non. La climatisation traite la température. L'air neuf est sur la page ventilation. L'extraction et le désenfumage ont les leurs : ce ne sont pas les mêmes réseaux.",
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
      { href: "/climatisation-mohammedia", label: "Climatisation à Mohammedia" },
      { href: "/climatisation-bouskoura", label: "Climatisation à Bouskoura" },
      { href: "/climatisation-tamaris", label: "Climatisation à Tamaris" },
      { href: "/climatisation-zenata", label: "Climatisation à Zenata" },
      { href: "/ventilation", label: "Ventilation" },
      { href: "/plomberie", label: "Plomberie" },
      { href: "/extraction", label: "Extraction d'air" },
      { href: "/desenfumage", label: "Désenfumage" },
      { href: "/climatisation-gainable", label: "Climatisation gainable" },
      { href: "/pompe-a-chaleur-air-eau", label: "Pompe à chaleur air-eau" },
      { href: "/entretien-climatisation-casablanca", label: "Entretien à Casablanca" },
      { href: "/zone-intervention", label: "Zone d'intervention" },
      { href: "/blog/maitrisez-votre-climat", label: "Maîtrisez votre climat" },
      { href: "/contact", label: "Contact" },
    ],
    breadcrumbs: [home, { name: "Climatisation" }],
  },
  {
    slug: "climatisation-gainable",
    locales: ["fr"],
    serviceId: "climatisation-gainable",
    serviceType: "Climatisation gainable",
    areaServed: ["Casablanca", "Rabat", "Marrakech"],
    title: "Climatisation gainable Casablanca",
    description:
      "Climatisation gainable à Casablanca : étude des gaines, des bouches et du faux plafond pour villas et immeubles. Quartiers détaillés sur la page de la ville.",
    h1: "Climatisation gainable à Casablanca, Rabat et Marrakech",
    headings: {
      services: "Gaines, bouches et zoning",
      comparison: "Gainable, split ou VRV",
      process: "Du plafond à la mise en service",
      faq: "Questions sur le gainable à Casablanca",
    },
    lead: [
      "La climatisation gainable à Casablanca cache l'unité dans un faux plafond et distribue l'air par des gaines. Elle se justifie quand plusieurs pièces doivent être traitées sans multiplier les splits au mur. Elle ne se justifie pas si le plénum n'existe pas et ne peut pas être créé.",
      "Le détail des quartiers casaouis — Anfa, Californie, Ain Diab et Bouskoura — est sur la page gainable de Casablanca. Rabat et Marrakech restent sur leurs pages climatisation tant qu'un texte gainable propre à chaque ville n'est pas publié.",
    ],
    servicesIntro:
      "Une climatisation gainable à Casablanca n'est pas un split dissimulé. L'étude porte sur les gaines, les bouches, la reprise d'air et l'accès aux filtres.",
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
      "Même pour une climatisation gainable à Casablanca, le split et le VRV restent des options. Le gainable convient seulement si le plafond et le nombre de pièces le permettent.",
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
        question: "Où lire la climatisation gainable à Casablanca, quartier par quartier ?",
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
      { href: "/climatisation", label: "Installation de climatisation à Casablanca" },
      { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
      { href: "/climatisation-rabat", label: "Climatisation à Rabat" },
      { href: "/climatisation-marrakech", label: "Climatisation à Marrakech" },
      { href: "/entretien-climatisation-casablanca", label: "Entretien à Casablanca" },
      { href: "/zone-intervention", label: "Zone d'intervention" },
      { href: "/blog/maitrisez-votre-climat", label: "Maîtrisez votre climat" },
      { href: "/contact", label: "Contact" },
    ],
    breadcrumbs: [home, { name: "Climatisation gainable" }],
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

const pages: LandingPage[] = [...handwritten, ...citySeoPages, ...extraLandingPages, ...addedServicePages];

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

const titles = pages.flatMap((page) => {
  const localized = page.locales
    .filter((locale) => locale !== "fr")
    .map((locale) => page.translations?.[locale]?.title)
    .filter((title): title is string => Boolean(title))
    .map((title) => composeTitle(title));
  return [composeTitle(page.title), ...localized];
});
if (new Set(titles).size !== titles.length) {
  throw new Error("Landing titles must be unique");
}

export function getLandingPages(): readonly LandingPage[] {
  return pages;
}

export function getLandingPage(slug: string, locale: Locale = "fr"): LandingPage | undefined {
  const page = pages.find((item) => item.slug === slug);
  if (!page) return undefined;
  return presentLanding(page, locale);
}
