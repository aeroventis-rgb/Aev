import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

/** SEO metadata for a page that exists in every locale. */
export function localePageMetadata(
  locale: Locale,
  path: `/${string}`,
  title: string,
  description: string
): Metadata {
  return buildPageMetadata({
    locale,
    pathname: path,
    title,
    description,
    locales: routing.locales,
  });
}
