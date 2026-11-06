import type { Metadata } from "next";
import type { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Montserrat, Noto_Sans_Arabic } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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
  if (!routing.locales.includes(locale as Locale)) {
    return {};
  }

  const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: "AEROVENTIS",
      template: "%s | AEROVENTIS",
    },
    authors: [{ name: "AEROVENTIS" }],
    creator: "AEROVENTIS",
    robots: { index: true, follow: true },
    category: "business",
    openGraph: {
      siteName: "AEROVENTIS",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    ...(gsc ? { verification: { google: gsc } } : {}),
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
        <GoogleAnalytics />
        <a
          href="#main-content"
          className="fixed start-4 top-4 z-[100] -translate-y-[120%] rounded-md bg-brand-blue px-4 py-2 text-sm font-bold text-brand-white shadow-brand transition-transform focus:translate-y-0"
        >
          {tNav("skipToContent")}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
