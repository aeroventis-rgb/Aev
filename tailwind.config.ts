import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",
          off: "#F7F9FC",
          silver: "#E3E3E3",
          "silver-mid": "#B8B8B8",
          ink: "#000E31",
          navy: "#022F70",
          "navy-soft": "#043A7A",
          blue: "#0A5BAA",
          "blue-mid": "#07519C",
          "blue-light": "#0C67B8",
          "blue-bright": "#1284C8",
        },
        /* Legacy aliases → logo palette (no gold) */
        navy: {
          DEFAULT: "#022F70",
          dark: "#000E31",
          deep: "#000E31",
          light: "#0A5BAA",
          panel: "#043A7A",
        },
        gold: {
          DEFAULT: "#0A5BAA",
          light: "#0C67B8",
          dark: "#07519C",
          foil: "#E3E3E3",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brand: "0 1px 2px rgba(2, 47, 112, 0.06)",
        "brand-sm": "0 1px 2px rgba(2, 47, 112, 0.04)",
        "brand-md": "0 10px 28px -16px rgba(0, 14, 49, 0.1)",
        "brand-lg": "0 18px 40px -24px rgba(0, 14, 49, 0.12)",
        nav: "0 1px 0 rgba(227, 227, 227, 1)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(180deg, #0A5BAA 0%, #0A5BAA 100%)",
        "brand-gradient-soft": "linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)",
        "hero-overlay": "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
