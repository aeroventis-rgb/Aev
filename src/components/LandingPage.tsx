"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  AirVent,
  ArrowRight,
  Box,
  Building2,
  Check,
  Droplets,
  Fan,
  FileText,
  Gem,
  Headphones,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  ShieldCheck,
  Snowflake,
  Thermometer,
  Users,
  Wind,
  Wrench,
} from "lucide-react";
import { FrenchHomeTop } from "@/components/FrenchHomeTop";
import { SiteNav } from "@/components/SiteNav";
import { PartnerLogos } from "@/components/PartnerLogos";
import { BRAND_LOGO_SRC, HOME_ILLUSTRATIONS, IMAGES, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from "@/lib/constants";
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

const realisationShots = [
  { key: "workVilla", src: HOME_ILLUSTRATIONS.workVilla },
  { key: "workReception", src: HOME_ILLUSTRATIONS.workReception },
  { key: "workDining", src: HOME_ILLUSTRATIONS.workDining },
  { key: "workCare", src: HOME_ILLUSTRATIONS.workCare },
  { key: "workRoof", src: HOME_ILLUSTRATIONS.workRoof },
] as const;

const diffuserShots = [
  { key: "diffuserLinear", src: HOME_ILLUSTRATIONS.diffuserLinear },
  { key: "diffuserCassette", src: HOME_ILLUSTRATIONS.diffuserCassette },
  { key: "diffuserRound", src: HOME_ILLUSTRATIONS.diffuserRound },
] as const;

function serviceHref(locale: Locale, path: string | null) {
  if (!path) return null;
  const allowed = localesForPath(path);
  if (allowed && !allowed.includes(locale)) return null;
  return path;
}

function CitySkyline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 160"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M0 150 H40 V110 H70 V150 H90 V70 H110 V40 H130 V70 H160 V150 H190 V100 H230 V60 H250 V100 H290 V150 H320 V120 H360 V80 H390 V150 H430 V90 H470 V50 H500 V90 H540 V150 H580 V110 H620 V70 H650 V40 H680 V70 H720 V150 H760 V100 H810 V55 H840 V100 H890 V150 H930 V85 H980 V45 H1010 V85 H1060 V150 H1100 V115 H1150 V75 H1190 V150 H1230 V95 H1280 V60 H1320 V150 H1360 V120 H1440"
      />
    </svg>
  );
}

function PlanIllustration({ label, alt }: { label: string; alt: string }) {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-2xl border border-[#e6eef6] bg-[#f4f8fc]">
        <Image
          src={IMAGES.planIllustration}
          alt={alt}
          width={1026}
          height={492}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 540px"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-brand-navy/60">{label}</figcaption>
    </figure>
  );
}

