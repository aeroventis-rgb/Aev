import { Phone, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BrandSlide } from "@/components/BrandSlide";
import { SiteNav } from "@/components/SiteNav";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from "@/lib/constants";
import { COMPARISON_ROWS, PROCESS_TITLES } from "@/lib/landings/shared";
import type { LandingPage } from "@/lib/landings/types";

type CompareRow = {
  label: string;
  split?: string;
  gainable?: string;
  vrv?: string;
};

const COMPARE_SYSTEMS = [
  { key: "split", label: "Split mural" },
  { key: "gainable", label: "Gainable" },
  { key: "vrv", label: "VRV / DRV" },
] as const;

function Comparison({ rows }: { rows: readonly CompareRow[] }) {
  return (
    <>
      <div className="mt-6 flex flex-col gap-3 md:hidden">
        {rows.map((row) => (
          <section key={row.label} className="rounded-md border border-brand-silver bg-white p-4">
            <h3 className="text-base font-semibold text-brand-ink">{row.label}</h3>
            <dl className="mt-3 flex flex-col gap-3">
              {COMPARE_SYSTEMS.map((system) => (
                <div key={system.key}>
                  <dt className="text-sm font-bold text-brand-ink">{system.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-brand-navy/80">{row[system.key]}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <div className="mt-6 hidden overflow-x-auto rounded-md border border-brand-silver bg-white md:block">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-brand-off text-brand-ink">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">
                Critère
              </th>
              {COMPARE_SYSTEMS.map((system) => (
                <th key={system.key} scope="col" className="px-4 py-3 font-bold">
                  {system.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-brand-silver align-top">
                <th scope="row" className="px-4 py-3 font-bold text-brand-ink">
                  {row.label}
                </th>
                {COMPARE_SYSTEMS.map((system) => (
                  <td key={system.key} className="px-4 py-3 text-brand-navy/80">
                    {row[system.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export async function ServiceLandingView({ page }: { page: LandingPage }) {
  const tc = await getTranslations("cta");
  const servicesHeading = page.headings?.services ?? "Services";
  const comparisonHeading =
    page.headings?.comparison ??
    (page.showHvacComparison === false ? "Ce qui se décide sur place" : "Split, gainable et VRV");
  const processHeading = page.headings?.process ?? "Déroulé";
  const faqHeading = page.headings?.faq ?? "Questions fréquentes";

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <SiteNav />
      <div className="mx-auto max-w-[1100px] px-5 pt-6 sm:px-8 lg:px-10">
        <article className="mx-auto max-w-4xl pb-20">
          <Breadcrumbs items={page.breadcrumbs} />
          <header className="border-b border-brand-silver pb-10">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-brand-ink sm:text-3xl md:text-4xl">
              {page.h1}
            </h1>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-brand-navy/80 md:text-base">
              {page.lead.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </header>

          {page.image ? (
            <div className="mt-8">
              <BrandSlide src={page.image.src} alt={page.image.alt} caption={page.image.caption} />
            </div>
          ) : null}

          <section className="mt-10" aria-labelledby="services-heading">
            <h2 id="services-heading" className="text-xl font-semibold tracking-tight text-brand-ink">
              {servicesHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/80 md:text-base">{page.servicesIntro}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {page.services.map((service) => (
                <section key={service.title} className="rounded-md border border-brand-silver bg-white p-6">
                  <h3 className="text-base font-semibold text-brand-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{service.body}</p>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="comparison-heading">
            <h2 id="comparison-heading" className="text-xl font-semibold tracking-tight text-brand-ink">
              {comparisonHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/80 md:text-base">{page.comparisonIntro}</p>
            {page.showHvacComparison === false ? (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {page.points?.map((point) => (
                  <section key={point.title} className="rounded-md border border-brand-silver bg-white p-6">
                    <h3 className="text-base font-semibold text-brand-ink">{point.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{point.body}</p>
                  </section>
                ))}
              </div>
            ) : (
            <Comparison
              rows={[
                ...COMPARISON_ROWS,
                {
                  label: "Sur ce secteur",
                  split: page.localFit?.split,
                  gainable: page.localFit?.gainable,
                  vrv: page.localFit?.vrv,
                },
              ]}
            />
            )}
          </section>

          <section className="mt-12" aria-labelledby="process-heading">
            <h2 id="process-heading" className="text-xl font-semibold tracking-tight text-brand-ink">
              {processHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/80 md:text-base">{page.processIntro}</p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {PROCESS_TITLES.map((title, index) => (
                <li key={title} className="rounded-md border border-brand-silver bg-white p-6">
                  <p className="text-sm font-semibold text-brand-blue">
                    {index + 1}. {title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/80">{page.process[index]}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl font-semibold tracking-tight text-brand-ink">
              {faqHeading}
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {page.faqs.map((faq) => (
                <section key={faq.question}>
                  <h3 className="text-base font-semibold text-brand-ink">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/80">{faq.answer}</p>
                </section>
              ))}
            </div>
          </section>

          <nav className="mt-12" aria-label="Pages liées">
            <h2 className="text-xl font-semibold tracking-tight text-brand-ink">Pages liées</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {page.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center font-bold text-brand-blue underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="mt-16 border-t border-brand-silver pt-10" aria-labelledby="cta-heading">
            <h2 id="cta-heading" className="text-xl font-semibold tracking-tight text-brand-ink">
              Parler du projet
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-navy/75">
              Indiquez la ville, le quartier et le type de logement. Un technicien convient d&apos;une visite pour voir les lieux.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-blue px-5 text-center text-sm font-semibold text-white sm:w-auto"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                <span>
                  {tc("callNow")} · <span dir="ltr">{PHONE_DISPLAY}</span>
                </span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-brand-silver bg-white px-5 text-center text-sm font-semibold text-brand-navy sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                {tc("whatsapp")}
              </a>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
