import Script from "next/script";
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID, GOOGLE_CONSENT_BOOTSTRAP } from "@/lib/analytics";

/**
 * Site-wide Google tag (Ads + GA4).
 * Consent defaults are also set before hydration. They are repeated here,
 * immediately before config, so a page view is never sent ahead of consent.
 * Config uses the account IDs only. Do not append a conversion label:
 * that would count every page view as a conversion.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-gtag-config" strategy="afterInteractive">
        {`
          ${GOOGLE_CONSENT_BOOTSTRAP}
          window.gtag('js', new Date());
          window.gtag('config', '${GOOGLE_ADS_ID}');
          window.gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
