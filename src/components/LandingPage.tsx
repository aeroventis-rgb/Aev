"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  AirVent,
  Award,
  Building2,
  Check,
  Droplets,
  Fan,
  Headphones,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Shield,
  Snowflake,
  Thermometer,
  Users,
  Wind,
  Wrench,
  LayoutGrid,
  Package,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { PartnerLogos } from "@/components/PartnerLogos";
import { BRAND_SLIDES } from "@/lib/brand-slides";
import { BRAND_LOGO_SRC, IMAGES, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";
import { localesForPath } from "@/lib/routes";

type Props = {
  contactQrDataUrl: string;
};

const solutions = [
  { key: "gainable", href: "/climatisation-gainable", Icon: AirVent },
  { key: "split", href: "/climatisation", Icon: Thermometer },
  { key: "cassette", href: null, Icon: LayoutGrid },
  { key: "ventilation", href: "/ventilation", Icon: Fan },
  { key: "plumbing", href: "/plomberie", Icon: Droplets },
  { key: "maintenance", href: "/entretien-climatisation-casablanca", Icon: Wrench },
  { key: "extraction", href: "/extraction", Icon: Wind },
  { key: "smoke", href: "/desenfumage", Icon: Shield },
  { key: "cooling", href: null, Icon: Snowflake },
] as const;

const steps = ["1", "2", "3", "4", "5", "6"] as const;

const works = [
  { key: "workGainable", href: "/climatisation-gainable", src: BRAND_SLIDES.gainable },
  { key: "workVentilation", href: "/ventilation", src: BRAND_SLIDES.ventilation },
  { key: "workInstall", href: "/climatisation", src: BRAND_SLIDES.installation },
] as const;

function serviceHref(locale: Locale, path: string | null) {
  if (!path) return null;
  const allowed = localesForPath(path);
  if (allowed && !allowed.includes(locale)) return null;
  return path;
}

function BlueprintSketch({ label }: { label: string }) {
  return (
    <figure className="rounded-2xl bg-[#f4f8fc] p-6">
      <svg viewBox="0 0 360 240" className="h-auto w-full text-brand-blue/80" aria-hidden>
        <rect x="16" y="16" width="328" height="208" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 112 H210 V16" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M210 112 H344" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M120 112 V224" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="40" y="36" width="48" height="28" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <rect x="236" y="140" width="72" height="40" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M150 48 h36 M168 30 v36" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M70 160 h28 M84 146 v28" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
      <figcaption className="mt-3 text-xs leading-relaxed text-brand-navy/60">{label}</figcaption>
    </figure>
  );
}

export function LandingPage({ contactQrDataUrl }: Props) {
  const t = useTranslations("home");
  const tn = useTranslations("nav");
  const tf = useTranslations("footer");
  const ti = useTranslations("images");
  const tb = useTranslations("brand");
  const locale = useLocale() as Locale;
  const planUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(t("planMessage"))}`;

  const trust = [
    { key: "experience", label: t("trustExperience"), Icon: Award },
    { key: "projects", label: t("trustProjects"), Icon: Building2 },
    { key: "teams", label: t("trustTeams"), Icon: Users },
    { key: "equipment", label: t("trustEquipment"), Icon: Package },
    { key: "service", label: t("trustService"), Icon: Headphones },
  ];

  const footerNav = [
    { label: tn("home"), href: "/" as const },
    { label: tn("services"), href: serviceHref(locale, "/nos-services") ?? ({ pathname: "/", hash: "solutions" } as const) },
    { label: tn("projects"), href: { pathname: "/", hash: "realisations" } as const },
    { label: tn("about"), href: serviceHref(locale, "/qui-sommes-nous") ?? ({ pathname: "/", hash: "a-propos" } as const) },
    { label: tn("coverage"), href: serviceHref(locale, "/zone-intervention") ?? ({ pathname: "/", hash: "zone" } as const) },
    { label: tn("contact"), href: "/contact" as const },
    { label: tf("blog"), href: "/blog" as const },
  ];

  const footerServices = [
    { label: tf("climatisation"), href: "/climatisation" },
    { label: tf("ventilation"), href: "/ventilation" },
    { label: tf("extraction"), href: "/extraction" },
    { label: tf("smoke"), href: "/desenfumage" },
    { label: tf("plumbing"), href: "/plomberie" },
    { label: t("coolingTitle"), href: null },
    { label: t("maintenanceTitle"), href: "/entretien-climatisation-casablanca" },
  ];

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <SiteNav />

      <main id="main-content">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
          <div>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.15] tracking-tight text-brand-navy md:text-5xl">
              {t("heroTitleLead")}
              <span className="mt-1 block text-brand-blue">{t("heroTitleAccent")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-navy/75 md:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={planUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 text-sm font-semibold text-white transition hover:bg-brand-navy"
              >
                <Send className="h-4 w-4" aria-hidden />
                {t("sendPlan")}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d7e3f0] bg-white px-5 text-sm font-semibold text-brand-navy transition hover:border-brand-blue/40"
              >
                <MessageCircle className="h-4 w-4 text-[#1fad5a]" aria-hidden />
                {t("whatsapp")}
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#d7e3f0] bg-white px-5 text-sm font-semibold text-brand-navy transition hover:border-brand-blue/40"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span>
                  {t("call")} <span dir="ltr">{PHONE_DISPLAY}</span>
                </span>
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-brand-navy/70">
              <MapPin className="h-4 w-4 text-brand-blue" aria-hidden />
              {t("heroCities")}
            </p>
          </div>

          <figure>
            <Image
              src={IMAGES.heroVilla}
              alt={ti("hero")}
              width={1600}
              height={1066}
              priority
              className="h-auto w-full rounded-2xl object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <figcaption className="mt-3 text-sm leading-relaxed text-brand-navy/60">{t("heroCaption")}</figcaption>
          </figure>
        </section>

        <section className="border-y border-[#e6eef6] bg-[#f7f9fc]" aria-label={t("trustExperience")}>
          <ul className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
            {trust.map(({ key, label, Icon }) => (
              <li key={key} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-brand-navy">{label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="solutions" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-brand-navy">{t("solutionsTitle")}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map(({ key, href, Icon }) => {
              const page = serviceHref(locale, href);
              return (
                <article key={key} className="rounded-2xl border border-[#e6eef6] bg-white p-6 shadow-[0_10px_30px_-22px_rgba(2,47,112,0.45)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef5fc] text-brand-blue">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-brand-navy">{t(`${key}Title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">{t(`${key}Body`)}</p>
                  {page ? (
                    <Link href={page} className="mt-4 inline-flex text-sm font-semibold text-brand-blue hover:underline">
                      {t("viewService")}
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8 lg:pb-20">
          <div className="grid items-center gap-8 rounded-3xl border border-[#e6eef6] bg-white p-6 shadow-[0_10px_30px_-22px_rgba(2,47,112,0.35)] md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <BlueprintSketch label={t("planSketch")} />
            <div>
              <h2 className="text-2xl font-semibold leading-snug tracking-tight text-brand-navy md:text-3xl">
                {t("planTitle")} <span className="text-brand-blue">{t("planAccent")}</span>
              </h2>
              <ul className="mt-6 space-y-3">
                {(["planSurfaces", "planPower", "planLayout", "planAir"] as const).map((key) => (
                  <li key={key} className="flex items-start gap-3 text-sm text-brand-navy/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
                    {t(key)}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={planUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#1fad5a] px-5 text-sm font-semibold text-white transition hover:bg-[#188a48]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t("planWhatsapp")}
                </a>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 text-sm font-semibold text-white transition hover:bg-brand-navy"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  <span dir="ltr">{PHONE_DISPLAY}</span>
                </a>
              </div>
              <p className="mt-3 text-xs text-brand-navy/60">{t("planReply")}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-4 pb-16 lg:px-8 lg:pb-20">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-brand-navy">{t("methodTitle")}</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step) => (
              <li key={step}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-sm font-semibold text-white">
                  {step}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-brand-navy">{t(`step${step}Title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">{t(`step${step}Body`)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="realisations" className="scroll-mt-28 border-t border-[#e6eef6] bg-[#f7f9fc] py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-brand-navy">{t("projectsTitle")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-brand-navy/70">
              {t("illustration")}
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {works.map((work) => {
                const page = serviceHref(locale, work.href);
                return (
                  <article key={work.key} className="overflow-hidden rounded-2xl border border-[#e6eef6] bg-white">
                    <Image
                      src={work.src}
                      alt={`${t("illustration")} ${t(work.key)}`}
                      width={1600}
                      height={900}
                      className="h-auto w-full"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-brand-navy">{t(work.key)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">{t("illustration")}</p>
                      {page ? (
                        <Link href={page} className="mt-4 inline-flex text-sm font-semibold text-brand-blue hover:underline">
                          {t("viewService")}
                        </Link>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <PartnerLogos title={t("partnersTitle")} />

        <section className="bg-brand-navy text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center lg:px-8">
            <h2 className="max-w-xl text-2xl font-semibold leading-snug md:text-3xl">
              {t("bandTitle")} {t("bandAccent")}
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#1fad5a] px-5 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t("whatsapp")}
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-brand-navy"
              >
                {tn("study")}
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-5 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {t("call")}
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-brand-ink text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
            <div id="a-propos" className="scroll-mt-28">
              <Image
                src={BRAND_LOGO_SRC}
                alt=""
                width={1536}
                height={1536}
                className="h-16 w-auto rounded-md bg-white"
              />
              <p className="mt-4 text-sm leading-relaxed text-white/75">{t("footerBlurb")}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold">{t("footerNav")}</h2>
              <ul className="mt-4 space-y-2">
                {footerNav.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-white/75 transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold">{t("footerServices")}</h2>
              <ul className="mt-4 space-y-2">
                {footerServices.map((item) => {
                  const page = serviceHref(locale, item.href);
                  return (
                    <li key={item.label} className="text-sm text-white/75">
                      {page ? (
                        <Link href={page} className="transition hover:text-white">
                          {item.label}
                        </Link>
                      ) : (
                        item.label
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div id="zone" className="scroll-mt-28">
              <h2 className="text-sm font-semibold">{t("footerContact")}</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                <li>
                  <a href={`tel:${PHONE_E164}`} className="hover:text-white" dir="ltr">
                    +212 6 60 98 96 98
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {t("whatsapp")}
                  </a>
                </li>
                <li>{t("footerCity")}</li>
                <li>{t("footerAlso")}</li>
                <li>{t("footerHours")}</li>
              </ul>
              <Image
                src={contactQrDataUrl}
                alt={t("planWhatsapp")}
                width={96}
                height={96}
                unoptimized
                className="mt-5 rounded-md bg-white p-1.5"
              />
            </div>
          </div>
          <div className="border-t border-white/10">
            <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-5 py-5 text-xs text-white/60 lg:px-8">
              <li>
                <Link href="/mentions-legales" className="hover:text-white">
                  {tn("legal")}
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="hover:text-white">
                  {tn("privacy")}
                </Link>
              </li>
              {locale === "fr" ? (
                <li>
                  <Link href="/plan-du-site" className="hover:text-white">
                    {t("sitemap")}
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </footer>
      </main>
    </div>
  );
}
