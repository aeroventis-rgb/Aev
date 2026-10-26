import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

const BRAND = "AEROVENTIS";
const TRAILING_BRAND = new RegExp(`\\s*\\|\\s*${BRAND}\\s*$`, "i");

/** One brand suffix. Titles that already name AEROVENTIS are left unchanged. */
export function composeTitle(title: string): string {
  let cleaned = title.trim();
  while (TRAILING_BRAND.test(cleaned)) {
    cleaned = cleaned.replace(TRAILING_BRAND, "").trim();
  }
  if (new RegExp(BRAND, "i").test(cleaned)) return cleaned;
  return `${cleaned} | ${BRAND}`;
}

export function ogLocale(locale: string): string {
  if (locale === "ar") return "ar_MA";
  if (locale === "en") return "en_US";
  return "fr_MA";
}

export function hreflangLanguages(
  pathname: string,
  locales: readonly Locale[]
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(locale, pathname);
  }
  const xDefault = locales.includes(routing.defaultLocale)
    ? routing.defaultLocale
    : locales[0];
  if (xDefault) languages["x-default"] = absoluteUrl(xDefault, pathname);
  return languages;
}

export function buildPageMetadata(input: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  locales: readonly Locale[];
  type?: "website" | "article";
  index?: boolean;
  keywords?: string[];
}): Metadata {
  const fullTitle = composeTitle(input.title);
  const canonical = absoluteUrl(input.locale, input.pathname);
  const languages = hreflangLanguages(input.pathname, input.locales);

  return {
    title: { absolute: fullTitle },
    description: input.description,
    keywords: input.keywords,
    robots: { index: input.index !== false, follow: true },
    alternates: { canonical, languages },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url: canonical,
      type: input.type ?? "website",
      locale: ogLocale(input.locale),
      alternateLocale: input.locales
        .filter((locale) => locale !== input.locale)
        .map((locale) => ogLocale(locale)),
      siteName: BRAND,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: input.description,
    },
  };
}
