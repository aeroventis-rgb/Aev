import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { getIndexableRoutes } from "@/lib/routes";
import { hreflangLanguages } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of getIndexableRoutes()) {
    const languages = hreflangLanguages(route.pathname, route.locales);
    for (const locale of route.locales) {
      entries.push({
        url: absoluteUrl(locale, route.pathname),
        lastModified,
        priority: route.priority,
        changeFrequency: route.changeFrequency,
        alternates: { languages },
      });
    }
  }

  for (const post of getPublishedPosts()) {
    const pathname = `/blog/${post.slug}`;
    const locales = [post.locale] as Locale[];
    entries.push({
      url: absoluteUrl(post.locale, pathname),
      lastModified: new Date(`${post.date}T00:00:00.000Z`),
      priority: 0.6,
      changeFrequency: "monthly",
      alternates: { languages: hreflangLanguages(pathname, locales) },
    });
  }

  return entries;
}
