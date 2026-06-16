"use client";

import { motion } from "framer-motion";
import { container, fadeUp, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";

interface Module {
  cat: string;
  name: string;
  body: string;
  gate: string;
  note: string;
  icon: React.ReactNode;
}

const MODULES: Module[] = [
  {
    cat: "Attendance · ScanMark",
    name: "ScanMark",
    body: "Rotating, single-use QR check-ins bound to each student's phone and the room they're in. Proxy attendance simply stops being possible — and the register reconciles itself.",
    gate: "Rotating codes · device-bound",
    note: "no more empty-seat sign-ins",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
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
    note: "bye-bye fake hostel agents",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
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
    note: "verifiable in seconds, not weeks",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M9 4h11l7 7v17H9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M20 4v7h7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M13 17h7M13 22h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Modules() {
  return (
    <section id="modules" className="relative py-[clamp(64px,9vw,118px)]">
      {/* dashed vertical guidelines flanking the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden justify-center md:flex"
      >
        <div className="flex h-full w-[88%] max-w-[1120px] justify-between">
          <span className="guide-line" />
          <span className="guide-line" />
        </div>
      </div>

      <div className="wrap relative">
        <SectionHeading
          eyebrow="What's inside CampOS"
          align="center"
          title={
            <>
              Four campus systems,
              <br />
              one verified ledger.
            </>
          }
          className="mb-[clamp(40px,5vw,68px)]"
        />

        <motion.div
          variants={container(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-[clamp(18px,2vw,26px)]"
        >
          {MODULES.map((m, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.article
                key={m.name}
                variants={fadeUp}
                className="grid overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_30px_80px_-58px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-mist md:grid-cols-2"
              >
                {/* visual panel */}
                <div
                  className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden border-line-soft bg-gradient-to-br from-surface-2 to-surface md:aspect-auto md:min-h-[320px] ${
                    flip ? "border-l md:order-2" : "border-r"
                  }`}
                >
                  <div className="blueprint-grid absolute inset-0 opacity-60" />
                  <div className="absolute h-48 w-48 rounded-full bg-brand/25 blur-[60px]" />
                  <div className="relative grid h-[clamp(84px,9vw,108px)] w-[clamp(84px,9vw,108px)] place-items-center rounded-[22px] border border-line bg-white/5 text-honey-deep backdrop-blur-sm [&_svg]:h-1/2 [&_svg]:w-1/2">
                    {m.icon}
                  </div>
                </div>

                {/* text */}
                <div
                  className={`flex flex-col justify-center px-[clamp(24px,3.4vw,54px)] py-[clamp(30px,3.6vw,54px)] ${
                    flip ? "md:order-1" : ""
                  }`}
                >
                  <div className="eyebrow eyebrow-honey mb-[1.2rem]">{m.cat}</div>
                  <h3 className="display-sm mb-[0.9rem] text-[clamp(1.6rem,2.8vw,2.4rem)]">
                    {m.name}
                  </h3>
                  <p className="mb-[1.5rem] max-w-[46ch] text-[1.02rem] leading-[1.62] text-ink-soft">
                    {m.body}
                  </p>
                  <div className="flex items-center gap-[0.6em] font-mono text-[0.72rem] uppercase tracking-[0.1em] text-slate">
                    <span className="inline-grid h-[18px] w-[18px] place-items-center rounded-full bg-brand/15 text-honey-deep">
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M2 8.5l3.5 3.5L14 4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {m.gate}
                  </div>
                  <p className="note mt-[1.5rem] -rotate-2 text-[1.05rem]">{m.note}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
