import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF9F5",
        "paper-2": "#F3EFE6",
        ink: "#18241E",
        "ink-soft": "#425047",
        sage: "#5A7363",
        "sage-deep": "#36473C",
        honey: "#D79744",
        "honey-deep": "#BC7E2E",
        blush: "#E8CBB9",
        mist: "#E6DFD2",
        line: "rgba(24,36,30,0.12)",
        "line-soft": "rgba(24,36,30,0.07)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
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
