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
        {
          titleKey: "casaTitle",
          bodyKey: "casaBody",
          links: [
            { href: "/climatisation-casablanca", label: "Climatisation à Casablanca" },
            { href: "/plomberie-casablanca", label: "Plombier à Casablanca" },
          ],
        },
        {
          titleKey: "mohammediaTitle",
          bodyKey: "mohammediaBody",
          links: [{ href: "/climatisation-mohammedia", label: "Climatisation à Mohammedia" }],
        },
        { titleKey: "bouskouraTitle", bodyKey: "bouskouraBody", href: "/climatisation-bouskoura" },
        { titleKey: "tamarisTitle", bodyKey: "tamarisBody", href: "/climatisation-tamaris" },
        { titleKey: "zenataTitle", bodyKey: "zenataBody", href: "/climatisation-zenata" },
        {
          titleKey: "rabatTitle",
          bodyKey: "rabatBody",
          links: [
            { href: "/climatisation-rabat", label: "Climatisation à Rabat" },
            { href: "/plomberie-rabat", label: "Plombier à Rabat" },
          ],
        },
        {
          titleKey: "marrakechTitle",
          bodyKey: "marrakechBody",
          links: [
            { href: "/climatisation-marrakech", label: "Climatisation à Marrakech" },
            { href: "/plomberie-marrakech", label: "Plombier à Marrakech" },
          ],
        },
        { titleKey: "projectsTitle", bodyKey: "projectsBody" },
      ]}
    />
  );
}
