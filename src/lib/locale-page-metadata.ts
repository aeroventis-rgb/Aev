import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { BRAND_LOGO_SRC } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site";

export function localePageMetadata(
  locale: Locale,
  path: `/${string}`,
  title: string,
  description: string
): Metadata {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, absoluteUrl(l, path)])
  ) as Record<string, string>;
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);

  const ogLocale =
    locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl(locale, path),
      languages,
    },
    openGraph: {
      title: `${title} | AEROVENTIS`,
      description,
      url: absoluteUrl(locale, path),
      type: "website",
      locale: ogLocale,
      siteName: "AEROVENTIS",
      images: [{ url: BRAND_LOGO_SRC, alt: "AEROVENTIS" }],
    },
    twitter: {
      card: "summary",
      title: `${title} | AEROVENTIS`,
      description,
      images: [BRAND_LOGO_SRC],
    },
    icons: {
      icon: [{ url: BRAND_LOGO_SRC, type: "image/jpeg" }],
      apple: [{ url: BRAND_LOGO_SRC, type: "image/jpeg" }],
    },
  };
}
