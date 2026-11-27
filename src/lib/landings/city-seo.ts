import type { CityId } from "@/lib/landings/slugs";
import type { Crumb, LandingLink, LandingPage } from "@/lib/landings/types";

/**
 * Local French pages for city + trade queries.
 * Climatisation URLs already existed. Plumbing stays on `plomberie-{city}`
 * (the site convention) and also answers « plombier {ville} ». A second
 * `plombier-*` URL would compete with the same intent; middleware redirects
 * those aliases here.
 */

const home: Crumb = { name: "Accueil", pathname: "/" };
const services: Crumb = { name: "Nos services", pathname: "/nos-services" };

function link(path: `/${string}`, label: string): LandingLink {
  return { href: path, label };
}

function meta(slug: string, text: string): string {
  if (text.length < 140 || text.length > 160) {
    throw new Error(`${slug} description is ${text.length} characters: ${text}`);
  }
  return text;
}

function photo(
  src: string,
  alt: string,
  width: number,
  height: number
): NonNullable<LandingPage["image"]> {
  if (/illustration/i.test(alt)) {
    throw new Error(`Alt must not say Illustration: ${alt}`);
  }
  return { src, alt, caption: "", width, height };
}

const sharedTradeLinks: readonly LandingLink[] = [
  link("/extraction", "Extraction d'air"),
  link("/traitement-air", "Traitement d'air"),
  link("/pompe-a-chaleur-air-eau", "Pompe à chaleur air-eau"),
  link("/chauffage-au-sol", "Chauffage au sol"),
  link("/hammam-beldi", "Hammam beldi"),
  link("/climatisation", "Climatisation"),
  link("/plomberie", "Plomberie"),
  link("/zone-intervention", "Zone d'intervention"),
  link("/contact", "Contact"),
];

function crumbs(parent: Crumb, current: string): readonly Crumb[] {
  return [home, services, parent, { name: current }];
}

type CityCopy = {
  slug: string;
  serviceId: LandingPage["serviceId"];
  serviceType: string;
  cityId: CityId;
  areaServed: readonly string[];
  title: string;
  description: string;
  h1: string;
  headings: NonNullable<LandingPage["headings"]>;
  lead: readonly string[];
  servicesIntro: string;
  services: LandingPage["services"];
  comparisonIntro: string;
  points: NonNullable<LandingPage["points"]>;
  image: NonNullable<LandingPage["image"]>;
  processIntro: string;
  process: readonly string[];
  faqs: LandingPage["faqs"];
  links: readonly LandingLink[];
  sections?: LandingPage["sections"];
  parent: Crumb;
};

function cityPage(copy: CityCopy): LandingPage {
  return {
    slug: copy.slug,
    locales: ["fr"],
    serviceId: copy.serviceId,
    serviceType: copy.serviceType,
    cityId: copy.cityId,
    areaServed: copy.areaServed,
    title: copy.title,
    description: meta(copy.slug, copy.description),
    h1: copy.h1,
    headings: copy.headings,
    lead: copy.lead,
    servicesIntro: copy.servicesIntro,
    services: copy.services,
    comparisonIntro: copy.comparisonIntro,
    showHvacComparison: false,
    points: copy.points,
    image: copy.image,
    processIntro: copy.processIntro,
    process: copy.process,
    faqs: copy.faqs,
    links: copy.links,
    sections: copy.sections,
    breadcrumbs: crumbs(copy.parent, copy.h1),
  };
}

const climParent: Crumb = { name: "Climatisation", pathname: "/climatisation" };
const plumbParent: Crumb = { name: "Plomberie", pathname: "/plomberie" };

