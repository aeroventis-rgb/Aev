export const PHONE_DISPLAY = "06 60 98 96 98";
export const PHONE_E164 = "+212660989698";
export const WHATSAPP_URL = "https://wa.me/212660989698";
export const QR_CONTACT_URL = WHATSAPP_URL;

/** Official lockup: AV monogram, wordmark, motto, and the four highlighted trades. */
export const BRAND_LOGO_SRC = "/aeroventis-logo.png";

/** Same official file in the hero panel. The wider offer (extraction, désenfumage, plomberie) is in the page copy. */
export const BRAND_HERO_POSTER_SRC = "/aeroventis-logo.png";

/**
 * Partner marks already used on the site, as sharp SVGs in `public/partners`.
 * Width and height match each file's viewBox so the lockups keep their real proportions.
 */
export const PARTNERS = [
  { id: "daikin", name: "Daikin", logo: "/partners/daikin.svg", width: 300, height: 65 },
  { id: "mitsubishi", name: "Mitsubishi Electric", logo: "/partners/mitsubishi.svg", width: 794, height: 242 },
  { id: "lg", name: "LG", logo: "/partners/lg.svg", width: 600, height: 275 },
  { id: "samsung", name: "Samsung", logo: "/partners/samsung.svg", width: 1576, height: 256 },
  { id: "carrier", name: "Carrier", logo: "/partners/carrier.svg", width: 709, height: 285 },
  { id: "midea", name: "Midea", logo: "/partners/midea.svg", width: 3228, height: 1242 },
  { id: "ciat", name: "CIAT", logo: "/partners/ciat.svg", width: 275, height: 138 },
  { id: "fitco", name: "Fitco", logo: "/partners/fitco.svg", width: 422, height: 142 },
  { id: "rtec", name: "RTEC", logo: "/partners/rtec.svg", width: 700, height: 214 },
] as const;

/** Hero backdrop and the homepage plan illustration. Brand slides live in `brand-slides.ts`. */
export const IMAGES = {
  heroVilla: "/hero-background.webp",
  /** Stock floor-plan photo. An illustration, not a client's plan or an AEROVENTIS job site. */
  planIllustration: "/plan-illustration.webp",
} as const;

/**
 * Owner-supplied homepage illustrations (villa hero, service-card bands, diffuser
 * column, réalisations strip). Shown with an "Illustration" label — not identified
 * AEROVENTIS job sites. The French desktop banner stays `FR_HOME_TOP`.
 */
export const HOME_ILLUSTRATIONS = {
  hero: "/home/illustration-hero.webp",
  climate: "/home/illustration-climatisation.webp",
  ventilation: "/home/illustration-ventilation.webp",
  plumbing: "/home/illustration-plomberie.webp",
  fitout: "/home/illustration-amenagement.webp",
  maintenance: "/home/illustration-maintenance.webp",
  diffuserLinear: "/home/illustration-diffuseur-lineaire.webp",
  diffuserCassette: "/home/illustration-diffuseur-cassette.webp",
  diffuserRound: "/home/illustration-diffuseur-circulaire.webp",
  workVilla: "/home/illustration-realisation-villa.webp",
  workReception: "/home/illustration-realisation-accueil.webp",
  workDining: "/home/illustration-realisation-salle.webp",
  workCare: "/home/illustration-realisation-soin.webp",
  workRoof: "/home/illustration-realisation-toiture.webp",
} as const;

/**
 * French homepage, from 768px up: the owner's mockup with the copy drawn in the image.
 * Phones keep the HTML hero. English and Arabic keep the HTML top.
 */
export const FR_HOME_TOP = {
  src: "/home/fr-home-top.webp",
  width: 1672,
  height: 941,
} as const;
