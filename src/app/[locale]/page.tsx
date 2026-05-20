import { LandingPage } from "@/components/LandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateContactQrDataUrl } from "@/lib/qr";
import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/site";
import { PHONE_E164, IMAGES } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  const [contactQrDataUrl, tSchema] = await Promise.all([
    generateContactQrDataUrl(),
    getTranslations({ locale: loc, namespace: "schema" }),
  ]);

  const url = absoluteUrl(loc, "/");

  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${url}#hvac`,
    name: "AEROVENTIS",
    description: tSchema("description"),
    url,
    telephone: PHONE_E164,
    image: [IMAGES.heroVilla],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Casablanca",
        containedInPlace: { "@type": "Country", name: "Morocco" },
      },
      {
        "@type": "City",
        name: "Rabat",
        containedInPlace: { "@type": "Country", name: "Morocco" },
      },
      {
        "@type": "City",
        name: "Marrakech",
        containedInPlace: { "@type": "Country", name: "Morocco" },
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    currenciesAccepted: "MAD",
    paymentAccepted: "Cash, CreditCard",
  };

  return (
    <>
      <JsonLd data={schema} />
      <LandingPage contactQrDataUrl={contactQrDataUrl} />
    </>
  );
}
