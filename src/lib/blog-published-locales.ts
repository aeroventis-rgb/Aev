import type { Locale } from "@/i18n/routing";

/**
 * Locales that publish each blog slug.
 * `blog.ts` checks this map against the markdown files during the build,
 * so a French-only article does not advertise missing translations.
 */
export const publishedBlogLocales: Record<string, readonly Locale[]> = {
  "climatisation-gainable-villa-marrakech": ["fr"],
  "climatiseur-ne-refroidit-plus": ["fr"],
  "desenfumage-immeuble-parking-mohammedia": ["fr"],
  "guide-plomberie-villa": ["fr"],
  "maitrisez-votre-climat": ["fr", "ar", "en"],
  "ventilation-vmc-villa-rabat": ["fr"],
};
