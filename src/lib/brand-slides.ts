/** Official AEROVENTIS presentation slides (05–19), stored as WebP. */
export const BRAND_SLIDES = {
  solutions: "/brand/05-solutions-residentielles-tertiaires.webp",
  reseaux: "/brand/06-reseaux-aerauliques.webp",
  maintenance: "/brand/07-maintenance-sav.webp",
  pourquoi: "/brand/08-pourquoi-choisir.webp",
  qualite: "/brand/09-qualite-securite-conformite.webp",
  engagements: "/brand/10-nos-engagements.webp",
  ventilation: "/brand/11-ventilation-qualite-air.webp",
  gainable: "/brand/12-systemes-gainables.webp",
  exterieur: "/brand/13-unites-exterieures.webp",
  regulation: "/brand/14-regulation-performance.webp",
  installation: "/brand/15-installation-mise-en-oeuvre.webp",
  miseEnService: "/brand/16-mise-en-service.webp",
  preventive: "/brand/17-maintenance-preventive.webp",
  sav: "/brand/18-sav-depannage.webp",
  projets: "/brand/19-realisations-projets.webp",
} as const;

export type BrandSlideKey = keyof typeof BRAND_SLIDES;

/** Alt text that does not present a brand slide as a photo of a named job site. */
export function brandSlideAlt(subject: string): string {
  return `Visuel de présentation AEROVENTIS — ${subject}. Illustration de marque, et non la photo d'un chantier identifié.`;
}

export function brandSlideCaption(subject: string): string {
  return `Présentation AEROVENTIS : ${subject}. Visuel de marque, pas une photo de chantier identifié.`;
}
