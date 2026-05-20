import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl, localePath } from "@/lib/site";

const ROUTES = [
  "/",
  "/qui-sommes-nous",
  "/nos-services",
  "/zone-intervention",
  "/mentions-legales",
  "/politique-confidentialite",
  "/plan-du-site",
] as const;

/** French-only SEO pages — listed once under default locale */
const FRENCH_ONLY_ROUTES = [
  "/qui-sommes-nous",
  "/nos-services",
  "/zone-intervention",
  "/plan-du-site",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of ROUTES) {
      if (
        FRENCH_ONLY_ROUTES.includes(route as (typeof FRENCH_ONLY_ROUTES)[number]) &&
        locale !== routing.defaultLocale
      ) {
        continue;
      }
      entries.push({
        url: `${base}${localePath(locale, route)}`,
        lastModified,
        changeFrequency: route === "/" ? "weekly" : "yearly",
        priority: route === "/" ? 1 : route.startsWith("/qui") ? 0.75 : 0.6,
      });
    }
  }

  return entries;
}
