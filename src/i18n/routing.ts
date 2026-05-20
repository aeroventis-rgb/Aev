import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "ar", "en"],
  defaultLocale: "fr",
  /** Explicit /fr, /en, /ar — reliable on Vercel (no rewrite-only paths). */
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
