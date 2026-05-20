import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "LegalPrivacy" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      absoluteUrl(l as Locale, "/politique-confidentialite"),
    ])
  ) as Record<string, string>;
  languages["x-default"] = absoluteUrl(
    routing.defaultLocale as Locale,
    "/politique-confidentialite"
  );

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl(loc, "/politique-confidentialite"),
      languages,
    },
    openGraph: {
      title: `${t("metaTitle")} | AEROVENTIS`,
      description: t("metaDescription"),
      url: absoluteUrl(loc, "/politique-confidentialite"),
      type: "article",
      locale:
        locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA",
    },
  };
}

export default async function PolitiqueConfidentialitePage({ params }: Props) {
  const { locale } = await params;
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
    <div className="min-h-screen bg-brand-off text-brand-ink">
      <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <nav aria-label={nav("backHome")}>
          <Link
            href="/"
            className="inline-flex text-sm font-bold text-brand-blue underline-offset-4 transition hover:text-brand-navy hover:underline"
          >
            ← {nav("backHome")}
          </Link>
        </nav>

        <div className="section-surface mt-10 rounded-md px-6 py-10 shadow-brand-lg md:px-10 md:py-12">
          <header className="border-b border-brand-silver pb-8">
            <h1 className="text-2xl font-black uppercase tracking-tight text-brand-ink md:text-3xl">
              {t("heading")}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-navy/80 md:text-base">{t("intro")}</p>
          </header>

          <div className="mt-10 flex flex-col gap-10">
            {blocks.map(({ titleKey, bodyKey }) => (
              <section key={titleKey}>
                <h2 className="text-base font-black uppercase tracking-wide text-brand-blue md:text-lg">
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
  );
}
