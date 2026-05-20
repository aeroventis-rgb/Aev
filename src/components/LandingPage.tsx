"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Snowflake,
  Fan,
  Thermometer,
  Wrench,
  Shield,
  Award,
  Handshake,
  ClipboardList,
  HardHat,
  ShieldCheck,
  Headphones,
  Scale,
  CalendarClock,
  Phone,
  MapPin,
  Check,
  Star,
  MessageCircle,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { BrandLogo } from "@/components/BrandLogo";
import { PartnerLogos } from "@/components/PartnerLogos";
import { ClimateHeroBreath, ClimateSectionMotion } from "@/components/ClimateMotionFX";
import {
  PHONE_E164,
  WHATSAPP_URL,
  IMAGES,
} from "@/lib/constants";

const serviceIcons = [
  { key: "climatisation" as const, Icon: Snowflake },
  { key: "ventilation" as const, Icon: Fan },
  { key: "froid" as const, Icon: Thermometer },
  { key: "maintenance" as const, Icon: Wrench },
];

const trustIcons = [
  { key: "expertise" as const, Icon: Shield },
  { key: "quality" as const, Icon: Award },
  { key: "trust" as const, Icon: Handshake },
];

const processItems = [
  { key: "study" as const, Icon: ClipboardList },
  { key: "install" as const, Icon: HardHat },
  { key: "result" as const, Icon: ShieldCheck },
  { key: "afterSales" as const, Icon: Headphones },
];

const galleryItems = [
  { key: "ducted" as const, src: IMAGES.galleryDucted, label: "ducted" as const },
  { key: "galleryInstall" as const, src: IMAGES.galleryInstall, label: "install" as const },
  { key: "galleryPlumbing" as const, src: IMAGES.galleryPlumbing, label: "plumbing" as const },
  { key: "galleryFinish" as const, src: IMAGES.galleryFinish, label: "finish" as const },
];

const benefitItems = [
  { key: "guarantee" as const, Icon: Shield },
  { key: "economy" as const, Icon: Scale },
  { key: "deadlines" as const, Icon: CalendarClock },
  { key: "material" as const, Icon: Award },
];

type Props = {
  contactQrDataUrl: string;
};

