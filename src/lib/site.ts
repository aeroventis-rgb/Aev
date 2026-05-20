/** Canonical site URL (no trailing slash). Override with NEXT_PUBLIC_SITE_URL on Vercel. */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://www.aeroventis.ma");
  return raw.replace(/\/+$/, "");
}

/** Path for a locale-aware route (`localePrefix: "always"` → /fr, /en, /ar). */
export function localePath(locale: string, pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const suffix = normalized === "/" ? "" : normalized;
  return `/${locale}${suffix}`;
}

export function absoluteUrl(locale: string, pathname: string): string {
  return `${getSiteUrl()}${localePath(locale, pathname)}`;
}
