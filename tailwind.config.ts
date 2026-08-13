import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: {
          DEFAULT: "#0c0c0f",
          container: "#18181b",
          lowest: "#0c0c0f",
        },
        border: {
          DEFAULT: "#27272a",
        },
        primary: "#a78bfa",
        tertiary: "#34d399",
        error: "#ef4444",
        text: {
          primary: "#fafafa",
          secondary: "#a1a1aa",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        card: "8px",
      },
      letterSpacing: {
        tighter: "-0.02em",
      },
    },
  },
  plugins: [],
};
export default config;
