import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactPageView } from "@/components/ContactPageView";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { PHONE_E164 } from "@/lib/constants";
import { localePageMetadata } from "@/lib/locale-page-metadata";
import { generateContactQrDataUrl } from "@/lib/qr";
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
  const [contactQrDataUrl, t] = await Promise.all([
    generateContactQrDataUrl(),
    getTranslations({ locale: loc, namespace: "ContactPage" }),
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
      <GoogleAnalytics />
      <JsonLd data={schema} />
      <ContactPageView contactQrDataUrl={contactQrDataUrl} />
    </>
  );
}
