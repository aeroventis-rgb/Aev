import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPageShell } from "@/components/LegalPageShell";
import { frenchPageMetadata } from "@/lib/french-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "fr", namespace: "OurServices" });
  return frenchPageMetadata("/nos-services", t("metaTitle"), t("metaDescription"));
}

export default function NosServicesPage() {
  return (
    <LegalPageShell
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
