import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { LANDING_ROUTES } from "@/lib/landings/slugs";

export type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type SiteRoute = {
  pathname: string;
  locales: readonly Locale[];
  label: string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

export const STATIC_ROUTES: readonly SiteRoute[] = [
  {
    pathname: "/",
    locales: ["fr", "en", "ar"],
    label: "Accueil",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    pathname: "/contact",
    locales: ["fr", "en", "ar"],
    label: "Contact",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    pathname: "/blog",
    locales: ["fr", "en", "ar"],
    label: "Blog",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    pathname: "/qui-sommes-nous",
    locales: ["fr"],
    label: "Qui sommes-nous",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    pathname: "/nos-services",
    locales: ["fr"],
    label: "Nos services",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    pathname: "/zone-intervention",
    locales: ["fr"],
    label: "Zone d'intervention",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    pathname: "/plan-du-site",
    locales: ["fr"],
    label: "Plan du site",
    priority: 0.3,
    changeFrequency: "monthly",
  },
  {
    pathname: "/mentions-legales",
    locales: ["fr", "en", "ar"],
    label: "Mentions légales",
    priority: 0.2,
    changeFrequency: "yearly",
  },
  {
    pathname: "/politique-confidentialite",
    locales: ["fr", "en", "ar"],
    label: "Politique de confidentialité",
    priority: 0.2,
    changeFrequency: "yearly",
  },
];

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

/** Locales that actually have this path, or null when the path is unknown. */
export function localesForPath(pathname: string): readonly Locale[] | null {
  const normalized = pathname === "" ? "/" : pathname.replace(/\/+$/, "") || "/";
  const exact = STATIC_ROUTES.find((route) => route.pathname === normalized);
  if (exact) return exact.locales;

  const slug = normalized.replace(/^\//, "");
  const landing = LANDING_ROUTES.find((route) => route.slug === slug);
  if (landing) return landing.locales;

  if (normalized.startsWith("/blog/")) {
    return STATIC_ROUTES.find((route) => route.pathname === "/blog")?.locales ?? null;
  }

  return null;
}

/** Language switch target: same path when that locale exists, otherwise home. */
export function alternatePath(pathname: string, target: Locale): string {
  const path = pathname || "/";
  const allowed = localesForPath(path);
  if (!allowed || allowed.includes(target)) return path;
  if (path.startsWith("/blog/") && localesForPath("/blog")?.includes(target)) return "/blog";
  return "/";
}

export function getIndexableRoutes(): SiteRoute[] {
  const landings: SiteRoute[] = LANDING_ROUTES.map((route) => ({
    pathname: `/${route.slug}`,
    locales: route.locales,
    label: route.label,
    priority: route.priority,
    changeFrequency: "monthly",
  }));
  return [...STATIC_ROUTES, ...landings];
}
