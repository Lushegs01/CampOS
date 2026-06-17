import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        "paper-2": "#F8FAFC",
        ink: "#0F172A",
        "ink-soft": "#475569",
        slate: "#64748B",
        "slate-deep": "#1E293B",
        primary: "#0047BA",
        "primary-deep": "#002D80",
        "accent-light": "#DBEAFE",
        "slate-light": "#E2E8F0",
        line: "rgba(15,23,42,0.12)",
        "line-soft": "rgba(15,23,42,0.06)",
        // Hybrid Additions
        obsidian: "#0B0F19",
        "obsidian-soft": "#1A2035",
        "neon-indigo": "#6366F1",
        "neon-violet": "#8B5CF6",
        "emerald-glow": "#10B981",
        "glass-white": "rgba(255, 255, 255, 0.7)",
        "glass-dark": "rgba(11, 15, 25, 0.6)",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        mesh: {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        }
      },
      animation: {
        "pulse-ring": "pulseRing 2.4s ease-out infinite",
        scan: "scan 2.6s cubic-bezier(.5,0,.5,1) infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        mesh: "mesh 15s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
