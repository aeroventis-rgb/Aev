import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPageShell } from "@/components/LegalPageShell";
import { frenchPageMetadata } from "@/lib/french-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "fr", namespace: "About" });
  return frenchPageMetadata("/qui-sommes-nous", t("metaTitle"), t("metaDescription"));
}

export default function QuiSommesNousPage() {
  return (
    <LegalPageShell
      namespace="About"
      blocks={[
        { titleKey: "missionTitle", bodyKey: "missionBody" },
        { titleKey: "expertiseTitle", bodyKey: "expertiseBody" },
        { titleKey: "valuesTitle", bodyKey: "valuesBody" },
        { titleKey: "commitmentTitle", bodyKey: "commitmentBody" },
      ]}
    />
  );
}
