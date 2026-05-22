"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  fr: "FR",
  ar: "AR",
  en: "EN",
};

export function LanguageSwitcher({ compact }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const pad = compact ? "px-2 py-[5px]" : "px-3 py-1";
  const textSz = compact ? "text-[10px] uppercase tracking-wide" : "text-xs";

  return (
    <div
      className={`flex shrink-0 gap-0.5 rounded-md border border-brand-silver bg-brand-white shadow-sm ${compact ? "p-[3px]" : "p-1"}`}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname || "/"}
          locale={loc}
          prefetch={false}
          className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md font-bold transition sm:min-h-[36px] sm:min-w-[36px] ${pad} ${textSz} ${
            locale === loc
              ? "brand-gradient text-brand-white shadow-sm pointer-events-none"
              : "text-brand-navy hover:bg-brand-off"
          }`}
          aria-current={locale === loc ? "page" : undefined}
        >
          {localeLabels[loc]}
        </Link>
      ))}
    </div>
  );
}