const climCasablanca = cityPage({
  slug: "climatisation-casablanca",
  serviceId: "climatisation",
  serviceType: "Climatisation",
  cityId: "casablanca",
  areaServed: ["Casablanca", "Anfa", "Californie", "Ain Diab", "Bouskoura", "Tamaris", "Mohammedia"],
  title: "Climatisation Casablanca : split et VRF",
  description:
    "Climatisation à Casablanca : split, gainable et VRF pour Anfa, Californie, Ain Diab, Bouskoura, Tamaris et Mohammedia. Visite, entretien et dépannage.",
  h1: "Climatisation à Casablanca",
  headings: {
    services: "Split, gainable, VRF, PAC, entretien",
    comparison: "Villas, immeubles et constructions neuves",
    process: "Visite, étude, devis, pose et suivi",
    faq: "Questions sur la climatisation à Casablanca",
  },
  lead: [
    "La climatisation à Casablanca doit refroidir et déshumidifier. Vers Ain Diab et la corniche, le sel se dépose sur le groupe. Anfa et Californie ajoutent le syndic. Bouskoura encrasse les filtres de poussière. Tamaris prend le vent marin, Mohammedia mêle logements et locaux vers Rabat.",
    "On ne part pas d'une puissance au mètre carré. Le split, le gainable et le VRF ne tiennent pas dans le même plafond. Une pompe à chaleur air-eau (PAC) chauffe un circuit d'eau : elle ne souffle pas à la place du séjour.",
  ],
  servicesIntro:
    "Cinq demandes reviennent. Le relevé dit lesquelles concernent le logement, de la corniche à Bouskoura, Tamaris et Mohammedia.",
  services: [
    {
      title: "Split et multi-split",
      body: "Dans un appartement d'Anfa ou de Californie, le plafond est souvent trop bas pour des gaines. Une ou plusieurs unités murales traitent le séjour et les chambres, si le groupe est accepté en coursive, en toiture ou en local technique. Les condensats se tracent avant le percement.",
    },
    {
      title: "Gainable",
      body: "Les villas de Bouskoura, et certaines maisons d'Anfa, ont un plénum ou peuvent le réserver au neuf. Le gainable cache l'unité et répartit l'air par des gaines. À Californie, beaucoup de dalles ne laissent pas cette hauteur. La page gainable de Casablanca détaille bouches et trappes.",
    },
    {
      title: "VRF",
      body: "Plusieurs unités intérieures partagent un circuit à débit variable, pour limiter les groupes en façade. Cela concerne un petit immeuble ou un plateau de bureaux, pas une chambre seule. À Anfa, l'intérêt est de réduire ce qui se voit dehors.",
    },
    {
      title: "Pompe à chaleur (PAC)",
      body: "La PAC air-eau alimente un plancher, des radiateurs ou un ballon. Elle intéresse surtout les villas neuves de Bouskoura, où le sol peut encore recevoir un circuit. Elle se choisit avec la plomberie et le chauffage au sol. Ce n'est pas un split réversible.",
    },
    {
      title: "Entretien et dépannage",
      body: "Un dépannage part du symptôme : plus de froid, un écoulement, un groupe à l'arrêt, et de l'accès réel. L'entretien des filtres et des condensats est sur la page entretien climatisation Casablanca.",
    },
  ],
  comparisonIntro:
    "Un appartement, une villa déjà habitée et un chantier neuf n'ouvrent pas le même accès, ni le même moment pour passer les réseaux.",
  points: [
    {
      title: "Villas",
      body: "À Bouskoura, le jardin éloigne souvent le groupe des chambres. À Tamaris, le vent et le sel arrivent de face. À Anfa, la parcelle est plus serrée : le bruit vers le voisinage compte.",
    },
    {
      title: "Immeubles",
      body: "Californie et Anfa ajoutent le règlement et la façade. À Mohammedia, logements et locaux se suivent sous un air marin humide. On confirme le groupe et les condensats avant le percement.",
    },
    {
      title: "Constructions neuves",
      body: "Tant que les cloisons sont ouvertes, gaines, condensats et alimentations se réservent avec le chantier. Revenir après le staff pour un gainable ouvre des ouvrages déjà fermés.",
    },
  ],
  image: photo(
    "/services/pac-air-eau-1.webp",
    "Groupe de pompe à chaleur air-eau posé sur une toiture, avec les liaisons isolées au premier plan.",
    1200,
    1600
  ),
  processIntro:
    "L'ordre est stable : visite, étude, devis, installation, mise en service, maintenance. La façade et les condensats ouvrent la visite.",
  process: [
    "Voir l'étage, le syndic s'il y en a un, les condensats et l'exposition : Ain Diab, Anfa, Californie, Bouskoura, Tamaris ou Mohammedia.",
    "Choisir split, gainable, VRF ou PAC, puis rédiger le devis à partir du relevé : pièces traitées, emplacements, et ce qui reste hors du lot.",
    "Poser les liaisons, abriter le groupe si l'air est salin, raccorder les condensats et mettre en service en contrôlant le soufflage.",
    "Laisser filtres, trappes et groupe accessibles. Le lavage avant l'été est décrit sur la page entretien de Casablanca.",
  ],
  sections: [
    {
      heading: "Quartiers et alentours",
      items: [
        {
          title: "Anfa et Californie",
          body: "Immeubles et maisons serrées. Le syndic et la hauteur sous plafond tranchent entre split et gainable.",
        },
        {
          title: "Ain Diab",
          body: "Le sel de la corniche se dépose sur le groupe. L'abri et le lavage font partie de l'emplacement.",
        },
        {
          title: "Bouskoura",
          body: "Villas plus sèches, au sud-ouest. La poussière de jardin ou de chantier encrasse les filtres.",
        },
        {
          title: "Tamaris",
          body: "Villas côté Dar Bouazza, face au vent et à l'air marin. Le groupe doit rester accessible pour le lavage.",
        },
        {
          title: "Mohammedia",
          body: "Logements et locaux sur le littoral vers Rabat. L'air humide remplit les bacs de condensats.",
        },
      ],
      links: [
        link("/climatisation-bouskoura", "Climatisation à Bouskoura"),
        link("/climatisation-tamaris", "Climatisation à Tamaris"),
        link("/climatisation-mohammedia", "Climatisation à Mohammedia"),
      ],
    },
    {
      heading: "Pourquoi AEROVENTIS",
      paragraphs: [
        "AEROVENTIS travaille depuis 2017. La visite, l'étude et le devis précèdent la pose.",
      ],
    },
  ],
  faqs: [
    {
      question: "Split, gainable ou VRF à Casablanca ?",
      answer:
        "Le split équipe un appartement sans plénum, fréquent à Californie. Le gainable vise une villa de Bouskoura ou une maison d'Anfa quand le faux plafond existe. Le VRF limite les groupes d'un petit immeuble. La page gainable développe la hauteur.",
    },
    {
      question: "La pompe à chaleur remplace-t-elle un split ?",
      answer:
        "Non. La PAC chauffe de l'eau pour un plancher, des radiateurs ou un ballon. Le split, le gainable et le VRF traitent l'air des pièces. Une villa neuve peut avoir les deux. La page pompe à chaleur air-eau décrit le circuit d'eau.",
    },
    {
      question: "Que change l'air d'Ain Diab ?",
      answer:
        "Le sel et l'humidité attaquent l'échangeur et remplissent les bacs. Tamaris pose la même question d'abri. Bouskoura encrasse plutôt les filtres.",
    },
    {
      question: "Comment se passe un dépannage ?",
      answer:
        "On part du symptôme et de l'accès : absence de froid, bac qui déborde, groupe à l'arrêt. Ce n'est pas le lavage des filtres. Le syndic doit pouvoir laisser atteindre l'unité.",
    },
    {
      question: "Un prix d'installation est-il affiché ?",
      answer:
        "Non. Le montant dépend de l'étage, des liaisons et du système retenu. Un chiffre sans visite ne décrit pas le chantier. Le devis suit l'étude.",
    },
    {
      question: "Comment joindre AEROVENTIS sur WhatsApp ?",
      answer:
        "Le bouton WhatsApp de cette page ouvre la conversation au 06 60 98 96 98. Indiquez le quartier, le type de logement, et s'il s'agit d'une installation, d'un entretien ou d'un dépannage.",
    },
  ],
  links: [
    link("/climatisation-gainable-casablanca", "Gainable à Casablanca"),
    link("/entretien-climatisation-casablanca", "Entretien climatisation Casablanca"),
    link("/climatisation-bouskoura", "Climatisation à Bouskoura"),
    link("/climatisation-tamaris", "Climatisation à Tamaris"),
    link("/climatisation-mohammedia", "Climatisation à Mohammedia"),
    link("/climatisation-rabat", "Climatisation à Rabat"),
    link("/climatisation-marrakech", "Climatisation à Marrakech"),
    link("/plomberie-casablanca", "Plombier à Casablanca"),
    link("/blog/climatiseur-ne-refroidit-plus", "Climatiseur qui ne refroidit plus"),
    link("/blog/etude-cvc-bureaux-casablanca", "Étude CVC pour bureaux à Casablanca"),
    link("/blog/fuite-eau-maison-casablanca", "Fuite d'eau dans une maison à Casablanca"),
    link("/blog/climatisation-gainable-villa-bouskoura", "Gainable pour une villa à Bouskoura"),
    link("/blog/climatisation-mohammedia-appartement-villa", "Climatisation à Mohammedia : appartement ou villa"),
    link("/blog/climatisation-reversible-chauffage-hiver-tamaris", "Climatisation réversible à Tamaris"),
    ...sharedTradeLinks,
  ],
  parent: climParent,
});

