"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ---------- deterministic QR (identical on server + client) ---------- */
const N = 21;
function buildMatrix(seed: number): boolean[] {
  let x = (seed * 9301 + 49297) % 233280;
  const rnd = () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
  const eyes: [number, number][] = [
    [0, 0],
    [0, N - 7],
    [N - 7, 0],
  ];
  const finder = (r: number, c: number) => {
    for (const [fr, fc] of eyes) {
      if (r >= fr && r < fr + 7 && c >= fc && c < fc + 7) {
        const rr = r - fr;
        const cc = c - fc;
        const ring = rr === 0 || rr === 6 || cc === 0 || cc === 6;
        const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
        return { hit: true, on: ring || core };
      }
    }
    return { hit: false, on: false };
  };
  const sep = (r: number, c: number) => {
    for (const [fr, fc] of eyes) {
      if (r >= fr - 1 && r <= fr + 7 && c >= fc - 1 && c <= fc + 7) return true;
    }
    return false;
  };
  const cells: boolean[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const f = finder(r, c);
      if (f.hit) cells.push(f.on);
      else if (sep(r, c)) cells.push(false);
      else cells.push(rnd() > 0.5);
    }
  }
  return cells;
}

/* ---------- glyphs ---------- */
const HomeGlyph = ({ c }: { c: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
    <path d="M8 22 24 9l16 13" stroke={c} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M12 19v18h24V19" stroke={c} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M20 37V27h8v10" stroke={c} strokeWidth="2.4" strokeLinejoin="round" />
  </svg>
);
const ChatGlyph = ({ c }: { c: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
    <path d="M10 12h28a3 3 0 0 1 3 3v15a3 3 0 0 1-3 3H22l-9 7v-7h-3a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3Z" stroke={c} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M16 20h16M16 26h10" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const DocGlyph = ({ c }: { c: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
    <path d="M14 7h14l9 9v25a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke={c} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M28 7v9h9" stroke={c} strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M18 26h12M18 32h8" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

/* tiny inline icons used in the dock + footer */
const Icon = {
  scan: (c: string) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
      <path d="M3 7V4.5A1.5 1.5 0 0 1 4.5 3H7M13 3h2.5A1.5 1.5 0 0 1 17 4.5V7M17 13v2.5a1.5 1.5 0 0 1-1.5 1.5H13M7 17H4.5A1.5 1.5 0 0 1 3 15.5V13" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 10h14" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  home: (c: string) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
      <path d="M3 9.5 10 4l7 5.5M5 8.5V16h10V8.5" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  chat: (c: string) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
      <path d="M4 4h12a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 16 14H9l-4 3v-3a1.5 1.5 0 0 1-1.5-1.5v-7A1.5 1.5 0 0 1 4 4Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  doc: (c: string) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
      <path d="M6 3h6l3 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 10h4M8 13h3" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  check: (c: string) => (
    <svg viewBox="0 0 16 16" fill="none" className="h-[14px] w-[14px]">
      <path d="M2.5 8.5 6 12l7.5-8" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

type Kind = "qr" | "home" | "chat" | "doc";
interface Slide {
  app: string;
  dock: keyof typeof Icon;
  accent: string;
  meta: string;
  kind: Kind;
  seed?: number;
  title: string;
  subtitle: string;
  status: string;
  footL: string;
  footR: string;
}

const SLIDES: Slide[] = [
  {
    app: "ScanMark",
    dock: "scan",
    accent: "#2E6BFF",
    meta: "Hall 2B · CSC 401",
    kind: "qr",
    seed: 7,
    title: "Checked in",
    subtitle: "Rotating code · single-use · device-bound",
    status: "Her phone matched her enrolled device and the room matched Hall 2B. The one-time code burned on scan — no proxy possible.",
    footL: "38 present",
    footR: "0 proxies",
  },
  {
    app: "FunaaBnB",
    dock: "home",
    accent: "#34D399",
    meta: "North Gate · 0.4 mi",
    kind: "home",
    title: "Lease verified",
    subtitle: "Skyline Loft · Studio · owner ID confirmed",
    status: "She signed a verified lease with the same identity she uses for class. Owner ID-checked, photos confirmed — no agent, no deposit to a stranger.",
    footL: "Owner verified",
    footR: "$540 / mo",
  },
  {
    app: "Nada",
    dock: "chat",
    accent: "#8B5CF6",
    meta: "Campus feed · just now",
    kind: "chat",
    title: "Posted anonymously",
    subtitle: "Verified student · zero-knowledge proof",
    status: "The ledger proved he is an enrolled student without attaching his name or ID to the message. Fully anonymous, zero bots.",
    footL: "Verified student",
    footR: "Anonymous",
  },
  {
    app: "Unireg",
    dock: "doc",
    accent: "#22D3EE",
    meta: "Registrar · 2s ago",
    kind: "doc",
    title: "Enrollment confirmed",
    subtitle: "CSC 401 · tuition settled · receipt anchored",
    status: "One click enrolled her in a core module. Identity, prerequisites and payment verified on the campus ledger with no manual processing.",
    footL: "12 credits",
    footR: "On ledger",
  },
];

export function CampusConsole() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const inner = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (reduce) return;
    const outer = setInterval(() => {
      setFading(true);
      inner.current = setTimeout(() => {
        setIdx((i) => (i + 1) % SLIDES.length);
        setFading(false);
      }, 460);
    }, 4200);
    return () => {
      clearInterval(outer);
      if (inner.current) clearTimeout(inner.current);
    };
  }, [reduce]);

  const s = SLIDES[idx];
  const matrix = useMemo(
    () => (s.kind === "qr" ? buildMatrix(s.seed ?? 7) : null),
    [s.kind, s.seed]
  );
  const fade = { opacity: fading ? 0 : 1, transition: "opacity .42s ease" } as const;

  return (
    <div className="relative">
      {/* ambient glow behind the console */}
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-60 blur-3xl transition-colors duration-700"
        style={{ background: `radial-gradient(60% 60% at 70% 20%, ${s.accent}44, transparent 70%)` }}
      />

      <div className="edge animate-float rounded-xl2 glass-strong p-[clamp(16px,1.8vw,22px)] shadow-lift">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
            </span>
            <span className="ml-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-faint">
              CampOS · live
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-mute">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            Verified session
          </span>
        </div>

        {/* dock — switching apps under one identity */}
        <div className="mt-4 grid grid-cols-4 gap-1.5 rounded-2xl border border-line bg-black/20 p-1.5">
          {SLIDES.map((m, i) => {
            const active = i === idx;
            return (
              <div
                key={m.app}
                className="flex flex-col items-center gap-1.5 rounded-xl px-1 py-2 transition-all duration-300"
                style={
                  active
                    ? { background: `${m.accent}1a`, boxShadow: `inset 0 0 0 1px ${m.accent}55` }
                    : undefined
                }
              >
                <span style={{ filter: active ? `drop-shadow(0 0 8px ${m.accent}aa)` : "none" }}>
                  {Icon[m.dock](active ? m.accent : "#6B7385")}
                </span>
                <span
                  className="font-mono text-[0.6rem] tracking-[0.04em] transition-colors"
                  style={{ color: active ? "#F4F7FF" : "#5A6273" }}
                >
                  {m.app}
                </span>
              </div>
            );
          })}
        </div>

        {/* stage */}
        <div className="mt-4 flex items-center gap-4" style={fade}>
          <div
            className="relative grid h-[112px] w-[112px] flex-none place-items-center overflow-hidden rounded-2xl border bg-black/30"
            style={{ borderColor: `${s.accent}44`, boxShadow: `0 0 32px -10px ${s.accent}88` }}
          >
            {s.kind === "qr" && matrix ? (
              <>
                <div
                  className="grid h-[86px] w-[86px]"
                  style={{ gridTemplateColumns: `repeat(${N},1fr)`, gridTemplateRows: `repeat(${N},1fr)` }}
                >
                  {matrix.map((on, i) => (
                    <span key={i} className={on ? "bg-hi" : ""} />
                  ))}
                </div>
                <span
                  className="pointer-events-none absolute left-3 right-3 top-2 h-[2px] animate-scan"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`, boxShadow: `0 0 10px 1px ${s.accent}` }}
                />
              </>
            ) : s.kind === "home" ? (
              <HomeGlyph c={s.accent} />
            ) : s.kind === "chat" ? (
              <ChatGlyph c={s.accent} />
            ) : (
              <DocGlyph c={s.accent} />
            )}
          </div>

          <div className="min-w-0">
            <div className="mb-1 font-mono text-[0.66rem] uppercase tracking-[0.12em]" style={{ color: s.accent }}>
              {s.app} · {s.meta}
            </div>
            <p className="display-sm text-[1.4rem] leading-tight">{s.title}</p>
            <p className="mt-1 font-mono text-[0.72rem] leading-relaxed text-mute">{s.subtitle}</p>
          </div>
        </div>

        {/* identity (constant) */}
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-line bg-white/[0.02] px-3 py-2.5">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gradient-to-br from-primary to-violet font-display text-[1rem] text-white">
            A
          </span>
          <div className="min-w-0">
            <span className="flex items-center gap-1.5 text-[0.92rem] font-semibold text-hi">
              Ada Okafor
              <svg className="h-[15px] w-[15px] flex-none" viewBox="0 0 20 20" fill="none" aria-label="verified">
                <path d="M10 1.5l2.1 1.5 2.6-.2 1 2.4 2.2 1.4-.7 2.5.7 2.5-2.2 1.4-1 2.4-2.6-.2L10 18.5l-2.1-1.5-2.6.2-1-2.4-2.2-1.4.7-2.5-.7-2.5 2.2-1.4 1-2.4 2.6.2L10 1.5z" fill="#2E6BFF" />
                <path d="M6.6 10l2.1 2.1 4.7-4.7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="block font-mono text-[0.68rem] tracking-[0.02em] text-faint">
              MAT/2026/043118 · one CampOS identity
            </span>
          </div>
          <span className="ml-auto hidden items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-mint sm:flex">
            {Icon.check("#34D399")} verified
          </span>
        </div>

        <p className="mt-3 min-h-[3.4em] text-[0.9rem] leading-relaxed text-body" style={fade}>
          {s.status}
        </p>

        {/* footer / ledger */}
        <div className="mt-3 flex items-center gap-4 border-t border-line pt-3 font-mono text-[0.72rem] text-mute">
          <span className="inline-flex items-center gap-1.5" style={{ color: s.accent }}>
            {Icon.check(s.accent)} {s.footL}
          </span>
          <span className="inline-flex items-center gap-1.5">{s.footR}</span>
          <span className="ml-auto flex gap-1.5" aria-hidden>
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className="h-[5px] rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 18 : 5,
                  background: i === idx ? s.accent : "rgba(255,255,255,0.16)",
                }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
