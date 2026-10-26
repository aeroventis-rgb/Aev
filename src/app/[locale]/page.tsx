import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateContactQrDataUrl } from "@/lib/qr";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { hvacBusinessJsonLd } from "@/lib/seo/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "meta" });
  const keywords = t("keywords")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return buildPageMetadata({
    locale: loc,
    pathname: "/",
    title: t("title"),
    description: t("description"),
    locales: routing.locales,
    keywords,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;

  const [contactQrDataUrl, tSchema] = await Promise.all([
    generateContactQrDataUrl(),
    getTranslations({ locale: loc, namespace: "schema" }),
  ]);

  return (
    <>
      <JsonLd data={hvacBusinessJsonLd(tSchema("description"))} />
      <LandingPage contactQrDataUrl={contactQrDataUrl} />
    </>
  );
}
