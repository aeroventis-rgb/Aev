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
        { titleKey: "casaTitle", bodyKey: "casaBody" },
        { titleKey: "rabatTitle", bodyKey: "rabatBody" },
        { titleKey: "marrakechTitle", bodyKey: "marrakechBody" },
        { titleKey: "projectsTitle", bodyKey: "projectsBody" },
      ]}
    />
  );
}
