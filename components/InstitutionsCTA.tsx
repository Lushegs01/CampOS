"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";
import { Aurora } from "./Aurora";
import { useModal } from "@/context/ModalContext";

const FACTS = [
  { k: "Rollout", v: "Under a term" },
  { k: "Hardware", v: "None — just phones" },
  { k: "Pricing", v: "Per active student" },
];

export function InstitutionsCTA() {
  const { openModal } = useModal();
  return (
    <section id="institutions" className="py-[clamp(72px,10vw,130px)]">
      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="edge relative grid grid-cols-1 items-center gap-[clamp(34px,5vw,64px)] overflow-hidden rounded-xl2 border border-line bg-gradient-to-br from-surface-2 via-ink-2 to-ink p-[clamp(32px,6vw,76px)] ring-glow lg:grid-cols-[1.1fr_0.9fr]"
        >
          <Aurora className="opacity-50" />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_20%_30%,#000,transparent_70%)]" />

          <div className="relative z-10">
            <SectionHeading
              eyebrow="For institutions"
              eyebrowVariant="primary"
              title={
                <>
                  Bring your whole campus
                  <br />
                  <span className="text-gradient">into one system.</span>
                </>
              }
              className="mb-0"
            />
            <p className="mb-9 mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed text-body">
              Give every student a single verified identity and put attendance,
              housing, and records on one ledger you can stand behind — for
              accreditation, for funding tied to contact hours, for the reputation
              of every certificate you issue. No new hardware, no end-of-term
              scramble.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={openModal} className="btn btn-primary">
                Book a demo
                <svg className="arr h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <Link href="#modules" className="btn btn-ghost">
                Explore the modules
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            {FACTS.map((f) => (
              <div key={f.k} className="rounded-card border border-line bg-white/[0.03] p-5 backdrop-blur transition-colors hover:bg-white/[0.05]">
                <div className="mb-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-primary">{f.k}</div>
                <div className="font-display text-[1.5rem] text-hi" style={{ fontVariationSettings: '"opsz" 40,"SOFT" 60,"wght" 480' }}>
                  {f.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
