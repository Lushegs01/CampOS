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

/* ---- deterministic QR matrix (identical on server + client) ---- */
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

/* ---- small inline icons ---- */
const Check = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 8.5l3.5 3.5L14 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Shield = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1.5l5.5 2.2V7c0 3.4-2.3 5.7-5.5 7-3.2-1.3-5.5-3.6-5.5-7V3.7L8 1.5z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);
const Home = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path
      d="M2.5 7.5L8 3l5.5 4.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M4 6.5V13h8V6.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
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
    <path d="M10 30 32 13l22 17" stroke="#18241E" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M15 27v23h34V27" stroke="#18241E" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M27 50V37h10v13" stroke="#18241E" strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="46" cy="20" r="8" fill="#FBF9F5" stroke="#D79744" strokeWidth="2.4" />
    <path
      d="M42.5 20l2.5 2.5 4-4.5"
      stroke="#D79744"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const NadaGlyph = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-[62px] w-[62px]">
    <path d="M16 8h20l12 12v36H16z" stroke="#18241E" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M36 8v12h12" stroke="#18241E" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M23 30h18M23 38h18" stroke="#18241E" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="42" cy="46" r="8" fill="#FBF9F5" stroke="#D79744" strokeWidth="2.4" />
    <path
      d="M38.5 46l2.5 2.5 4-4.5"
      stroke="#D79744"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UniregGlyph = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-[62px] w-[62px]">
    <rect x="14" y="12" width="28" height="40" rx="4" stroke="#18241E" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M22 24h12M22 32h12M22 40h6" stroke="#18241E" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="46" cy="40" r="8" fill="#FBF9F5" stroke="#D79744" strokeWidth="2.4" />
    <path
      d="M42.5 40l2.5 2.5 4-4.5"
      stroke="#D79744"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SLIDES: Slide[] = [
  {
    tag: "CampOS · ScanMark",
    meta: "Hall 2B · just now",
    kind: "qr",
    seed: 7,
    capH: "Scan to check in",
    capSub: "Code refreshes every 15s · single use · no proxies",
    divider: "Checked in",
    status:
      "Checked into CSC 401 — her phone matched her enrolled device and the room matched Hall 2B. The one-time code burned on use, so no proxy was possible.",
    footL: (
      <>
        <Check />
        <b>38</b>&nbsp;present
      </>
    ),
    footR: (
      <>
        <Shield /> 0 proxies
      </>
    ),
  },
  {
    tag: "CampOS · FunaaBnB",
    meta: "North Gate · 0.4 mi",
    kind: "krib",
    capH: "Lease verified",
    capSub: "Skyline Loft · Studio · owner ID confirmed",
    divider: "Signed",
    status:
      "Signed a verified lease the same identity uses for class. The owner was ID-checked and the photos confirmed — no agent, no deposit to a stranger.",
    footL: (
      <>
        <Check /> Owner verified
      </>
    ),
    footR: (
      <>
        <Home /> $540 / month
      </>
    ),
  },
  {
    tag: "CampOS · Nada",
    meta: "Campus Feed · just now",
    kind: "nada",
    capH: "Anonymous thread",
    capSub: "Verified student · Zero-knowledge proof",
    divider: "Posted securely",
    status:
      "He posted a bold opinion to the campus feed. The ledger verified his active student status without attaching his name or ID to the message—100% anonymous, zero bots.",
    footL: (
      <>
        <Check /> verified student
      </>
    ),
    footR: (
      <>
        <Shield /> fully anonymous
      </>
    ),
  },
  {
    tag: "CampOS · Unireg",
    meta: "Registrar · 2s ago",
    kind: "unireg",
    capH: "Enrollment confirmed",
    capSub: "CSC 401 · tuition settled · receipt anchored",
    divider: "On the ledger",
    status:
      "Enrolled in her core module with a single click. Her identity, prerequisites, and payment were instantly verified on the campus ledger without manual processing.",
    footL: (
      <>
        <Check /> 12 credits
      </>
    ),
    footR: (
      <>
        <Ledger /> verified
      </>
    ),
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
    <div className="relative max-w-[520px] rounded-card glass-light p-[clamp(22px,2.4vw,34px)] animate-float">
      <span className="pointer-events-none absolute inset-0 rounded-card shadow-[inset_0_0_0_1px_rgba(255,255,255,.5)]" />

      {/* head */}
      <div className="mb-[1.3rem] flex items-center justify-between gap-4">
        <span className="inline-flex flex-none items-center gap-[0.55em] whitespace-nowrap rounded-full bg-paper-2 px-[0.8em] py-[0.42em] font-mono text-[0.7rem] uppercase tracking-[0.1em] text-slate">
          <span className="relative inline-block h-[7px] w-[7px] flex-none rounded-full bg-primary">
            <span className="absolute -inset-[3px] rounded-full border-[1.4px] border-primary opacity-60 animate-pulse-ring" />
          </span>
          {slide.tag}
        </span>
        <span className="text-right font-mono text-[0.72rem] text-ink-soft opacity-70">
          {slide.meta}
        </span>
      </div>

      {/* stage */}
      <div className="flex min-h-[3.4em] items-center gap-[clamp(16px,2vw,24px)]" style={fade}>
        <div className="relative grid h-[clamp(118px,13vw,140px)] w-[clamp(118px,13vw,140px)] flex-none place-items-center overflow-hidden rounded-[12px] border border-white/40 bg-white/80 backdrop-blur-md p-[9px] shadow-xl">
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
                  <span key={i} className={on ? "bg-ink" : ""} />
                ))}
              </div>
              <span className="pointer-events-none absolute left-[9px] right-[9px] top-[9px] h-[2px] animate-scan bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_1px_rgba(215,151,68,.6)]" />
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
          <p
            className="mb-2 font-display text-[clamp(1.22rem,2vw,1.5rem)] leading-[1.2] tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 40, "SOFT" 70, "wght" 460' }}
          >
            {slide.capH}
          </p>
          <p className="font-mono text-[0.74rem] leading-[1.5] tracking-[0.02em] text-slate">
            {slide.capSub}
          </p>
        </div>
      </div>

      {/* divider */}
      <div className="my-[1.1rem] mt-[1.5rem] flex items-center gap-[0.8em] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-slate">
        {slide.divider}
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* identity (constant — one CampOS identity) */}
      <div className="mb-[0.85rem] flex items-center gap-[0.85em]">
        <span className="grid h-[42px] w-[42px] flex-none place-items-center rounded-full bg-slate font-display text-[1.05rem] text-paper">
          A
        </span>
        <div>
          <span className="flex items-center gap-[0.4em] text-[0.98rem] font-semibold">
            Ada Okafor
            <svg className="h-[15px] w-[15px] flex-none" viewBox="0 0 20 20" fill="none" aria-label="verified">
              <path
                d="M10 1.5l2.1 1.5 2.6-.2 1 2.4 2.2 1.4-.7 2.5.7 2.5-2.2 1.4-1 2.4-2.6-.2L10 18.5l-2.1-1.5-2.6.2-1-2.4-2.2-1.4.7-2.5-.7-2.5 2.2-1.4 1-2.4 2.6.2L10 1.5z"
                fill="#D79744"
              />
              <path
                d="M6.6 10l2.1 2.1 4.7-4.7"
                stroke="#18241E"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="block font-mono text-[0.72rem] tracking-[0.02em] text-slate">
            MAT/2026/043118 · one CampOS identity
          </span>
        </div>
      </div>

      <p
        className="min-h-[4.7em] text-[0.98rem] leading-[1.62] text-ink-soft"
        style={fade}
      >
        {slide.status}
      </p>

      {/* foot */}
      <div className="mt-[1.4rem] flex items-center gap-[1.3rem] border-t border-line-soft pt-[1.2rem] text-[0.84rem] text-ink-soft">
        <span className="inline-flex items-center gap-[0.45em] [&_svg]:opacity-60">
          {slide.footL}
        </span>
        <span className="inline-flex items-center gap-[0.45em] [&_svg]:opacity-60">
          {slide.footR}
        </span>
        <span className="ml-auto flex gap-[0.4em]" aria-hidden>
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-[6px] rounded-full transition-all ${i === idx ? "w-[18px] rounded-[3px] bg-primary" : "w-[6px] bg-line"
                }`}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
