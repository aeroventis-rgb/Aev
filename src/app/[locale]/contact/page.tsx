import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactPageView } from "@/components/ContactPageView";
import { GoogleAdsConversion } from "@/components/GoogleAdsConversion";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { PHONE_E164 } from "@/lib/constants";
import { localePageMetadata } from "@/lib/locale-page-metadata";
import { generateContactQrDataUrl } from "@/lib/qr";
import { breadcrumbJsonLd } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "ContactPage" });
  return localePageMetadata(loc, "/contact", t("metaTitle"), t("metaDescription"));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const [contactQrDataUrl, t, nav] = await Promise.all([
    generateContactQrDataUrl(),
    getTranslations({ locale: loc, namespace: "ContactPage" }),
    getTranslations({ locale: loc, namespace: "nav" }),
  ]);

  const url = absoluteUrl(loc, "/contact");

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#contact`,
    name: t("heading"),
    description: t("metaDescription"),
    url,
    inLanguage: loc === "ar" ? "ar" : loc === "en" ? "en" : "fr",
    mainEntity: {
      "@type": "HVACBusiness",
      name: "AEROVENTIS",
      telephone: PHONE_E164,
      url: absoluteUrl(loc, "/"),
      areaServed: ["Casablanca", "Rabat", "Marrakech"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: PHONE_E164,
          contactType: "customer service",
          availableLanguage: ["French", "Arabic", "English"],
          areaServed: "MA",
        },
      ],
    },
  };

  return (
    <>
      <GoogleAdsConversion />
      <JsonLd
        data={[
          schema,
          breadcrumbJsonLd([
            { name: nav("home"), url: absoluteUrl(loc, "/") },
            { name: t("heading"), url },
          ]),
        ]}
      />
      <ContactPageView contactQrDataUrl={contactQrDataUrl} />
    </>
  );
}
