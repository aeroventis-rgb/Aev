import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { LegalPageShell } from "@/components/LegalPageShell";
import { frenchPageMetadata } from "@/lib/french-page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  const t = await getTranslations({ locale: "fr", namespace: "OurServices" });
  return frenchPageMetadata("/nos-services", t("metaTitle"), t("metaDescription"));
}

export default async function NosServicesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "fr") notFound();
  return (
    <LegalPageShell
      pathname="/nos-services"
      namespace="OurServices"
      blocks={[
        { titleKey: "climTitle", bodyKey: "climBody", href: "/climatisation" },
        { titleKey: "ventTitle", bodyKey: "ventBody", href: "/ventilation" },
        { titleKey: "extractTitle", bodyKey: "extractBody", href: "/extraction" },
        { titleKey: "smokeTitle", bodyKey: "smokeBody", href: "/desenfumage" },
        { titleKey: "plombTitle", bodyKey: "plombBody", href: "/plomberie" },
        { titleKey: "heatTitle", bodyKey: "heatBody", href: "/pompe-a-chaleur-air-eau" },
        { titleKey: "floorTitle", bodyKey: "floorBody", href: "/chauffage-au-sol" },
        { titleKey: "hammamTitle", bodyKey: "hammamBody", href: "/hammam-beldi" },
        { titleKey: "airTitle", bodyKey: "airBody", href: "/traitement-air" },
        { titleKey: "maintTitle", bodyKey: "maintBody" },
      ]}
    />
  );
}
