import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        reel: {
          black: "#0B0B0C",
          charcoal: "#151517",
          panel: "#1C1C1F",
          line: "#2B2B2E",
          paper: "#F2EEE6",
          fade: "#A9A6A0",
        },
        amber: {
          DEFAULT: "#E3B341",
          dim: "#9C7A2C",
          bright: "#F5CE6B",
        },
        teal: {
          DEFAULT: "#1F3B36",
          light: "#3E6B60",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-1%, -1%)" },
        },
      },
      animation: {
        blink: "blink 1.6s ease-in-out infinite",
        marquee: "marquee 24s linear infinite",
        kenburns: "kenburns 7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
