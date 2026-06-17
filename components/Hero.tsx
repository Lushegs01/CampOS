"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CampusConsole } from "./CampusConsole";
import { Aurora } from "./Aurora";
import { fadeUp, container } from "@/lib/motion";
import { useModal } from "@/context/ModalContext";

const PEOPLE = [
  { i: "BA", c: "from-primary to-indigo" },
  { i: "AO", c: "from-violet to-primary" },
  { i: "FI", c: "from-mint to-cyan" },
  { i: "NU", c: "from-cyan to-primary" },
];

export function Hero() {
  const { openModal } = useModal();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#0E1730_0%,#090B11_42%,#05060A_100%)]" />
      <Aurora className="opacity-90" />
      <div className="bg-grid mask-fade-b absolute inset-0 opacity-[0.5]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-2 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-wrap grid-cols-1 items-center gap-[clamp(40px,5vw,64px)] px-[clamp(20px,5vw,56px)] pb-[clamp(64px,9vw,110px)] pt-[clamp(52px,8vw,96px)] lg:grid-cols-[1.04fr_0.96fr]">
        {/* left copy */}
        <motion.div variants={container(0.1)} initial="hidden" animate="visible">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 font-mono text-[0.72rem] tracking-[0.05em] text-mute backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Live across 60+ campuses
            <span className="text-faint">·</span>
            <span className="text-faint">NG · GH · UK</span>
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="display mt-7 text-[clamp(2.7rem,6.6vw,5.3rem)]"
          >
            The whole campus,
            <br />
            <em className="serif-em text-gradient">running as one.</em>
          </motion.h1>

          <motion.p variants={fadeUp} className="lede mt-6">
            CampOS unifies attendance, housing, enrollment, and student identity
            into a single verified ecosystem. One login opens every door on
            campus — and nothing along the way can be forged.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <button onClick={openModal} className="btn btn-primary">
              Book a demo
              <svg className="arr h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <Link href="#modules" className="btn btn-ghost">
              Explore the modules
            </Link>
          </motion.div>

          {/* social proof */}
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {PEOPLE.map((p) => (
                <span
                  key={p.i}
                  className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${p.c} text-[0.68rem] font-semibold text-white ring-2 ring-void`}
                >
                  {p.i}
                </span>
              ))}
            </div>
            <p className="max-w-[26ch] text-[0.84rem] leading-snug text-mute">
              Trusted by registrars and deans across{" "}
              <span className="text-hi">60+ campuses</span>.
            </p>
          </motion.div>
        </motion.div>

        {/* right console */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-[480px] lg:mx-0 lg:max-w-none lg:justify-self-end"
        >
          <CampusConsole />
        </motion.div>
      </div>
    </section>
  );
}
