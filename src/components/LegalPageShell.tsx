import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Block = { titleKey: string; bodyKey: string };

type Props = {
  namespace: string;
  blocks: Block[];
};

export async function LegalPageShell({ namespace, blocks }: Props) {
  const t = await getTranslations({ locale: "fr", namespace });
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

          <div className="mt-10 flex flex-col gap-10">
            {blocks.map(({ titleKey, bodyKey }) => (
              <section key={titleKey}>
                <h2 className="text-base font-black uppercase tracking-wide text-brand-blue md:text-lg">
                  {t(titleKey)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75 md:text-base">{t(bodyKey)}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
