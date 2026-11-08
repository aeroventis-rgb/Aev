import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  classifyLeadLink,
  CONSENT_REQUIRED_REGIONS,
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_CONVERSION_SEND_TO,
  GOOGLE_ADS_ID,
  GOOGLE_CONSENT_BOOTSTRAP,
  leadConversionSendTo,
  sanitizeLeadSendTo,
} from "../src/lib/analytics.ts";

assert.equal(GA_MEASUREMENT_ID, "G-P39EGKLB47");
assert.equal(GOOGLE_ADS_ID, "AW-18127900372");
assert.equal(GOOGLE_ADS_CONVERSION_SEND_TO, "AW-18127900372/2kE8CLqQ_MwcENSdh8RD");

assert.equal(classifyLeadLink("tel:+212660989698"), "phone");
assert.equal(classifyLeadLink("  TEL:+212660989698"), "phone");
assert.equal(classifyLeadLink("https://wa.me/212660989698"), "whatsapp");
assert.equal(classifyLeadLink("https://wa.me/212660989698?text=Bonjour"), "whatsapp");
assert.equal(classifyLeadLink("https://api.whatsapp.com/send?phone=212660989698"), "whatsapp");
assert.equal(classifyLeadLink("https://www.wa.me/212660989698"), "whatsapp");
assert.equal(classifyLeadLink("/contact"), null);
assert.equal(classifyLeadLink("/fr/contact"), null);
assert.equal(classifyLeadLink("https://www.aeroventis.ma/contact"), null);
assert.equal(classifyLeadLink("mailto:contact@aeroventis.ma"), null);
assert.equal(classifyLeadLink(""), null);

assert.equal(sanitizeLeadSendTo("", GOOGLE_ADS_CONVERSION_SEND_TO), null);
assert.equal(sanitizeLeadSendTo("   ", GOOGLE_ADS_CONVERSION_SEND_TO), null);
assert.equal(
  sanitizeLeadSendTo(GOOGLE_ADS_CONVERSION_SEND_TO, GOOGLE_ADS_CONVERSION_SEND_TO),
  null,
);
assert.equal(sanitizeLeadSendTo("not-a-label", GOOGLE_ADS_CONVERSION_SEND_TO), null);
assert.equal(
  sanitizeLeadSendTo("AW-18127900372/phoneLeadLabel1", GOOGLE_ADS_CONVERSION_SEND_TO),
  "AW-18127900372/phoneLeadLabel1",
);

assert.equal(leadConversionSendTo("phone"), null);
assert.equal(leadConversionSendTo("whatsapp"), null);

for (const signal of ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"]) {
  assert.match(GOOGLE_CONSENT_BOOTSTRAP, new RegExp(`"${signal}":"denied"`));
  assert.match(GOOGLE_CONSENT_BOOTSTRAP, new RegExp(`"${signal}":"granted"`));
}
assert.match(GOOGLE_CONSENT_BOOTSTRAP, /ads_data_redaction/);
assert.match(GOOGLE_CONSENT_BOOTSTRAP, /url_passthrough/);
assert.equal(GOOGLE_CONSENT_BOOTSTRAP.includes(GOOGLE_ADS_CONVERSION_SEND_TO), false);
assert.equal(GOOGLE_CONSENT_BOOTSTRAP.includes("MA"), false);

for (const region of ["FR", "DE", "GB", "CH"]) {
  assert.equal(CONSENT_REQUIRED_REGIONS.includes(region), true, region);
}
assert.equal(CONSENT_REQUIRED_REGIONS.includes("MA"), false);

const contact = readFileSync(new URL("../src/app/[locale]/contact/page.tsx", import.meta.url), "utf8");
assert.equal(contact.includes("GoogleAdsConversion"), false);
assert.equal(contact.includes(GOOGLE_ADS_CONVERSION_SEND_TO), false);
assert.equal(existsSync(new URL("../src/components/GoogleAdsConversion.tsx", import.meta.url)), false);

const analyticsComponent = readFileSync(new URL("../src/components/GoogleAnalytics.tsx", import.meta.url), "utf8");
assert.equal(analyticsComponent.includes("gtag('config'"), true);
assert.equal(analyticsComponent.includes(GOOGLE_ADS_CONVERSION_SEND_TO), false);

const layout = readFileSync(new URL("../src/app/[locale]/layout.tsx", import.meta.url), "utf8");
assert.equal(layout.includes("LeadClickTracking"), true);
assert.equal(layout.includes("google-consent-defaults"), true);

console.log("lead tracking checks passed");