export function LandingPage({ contactQrDataUrl }: Props) {
  const t = useTranslations("home");
  const tn = useTranslations("nav");
  const tf = useTranslations("footer");
  const ti = useTranslations("images");
  const locale = useLocale() as Locale;
  const planUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(t("planMessage"))}`;

  const related = [
    { href: "/climatisation", label: t("linkClimatisation") },
    { href: "/climatisation-marrakech", label: t("linkMarrakech") },
    { href: "/climatisation-gainable", label: t("linkGainable") },
    { href: "/zone-intervention", label: t("linkZone") },
    { href: "/blog/maitrisez-votre-climat", label: t("linkArticle") },
    { href: "/contact", label: t("linkContact") },
  ].flatMap((item) => {
    const href = serviceHref(locale, item.href);
    return href ? [{ href, label: item.label }] : [];
  });

  const trust = [
    { key: "expertise", label: t("trustExpertise"), Icon: Gem },
    { key: "quality", label: t("trustQuality"), Icon: ShieldCheck },
    { key: "support", label: t("trustSupport"), Icon: Users },
    { key: "service", label: t("trustService"), Icon: Headphones },
  ];

  const featured = [
    {
      key: "climate",
      href: "/climatisation",
      src: HOME_ILLUSTRATIONS.climate,
      focus: "object-center",
      Icon: Snowflake,
      title: t("cardClimateTitle"),
      line: t("cardClimateLine"),
      alt: ti("cardClimate"),
    },
    {
      key: "vent",
      href: "/ventilation",
      src: HOME_ILLUSTRATIONS.ventilation,
      focus: "object-center",
      Icon: Fan,
      title: t("cardVentTitle"),
      line: t("cardVentLine"),
      alt: ti("cardVent"),
    },
    {
      key: "plumb",
      href: "/plomberie",
      src: HOME_ILLUSTRATIONS.plumbing,
      focus: "object-center",
      Icon: Droplets,
      title: t("cardPlumbTitle"),
      line: t("cardPlumbLine"),
      alt: ti("cardPlumb"),
    },
    {
      key: "fit",
      href: null,
      src: HOME_ILLUSTRATIONS.fitout,
      focus: "object-center",
      Icon: Box,
      title: t("cardFitTitle"),
      line: t("cardFitLine"),
      alt: ti("cardFit"),
    },
    {
      key: "maint",
      href: "/entretien-climatisation-casablanca",
      src: HOME_ILLUSTRATIONS.maintenance,
      focus: "object-[32%_center]",
      Icon: Wrench,
      title: t("cardMaintTitle"),
      line: t("cardMaintLine"),
      alt: ti("cardMaint"),
    },
  ] as const;

  const claims = [
    { key: "projects", label: t("statProjects"), Icon: Building2 },
    { key: "team", label: t("statTeam"), Icon: Users },
    { key: "areas", label: t("statAreas"), Icon: MapPin },
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

  const Heading = locale === "fr" ? "p" : "h1";

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <div className={locale === "fr" ? "md:hidden" : undefined}>
        <SiteNav />
      </div>

      <main id="main-content">
        {locale === "fr" ? <FrenchHomeTop /> : null}
        <div className={locale === "fr" ? "md:hidden" : undefined}>
        <section className="relative overflow-hidden bg-white">
          <div className="relative z-10 mx-auto max-w-7xl px-4 pb-1 pt-4 sm:px-5 sm:pb-2 sm:pt-5 lg:px-8 lg:pb-16 lg:pt-6">
            <div className="max-w-xl lg:max-w-[34rem] xl:max-w-[40rem]">
              <p className="text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-brand-blue sm:text-[11px] sm:tracking-[0.18em] lg:text-xs">
                {t("heroEyebrow")}
              </p>
              <Heading className="mt-2 text-brand-navy" {...(locale === "fr" ? { "aria-hidden": true as const } : {})}>
                <span className="block text-[1.7rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.05rem] sm:leading-[1.05] lg:text-[2.35rem] xl:text-[2.65rem]">
                  <span className="block xl:whitespace-nowrap">{t("heroLine1")}</span>
                  <span className="block xl:whitespace-nowrap">
                    {t("heroLine2Lead")}
                    <span className="text-[#3b93dc]">{t("heroAccent")}</span>{t("heroLine2End")}
                  </span>
                </span>
                <span className="mt-3 block max-w-xl text-[15px] font-semibold leading-snug sm:mt-2 sm:text-lg">
                  {t("heroTitleLead")} {t("heroTitleAccent")}
                </span>
              </Heading>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-navy/70 sm:mt-2 sm:text-[15px]">{t("heroSubtitle")}</p>
              <div className="mt-5 flex flex-col gap-2.5 sm:mt-4 sm:flex-row sm:flex-wrap sm:gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-5 text-sm font-semibold text-white transition hover:bg-brand-blue sm:w-auto"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  {tn("quote")}
                </Link>
                <a
                  href="#expertises"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-navy/30 bg-white px-5 text-sm font-semibold text-brand-navy transition hover:border-brand-navy sm:w-auto"
                >
                  {t("discover")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                </a>
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5 sm:mt-4 sm:gap-x-2 xl:flex xl:flex-nowrap xl:items-center">
                {trust.map(({ key, label, Icon }, index) => (
                  <li
                    key={key}
                    className={`flex min-w-0 items-center gap-1.5 ${
                      index > 0 ? "xl:border-s xl:border-brand-navy/15 xl:ps-2.5 xl:pe-2.5" : "xl:pe-2.5"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
                    <span className="text-[11px] font-medium leading-tight text-brand-navy xl:whitespace-nowrap">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figure className="relative z-0 mt-5 aspect-[4/3] overflow-hidden sm:mx-5 sm:mt-4 sm:aspect-[1.98/1] sm:rounded-2xl lg:absolute lg:inset-y-0 lg:end-0 lg:mx-0 lg:mt-0 lg:aspect-auto lg:w-[58%] lg:rounded-none xl:w-[60%]">
            <Image
              src={HOME_ILLUSTRATIONS.hero}
              alt={ti("heroVilla")}
              fill
              priority
              className="object-cover object-[46%_center] sm:object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="pointer-events-none absolute inset-0 hidden lg:block ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-white from-0% via-white via-[26%] to-transparent to-[58%]" />
            <ul className="absolute end-2 top-2 bottom-3 z-[1] flex w-14 flex-col gap-1.5 sm:end-3 sm:bottom-6 sm:w-[4.75rem] sm:gap-2 lg:bottom-24 lg:end-4 lg:w-[5.25rem]">
              {diffuserShots.map((shot) => (
                <li key={shot.key} className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-white/80">
                  <Image src={shot.src} alt={ti(shot.key)} fill className="object-cover" sizes="88px" />
                </li>
              ))}
            </ul>
            <figcaption className="absolute start-3 top-3 rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-white/90 lg:start-auto lg:end-[7.4rem]">
              {t("heroCaption")}
            </figcaption>
          </figure>
        </section>

        <section id="expertises" className="scroll-mt-36 relative z-20 mx-auto mt-4 max-w-7xl px-4 sm:-mt-4 sm:px-5 lg:-mt-12 lg:px-8">
          <h2 className="sr-only">{tn("expertises")}</h2>
          <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-5">
            {featured.map((item) => {
              const page = serviceHref(locale, item.href);
              const href = page ?? ({ pathname: "/", hash: "solutions" } as const);
              const Icon = item.Icon;
              return (
                <li key={item.key} className={`min-w-0 ${item.key === "maint" ? "max-xl:col-span-2" : ""}`}>
                  <Link
                    href={href}
                    className="group relative block h-44 overflow-hidden rounded-2xl bg-[#01224f] shadow-[0_18px_40px_-22px_rgba(2,47,112,0.55)] ring-1 ring-black/5 transition hover:-translate-y-0.5 sm:h-[9.25rem]"
                  >
                    <div className="absolute inset-x-0 top-0 h-[58%] sm:h-[68%] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className={`object-cover ${item.focus}`}
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 280px"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#01224f] from-50% via-[#01224f]/85 to-transparent sm:h-[48%] sm:from-40% sm:via-[#01224f]/80" />
                    <span className="absolute start-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-brand-navy/80 sm:start-3 sm:top-2 sm:px-1.5 sm:text-[10px]" aria-hidden>
                      {t("cardCaption")}
                    </span>
                    <span className="absolute bottom-2 start-2 end-2 grid grid-cols-[1.5rem_minmax(0,1fr)_1.25rem] items-center gap-x-1 gap-y-1 text-white sm:bottom-3 sm:start-[3.35rem] sm:end-11 sm:block">
                      <span className="col-start-1 row-start-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue shadow-md sm:absolute sm:bottom-1 sm:start-[-2.6rem] sm:h-10 sm:w-10">
                        <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" aria-hidden />
                      </span>
                      <h3 className="col-start-2 row-start-1 min-w-0 break-words text-[13px] font-semibold leading-tight sm:text-sm">{item.title}</h3>
                      <span className="col-start-3 row-start-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/55 sm:absolute sm:bottom-1 sm:end-[-2rem] sm:h-8 sm:w-8">
                        <ArrowRight className="h-3 w-3 rtl:rotate-180 sm:h-4 sm:w-4" aria-hidden />
                      </span>
                      <span className="col-span-3 text-[11px] leading-snug text-white/90 sm:mt-0.5 sm:block sm:leading-snug">{item.line}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="relative mt-6 bg-brand-navy text-white sm:mt-8 lg:mt-10" aria-labelledby="home-promise">
          <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-7 lg:px-8 lg:pb-8 lg:pt-8">
            <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
              {claims.map(({ key, label, Icon }) => (
                <li key={key} className="flex min-w-0 items-start gap-3">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-white/90" aria-hidden />
                  <span className="min-w-0 text-sm font-medium leading-relaxed sm:text-base sm:leading-snug">{label}</span>
                </li>
              ))}
            </ul>
            <div className="relative mt-5 border-t border-white/15 pt-4 sm:mt-6 sm:min-h-24 sm:pt-5">
              <div className="pointer-events-none absolute bottom-0 end-[7.5rem] hidden h-24 w-[min(42%,26rem)] text-white/30 md:block">
                <CitySkyline />
              </div>
              <h2
                id="home-promise"
                className={`relative z-10 max-w-md text-xl font-medium leading-snug sm:text-[1.7rem] ${locale === "ar" ? "" : "italic"}`}
              >
                {t("bandTagline")}
              </h2>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("whatsapp")} — ${t("whatsappContact")}`}
                className="relative z-10 mt-4 inline-flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,0.55)] transition hover:bg-[#1ebe5d] sm:absolute sm:bottom-0 sm:end-0 sm:mt-0 sm:size-auto sm:translate-y-1/2 sm:gap-3 sm:py-1.5 sm:pe-5 sm:ps-1.5"
              >
                <span className="flex size-12 items-center justify-center sm:rounded-full sm:bg-[#1da851]">
                  <MessageCircle className="h-6 w-6" aria-hidden />
                </span>
                <span className="hidden text-start leading-tight sm:block">
                  <span className="block text-sm font-bold">{t("whatsapp")}</span>
                  <span className="block text-xs font-medium text-white/90">{t("whatsappContact")}</span>
                </span>
              </a>
            </div>
          </div>
        </section>
        </div>

        <section id="solutions" className="scroll-mt-36 mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-5 sm:pt-12 lg:px-8 lg:pb-14 lg:pt-16">
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
          {related.length > 0 ? (
            <nav aria-label={t("relatedLabel")} className="mt-5">
              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {related.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-blue hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-5 lg:px-8 lg:pb-14">
          <div className="grid items-center gap-6 rounded-3xl border border-[#e6eef6] bg-white p-4 shadow-[0_10px_30px_-22px_rgba(2,47,112,0.35)] sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
            <PlanIllustration label={t("planSketch")} alt={ti("plan")} />
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

        <section className="mx-auto max-w-7xl px-4 py-2 pb-10 sm:px-5 lg:px-8 lg:pb-14">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">{t("methodTitle")}</h2>
          <ol className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-6 lg:mt-8 lg:grid-cols-6 lg:gap-4">
            {steps.map((step) => (
              <li key={step} className="min-w-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-sm font-semibold text-white">
                  {step}
                </span>
                <h3 className="mt-2 text-sm font-semibold leading-snug text-brand-navy sm:text-[13px]">{t(`step${step}Title`)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-navy/70 sm:text-xs sm:leading-snug">{t(`step${step}Body`)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="realisations" className="scroll-mt-36 border-t border-[#e6eef6] bg-[#f7f9fc] py-12 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">{t("projectsTitle")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-brand-navy/70">
              {t("illustration")}
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {realisationShots.map((shot) => (
                <li key={shot.key} className={shot.key === "workRoof" ? "max-sm:col-span-2" : undefined}>
                  <figure className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-22px_rgba(2,47,112,0.45)] ring-1 ring-[#e6eef6]">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={shot.src}
                        alt={ti(shot.key)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                      />
                      <span className="absolute start-2 top-2 rounded bg-black/45 px-1.5 py-0.5 text-[10px] font-medium text-white" aria-hidden>
                        {t("cardCaption")}
                      </span>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PartnerLogos title={t("partnersTitle")} />

        <section className="bg-brand-navy text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-6 px-4 py-10 sm:px-5 md:flex-row md:items-center lg:px-8 lg:py-12">
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
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:px-5 lg:grid-cols-4 lg:px-8 lg:py-14">
            <div id="a-propos" className="col-span-2 scroll-mt-36 lg:col-span-1">
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
            <div id="zone" className="col-span-2 scroll-mt-36 lg:col-span-1">
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
            <ul className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-5 py-5 text-xs text-white/60 lg:px-8">
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
                  <Link href="/plan-du-site" className="inline-flex min-h-11 items-center hover:text-white">
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
