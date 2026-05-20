import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

/** SEO metadata for French-only inner pages (canonical `/fr` path). */
export function frenchPageMetadata(
  path: `/${string}`,
  title: string,
  description: string
): Metadata {
  const canonical = absoluteUrl("fr", path);

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title: `${title} | AEROVENTIS`,
      description,
      url: canonical,
      type: "article",
      locale: "fr_MA",
      siteName: "AEROVENTIS",
    },
  };
}
