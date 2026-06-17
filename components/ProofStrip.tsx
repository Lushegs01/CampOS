"use client";

import { motion } from "framer-motion";
import { container, fadeUp, viewport } from "@/lib/motion";

const STATS = [
  { n: "1.2M+", l: "Verified actions / month" },
  { n: "60+", l: "Campuses running CampOS" },
  { n: "4-in-1", l: "Systems on one ledger" },
  { n: "1 ID", l: "Per student, every service" },
];

const TICKER = [
  "ScanMark", "FunaaBnB", "Nada", "Unireg", "One identity", "Device-bound",
  "Tamper-evident", "Zero proxies", "Rotating codes", "Verified once",
];

export function ProofStrip() {
  return (
    <section className="relative border-y border-line bg-ink">
      <motion.div
        variants={container(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto grid max-w-wrap grid-cols-2 gap-px overflow-hidden px-[clamp(20px,5vw,56px)] py-[clamp(28px,3vw,40px)] md:grid-cols-4"
      >
        {STATS.map((s) => (
          <motion.div key={s.l} variants={fadeUp} className="flex flex-col gap-1 px-2 md:px-6 first:pl-0">
            <span className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none text-hi" style={{ fontVariationSettings: '"opsz" 60,"SOFT" 60,"wght" 460' }}>
              {s.n}
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-faint">
              {s.l}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* system-bus ticker */}
      <div className="mask-fade-x overflow-hidden border-t border-line py-3.5">
        <div className="flex w-max animate-marquee items-center gap-3 pr-3">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-3 font-mono text-[0.74rem] tracking-[0.05em] text-mute">
              <span className="h-1 w-1 rounded-full bg-primary/70" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