const climRabat = cityPage({
  slug: "climatisation-rabat",
  serviceId: "climatisation",
  serviceType: "Climatisation",
  cityId: "rabat",
  areaServed: ["Rabat"],
  title: "Climatisation Rabat : villas et hiver",
  description:
    "Climatisation à Rabat : split, gainable, VRF et pompe à chaleur pour Souissi, Hay Riad et Agdal. Installation, entretien et dépannage après visite.",
  h1: "Climatisation à Rabat",
  headings: {
    services: "Split, gainable, VRF et chauffage d'eau",
    comparison: "Souissi, Hay Riad, Agdal",
    process: "De la visite à la maintenance",
    faq: "Questions sur la climatisation à Rabat",
  },
  lead: [
    "La climatisation à Rabat ne recopie pas celle de Casablanca. L'humidité atlantique est réelle, mais les hivers sont plus longs et plus mouillés : à Souissi et à Hay Riad, le séjour sert aussi en janvier. Agdal, plus dense et plus ancien, offre peu de façade et des cages étroites pour monter le matériel. Le sel d'Ain Diab n'y est pas le sujet principal.",
    "Une machine réversible peut tempérer une pièce. Elle ne dimensionne pas à elle seule le chauffage d'une villa mal isolée. Quand le projet est un plancher ou des radiateurs, on regarde une pompe à chaleur air-eau, pas un split de plus. L'air neuf des pièces humides est un autre réseau, décrit dans le guide ventilation pour villa à Rabat.",
  ],
  servicesIntro:
    "Le tissu de la ville change l'appareil et l'accès. On ne promet pas un gainable à Agdal parce qu'il est courant dans une villa de Souissi.",
  services: [
    {
      title: "Split et multi-split",
      body: "À Agdal, les hauteurs sont justes et les cours déjà encombrées. Le split ou le multi-split équipe le séjour et une chambre sans abaisser un couloir. Le groupe doit rester atteignable pour l'entretien, souvent depuis une terrasse étroite.",
    },
    {
      title: "Gainable",
      body: "À Souissi et à Hay Riad, un couloir ou des combles acceptent parfois l'unité et les gaines. En lotissement récent, le faux plafond se prévoit avec le plâtrier, avant la peinture. Le principe des gaines est sur la page climatisation gainable ; le quartier, lui, se juge ici.",
    },
    {
      title: "VRF",
      body: "Une grande villa de Souissi en plusieurs ailes, ou un plateau qui ne peut pas multiplier les groupes en terrasse, peut partager un circuit à débit variable. Inutile pour un appartement d'Agdal d'une ou deux pièces : le split y reste plus simple à poser et à dépanner.",
    },
    {
      title: "Pompe à chaleur (PAC)",
      body: "L'hiver humide donne un sens à la PAC air-eau : elle chauffe l'eau d'un plancher ou de radiateurs, surtout dans le neuf de Hay Riad où la dalle est encore ouverte. Elle ne rafraîchit pas le salon à la place d'un gainable. Les deux sujets se visitent ensemble, ils ne se confondent pas.",
    },
    {
      title: "Entretien et dépannage",
      body: "L'humidité marine encrasse un groupe en terrasse et remplit les bacs, même loin du jet d'embruns. Un dépannage à Rabat commence par le symptôme et par l'escalier : on ne promet pas un accès qu'une cage trop étroite interdit. Les filtres du quotidien restent à la charge de l'occupant entre deux visites.",
    },
  ],
  comparisonIntro:
    "Le chauffage des soirées d'hiver pèse dans le choix autant que la chaleur de juillet. Ce n'est pas le même arbitrage qu'à Marrakech.",
  points: [
    {
      title: "Villas",
      body: "Souissi étire parfois plusieurs ailes sur une même parcelle. Hay Riad aligne des maisons récentes où le groupe peut aller au fond du jardin plutôt que devant le salon. Le bruit vers la chambre voisine se juge sur place, les parcelles étant souvent proches.",
    },
    {
      title: "Immeubles",
      body: "Agdal concentre appartements et petits immeubles. Le règlement et la place en façade limitent les groupes. Monter une unité par une cage étroite fait partie de l'étude, pas d'un détail le jour de la pose.",
    },
    {
      title: "Constructions neuves",
      body: "À Hay Riad, les réservations de gaines, de condensats et, s'il est retenu, de plancher chauffant se décident pendant que le chantier est ouvert. Une maison déjà livrée se mesure avant qu'on parle d'un réseau caché.",
    },
  ],
  image: photo(
    "/services/pac-air-eau-5.webp",
    "Levage d'un groupe de pompe à chaleur vers une toiture.",
    1200,
    1600
  ),
  processIntro:
    "Visite, étude, devis, installation, mise en service, puis maintenance. À Rabat, la visite regarde la rue, le voisinage et les pièces vraiment occupées l'hiver.",
  process: [
    "Relever Souissi, Hay Riad ou Agdal : accès, terrasse, escalier, et pièces occupées quand il pleut.",
    "Décider si la réversibilité suffit au séjour, ou si une PAC et un plancher ont un sens. Le devis liste le système retenu et ce qu'il ne couvre pas.",
    "Poser en limitant le bruit vers les chambres, évacuer les condensats, puis mettre en service et contrôler les températures.",
    "Prévoir le contrôle des filtres et des bacs avant l'été. L'humidité du littoral bouche les évacuations plus vite qu'un air sec.",
  ],
  faqs: [
    {
      question: "Pourquoi parler de chauffage à Rabat ?",
      answer:
        "Les soirées d'hiver y sont humides, surtout dans les villas de Souissi. Une machine réversible tempère une pièce. Une PAC air-eau alimente un circuit d'eau quand le logement peut le recevoir. Ni l'une ni l'autre ne se choisit sans voir l'isolation.",
    },
    {
      question: "Agdal peut-il recevoir un gainable ?",
      answer:
        "Rarement sans gros travaux. Les hauteurs sont justes. Le split ou le multi-split est en général plus réaliste. Hay Riad et Souissi laissent plus souvent un plénum, encore faut-il le mesurer.",
    },
    {
      question: "Le VRF sert-il une villa de Souissi ?",
      answer:
        "Oui quand plusieurs ailes doivent partager peu de groupes, pour ne pas aligner des unités le long d'un mur vu de la rue. Pour deux pièces, le multi-split suffit et se dépanne pièce par pièce.",
    },
    {
      question: "Le sel de l'océan concerne-t-il Rabat ?",
      answer:
        "Moins que la corniche d'Ain Diab. L'humidité marine existe quand même : un groupe en terrasse non lavé s'encrasse. L'accès pour ce lavage fait partie du choix d'emplacement.",
    },
    {
      question: "La ventilation est-elle incluse ?",
      answer:
        "Non. Climatiser et renouveler l'air sont deux réseaux. Le guide ventilation et VMC pour villa à Rabat traite l'air neuf. L'extraction des pièces humides a sa page.",
    },
    {
      question: "Où écrire pour une visite à Rabat ?",
      answer:
        "Sur le bouton WhatsApp de cette page, au 06 60 98 96 98, ou via la page contact. Précisez Souissi, Hay Riad ou Agdal, et si la demande est une pose, un entretien ou un dépannage.",
    },
  ],
  links: [
    link("/climatisation-casablanca", "Climatisation à Casablanca"),
    link("/climatisation-marrakech", "Climatisation à Marrakech"),
    link("/climatisation-gainable", "Climatisation gainable"),
    link("/plomberie-rabat", "Plombier à Rabat"),
    link("/ventilation-rabat", "Ventilation à Rabat"),
    link("/blog/ventilation-vmc-villa-rabat", "VMC pour villa à Rabat"),
    link("/blog/frequence-entretien-clim", "Fréquence d'entretien"),
    link("/blog/maitrisez-votre-climat", "Maîtrisez votre climat"),
    ...sharedTradeLinks,
  ],
  parent: climParent,
});

