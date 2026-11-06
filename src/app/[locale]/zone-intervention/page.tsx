import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { LegalPageShell } from "@/components/LegalPageShell";
import { frenchPageMetadata } from "@/lib/french-page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  const t = await getTranslations({ locale: "fr", namespace: "Coverage" });
  return frenchPageMetadata("/zone-intervention", t("metaTitle"), t("metaDescription"));
}

export default async function ZoneInterventionPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  return (
    <LegalPageShell
      pathname="/zone-intervention"
      namespace="Coverage"
      blocks={[
        { titleKey: "casaTitle", bodyKey: "casaBody", href: "/climatisation-casablanca" },
        { titleKey: "mohammediaTitle", bodyKey: "mohammediaBody", href: "/climatisation-mohammedia" },
        { titleKey: "bouskouraTitle", bodyKey: "bouskouraBody", href: "/climatisation-bouskoura" },
        { titleKey: "tamarisTitle", bodyKey: "tamarisBody", href: "/climatisation-tamaris" },
        { titleKey: "zenataTitle", bodyKey: "zenataBody", href: "/climatisation-zenata" },
        { titleKey: "rabatTitle", bodyKey: "rabatBody", href: "/climatisation-rabat" },
        { titleKey: "marrakechTitle", bodyKey: "marrakechBody", href: "/climatisation-marrakech" },
        { titleKey: "projectsTitle", bodyKey: "projectsBody" },
      ]}
    />
  );
}
