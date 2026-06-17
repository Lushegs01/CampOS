"use client";

import { motion } from "framer-motion";
import { container, fadeUp, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";

interface Module {
  cat: string;
  name: string;
  body: string;
  gate: string;
  icon: React.ReactNode;
  dark?: boolean;
}

const MODULES: Module[] = [
  {
    cat: "Attendance · ScanMark",
    name: "ScanMark",
    body: "Rotating, single-use QR check-ins bound to each student's phone and the room they're in. Proxy attendance simply stops being possible — and the register reconciles itself.",
    gate: "Rotating codes · device-bound",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[42px] w-[42px]">
        <rect x="5" y="5" width="10" height="10" stroke="currentColor" strokeWidth="2.5" />
        <rect x="8" y="8" width="4" height="4" fill="currentColor" />
        
        <rect x="5" y="25" width="10" height="10" stroke="currentColor" strokeWidth="2.5" />
        <rect x="8" y="28" width="4" height="4" fill="currentColor" />

        <rect x="25" y="5" width="10" height="10" stroke="currentColor" strokeWidth="2.5" />
        <rect x="28" y="8" width="4" height="4" fill="currentColor" />

        <rect x="18" y="5" width="2" height="2" fill="currentColor" />
        <rect x="18" y="9" width="4" height="2" fill="currentColor" />
        <rect x="22" y="13" width="2" height="2" fill="currentColor" />
        
        <rect x="5" y="18" width="4" height="4" fill="currentColor" />
        <rect x="11" y="20" width="2" height="2" fill="currentColor" />
        <rect x="13" y="16" width="2" height="4" fill="currentColor" />
        
        <rect x="17" y="17" width="2" height="2" fill="currentColor" />
        <rect x="21" y="20" width="2" height="4" fill="currentColor" />
        <rect x="25" y="17" width="4" height="2" fill="currentColor" />
        <rect x="29" y="21" width="2" height="2" fill="currentColor" />
        
        <rect x="17" y="26" width="2" height="4" fill="currentColor" />
        <rect x="21" y="28" width="2" height="2" fill="currentColor" />
        <rect x="25" y="25" width="4" height="2" fill="currentColor" />
        <rect x="25" y="29" width="2" height="4" fill="currentColor" />
        <rect x="29" y="31" width="4" height="2" fill="currentColor" />
        <rect x="33" y="26" width="2" height="4" fill="currentColor" />

        <path d="M11 20l7 7 15-15" className="stroke-paper" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 20l7 7 15-15" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    cat: "Living · Krib",
    name: "Krib",
    body: "A verified housing marketplace where every listing has a confirmed owner and real photos. Students sign leases near campus without ever meeting a fake agent.",
    gate: "Owner-ID confirmed · no fraud",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-[38px] w-[38px]">
        <path d="M5 15L16 6l11 9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 13v13h16V13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M13 26v-7h6v7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    cat: "Records · Nada",
    name: "Nada & Identity",
    body: "Tamper-evident transcripts and credentials on one ledger, tied to a single campus identity. Verifiable by any employer in seconds — no letters, no waiting, no forgery.",
    gate: "Tamper-evident · exportable",
    dark: true,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[46px] w-[46px]">
        <defs>
          <linearGradient id="gold-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B38728" />
            <stop offset="20%" stopColor="#FBF5B7" />
            <stop offset="50%" stopColor="#AA771C" />
            <stop offset="80%" stopColor="#FCF6BA" />
            <stop offset="100%" stopColor="#8A5A19" />
          </linearGradient>
          <linearGradient id="gold-inner" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="100%" stopColor="#FBF5B7" />
          </linearGradient>
          <linearGradient id="purple-glow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(192, 132, 252, 0.6)" />
            <stop offset="50%" stopColor="rgba(192, 132, 252, 0)" />
            <stop offset="100%" stopColor="rgba(192, 132, 252, 0.4)" />
          </linearGradient>
          <clipPath id="gap-clip">
            <path d="M 0 0 h 40 v 40 h -18 v -20 h -4 v 20 h -18 z" />
          </clipPath>
        </defs>
        
        <g clipPath="url(#gap-clip)">
          {/* Outer dark edge */}
          <circle cx="20" cy="20" r="14" stroke="#3d2a0b" strokeWidth="10" />
          
          {/* Main metallic body */}
          <circle cx="20" cy="20" r="14" stroke="url(#gold-base)" strokeWidth="8" />
          
          {/* Inner highlight (bevel) */}
          <circle cx="20" cy="20" r="14" stroke="url(#gold-inner)" strokeWidth="4" />
          
          {/* Center dark ridge */}
          <circle cx="20" cy="20" r="14" stroke="#7a5215" strokeWidth="1" />

          {/* Purple metallic reflection */}
          <circle cx="20" cy="20" r="14" stroke="url(#purple-glow)" strokeWidth="8" style={{ mixBlendMode: "color-dodge" }} />
        </g>
      </svg>
    ),
  },
];

export function Modules() {
  return (
    <section
      id="modules"
      className="py-[clamp(64px,9vw,118px)]"
    >
      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        <SectionHeading
          eyebrow="What's inside CampOS"
          title={
            <>
              Four campus systems,
              <br />
              one verified ledger.
            </>
          }
          className="mb-[clamp(34px,4vw,58px)]"
        />

        <motion.div
          variants={container(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-[clamp(16px,1.6vw,22px)] md:grid-cols-3"
        >
          {MODULES.map((m) => (
            <motion.article
              key={m.name}
              variants={fadeUp}
              className={`group flex min-h-[340px] flex-col rounded-card border p-[clamp(24px,2.6vw,34px)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                m.dark
                  ? "border-obsidian-soft bg-obsidian text-paper hover:shadow-[0_10px_40px_rgba(99,102,241,0.3)] hover:border-neon-indigo/50"
                  : "border-line bg-paper hover:border-emerald-glow/30 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)]"
              }`}
            >
              <div
                className={`mb-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] ${
                  m.dark ? "text-primary" : "text-primary-deep"
                }`}
              >
                {m.cat}
              </div>
              <div className={`mb-[1.2rem] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${m.dark ? "text-neon-indigo drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" : "text-emerald-glow drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"}`}>
                {m.icon}
              </div>
              <h3 className={`display-sm mb-[0.7rem] text-[clamp(1.4rem,2.4vw,1.9rem)] ${m.dark ? "!text-paper" : ""}`}>
                {m.name}
              </h3>
              <p
                className={`mb-[1.3rem] text-[0.96rem] ${
                  m.dark ? "text-paper/70" : "text-ink-soft"
                }`}
              >
                {m.body}
              </p>
              <div
                className={`mt-auto flex items-center gap-[0.5em] border-t pt-[1.1rem] font-mono text-[0.72rem] tracking-[0.04em] ${
                  m.dark
                    ? "border-white/15 text-accent-light"
                    : "border-line-soft text-slate"
                }`}
              >
                {m.gate}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
