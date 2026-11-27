/**
 * Business facts rendered in JSON-LD only when they are known.
 * A missing postal code or region is omitted. Do not invent either.
 * Coordinates, profile URLs and hours stay unpublished until the owner sets them.
 */

export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressCountry: "MA";
  /** Set only when the owner confirms a real code. */
  postalCode?: string;
  /** Set only when the owner confirms a region. */
  addressRegion?: string;
};

export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export type OpeningHours = {
  dayOfWeek: (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
  /** 24h clock, HH:MM */
  opens: string;
  /** 24h clock, HH:MM */
  closes: string;
};

/**
 * Street and city confirmed by the owner.
 * Postal code and region stay omitted until they are known.
 */
export const BUSINESS_ADDRESS: PostalAddress | null = {
  streetAddress: "10 rue Liberté, 3e étage, appt 5",
  addressLocality: "Casablanca",
  addressCountry: "MA",
};

/** TODO(owner): latitude and longitude. Not rendered until both are finite numbers. */
export const BUSINESS_GEO: GeoCoordinates | null = null;

/**
 * TODO(owner): public profile URLs (Facebook, Instagram, LinkedIn, Google Business).
 * Leave empty until the real URLs exist. Not rendered while empty.
 */
export const BUSINESS_SAME_AS: readonly string[] = [];

/** TODO(owner): confirmed opening hours. Not rendered until set. */
export const BUSINESS_HOURS: OpeningHours | null = null;

export function filledAddress(address: PostalAddress | null): PostalAddress | null {
  if (!address) return null;
  const streetAddress = address.streetAddress.trim();
  const addressLocality = address.addressLocality.trim();
  const addressCountry = address.addressCountry.trim();
  if (!streetAddress || !addressLocality || addressCountry !== "MA") return null;

  const filled: PostalAddress = {
    streetAddress,
    addressLocality,
    addressCountry: "MA",
  };
  const postalCode = address.postalCode?.trim() ?? "";
  const addressRegion = address.addressRegion?.trim() ?? "";
  if (postalCode) filled.postalCode = postalCode;
  if (addressRegion) filled.addressRegion = addressRegion;
  return filled;
}

export function filledGeo(geo: GeoCoordinates | null): GeoCoordinates | null {
  if (!geo) return null;
  if (!Number.isFinite(geo.latitude) || !Number.isFinite(geo.longitude)) return null;
  if (geo.latitude < -90 || geo.latitude > 90 || geo.longitude < -180 || geo.longitude > 180) {
    return null;
  }
  return geo;
}

export function filledSameAs(urls: readonly string[]): string[] {
  return urls.map((url) => url.trim()).filter(Boolean);
}

export function filledHours(hours: OpeningHours | null): OpeningHours | null {
  if (!hours) return null;
  if (!hours.dayOfWeek.length) return null;
  if (!/^\d{2}:\d{2}$/.test(hours.opens) || !/^\d{2}:\d{2}$/.test(hours.closes)) return null;
  return hours;
}