const climMarrakech = cityPage({
  slug: "climatisation-marrakech",
  serviceId: "climatisation",
  serviceType: "Climatisation",
  cityId: "marrakech",
  areaServed: ["Marrakech"],
  title: "Climatisation Marrakech : chaleur sèche",
  description:
    "Climatisation à Marrakech : split, gainable, VRF et pompe à chaleur pour la Palmeraie, l'Hivernage et l'Ourika. Pose et entretien après visite.",
  h1: "Climatisation à Marrakech",
  headings: {
    services: "Palmeraie, Hivernage, Ourika",
    comparison: "Villas, résidences et chantiers neufs",
    process: "Visite aux heures chaudes",
    faq: "Questions sur la climatisation à Marrakech",
  },
  lead: [
    "La climatisation à Marrakech se calcule pour une chaleur sèche, pas pour le littoral. Les toitures-terrasses restent au soleil, les baies des villas de la Palmeraie sont larges, et la poussière revient avec le vent, surtout vers la route de l'Ourika. Une puissance copiée sur un appartement casablancais sous-dimensionne ces pièces.",
    "Hivernage mêle résidences où la façade compte. La Palmeraie étire les liaisons entre un groupe souvent loin de la maison et les pièces à traiter. Ce ne sont pas les mêmes mètres de cuivre, ni le même rythme de filtres. La PAC, ici, sert surtout les nuits fraîches : elle chauffe de l'eau, elle ne porte pas la charge de l'après-midi.",
  ],
  servicesIntro:
    "On dimensionne pour le soleil sur la toiture et pour la longueur réelle des liaisons. Le modèle de showroom ne dit pas où poser le groupe.",
  services: [
    {
      title: "Split et multi-split",
      body: "À Hivernage, beaucoup d'appartements n'ont pas de plénum : le split reste le chemin court pour une ou deux pièces. En villa, un multi-split limite les groupes visibles quand le plafond ne peut pas recevoir de gaine. Chaque unité murale a son entretien de filtre, plus fréquent dès que le vent charge la poussière.",
    },
    {
      title: "Gainable",
      body: "La Palmeraie l'autorise souvent, parce que les villas ont la hauteur. Un seul groupe peut alors rester à l'ombre d'un local ou d'un auvent, si le plénum a été prévu. Sans cette hauteur, on ne l'invente pas. Le guide gainable pour villa à Marrakech détaille la conception ; cette page dit où le quartier la rend réaliste.",
    },
    {
      title: "VRF",
      body: "Une grande propriété, ou une résidence qui doit limiter les groupes sur une terrasse déjà chargée, peut regrouper les unités intérieures sur un circuit à débit variable. Le VRF ne raccourcit pas une liaison trop longue : l'emplacement du groupe se choisit encore pour la distance et pour l'ombre.",
    },
    {
      title: "Pompe à chaleur (PAC)",
      body: "Les nuits fraîchissent, surtout vers l'Ourika. Une PAC air-eau peut alimenter un plancher dans une villa dont la dalle n'est pas fermée. Elle ne remplace pas le gainable qui porte la chaleur du jour. Les deux se coordonnent avec la plomberie, au moment où le sol est encore ouvert.",
    },
    {
      title: "Entretien et dépannage",
      body: "La poussière de l'Ourika n'attend pas la fin de l'été : les filtres se chargent plus vite qu'à Hivernage, à l'abri relatif des résidences. Un dépannage regarde d'abord un filtre colmaté, un groupe collé à un mur ouest, ou une liaison trop longue, avant de parler d'autre chose.",
    },
  ],
  comparisonIntro:
    "Le soleil, la poussière et la distance jusqu'au groupe comptent plus que l'humidité du littoral. Le type de client change ensuite le chantier.",
  points: [
    {
      title: "Villas",
      body: "À la Palmeraie, le jardin impose un tracé et parfois un groupe loin des chambres. Vers l'Ourika, le vent et la poussière demandent un groupe dégageable, pas enfermé contre un mur. Le hammam ou le plancher, s'ils sont au programme, se relèvent pendant la même visite.",
    },
    {
      title: "Immeubles",
      body: "Hivernage n'est pas un chantier de riad par défaut. Beaucoup de biens sont des appartements ou des villas récentes, avec une copropriété attentive à la façade. On vérifie l'accès et le règlement avant de choisir le nombre de groupes.",
    },
    {
      title: "Constructions neuves",
      body: "Tant que la toiture et les plafonds ne sont pas fermés, l'ombre du groupe, les gaines et les attentes d'eau se dessinent avec le gros œuvre. Une villa déjà habitée se traite avec la hauteur réelle, pas avec le plan d'origine.",
    },
  ],
  image: photo(
    "/services/traitement-d-air-6.webp",
    "Diffuseur carré au plafond, avec des tubes apparents en dessous.",
    1200,
    1600
  ),
  processIntro:
    "La visite se fait de préférence aux heures chaudes, pour voir quelles pièces décrochent. Ensuite : étude, devis, installation, mise en service, maintenance.",
  process: [
    "Noter l'orientation des baies, l'ombre réelle du groupe et la distance, à la Palmeraie, à Hivernage ou vers l'Ourika.",
    "Dimensionner pour la chaleur sèche. Le devis distingue l'air (split, gainable ou VRF) et, s'il y a lieu, la PAC et le plancher.",
    "Poser le groupe ventilé, pas en plein soleil contre un mur ouest, raccorder les condensats, puis mettre en service.",
    "Raccourcir l'intervalle de nettoyage des filtres là où la poussière circule. Un groupe inaccessible ne se lave pas.",
  ],
  faqs: [
    {
      question: "Pourquoi ne pas reprendre un calcul de Casablanca ?",
      answer:
        "La charge n'est pas la même. Grandes baies, toiture exposée et air sec à Marrakech demandent un relevé local. La page de Casablanca décrit l'humidité et les syndics du littoral.",
    },
    {
      question: "La Palmeraie impose-t-elle un gainable ?",
      answer:
        "Non. Elle l'autorise souvent grâce à la hauteur des villas. Si le plénum manque, un multi-split reste possible. Le guide gainable pour villa à Marrakech explique la conception du réseau.",
    },
    {
      question: "Où le VRF a-t-il un sens à Marrakech ?",
      answer:
        "Sur une grande propriété ou une résidence qui doit peu de groupes en terrasse. Il ne corrige pas un groupe posé au soleil, ni une liaison démesurée à travers un jardin.",
    },
    {
      question: "La route de l'Ourika use-t-elle les filtres ?",
      answer:
        "Oui. Le vent et la poussière les chargent plus vite qu'à Hivernage. Le groupe doit rester dégageable. L'emplacement fait partie de l'étude, pas d'un choix esthétique après coup.",
    },
    {
      question: "La PAC sert-elle l'après-midi ?",
      answer:
        "Non. L'après-midi se traite avec l'air : split, gainable ou VRF. La PAC chauffe de l'eau pour les nuits fraîches ou un plancher, quand le sol peut encore la recevoir.",
    },
    {
      question: "Comment décrire une villa de la Palmeraie ?",
      answer:
        "Par le bouton WhatsApp, au 06 60 98 96 98, ou par la page contact. Le quartier, le nombre de pièces et l'état du chantier (neuf ou déjà habité) suffisent à organiser la visite.",
    },
  ],
  links: [
    link("/climatisation-casablanca", "Climatisation à Casablanca"),
    link("/climatisation-rabat", "Climatisation à Rabat"),
    link("/climatisation-gainable", "Climatisation gainable"),
    link("/plomberie-marrakech", "Plombier à Marrakech"),
    link("/blog/climatisation-gainable-villa-marrakech", "Gainable pour villa à Marrakech"),
    link("/blog/clim-gainable-villa-maroc", "Clim gainable en villa"),
    link("/blog/frequence-entretien-clim", "Fréquence d'entretien"),
    link("/blog/maitrisez-votre-climat", "Maîtrisez votre climat"),
    ...sharedTradeLinks,
  ],
  parent: climParent,
});

