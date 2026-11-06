import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingView } from "@/components/landings/ServiceLandingView";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale } from "@/lib/routes";
import { getLandingPage, getLandingPages } from "@/lib/landings/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getLandingPages().flatMap((page) =>
    page.locales.map((locale) => ({ locale, slug: page.slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getLandingPage(slug);
  if (!page || !isLocale(locale) || !page.locales.includes(locale)) notFound();
  return buildPageMetadata({
    locale,
    pathname: `/${page.slug}`,
    title: page.title,
    description: page.description,
    locales: page.locales,
  });
}

export default async function LandingRoute({ params }: Props) {
  const { locale, slug } = await params;
  const page = getLandingPage(slug);
  if (!page || !isLocale(locale) || !page.locales.includes(locale)) notFound();

  const url = absoluteUrl(locale, `/${page.slug}`);
  const crumbs = page.breadcrumbs.map((crumb) => ({
    name: crumb.name,
    url: absoluteUrl(locale, crumb.pathname ?? `/${page.slug}`),
  }));

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: page.h1,
            description: page.description,
            url,
            serviceType: page.serviceType,
            areaServed: page.areaServed,
          }),
          faqJsonLd(page.faqs),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <ServiceLandingView page={page} />
    </>
  );
}
