import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedPosts } from "@/lib/blog";
import { frenchPageMetadata } from "@/lib/french-page-metadata";
import { getIndexableRoutes } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  const t = await getTranslations({ locale: "fr", namespace: "SiteMapPage" });
  return frenchPageMetadata("/plan-du-site", t("metaTitle"), t("metaDescription"));
}

export default async function PlanDuSitePage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  const t = await getTranslations({ locale: "fr", namespace: "SiteMapPage" });
  const nav = await getTranslations({ locale: "fr", namespace: "nav" });
  const routes = getIndexableRoutes().filter((route) => route.locales.includes("fr"));
  const posts = getPublishedPosts("fr");

  return (
    <div className="min-h-screen bg-brand-off text-brand-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: nav("home"), url: absoluteUrl("fr", "/") },
          { name: t("heading"), url: absoluteUrl("fr", "/plan-du-site") },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <nav aria-label={nav("backHome")}>
          <Link
            href="/"
            className="inline-flex text-sm font-bold text-brand-blue underline-offset-4 transition hover:text-brand-navy hover:underline"
          >
            ← {nav("backHome")}
          </Link>
        </nav>

        <article className="section-surface mt-10 rounded-md px-6 py-10 shadow-brand-lg md:px-10 md:py-12">
          <header className="border-b border-brand-silver pb-8">
            <h1 className="text-2xl font-black uppercase tracking-tight text-brand-ink md:text-3xl">
              {t("heading")}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-navy/80 md:text-base">{t("intro")}</p>
          </header>

          <ul className="mt-10 flex flex-col gap-3">
            {routes.map((route) => (
              <li key={route.pathname}>
                <Link
                  href={route.pathname}
                  className="inline-flex min-h-[44px] items-center text-sm font-bold uppercase tracking-wide text-brand-blue transition hover:text-brand-navy"
                >
                  {route.label}
                </Link>
              </li>
            ))}
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex min-h-[44px] items-center text-sm font-bold text-brand-blue transition hover:text-brand-navy"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