/** Decorative background — hero excluded; keeps contrast via overlays */
function SectionBackdrop({
  src,
  imageClassName,
}: {
  src: string;
  imageClassName?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className={`object-cover saturate-[0.82] ${imageClassName ?? "opacity-[0.28] scale-105 object-[center_45%]"}`}
      />
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
  accentSpan,
  tone = "light",
}: {
  title: string;
  subtitle?: string;
  accentSpan?: ReactNode;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className="mb-10 md:mb-12">
      <div className="mb-4 flex items-center gap-4">
        <span
          className={`h-1 w-14 shrink-0 rounded-full bg-gradient-to-r ${
            isDark
              ? "from-brand-blue-light via-brand-silver to-transparent"
              : "from-brand-blue via-brand-blue-light to-transparent"
          }`}
        />
        <h2
          className={`text-2xl font-black uppercase tracking-[0.12em] md:text-3xl lg:text-[2.1rem] ${
            isDark ? "text-brand-white" : "text-brand-ink"
          }`}
        >
          {title}
          {accentSpan}
        </h2>
      </div>
      {subtitle ? (
        <p
          className={`max-w-2xl text-sm font-medium leading-relaxed md:text-base ${
            isDark ? "text-brand-silver" : "text-brand-navy/75"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function MobileDock() {
  const tc = useTranslations("cta");
  const tn = useTranslations("nav");

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex h-[3.75rem] overflow-hidden border-t border-brand-silver bg-brand-white shadow-nav lg:hidden">
      <a
        href={`tel:${PHONE_E164}`}
        className="brand-gradient flex flex-[1.05] items-center justify-center gap-2 font-black uppercase tracking-wide text-brand-white"
      >
        <Phone className="h-6 w-6" aria-hidden />
        <span className="text-[11px] sm:text-xs">{tc("phone")}</span>
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-brand-navy font-black uppercase tracking-wide text-brand-white transition hover:bg-brand-ink"
        aria-label={tn("contact")}
      >
        <MessageCircle className="h-6 w-6" aria-hidden />
        <span className="text-[11px] sm:text-xs">WhatsApp</span>
      </a>
    </div>
  );
}

export function LandingPage({ contactQrDataUrl }: Props) {
  const tb = useTranslations("brand");
  const ts = useTranslations("services");
  const th = useTranslations("hero");
  const thl = useTranslations("highlight");
  const tp = useTranslations("process");
  const tg = useTranslations("gallery");
  const tben = useTranslations("benefits");
  const tc = useTranslations("cta");
  const tl = useTranslations("locations");
  const tpart = useTranslations("partners");
  const ti = useTranslations("images");
  const tn = useTranslations("nav");
  const tf = useTranslations("footer");

  const footerLinks = [
    { href: "/qui-sommes-nous" as const, label: tf("about") },
    { href: "/nos-services" as const, label: tf("ourServices") },
    { href: "/zone-intervention" as const, label: tf("coverage") },
    { href: "/mentions-legales" as const, label: tf("legal") },
    { href: "/politique-confidentialite" as const, label: tf("privacy") },
    { href: "/plan-du-site" as const, label: tf("sitemap") },
  ];

  return (
    <div className="min-h-screen bg-brand-off pb-[3.85rem] lg:pb-0">

      <MobileDock />

      <main id="main-content" className="relative">
        <div className="mx-auto max-w-[1360px] px-4 pb-10 pt-6 sm:px-6 md:pb-14 md:pt-10 lg:px-10">
          <SiteNav />

          <header className="hero-frame relative overflow-hidden rounded-md bg-brand-ink">
            <div className="absolute inset-x-0 top-0 z-30 h-[3px] brand-gradient" aria-hidden />

            <div className="relative min-h-[min(100svh,920px)] lg:min-h-[min(92svh,880px)]">
              <Image
                src={IMAGES.heroVilla}
                alt={ti("hero")}
                fill
                priority
                className="object-cover object-[center_55%] brightness-[0.92] contrast-[1.05] saturate-[1.08] sm:object-bottom md:object-[center_50%]"
                sizes="(max-width: 1360px) 100vw, 1360px"
              />

              <div className="absolute inset-0 bg-hero-overlay" aria-hidden />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-brand-navy/40"
                aria-hidden
              />

              <ClimateHeroBreath />

              <div className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 md:gap-12 md:py-14 lg:grid lg:min-h-[min(92svh,880px)] lg:grid-cols-[minmax(280px,340px)_1fr] lg:items-center lg:gap-14 lg:px-10">
                <div className="panel-glass relative rounded-md border border-brand-silver px-7 py-10 sm:px-8 sm:py-11">
                  <div className="absolute -start-px -top-px h-14 w-14 border-l-2 border-t-2 border-brand-blue/60" />
                  <div className="absolute -bottom-px -end-px h-14 w-14 border-b-2 border-r-2 border-brand-blue/60" />

                  <div className="mx-auto flex justify-center md:mx-0 md:justify-start">
                    <div className="overflow-hidden rounded-full ring-2 ring-brand-silver brand-gradient-ring p-[3px]">
                      <div className="overflow-hidden rounded-full bg-brand-white">
                        <BrandLogo
                          alt={`${tb("name")} — ${tb("tagline")}`}
                          variant="hero"
                          fallbackClass="h-20 w-20"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 text-center text-4xl font-black uppercase leading-none tracking-tight text-brand-ink md:text-start md:text-[2.75rem]">
                    {tb("name")}
                  </p>
                  <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-[0.35em] text-brand-blue md:text-start md:text-xs">
                    {tb("tagline")}
                  </p>
                  <div className="my-7 flex items-center gap-4">
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-brand-silver to-transparent md:block" />
                    <p className="flex-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-navy/70 md:text-start md:text-[11px]">
                      {tb("motto")}
                    </p>
                    <span className="hidden h-px flex-1 bg-gradient-to-l from-brand-silver to-transparent md:block" />
                  </div>

                  <div className="grid grid-cols-4 gap-3 border-t border-brand-silver pt-8">
                    {serviceIcons.map(({ key, Icon }) => (
                      <div key={key} className="flex flex-col items-center gap-2.5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-silver bg-brand-off shadow-inner transition-transform hover:scale-105 hover:border-brand-blue/50 md:h-[3.65rem] md:w-[3.65rem]">
                          <Icon className="h-6 w-6 text-brand-blue" strokeWidth={2} aria-hidden />
                        </div>
                        <span className="text-center text-[8px] font-black uppercase leading-tight tracking-wide text-brand-ink md:text-[9px]">
                          {ts(key)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative flex flex-col justify-center lg:py-6">
                  <h1 className="text-shadow-brand max-w-[22rem] font-black uppercase leading-[1.02] tracking-[0.03em] text-brand-white sm:max-w-xl lg:max-w-3xl [font-size:clamp(2rem,6vw,3.85rem)]">
                    {th("headline1")}{" "}
                    <span className="text-shadow-blue-glow text-brand-blue-light">{th("headline2")}</span>
                  </h1>

                  <div className="mt-8 inline-flex w-fit rounded-md border border-brand-blue-light/50 bg-brand-navy/50 px-8 py-3.5 backdrop-blur-sm">
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-white md:text-base">
                      {th("solution")}
                    </p>
                  </div>

                  <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4 rounded-md border border-brand-silver/30 bg-brand-ink/40 px-8 py-4 backdrop-blur-sm md:gap-x-12 md:py-5">
                    {trustIcons.map(({ key, Icon }) => (
                      <div key={key} className="flex items-center gap-3">
                        <Icon className="h-8 w-8 shrink-0 text-brand-blue-light" strokeWidth={1.75} aria-hidden />
                        <span className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-white md:text-xs">
                          {th(key)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-center md:mt-14 lg:absolute lg:end-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:justify-end xl:end-4">
                    <div className="brand-gradient relative flex h-[9.5rem] w-[9.5rem] flex-col items-center justify-center rounded-full border-[5px] border-brand-silver shadow-brand-lg ring-4 ring-brand-white/20 md:h-[11rem] md:w-[11rem] lg:-rotate-[6deg]">
                      <span className="text-center text-2xl font-black leading-none text-brand-white md:text-[1.65rem]">
                        {th("experience")}
                      </span>
                      <span className="mt-2 max-w-[7rem] text-center text-[11px] font-black uppercase leading-tight text-brand-white/95 md:max-w-none">
                        {th("experienceSub")}
                      </span>
                      <div className="mt-3 flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-brand-white text-brand-white md:h-[1.15rem] md:w-[1.15rem]" aria-hidden />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div
            id="services"
            className="section-surface relative z-10 -mt-10 scroll-mt-24 overflow-hidden rounded-md border border-brand-silver px-5 pb-16 pt-20 shadow-brand-md sm:px-8 md:-mt-14 md:px-10 md:pb-20 md:pt-24"
          >
            <SectionBackdrop
              src={IMAGES.bgSectionServices}
              imageClassName="opacity-[0.08] scale-105 object-[center_35%]"
            />
            <ClimateSectionMotion />
            <div className="absolute inset-x-0 top-0 z-[8] h-[3px] brand-gradient" aria-hidden />

            <div className="relative z-10 mx-auto max-w-6xl">
              <SectionTitle
                title={thl("title1")}
                accentSpan={
                  <>
                    {" "}
                    <span className="text-brand-blue">{thl("title2")}</span>
                  </>
                }
              />

              <div className="-mt-4 mb-12 md:-mt-6">
                <div className="inline-flex rounded-md border border-brand-silver bg-brand-off px-8 py-3.5 md:px-10 md:py-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-navy md:text-[13px]">
                    {thl("subtitle")}
                  </p>
                </div>
              </div>

              <div className="grid divide-y divide-brand-silver rounded-md border border-brand-silver bg-brand-white md:grid-cols-4 md:divide-x md:divide-y-0">
                {processItems.map(({ key, Icon }) => (
                  <article
                    key={key}
                    className="group flex flex-col items-center px-6 py-11 text-center transition-colors hover:bg-brand-off md:py-14"
                  >
                    <div className="mb-6 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full brand-gradient shadow-brand-sm transition-transform group-hover:scale-105">
                      <Icon className="h-[2rem] w-[2rem] text-brand-white" strokeWidth={2} aria-hidden />
                    </div>
                    <h3 className="max-w-[13rem] text-xs font-black uppercase leading-snug tracking-[0.06em] text-brand-blue md:text-[13px]">
                      {tp(`${key}.title`)}
                    </h3>
                    <p className="mt-4 max-w-[220px] text-[13px] font-medium leading-relaxed text-brand-navy/75 md:text-sm">
                      {tp(`${key}.desc`)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div
            id="realisations"
            className="section-navy relative scroll-mt-24 overflow-hidden rounded-md px-5 py-16 sm:px-8 md:py-20 md:px-10"
          >
            <SectionBackdrop
              src={IMAGES.bgSectionProjects}
              imageClassName="opacity-[0.14] scale-110 object-[center_55%]"
            />
            <ClimateSectionMotion intensity="light" />
            <div className="absolute inset-x-0 top-0 z-[8] h-[3px] brand-gradient" aria-hidden />

            <div className="relative z-10 mx-auto max-w-6xl">
              <SectionTitle tone="dark" title={tn("projects")} />

              <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-md ring-1 ring-brand-blue/40 transition-all hover:ring-brand-blue-light lg:col-span-3 lg:row-span-2">
                  <Image
                    src={IMAGES.acInstall}
                    alt={ti("acInstall")}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width:1024px) 100vw, 280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
                  <figcaption className="absolute inset-x-0 bottom-0 border-t-2 border-brand-blue bg-gradient-to-t from-brand-ink/95 to-brand-ink/40 px-5 py-4">
                    <span className="text-xs font-black tracking-[0.38em] text-brand-blue-light">AEROVENTIS</span>
                  </figcaption>
                </figure>

                <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:gap-5">
                  {galleryItems.map(({ key, src, label }, i) => (
                    <figure
                      key={key}
                      className={`group relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-brand-silver/30 transition-all hover:ring-brand-blue-light ${i % 2 === 1 ? "lg:translate-y-6" : ""}`}
                    >
                      <Image
                        src={src}
                        alt={ti(key)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                        sizes="(max-width:1024px) 50vw, 320px"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-brand-ink/95 to-brand-ink/40 px-3 py-3 md:px-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center brand-gradient shadow-brand-sm">
                          <Check className="h-5 w-5 text-brand-white" strokeWidth={3} aria-hidden />
                        </span>
                        <span className="text-[10px] font-black uppercase leading-tight tracking-wide text-brand-white md:text-[11px]">
                          {tg(label)}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <figure className="group relative aspect-[3/4] overflow-hidden rounded-md ring-1 ring-brand-blue/40 transition-all hover:ring-brand-blue-light lg:col-span-3 lg:row-span-2">
                  <Image
                    src={IMAGES.plumbing}
                    alt={ti("plumbing")}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
                  <figcaption className="absolute inset-x-0 bottom-0 border-t-2 border-brand-blue bg-gradient-to-t from-brand-ink/95 to-brand-ink/40 px-5 py-4">
                    <span className="text-xs font-black tracking-[0.38em] text-brand-blue-light">AEROVENTIS</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          <div
            id="engagements"
            className="section-surface relative scroll-mt-24 overflow-hidden rounded-md border border-brand-silver px-5 py-16 sm:px-8 md:py-20 md:px-10"
          >
            <SectionBackdrop
              src={IMAGES.bgSectionBenefits}
              imageClassName="opacity-[0.06] scale-105 object-[center_40%]"
            />
            <ClimateSectionMotion />
            <div className="absolute inset-x-0 top-0 z-[8] h-[3px] brand-gradient" aria-hidden />
            <div className="relative z-10 mx-auto max-w-6xl">
              <SectionTitle title={tn("benefits")} />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {benefitItems.map(({ key, Icon }) => (
                  <article
                    key={key}
                    className="rounded-md border border-brand-silver bg-brand-white p-6 shadow-brand-sm transition-colors hover:border-brand-blue/40 hover:shadow-brand-md"
                  >
                    <Icon className="h-11 w-11 text-brand-blue" strokeWidth={1.75} aria-hidden />
                    <h3 className="mt-5 text-[13px] font-black uppercase leading-snug tracking-wide text-brand-ink">
                      {tben(`${key}.title`)}
                    </h3>
                    <p className="mt-3 text-[13px] font-medium leading-relaxed text-brand-navy/75">
                      {tben(`${key}.desc`)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <footer
            id="contact"
            className="section-navy relative scroll-mt-24 overflow-hidden rounded-md px-5 py-16 sm:px-8 md:px-10 md:py-20"
          >
            <SectionBackdrop
              src={IMAGES.bgSectionContact}
              imageClassName="opacity-[0.12] scale-105 object-[center_25%]"
            />
            <ClimateSectionMotion intensity="light" />
            <div className="absolute inset-x-0 top-0 z-[8] h-[3px] brand-gradient" aria-hidden />

            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="mb-14 flex justify-center border-b border-brand-silver/20 pb-12">
                <Link
                  href="/"
                  className="rounded-md transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-light"
                  aria-label={`${tb("name")}, ${tb("tagline")}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="overflow-hidden rounded-full ring-2 ring-brand-silver brand-gradient-ring p-[3px]">
                      <div className="overflow-hidden rounded-full bg-brand-white">
                        <BrandLogo alt={tb("name")} variant="footer" />
                      </div>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.42em] text-brand-silver">
                      {tb("tagline")}
                    </span>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
                  <a
                    href={`tel:${PHONE_E164}`}
                    className="brand-gradient flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[5px] border-brand-silver shadow-brand-lg ring-4 ring-brand-white/15 transition-transform hover:scale-[1.05]"
                    aria-label={tc("callNow")}
                  >
                    <Phone className="h-14 w-14 text-brand-white" aria-hidden />
                  </a>
                  <div className="text-center sm:text-start">
                    <p className="text-sm font-black uppercase tracking-[0.35em] text-brand-blue-light">
                      {tc("callNow")}
                    </p>
                    <a
                      href={`tel:${PHONE_E164}`}
                      className="mt-3 block font-black tracking-wide text-brand-white [font-size:clamp(2rem,5vw,3rem)] hover:text-brand-blue-light"
                    >
                      {tc("phone")}
                    </a>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand-silver">
                      {tc("quote")}
                    </p>
                  </div>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 rounded-md border border-brand-blue-light/40 bg-brand-blue px-12 py-5 text-base font-black uppercase tracking-[0.14em] text-brand-white shadow-brand-lg transition hover:bg-brand-blue-light"
                >
                  <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0 fill-current" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {tc("whatsapp")}
                </a>

                <div className="flex flex-col items-center gap-3 lg:items-end">
                  <Image
                    src={contactQrDataUrl}
                    alt={tc("scanQr")}
                    width={152}
                    height={152}
                    className="rounded-sm border-2 border-white/25 bg-white p-2.5 shadow-xl"
                    unoptimized
                  />
                  <p className="max-w-[11rem] text-center text-[10px] font-semibold uppercase leading-snug tracking-wide text-white/55 lg:text-end">
                    {tc("scanQr")}
                  </p>
                </div>
              </div>

              <div className="mt-14 flex flex-col items-center justify-between gap-8 border-t border-brand-silver/20 pt-12 md:flex-row">
                <div className="flex items-center gap-3">
                  <MapPin className="h-7 w-7 shrink-0 text-brand-blue-light" aria-hidden />
                  <span className="text-sm font-black uppercase tracking-[0.25em] text-brand-white">
                    {tl("cities")}
                  </span>
                </div>
                <div className="brand-gradient rounded-md px-10 py-3 shadow-brand-md">
                  <span className="text-xs font-black uppercase tracking-[0.22em] text-brand-white md:text-sm">
                    {tl("projects")}
                  </span>
                </div>
              </div>

              <PartnerLogos title={tpart("title")} />

              <nav
                className="mt-12 border-t border-brand-silver/20 pt-10"
                aria-label={tf("navLabel")}
              >
                <ul className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3">
                  {footerLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="inline-flex min-h-[44px] items-center text-[10px] font-black uppercase tracking-[0.22em] text-brand-silver transition hover:text-brand-blue-light sm:text-[11px]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
