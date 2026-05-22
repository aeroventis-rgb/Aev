import Image from "next/image";
import {
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { PHONE_E164, WHATSAPP_URL } from "@/lib/constants";

type Props = {
  contactQrDataUrl: string;
};

const CITY_KEYS = ["casa", "rabat", "marrakech"] as const;

export async function ContactPageView({ contactQrDataUrl }: Props) {
  const t = await getTranslations("ContactPage");
  const tc = await getTranslations("cta");

  return (
    <div className="min-h-screen bg-brand-off pb-12">
      <div className="mx-auto max-w-[1360px] px-4 pt-6 sm:px-6 lg:px-10">
        <SiteNav />

        <header className="section-navy relative mt-6 overflow-hidden rounded-md px-6 py-12 sm:px-10 sm:py-14 md:py-16">
          <div className="absolute inset-x-0 top-0 z-[1] h-[3px] brand-gradient" aria-hidden />
          <div
            className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -start-16 h-56 w-56 rounded-full bg-brand-silver/10 blur-3xl"
            aria-hidden
          />

          <div className="relative z-[2] mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-brand-blue-light">
              AEROVENTIS
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight text-brand-white sm:text-4xl md:text-5xl">
              {t("heading")}
            </h1>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-silver sm:text-base">
              {t("subheading")}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-brand-silver md:text-base">
              {t("intro")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[t("quoteBadge"), t("guaranteeBadge"), t("coverageBadge")].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-blue-light/30 bg-brand-ink/40 px-4 py-2 text-[10px] font-black uppercase tracking-wide text-brand-white sm:text-[11px]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-brand-blue-light" aria-hidden />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="relative z-10 -mt-8 mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
          <a
            href={`tel:${PHONE_E164}`}
            className="group section-surface flex flex-col items-center rounded-md border border-brand-silver px-8 py-10 text-center shadow-brand-lg transition hover:border-brand-blue/40 hover:shadow-brand-lg"
          >
            <span className="brand-gradient flex h-24 w-24 items-center justify-center rounded-full border-[5px] border-brand-silver shadow-brand-md transition group-hover:scale-105">
              <Phone className="h-12 w-12 text-brand-white" aria-hidden />
            </span>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.3em] text-brand-blue">
              {t("phoneLabel")}
            </p>
            <p className="mt-2 font-black text-brand-ink [font-size:clamp(1.75rem,4vw,2.5rem)]">
              {tc("phone")}
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand-navy/70">
              {tc("callNow")}
            </p>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group section-surface flex flex-col items-center rounded-md border border-brand-silver px-8 py-10 text-center shadow-brand-lg transition hover:border-brand-blue/40 hover:shadow-brand-lg"
          >
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-[5px] border-brand-silver bg-brand-navy shadow-brand-md transition group-hover:scale-105 group-hover:bg-brand-ink">
              <MessageCircle className="h-12 w-12 text-brand-white" aria-hidden />
            </span>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.3em] text-brand-blue">
              {t("whatsappLabel")}
            </p>
            <p className="mt-2 text-lg font-black uppercase tracking-wide text-brand-ink md:text-xl">
              {tc("whatsapp")}
            </p>
            <p className="mt-3 text-sm font-semibold text-brand-navy/70">{tc("quote")}</p>
          </a>
        </section>

        <section className="mx-auto mt-14 max-w-5xl">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-1 w-14 shrink-0 rounded-full bg-gradient-to-r from-brand-blue via-brand-blue-light to-transparent" />
            <h2 className="text-xl font-black uppercase tracking-wide text-brand-ink md:text-2xl">
              {t("citiesTitle")}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {CITY_KEYS.map((key) => (
              <article
                key={key}
                className="section-surface rounded-md border border-brand-silver p-6 shadow-brand-sm transition hover:border-brand-blue/35 hover:shadow-brand-md"
              >
                <MapPin className="h-8 w-8 text-brand-blue" aria-hidden />
                <h3 className="mt-4 text-sm font-black uppercase tracking-wide text-brand-ink">
                  {t(key)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">{t(`${key}Desc`)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div className="section-surface rounded-md border border-brand-silver p-8 shadow-brand-md">
            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-9 w-9 shrink-0 text-brand-blue" aria-hidden />
              <div>
                <h2 className="text-lg font-black uppercase tracking-wide text-brand-ink">
                  {t("hoursTitle")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">{t("hoursBody")}</p>
              </div>
            </div>
            <div className="mt-8 flex items-start gap-4 border-t border-brand-silver pt-8">
              <Zap className="mt-1 h-9 w-9 shrink-0 text-brand-blue" aria-hidden />
              <div>
                <h2 className="text-lg font-black uppercase tracking-wide text-brand-ink">
                  {t("responseTitle")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">{t("responseBody")}</p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-md brand-gradient px-5 py-4">
              <ShieldCheck className="h-6 w-6 shrink-0 text-brand-white" aria-hidden />
              <p className="text-xs font-black uppercase tracking-wide text-brand-white">
                {t("guaranteeBadge")} · {t("quoteBadge")}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-md border border-brand-silver bg-brand-white p-8 shadow-brand-lg">
            <p className="text-center text-xs font-black uppercase tracking-[0.25em] text-brand-blue">
              {t("scanTitle")}
            </p>
            <Image
              src={contactQrDataUrl}
              alt={tc("scanQr")}
              width={176}
              height={176}
              className="mt-5 rounded-md border-2 border-brand-silver bg-brand-white p-3 shadow-brand-sm"
              unoptimized
            />
            <p className="mt-4 max-w-[14rem] text-center text-[11px] font-semibold uppercase leading-snug tracking-wide text-brand-navy/65">
              {tc("scanQr")}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
