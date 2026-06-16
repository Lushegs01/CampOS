import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- Surfaces (dark, cool near-black canvas — harmonizes with cobalt) ---
        paper: "#060810", // app canvas / page background
        "paper-2": "#0A0D18", // subtle alt-section panel
        surface: "#0C1020", // cards
        "surface-2": "#11162A", // nested / hover surface
        // --- Ink / text (now light on the dark canvas) ---
        ink: "#EEF2FF", // primary text + light surfaces
        "ink-soft": "#9AA6C6", // body / secondary text
        // --- Brand (cobalt, from the CampOS logo) ---
        brand: "#1E3FD0",
        "brand-deep": "#1730A8",
        "brand-bright": "#3A5BF0",
        honey: "#3A5BF0", // legacy alias → bright cobalt accent (visible on dark)
        "honey-deep": "#6E8BFF", // legacy alias → light cobalt accent text
        // --- Cool neutrals (slate) ---
        slate: "#7E89A6",
        "slate-deep": "#222C45",
        sage: "#7E89A6", // legacy alias → slate (muted labels)
        "sage-deep": "#222C45", // legacy alias → slate-deep
        // --- Tints ---
        sky: "#AFC0F5", // light cobalt tint (accent text on dark)
        blush: "#AFC0F5", // legacy alias → sky
        mist: "rgba(255,255,255,0.14)", // hover borders
        // --- Hairlines (white-based on the dark canvas) ---
        line: "rgba(255,255,255,0.10)",
        "line-soft": "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-spline-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        hand: ["var(--font-gloria)", "ui-rounded", "cursive"],
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
