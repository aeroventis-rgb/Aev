import { SERVICE_AREA_NAMES } from "@/lib/areas";
import { BRAND_SLIDES } from "@/lib/brand-slides";
import { HOME_ILLUSTRATIONS } from "@/lib/constants";
import type { LandingLink, LandingPage, LandingTranslation } from "@/lib/landings/types";

const homeFr = { name: "Accueil", pathname: "/" } as const;
const servicesFr = { name: "Nos services", pathname: "/nos-services" } as const;
const homeEn = { name: "Home", pathname: "/" } as const;
const homeAr = { name: "الرئيسية", pathname: "/" } as const;

function link(path: `/${string}`, label: string): LandingLink {
  return { href: path, label };
}

function visual(src: string, subject: string): NonNullable<LandingPage["image"]> {
  return {
    src,
    alt: `Visuel de présentation AEROVENTIS — ${subject}. Visuel de marque, et non la photo d'un chantier identifié.`,
    caption: `Présentation AEROVENTIS : ${subject}. Visuel de marque, pas une photo de chantier identifié.`,
  };
}

function visualEn(subject: string): NonNullable<LandingTranslation["image"]> {
  return {
    alt: `AEROVENTIS presentation visual — ${subject}. A brand visual, not a photo of an identified job site.`,
    caption: `AEROVENTIS presentation: ${subject}. A brand visual, not a photo of an identified job site.`,
  };
}

function visualAr(subject: string): NonNullable<LandingTranslation["image"]> {
  return {
    alt: `عرض AEROVENTIS — ${subject}. صورة للعلامة، وليست صورة ورش محدد.`,
    caption: `عرض AEROVENTIS: ${subject}. صورة للعلامة، وليست صورة ورش محدد.`,
  };
}

const frSiblings = {
  pac: link("/pompe-a-chaleur-air-eau", "Pompe à chaleur air-eau"),
  floor: link("/chauffage-au-sol", "Chauffage au sol"),
  hammam: link("/hammam-beldi", "Hammam beldi"),
  air: link("/traitement-air", "Traitement d'air"),
  plumbing: link("/plomberie", "Plomberie"),
  climate: link("/climatisation", "Climatisation"),
  ventilation: link("/ventilation", "Ventilation"),
  extraction: link("/extraction", "Extraction d'air"),
  smoke: link("/desenfumage", "Désenfumage"),
  services: link("/nos-services", "Nos services"),
  zone: link("/zone-intervention", "Zone d'intervention"),
  contact: link("/contact", "Contact"),
};

const enSiblings = {
  pac: link("/pompe-a-chaleur-air-eau", "Air-to-water heat pump"),
  floor: link("/chauffage-au-sol", "Underfloor heating"),
  hammam: link("/hammam-beldi", "Beldi hammam"),
  air: link("/traitement-air", "Air handling"),
  contact: link("/contact", "Contact"),
  blog: link("/blog", "Journal"),
};

const arSiblings = {
  pac: link("/pompe-a-chaleur-air-eau", "مضخة حرارية هواء-ماء"),
  floor: link("/chauffage-au-sol", "تدفئة أرضية"),
  hammam: link("/hammam-beldi", "حمام بلدي"),
  air: link("/traitement-air", "معالجة الهواء"),
  contact: link("/contact", "اتصل بنا"),
  blog: link("/blog", "المدونة"),
};

