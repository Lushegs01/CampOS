"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroCard } from "./HeroCard";
import { GlassPrism } from "./GlassPrism";
import { fadeUp, container, viewport } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[clamp(118px,16vw,178px)] pb-[clamp(56px,8vw,104px)]">
      {/* Blueprint construction grid — brand texture (and what the glass cube refracts) */}
      <div
        aria-hidden
        className="blueprint-grid pointer-events-none absolute inset-0 z-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, #000 22%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, #000 22%, transparent 72%)",
        }}
      />
      {/* cobalt aurora glow seated behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[3%] -z-0 h-[460px] w-[760px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(58,91,240,0.34), rgba(30,63,208,0.12) 55%, transparent 72%)",
        }}
      />

      {/* dashed vertical guidelines flanking the content — a pxxl-style frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden justify-center md:flex"
      >
        <div className="flex h-full w-[86%] max-w-[1040px] justify-between">
          <span className="guide-line" />
          <span className="guide-line" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center px-[clamp(20px,5vw,40px)] text-center">
        {/* Tumbling glass prism — sits directly behind the headline */}
        <GlassPrism className="pointer-events-none absolute left-1/2 top-[clamp(96px,12vw,150px)] -z-10 -translate-x-1/2 -translate-y-1/2" />

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <span className="eyebrow mb-[1.5rem]">
            One operating system for the whole campus
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="display mb-[1.5rem] text-[clamp(2.5rem,6.4vw,4.8rem)]"
        >
          The whole campus,
          <br />
          <em className="serif-em">running as one.</em>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="lede mx-auto mb-[2.1rem] text-center"
        >
          CampOS unifies attendance, housing, records, and identity into a single
          verified ecosystem. One student login opens every door on campus — class,
          library, hostel, exams, wallet — and nothing along the way can be forged.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex w-full flex-col items-stretch justify-center gap-[0.8rem] sm:w-auto sm:flex-row sm:items-center"
        >
          <Link href="#institutions" className="btn btn-primary w-full justify-center sm:w-auto">
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
          <Link href="#modules" className="btn btn-ghost w-full justify-center sm:w-auto">
            Explore the modules
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-[1.6rem] flex items-center gap-[0.6em] font-mono text-[0.76rem] tracking-[0.04em] text-slate"
        >
          <span className="relative flex-none h-[8px] w-[8px] rounded-full bg-honey">
            <span className="absolute -inset-[4px] rounded-full border-[1.5px] border-honey opacity-60 animate-pulse-ring" />
          </span>
          One identity. Every service. Live across 60+ campuses.
        </motion.div>
      </div>

      {/* Live preview panel — the signature card framed like a product screenshot */}
      <motion.div
        variants={container(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative z-10 mx-auto mt-[clamp(44px,6vw,76px)] w-full max-w-[680px] px-[clamp(20px,5vw,40px)]"
      >
        <motion.div
          variants={fadeUp}
          className="relative rounded-[26px] border border-line bg-[rgba(12,16,32,0.55)] p-[clamp(10px,1.4vw,16px)] shadow-[0_50px_130px_-58px_rgba(0,0,0,0.95)] backdrop-blur-sm"
        >
          <span className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
          <div className="flex justify-center rounded-[18px] border border-line-soft bg-paper-2/50 p-[clamp(16px,3vw,32px)]">
            <HeroCard />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
