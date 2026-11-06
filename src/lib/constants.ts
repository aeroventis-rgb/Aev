export const PHONE_DISPLAY = "06 60 98 96 98";
export const PHONE_E164 = "+212660989698";
export const WHATSAPP_URL = "https://wa.me/212660989698";
export const QR_CONTACT_URL = WHATSAPP_URL;

/** Official lockup: AV monogram, wordmark, motto, and the four highlighted trades. */
export const BRAND_LOGO_SRC = "/aeroventis-logo.png";

/** Same official file in the hero panel. The wider offer (extraction, désenfumage, plomberie) is in the page copy. */
export const BRAND_HERO_POSTER_SRC = "/aeroventis-logo.png";

/** Partner marks in `public/` — JPG uploads + SVG fallbacks where no photo yet */
export const PARTNERS = [
  { id: "daikin", name: "Daikin", logo: "/photo_7_2026-05-22_22-45-15.jpg", tile: "dark" as const },
  { id: "mitsubishi", name: "Mitsubishi Electric", logo: "/partners/mitsubishi.svg" },
  { id: "midea", name: "Midea", logo: "/photo_2_2026-05-22_22-45-15.jpg" },
  { id: "lg", name: "LG", logo: "/photo_5_2026-05-22_22-45-15.jpg", tile: "dark" as const },
  { id: "samsung", name: "Samsung", logo: "/photo_6_2026-05-22_22-45-15.jpg" },
  { id: "carrier", name: "Carrier", logo: "/photo_1_2026-05-22_22-45-15.jpg" },
  { id: "fitco", name: "Fitco", logo: "/partners/fitco.svg" },
  { id: "rtec", name: "RTEC", logo: "/photo_4_2026-05-22_22-45-15.jpg" },
  { id: "ciat", name: "CIAT", logo: "/photo_3_2026-05-22_22-45-15.jpg", tile: "dark" as const },
] as const;

/** Hero backdrop. Brand slides live in `brand-slides.ts`. */
export const IMAGES = {
  heroVilla: "/hero-background.webp",
} as const;