const pac: LandingPage = {
  slug: "pompe-a-chaleur-air-eau",
  locales: ["fr", "en", "ar"],
  serviceId: "pompe-a-chaleur",
  serviceType: "Pompe à chaleur air-eau",
  areaServed: SERVICE_AREA_NAMES,
  title: "Pompe à chaleur air-eau",
  description:
    "Pompe à chaleur air-eau pour villas et immeubles : le groupe chauffe un circuit d'eau, de Casablanca à Marrakech. L'appareil se choisit après la visite.",
  h1: "Pompe à chaleur air-eau",
  lead: [
    "Une pompe à chaleur air-eau prend des calories dans l'air extérieur et les transmet à un circuit d'eau. Cette eau peut alimenter un plancher chauffant, des radiateurs ou un ballon. Ce n'est pas un split : l'air des pièces n'est pas soufflé par l'appareil.",
    "AEROVENTIS l'étudie pour des villas, des immeubles et des projets neufs à Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat et Marrakech. L'hiver du littoral et les nuits de Marrakech ne demandent pas le même régime. Le groupe, le circuit et les émetteurs se choisissent après la visite.",
  ],
  servicesIntro: "Trois éléments reviennent. La visite dit comment ils se raccordent.",
  services: [
    {
      title: "Circuit d'eau",
      body: "L'eau chaude part vers le plancher, des radiateurs ou les deux, selon ce que le logement peut recevoir.",
    },
    {
      title: "Groupe extérieur",
      body: "Il a besoin d'air, d'un support stable et d'un emplacement qui limite le bruit vers les chambres et le voisinage.",
    },
    {
      title: "Eau chaude sanitaire",
      body: "Un ballon peut s'y raccorder si le projet le demande. On le confirme avec la plomberie, sur place.",
    },
  ],
  comparisonIntro: "Ce qui se tranche avant de choisir un modèle.",
  showHvacComparison: false,
  points: [
    {
      title: "Émetteurs",
      body: "Plancher, radiateurs ou un réseau déjà en place. On ne promet pas de tout remplacer sans avoir vu les tuyaux.",
    },
    {
      title: "Emplacement",
      body: "Le groupe se pose où l'air circule, avec un accès pour l'entretien. Une courette fermée ne convient pas toujours.",
    },
    {
      title: "Climat",
      body: "Le littoral reste doux et humide. Marrakech a des nuits plus fraîches et de la poussière. Le relevé en tient compte.",
    },
  ],
  image: visual(BRAND_SLIDES.exterieur, "unités extérieures, pour situer une pompe à chaleur air-eau"),
  processIntro: "L'ordre est le même d'une ville à l'autre. Le contenu de la visite change.",
  process: [
    "Voir le logement, les émetteurs possibles et la place du groupe extérieur.",
    "Choisir la pompe et le circuit d'eau à partir de ce relevé, pas d'un ratio au mètre carré.",
    "Poser, raccorder l'eau et mettre en service en contrôlant les températures.",
    "Laisser filtres, vannes et groupe accessibles pour le suivi.",
  ],
  faqs: [
    {
      question: "Est-ce une climatisation ?",
      answer:
        "Non. Le split ou le gainable traitent l'air d'une pièce. La pompe à chaleur air-eau chauffe de l'eau. Les deux peuvent coexister. Ils ne se remplacent pas.",
    },
    {
      question: "Faut-il un chauffage au sol ?",
      answer:
        "Non. Le plancher est un émetteur parmi d'autres. Des radiateurs à eau peuvent convenir si le réseau existe ou peut être créé. La page chauffage au sol décrit le plancher.",
    },
    {
      question: "Produit-elle l'eau chaude sanitaire ?",
      answer:
        "Elle peut alimenter un ballon, si le projet et la place le permettent. Ce n'est pas automatique. On le décide avec la plomberie.",
    },
    {
      question: "Où se pose le groupe ?",
      answer:
        "Dehors, là où l'air passe et où l'entretien reste possible : toiture, terrasse ou jardin, selon le règlement de l'immeuble et le bruit.",
    },
    {
      question: "Dans quels secteurs ?",
      answer:
        "Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat et Marrakech. Pour un autre secteur, la page contact permet de décrire le projet.",
    },
    {
      question: "Comment demander une visite ?",
      answer:
        "Indiquez la ville, le type de logement et s'il s'agit de neuf ou de rénovation. Un technicien convient d'un passage pour voir les lieux. Vous pouvez aussi écrire sur WhatsApp.",
    },
  ],
  links: [
    frSiblings.floor,
    frSiblings.plumbing,
    frSiblings.climate,
    frSiblings.air,
    frSiblings.services,
    frSiblings.zone,
    frSiblings.contact,
  ],
  breadcrumbs: [homeFr, servicesFr, { name: "Pompe à chaleur air-eau" }],
  translations: {
    en: {
      title: "Air-to-water heat pump",
      description:
        "Air-to-water heat pump for villas and buildings: the outdoor unit heats a water circuit, from Casablanca to Marrakech. The machine is chosen after a visit.",
      serviceType: "Air-to-water heat pump",
      h1: "Air-to-water heat pump",
      lead: [
        "An air-to-water heat pump takes heat from the outdoor air and moves it into a water circuit. That water can feed underfloor heating, radiators or a hot-water tank. It is not a split: the unit does not blow air into the rooms.",
        "AEROVENTIS studies it for villas, buildings and new builds in Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat and Marrakech. A mild, humid coastal winter and cooler Marrakech nights are not the same job. The unit, the circuit and the emitters are chosen after the visit.",
      ],
      servicesIntro: "Three parts come up on every visit. The site decides how they connect.",
      services: [
        {
          title: "Water circuit",
          body: "Hot water goes to the floor, to radiators, or to both, depending on what the home can take.",
        },
        {
          title: "Outdoor unit",
          body: "It needs airflow, a stable base and a place that limits noise toward bedrooms and neighbours.",
        },
        {
          title: "Domestic hot water",
          body: "A tank can be connected when the project calls for it. That is confirmed on site, with the plumbing.",
        },
      ],
      comparisonIntro: "What is settled before a model is chosen.",
      points: [
        {
          title: "Emitters",
          body: "Underfloor heating, radiators, or a circuit that is already there. Pipes are seen before anyone promises to replace them.",
        },
        {
          title: "Placement",
          body: "The unit goes where air can move and maintenance stays possible. A closed light well is not always suitable.",
        },
        {
          title: "Climate",
          body: "The coast stays mild and humid. Marrakech has cooler nights and dust. The survey takes that into account.",
        },
      ],
      image: visualEn("outdoor units, to place an air-to-water heat pump"),
      processIntro: "The order is the same from one city to the next. What the visit looks at changes.",
      process: [
        "See the home, the possible emitters and the space for the outdoor unit.",
        "Choose the heat pump and the water circuit from that survey, not from a ratio per square metre.",
        "Install, connect the water and commission while checking temperatures.",
        "Leave filters, valves and the outdoor unit reachable for later checks.",
      ],
      faqs: [
        {
          question: "Is this air conditioning?",
          answer:
            "No. A split or a ducted system treats the air in a room. An air-to-water heat pump heats water. Both can be in the same home. One does not replace the other.",
        },
        {
          question: "Does it require underfloor heating?",
          answer:
            "No. The floor is one emitter among others. Water radiators can suit when the network exists or can be built. The underfloor heating page describes the floor circuit.",
        },
        {
          question: "Does it produce domestic hot water?",
          answer:
            "It can feed a tank when the project and the space allow it. That is not automatic. It is decided with the plumbing.",
        },
        {
          question: "Where does the outdoor unit go?",
          answer:
            "Outside, where air can pass and maintenance stays possible: a roof, a terrace or a garden, depending on the building rules and the noise.",
        },
        {
          question: "Which areas are covered?",
          answer:
            "Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat and Marrakech. For another area, the contact page is where the project can be described.",
        },
        {
          question: "How do I ask for a visit?",
          answer:
            "Give the city, the type of home and whether it is a new build or a renovation. A technician arranges a visit to see the place. You can also write on WhatsApp.",
        },
      ],
      links: [enSiblings.floor, enSiblings.air, enSiblings.hammam, enSiblings.contact, enSiblings.blog],
      breadcrumbs: [homeEn, { name: "Air-to-water heat pump" }],
    },
    ar: {
      title: "مضخة حرارية هواء-ماء",
      description:
        "مضخة حرارية هواء-ماء للفيلات والمباني: تسخّن الوحدة الخارجية دائرة ماء، من الدار البيضاء إلى مراكش. يُختار الجهاز بعد معاينة المسكن، لا من مساحة تقريبية.",
      serviceType: "مضخة حرارية هواء-ماء",
      h1: "مضخة حرارية هواء-ماء",
      lead: [
        "تأخذ المضخة الحرارية هواء-ماء الحرارة من الهواء الخارجي وتنقلها إلى دائرة ماء. يمكن أن يغذي هذا الماء تدفئة أرضية أو مشعات أو خزاناً. ليست سبليت: الجهاز لا يدفع الهواء داخل الغرف.",
        "تدرسها AEROVENTIS للفيلات والمباني والمشاريع الجديدة في الدار البيضاء والمحمدية وبوسكورة وتماريس وزناتة والرباط ومراكش. شتاء الساحل المعتدل الرطب وليالي مراكش الأبرد ليسا العمل نفسه. تُختار الوحدة ودائرة الماء وما يوزع الحرارة بعد الزيارة.",
      ],
      servicesIntro: "ثلاثة عناصر تتكرر. الزيارة هي التي تحدد كيف تتصل.",
      services: [
        {
          title: "دائرة الماء",
          body: "يذهب الماء الساخن إلى الأرضية أو إلى المشعات أو إلى الاثنين، حسب ما يحتمله المسكن.",
        },
        {
          title: "الوحدة الخارجية",
          body: "تحتاج إلى هواء وقاعدة ثابتة ومكان يحد من الضجيج نحو غرف النوم والجوار.",
        },
        {
          title: "الماء الساخن الصحي",
          body: "يمكن وصل خزان إذا طلب المشروع ذلك. يُؤكد الأمر في المكان مع السباكة.",
        },
      ],
      comparisonIntro: "ما يُحسم قبل اختيار طراز.",
      points: [
        {
          title: "ما يوزع الحرارة",
          body: "أرضية أو مشعات أو شبكة موجودة. لا يُوعد باستبدال كل الأنابيب قبل رؤيتها.",
        },
        {
          title: "الموضع",
          body: "توضع الوحدة حيث يتحرك الهواء ويبقى الوصول للصيانة ممكناً. فناء مغلق لا يناسب دائماً.",
        },
        {
          title: "المناخ",
          body: "يبقى الساحل لطيفاً ورطباً. في مراكش ليالٍ أبرد وغبار. المعاينة تأخذ ذلك في الحسبان.",
        },
      ],
      image: visualAr("وحدات خارجية لتصور مضخة حرارية هواء-ماء"),
      processIntro: "الترتيب واحد من مدينة إلى أخرى. ما تراه الزيارة هو الذي يتغير.",
      process: [
        "رؤية المسكن ووسائل التدفئة الممكنة ومكان الوحدة الخارجية.",
        "اختيار المضخة ودائرة الماء من هذه المعاينة، لا من نسبة بالمتر المربع.",
        "التركيب ووصل الماء ثم التشغيل مع مراقبة درجات الحرارة.",
        "ترك الفلاتر والصمامات والوحدة في متناول المتابعة.",
      ],
      faqs: [
        {
          question: "هل هذه تكييف؟",
          answer:
            "لا. السبليت أو النظام بالقنوات يعالج هواء الغرفة. المضخة الحرارية هواء-ماء تسخّن الماء. يمكن أن يجتمعا في المسكن نفسه. أحدهما لا يحل محل الآخر.",
        },
        {
          question: "هل تلزم تدفئة أرضية؟",
          answer:
            "لا. الأرضية وسيلة بين وسائل أخرى. المشعات المائية تناسب إذا كانت الشبكة موجودة أو يمكن إنشاؤها. صفحة التدفئة الأرضية تصف دائرة الأرض.",
        },
        {
          question: "هل تنتج الماء الساخن الصحي؟",
          answer: "يمكنها تغذية خزان إذا سمح المشروع والمكان. هذا ليس تلقائياً. يُقرر مع السباكة.",
        },
        {
          question: "أين توضع الوحدة الخارجية؟",
          answer:
            "في الخارج، حيث يمر الهواء وتبقى الصيانة ممكنة: سطح أو تراس أو حديقة، حسب قواعد البناية والضجيج.",
        },
        {
          question: "ما المناطق المشمولة؟",
          answer:
            "الدار البيضاء والمحمدية وبوسكورة وتماريس وزناتة والرباط ومراكش. لمنطقة أخرى، صفحة الاتصال هي مكان وصف المشروع.",
        },
        {
          question: "كيف أطلب زيارة؟",
          answer:
            "اذكروا المدينة ونوع المسكن وهل هو بناء جديد أو تجديد. يتفق تقني على مرور لرؤية المكان. يمكن أيضاً الكتابة على واتساب.",
        },
      ],
      links: [arSiblings.floor, arSiblings.air, arSiblings.hammam, arSiblings.contact, arSiblings.blog],
      breadcrumbs: [homeAr, { name: "مضخة حرارية هواء-ماء" }],
    },
  },
};

