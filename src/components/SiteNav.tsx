"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ArrowRight, ChevronDown, FileText, MapPin, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BRAND_LOGO_SRC, PHONE_DISPLAY, PHONE_E164 } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";
import { localesForPath } from "@/lib/routes";

type NavHref =
  | "/"
  | "/contact"
  | "/blog"
  | "/nos-services"
  | "/qui-sommes-nous"
  | "/climatisation"
  | "/climatisation-gainable"
  | "/ventilation"
  | "/extraction"
  | "/desenfumage"
  | "/plomberie"
  | "/entretien-climatisation-casablanca"
  | { pathname: "/"; hash: string };

function pageOrHash(locale: Locale, path: Exclude<NavHref, { pathname: "/" }>, hash: string): NavHref {
  const allowed = localesForPath(path);
  if (allowed?.includes(locale)) return path;
  return { pathname: "/", hash };
}

function hrefPath(href: NavHref): string | null {
  return typeof href === "string" ? href : null;
}

export function SiteNav() {
  const tn = useTranslations("nav");
  const tb = useTranslations("brand");
  const locale = useLocale() as Locale;
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setExpOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const expertises: { key: string; label: string; href: NavHref }[] = [
    { key: "expClimate", label: tn("expClimate"), href: pageOrHash(locale, "/climatisation", "solutions") },
    { key: "expGainable", label: tn("expGainable"), href: pageOrHash(locale, "/climatisation-gainable", "solutions") },
    { key: "expVentilation", label: tn("expVentilation"), href: pageOrHash(locale, "/ventilation", "solutions") },
    { key: "expExtraction", label: tn("expExtraction"), href: pageOrHash(locale, "/extraction", "solutions") },
    { key: "expSmoke", label: tn("expSmoke"), href: pageOrHash(locale, "/desenfumage", "solutions") },
    { key: "expPlumbing", label: tn("expPlumbing"), href: pageOrHash(locale, "/plomberie", "solutions") },
    {
      key: "expMaintenance",
      label: tn("expMaintenance"),
      href: pageOrHash(locale, "/entretien-climatisation-casablanca", "solutions"),
    },
    { key: "expAll", label: tn("expAll"), href: pageOrHash(locale, "/nos-services", "solutions") },
  ];

  const expertiseActive =
    expertises.some((item) => hrefPath(item.href) === pathname) ||
    pathname.startsWith("/climatisation") ||
    pathname.startsWith("/ventilation") ||
    pathname.startsWith("/plomberie") ||
    pathname.startsWith("/extraction") ||
    pathname.startsWith("/desenfumage") ||
    pathname.startsWith("/entretien-");

  const items: { key: string; label: string; href: NavHref; active: boolean }[] = [
    { key: "projects", label: tn("projects"), href: { pathname: "/", hash: "realisations" }, active: false },
    {
      key: "about",
      label: tn("about"),
      href: pageOrHash(locale, "/qui-sommes-nous", "a-propos"),
      active: pathname === "/qui-sommes-nous",
    },
    { key: "news", label: tn("news"), href: "/blog", active: pathname === "/blog" || pathname.startsWith("/blog/") },
    { key: "contact", label: tn("contact"), href: "/contact", active: pathname === "/contact" },
  ];

  const itemClass = (active: boolean) =>
    active
      ? "rounded-full bg-[#e7f1fb] px-3 py-1.5 text-sm font-semibold text-brand-navy"
      : "rounded-full px-3 py-1.5 text-sm font-medium text-brand-navy/80 transition hover:bg-[#f4f8fc] hover:text-brand-blue";

  return (
    <header className="sticky top-0 z-[70]">
      <div className="bg-brand-navy text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 px-4 sm:h-auto sm:px-5 sm:py-0 lg:px-8">
          <div className="flex min-w-0 flex-nowrap items-center gap-x-3 text-[11px] sm:flex-wrap sm:text-xs">
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {tn("location")}
            </span>
            <span className="hidden text-white/35 sm:inline" aria-hidden>
              |
            </span>
            <a href={`tel:${PHONE_E164}`} className="inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap hover:text-white/80" dir="ltr">
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {PHONE_DISPLAY}
            </a>
          </div>
          <LanguageSwitcher variant="bar" label={tn("language")} />
        </div>
      </div>

      <div className="border-b border-[#e6eef6] bg-white">
        <div className="mx-auto flex max-w-7xl flex-nowrap items-center gap-2 px-4 py-1.5 sm:gap-3 sm:px-5 lg:px-8 lg:py-2">
          <Link
            href="/"
            className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
            aria-label={`${tb("name")} — ${tb("tagline")}. ${tb("motto")}`}
            onClick={() => setOpen(false)}
          >
            <Image
              src={BRAND_LOGO_SRC}
              alt=""
              width={1536}
              height={1536}
              priority
              className="h-[4.25rem] w-auto bg-white lg:h-24"
            />
          </Link>

          <nav className="ms-auto hidden items-center gap-0.5 xl:flex" aria-label={tn("toolbar")}>
            <Link href="/" className={itemClass(pathname === "/")} aria-current={pathname === "/" ? "page" : undefined}>
              {tn("home")}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setExpOpen(true)}
              onMouseLeave={() => setExpOpen(false)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 ${itemClass(expertiseActive)}`}
                aria-expanded={expOpen}
                aria-haspopup="menu"
                aria-controls="expertise-menu"
                onClick={() => setExpOpen((value) => !value)}
              >
                {tn("expertises")}
                <ChevronDown className={`h-3.5 w-3.5 transition ${expOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              <div className={`absolute start-0 top-full z-50 pt-2 ${expOpen ? "block" : "hidden"}`}>
                <ul id="expertise-menu" role="menu" className="min-w-64 rounded-2xl border border-[#e6eef6] bg-white p-2 shadow-[0_18px_40px_-24px_rgba(2,47,112,0.45)]">
                  {expertises.map((item) => (
                    <li key={item.key} role="none">
                      <Link
                        href={item.href}
                        role="menuitem"
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-navy transition hover:bg-[#f4f8fc] hover:text-brand-blue"
                        onClick={() => setExpOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={itemClass(item.active)}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex shrink-0 items-center gap-2 xl:ms-0">
            <Link
              href="/contact"
              className="hidden min-h-11 items-center gap-2 rounded-full bg-brand-navy px-4 text-sm font-semibold text-white transition hover:bg-brand-blue sm:inline-flex"
            >
              <FileText className="h-4 w-4" aria-hidden />
              {tn("quote")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-[#e6eef6] text-brand-navy xl:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              <span className="sr-only">{open ? tn("closeMenu") : tn("openMenu")}</span>
            </button>
          </div>
        </div>

        {open ? (
          <nav id="site-menu" className="border-t border-[#e6eef6] bg-white px-5 py-3 xl:hidden" aria-label={tn("toolbar")}>
            <ul className="flex flex-col">
              <li>
                <Link href="/" className="flex min-h-11 items-center text-base font-medium text-brand-navy" onClick={() => setOpen(false)}>
                  {tn("home")}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between text-base font-medium text-brand-navy"
                  aria-expanded={expOpen}
                  onClick={() => setExpOpen((value) => !value)}
                >
                  {tn("expertises")}
                  <ChevronDown className={`h-4 w-4 transition ${expOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
                {expOpen ? (
                  <ul className="pb-2 ps-3">
                    {expertises.map((item) => (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          className="flex min-h-11 items-center text-sm text-brand-navy/80"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
              {items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center text-base text-brand-navy"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-navy px-4 text-sm font-semibold text-white sm:hidden"
              onClick={() => setOpen(false)}
            >
              <FileText className="h-4 w-4" aria-hidden />
              {tn("quote")}
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
