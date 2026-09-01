import type { Config } from "tailwindcss";

/**
 * CampOS design system.
 *
 * Two grounds — ink and paper — and a single institutional green. Colour is a
 * signal, not a surface: forest for the platform and anything connected, clay
 * for the fragmented "before" state, sage for supporting structure. Everything
 * else is neutral so the diagrams can carry the meaning.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0D0C", // page ground for dark sections
          2: "#101512", // raised surface on ink
          3: "#1A211D", // hairline-bounded panels on ink
        },
        paper: {
          DEFAULT: "#F7F6F2", // warm white, the primary ground
          2: "#EFEEE7",
          3: "#E3E2D9",
        },
        forest: {
          DEFAULT: "#114935", // primary — CampOS green, institutional not neon
          deep: "#0A2E22",
          bright: "#1C6B4E", // interaction / focus only
          tint: "#E6EFEA",
        },
        sage: {
          DEFAULT: "#7B968A",
          soft: "#AEC0B6",
          dim: "#546862",
        },
        clay: {
          DEFAULT: "#B4573A", // restrained accent — status, "before" state
          deep: "#98462C", // small text on paper (AA)
          light: "#CE7856", // small text on ink (AA)
          tint: "#F4E5DE",
        },
        muted: "#585F5B", // body copy on paper (AA on paper)
        faint: "#6B726E", // labels on paper (AA at small sizes)
        "muted-invert": "#A6B0AB", // body copy on ink
        "faint-invert": "#79837E",
        line: {
          DEFAULT: "rgba(10,13,12,0.11)",
          strong: "rgba(10,13,12,0.20)",
          diagram: "rgba(10,13,12,0.28)",
          invert: "rgba(247,246,242,0.13)",
          "invert-strong": "rgba(247,246,242,0.24)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        shell: "1180px",
        prose: "62ch",
      },
      borderRadius: {
        panel: "14px",
        tile: "10px",
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 2.5rem)",
        section: "clamp(4.5rem, 9vw, 8.5rem)",
      },
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.16em" }],
        micro: ["0.75rem", { lineHeight: "1.45", letterSpacing: "0.01em" }],
      },
      transitionTimingFunction: {
        // One curve for the whole site.
        system: "cubic-bezier(0.22, 0.61, 0.24, 1)",
      },
      keyframes: {
        signal: {
          "0%": { strokeDashoffset: "240" },
          "100%": { strokeDashoffset: "-240" },
        },
      },
      animation: {
        signal: "signal 5.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
