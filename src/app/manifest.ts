import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AEROVENTIS — Climatisation, ventilation et plomberie",
    short_name: "AEROVENTIS",
    description:
      "Climatisation, ventilation, extraction, désenfumage et plomberie à Casablanca, Mohammedia, Bouskoura, Tamaris, Zenata, Rabat et Marrakech.",
    start_url: "/fr",
    scope: "/",
    display: "standalone",
    background_color: "#F7F9FC",
    theme_color: "#022F70",
    lang: "fr",
    dir: "ltr",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
