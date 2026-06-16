"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroCard } from "./HeroCard";
import { fadeUp, container, viewport } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[clamp(48px,7vw,86px)] pb-[clamp(56px,8vw,100px)]">
      {/* Ambient aurora backdrop — soft honey / sage / blush glows drifting slowly behind the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <span
          className="absolute -left-[12%] -top-[22%] h-[62vw] max-h-[700px] w-[62vw] max-w-[700px] rounded-full blur-[44px] will-change-transform animate-aurora-one"
          style={{
            background:
              "radial-gradient(circle at center, rgba(215,151,68,0.22), rgba(215,151,68,0) 68%)",
          }}
        />
        <span
          className="absolute -bottom-[28%] -right-[14%] h-[64vw] max-h-[740px] w-[64vw] max-w-[740px] rounded-full blur-[48px] will-change-transform animate-aurora-two"
          style={{
            background:
              "radial-gradient(circle at center, rgba(90,115,99,0.18), rgba(90,115,99,0) 70%)",
          }}
        />
        <span
          className="absolute left-[42%] top-[26%] h-[42vw] max-h-[480px] w-[42vw] max-w-[480px] rounded-full blur-[52px] will-change-transform animate-aurora-three"
          style={{
            background:
              "radial-gradient(circle at center, rgba(232,203,185,0.32), rgba(232,203,185,0) 72%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-wrap grid-cols-1 items-center gap-[48px] px-[clamp(20px,5vw,56px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-[clamp(36px,5vw,72px)]">
        
        {/* Left Copy */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="eyebrow mb-[1.6rem]">
            One operating system for the whole campus
          </span>
          <h1 className="display mb-[1.4rem] text-[clamp(2.6rem,6.4vw,5.1rem)]">
            The whole campus,
            <br />
            <em className="serif-em">running as one.</em>
          </h1>
          <p className="lede mb-[2.2rem]">
            CampOS unifies attendance, housing, records, and identity into a
            single verified ecosystem. One student login opens every door on
            campus — class, library, hostel, exams, wallet — and nothing along
            the way can be forged.
          </p>
          <div className="flex flex-col items-stretch gap-[0.9rem] sm:flex-row sm:items-center">
            <Link href="#institutions" className="btn btn-primary sm:w-auto w-full justify-center">
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
            </Link>
            <Link href="#modules" className="btn btn-ghost sm:w-auto w-full justify-center">
              Explore the modules
            </Link>
          </div>
          <div className="mt-[1.7rem] flex items-center gap-[0.6em] font-mono text-[0.76rem] tracking-[0.04em] text-sage">
            <span className="relative flex-none h-[8px] w-[8px] rounded-full bg-honey">
              <span className="absolute -inset-[4px] rounded-full border-[1.5px] border-honey opacity-60 animate-pulse-ring" />
            </span>
            One identity. Every service. Live across 60+ campuses.
          </div>
        </motion.div>

        {/* Right Signature Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none"
        >
          <HeroCard />
        </motion.div>
      </div>
    </section>
  );
}
