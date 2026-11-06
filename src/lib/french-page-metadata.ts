import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

/** SEO metadata for French-only inner pages: canonical `/fr`, hreflang `fr` + `x-default`. */
export function frenchPageMetadata(
  path: `/${string}`,
  title: string,
  description: string
): Metadata {
  return buildPageMetadata({
    locale: "fr",
    pathname: path,
    title,
    description,
    locales: ["fr"],
  });
}
