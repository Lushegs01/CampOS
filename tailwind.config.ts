import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- canvas / surfaces (cinematic dark) ----
        void: "#05060A",
        ink: "#090B11",
        "ink-2": "#0D1018",
        surface: "#11141D",
        "surface-2": "#171B26",
        "surface-3": "#1E2331",

        // ---- hairlines ----
        line: "rgba(255,255,255,0.08)",
        "line-2": "rgba(255,255,255,0.14)",
        "line-3": "rgba(255,255,255,0.24)",

        // ---- text ----
        hi: "#F4F7FF",
        body: "#C2C9D6",
        mute: "#828C9E",
        faint: "#5A6273",

        // ---- brand + accents ----
        primary: "#2E6BFF",
        "primary-deep": "#0047BA",
        azure: "#38BDF8",
        cyan: "#22D3EE",
        indigo: "#6366F1",
        violet: "#8B5CF6",
        mint: "#34D399",
        gold: "#E6B968",
        rose: "#FB7185",

        // ---- light relief ----
        paper: "#F4F6FA",
        "paper-2": "#E9EDF4",
        "paper-ink": "#0A0C12",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-spline-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        wrap: "1220px",
      },
      borderRadius: {
        card: "20px",
        xl2: "28px",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(46,107,255,0.55)",
        "glow-sm": "0 0 30px -8px rgba(46,107,255,0.5)",
        lift: "0 30px 70px -30px rgba(0,0,0,0.8)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(.6)", opacity: "0.7" },
          "80%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        scan: {
          "0%": { top: "8px", opacity: "0" },
          "12%": { opacity: "1" },
          "88%": { opacity: "1" },
          "100%": { top: "calc(100% - 8px)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        aurora: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(6%,-8%) scale(1.15)" },
          "66%": { transform: "translate(-7%,5%) scale(0.92)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        dash: {
          to: { strokeDashoffset: "0" },
        },
        riseIn: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 2.4s ease-out infinite",
        scan: "scan 2.6s cubic-bezier(.5,0,.5,1) infinite",
        float: "float 7s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        aurora: "aurora 22s ease-in-out infinite",
        "aurora-slow": "aurora 34s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        "spin-slow": "spinSlow 36s linear infinite",
        "spin-rev": "spinSlow 48s linear infinite reverse",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
