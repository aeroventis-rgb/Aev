import type { Locale } from "@/i18n/routing";

/**
 * Service × city URLs are `/{service}-{city}`.
 * Hubs omit the city. Only routes with their own copy are registered —
 * unpublished combinations must not be generated as a city-name swap.
 */
export const SERVICE_IDS = [
  "climatisation",
  "climatisation-gainable",
  "entretien-climatisation",
  "ventilation",
  "extraction",
  "desenfumage",
  "froid-commercial",
  "plomberie",
] as const;

export const CITY_IDS = [
  "casablanca",
  "rabat",
  "marrakech",
  "mohammedia",
  "bouskoura",
  "tamaris",
  "zenata",
] as const;

const AREA_LABEL: Record<CityId, string> = {
  casablanca: "Casablanca",
  rabat: "Rabat",
  marrakech: "Marrakech",
  mohammedia: "Mohammedia",
  bouskoura: "Bouskoura",
  tamaris: "Tamaris",
  zenata: "Zenata",
};

export type ServiceId = (typeof SERVICE_IDS)[number];
export type CityId = (typeof CITY_IDS)[number];

export type LandingRoute = {
  slug: string;
  locales: readonly Locale[];
  label: string;
  priority: number;
};

export function cityServiceSlug(service: ServiceId, city: CityId): string {
  return `${service}-${city}`;
}

export const LANDING_ROUTES: readonly LandingRoute[] = [
  { slug: "climatisation", locales: ["fr"], label: "Climatisation au Maroc", priority: 0.85 },
  {
    slug: "climatisation-gainable",
    locales: ["fr"],
    label: "Climatisation gainable",
    priority: 0.85,
  },
  {
    slug: "climatisation-casablanca",
    locales: ["fr"],
    label: "Climatisation Casablanca",
    priority: 0.8,
  },
  {
    slug: "climatisation-gainable-casablanca",
    locales: ["fr"],
    label: "Climatisation gainable Casablanca",
    priority: 0.8,
  },
  {
    slug: "climatisation-rabat",
    locales: ["fr"],
    label: "Climatisation Rabat",
    priority: 0.8,
  },
  {
    slug: "climatisation-marrakech",
    locales: ["fr"],
    label: "Climatisation Marrakech",
    priority: 0.8,
  },
  {
    slug: "entretien-climatisation-casablanca",
    locales: ["fr"],
    label: "Entretien climatisation Casablanca",
    priority: 0.8,
  },
  { slug: "ventilation", locales: ["fr"], label: "Ventilation", priority: 0.85 },
  { slug: "plomberie", locales: ["fr"], label: "Plomberie", priority: 0.85 },
  { slug: "extraction", locales: ["fr"], label: "Extraction d'air", priority: 0.82 },
  { slug: "desenfumage", locales: ["fr"], label: "Désenfumage", priority: 0.82 },
  ...(["mohammedia", "bouskoura", "tamaris", "zenata"] as const).map(
    (city): LandingRoute => ({
      slug: `climatisation-${city}`,
      locales: ["fr"],
      label: `Climatisation ${AREA_LABEL[city]}`,
      priority: 0.78,
    })
  ),
  ...CITY_IDS.flatMap((city): LandingRoute[] => [
    {
      slug: `ventilation-${city}`,
      locales: ["fr"],
      label: `Ventilation ${AREA_LABEL[city]}`,
      priority: 0.74,
    },
    {
      slug: `plomberie-${city}`,
      locales: ["fr"],
      label: `Plomberie ${AREA_LABEL[city]}`,
      priority: 0.74,
    },
  ]),
];
