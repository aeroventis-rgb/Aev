"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BRAND_LOGO_SRC } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";
import { localesForPath } from "@/lib/routes";

type NavHref = "/" | "/contact" | "/nos-services" | "/qui-sommes-nous" | "/zone-intervention" | { pathname: "/"; hash: string };

function destination(locale: Locale, path: "/nos-services" | "/qui-sommes-nous" | "/zone-intervention", hash: string): NavHref {
  const allowed = localesForPath(path);
  if (allowed?.includes(locale)) return path;
  return { pathname: "/", hash };
}

export function SiteNav() {
  const tn = useTranslations("nav");
  const tb = useTranslations("brand");
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);

  const items: { key: string; label: string; href: NavHref }[] = [
    { key: "home", label: tn("home"), href: "/" },
    { key: "services", label: tn("services"), href: destination(locale, "/nos-services", "solutions") },
    { key: "projects", label: tn("projects"), href: { pathname: "/", hash: "realisations" } },
    { key: "about", label: tn("about"), href: destination(locale, "/qui-sommes-nous", "a-propos") },
    { key: "coverage", label: tn("coverage"), href: destination(locale, "/zone-intervention", "zone") },
    { key: "contact", label: tn("contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-[70] border-b border-[#e6eef6] bg-white">
      <div className="mx-auto flex max-w-6xl flex-nowrap items-center gap-2 px-4 py-2 sm:gap-3 sm:px-5 sm:py-2.5 lg:gap-6 lg:px-8">
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
            className="h-12 w-auto bg-white sm:h-16"
          />
        </Link>

        <nav className="ms-auto hidden items-center gap-5 xl:flex" aria-label={tn("toolbar")}>
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-brand-navy/80 transition hover:text-brand-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-2 xl:ms-0">
          <LanguageSwitcher compact />
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-lg bg-brand-blue px-4 text-sm font-semibold text-white transition hover:bg-brand-navy sm:inline-flex"
          >
            {tn("study")}
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
            className="mt-2 inline-flex min-h-11 items-center rounded-lg bg-brand-blue px-4 text-sm font-semibold text-white sm:hidden"
            onClick={() => setOpen(false)}
          >
            {tn("study")}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
