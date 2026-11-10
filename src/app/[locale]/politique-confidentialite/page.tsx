import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { localePageMetadata } from "@/lib/locale-page-metadata";
import { breadcrumbJsonLd } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "LegalPrivacy" });

  return localePageMetadata(
    loc,
    "/politique-confidentialite",
    t("metaTitle"),
    t("metaDescription")
  );
}

export default async function PolitiqueConfidentialitePage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "LegalPrivacy" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const blocks = [
    { titleKey: "collectTitle", bodyKey: "collectBody" as const },
    { titleKey: "purposeTitle", bodyKey: "purposeBody" as const },
    { titleKey: "rightsTitle", bodyKey: "rightsBody" as const },
    { titleKey: "cookiesTitle", bodyKey: "cookiesBody" as const },
    { titleKey: "contactTitle", bodyKey: "contactBody" as const },
  ];

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: nav("home"), url: absoluteUrl(loc, "/") },
          { name: t("heading"), url: absoluteUrl(loc, "/politique-confidentialite") },
        ])}
      />
      <SiteNav />
      <div className="mx-auto max-w-[1100px] px-5 pt-6 sm:px-8 lg:px-10">
        <article className="mx-auto max-w-3xl pb-16 pt-6">
        <nav aria-label={nav("backHome")}>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm font-bold text-brand-blue underline-offset-4 transition hover:text-brand-navy hover:underline"
          >
            ← {nav("backHome")}
          </Link>
        </nav>

        <div className="mt-8">
          <header className="border-b border-brand-silver pb-8">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-brand-ink sm:text-3xl">
              {t("heading")}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-navy/80 md:text-base">{t("intro")}</p>
          </header>

          <div className="mt-10 flex flex-col gap-10">
            {blocks.map(({ titleKey, bodyKey }) => (
              <section key={titleKey}>
                <h2 className="text-lg font-semibold text-brand-ink">
                  {t(titleKey)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75 md:text-base">
                  {t(bodyKey)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>
      </div>
    </div>
  );
}
