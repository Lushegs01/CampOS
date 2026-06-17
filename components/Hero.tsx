"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { HeroCard } from "./HeroCard";
import { fadeUp, container, viewport } from "@/lib/motion";
import { useModal } from "@/context/ModalContext";

export function Hero() {
  const { openModal } = useModal();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative overflow-hidden pt-[clamp(48px,7vw,86px)] pb-[clamp(56px,8vw,100px)] bg-campos-hero">
      {/* Giant CampOS Watermark with Parallax & Slow Fade In */}
      <motion.div 
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="pointer-events-none absolute -left-[15%] top-[-10%] z-0 h-[120%] w-[120%] opacity-5"
      >
        <img src="/logo.png" alt="" className="h-full w-full object-contain object-left-top" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-0" />
      <motion.div 
        variants={container(0.12)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid max-w-wrap grid-cols-1 items-center gap-[48px] px-[clamp(20px,5vw,56px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-[clamp(36px,5vw,72px)]"
      >
        
        {/* Left Copy */}
        <motion.div variants={fadeUp}>
          <span className="eyebrow mb-[1.6rem]">
            One operating system for the whole campus
          </span>
          <h1 className="display mb-[1.4rem] text-[clamp(2.6rem,6.4vw,5.1rem)]">
            The whole campus,
            <br />
            <em className="serif-em text-gradient">running as one.</em>
          </h1>
          <p className="lede mb-[2.2rem]">
            CampOS unifies attendance, housing, enrollment, social networks, and identity into a
            single verified ecosystem. One student login opens every door on
            campus — class, library, hostel, exams, wallet — and nothing along
            the way can be forged.
          </p>
          <motion.div variants={fadeUp} className="flex flex-col items-stretch gap-[0.9rem] sm:flex-row sm:items-center">
            <button onClick={openModal} className="btn btn-primary sm:w-auto w-full justify-center">
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
            <Link href="#modules" className="btn btn-ghost sm:w-auto w-full justify-center">
              Explore the modules
            </Link>
          </motion.div>
          <div className="mt-[1.7rem] flex items-center gap-[0.6em] font-mono text-[0.76rem] tracking-[0.04em] text-slate">
            <span className="relative flex-none h-[8px] w-[8px] rounded-full bg-primary">
              <span className="absolute -inset-[4px] rounded-full border-[1.5px] border-primary opacity-60 animate-pulse-ring" />
            </span>
            One identity. Every service. Live across 60+ campuses.
          </div>
        </motion.div>

        {/* Right Signature Card */}
        <motion.div
          variants={fadeUp}
          className="mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none"
        >
          <HeroCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