const floor: LandingPage = {
  slug: "chauffage-au-sol",
  locales: ["fr", "en", "ar"],
  serviceId: "chauffage-au-sol",
  serviceType: "Chauffage au sol",
  areaServed: SERVICE_AREA_NAMES,
  title: "Chauffage au sol",
  description:
    "Chauffage au sol à eau pour villas et projets neufs : boucles, collecteurs et source de chaleur, à Casablanca, Rabat et Marrakech. La dalle se vérifie avant.",
  h1: "Chauffage au sol",
  lead: [
    "Le chauffage au sol décrit ici diffuse la chaleur par un circuit d'eau chaude posé dans la dalle ou la chape. Il se prévoit en neuf, ou en rénovation quand l'épaisseur du sol peut encore changer. Sans cette hauteur, il ne se promet pas.",
    "AEROVENTIS le relie à la production de chaleur, souvent une pompe à chaleur air-eau, et à la plomberie. Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris et Zenata n'ont pas la même saison de chauffe ni les mêmes planchers. La visite tranche.",
  ],
  servicesIntro: "Trois ouvrages. Chacun se dessine avant de couler.",
  services: [
    {
      title: "Boucles",
      body: "Des tubes dans le sol, répartis pièce par pièce, avec un pas adapté au relevé.",
    },
    {
      title: "Collecteurs",
      body: "Ils séparent les pièces. On les place dans un placard ou un local qui reste accessible.",
    },
    {
      title: "Source de chaleur",
      body: "La pompe à chaleur, ou une autre production déjà prévue, alimente le circuit. Elle se choisit à part.",
    },
  ],
  comparisonIntro: "Ce qui se vérifie avant de figer le sol.",
  showHvacComparison: false,
  points: [
    {
      title: "Neuf",
      body: "Les boucles se posent avant la chape. Y revenir après les revêtements ouvre le sol.",
    },
    {
      title: "Rénovation",
      body: "On mesure la réserve de hauteur, l'isolant et le revêtement prévu. Si la marge manque, un autre émetteur est plus honnête.",
    },
    {
      title: "Répartition",
      body: "Une salle d'eau et un séjour n'ont pas le même besoin. Les boucles se séparent plutôt que de tout régler d'un seul geste.",
    },
  ],
  image: visual(HOME_ILLUSTRATIONS.plumbing, "canalisations d'eau, pour situer un chauffage au sol"),
  processIntro: "Le sol se ferme vite. L'ordre des corps d'état compte autant que le tracé.",
  process: [
    "Voir la structure du sol, les pièces à chauffer et l'endroit des collecteurs.",
    "Dessiner les boucles et la liaison avec la production de chaleur.",
    "Poser avant la chape, mettre en eau et contrôler l'étanchéité.",
    "Laisser les collecteurs accessibles pour un réglage ou un contrôle ultérieur.",
  ],
  faqs: [
    {
      question: "De quoi est fait ce chauffage au sol ?",
      answer:
        "D'un circuit d'eau chaude dans la dalle ou la chape, raccordé à une production de chaleur. La page décrit ce réseau d'eau, pas un autre procédé.",
    },
    {
      question: "Faut-il une pompe à chaleur air-eau ?",
      answer:
        "Souvent elle alimente le plancher. Une autre production peut déjà exister. On ne la suppose pas : on la voit, ou on la prévoit avec la page pompe à chaleur.",
    },
    {
      question: "Peut-on le poser en rénovation ?",
      answer:
        "Seulement si le sol peut encore prendre l'isolant, les tubes et la chape sans bloquer les portes. Sinon on le dit après le relevé.",
    },
    {
      question: "Quel lien avec la plomberie ?",
      answer:
        "Les collecteurs, l'alimentation et la purge font partie du réseau d'eau. La plomberie du logement se regarde en même temps.",
    },
    {
      question: "Dans quels secteurs ?",
      answer:
        "Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat et Marrakech. Le littoral et Marrakech n'ont pas la même saison de chauffe. Le relevé reste local.",
    },
    {
      question: "Comment demander une visite ?",
      answer:
        "Indiquez la ville et si le sol est encore ouvert. Un technicien convient d'un passage avant la chape. Vous pouvez aussi écrire sur WhatsApp.",
    },
  ],
  links: [
    frSiblings.pac,
    frSiblings.plumbing,
    frSiblings.hammam,
    frSiblings.services,
    frSiblings.zone,
    frSiblings.contact,
  ],
  breadcrumbs: [homeFr, servicesFr, { name: "Chauffage au sol" }],
  translations: {
    en: {
      title: "Hydronic underfloor heating",
      description:
        "Hydronic underfloor heating for villas and new builds: loops, manifolds and a heat source, in Casablanca, Rabat and Marrakech. The floor is checked first.",
      serviceType: "Underfloor heating",
      h1: "Underfloor heating",
      lead: [
        "The underfloor heating described here spreads heat through a hot-water circuit laid in the slab or the screed. It is planned in a new build, or in a renovation when the floor can still gain thickness. Without that height, it is not promised.",
        "AEROVENTIS connects it to the heat source, often an air-to-water heat pump, and to the plumbing. Casablanca, Rabat, Marrakech, Mohammedia, Bouskoura, Tamaris and Zenata do not share the same heating season or the same floors. The visit decides.",
      ],
      servicesIntro: "Three parts. Each one is drawn before the floor is poured.",
      services: [
        {
          title: "Loops",
          body: "Pipes in the floor, room by room, with a spacing taken from the survey.",
        },
        {
          title: "Manifolds",
          body: "They separate the rooms. They sit in a cupboard or a plant space that stays reachable.",
        },
        {
          title: "Heat source",
          body: "The heat pump, or another source already planned, feeds the circuit. It is chosen on its own.",
        },
      ],
      comparisonIntro: "What is checked before the floor is fixed.",
      points: [
        {
          title: "New build",
          body: "The loops go in before the screed. Coming back after the finishes means opening the floor.",
        },
        {
          title: "Renovation",
          body: "The spare height, the insulation and the planned finish are measured. If the margin is missing, another emitter is the honest answer.",
        },
        {
          title: "Rooms",
          body: "A bathroom and a living room do not need the same heat. Loops are separated rather than set with one control.",
        },
      ],
      image: visualEn("water pipes, to place underfloor heating"),
      processIntro: "The floor closes quickly. The order of the trades matters as much as the layout.",
      process: [
        "See the floor build-up, the rooms to heat and the place for the manifolds.",
        "Draw the loops and the link to the heat source.",
        "Install before the screed, fill the circuit and check that it holds.",
        "Leave the manifolds reachable for a later setting or check.",
      ],
      faqs: [
        {
          question: "What is this underfloor heating made of?",
          answer:
            "A hot-water circuit in the slab or the screed, connected to a heat source. This page describes that water network.",
        },
        {
          question: "Is an air-to-water heat pump required?",
          answer:
            "It often feeds the floor. Another source may already be there. It is not assumed: it is seen, or it is planned with the heat-pump page.",
        },
        {
          question: "Can it be installed in a renovation?",
          answer:
            "Only if the floor can still take the insulation, the pipes and the screed without blocking the doors. Otherwise that is said after the survey.",
        },
        {
          question: "How does it relate to plumbing?",
          answer:
            "Manifolds, supply and venting are part of the water network. The home's plumbing is looked at at the same time.",
        },
        {
          question: "Which areas are covered?",
          answer:
            "Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat and Marrakech. The coast and Marrakech do not share the same heating season. The survey stays local.",
        },
        {
          question: "How do I ask for a visit?",
          answer:
            "Give the city and whether the floor is still open. A technician arranges a visit before the screed. You can also write on WhatsApp.",
        },
      ],
      links: [enSiblings.pac, enSiblings.hammam, enSiblings.air, enSiblings.contact, enSiblings.blog],
      breadcrumbs: [homeEn, { name: "Underfloor heating" }],
    },
    ar: {
      title: "تدفئة أرضية بالماء",
      description:
        "تدفئة أرضية بالماء للفيلات والمشاريع الجديدة: حلقات ومجمعات ومصدر حرارة في الدار البيضاء والرباط ومراكش. تُفحص سماكة الأرضية قبل الصب في المكان.",
      serviceType: "تدفئة أرضية",
      h1: "تدفئة أرضية",
      lead: [
        "التدفئة الأرضية الموصوفة هنا تنشر الحرارة عبر دائرة ماء ساخن توضع في البلاطة أو في طبقة التسوية. تُخطط في البناء الجديد، أو في التجديد حين تستطيع الأرضية أن تزداد سماكة. من دون هذا الارتفاع لا يُوعد بها.",
        "تربطها AEROVENTIS بمصدر الحرارة، وغالباً بمضخة حرارية هواء-ماء، وبالسباكة. الدار البيضاء والرباط ومراكش والمحمدية وبوسكورة وتماريس وزناتة لا يجمعها فصل التدفئة نفسه ولا نوع الأرضيات نفسه. الزيارة هي التي تحسم.",
      ],
      servicesIntro: "ثلاثة أجزاء. يُرسم كل واحد قبل الصب.",
      services: [
        {
          title: "الحلقات",
          body: "أنابيب في الأرضية، في كل غرفة، بتباعد مأخوذ من المعاينة.",
        },
        {
          title: "المجمعات",
          body: "تفصل الغرف. توضع في خزانة أو في محل يبقى الوصول إليه ممكناً.",
        },
        {
          title: "مصدر الحرارة",
          body: "المضخة الحرارية، أو مصدر آخر مقرر سلفاً، يغذي الدائرة. يُختار على حدة.",
        },
      ],
      comparisonIntro: "ما يُفحص قبل تثبيت الأرضية.",
      points: [
        {
          title: "بناء جديد",
          body: "توضع الحلقات قبل طبقة التسوية. العودة بعد التشطيبات تعني فتح الأرضية.",
        },
        {
          title: "تجديد",
          body: "تُقاس السماكة المتاحة والعازل والتشطيب المقرر. إذا غاب الهامش، فوسيلة أخرى أصدق.",
        },
        {
          title: "الغرف",
          body: "الحمام وقاعة الجلوس لا يحتاجان الحرارة نفسها. تُفصل الحلقات بدل ضبط الكل بحركة واحدة.",
        },
      ],
      image: visualAr("أنابيب ماء لتصور تدفئة أرضية"),
      processIntro: "الأرضية تُغلق بسرعة. ترتيب الأشغال يهم بقدر المسار.",
      process: [
        "رؤية بنية الأرضية والغرف المراد تدفئتها ومكان المجمعات.",
        "رسم الحلقات والوصل بمصدر الحرارة.",
        "التركيب قبل طبقة التسوية، ثم ملء الدائرة وفحص الإحكام.",
        "ترك المجمعات في المتناول لضبط أو فحص لاحق.",
      ],
      faqs: [
        {
          question: "ممّ تتكون هذه التدفئة الأرضية؟",
          answer: "من دائرة ماء ساخن في البلاطة أو طبقة التسوية، موصولة بمصدر حرارة. الصفحة تصف شبكة الماء هذه.",
        },
        {
          question: "هل تلزم مضخة حرارية هواء-ماء؟",
          answer:
            "غالباً هي التي تغذي الأرضية. قد يوجد مصدر آخر. لا يُفترض: يُرى، أو يُخطط مع صفحة المضخة الحرارية.",
        },
        {
          question: "هل يمكن تركيبها في تجديد؟",
          answer:
            "فقط إذا استطاعت الأرضية أن تأخذ العازل والأنابيب وطبقة التسوية من دون أن تعيق الأبواب. وإلا يُقال ذلك بعد المعاينة.",
        },
        {
          question: "ما صلتها بالسباكة؟",
          answer: "المجمعات والتغذية والتفريغ جزء من شبكة الماء. سباكة المسكن تُنظر في الوقت نفسه.",
        },
        {
          question: "ما المناطق المشمولة؟",
          answer:
            "الدار البيضاء والمحمدية وبوسكورة وتماريس وزناتة والرباط ومراكش. الساحل ومراكش ليس لهما فصل التدفئة نفسه. المعاينة تبقى محلية.",
        },
        {
          question: "كيف أطلب زيارة؟",
          answer:
            "اذكروا المدينة وهل الأرضية ما زالت مفتوحة. يتفق تقني على مرور قبل طبقة التسوية. يمكن أيضاً الكتابة على واتساب.",
        },
      ],
      links: [arSiblings.pac, arSiblings.hammam, arSiblings.air, arSiblings.contact, arSiblings.blog],
      breadcrumbs: [homeAr, { name: "تدفئة أرضية" }],
    },
  },
};

