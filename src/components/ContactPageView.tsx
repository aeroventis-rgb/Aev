import Image from "next/image";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { PHONE_E164, WHATSAPP_URL } from "@/lib/constants";

type Props = {
  contactQrDataUrl: string;
};

const CITY_KEYS = ["casa", "mohammedia", "bouskoura", "tamaris", "zenata", "rabat", "marrakech"] as const;

export async function ContactPageView({ contactQrDataUrl }: Props) {
  const t = await getTranslations("ContactPage");
  const tc = await getTranslations("cta");

  return (
    <div className="min-h-screen bg-white pb-16">
      <SiteNav />
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">

        <header className="max-w-3xl py-14 md:py-20">
          <p className="text-sm font-medium text-brand-blue">AEROVENTIS</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">{t("heading")}</h1>
          <p className="mt-3 text-lg text-brand-navy/80">{t("subheading")}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-navy/75">{t("intro")}</p>
          <p className="mt-4 text-sm leading-relaxed text-brand-navy/70">
            {t("quoteBadge")} · {t("guaranteeBadge")} · {t("coverageBadge")}
          </p>
        </header>

        <section className="grid gap-6 border-t border-brand-silver py-12 md:grid-cols-2 md:py-16">
          <a
            href={`tel:${PHONE_E164}`}
            className="rounded-md border border-brand-silver p-8 transition hover:border-brand-blue/40"
          >
            <Phone className="h-6 w-6 text-brand-blue" aria-hidden />
            <p className="mt-4 text-sm text-brand-navy/70">{t("phoneLabel")}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-brand-ink">{tc("phone")}</p>
            <p className="mt-2 text-sm text-brand-blue">{tc("callNow")}</p>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-brand-silver p-8 transition hover:border-brand-blue/40"
          >
            <MessageCircle className="h-6 w-6 text-brand-blue" aria-hidden />
            <p className="mt-4 text-sm text-brand-navy/70">{t("whatsappLabel")}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-brand-ink">{tc("whatsapp")}</p>
            <p className="mt-2 text-sm text-brand-navy/70">{tc("quote")}</p>
          </a>
        </section>

        <section className="border-t border-brand-silver py-12 md:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-ink">{t("citiesTitle")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CITY_KEYS.map((key) => (
              <article key={key} className="rounded-md border border-brand-silver p-6">
                <MapPin className="h-5 w-5 text-brand-blue" aria-hidden />
                <h3 className="mt-3 text-base font-semibold text-brand-ink">{t(key)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">{t(`${key}Desc`)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-t border-brand-silver py-12 md:py-16 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="max-w-xl">
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-brand-blue" aria-hidden />
              <div>
                <h2 className="text-lg font-semibold text-brand-ink">{t("hoursTitle")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">{t("hoursBody")}</p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-brand-ink">{t("responseTitle")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/75">{t("responseBody")}</p>
              <p className="mt-4 text-sm text-brand-navy/70">
                {t("guaranteeBadge")} · {t("quoteBadge")}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-brand-navy/70">{t("scanTitle")}</p>
            <Image
              src={contactQrDataUrl}
              alt={tc("scanQr")}
              width={128}
              height={128}
              className="mt-3 rounded-md border border-brand-silver bg-white p-2"
              unoptimized
            />
            <p className="mt-3 max-w-[10rem] text-sm leading-snug text-brand-navy/70">{tc("scanQr")}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
