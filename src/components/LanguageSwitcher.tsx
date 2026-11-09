"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { alternatePath } from "@/lib/routes";

const localeLabels: Record<Locale, string> = {
  fr: "FR",
  ar: "AR",
  en: "EN",
};

export function LanguageSwitcher({
  compact,
  variant = "default",
  label = "Language",
}: {
  compact?: boolean;
  variant?: "default" | "bar";
  label?: string;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  if (variant === "bar") {
    return (
      <div role="group" dir="ltr" aria-label={label} className="flex shrink-0 items-center text-[11px] font-semibold tracking-wide sm:text-xs">
        {routing.locales.map((loc, index) => (
          <span key={loc} className="flex items-center">
            {index > 0 ? (
              <span className="px-1 text-white/40" aria-hidden>
                |
              </span>
            ) : null}
            <Link
              href={alternatePath(pathname || "/", loc)}
              locale={loc}
              prefetch={false}
              hrefLang={loc}
              className={`inline-flex min-h-11 items-center px-1 sm:min-h-8 ${
                locale === loc ? "text-white" : "text-white/70 hover:text-white"
              }`}
              aria-current={locale === loc ? "page" : undefined}
            >
              {localeLabels[loc]}
            </Link>
          </span>
        ))}
      </div>
    );
  }

  const pad = compact ? "px-2 py-[5px]" : "px-3 py-1";
  const textSz = compact ? "text-[10px] uppercase tracking-wide" : "text-xs";

  return (
    <div
      className={`flex shrink-0 gap-0.5 rounded-md border border-brand-silver bg-brand-white shadow-sm ${compact ? "p-[3px]" : "p-1"}`}
      role="group"
      aria-label={label}
    >
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={alternatePath(pathname || "/", loc)}
          locale={loc}
          prefetch={false}
          className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md font-bold transition sm:min-h-[36px] sm:min-w-[36px] ${pad} ${textSz} ${
            locale === loc
              ? "bg-brand-blue text-white pointer-events-none"
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
