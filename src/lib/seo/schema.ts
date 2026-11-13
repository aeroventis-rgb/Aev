import { areaSchemaType, SERVICE_AREA_NAMES } from "@/lib/areas";
import { PHONE_E164 } from "@/lib/constants";
import { absoluteAsset, absoluteUrl, getSiteUrl } from "@/lib/site";
import {
  BUSINESS_ADDRESS,
  BUSINESS_GEO,
  BUSINESS_HOURS,
  BUSINESS_SAME_AS,
  filledAddress,
  filledGeo,
  filledHours,
  filledSameAs,
} from "@/lib/seo/profile";

export const BUSINESS_ID = `${getSiteUrl()}/#hvac`;

const OFFERED_SERVICES = [
  { name: "Climatisation", serviceType: "Climatisation", path: "/climatisation" },
  { name: "Ventilation", serviceType: "Ventilation", path: "/ventilation" },
  { name: "Extraction d'air", serviceType: "Extraction d'air", path: "/extraction" },
  { name: "Désenfumage", serviceType: "Désenfumage", path: "/desenfumage" },
  { name: "Plomberie", serviceType: "Plomberie", path: "/plomberie" },
  { name: "Pompe à chaleur air-eau", serviceType: "Pompe à chaleur air-eau", path: "/pompe-a-chaleur-air-eau" },
  { name: "Chauffage au sol", serviceType: "Chauffage au sol", path: "/chauffage-au-sol" },
  { name: "Hammam beldi", serviceType: "Hammam beldi", path: "/hammam-beldi" },
  { name: "Traitement d'air", serviceType: "Traitement d'air", path: "/traitement-air" },
  { name: "Maintenance et SAV", serviceType: "Maintenance", path: "/nos-services" },
] as const;

function placeArea(name: string) {
  return {
    "@type": areaSchemaType(name),
    name,
    containedInPlace: { "@type": "Country", name: "Morocco" },
  };
}

export function hvacBusinessJsonLd(description: string): Record<string, unknown> {
  const address = filledAddress(BUSINESS_ADDRESS);
  const geo = filledGeo(BUSINESS_GEO);
  const sameAs = filledSameAs(BUSINESS_SAME_AS);
  const hours = filledHours(BUSINESS_HOURS);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": BUSINESS_ID,
    name: "AEROVENTIS",
    url: absoluteUrl("fr", "/"),
    telephone: PHONE_E164,
    image: [absoluteAsset("/aeroventis-logo.png"), absoluteAsset("/hero-background.webp")],
    logo: absoluteAsset("/aeroventis-logo.png"),
    description,
    areaServed: SERVICE_AREA_NAMES.map((name) => placeArea(name)),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services AEROVENTIS",
      itemListElement: OFFERED_SERVICES.map((offer) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          serviceType: offer.serviceType,
          url: absoluteUrl("fr", offer.path),
        },
      })),
    },
    currenciesAccepted: "MAD",
  };

  if (address) {
    data.address = { "@type": "PostalAddress", ...address };
  }
  if (geo) {
    data.geo = { "@type": "GeoCoordinates", ...geo };
  }
  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }
  if (hours) {
    data.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    };
  }

  return data;
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed: readonly string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: input.url,
    provider: { "@id": BUSINESS_ID },
    areaServed: input.areaServed.map((name) => placeArea(name)),
  };
}

export function faqJsonLd(faqs: readonly { question: string; answer: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; url: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  inLanguage: string;
  image?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    inLanguage: input.inLanguage,
    mainEntityOfPage: input.url,
    image: [input.image ?? absoluteAsset("/aeroventis-logo.png")],
    author: {
      "@type": "Organization",
      name: "AEROVENTIS",
      url: absoluteUrl("fr", "/"),
    },
    publisher: {
      "@type": "Organization",
      name: "AEROVENTIS",
      logo: {
        "@type": "ImageObject",
        url: absoluteAsset("/aeroventis-logo.png"),
      },
    },
  };
}
