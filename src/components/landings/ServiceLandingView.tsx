import { Phone, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from "@/lib/constants";
import { COMPARISON_ROWS, PROCESS_TITLES } from "@/lib/landings/shared";
import type { LandingPage } from "@/lib/landings/pages";

export async function ServiceLandingView({ page }: { page: LandingPage }) {
  const tc = await getTranslations("cta");

  return (
    <div className="min-h-screen bg-brand-off text-brand-ink">
      <div className="mx-auto max-w-[1360px] px-4 pt-6 sm:px-6 lg:px-10">
        <SiteNav />
        <article className="mx-auto max-w-4xl pb-20">
          <Breadcrumbs items={page.breadcrumbs} />
          <header className="section-surface rounded-md border border-brand-silver px-6 py-10 shadow-brand md:px-10">
            <h1 className="text-3xl font-black uppercase leading-tight tracking-tight text-brand-ink md:text-4xl">
              {page.h1}
            </h1>
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-brand-navy/80 md:text-base">
              {page.lead.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </header>

          <section className="mt-10" aria-labelledby="services-heading">
            <h2 id="services-heading" className="text-xl font-black uppercase tracking-wide text-brand-blue">
              Services
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/80 md:text-base">{page.servicesIntro}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {page.services.map((service) => (
                <section key={service.title} className="rounded-md border border-brand-silver bg-brand-white p-5 shadow-brand-sm">
                  <h3 className="text-sm font-black uppercase tracking-wide text-brand-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{service.body}</p>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="comparison-heading">
            <h2 id="comparison-heading" className="text-xl font-black uppercase tracking-wide text-brand-blue">
              Split, gainable et VRV
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/80 md:text-base">{page.comparisonIntro}</p>
            <div className="mt-6 overflow-x-auto rounded-md border border-brand-silver bg-brand-white shadow-brand-sm">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-brand-navy text-brand-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Critère
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Split mural
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Gainable
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      VRV / DRV
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label} className="border-t border-brand-silver align-top">
                      <th scope="row" className="px-4 py-3 font-bold text-brand-ink">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-brand-navy/80">{row.split}</td>
                      <td className="px-4 py-3 text-brand-navy/80">{row.gainable}</td>
                      <td className="px-4 py-3 text-brand-navy/80">{row.vrv}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-brand-silver align-top">
                    <th scope="row" className="px-4 py-3 font-bold text-brand-ink">
                      Sur ce secteur
                    </th>
                    <td className="px-4 py-3 text-brand-navy/80">{page.localFit.split}</td>
                    <td className="px-4 py-3 text-brand-navy/80">{page.localFit.gainable}</td>
                    <td className="px-4 py-3 text-brand-navy/80">{page.localFit.vrv}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12" aria-labelledby="process-heading">
            <h2 id="process-heading" className="text-xl font-black uppercase tracking-wide text-brand-blue">
              Déroulé
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/80 md:text-base">{page.processIntro}</p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {PROCESS_TITLES.map((title, index) => (
                <li key={title} className="rounded-md border border-brand-silver bg-brand-white p-5 shadow-brand-sm">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">
                    {index + 1}. {title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/80">{page.process[index]}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl font-black uppercase tracking-wide text-brand-blue">
              Questions fréquentes
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {page.faqs.map((faq) => (
                <section key={faq.question}>
                  <h3 className="text-base font-black text-brand-ink">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/80">{faq.answer}</p>
                </section>
              ))}
            </div>
          </section>

          <nav className="mt-12" aria-label="Pages liées">
            <h2 className="text-xl font-black uppercase tracking-wide text-brand-blue">Pages liées</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {page.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-bold text-brand-blue underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="section-navy mt-12 rounded-md px-6 py-8 text-brand-white md:px-10" aria-labelledby="cta-heading">
            <h2 id="cta-heading" className="text-xl font-black uppercase tracking-wide">
              Parler du projet
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-silver">
              Indiquez la ville, le quartier et le type de logement. Un technicien convient d&apos;une visite pour voir les lieux.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${PHONE_E164}`}
                className="brand-gradient inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-black uppercase tracking-wide text-brand-white"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {tc("callNow")} · {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-brand-blue-light/40 bg-brand-white/10 px-6 py-3 text-sm font-black uppercase tracking-wide text-brand-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {tc("whatsapp")}
              </a>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
