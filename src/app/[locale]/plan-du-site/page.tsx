import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { frenchPageMetadata } from "@/lib/french-page-metadata";

const SITE_LINKS = [
  { href: "/" as const, labelKey: "linkHome" },
  { href: "/qui-sommes-nous" as const, labelKey: "linkAbout" },
  { href: "/nos-services" as const, labelKey: "linkServices" },
  { href: "/zone-intervention" as const, labelKey: "linkCoverage" },
  { href: "/mentions-legales" as const, labelKey: "linkLegal" },
  { href: "/politique-confidentialite" as const, labelKey: "linkPrivacy" },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "fr", namespace: "SiteMapPage" });
  return frenchPageMetadata("/plan-du-site", t("metaTitle"), t("metaDescription"));
}

export default async function PlanDuSitePage() {
  const t = await getTranslations({ locale: "fr", namespace: "SiteMapPage" });
  const nav = await getTranslations({ locale: "fr", namespace: "nav" });

  return (
    <div className="min-h-screen bg-brand-off text-brand-ink">
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
            {SITE_LINKS.map(({ href, labelKey }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-[44px] items-center text-sm font-bold uppercase tracking-wide text-brand-blue transition hover:text-brand-navy"
                >
                  {t(labelKey)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                className="inline-flex min-h-[44px] items-center text-sm font-bold uppercase tracking-wide text-brand-blue transition hover:text-brand-navy"
              >
                {t("linkContact")}
              </Link>
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}