const climMohammedia = cityPage({
  slug: "climatisation-mohammedia",
  serviceId: "climatisation",
  serviceType: "Climatisation",
  cityId: "mohammedia",
  areaServed: ["Mohammedia"],
  title: "Climatisation Mohammedia : air marin",
  description:
    "Climatisation à Mohammedia : split, gainable, VRF et pompe à chaleur pour logements et locaux du littoral. Installation, entretien et dépannage.",
  h1: "Climatisation à Mohammedia",
  headings: {
    services: "Logements et locaux d'activité",
    comparison: "Maisons, immeubles, locaux",
    process: "Visite sur un littoral court",
    faq: "Questions sur la climatisation à Mohammedia",
  },
  lead: [
    "La climatisation à Mohammedia se pose sur un littoral court, entre Casablanca et Rabat. L'air marin est humide. Les logements et les locaux d'activité se suivent, sans la densité de façade d'Anfa ni les longues liaisons d'une villa de la Palmeraie. Le groupe extérieur voit l'humidité ; les bacs de condensats aussi.",
    "Un appartement, une maison et un local professionnel n'appellent pas le même nombre d'unités. Le split couvre peu de pièces. Le gainable suppose un plafond. Le VRF regroupe beaucoup d'unités sur peu de groupes. La PAC, elle, ne climatise pas l'air : elle chauffe de l'eau quand le logement a un circuit à alimenter.",
  ],
  servicesIntro:
    "Mohammedia n'est pas un second texte de Casablanca. Le sel y existe, les immeubles y sont en général plus petits, et l'activité côtoie l'habitat.",
  services: [
    {
      title: "Split et multi-split",
      body: "Pour un appartement ou deux pièces d'une maison, le split évite d'ouvrir un plafond. Le groupe se place où l'air circule et où l'on pourra laver l'échangeur : l'humidité marine colle la poussière aux ailettes. Un multi-split reste lisible tant que les pièces sont peu nombreuses.",
    },
    {
      title: "Gainable",
      body: "Une maison dont le couloir peut s'abaisser reçoit un gainable : une unité intérieure, des gaines, un seul groupe à protéger de l'air marin. Si la hauteur manque, on le dit après la mesure. Le principe des bouches est sur la page gainable, pas à recopier quartier par quartier.",
    },
    {
      title: "VRF",
      body: "Un local d'activité ou un petit ensemble avec beaucoup de pièces et peu d'emplacements extérieurs peut justifier un VRF. Le circuit à débit variable ne sert pas une chambre seule. On le compare au multi-split dès que le nombre d'unités augmente et que la terrasse est comptée.",
    },
    {
      title: "Pompe à chaleur (PAC)",
      body: "Certaines maisons du littoral demandent aussi un chauffage d'eau, pour un plancher ou un ballon. La PAC se visite avec la plomberie. Elle ne règle pas l'humidité d'une pièce : ça, c'est le rôle de l'air traité par le split, le gainable ou le VRF.",
    },
    {
      title: "Entretien et dépannage",
      body: "Le dépannage le plus courant sur ce littoral part d'un bac qui déborde ou d'un groupe qui ne souffle plus assez. L'humidité remplit les condensats. Ce n'est pas le même rendez-vous qu'un lavage de filtres avant l'été, et ce n'est pas un désenfumage d'immeuble : ce réseau de sécurité a son propre sujet.",
    },
  ],
  comparisonIntro:
    "Sur un linéaire court, le type de bâtiment change plus que la distance entre deux quartiers. On distingue la maison, l'immeuble et le local.",
  points: [
    {
      title: "Villas et maisons",
      body: "Le groupe peut souvent quitter la façade pour un jardin ou une toiture accessible. C'est le cas favorable au gainable et, si le sol est ouvert, à un plancher chauffé par une PAC. Le bruit vers les chambres se vérifie, les parcelles n'étant pas isolées.",
    },
    {
      title: "Immeubles",
      body: "Les copropriétés sont en général plus petites qu'à Anfa, mais le règlement compte quand même. On confirme l'emplacement du groupe et le passage des condensats avant le percement. Le désenfumage d'un parking, s'il existe, n'est pas une climatisation.",
    },
    {
      title: "Locaux et constructions neuves",
      body: "Un local d'activité ajoute des horaires d'occupation et parfois plusieurs zones. En neuf, les fourreaux se prévoient avant les finitions, comme à Zenata tout près. Une livraison déjà peinte se traite avec les hauteurs restantes.",
    },
  ],
  image: photo(
    "/services/pac-air-eau-7.webp",
    "Groupe de pompe à chaleur air-eau sous film, sur palette, avant la pose.",
    1200,
    1600
  ),
  processIntro:
    "Même séquence qu'ailleurs : visite, étude, devis, installation, mise en service, maintenance. Le contenu, à Mohammedia, part de l'humidité et du type de local.",
  process: [
    "Voir si l'on est dans un logement ou un local d'activité, où poser le groupe, et comment l'eau des condensats sort.",
    "Choisir split, gainable, VRF ou PAC selon le nombre de pièces et la hauteur. Le devis sépare l'air, l'eau, et ce qui n'est pas dans le lot.",
    "Poser, raccorder, mettre en service et contrôler le soufflage ainsi que l'écoulement.",
    "Laisser l'échangeur accessible pour un lavage : l'air marin encrasse plus vite qu'un groupe abrité à l'intérieur des terres.",
  ],
  faqs: [
    {
      question: "Mohammedia se traite-t-elle comme Casablanca ?",
      answer:
        "Non. L'air marin est un point commun, pas le tissu. Ici, logements et locaux d'activité se suivent sur un court littoral. Anfa, Californie et Bouskoura sont décrits sur la page climatisation de Casablanca.",
    },
    {
      question: "Quel système pour un appartement ?",
      answer:
        "Le plus souvent un split ou un multi-split, faute de plénum. Le gainable ne se promet pas sans mesurer le plafond. Le VRF vise plutôt plusieurs locaux sur peu de groupes.",
    },
    {
      question: "Pourquoi les condensats reviennent-ils si souvent ?",
      answer:
        "L'air humide produit beaucoup d'eau. Un tuyau bouché ou une pente absente la renvoie à l'intérieur. Le dépannage commence par cet écoulement, pas par un changement d'appareil.",
    },
    {
      question: "Le désenfumage fait-il partie de la climatisation ?",
      answer:
        "Non. C'est un réseau de sécurité, pour les fumées d'un parking ou d'une circulation. Le guide désenfumage à Mohammedia le présente à part. L'extraction quotidienne a aussi sa page.",
    },
    {
      question: "Une PAC suffit-elle l'été ?",
      answer:
        "Non. Elle chauffe de l'eau. Le confort d'été passe par le split, le gainable ou le VRF. Les deux familles se coordonnent seulement quand le logement a aussi un besoin de chauffage d'eau.",
    },
    {
      question: "Comment demander la visite ?",
      answer:
        "Écrivez sur WhatsApp au 06 60 98 96 98 depuis le bouton de cette page. Dites si c'est un logement ou un local, et si vous partez d'une installation, d'un entretien ou d'une panne.",
    },
  ],
  links: [
    link("/climatisation-casablanca", "Climatisation à Casablanca"),
    link("/climatisation-rabat", "Climatisation à Rabat"),
    link("/plomberie-mohammedia", "Plomberie à Mohammedia"),
    link("/ventilation-mohammedia", "Ventilation à Mohammedia"),
    link("/desenfumage", "Désenfumage"),
    link("/blog/desenfumage-immeuble-parking-mohammedia", "Désenfumage à Mohammedia"),
    link("/blog/frequence-entretien-clim", "Fréquence d'entretien"),
    link("/blog/climatiseur-ne-refroidit-plus", "Climatiseur qui ne refroidit plus"),
    ...sharedTradeLinks,
  ],
  parent: climParent,
});

