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
      <svg viewBox="0 0 32 32" fill="none" className="h-[38px] w-[38px]">
        <path
          d="M5 9V6.5C5 5.7 5.7 5 6.5 5H9M23 5h2.5c.8 0 1.5.7 1.5 1.5V9M27 23v2.5c0 .8-.7 1.5-1.5 1.5H23M9 27H6.5C5.7 27 5 26.3 5 25.5V23"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect x="12" y="12" width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
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
      <svg viewBox="0 0 32 32" fill="none" className="h-[38px] w-[38px]">
        <path d="M9 4h11l7 7v17H9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M20 4v7h7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M13 17h7M13 22h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
              className={`flex min-h-[340px] flex-col rounded-card border p-[clamp(24px,2.6vw,34px)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-38px_rgba(24,36,30,.55)] ${
                m.dark
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper hover:border-slate-light"
              }`}
            >
              <div
                className={`mb-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] ${
                  m.dark ? "text-primary" : "text-primary-deep"
                }`}
              >
                {m.cat}
              </div>
              <div className={`mb-[1.2rem] ${m.dark ? "text-primary" : "text-slate"}`}>
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