const hammam: LandingPage = {
  slug: "hammam-beldi",
  locales: ["fr", "en", "ar"],
  serviceId: "hammam-beldi",
  serviceType: "Hammam beldi",
  areaServed: SERVICE_AREA_NAMES,
  title: "Hammam beldi, pose technique",
  description:
    "Installation technique d'un hammam beldi : chauffage, vapeur et plomberie, de Casablanca à Marrakech. Cette page ne décrit ni le carrelage ni le décor.",
  h1: "Installation technique d'un hammam beldi",
  lead: [
    "Cette page décrit l'installation technique d'un hammam beldi : le chauffage, la vapeur et la plomberie. Elle ne décrit pas le carrelage, le plâtre ni le décor.",
    "La pièce doit recevoir de l'eau chaude, de la vapeur et une évacuation qui part vraiment. AEROVENTIS regarde le local, l'arrivée d'eau et le rejet, pour des villas et des maisons à Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat et Marrakech.",
  ],
  servicesIntro: "Trois réseaux. Le volume réel du local les dimensionne.",
  services: [
    {
      title: "Chauffage",
      body: "Montée en température de la pièce et de l'eau, selon le volume vu, pas selon un modèle unique.",
    },
    {
      title: "Vapeur",
      body: "Production et diffusion de la vapeur, avec une place pour l'appareil et pour son entretien.",
    },
    {
      title: "Plomberie",
      body: "Alimentation, évacuation et pentes. L'eau ne doit ni stagner ni partir dans un réseau qui ne peut pas la recevoir.",
    },
  ],
  comparisonIntro: "Ce qui se voit avant de fixer un appareil.",
  showHvacComparison: false,
  points: [
    {
      title: "Le local",
      body: "Volume, hauteur, accès et voisinage. Un hammam dans une villa ne se traite pas comme un local au milieu d'un immeuble.",
    },
    {
      title: "L'eau",
      body: "L'arrivée et le rejet se voient avant le choix. Une évacuation trop haute ou trop loin change le projet.",
    },
    {
      title: "L'air humide",
      body: "La vapeur est un sujet de chauffage. L'extraction de l'air très humide est un autre réseau : on la coordonne, on ne la confond pas.",
    },
  ],
  image: visual(BRAND_SLIDES.installation, "local technique, pour situer l'installation d'un hammam"),
  processIntro: "Le hammam se décide dans la pièce, pas sur un schéma repris d'un autre chantier.",
  process: [
    "Voir le local, l'eau disponible et l'endroit du rejet.",
    "Choisir le chauffage, la production de vapeur et les diamètres à partir de ce relevé.",
    "Poser, mettre en eau et vérifier que la vapeur et l'évacuation restent dans la pièce prévue.",
    "Laisser les appareils et les vannes accessibles, hors de l'endroit où l'on s'assoit.",
  ],
  faqs: [
    {
      question: "Le décor du hammam est-il inclus ?",
      answer:
        "Non. Le carrelage, le plâtre et le décor ne font pas partie de cette page. L'installation porte sur le chauffage, la vapeur et la plomberie.",
    },
    {
      question: "D'où vient la chaleur ?",
      answer:
        "D'un appareil choisi pour le volume, parfois raccordé à une pompe à chaleur air-eau si le projet le permet. On ne le décide pas sans voir le local.",
    },
    {
      question: "Faut-il une extraction d'air ?",
      answer:
        "L'air très humide ne se traite pas comme la vapeur. L'extraction est un réseau à part. Les deux se regardent ensemble pour que l'humidité reste dans le hammam.",
    },
    {
      question: "Une villa et un immeuble se traitent-ils pareil ?",
      answer:
        "Non. L'immeuble ajoute les colonnes communes, le syndic et l'humidité chez le voisin. La villa ajoute les longueurs de réseau.",
    },
    {
      question: "Dans quels secteurs ?",
      answer:
        "Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat et Marrakech. Le passage sert à voir le local, pas à envoyer un plan seul.",
    },
    {
      question: "Comment demander une visite ?",
      answer:
        "Décrivez la ville et la pièce prévue sur la page contact, ou écrivez sur WhatsApp. Un technicien convient ensuite d'un passage.",
    },
  ],
  links: [
    frSiblings.plumbing,
    frSiblings.pac,
    frSiblings.floor,
    frSiblings.extraction,
    frSiblings.services,
    frSiblings.contact,
  ],
  breadcrumbs: [homeFr, servicesFr, { name: "Hammam beldi" }],
  translations: {
    en: {
      title: "Beldi hammam installation",
      description:
        "Technical installation of a beldi hammam: heating, steam and plumbing, from Casablanca to Marrakech. This page does not cover tiling or decoration.",
      serviceType: "Beldi hammam",
      h1: "Technical installation of a beldi hammam",
      lead: [
        "This page describes the technical installation of a beldi hammam: heating, steam and plumbing. It does not describe tiling, plaster or decoration.",
        "The room needs hot water, steam and a drain that actually leaves. AEROVENTIS looks at the room, the water supply and the outlet, for villas and houses in Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat and Marrakech.",
      ],
      servicesIntro: "Three networks. The real volume of the room sizes them.",
      services: [
        {
          title: "Heating",
          body: "Raising the temperature of the room and of the water, from the volume that was seen, not from one standard model.",
        },
        {
          title: "Steam",
          body: "Producing and spreading steam, with room for the appliance and for its maintenance.",
        },
        {
          title: "Plumbing",
          body: "Supply, drainage and falls. Water should not sit, and it should not enter a pipe that cannot take it.",
        },
      ],
      comparisonIntro: "What is seen before an appliance is fixed.",
      points: [
        {
          title: "The room",
          body: "Volume, height, access and neighbours. A hammam in a villa is not treated like a room in the middle of a building.",
        },
        {
          title: "The water",
          body: "The supply and the outlet are seen before the choice. A drain that is too high or too far changes the project.",
        },
        {
          title: "Humid air",
          body: "Steam is a heating subject. Extracting very humid air is another network: they are coordinated, not confused.",
        },
      ],
      image: visualEn("a plant room, to place a hammam installation"),
      processIntro: "A hammam is decided in the room, not from a drawing copied from another job.",
      process: [
        "See the room, the water available and the place of the outlet.",
        "Choose the heating, the steam production and the pipe sizes from that survey.",
        "Install, fill and check that steam and drainage stay in the room that was planned.",
        "Leave appliances and valves reachable, away from where people sit.",
      ],
      faqs: [
        {
          question: "Is the hammam decoration included?",
          answer:
            "No. Tiling, plaster and decoration are not part of this page. The installation covers heating, steam and plumbing.",
        },
        {
          question: "Where does the heat come from?",
          answer:
            "From an appliance chosen for the volume, sometimes connected to an air-to-water heat pump when the project allows it. It is not decided without seeing the room.",
        },
        {
          question: "Is air extraction needed?",
          answer:
            "Very humid air is not treated as steam. Extraction is a separate network. Both are looked at together so the humidity stays in the hammam.",
        },
        {
          question: "Are a villa and a building the same job?",
          answer:
            "No. A building adds shared stacks, the building rules and humidity reaching a neighbour. A villa adds longer pipe runs.",
        },
        {
          question: "Which areas are covered?",
          answer:
            "Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat and Marrakech. The visit is to see the room, not to work from a plan alone.",
        },
        {
          question: "How do I ask for a visit?",
          answer:
            "Describe the city and the planned room on the contact page, or write on WhatsApp. A technician then arranges a visit.",
        },
      ],
      links: [enSiblings.pac, enSiblings.floor, enSiblings.air, enSiblings.contact, enSiblings.blog],
      breadcrumbs: [homeEn, { name: "Beldi hammam" }],
    },
    ar: {
      title: "تركيب تقني لحمام بلدي",
      description:
        "تركيب تقني لحمام بلدي: تدفئة وبخار وسباكة، من الدار البيضاء إلى مراكش. هذه الصفحة لا تصف البلاط ولا الديكور. تُحدد التفاصيل بعد زيارة المحل.",
      serviceType: "حمام بلدي",
      h1: "التركيب التقني لحمام بلدي",
      lead: [
        "تصف هذه الصفحة التركيب التقني لحمام بلدي: التدفئة والبخار والسباكة. لا تصف البلاط ولا الجبس ولا الديكور.",
        "تحتاج الغرفة إلى ماء ساخن وبخار وتصريف يغادر فعلاً. تنظر AEROVENTIS إلى المحل ووصول الماء والمصرف، لفيلات ومنازل في الدار البيضاء والمحمدية وبوسكورة وتماريس وزناتة والرباط ومراكش.",
      ],
      servicesIntro: "ثلاث شبكات. حجم المحل الحقيقي هو الذي يحددها.",
      services: [
        {
          title: "التدفئة",
          body: "رفع حرارة الغرفة والماء حسب الحجم الذي رُئي، لا حسب نموذج واحد.",
        },
        {
          title: "البخار",
          body: "إنتاج البخار ونشره، مع مكان للجهاز ولصيانته.",
        },
        {
          title: "السباكة",
          body: "التغذية والتصريف والميول. لا ينبغي أن يركد الماء ولا أن يدخل أنبوباً لا يستطيع استقباله.",
        },
      ],
      comparisonIntro: "ما يُرى قبل تثبيت جهاز.",
      points: [
        {
          title: "المحل",
          body: "الحجم والارتفاع والوصول والجوار. حمام في فيلا لا يُعامل كمحل في وسط عمارة.",
        },
        {
          title: "الماء",
          body: "تُرى التغذية والمصرف قبل الاختيار. مصرف عالٍ جداً أو بعيد جداً يغيّر المشروع.",
        },
        {
          title: "الهواء الرطب",
          body: "البخار موضوع تدفئة. شفط الهواء الشديد الرطوبة شبكة أخرى: يُنسقان ولا يُخلطان.",
        },
      ],
      image: visualAr("محل تقني لتصور تركيب حمام"),
      processIntro: "يُحسم الحمام في الغرفة، لا من مخطط منسوخ من ورش آخر.",
      process: [
        "رؤية المحل والماء المتاح ومكان المصرف.",
        "اختيار التدفئة وإنتاج البخار والأقطار من هذه المعاينة.",
        "التركيب ثم التعبئة، والتحقق من أن البخار والتصريف يبقيان في الغرفة المقررة.",
        "ترك الأجهزة والصمامات في المتناول، بعيداً عن موضع الجلوس.",
      ],
      faqs: [
        {
          question: "هل ديكور الحمام مشمول؟",
          answer: "لا. البلاط والجبس والديكور ليسوا جزءاً من هذه الصفحة. التركيب يخص التدفئة والبخار والسباكة.",
        },
        {
          question: "من أين تأتي الحرارة؟",
          answer:
            "من جهاز يُختار حسب الحجم، وقد يوصل بمضخة حرارية هواء-ماء إذا سمح المشروع. لا يُقرر من دون رؤية المحل.",
        },
        {
          question: "هل يلزم شفط الهواء؟",
          answer:
            "الهواء الشديد الرطوبة لا يُعامل كالبخار. الشفط شبكة مستقلة. يُنظر إليهما معاً كي تبقى الرطوبة داخل الحمام.",
        },
        {
          question: "هل الفيلا والعمارة عمل واحد؟",
          answer: "لا. العمارة تضيف الأعمدة المشتركة ونظام البناية والرطوبة عند الجار. الفيلا تضيف أطوال الشبكة.",
        },
        {
          question: "ما المناطق المشمولة؟",
          answer:
            "الدار البيضاء والمحمدية وبوسكورة وتماريس وزناتة والرباط ومراكش. الزيارة لرؤية المحل، لا للعمل من مخطط وحده.",
        },
        {
          question: "كيف أطلب زيارة؟",
          answer: "صفوا المدينة والغرفة المقررة في صفحة الاتصال، أو اكتبوا على واتساب. ثم يتفق تقني على مرور.",
        },
      ],
      links: [arSiblings.pac, arSiblings.floor, arSiblings.air, arSiblings.contact, arSiblings.blog],
      breadcrumbs: [homeAr, { name: "حمام بلدي" }],
    },
  },
};

