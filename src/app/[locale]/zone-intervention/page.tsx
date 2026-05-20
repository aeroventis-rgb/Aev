import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPageShell } from "@/components/LegalPageShell";
import { frenchPageMetadata } from "@/lib/french-page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "fr", namespace: "Coverage" });
  return frenchPageMetadata("/zone-intervention", t("metaTitle"), t("metaDescription"));
}

export default function ZoneInterventionPage() {
  return (
    <LegalPageShell
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
