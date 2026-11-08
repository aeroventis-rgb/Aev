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
        <section className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:px-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8 lg:px-8 lg:py-12">
          <div className="min-w-0">
            <h1 className="max-w-xl text-[1.7rem] font-semibold leading-[1.2] tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              {t("heroTitleLead")}
              <span className="mt-1 block text-brand-blue">{t("heroTitleAccent")}</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-navy/75 md:mt-5 md:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-6 flex flex-col gap-3 lg:mt-8 lg:flex-row lg:flex-nowrap lg:items-center">
              <a
                href={planUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-blue px-5 text-sm font-semibold text-white transition hover:bg-brand-navy lg:w-auto lg:px-4"
              >
                <Send className="h-4 w-4" aria-hidden />
                {t("sendPlan")}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#d7e3f0] bg-white px-5 text-sm font-semibold text-brand-navy transition hover:border-brand-blue/40 lg:w-auto lg:px-4"
              >
                <MessageCircle className="h-4 w-4 text-[#1fad5a]" aria-hidden />
                {t("whatsapp")}
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#d7e3f0] bg-white px-5 text-sm font-semibold text-brand-navy transition hover:border-brand-blue/40 lg:w-auto lg:px-4"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span>
                  {t("call")} <span dir="ltr">{PHONE_DISPLAY}</span>
                </span>
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-brand-navy/70 lg:mt-6">
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
              className="aspect-[4/3] w-full rounded-2xl object-cover object-[center_72%] lg:aspect-[5/4] lg:max-h-[440px] lg:object-[center_68%]"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <figcaption className="mt-3 text-sm leading-relaxed text-brand-navy/60">{t("heroCaption")}</figcaption>
          </figure>
        </section>

        <section className="border-y border-[#e6eef6] bg-[#f7f9fc]" aria-label={t("trustExperience")}>
          <ul className="mx-auto grid max-w-6xl grid-cols-6 items-start gap-x-2 gap-y-4 px-4 py-5 sm:px-5 lg:grid-cols-5 lg:gap-4 lg:py-6 lg:px-8">
            {trust.map(({ key, label, Icon }, index) => (
              <li
                key={key}
                className={`flex min-w-0 flex-col items-center gap-1.5 text-center lg:flex-row lg:items-center lg:gap-3 lg:text-start ${
                  index < 3 ? "col-span-2 lg:col-span-1" : "col-span-3 lg:col-span-1"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm lg:h-10 lg:w-10">
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden />
                </span>
                <span className="text-[12px] font-medium leading-tight text-brand-navy lg:text-sm">{label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="solutions" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-8 sm:px-5 lg:px-8 lg:py-14">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">{t("solutionsTitle")}</h2>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-3">
            {solutions.map(({ key, href, Icon }) => {
              const page = serviceHref(locale, href);
              return (
                <article key={key} className="flex min-w-0 items-start gap-3 rounded-xl border border-[#e6eef6] bg-white px-3 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef5fc] text-brand-blue">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-snug text-brand-navy">{t(`${key}Title`)}</h3>
                    <p className="mt-1 text-[13px] leading-snug text-brand-navy/70">{t(`${key}Body`)}</p>
                    {page ? (
                      <Link href={page} className="mt-1 inline-flex min-h-11 items-center text-[13px] font-semibold text-brand-blue hover:underline">
                        {t("viewService")}
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-5 lg:px-8 lg:pb-14">
          <div className="grid items-center gap-6 rounded-3xl border border-[#e6eef6] bg-white p-4 shadow-[0_10px_30px_-22px_rgba(2,47,112,0.35)] sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
            <BlueprintSketch label={t("planSketch")} />
            <div className="min-w-0">
              <h2 className="text-xl font-semibold leading-snug tracking-tight text-brand-navy sm:text-2xl md:text-3xl">
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
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1fad5a] px-5 text-sm font-semibold text-white transition hover:bg-[#188a48] sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t("planWhatsapp")}
                </a>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 text-sm font-semibold text-white transition hover:bg-brand-navy sm:w-auto"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  <span dir="ltr">{PHONE_DISPLAY}</span>
                </a>
              </div>
              <p className="mt-3 text-xs text-brand-navy/60">{t("planReply")}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-2 pb-10 sm:px-5 lg:px-8 lg:pb-14">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">{t("methodTitle")}</h2>
          <ol className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 lg:mt-8 lg:grid-cols-6 lg:gap-4">
            {steps.map((step) => (
              <li key={step} className="min-w-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-sm font-semibold text-white">
                  {step}
                </span>
                <h3 className="mt-2 text-[13px] font-semibold leading-snug text-brand-navy">{t(`step${step}Title`)}</h3>
                <p className="mt-1 text-xs leading-snug text-brand-navy/70">{t(`step${step}Body`)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="realisations" className="scroll-mt-24 border-t border-[#e6eef6] bg-[#f7f9fc] py-12 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-8">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">{t("projectsTitle")}</h2>
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
          <div className="mx-auto flex max-w-6xl flex-col items-stretch justify-between gap-6 px-4 py-10 sm:px-5 md:flex-row md:items-center lg:px-8 lg:py-12">
            <h2 className="max-w-xl text-xl font-semibold leading-snug sm:text-2xl md:text-3xl">
              {t("bandTitle")} {t("bandAccent")}
            </h2>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:px-5 lg:grid-cols-4 lg:px-8 lg:py-14">
            <div id="a-propos" className="col-span-2 scroll-mt-24 lg:col-span-1">
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
                    <Link href={item.href} className="inline-flex min-h-11 items-center text-sm text-white/75 transition hover:text-white">
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
                        <Link href={page} className="inline-flex min-h-11 items-center transition hover:text-white">
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
            <div id="zone" className="col-span-2 scroll-mt-24 lg:col-span-1">
              <h2 className="text-sm font-semibold">{t("footerContact")}</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                <li>
                  <a href={`tel:${PHONE_E164}`} className="inline-flex min-h-11 items-center hover:text-white" dir="ltr">
                    +212 6 60 98 96 98
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-white">
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
                <Link href="/mentions-legales" className="inline-flex min-h-11 items-center hover:text-white">
                  {tn("legal")}
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="inline-flex min-h-11 items-center hover:text-white">
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
