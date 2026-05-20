import { routing } from "@/i18n/routing";

/** Production URL — set NEXT_PUBLIC_SITE_URL on Vercel (no trailing slash). */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://www.aeroventis.ma");
  return raw.replace(/\/+$/, "");
}

/**
 * Path for a locale-aware route (matches next-intl `localePrefix: "as-needed"`).
 */
export function localePath(locale: string, pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const suffix = normalized === "/" ? "" : normalized;

  if (locale === routing.defaultLocale) {
    return suffix ? suffix : "/";
  }

  return `/${locale}${suffix}`;
}

export function absoluteUrl(locale: string, pathname: string): string {
  return `${getSiteUrl()}${localePath(locale, pathname)}`;
}
