const CANONICAL_SITE_URL = "https://www.aeroventis.ma";

/**
 * Canonical origin, no trailing slash.
 * `NEXT_PUBLIC_SITE_URL` when set, otherwise the live domain.
 * Never `VERCEL_URL` — preview hosts must not become canonical.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || CANONICAL_SITE_URL;
  return raw.replace(/\/+$/, "");
}

export function absoluteAsset(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getSiteUrl()}${path}`;
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
