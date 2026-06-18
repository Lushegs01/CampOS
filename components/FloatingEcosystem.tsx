"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Accent system                                                      */
/* ------------------------------------------------------------------ */

type Accent = "indigo" | "cyan" | "emerald" | "violet";

const ACCENT: Record<
  Accent,
  { ring: string; sheen: string; glow: string; rgb: string }
> = {
  indigo: {
    ring: "group-hover:border-emerald-400/40",
    sheen: "to-emerald-500/[0.07]",
    glow: "group-hover:shadow-[0_28px_70px_-20px_rgba(16,185,129,0.55)]",
    rgb: "16,185,129",
  },
  cyan: {
    ring: "group-hover:border-teal-400/40",
    sheen: "to-teal-500/[0.07]",
    glow: "group-hover:shadow-[0_28px_70px_-20px_rgba(13,148,136,0.5)]",
    rgb: "13,148,136",
  },
  emerald: {
    ring: "group-hover:border-emerald-400/40",
    sheen: "to-emerald-500/[0.07]",
    glow: "group-hover:shadow-[0_28px_70px_-20px_rgba(16,185,129,0.5)]",
    rgb: "16,185,129",
  },
  violet: {
    ring: "group-hover:border-green-400/40",
    sheen: "to-green-500/[0.07]",
    glow: "group-hover:shadow-[0_28px_70px_-20px_rgba(34,197,94,0.55)]",
    rgb: "34,197,94",
  },
};

function Panel({
  accent,
  className = "",
  children,
}: {
  accent: Accent;
  className?: string;
  children: React.ReactNode;
}) {
  const a = ACCENT[accent];
  return (
    <div
      className={`group relative overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#0a0e1a]/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-500 ${a.ring} ${a.glow} ${className}`}
    >
      {/* edge sheen */}
      <div className={`pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-tr from-transparent via-transparent ${a.sheen}`} />
      {/* top hairline */}
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-white/80">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Module panels                                                      */
/* ------------------------------------------------------------------ */

function IdentityPanel() {
  return (
    <Panel accent="indigo">
      <div className="mb-4 flex items-center justify-between">
        <PanelLabel>Student Identity</PanelLabel>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[0.6rem] font-bold text-emerald-300">ACTIVE</span>
        </span>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-11 w-11 flex-none rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 p-[1.5px] shadow-[0_0_18px_rgba(16,185,129,0.4)]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0e1a] font-sans text-xs font-bold text-white">
            AO
          </div>
        </div>
        <div className="min-w-0">
          <h4 className="flex items-center gap-1 font-sans text-[0.92rem] font-semibold leading-tight text-white">
            Ada Okafor
            <svg className="h-[14px] w-[14px] flex-none text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
                clipRule="evenodd"
              />
            </svg>
          </h4>
          <span className="block font-mono text-[0.64rem] tracking-wider text-white/50">
            MAT/2026/043118
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-0.5 border-t border-white/[0.05] pt-3 text-[0.74rem]">
        <span className="font-sans font-medium text-white/75">University of Lagos</span>
        <span className="font-mono text-[0.64rem] text-white/50">Dept. of Computer Science</span>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] p-2.5">
        <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg bg-white p-0.5 shadow-inner">
          <div className="grid h-full w-full grid-cols-5 gap-[1px]">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={`rounded-[1px] ${
                  (i * 7 + 3) % 5 === 0 || i < 5 || i % 5 === 0 || i > 20 || i % 5 === 4
                    ? "bg-[#0a0e1a]"
                    : "bg-white"
                }`}
              />
            ))}
          </div>
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]"
            animate={{ top: ["4px", "44px", "4px"] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          />
        </div>
        <div className="ml-3 text-right">
          <span className="block font-mono text-[0.62rem] font-bold tracking-wider text-emerald-300">
            SECURE ACCESS
          </span>
          <span className="mt-0.5 block text-[0.66rem] leading-tight text-white/50">
            One ID. Every gate &amp; door.
          </span>
        </div>
      </div>
    </Panel>
  );
}

