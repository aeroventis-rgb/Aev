/** Google Analytics 4 measurement ID. */
export const GA_MEASUREMENT_ID = "G-P39EGKLB47";

/** Google Ads account tag. Configured on every page; this alone is not a conversion. */
export const GOOGLE_ADS_ID = "AW-18127900372";

/**
 * Existing Google Ads conversion labeled like a purchase ("Achat").
 * This site has no checkout. Do not send this label on a page view, and do not
 * reuse it for a call or a WhatsApp click — that trains bidding on the wrong action.
 */
export const GOOGLE_ADS_CONVERSION_SEND_TO =
  "AW-18127900372/2kE8CLqQ_MwcENSdh8RD";

/**
 * Optional Google Ads conversion labels for real leads.
 * Create the actions in Google Ads (one for phone clicks, one for WhatsApp),
 * then paste each "send_to" value below. Format: AW-18127900372/AbCdEfGhIjKlMnOp
 * Leave a string empty to send GA4 events only.
 * Do not paste GOOGLE_ADS_CONVERSION_SEND_TO — that label is the purchase / Achat action.
 */
export const GOOGLE_ADS_PHONE_LEAD_SEND_TO = "";
export const GOOGLE_ADS_WHATSAPP_LEAD_SEND_TO = "";

/**
 * Regions where Consent Mode stays denied until a CMP calls
 * gtag('consent', 'update', ...). Everywhere else (including Morocco) is granted,
 * so lead measurement works without a cookie wall.
 * ISO 3166-1 alpha-2: EEA, United Kingdom, Switzerland.
 */
export const CONSENT_REQUIRED_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
] as const;

const CONSENT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  security_storage: "granted",
} as const;

const CONSENT_GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
  functionality_storage: "granted",
  security_storage: "granted",
} as const;

/**
 * Consent Mode v2 defaults. Must run before gtag('config', ...).
 * No banner: visitors outside the regions above are measured, and a later CMP
 * can still call gtag('consent', 'update', { ... }).
 */
export const GOOGLE_CONSENT_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
if (typeof window.gtag !== "function") {
  window.gtag = function gtag(){window.dataLayer.push(arguments);};
}
window.gtag("consent", "default", ${JSON.stringify({
  ...CONSENT_DENIED,
  region: [...CONSENT_REQUIRED_REGIONS],
})});
window.gtag("consent", "default", ${JSON.stringify(CONSENT_GRANTED)});
window.gtag("set", "ads_data_redaction", true);
window.gtag("set", "url_passthrough", true);
`.trim();

export type LeadMethod = "phone" | "whatsapp";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const SEND_TO_PATTERN = /^AW-\d+\/[A-Za-z0-9_-]+$/;
const CLICK_EVENT: Record<LeadMethod, "click_call" | "click_whatsapp"> = {
  phone: "click_call",
  whatsapp: "click_whatsapp",
};

const warnedLabels = new Set<string>();

/**
 * Returns a usable Ads lead label, or null when the slot is empty, malformed,
 * or still set to the purchase / Achat label.
 */
export function sanitizeLeadSendTo(raw: string, purchaseSendTo: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  if (value === purchaseSendTo.trim()) return null;
  if (!SEND_TO_PATTERN.test(value)) return null;
  return value;
}

export function leadConversionSendTo(method: LeadMethod): string | null {
  const raw = method === "phone" ? GOOGLE_ADS_PHONE_LEAD_SEND_TO : GOOGLE_ADS_WHATSAPP_LEAD_SEND_TO;
  const sendTo = sanitizeLeadSendTo(raw, GOOGLE_ADS_CONVERSION_SEND_TO);
  if (raw.trim() && !sendTo && !warnedLabels.has(method)) {
    warnedLabels.add(method);
    console.warn(
      `[analytics] Google Ads ${method} lead label was ignored. Paste a new conversion label (AW-18127900372/...), not the Achat purchase label.`,
    );
  }
  return sendTo;
}

/** Classifies a link the visitor actually activated. Page URLs are not leads. */
export function classifyLeadLink(href: string, base = "https://www.aeroventis.ma"): LeadMethod | null {
  const value = href.trim();
  if (!value) return null;
  if (/^tel:/i.test(value)) return "phone";
  if (/^(javascript|data|mailto|sms):/i.test(value)) return null;

  let url: URL;
  try {
    url = new URL(value, base);
  } catch {
    return null;
  }

  if (url.protocol === "tel:") return "phone";
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host === "wa.me" || host === "api.whatsapp.com") return "whatsapp";
  return null;
}

function callGtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments as unknown);
    };
  }
  window.gtag(...args);
}

function leadEventParams(method: LeadMethod, href: string, linkText?: string) {
  const text = linkText?.replace(/\s+/g, " ").trim().slice(0, 120);
  const params: Record<string, string> = {
    method,
    link_url: href,
    transport_type: "beacon",
  };
  if (text) params.link_text = text;
  return params;
}

/**
 * Records one real lead action.
 * Always sends GA4 `click_call` or `click_whatsapp`, plus `generate_lead`.
 * Sends a Google Ads conversion only when that action has its own label.
 * There is no contact form on the site, so nothing here listens for submits.
 */
export function trackLeadClick(method: LeadMethod, href: string, linkText?: string) {
  if (typeof window === "undefined") return;

  const params = leadEventParams(method, href, linkText);
  callGtag("event", CLICK_EVENT[method], params);
  callGtag("event", "generate_lead", params);

  const sendTo = leadConversionSendTo(method);
  if (!sendTo) return;

  const transactionId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

  callGtag("event", "conversion", {
    send_to: sendTo,
    transaction_id: transactionId,
    transport_type: "beacon",
  });
}
