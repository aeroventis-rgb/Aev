export const COMPARISON_ROWS = [
  {
    label: "Principe",
    split: "Une unité intérieure murale traite une pièce et se raccorde à un groupe extérieur.",
    gainable: "Une unité dans le faux plafond souffle dans plusieurs pièces par des gaines isolées.",
    vrv: "Plusieurs unités intérieures partagent un circuit de fluide à débit variable.",
  },
  {
    label: "Travaux",
    split: "Percements, liaisons frigorifiques et évacuation des condensats. Peu de plâtrerie.",
    gainable: "Faux plafond, réseau de gaines, bouches et une trappe d'accès pour les filtres.",
    vrv: "Étude du circuit, nombreuses liaisons et, souvent, un local technique.",
  },
  {
    label: "À privilégier",
    split: "Une ou quelques pièces, ou un appartement sans hauteur de plénum.",
    gainable: "Une villa ou un grand plateau quand le plafond peut accueillir les gaines.",
    vrv: "Un immeuble, des bureaux ou plusieurs locaux alimentés par peu de groupes extérieurs.",
  },
] as const;

export const PROCESS_TITLES = [
  "Visite technique",
  "Étude",
  "Pose et mise en service",
  "Entretien",
] as const;
