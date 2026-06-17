"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const N = 21;
type Kind = "qr" | "krib" | "nada" | "unireg";

interface Slide {
  tag: string;
  meta: string;
  kind: Kind;
  seed?: number;
  capH: string;
  capSub: string;
  divider: string;
  status: string;
  footL: React.ReactNode;
  footR: React.ReactNode;
}

/* ---- deterministic QR matrix ---- */
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

/* ---- dark mode optimized icons ---- */
const Check = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M2 8.5l3.5 3.5L14 4" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Shield = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5l5.5 2.2V7c0 3.4-2.3 5.7-5.5 7-3.2-1.3-5.5-3.6-5.5-7V3.7L8 1.5z" stroke="#60A5FA" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const Home = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M2.5 7.5L8 3l5.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M4 6.5V13h8V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const Ledger = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="2.5" width="10" height="11" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
    <path d="M5.5 6h5M5.5 9h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const FunaaBnBGlyph = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-[62px] w-[62px]">
    <path d="M10 30 32 13l22 17" stroke="#E2E8F0" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M15 27v23h34V27" stroke="#E2E8F0" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M27 50V37h10v13" stroke="#E2E8F0" strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="46" cy="20" r="8" fill="#1E293B" stroke="#60A5FA" strokeWidth="2.4" />
    <path d="M42.5 20l2.5 2.5 4-4.5" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const NadaGlyph = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-[62px] w-[62px]">
    <path d="M16 8h20l12 12v36H16z" stroke="#E2E8F0" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M36 8v12h12" stroke="#E2E8F0" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M23 30h18M23 38h18" stroke="#E2E8F0" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="42" cy="46" r="8" fill="#1E293B" stroke="#A78BFA" strokeWidth="2.4" />
    <path d="M38.5 46l2.5 2.5 4-4.5" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UniregGlyph = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-[62px] w-[62px]">
    <rect x="14" y="12" width="28" height="40" rx="4" stroke="#E2E8F0" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M22 24h12M22 32h12M22 40h6" stroke="#E2E8F0" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="46" cy="40" r="8" fill="#1E293B" stroke="#34D399" strokeWidth="2.4" />
    <path d="M42.5 40l2.5 2.5 4-4.5" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SLIDES: Slide[] = [
  {
    tag: "CampOS · ScanMark",
    meta: "Hall 2B · just now",
    kind: "qr",
    seed: 7,
    capH: "Scan to check in",
    capSub: "Code refreshes every 15s · no proxies",
    divider: "Checked in",
    status: "Checked into CSC 401 — phone matched enrolled device, room matched Hall 2B. One-time code burned on use.",
    footL: <><Check /><b className="text-white">38</b>&nbsp;present</>,
    footR: <><Shield /> 0 proxies</>,
  },
  {
    tag: "CampOS · FunaaBnB",
    meta: "North Gate · 0.4 mi",
    kind: "krib",
    capH: "Lease verified",
    capSub: "Skyline Loft · owner ID confirmed",
    divider: "Signed",
    status: "Signed a verified lease using the same identity for class. Owner ID and photos confirmed.",
    footL: <><Check /> Owner verified</>,
    footR: <><Home /> $540 / month</>,
  },
  {
    tag: "CampOS · Nada",
    meta: "Campus Feed · just now",
    kind: "nada",
    capH: "Anonymous thread",
    capSub: "Verified student · ZK proof",
    divider: "Posted securely",
    status: "Posted to the campus feed. Ledger verified active student status without attaching name—100% anonymous.",
    footL: <><Check /> verified student</>,
    footR: <><Shield /> fully anonymous</>,
  },
  {
    tag: "CampOS · Unireg",
    meta: "Registrar · 2s ago",
    kind: "unireg",
    capH: "Enrollment confirmed",
    capSub: "CSC 401 · tuition settled",
    divider: "On the ledger",
    status: "Enrolled in core module with a single click. Identity, prerequisites, and payment instantly verified.",
    footL: <><Check /> 12 credits</>,
    footR: <><Ledger /> verified</>,
  },
];

