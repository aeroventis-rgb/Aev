import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { getPublishedPost, getPublishedPosts, markdownToPlain } from "@/lib/blog";
import { isLocale } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ locale: post.locale, slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = isLocale(locale) ? getPublishedPost(locale, slug) : undefined;
  if (!post) notFound();
  return buildPageMetadata({
    locale: post.locale,
    pathname: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    locales: [post.locale],
    type: "article",
    keywords: post.keywords,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPublishedPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const url = absoluteUrl(locale, `/blog/${post.slug}`);
  const crumbs = [
    { name: nav("home"), url: absoluteUrl(locale, "/") },
    { name: t("heading"), url: absoluteUrl(locale, "/blog") },
    { name: post.title, url },
  ];
  const schemas = [
    articleJsonLd({
      headline: post.title,
      description: post.description,
      url,
      datePublished: post.date,
      inLanguage: post.locale,
    }),
    breadcrumbJsonLd(crumbs),
  ];
  if (post.faqs.length) {
    schemas.push(
      faqJsonLd(
        post.faqs.map((faq) => ({
          question: faq.question,
          answer: markdownToPlain(faq.answer),
        }))
      )
    );
  }

  return (
    <div className="min-h-screen bg-brand-off text-brand-ink">
      <JsonLd data={schemas} />
      <div className="mx-auto max-w-[1360px] px-4 pt-6 sm:px-6 lg:px-10">
        <SiteNav />
        <article className="mx-auto max-w-3xl pb-20">
          <Breadcrumbs
            label={t("breadcrumbLabel")}
            items={[
              { name: nav("home"), pathname: "/" },
              { name: t("heading"), pathname: "/blog" },
              { name: post.title },
            ]}
          />
          <header className="border-b border-brand-silver pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">
              <time dateTime={post.date}>{post.date}</time>
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-brand-ink md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-navy/80 md:text-base">{post.description}</p>
          </header>
          <MarkdownBody markdown={post.body} />
          {post.faqs.length ? (
            <section className="mt-12" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-xl font-black uppercase tracking-wide text-brand-blue">
                FAQ
              </h2>
              <div className="mt-6 flex flex-col gap-6">
                {post.faqs.map((faq) => (
                  <section key={faq.question}>
                    <h3 className="text-base font-black text-brand-ink">{faq.question}</h3>
                    <MarkdownBody markdown={faq.answer} />
                  </section>
                ))}
              </div>
            </section>
          ) : null}
          <p className="mt-12">
            <Link href="/blog" className="font-bold text-brand-blue underline-offset-4 hover:underline">
              ← {t("heading")}
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}
