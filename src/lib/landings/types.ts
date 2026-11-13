import type { Locale } from "@/i18n/routing";
import type { CityId, ServiceId } from "@/lib/landings/slugs";

export type LandingLink = { href: `/${string}`; label: string };
export type Crumb = { name: string; pathname?: `/${string}` | "/" };

export type LandingHeadings = {
  services?: string;
  comparison?: string;
  process?: string;
  faq?: string;
};

/** English or Arabic copy for a hub that is also published outside French. */
export type LandingTranslation = {
  title: string;
  description: string;
  serviceType: string;
  h1: string;
  headings?: LandingHeadings;
  lead: readonly string[];
  servicesIntro: string;
  services: readonly { title: string; body: string }[];
  comparisonIntro: string;
  points?: readonly { title: string; body: string }[];
  localFit?: { split: string; gainable: string; vrv: string };
  image?: { alt: string; caption: string };
  /** Alts aligned with the French gallery, same order. */
  galleryAlts?: readonly string[];
  processIntro: string;
  process: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  links: readonly LandingLink[];
  breadcrumbs: readonly Crumb[];
};

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
  /** Optional H2s. Omitted headings keep the shared labels for the active locale. */
  headings?: LandingHeadings;
  lead: readonly string[];
  servicesIntro: string;
  services: readonly { title: string; body: string }[];
  comparisonIntro: string;
  /** Split / gainable / VRV table. Omitted on trades where that comparison does not apply. */
  showHvacComparison?: boolean;
  localFit?: { split: string; gainable: string; vrv: string };
  /** Site decisions shown instead of the HVAC comparison. */
  points?: readonly { title: string; body: string }[];
  image?: { src: string; alt: string; caption: string; width?: number; height?: number };
  /** Extra chantier photos shown under the hero. Omitted on pages that keep a single visual. */
  gallery?: readonly { src: string; alt: string; width: number; height: number }[];
  processIntro: string;
  process: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  links: readonly LandingLink[];
  breadcrumbs: readonly Crumb[];
  /** Required for every locale other than French. */
  translations?: Partial<Record<Exclude<Locale, "fr">, LandingTranslation>>;
};