export function HeroCard() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const innerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (reduce) return;
    const outer = setInterval(() => {
      setFading(true);
      innerRef.current = setTimeout(() => {
        setIdx((i) => (i + 1) % SLIDES.length);
        setFading(false);
      }, 520);
    }, 5200);
    return () => {
      clearInterval(outer);
      if (innerRef.current) clearTimeout(innerRef.current);
    };
  }, [reduce]);

  const slide = SLIDES[idx];
  const matrix = useMemo(
    () => (slide.kind === "qr" ? buildMatrix(slide.seed ?? 7) : null),
    [slide.kind, slide.seed]
  );
  const fade = { opacity: fading ? 0 : 1, transition: "opacity .5s" };

  return (
    <div className="relative max-w-[520px] rounded-[24px] border border-white/10 bg-white/[0.03] p-[clamp(22px,2.4vw,34px)] shadow-2xl backdrop-blur-2xl transition-transform hover:scale-[1.02] duration-500 will-change-transform rotate-y-[-5deg] rotate-x-[5deg]">
      
      {/* Subtle top glare */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent" />

      {/* head */}
      <div className="mb-[1.3rem] flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-white/70">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
          </span>
          {slide.tag}
        </span>
        <span className="text-right font-mono text-[0.7rem] text-white/40">
          {slide.meta}
        </span>
      </div>

      {/* stage */}
      <div className="flex min-h-[3.4em] items-center gap-[clamp(16px,2vw,24px)]" style={fade}>
        <div className="relative grid h-[120px] w-[120px] flex-none place-items-center overflow-hidden rounded-[16px] border border-white/10 bg-black/40 shadow-inner p-[12px]">
          {slide.kind === "qr" && matrix ? (
            <>
              <div
                className="grid h-full w-full"
                style={{
                  gridTemplateColumns: `repeat(${N},1fr)`,
                  gridTemplateRows: `repeat(${N},1fr)`,
                }}
              >
                {matrix.map((on, i) => (
                  <span key={i} className={on ? "bg-white" : ""} />
                ))}
              </div>
              <span className="pointer-events-none absolute inset-x-2 top-2 h-[2px] animate-scan bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_2px_rgba(59,130,246,0.8)]" />
            </>
          ) : slide.kind === "krib" ? (
            <FunaaBnBGlyph />
          ) : slide.kind === "nada" ? (
            <NadaGlyph />
          ) : (
            <UniregGlyph />
          )}
        </div>
        <div>
          <p className="mb-1 font-display text-[1.4rem] font-semibold text-white tracking-tight">
            {slide.capH}
          </p>
          <p className="font-mono text-[0.75rem] text-white/50 leading-relaxed">
            {slide.capSub}
          </p>
        </div>
      </div>

      {/* divider */}
      <div className="my-[1.2rem] flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-widest text-white/30">
        {slide.divider}
        <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      {/* identity */}
      <div className="mb-[1rem] flex items-center gap-3 rounded-[12px] border border-white/5 bg-white/[0.02] p-3">
        <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-display text-[1rem] text-white shadow-lg">
          A
        </span>
        <div>
          <span className="flex items-center gap-1.5 text-[0.95rem] font-semibold text-white">
            Ada Okafor
            <svg className="h-[14px] w-[14px] text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </span>
          <span className="block font-mono text-[0.7rem] text-white/40">
            MAT/2026/043118 · one identity
          </span>
        </div>
      </div>

      <p className="min-h-[4.5em] text-[0.9rem] leading-relaxed text-white/60" style={fade}>
        {slide.status}
      </p>

      {/* foot */}
      <div className="mt-[1.5rem] flex items-center gap-4 border-t border-white/10 pt-[1.2rem] text-[0.8rem] text-white/50">
        <span className="inline-flex items-center gap-1.5">
          {slide.footL}
        </span>
        <span className="inline-flex items-center gap-1.5">
          {slide.footR}
        </span>
        <span className="ml-auto flex gap-1.5" aria-hidden>
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
