"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";
import { useModal } from "@/context/ModalContext";

export function InstitutionsCTA() {
  const { openModal } = useModal();
  return (
    <section id="institutions" className="py-[clamp(64px,9vw,118px)]">
      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative grid grid-cols-1 items-center gap-[34px] overflow-hidden rounded-[calc(18px+8px)] bg-slate-deep p-[clamp(40px,6vw,80px)] text-paper lg:grid-cols-[1.1fr_0.9fr] lg:gap-[48px]"
        >
          <div>
            <SectionHeading
              eyebrow="For institutions"
              eyebrowVariant="accent-light"
              titleClassName="!text-paper"
              title={
                <>
                  Bring your whole campus
                  <br />
                  into one system.
                </>
              }
              className="mb-0"
            />
            <p className="mb-[2rem] mt-[1.2rem] max-w-[42ch] text-[rgba(251,249,245,.82)]">
              Give every student a single verified identity and put attendance,
              housing, and records on one ledger you can stand behind — for
              accreditation, for funding tied to contact hours, for the reputation
              of every certificate you issue. No new hardware, no end-of-term
              scramble.
            </p>
            <div className="flex flex-wrap gap-[0.9rem]">
              <button onClick={openModal} className="btn btn-light">
                Book a demo
                <svg
                  className="arr h-[16px] w-[16px]"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <Link
                href="#modules"
                className="btn btn-ghost border-[rgba(255,255,255,.3)] text-paper hover:border-paper"
              >
                Explore the modules
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[1rem]">
            <div className="rounded-[14px] border border-white/15 bg-white/5 p-[18px_20px]">
              <div className="mb-[0.3rem] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent-light">
                Rollout
              </div>
              <div className="font-display text-[1.5rem]" style={{ fontVariationSettings: '"opsz" 40,"SOFT" 60,"wght" 480' }}>
                Under a term
              </div>
            </div>
            <div className="rounded-[14px] border border-white/15 bg-white/5 p-[18px_20px]">
              <div className="mb-[0.3rem] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent-light">
                Hardware
              </div>
              <div className="font-display text-[1.5rem]" style={{ fontVariationSettings: '"opsz" 40,"SOFT" 60,"wght" 480' }}>
                None — just phones
              </div>
            </div>
            <div className="rounded-[14px] border border-white/15 bg-white/5 p-[18px_20px]">
              <div className="mb-[0.3rem] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent-light">
                Pricing
              </div>
              <div className="font-display text-[1.5rem]" style={{ fontVariationSettings: '"opsz" 40,"SOFT" 60,"wght" 480' }}>
                Per active student
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
