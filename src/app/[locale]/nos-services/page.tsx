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
        { titleKey: "climTitle", bodyKey: "climBody" },
        { titleKey: "ventTitle", bodyKey: "ventBody" },
        { titleKey: "plombTitle", bodyKey: "plombBody" },
        { titleKey: "maintTitle", bodyKey: "maintBody" },
      ]}
    />
  );
}
