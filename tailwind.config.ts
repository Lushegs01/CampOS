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
        /* slow, drifting aurora glows behind the hero */
        auroraOne: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.9" },
          "50%": { transform: "translate3d(7%, 5%, 0) scale(1.18)", opacity: "1" },
        },
        auroraTwo: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1.12)", opacity: "0.85" },
          "50%": { transform: "translate3d(-6%, -5%, 0) scale(0.92)", opacity: "1" },
        },
        auroraThree: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translate3d(5%, -7%, 0) scale(1.14)", opacity: "0.9" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 2.4s ease-out infinite",
        scan: "scan 2.6s cubic-bezier(.5,0,.5,1) infinite",
        "aurora-one": "auroraOne 19s ease-in-out infinite",
        "aurora-two": "auroraTwo 23s ease-in-out infinite",
        "aurora-three": "auroraThree 27s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
