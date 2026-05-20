"use client";

import { useTranslations } from "next-intl";
import { Link as I18nLink } from "@/i18n/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PHONE_E164, WHATSAPP_URL } from "@/lib/constants";

const SECTION_HASHES = ["#services", "#realisations", "#engagements", "#contact"] as const;

export function SiteNav() {
  const tn = useTranslations("nav");
  const tb = useTranslations("brand");
  const tc = useTranslations("cta");

  function label(hash: string) {
    switch (hash) {
      case "#services":
        return tn("services");
      case "#realisations":
        return tn("projects");
      case "#engagements":
        return tn("benefits");
      default:
        return tn("contact");
    }
  }

  return (
    <header className="sticky top-0 z-[70] mb-6 bg-brand-white shadow-nav">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-0">
        {/* Top row: logo + actions */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <I18nLink
            href="/"
            className="group flex min-w-0 items-center gap-3 rounded-md transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
          >
            <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-silver brand-gradient-ring p-[2px] sm:h-[3.25rem] sm:w-[3.25rem]">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-brand-white">
                <BrandLogo alt={`${tb("name")} — ${tb("tagline")}`} variant="nav" />
              </div>
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-[10px] font-bold uppercase tracking-[0.32em] text-brand-blue">
                {tb("tagline")}
              </p>
              <p className="truncate text-lg font-black uppercase tracking-wide text-brand-ink lg:text-xl">
                {tb("name")}
              </p>
            </div>
          </I18nLink>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <LanguageSwitcher compact />
            <a
              href={`tel:${PHONE_E164}`}
              className="brand-gradient inline-flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-brand-white shadow-brand transition hover:brightness-110 active:scale-95"
              aria-label={tc("callNow")}
            >
              <Phone className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-brand-navy text-brand-white shadow-brand transition hover:bg-brand-ink active:scale-95"
              aria-label={tc("whatsapp")}
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2} aria-hidden />
            </a>
          </div>
        </div>

        {/* Bottom row: section links */}
        <nav
          className="border-t border-brand-silver/90 bg-brand-off px-4 py-2.5 sm:px-6 lg:px-8"
          aria-label={tn("toolbar")}
        >
          <ul
            aria-label={tn("siteSections")}
            className="-mx-1 flex items-stretch gap-2 overflow-x-auto overscroll-x-contain py-0.5 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {SECTION_HASHES.map((hash) => (
              <li key={hash} className="flex shrink-0">
                <a
                  href={hash}
                  className="inline-flex min-h-[40px] items-center whitespace-nowrap rounded-md border border-transparent px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-navy transition hover:border-brand-silver hover:bg-brand-white hover:text-brand-blue sm:text-xs"
                >
                  {label(hash)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
