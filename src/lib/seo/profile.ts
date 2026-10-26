/**
 * Business facts rendered in JSON-LD only after the owner fills them.
 * Empty values are omitted on purpose — do not publish a partial address or guessed hours.
 */

export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressRegion: string;
  addressCountry: "MA";
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

/** TODO(owner): street address. Not rendered until every field is a non-empty string. */
export const BUSINESS_ADDRESS: PostalAddress | null = null;

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
  const values = [
    address.streetAddress,
    address.addressLocality,
    address.postalCode,
    address.addressRegion,
    address.addressCountry,
  ];
  if (values.some((value) => typeof value !== "string" || value.trim() === "")) return null;
  return address;
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