const plombCasablanca = cityPage({
  slug: "plomberie-casablanca",
  serviceId: "plomberie",
  serviceType: "Plomberie",
  cityId: "casablanca",
  areaServed: ["Casablanca"],
  title: "Plombier Casablanca : villas et immeubles",
  description:
    "Plombier à Casablanca : plomberie des villas, immeubles et constructions neuves, chauffage au sol et hammam beldi. Visite, devis et dépannage.",
  h1: "Plombier à Casablanca",
  headings: {
    services: "Plomberie, chauffage au sol, hammam",
    comparison: "Ce que le bâti casablancais change",
    process: "Visite, étude, devis, pose, suivi",
    faq: "Questions pour un plombier à Casablanca",
  },
  lead: [
    "Un plombier à Casablanca travaille d'abord sur l'état des colonnes, des attentes et des pièces d'eau. La plomberie d'un immeuble d'Anfa ou de Californie n'a pas les longueurs d'une villa de Bouskoura, ni la même liberté pour percer. Près de la corniche, l'humidité des pièces d'eau et les condensats d'une climatisation se rejettent dans un réseau qui doit vraiment les accepter.",
    "La plomberie premium, sur cette page, désigne ce périmètre : villas, immeubles et constructions neuves, avec le chauffage au sol et le hammam beldi quand la pièce et le sol peuvent les recevoir. Ce n'est pas un remplacement de robinet décrit à distance. L'installation, l'entretien des organes accessibles et le dépannage d'une fuite sont trois demandes distinctes.",
  ],
  servicesIntro:
    "Quatre familles reviennent. Le relevé dit si la colonne existante peut suivre, ou s'il faut un tracé neuf.",
  services: [
    {
      title: "Alimentation et évacuations",
      body: "Eau froide, eau chaude, pentes et diamètres se lisent sur place. En immeuble, la chute commune et le syndic comptent avant un nouveau tracé. En villa, les longueurs jusqu'aux salles d'eau et l'emplacement du compteur changent le parcours. On ne fige pas un plan sans avoir vu les attentes.",
    },
    {
      title: "Chauffage au sol",
      body: "À Bouskoura, le neuf laisse souvent poser les boucles avant la chape. Dans un appartement déjà carrelé d'Anfa, la réserve de hauteur manque en général. Le plancher se raccorde à une production de chaleur, souvent une pompe à chaleur air-eau, décrite sur sa page. Sans dalle ouverte, on le dit.",
    },
    {
      title: "Hammam beldi",
      body: "Le hammam demande une pièce dédiée, une arrivée, une évacuation et un chauffage. Il tient dans une villa qui a le volume, rarement dans un studio. Le cuivre et la vapeur se coordonnent avec la plomberie ; le carrelage décoratif n'est pas le sujet de cette page. Le détail technique est sur la page hammam beldi.",
    },
    {
      title: "Dépannage et entretien",
      body: "Une fuite, une évacuation bouchée ou un condensat de climatisation qui revient chez le voisin partent du symptôme et de l'accès à la colonne. Ce n'est pas une rénovation complète. L'entretien, lui, suppose des vannes et des trappes qu'on a laissées accessibles à la pose.",
    },
  ],
  comparisonIntro:
    "Casablanca oppose des immeubles anciens ou de standing, des villas du littoral et des lotissements neufs. Le plombier n'y ouvre pas les mêmes planchers.",
  points: [
    {
      title: "Villas",
      body: "Bouskoura et certaines maisons d'Anfa ou d'Ain Diab ajoutent plusieurs salles d'eau, parfois un hammam et un plancher. Le guide plomberie de villa, écrit pour Bouskoura, détaille le réseau. Ici, on ajoute la contrainte du littoral : rejet d'eau et humidité des pièces.",
    },
    {
      title: "Immeubles",
      body: "Anfa et Californie passent par la colonne et par le règlement. Un percement de façade ou une attente dans une gaine commune ne se décide pas depuis un plan d'architecte seul. L'accès du gardien fait partie du dépannage.",
    },
    {
      title: "Constructions neuves",
      body: "Les attentes se posent avant les cloisons et la chape. C'est le moment de caler la plomberie, le chauffage au sol et les évacuations de climatisation ensemble. Après les finitions, chaque oubli se paie en démolition.",
    },
  ],
  image: photo(
    "/services/chauffage-sol-8.webp",
    "Pose de plancher chauffant : boucles de tube sur une dalle, avant la chape.",
    1080,
    608
  ),
  processIntro:
    "Visite, étude, devis, installation, mise en service, maintenance. À Casablanca, la visite commence par les colonnes et par l'endroit où l'eau peut sortir.",
  process: [
    "Voir les arrivées, les chutes, les pièces d'eau et, s'il y a une climatisation, le trajet des condensats.",
    "Choisir diamètres et parcours. Le devis distingue le neuf, la reprise d'un existant, le plancher et le hammam, sans les empiler par défaut.",
    "Poser, mettre en eau, contrôler les écoulements et, pour un plancher, l'étanchéité avant la chape.",
    "Laisser vannes, collecteurs et trappes accessibles. Un organe caché derrière le carrelage ne s'entretient pas.",
  ],
  faqs: [
    {
      question: "Plombier ou plomberie : quelle page lire ?",
      answer:
        "Celle-ci. Elle répond aux deux recherches pour Casablanca. Le hub plomberie est le sommaire national. Les autres villes ont leur page, parce que les colonnes n'y sont pas les mêmes.",
    },
    {
      question: "Intervenez-vous dans les immeubles d'Anfa ?",
      answer:
        "Oui, après avoir vu la colonne, l'accès et ce que le règlement permet. Un tracé dessiné sans cette visite serait une hypothèse. Californie pose la même question de copropriété.",
    },
    {
      question: "Le chauffage au sol se pose-t-il partout ?",
      answer:
        "Non. Il lui faut une dalle ou une chape encore ouverte, cas fréquent en neuf à Bouskoura, rare dans un appartement déjà fini. La page chauffage au sol explique les boucles.",
    },
    {
      question: "Un hammam beldi tient-il dans un appartement ?",
      answer:
        "Seulement si une pièce peut recevoir l'eau, le chauffage et la vapeur sans gêner la copropriété. En pratique, on le regarde dans les villas. La page hammam beldi décrit l'installation technique.",
    },
    {
      question: "La climatisation se raccorde-t-elle au sanitaire ?",
      answer:
        "Ses condensats doivent partir vers une évacuation réelle. On le vérifie avec le réseau, surtout dans les immeubles où une fuite passe chez le voisin. La page climatisation à Casablanca traite l'air.",
    },
    {
      question: "Comment demander un devis ?",
      answer:
        "Écrivez sur WhatsApp au 06 60 98 96 98, le bouton est en bas de page. Indiquez Casablanca, le quartier, et s'il s'agit d'un neuf, d'une rénovation ou d'une fuite. Le devis suit la visite.",
    },
  ],
  links: [
    link("/climatisation-casablanca", "Climatisation à Casablanca"),
    link("/plomberie-rabat", "Plombier à Rabat"),
    link("/plomberie-marrakech", "Plombier à Marrakech"),
    link("/blog/guide-plomberie-villa", "Plomberie de villa à Bouskoura"),
    link("/blog/etude-cvc-villa-neuve-tamaris", "Étude CVC d'une villa neuve"),
    link("/ventilation-casablanca", "Ventilation à Casablanca"),
    ...sharedTradeLinks,
  ],
  parent: plumbParent,
});

