import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- Surfaces (light modern-SaaS canvas) ---
        paper: "#F7F9FC", // app canvas / page background
        "paper-2": "#EDF1FA", // subtle alt-section panel
        surface: "#FFFFFF", // cards
        // --- Ink / text (deep navy) ---
        ink: "#0B1533", // primary text + dark surfaces
        "ink-soft": "#46506B", // body / secondary text
        // --- Brand (cobalt, from the CampOS logo) ---
        brand: "#1E3FD0",
        "brand-deep": "#1730A8",
        "brand-bright": "#3A5BF0",
        honey: "#1E3FD0", // legacy alias → brand
        "honey-deep": "#1730A8", // legacy alias → brand-deep
        // --- Cool neutrals (slate) ---
        slate: "#5B6680",
        "slate-deep": "#222C45",
        sage: "#5B6680", // legacy alias → slate
        "sage-deep": "#222C45", // legacy alias → slate-deep
        // --- Tints ---
        sky: "#D9E2FB", // light brand tint
        blush: "#D9E2FB", // legacy alias → sky
        mist: "#DCE4F2", // hover borders
        // --- Hairlines ---
        line: "rgba(11,21,51,0.10)",
        "line-soft": "rgba(11,21,51,0.06)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-spline-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
      },
      borderRadius: {
        card: "18px",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(.6)", opacity: "0.7" },
          "80%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        scan: {
          "0%": { top: "9px", opacity: "0" },
          "12%": { opacity: "1" },
          "88%": { opacity: "1" },
          "100%": { top: "calc(100% - 9px)", opacity: "0" },
        },
        /* continuous 3D tumble for the glass prism */
        prismTumble: {
          "0%": { transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)" },
          "100%": { transform: "rotateX(360deg) rotateY(360deg) rotateZ(360deg)" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 2.4s ease-out infinite",
        scan: "scan 2.6s cubic-bezier(.5,0,.5,1) infinite",
        "prism-tumble": "prismTumble 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