function AttendancePanel() {
  return (
    <Panel accent="cyan">
      <div className="mb-4 flex items-center justify-between">
        <PanelLabel>Smart Attendance</PanelLabel>
        <span className="flex items-center gap-1 font-mono text-[0.62rem] font-semibold text-teal-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
          </span>
          LIVE
        </span>
      </div>

      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-sans text-[2rem] font-bold leading-none tracking-tight text-white">96.4%</span>
        <span className="font-mono text-[0.68rem] font-semibold text-emerald-400">+1.2% wk</span>
      </div>

      <p className="mb-3 text-[0.74rem] leading-relaxed text-white/85">
        Checked into <strong className="font-semibold text-white/90">CSC 401</strong> · Hall 2B
        <span className="mt-0.5 block font-mono text-[0.64rem] text-white/50">
          Verified via secure proximity beacon
        </span>
      </p>

      <div className="relative mb-3 h-[135px] w-full overflow-hidden rounded-lg border border-white/10 bg-[#08100d] shadow-inner">
        <img 
          src="/scanmark-portal.png" 
          alt="ScanMark Portal App" 
          className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" 
        />
        {/* Glass badge for context */}
        <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-[#08100d]/80 px-2 py-0.5 border border-white/10 backdrop-blur-md">
          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[0.55rem] font-bold text-white/95 uppercase tracking-wider">ScanMark App</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        {[
          { k: "Live", v: "312" },
          { k: "Classes", v: "18" },
          { k: "Proxies", v: "0" },
        ].map((s) => (
          <div key={s.k} className="flex-1 rounded-lg border border-white/[0.05] bg-white/[0.02] px-2 py-1.5 text-center">
            <div className="font-sans text-[0.82rem] font-bold text-white">{s.v}</div>
            <div className="font-mono text-[0.56rem] uppercase tracking-wider text-white/50">{s.k}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function VerificationPanel() {
  return (
    <Panel accent="emerald">
      <div className="mb-4 flex items-center justify-between">
        <PanelLabel>Credential Verification</PanelLabel>
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.6rem] font-bold text-emerald-300">
          VERIFIED
        </span>
      </div>

      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 11 2 2 4-4" />
          </svg>
        </div>
        <div className="min-w-0">
          <h5 className="font-sans text-[0.88rem] font-semibold leading-snug text-white">
            B.Sc. Computer Science
          </h5>
          <span className="mt-0.5 block text-[0.72rem] text-white/85">
            Ada Okafor · First Class Hons
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.05] bg-white/[0.01] p-2.5 font-mono text-[0.6rem] text-white/50">
        <div className="mb-1 flex justify-between">
          <span>ISSUER</span>
          <span className="text-white/75">UNILAG Registrar</span>
        </div>
        <div className="flex justify-between">
          <span>ANCHOR HASH</span>
          <span className="select-all text-emerald-300/90">8f2b…d91a</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3 text-[0.68rem]">
        <span className="font-sans text-white/50">Instant verification</span>
        <span className="flex items-center gap-1 font-mono font-bold text-emerald-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          SUCCESS
        </span>
      </div>
    </Panel>
  );
}

function IntelligencePanel() {
  return (
    <Panel accent="violet">
      <div className="mb-4 flex items-center justify-between">
        <PanelLabel>Campus Intelligence</PanelLabel>
        <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 font-mono text-[0.6rem] font-bold text-green-300">
          AI ENGINE
        </span>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-14 w-14 flex-none">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="3.2"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
            />
            <motion.path
              className="text-green-400"
              strokeWidth="3.2"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845a15.9155 15.9155 0 010 31.831 a15.9155 15.9155 0 010-31.831"
              initial={{ strokeDasharray: "0, 100" }}
              whileInView={{ strokeDasharray: "89, 100" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-sans text-[0.92rem] font-bold text-white">8.9</span>
          </div>
        </div>
        <div className="min-w-0">
          <span className="block text-[0.76rem] font-semibold text-white">Engagement Score</span>
          <span className="mt-0.5 block text-[0.64rem] leading-tight text-white/50">
            Predicted GPA lift{" "}
            <strong className="font-semibold text-emerald-400">+0.42</strong>
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-green-500/10 bg-green-500/[0.04] p-3 leading-relaxed">
        <div className="mb-1 flex items-center gap-1.5 text-[0.72rem] font-semibold text-green-200">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
          </svg>
          AI Insight
        </div>
        <p className="text-[0.72rem] text-white/80">
          Peak library use on Tuesdays — retention rises when tutorials are aligned.
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3 font-mono text-[0.64rem] text-white/50">
        <span>Predictive analytics</span>
        <span className="text-emerald-400">NOMINAL</span>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/*  Central core hub                                                   */
/* ------------------------------------------------------------------ */

function CoreHub({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex h-[150px] w-[150px] items-center justify-center">
      {/* rotating conic halo */}
      {!reduced && (
        <motion.div
          className="absolute inset-[-26px] rounded-full opacity-60 [background:conic-gradient(from_0deg,transparent_0%,rgba(16,185,129,0.35)_18%,transparent_38%,rgba(20,184,166,0.3)_60%,transparent_82%)] blur-[12px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* pulsing rings */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border border-emerald-400/30"
            style={{ width: 150, height: 150 }}
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut", delay: i * 1.13 }}
          />
        ))}

      {/* glow */}
      <div className="absolute h-[120px] w-[120px] rounded-full bg-emerald-500/25 blur-[40px]" />

      {/* core disc */}
      <div className="relative flex h-[110px] w-[110px] flex-col items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.35),rgba(10,14,26,0.9))] shadow-[0_0_50px_-8px_rgba(16,185,129,0.6),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl">
        <img src="/logo.png" alt="CampOS" className="h-9 w-9 object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
        <span className="mt-1 font-mono text-[0.56rem] font-bold uppercase tracking-[0.22em] text-white/80">
          CampOS
        </span>
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-emerald-300/80">
          Core OS
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connection layer (measured, animated data streams)                */
/* ------------------------------------------------------------------ */

interface Pt {
  x: number;
  y: number;
}

function curvePath(a: Pt, b: Pt, bend: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return `M ${a.x} ${a.y} Q ${mx + nx * bend} ${my + ny * bend} ${b.x} ${b.y}`;
}

const CONNECTIONS: { anchor: Pt; bend: number; color: string; dur: number }[] = [
  { anchor: { x: 0.205, y: 0.28 }, bend: 26, color: "#10b981", dur: 3.4 },
  { anchor: { x: 0.795, y: 0.285 }, bend: -26, color: "#0D9488", dur: 4.1 },
  { anchor: { x: 0.235, y: 0.715 }, bend: -24, color: "#10b981", dur: 3.8 },
  { anchor: { x: 0.78, y: 0.705 }, bend: 24, color: "#22c55e", dur: 4.5 },
];

function Connections({ w, h, reduced }: { w: number; h: number; reduced: boolean }) {
  if (w === 0 || h === 0) return null;
  const hub: Pt = { x: w * 0.5, y: h * 0.5 };

  return (
    <svg width={w} height={h} className="absolute inset-0 z-[5]" aria-hidden>
      <defs>
        <radialGradient id="streamDot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <filter id="streamGlow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {CONNECTIONS.map((c, i) => {
        const a: Pt = { x: c.anchor.x * w, y: c.anchor.y * h };
        const d = curvePath(a, hub, c.bend);
        return (
          <g key={i}>
            <path id={`conn-${i}`} d={d} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {!reduced && (
              <>
                <path
                  d={d}
                  fill="none"
                  stroke={c.color}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="2 13"
                  opacity="0.85"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-160" dur={`${c.dur}s`} repeatCount="indefinite" />
                </path>
                <circle r="2.6" fill="url(#streamDot)" filter="url(#streamGlow)">
                  <animateMotion dur={`${c.dur}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#conn-${i}`} />
                  </animateMotion>
                </circle>
              </>
            )}
            {/* anchor node */}
            <circle cx={a.x} cy={a.y} r="3" fill={c.color} opacity="0.9" />
            <circle cx={a.x} cy={a.y} r="6" fill={c.color} opacity="0.15" />
          </g>
        );
      })}

      {/* hub node */}
      <circle cx={hub.x} cy={hub.y} r="4" fill="#a7f3d0" />
      <circle cx={hub.x} cy={hub.y} r="9" fill="#10b981" opacity="0.18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating card wrapper (parallax + drift)                          */
/* ------------------------------------------------------------------ */

function FloatingCard({
  className,
  depth,
  driftY,
  delay,
  mx,
  my,
  reduced,
  children,
}: {
  className: string;
  depth: number;
  driftY: number;
  delay: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduced: boolean;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);

  return (
    <motion.div style={reduced ? undefined : { x, y }} className={`absolute z-10 ${className}`}>
      <motion.div
        animate={reduced ? undefined : { y: [0, driftY, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
        whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main ecosystem                                                     */
/* ------------------------------------------------------------------ */

export function FloatingEcosystem({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const reduced = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const mx = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.4 });
  const my = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.4 });
  const hubX = useTransform(mx, (v) => v * 8);
  const hubY = useTransform(my, (v) => v * 8);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* ---------- Desktop: orbiting constellation ---------- */}
      <div
        ref={stageRef}
        className="relative hidden h-[clamp(560px,54vw,640px)] w-full lg:block"
      >
        <Connections w={size.w} h={size.h} reduced={reduced} />

        {/* accent particles */}
        {!reduced &&
          [
            { top: "22%", left: "46%", s: 3, d: 0 },
            { top: "62%", left: "30%", s: 4, d: 1.4 },
            { top: "40%", left: "70%", s: 3, d: 2.1 },
            { top: "70%", left: "60%", s: 4, d: 0.7 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-emerald-300/40"
              style={{ top: p.top, left: p.left, width: p.s, height: p.s }}
              animate={{ y: [0, -16, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 4 + p.s, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

        {/* central hub */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <motion.div style={reduced ? undefined : { x: hubX, y: hubY }}>
            <CoreHub reduced={reduced} />
          </motion.div>
        </div>

        {/* module panels */}
        <FloatingCard className="left-0 top-[3%] w-[clamp(230px,21vw,272px)]" depth={26} driftY={-9} delay={0} mx={mx} my={my} reduced={reduced}>
          <IdentityPanel />
        </FloatingCard>
        <FloatingCard className="right-0 top-[6%] w-[clamp(238px,22vw,284px)]" depth={16} driftY={9} delay={0.6} mx={mx} my={my} reduced={reduced}>
          <AttendancePanel />
        </FloatingCard>
        <FloatingCard className="bottom-[5%] left-[2%] w-[clamp(230px,21vw,272px)]" depth={-14} driftY={-7} delay={0.3} mx={mx} my={my} reduced={reduced}>
          <VerificationPanel />
        </FloatingCard>
        <FloatingCard className="bottom-[2%] right-[1%] w-[clamp(240px,22vw,288px)]" depth={-26} driftY={7} delay={0.9} mx={mx} my={my} reduced={reduced}>
          <IntelligencePanel />
        </FloatingCard>
      </div>

      {/* ---------- Mobile / tablet: clean stack ---------- */}
      <div className="lg:hidden">
        <div className="mb-8 flex justify-center">
          <CoreHub reduced={reduced} />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mx-auto grid max-w-[560px] grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {[<IdentityPanel key="i" />, <AttendancePanel key="a" />, <VerificationPanel key="v" />, <IntelligencePanel key="n" />].map(
            (panel, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {panel}
              </motion.div>
            ),
          )}
        </motion.div>
      </div>
    </>
  );
}
