import type { Locale } from "@/i18n/routing";

/**
 * Locales that publish each blog slug.
 * `blog.ts` checks this map against the markdown files during the build,
 * so a French-only article does not advertise missing translations.
 */
export const publishedBlogLocales: Record<string, readonly Locale[]> = {
  "climatisation-gainable-villa-bouskoura": ["fr"],
  "climatisation-gainable-villa-marrakech": ["fr"],
  "climatisation-mohammedia-appartement-villa": ["fr"],
  "climatiseur-ne-refroidit-plus": ["fr"],
  "contrat-maintenance-climatisation-marrakech": ["fr"],
  "depannage-climatisation-rabat": ["fr"],
  "desenfumage-immeuble-parking-mohammedia": ["fr"],
  "etude-cvc-villa-neuve-tamaris": ["fr"],
  "extraction-cuisine-restaurant-zenata": ["fr"],
  "fuite-eau-maison-casablanca": ["fr"],
  "guide-plomberie-villa": ["fr"],
  "maitrisez-votre-climat": ["fr", "ar", "en"],
  "ventilation-riad-marrakech": ["fr"],
  "ventilation-vmc-villa-rabat": ["fr"],
};