const air: LandingPage = {
  slug: "traitement-air",
  locales: ["fr", "en", "ar"],
  serviceId: "traitement-air",
  serviceType: "Traitement d'air",
  areaServed: SERVICE_AREA_NAMES,
  title: "Traitement d'air",
  description:
    "Traitement d'air pour villas et immeubles : centrales, filtration et air neuf à Casablanca, Rabat et Marrakech. Ce n'est ni un split ni un désenfumage.",
  h1: "Traitement d'air",
  lead: [
    "Le traitement d'air prépare l'air neuf avant de le souffler : filtration et, quand le projet le demande, chauffage ou refroidissement de cet air dans une centrale. Ce n'est pas un extracteur de salle d'eau, ni un désenfumage, ni un split qui ne fait que la température d'une pièce.",
    "AEROVENTIS l'étudie pour des villas, des immeubles et des locaux neufs à Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat et Marrakech. Le débit d'air neuf et la filtration se fixent après le relevé, pas d'après un modèle copié.",
  ],
  servicesIntro: "Trois sujets. Le bâtiment dit lesquels sont réellement en jeu.",
  services: [
    {
      title: "Centrales",
      body: "La centrale regroupe le ventilateur, les filtres et, si besoin, les batteries qui chauffent ou refroidissent l'air neuf.",
    },
    {
      title: "Filtration",
      body: "Les filtres retiennent une partie des poussières. On les choisit selon le local et l'air extérieur, puis on prévoit de les changer.",
    },
    {
      title: "Air neuf",
      body: "La prise d'air se place loin des rejets, des hottes et des voies poussiéreuses.",
    },
  ],
  comparisonIntro: "Ce qui évite de confondre trois réseaux.",
  showHvacComparison: false,
  points: [
    {
      title: "Pas un split",
      body: "Climatiser une pièce et traiter l'air neuf sont deux besoins. L'un peut exister sans l'autre.",
    },
    {
      title: "Pas le désenfumage",
      body: "Une centrale de confort ne remplace pas un réseau prévu pour les fumées.",
    },
    {
      title: "Filtres accessibles",
      body: "Sans trappe ni place pour sortir les filtres, le traitement d'air s'encrasse et ne se suit plus.",
    },
  ],
  image: visual(BRAND_SLIDES.ventilation, "centrale de traitement d'air et gaines"),
  processIntro: "La centrale se pose quand la prise d'air et le chemin des gaines sont connus.",
  process: [
    "Voir les volumes, la prise d'air possible et les rejets déjà en place.",
    "Fixer le débit d'air neuf et la filtration à partir du bâtiment, pas d'une ville voisine.",
    "Poser la centrale et les gaines, puis vérifier le sens de l'air.",
    "Montrer comment changer les filtres, et laisser cet accès libre.",
  ],
  faqs: [
    {
      question: "Est-ce de la ventilation ?",
      answer:
        "La ventilation renouvelle l'air. Le traitement d'air va plus loin : une centrale filtre cet air et peut le chauffer ou le refroidir. Les deux pages se complètent. Elles ne disent pas la même chose.",
    },
    {
      question: "Est-ce du désenfumage ?",
      answer:
        "Non. Le désenfumage est un réseau de sécurité pour les fumées. Une centrale de confort ne joue pas ce rôle.",
    },
    {
      question: "Quelle filtration ?",
      answer:
        "Elle dépend du local et de l'air extérieur : humidité sur le littoral, poussière à Marrakech ou près d'un chantier. On ne fige pas un filtre avant le relevé.",
    },
    {
      question: "Où se pose la centrale ?",
      answer:
        "Dans un local technique, un faux plafond ou en toiture, là où les gaines peuvent partir et où les filtres restent changeables. L'accès fait partie de l'étude.",
    },
    {
      question: "Dans quels secteurs ?",
      answer:
        "Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat et Marrakech. L'air extérieur n'y est pas le même. La prise d'air se juge sur place.",
    },
    {
      question: "Comment demander une visite ?",
      answer:
        "Indiquez la ville et le type de local sur la page contact, ou écrivez sur WhatsApp. La visite sert à voir la prise d'air et le chemin des gaines.",
    },
  ],
  links: [
    frSiblings.ventilation,
    frSiblings.extraction,
    frSiblings.smoke,
    frSiblings.climate,
    frSiblings.services,
    frSiblings.contact,
  ],
  breadcrumbs: [homeFr, servicesFr, { name: "Traitement d'air" }],
  translations: {
    en: {
      title: "Air handling and filtration",
      description:
        "Air handling for villas and buildings: air-handling units, filtration and fresh air in Casablanca, Rabat and Marrakech. This is not a split or smoke control.",
      serviceType: "Air handling",
      h1: "Air handling",
      lead: [
        "Air handling prepares fresh air before it is supplied: filtration and, when the project needs it, heating or cooling of that air in a unit. It is not a bathroom extractor, smoke control, or a split that only sets the temperature of one room.",
        "AEROVENTIS studies it for villas, buildings and new premises in Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat and Marrakech. The fresh-air flow and the filtration are set after the survey, not from a copied model.",
      ],
      servicesIntro: "Three subjects. The building says which ones are really in play.",
      services: [
        {
          title: "Air-handling units",
          body: "The unit brings together the fan, the filters and, when needed, the coils that heat or cool the fresh air.",
        },
        {
          title: "Filtration",
          body: "Filters hold back part of the dust. They are chosen for the room and the outdoor air, and a way to change them is planned.",
        },
        {
          title: "Fresh air",
          body: "The intake is placed away from exhausts, kitchen hoods and dusty roads.",
        },
      ],
      comparisonIntro: "What keeps three networks from being mixed up.",
      points: [
        {
          title: "Not a split",
          body: "Cooling a room and treating fresh air are two needs. One can exist without the other.",
        },
        {
          title: "Not smoke control",
          body: "A comfort unit does not replace a network meant for smoke.",
        },
        {
          title: "Reachable filters",
          body: "Without a hatch and room to pull the filters out, the system clogs and can no longer be maintained.",
        },
      ],
      image: visualEn("an air-handling unit and ducts"),
      processIntro: "The unit is installed once the intake and the duct route are known.",
      process: [
        "See the volumes, the possible air intake and the exhausts already in place.",
        "Set the fresh-air flow and the filtration from the building, not from a neighbouring city.",
        "Install the unit and the ducts, then check the direction of the air.",
        "Show how the filters are changed, and leave that access clear.",
      ],
      faqs: [
        {
          question: "Is this ventilation?",
          answer:
            "Ventilation renews the air. Air handling goes further: a unit filters that air and can heat or cool it. The two pages complement each other. They do not say the same thing.",
        },
        {
          question: "Is this smoke control?",
          answer: "No. Smoke control is a safety network for smoke. A comfort unit does not do that job.",
        },
        {
          question: "What filtration is used?",
          answer:
            "It depends on the room and the outdoor air: humidity on the coast, dust in Marrakech or near a building site. A filter is not fixed before the survey.",
        },
        {
          question: "Where does the unit go?",
          answer:
            "In a plant room, a ceiling void or on the roof, where ducts can leave and filters can still be changed. Access is part of the study.",
        },
        {
          question: "Which areas are covered?",
          answer:
            "Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat and Marrakech. The outdoor air is not the same in each. The intake is judged on site.",
        },
        {
          question: "How do I ask for a visit?",
          answer:
            "Give the city and the type of premises on the contact page, or write on WhatsApp. The visit is to see the intake and the duct route.",
        },
      ],
      links: [enSiblings.pac, enSiblings.floor, enSiblings.hammam, enSiblings.contact, enSiblings.blog],
      breadcrumbs: [homeEn, { name: "Air handling" }],
    },
    ar: {
      title: "معالجة الهواء والتصفية",
      description:
        "معالجة الهواء للفيلات والمباني والمشاريع الجديدة: مراكز وتصفية وهواء جديد في الدار البيضاء والرباط ومراكش. هذه الشبكة ليست سبليت ولا شفط دخان.",
      serviceType: "معالجة الهواء",
      h1: "معالجة الهواء",
      lead: [
        "معالجة الهواء تُعدّ الهواء الجديد قبل دفعه: تصفية، وعند حاجة المشروع تسخين أو تبريد هذا الهواء في مركز. ليست شفاطاً لحمّام، ولا شفط دخان، ولا سبليت يضبط حرارة غرفة فقط.",
        "تدرسها AEROVENTIS للفيلات والمباني والمحلات الجديدة في الدار البيضاء والمحمدية وبوسكورة وتماريس وزناتة والرباط ومراكش. يُحدد تدفق الهواء الجديد والتصفية بعد المعاينة، لا من نموذج منسوخ.",
      ],
      servicesIntro: "ثلاثة مواضيع. المبنى هو الذي يقول أيها مطروح فعلاً.",
      services: [
        {
          title: "مراكز المعالجة",
          body: "يجمع المركز المروحة والفلاتر، وعند الحاجة البطاريات التي تسخّن أو تبرّد الهواء الجديد.",
        },
        {
          title: "التصفية",
          body: "تحجز الفلاتر جزءاً من الغبار. تُختار حسب المحل والهواء الخارجي، ويُخطط لتغييرها.",
        },
        {
          title: "الهواء الجديد",
          body: "توضع مأخذ الهواء بعيداً عن المصارف والشفاطات والطرق الغبارية.",
        },
      ],
      comparisonIntro: "ما يمنع الخلط بين ثلاث شبكات.",
      points: [
        {
          title: "ليس سبليت",
          body: "تكييف غرفة ومعالجة الهواء الجديد حاجتان. يمكن أن توجد إحداهما من دون الأخرى.",
        },
        {
          title: "ليس شفط دخان",
          body: "مركز الراحة لا يحل محل شبكة مخصصة للدخان.",
        },
        {
          title: "فلاتر في المتناول",
          body: "من دون فتحة ومكان لإخراج الفلاتر، تتسخ المعالجة ولا تعود قابلة للمتابعة.",
        },
      ],
      image: visualAr("مركز معالجة هواء وقنوات"),
      processIntro: "يُركب المركز حين تُعرف مأخذ الهواء ومسار القنوات.",
      process: [
        "رؤية الأحجام ومأخذ الهواء الممكن والمصارف الموجودة.",
        "تحديد تدفق الهواء الجديد والتصفية من المبنى، لا من مدينة مجاورة.",
        "تركيب المركز والقنوات ثم التحقق من اتجاه الهواء.",
        "إظهار كيفية تغيير الفلاتر، وترك هذا الوصول حراً.",
      ],
      faqs: [
        {
          question: "هل هذه تهوية؟",
          answer:
            "التهوية تجدّد الهواء. معالجة الهواء تذهب أبعد: مركز يصفّي هذا الهواء ويمكنه تسخينه أو تبريده. الصفحتان تتكاملان. لا تقولان الشيء نفسه.",
        },
        {
          question: "هل هذا شفط دخان؟",
          answer: "لا. شفط الدخان شبكة سلامة للدخان. مركز الراحة لا يؤدي هذا الدور.",
        },
        {
          question: "أي تصفية؟",
          answer:
            "تعتمد على المحل والهواء الخارجي: رطوبة على الساحل، وغبار في مراكش أو قرب ورش. لا يُثبت فلتر قبل المعاينة.",
        },
        {
          question: "أين يوضع المركز؟",
          answer: "في محل تقني أو فراغ سقف أو على السطح، حيث تستطيع القنوات الخروج وتبقى الفلاتر قابلة للتغيير. الوصول جزء من الدراسة.",
        },
        {
          question: "ما المناطق المشمولة؟",
          answer:
            "الدار البيضاء والمحمدية وبوسكورة وتماريس وزناتة والرباط ومراكش. الهواء الخارجي ليس واحداً. مأخذ الهواء يُقدَّر في المكان.",
        },
        {
          question: "كيف أطلب زيارة؟",
          answer: "اذكروا المدينة ونوع المحل في صفحة الاتصال، أو اكتبوا على واتساب. الزيارة لرؤية المأخذ ومسار القنوات.",
        },
      ],
      links: [arSiblings.pac, arSiblings.floor, arSiblings.hammam, arSiblings.contact, arSiblings.blog],
      breadcrumbs: [homeAr, { name: "معالجة الهواء" }],
    },
  },
};

export const addedServicePages: readonly LandingPage[] = [pac, floor, hammam, air];
