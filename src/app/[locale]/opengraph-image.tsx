import { readFileSync } from "fs";
import path from "path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "AEROVENTIS — climatisation, ventilation et plomberie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy: Record<string, { title: string; subtitle: string; cities: string; font: string }> = {
  fr: {
    title: "Climatisation, ventilation et plomberie",
    subtitle: "Casablanca, Rabat et Marrakech",
    cities: "HVAC · Froid · Maintenance",
    font: "Montserrat",
  },
  en: {
    title: "HVAC, ventilation and plumbing",
    subtitle: "Casablanca, Rabat and Marrakech",
    cities: "Cooling · Air · Maintenance",
    font: "Montserrat",
  },
  ar: {
    title: "تكييف، تهوية وسباكة",
    subtitle: "الدار البيضاء، الرباط ومراكش",
    cities: "AEROVENTIS",
    font: "Noto Sans Arabic",
  },
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const text = copy[locale] ?? copy.fr;
  const fontsDir = path.join(process.cwd(), "src/assets/fonts");
  const mark = readFileSync(path.join(process.cwd(), "src/assets/og-mark.png"));
  const montserrat = readFileSync(path.join(fontsDir, "Montserrat-latin-800.woff"));
  const arabic = readFileSync(path.join(fontsDir, "NotoSansArabic-arabic-700.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000E31",
          color: "#FFFFFF",
          padding: "64px 72px",
          fontFamily: text.font,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <img
            src={`data:image/png;base64,${mark.toString("base64")}`}
            alt=""
            width={120}
            height={120}
            style={{ borderRadius: 60, border: "4px solid #E3E3E3" }}
          />
          <div style={{ display: "flex", fontSize: 42, letterSpacing: 6, fontFamily: "Montserrat" }}>
            AEROVENTIS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ width: 120, height: 8, background: "#0A5BAA" }} />
          <div style={{ fontSize: locale === "ar" ? 64 : 58, lineHeight: 1.15, maxWidth: 980 }}>
            {text.title}
          </div>
          <div style={{ fontSize: 32, color: "#E3E3E3" }}>{text.subtitle}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            color: "#0C67B8",
            fontFamily: locale === "ar" ? "Montserrat" : text.font,
          }}
        >
          {text.cities}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: montserrat, weight: 800, style: "normal" },
        { name: "Noto Sans Arabic", data: arabic, weight: 700, style: "normal" },
      ],
    }
  );
}