const plombMarrakech = cityPage({
  slug: "plomberie-marrakech",
  serviceId: "plomberie",
  serviceType: "Plomberie",
  cityId: "marrakech",
  areaServed: ["Marrakech"],
  title: "Plombier Marrakech : Palmeraie et neuf",
  description:
    "Plombier à Marrakech : plomberie des villas, immeubles et constructions neuves, chauffage au sol et hammam beldi. Étude sur place avant la pose.",
  h1: "Plombier à Marrakech",
  headings: {
    services: "Réseaux longs, sol et hammam",
    comparison: "Palmeraie, Hivernage, Guéliz",
    process: "Avant que le sol se ferme",
    faq: "Questions pour un plombier à Marrakech",
  },
  lead: [
    "Un plombier à Marrakech dimensionne des longueurs, pas l'humidité du littoral. À la Palmeraie, une villa isole les salles d'eau les unes des autres et le jardin allonge les canalisations. À Hivernage et à Guéliz, on retrouve des immeubles, des colonnes partagées et des accès de copropriété. La poussière des chantiers ouverts bouche une évacuation laissée sans protection.",
    "La plomberie couvre l'alimentation, les évacuations et les pièces d'eau des villas, des immeubles et du neuf. Le chauffage au sol a un sens pour les nuits fraîches, surtout si la dalle n'est pas coulée. Le hammam beldi se juge dans une pièce prévue pour lui, fréquente dans les grandes villas, pas dans un local sans rejet. Le devis vient après avoir vu ces distances.",
  ],
  servicesIntro:
    "La chaleur sèche ne change pas les pentes. Elle change le chantier : soleil, poussière, et villas dont les pièces d'eau sont loin du compteur.",
  services: [
    {
      title: "Alimentation et évacuations",
      body: "En Palmeraie, le parcours traverse parfois un jardin avant d'atteindre une aile. Les diamètres et les regards se décident sur ce tracé, pas sur un schéma de maison de ville. À Guéliz, on ouvre d'abord la question de la colonne existante. Une attente bouchée par la poussière de chantier se constate, elle ne se devine pas.",
    },
    {
      title: "Chauffage au sol",
      body: "Les nuits peuvent fraîchir, vers l'Ourika plus encore qu'en ville. Les boucles se posent avant la chape, dans une construction neuve. Une villa déjà carrelée n'a pas toujours la réserve. La chaleur de l'après-midi, elle, reste un sujet de climatisation, pas de plancher.",
    },
    {
      title: "Hammam beldi",
      body: "Les villas de la Palmeraie ont souvent une pièce qui peut recevoir le chauffage, l'eau et la vapeur. On vérifie le volume, la pente et l'arrivée avant de confirmer. Un appartement d'Hivernage sans cette pièce ne devient pas un hammam par un appareil posé dans une salle de bain trop petite.",
    },
    {
      title: "Dépannage et entretien",
      body: "Fuite sur un linéaire long, évacuation chargée de poussière, condensats d'un gainable qui n'ont pas de rejet : le dépannage localise d'abord. L'entretien suppose des regards et des vannes qu'on n'a pas noyés dans le jardin ou sous le revêtement.",
    },
  ],
  comparisonIntro:
    "Palmeraie, Hivernage et Guéliz ne partagent ni les distances ni l'âge des colonnes. Le neuf ajoute le calendrier de la chape.",
  points: [
    {
      title: "Villas",
      body: "Plusieurs salles d'eau, un hammam possible, un plancher si le sol est ouvert, et des liaisons que le jardin allonge. La climatisation gainable de ces villas rejette aussi de l'eau : on prévoit l'évacuation en même temps, pas après les plantations.",
    },
    {
      title: "Immeubles",
      body: "Hivernage et Guéliz ramènent aux colonnes et aux copropriétés. L'accès à la gaine et l'accord pour une nouvelle attente se vérifient avant le devis. Une villa isolée n'a pas cette étape.",
    },
    {
      title: "Constructions neuves",
      body: "C'est le seul moment simple pour le chauffage au sol et pour les attentes du hammam. La poussière de chantier impose de protéger les évacuations ouvertes. Une fois la chape coulée, le réseau se juge à ce qui a été réservé.",
    },
  ],
  image: photo(
    "/services/hammam-beldi-9.webp",
    "Circuit de chauffage d'un hammam : cuivre au sol, sur la banquette et sur le mur.",
    543,
    960
  ),
  processIntro:
    "On visite avant de poser. L'étude et le devis précèdent l'installation, la mise en eau et la maintenance. À Marrakech, le sol et la poussière donnent le tempo.",
  process: [
    "Mesurer les distances entre compteur, pièces d'eau et rejets, et voir si le sol est encore ouvert.",
    "Tracer alimentation, évacuations, et le cas échéant plancher ou hammam. Le devis sépare ces lots.",
    "Poser, mettre en eau, protéger les attentes encore ouvertes de la poussière, et contrôler les pentes.",
    "Laisser regards, collecteurs et vannes accessibles, y compris dans un jardin qui va être planté.",
  ],
  faqs: [
    {
      question: "En quoi un plombier à Marrakech diffère-t-il du littoral ?",
      answer:
        "Les villas allongent les réseaux et la poussière menace les évacuations ouvertes. L'humidité marine et le sel ne sont pas le sujet. Casablanca a sa page pour les immeubles du littoral.",
    },
    {
      question: "La Palmeraie se traite-t-elle comme un appartement de Guéliz ?",
      answer:
        "Non. La Palmeraie ajoute le jardin et plusieurs pièces d'eau éloignées. Guéliz ajoute la colonne et la copropriété. Le relevé n'a pas le même point de départ.",
    },
    {
      question: "Le chauffage au sol sert-il en été ?",
      answer:
        "Non. Il répond aux nuits fraîches, pas à la chaleur du jour. Cette chaleur se traite en climatisation. Le plancher se décide seulement si la chape n'est pas faite.",
    },
    {
      question: "Où lire le hammam en détail ?",
      answer:
        "Sur la page hammam beldi, pour le chauffage, la vapeur et l'eau. Ici, on dit seulement dans quel type de villa marrakchie la pièce a une chance d'exister.",
    },
    {
      question: "Faut-il prévoir la climatisation en même temps ?",
      answer:
        "Pour les condensats, oui. Un gainable de villa produit de l'eau qui doit sortir. La page climatisation à Marrakech et le guide gainable décrivent l'air ; le rejet, lui, est de la plomberie.",
    },
    {
      question: "Comment organiser la visite ?",
      answer:
        "WhatsApp au 06 60 98 96 98, via le bouton de la page. Précisez Palmeraie, Hivernage, Guéliz ou un autre quartier, et si le sol est encore ouvert.",
    },
  ],
  links: [
    link("/climatisation-marrakech", "Climatisation à Marrakech"),
    link("/plomberie-casablanca", "Plombier à Casablanca"),
    link("/plomberie-rabat", "Plombier à Rabat"),
    link("/blog/climatisation-gainable-villa-marrakech", "Gainable pour villa à Marrakech"),
    link("/blog/guide-plomberie-villa", "Guide plomberie de villa"),
    link("/ventilation-marrakech", "Ventilation à Marrakech"),
    ...sharedTradeLinks,
  ],
  parent: plumbParent,
});

