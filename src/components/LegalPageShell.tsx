import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteNav } from "@/components/SiteNav";
import { breadcrumbJsonLd } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

type Block = { titleKey: string; bodyKey: string; href?: `/${string}` };

type Props = {
  namespace: string;
  blocks: Block[];
  pathname: `/${string}`;
};

export async function LegalPageShell({ namespace, blocks, pathname }: Props) {
  const t = await getTranslations({ locale: "fr", namespace });
  const nav = await getTranslations({ locale: "fr", namespace: "nav" });
  const crumbs = [
    { name: nav("home"), url: absoluteUrl("fr", "/") },
    { name: t("heading"), url: absoluteUrl("fr", pathname) },
  ];

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <SiteNav />
      <div className="mx-auto max-w-[1100px] px-5 pt-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl pb-16">
        <nav aria-label={nav("backHome")} className="pt-6">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm text-brand-blue underline-offset-4 transition hover:text-brand-navy hover:underline"
          >
            ← {nav("backHome")}
          </Link>
        </nav>

        <article className="mt-8">
          <header className="border-b border-brand-silver pb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
              {t("heading")}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-brand-navy/80">{t("intro")}</p>
          </header>

          <div className="mt-10 flex flex-col gap-10">
            {blocks.map(({ titleKey, bodyKey, href }) => (
              <section key={titleKey}>
                <h2 className="text-lg font-semibold text-brand-ink">
                  {t(titleKey)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75 md:text-base">{t(bodyKey)}</p>
                {href ? (
                  <p className="mt-3">
                    <Link href={href} className="inline-flex min-h-11 items-center font-bold text-brand-blue underline-offset-4 hover:underline">
                      Voir la page
                    </Link>
                  </p>
                ) : null}
              </section>
            ))}
          </div>
        </article>
        </div>
      </div>
    </div>
  );
}
