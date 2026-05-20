export const PHONE_DISPLAY = "06 60 98 96 98";
export const PHONE_E164 = "+212660989698";
export const WHATSAPP_URL = "https://wa.me/212660989698";
export const QR_CONTACT_URL = WHATSAPP_URL;

/** Served from `public/logo.jpg` — source: `logo.JPG` at repo root */
export const BRAND_LOGO_SRC = "/logo.jpg";

export const PARTNERS = [
  { id: "daikin", name: "Daikin", logo: "/partners/daikin.svg" },
  { id: "mitsubishi", name: "Mitsubishi Electric", logo: "/partners/mitsubishi.svg" },
  { id: "lg", name: "LG", logo: "/partners/lg.svg" },
  { id: "samsung", name: "Samsung", logo: "/partners/samsung.svg" },
  { id: "carrier", name: "Carrier", logo: "/partners/carrier.svg" },
  { id: "fitco", name: "Fitco", logo: "/partners/fitco.svg" },
  { id: "rtec", name: "RTEC", logo: "/partners/rtec.svg" },
  { id: "ciat", name: "CIAT", logo: "/partners/ciat.svg" },
] as const;

/** Local poster backdrop (Gemini-generated asset in `public/`) */
export const IMAGES = {
  heroVilla: "/hero-background.png",
  /** Outdoor / packaged AC units */
  acInstall:
    "https://images.unsplash.com/photo-1737256359080-9354dbcc21ef?auto=format&fit=crop&w=1100&q=90",
  plumbing:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1100&q=90",
  /** Metal ventilation / duct trunking */
  galleryDucted:
    "https://images.unsplash.com/photo-1615309662243-70f6df917b59?auto=format&fit=crop&w=960&q=88",
  /** Commercial piping & ceiling services install */
  galleryInstall:
    "https://images.unsplash.com/photo-1708705261211-b2a244a811dc?auto=format&fit=crop&w=960&q=88",
  galleryPlumbing:
    "https://images.unsplash.com/photo-1574334292321-4844f63aefef?auto=format&fit=crop&w=960&q=88",
  /** Climate control — thermostat */
  galleryFinish:
    "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=960&q=88",

  /** Section underlays: clim / ventilation / airflow (below hero only) */
  bgSectionServices:
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1800&q=78",
  bgSectionProjects:
    "https://images.unsplash.com/photo-1737256359080-9354dbcc21ef?auto=format&fit=crop&w=1800&q=78",
  bgSectionBenefits:
    "https://images.unsplash.com/photo-1590620284812-3216c0ea0a75?auto=format&fit=crop&w=1800&q=78",
  bgSectionContact:
    "https://images.unsplash.com/photo-1558358235-a0a93f68a52c?auto=format&fit=crop&w=1800&q=78",
} as const;
