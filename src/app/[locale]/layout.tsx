import type { Metadata } from "next";
import type { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Montserrat, Noto_Sans_Arabic } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, getSiteUrl } from "@/lib/site";
import { BRAND_LOGO_SRC, IMAGES } from "@/lib/constants";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#022F70",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale: loc, namespace: "meta" });
  const title = t("title");

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, absoluteUrl(l, "/")])
  ) as Record<string, string>;

  languages["x-default"] = absoluteUrl(routing.defaultLocale, "/");

  const keywords = t("keywords")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: "%s | AEROVENTIS",
    },
    description: t("description"),
    keywords,
    authors: [{ name: "AEROVENTIS" }],
    creator: "AEROVENTIS",
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl(loc, "/"),
      languages,
    },
    openGraph: {
      title,
      description: t("description"),
      locale:
        locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) =>
          l === "ar" ? "ar_MA" : l === "en" ? "en_US" : "fr_MA"
        ),
      type: "website",
      url: absoluteUrl(loc, "/"),
      siteName: "AEROVENTIS",
      images: [
        {
          url: IMAGES.heroVilla,
          width: 1600,
          height: 1066,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("description"),
      images: [IMAGES.heroVilla],
    },
    category: "business",
    icons: {
      icon: BRAND_LOGO_SRC,
      apple: BRAND_LOGO_SRC,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${montserrat.variable} ${notoArabic.variable} ${
          locale === "ar" ? "font-arabic" : "font-sans"
        }`}
      >
        <a
          href="#main-content"
          className="fixed start-4 top-4 z-[100] -translate-y-[120%] rounded-md bg-brand-blue px-4 py-2 text-sm font-bold text-brand-white shadow-brand transition-transform focus:translate-y-0"
        >
          {tNav("skipToContent")}
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
