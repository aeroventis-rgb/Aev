import type { Locale } from "@/i18n/routing";
import type { CityId, ServiceId } from "@/lib/landings/slugs";

export type LandingLink = { href: `/${string}`; label: string };
export type Crumb = { name: string; pathname?: `/${string}` | "/" };

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
  /** Optional H2s. Omitted headings keep the shared French labels. */
  headings?: {
    services?: string;
    comparison?: string;
    process?: string;
    faq?: string;
  };
  lead: readonly string[];
  servicesIntro: string;
  services: readonly { title: string; body: string }[];
  comparisonIntro: string;
  /** Split / gainable / VRV table. Omitted on trades where that comparison does not apply. */
  showHvacComparison?: boolean;
  localFit?: { split: string; gainable: string; vrv: string };
  /** Site decisions shown instead of the HVAC comparison. */
  points?: readonly { title: string; body: string }[];
  image?: { src: string; alt: string; caption: string };
  processIntro: string;
  process: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  links: readonly LandingLink[];
  breadcrumbs: readonly Crumb[];
};
