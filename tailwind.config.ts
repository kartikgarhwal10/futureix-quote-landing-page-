import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            950: "#030A16",
            900: "#051329",
            800: "#0A2345", // Deep navy
            700: "#0F315E",
            600: "#16437E",
            500: "#1E58A3",
          },
          electric: {
            300: "#8EB0FF",
            400: "#6591FF",
            500: "#4776FF", // Electric blue
            600: "#2B5FFF",
            700: "#1448E0",
          },
          gold: {
            300: "#F2C766",
            400: "#E6B23B",
            500: "#D89A1E", // Royal gold accent
            600: "#B87F13",
            700: "#8F600A",
          },
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(71, 118, 255, 0.25)",
        goldGlow: "0 0 25px -5px rgba(216, 154, 30, 0.25)",
        card: "0 4px 20px -2px rgba(10, 35, 69, 0.06), 0 2px 6px -1px rgba(10, 35, 69, 0.04)",
        cardHover: "0 14px 34px -4px rgba(10, 35, 69, 0.12), 0 4px 12px -2px rgba(10, 35, 69, 0.08)",
        glass: "0 8px 32px 0 rgba(10, 35, 69, 0.37)",
      },
    },
  },
  plugins: [],
};
export default config;
