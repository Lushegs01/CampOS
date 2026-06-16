"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";

const CHIPS = [
  { label: "Rollout", value: "Under a term" },
  { label: "Hardware", value: "None — just phones" },
  { label: "Pricing", value: "Per active student" },
];

export function InstitutionsCTA() {
  return (
    <section id="institutions" className="py-[clamp(64px,9vw,118px)]">
      <div className="wrap">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative grid grid-cols-1 items-center gap-[34px] overflow-hidden rounded-[26px] border border-brand/25 bg-surface p-[clamp(34px,6vw,76px)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[48px]"
        >
          {/* branded backdrop — blueprint grid + cobalt glow */}
          <div
            aria-hidden
            className="blueprint-grid pointer-events-none absolute inset-0 -z-10"
            style={{ "--grid-color": "rgba(110,139,255,0.08)" } as React.CSSProperties}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[6%] -top-[40%] -z-10 h-[80%] w-[55%] rounded-full blur-[70px]"
            style={{ background: "radial-gradient(circle, rgba(58,91,240,0.5), transparent 70%)" }}
          />

          <div>
            <SectionHeading
              eyebrow="For institutions"
              eyebrowVariant="blush"
              title={
                <>
                  Bring your whole campus
                  <br />
                  into one system.
                </>
              }
              className="mb-0"
            />
            <p className="mb-[2rem] mt-[1.2rem] max-w-[42ch] leading-[1.6] text-ink-soft">
              Give every student a single verified identity and put attendance,
              housing, and records on one ledger you can stand behind — for
              accreditation, for funding tied to contact hours, for the reputation
              of every certificate you issue. No new hardware, no end-of-term
              scramble.
            </p>
            <div className="flex flex-wrap gap-[0.8rem]">
              <Link href="#" className="btn btn-light">
                Book a demo
                <svg className="arr h-[16px] w-[16px]" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="#modules" className="btn btn-ghost">
                Explore the modules
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[0.9rem]">
            {CHIPS.map((c) => (
              <div
                key={c.label}
                className="rounded-[14px] border border-line bg-white/[0.04] p-[18px_20px]"
              >
                <div className="mb-[0.35rem] font-mono text-[0.72rem] uppercase tracking-[0.1em] text-blush">
                  {c.label}
                </div>
                <div className="font-display text-[1.5rem] font-bold tracking-[-0.01em] text-ink">
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