const plombRabat = cityPage({
  slug: "plomberie-rabat",
  serviceId: "plomberie",
  serviceType: "Plomberie",
  cityId: "rabat",
  areaServed: ["Rabat"],
  title: "Plombier Rabat : Souissi et Agdal",
  description:
    "Plombier à Rabat : plomberie des villas, immeubles et constructions neuves, chauffage au sol et hammam beldi. Visite, devis et dépannage sur place.",
  h1: "Plombier à Rabat",
  headings: {
    services: "Colonnes, plancher et hammam",
    comparison: "Agdal, Souissi et Hay Riad",
    process: "Voir la colonne avant le devis",
    faq: "Questions pour un plombier à Rabat",
  },
  lead: [
    "Un plombier à Rabat rencontre deux villes dans la même commune. Agdal : appartements plus anciens, colonnes étroites, pièces d'eau déjà carrelées. Souissi et Hay Riad : villas et maisons récentes, plusieurs salles de bain, parfois un sol encore ouvert pour un chauffage. L'humidité océanique concerne surtout l'air des pièces d'eau, qui se ventile par un autre réseau que la plomberie.",
    "La demande porte sur l'alimentation, les évacuations, le neuf comme la rénovation. Le chauffage au sol se discute parce que l'hiver est humide, à condition que la chape ne soit pas coulée. Le hammam beldi se regarde dans les villas qui ont une pièce à lui, pas dans un appartement d'Agdal sans volume. Le devis liste ce qui a été vu, pas un forfait de ville.",
  ],
  servicesIntro:
    "On sépare la reprise d'une colonne ancienne, le réseau d'une villa, et les lots qui ne se posent qu'avant la chape.",
  services: [
    {
      title: "Alimentation et évacuations",
      body: "À Agdal, le travail commence par la chute existante et par ce que la copropriété laisse modifier. À Souissi, les longueurs entre les salles d'eau d'une grande maison comptent davantage que la colonne. Les pentes se mesurent. Une évacuation trop haute ne se rattrape pas sur un plan.",
    },
    {
      title: "Chauffage au sol",
      body: "Hay Riad et les constructions de Souissi sont le cas utile : la dalle peut encore prendre les boucles, et l'hiver humide donne une raison de chauffer par le sol. Agdal, déjà revêtu, offre rarement cette réserve. La production de chaleur est souvent une PAC air-eau, à confirmer sur sa page.",
    },
    {
      title: "Hammam beldi",
      body: "Une villa de Souissi peut avoir le volume. On vérifie l'arrivée, le rejet et le chauffage avant d'aller plus loin. L'extraction de l'air très humide n'est pas de la plomberie : elle se coordonne avec la page extraction, et avec le guide VMC pour les villas de Rabat.",
    },
    {
      title: "Dépannage et entretien",
      body: "Une fuite en appartement passe souvent par la colonne et par le voisin du dessous. Le dépannage identifie ce circuit avant d'ouvrir. Dans une villa, il suit un linéaire plus long. L'entretien n'existe que si les vannes sont restées visitables après la pose.",
    },
  ],
  comparisonIntro:
    "Agdal se rénove. Souissi et Hay Riad se construisent ou s'agrandissent. Le plombier n'apporte pas le même outillage ni le même calendrier.",
  points: [
    {
      title: "Villas",
      body: "Plusieurs pièces d'eau, un jardin, parfois un hammam et un plancher. Le bruit et l'emplacement d'une PAC extérieure se jugent avec la climatisation, parce que le groupe et les réseaux d'eau arrivent sur la même parcelle.",
    },
    {
      title: "Immeubles",
      body: "Agdal concentre les colonnes communes et les accès limités. On ne promet pas une nouvelle salle d'eau sans avoir vu la chute. Le syndic fait partie de la visite, comme pour une unité de climatisation en façade.",
    },
    {
      title: "Constructions neuves",
      body: "Hay Riad permet de réserver la plomberie, le plancher et les attentes de climatisation avant les finitions. C'est aussi le moment de laisser des trappes. Une maison livrée se traite en rénovation, avec les hauteurs restantes.",
    },
  ],
  image: photo(
    "/services/hammam-beldi-3.webp",
    "Réseau de cuivre d'un hammam, posé sur les banquettes, le sol et les murs.",
    960,
    720
  ),
  processIntro:
    "La séquence reste visite, étude, devis, installation, mise en service et maintenance. À Rabat, on ne rédige pas le devis avant d'avoir distingué Agdal d'une villa neuve.",
  process: [
    "Identifier le quartier, l'âge des colonnes, le nombre de pièces d'eau et l'état du sol.",
    "Étudier parcours et diamètres. Le devis sépare la reprise, le neuf, le plancher et le hammam.",
    "Poser, mettre en eau, contrôler les écoulements et l'étanchéité d'un plancher avant la chape.",
    "Laisser les organes accessibles. Coordonner l'extraction des pièces humides : ce n'est pas un tuyau d'eau.",
  ],
  faqs: [
    {
      question: "Agdal et Souissi se traitent-ils ensemble ?",
      answer:
        "Non. Agdal, ce sont surtout des colonnes et des rénovations. Souissi et Hay Riad, ce sont des villas, parfois un sol ouvert, parfois un hammam. La visite commence par cette distinction.",
    },
    {
      question: "Le chauffage au sol est-il systématique à Rabat ?",
      answer:
        "Non. L'hiver humide le rend utile quand la chape n'est pas faite. Dans un appartement déjà carrelé, la hauteur manque souvent. La page chauffage au sol dit comment les boucles se posent.",
    },
    {
      question: "Qui s'occupe de l'air des salles d'eau ?",
      answer:
        "L'extraction et la VMC, pas le tuyau d'évacuation. Le guide ventilation pour villa à Rabat et la page extraction décrivent l'air. La plomberie assure l'eau.",
    },
    {
      question: "Une fuite chez le voisin est-elle une rénovation ?",
      answer:
        "Pas forcément. Le dépannage cherche la colonne ou le raccord en cause. Une reprise complète ne se décide qu'une fois le circuit vu, et avec l'accès à l'immeuble.",
    },
    {
      question: "Faut-il lier la climatisation ?",
      answer:
        "Oui pour les condensats, qui doivent rejoindre une évacuation réelle. La page climatisation à Rabat décrit les appareils. Le rejet d'eau se note pendant la visite plomberie.",
    },
    {
      question: "Quel numéro WhatsApp utiliser ?",
      answer:
        "Le 06 60 98 96 98, via le bouton de cette page. C'est le seul numéro du site. Indiquez Agdal, Souissi ou Hay Riad, et si le sol est encore ouvert.",
    },
  ],
  links: [
    link("/climatisation-rabat", "Climatisation à Rabat"),
    link("/plomberie-casablanca", "Plombier à Casablanca"),
    link("/plomberie-marrakech", "Plombier à Marrakech"),
    link("/ventilation-rabat", "Ventilation à Rabat"),
    link("/blog/ventilation-vmc-villa-rabat", "VMC pour villa à Rabat"),
    link("/blog/guide-plomberie-villa", "Guide plomberie de villa"),
    link("/blog/etude-cvc-villa-neuve-tamaris", "Étude d'une villa neuve"),
    ...sharedTradeLinks,
  ],
  parent: plumbParent,
});

export const citySeoPages: readonly LandingPage[] = [
  climCasablanca,
  climRabat,
  climMarrakech,
  climMohammedia,
  plombCasablanca,
  plombMarrakech,
  plombRabat,
];

function visibleCopy(page: LandingPage): string {
  return [
    page.h1,
    ...page.lead,
    page.servicesIntro,
    ...page.services.flatMap((item) => [item.title, item.body]),
    page.comparisonIntro,
    ...(page.points ?? []).flatMap((item) => [item.title, item.body]),
    page.processIntro,
    ...page.process,
    ...(page.sections ?? []).flatMap((section) => [
      section.heading,
      section.intro ?? "",
      ...(section.paragraphs ?? []),
      ...(section.items ?? []).flatMap((item) => [item.title, item.body]),
    ]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const problems: string[] = [];
const seenSentences = new Map<string, string>();

for (const page of citySeoPages) {
  const copy = visibleCopy(page);
  const count = wordCount(copy);
  if (count < 600 || count > 900) {
    problems.push(`${page.slug}: ${count} words (need 600-900)`);
  }
  if (/\bVRV\b/i.test(copy) || /\bVRV\b/i.test(page.description) || /\bVRV\b/i.test(page.title)) {
    problems.push(`${page.slug}: contains VRV`);
  }
  if (/illustration/i.test(copy) || (page.image && /illustration/i.test(page.image.alt + page.image.caption))) {
    problems.push(`${page.slug}: contains an Illustration label`);
  }
  for (const sentence of copy.split(/(?<=[.!?])\s+/)) {
    const trimmed = sentence.trim();
    if (trimmed.length < 90) continue;
    const previous = seenSentences.get(trimmed);
    if (previous && previous !== page.slug) {
      problems.push(`${page.slug}: repeats a sentence from ${previous}`);
    } else {
      seenSentences.set(trimmed, page.slug);
    }
  }
}

if (problems.length > 0) {
  throw new Error(`City SEO pages\n${problems.join("\n")}`);
}
