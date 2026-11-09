"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FR_HOME_TOP, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";

type Box = { x: number; y: number; w: number; h: number };
type HashHref = { pathname: "/"; hash: string };

/** Pixel boxes on the 1672×941 mockup. Percentages keep them aligned as the image scales. */
const BOX = {
  phone: { x: 266, y: 4, w: 180, h: 38 },
  fr: { x: 1456, y: 4, w: 46, h: 36 },
  ar: { x: 1506, y: 4, w: 46, h: 36 },
  en: { x: 1556, y: 4, w: 50, h: 36 },
  logo: { x: 72, y: 50, w: 410, h: 120 },
  home: { x: 538, y: 72, w: 108, h: 46 },
  expertises: { x: 652, y: 80, w: 168, h: 38 },
  projects: { x: 824, y: 80, w: 160, h: 38 },
  about: { x: 988, y: 80, w: 100, h: 38 },
  news: { x: 1092, y: 80, w: 100, h: 38 },
  contact: { x: 1198, y: 80, w: 95, h: 38 },
  quoteNav: { x: 1352, y: 68, w: 262, h: 62 },
  quoteHero: { x: 80, y: 464, w: 260, h: 50 },
  discover: { x: 348, y: 454, w: 280, h: 60 },
  climate: { x: 30, y: 650, w: 412, h: 150 },
  vent: { x: 452, y: 650, w: 388, h: 150 },
  plumb: { x: 850, y: 650, w: 390, h: 150 },
  maint: { x: 1250, y: 650, w: 390, h: 150 },
  whatsapp: { x: 1440, y: 845, w: 216, h: 82 },
} as const satisfies Record<string, Box>;

const LIGHT =
  "hover:bg-[#022F70]/10 focus-visible:bg-[#022F70]/15 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0A5BAA]";
const DARK =
  "hover:bg-white/15 focus-visible:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white";

function areaStyle(box: Box): CSSProperties {
  return {
    left: `${(box.x / FR_HOME_TOP.width) * 100}%`,
    top: `${(box.y / FR_HOME_TOP.height) * 100}%`,
    width: `${(box.w / FR_HOME_TOP.width) * 100}%`,
    height: `${(box.h / FR_HOME_TOP.height) * 100}%`,
  };
}

function hitClass(tone: "light" | "dark") {
  return `absolute rounded-md ${tone === "light" ? LIGHT : DARK}`;
}

const LOCALE_LABEL: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
  en: "English",
};

export function FrenchHomeTop() {
  const t = useTranslations("home");
  const tn = useTranslations("nav");
  const tb = useTranslations("brand");

  const headline = `${t("heroLine1")} ${t("heroLine2Lead")}${t("heroAccent")}${t("heroLine2End")}`;

  return (
    <>
      <h1 className="sr-only">
        {t("heroTitleLead")} {t("heroTitleAccent")}. {headline} {t("heroSubtitle")}
      </h1>

      <div className="relative hidden w-full md:block">
        <picture>
          <source media="(min-width: 768px)" srcSet={FR_HOME_TOP.src} type="image/webp" />
          {/* Fallback is a 1×1 gif so phones do not download the wide banner. */}
          <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt={t("homeTopAlt")}
            width={FR_HOME_TOP.width}
            height={FR_HOME_TOP.height}
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full"
          />
        </picture>

        <a href={`tel:${PHONE_E164}`} className={hitClass("dark")} style={areaStyle(BOX.phone)} aria-label={`${t("call")} ${PHONE_DISPLAY}`} />
        {(["fr", "ar", "en"] as const).map((loc) => (
          <Link
            key={loc}
            href="/"
            locale={loc}
            hrefLang={loc}
            prefetch={false}
            className={hitClass("dark")}
            style={areaStyle(BOX[loc])}
            aria-label={LOCALE_LABEL[loc]}
            aria-current={loc === "fr" ? "page" : undefined}
          />
        ))}

        <Link href="/" className={hitClass("light")} style={areaStyle(BOX.logo)} aria-label={`${tb("name")}, ${tn("home")}`} />
        <Link href="/" className={hitClass("light")} style={areaStyle(BOX.home)} aria-label={tn("home")} aria-current="page" />
        <Link href="/nos-services" className={hitClass("light")} style={areaStyle(BOX.expertises)} aria-label={tn("expertises")} />
        <Link
          href={{ pathname: "/", hash: "realisations" } satisfies HashHref}
          className={hitClass("light")}
          style={areaStyle(BOX.projects)}
          aria-label={tn("projects")}
        />
        <Link href="/qui-sommes-nous" className={hitClass("light")} style={areaStyle(BOX.about)} aria-label={tn("about")} />
        <Link href="/blog" className={hitClass("light")} style={areaStyle(BOX.news)} aria-label={tn("news")} />
        <Link href="/contact" className={hitClass("light")} style={areaStyle(BOX.contact)} aria-label={tn("contact")} />
        <Link href="/contact" className={hitClass("dark")} style={areaStyle(BOX.quoteNav)} aria-label={tn("quote")} />

        <Link href="/contact" className={hitClass("dark")} style={areaStyle(BOX.quoteHero)} aria-label={tn("quote")} />
        <Link
          href={{ pathname: "/", hash: "solutions" } satisfies HashHref}
          className={hitClass("light")}
          style={areaStyle(BOX.discover)}
          aria-label={t("discover")}
        />

        <Link href="/climatisation" className={hitClass("dark")} style={areaStyle(BOX.climate)} aria-label={t("cardClimateTitle")} />
        <Link href="/ventilation" className={hitClass("dark")} style={areaStyle(BOX.vent)} aria-label={t("cardVentTitle")} />
        <Link href="/plomberie" className={hitClass("dark")} style={areaStyle(BOX.plumb)} aria-label={t("cardPlumbTitle")} />
        <Link
          href="/entretien-climatisation-casablanca"
          className={hitClass("dark")}
          style={areaStyle(BOX.maint)}
          aria-label={t("cardMaintTitle")}
        />

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={hitClass("dark")}
          style={areaStyle(BOX.whatsapp)}
          aria-label={`${t("whatsapp")} — ${t("whatsappContact")}`}
        />
      </div>
    </>
  );
}
