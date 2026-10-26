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
  "froid-commercial",
  "plomberie",
] as const;

export const CITY_IDS = ["casablanca", "rabat", "marrakech"] as const;

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
];
