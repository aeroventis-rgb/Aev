import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { BLOG_PAGE_SIZE, getPublishedPosts } from "@/lib/blog";
import { isLocale, localesForPath } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/schema";
import { absoluteUrl, localePath } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

function pageCount(locale: Locale) {
  return Math.max(1, Math.ceil(getPublishedPosts(locale).length / BLOG_PAGE_SIZE));
}

function parsePage(raw: string | undefined, total: number) {
  if (!raw) return 1;
  if (!/^[1-9]\d*$/.test(raw)) return null;
  const value = Number(raw);
  if (value > total) return null;
  return value;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const query = await searchParams;
  if (!isLocale(locale)) notFound();
  const total = pageCount(locale);
  const current = parsePage(query.page, total);
  if (!current) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const blogLocales = (localesForPath("/blog") ?? []).filter(isLocale);
  const locales = blogLocales.filter((item) => current <= pageCount(item));
  const title = current > 1 ? `${t("metaTitle")} — ${current}` : t("metaTitle");
  const metadata = buildPageMetadata({
    locale,
    pathname: "/blog",
    title,
    description: t("metaDescription"),
    locales: locales.length ? locales : [locale],
  });

  if (current > 1) {
    const canonical = `${absoluteUrl(locale, "/blog")}?page=${current}`;
    metadata.alternates = {
      ...metadata.alternates,
      canonical,
    };
    if (metadata.openGraph) metadata.openGraph.url = canonical;
  }

  return metadata;
}

export default async function BlogIndexPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;
  if (!isLocale(locale)) notFound();
  if (query.page === "1") permanentRedirect(localePath(locale, "/blog"));

  const total = pageCount(locale);
  const current = parsePage(query.page, total);
  if (!current) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const posts = getPublishedPosts(locale);
  const slice = posts.slice((current - 1) * BLOG_PAGE_SIZE, current * BLOG_PAGE_SIZE);
  const crumbs = [
    { name: nav("home"), pathname: "/" },
    { name: t("heading") },
  ];

  return (
    <div className="min-h-screen bg-brand-off text-brand-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: nav("home"), url: absoluteUrl(locale, "/") },
          { name: t("heading"), url: absoluteUrl(locale, "/blog") },
        ])}
      />
      <div className="mx-auto max-w-[1360px] px-4 pt-6 sm:px-6 lg:px-10">
        <SiteNav />
        <div className="mx-auto max-w-3xl pb-20">
          <Breadcrumbs items={crumbs} label={t("breadcrumbLabel")} />
          <header className="border-b border-brand-silver pb-8">
            <h1 className="text-3xl font-black uppercase tracking-tight text-brand-ink md:text-4xl">
              {t("heading")}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-navy/80 md:text-base">{t("intro")}</p>
          </header>

          {slice.length === 0 ? (
            <div className="mt-10">
              <p className="text-sm leading-relaxed text-brand-navy/80 md:text-base">{t("empty")}</p>
              {locale === "fr" ? (
                <ul className="mt-6 flex flex-col gap-2">
                  <li>
                    <Link href="/climatisation-casablanca" className="font-bold text-brand-blue hover:underline">
                      Climatisation à Casablanca
                    </Link>
                  </li>
                  <li>
                    <Link href="/climatisation-rabat" className="font-bold text-brand-blue hover:underline">
                      Climatisation à Rabat
                    </Link>
                  </li>
                  <li>
                    <Link href="/climatisation-marrakech" className="font-bold text-brand-blue hover:underline">
                      Climatisation à Marrakech
                    </Link>
                  </li>
                </ul>
              ) : null}
            </div>
          ) : (
            <ul className="mt-10 flex flex-col gap-6">
              {slice.map((post) => (
                <li key={post.slug} className="rounded-md border border-brand-silver bg-brand-white p-6 shadow-brand-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">
                    <time dateTime={post.date}>{post.date}</time>
                  </p>
                  <h2 className="mt-2 text-xl font-black text-brand-ink">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-blue">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{post.description}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex font-bold text-brand-blue underline-offset-4 hover:underline"
                  >
                    {t("read")}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {total > 1 ? (
            <nav className="mt-10 flex items-center justify-between gap-4" aria-label={t("pagination")}>
              {current > 1 ? (
                <Link
                  href={
                    current === 2
                      ? "/blog"
                      : { pathname: "/blog", query: { page: String(current - 1) } }
                  }
                  className="font-bold text-brand-blue hover:underline"
                  rel="prev"
                >
                  {t("previous")}
                </Link>
              ) : (
                <span />
              )}
              <p className="text-sm font-semibold text-brand-navy/70">
                {t("pageStatus", { page: current, total })}
              </p>
              {current < total ? (
                <Link
                  href={{ pathname: "/blog", query: { page: String(current + 1) } }}
                  className="font-bold text-brand-blue hover:underline"
                  rel="next"
                >
                  {t("next")}
                </Link>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  );
}
