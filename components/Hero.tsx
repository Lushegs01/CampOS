"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { FloatingEcosystem } from "./FloatingEcosystem";
import { AuroraBackground } from "./AuroraBackground";
import { ParticleField } from "./ParticleField";
import { MagneticButton } from "./MagneticButton";
import { CountUp } from "./CountUp";

/* ---- university wordmark placeholders ---- */

const UNIS: { name: string; icon: React.ReactNode }[] = [
  {
    name: "UNILAG",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M6 12h12M8 8l8 8M16 8l-8 8" />
      </svg>
    ),
  },
  {
    name: "ASHESI",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M12 4v16M4 12h16" />
      </svg>
    ),
  },
  {
    name: "MAKERERE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "CAPE TOWN",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3 2 12h3v9h14v-9h3L12 3z" />
      </svg>
    ),
  },
  {
    name: "NAIROBI",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
  },
];

const METRICS: {
  to: number;
  decimals?: number;
  suffix: string;
  label: string;
  gradient?: boolean;
}[] = [
  { to: 50, suffix: "+", label: "Universities Onboarded" },
  { to: 250000, suffix: "+", label: "Students Verified" },
  { to: 1, suffix: "M+", label: "Credentials Secured" },
  { to: 99.99, decimals: 2, suffix: "%", label: "Platform Reliability", gradient: true },
];

export function Hero() {
  const { openModal } = useModal();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Normalised cursor position shared across the hero (-1..1).
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Subtle parallax for the copy column.
  const copySpringX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const copySpringY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const copyX = useTransform(copySpringX, (v) => v * -10);
  const copyY = useTransform(copySpringY, (v) => v * -8);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const reveal = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative -mt-[74px] overflow-hidden bg-[#030712] pt-[clamp(132px,16vh,190px)] pb-[clamp(64px,9vw,110px)]"
    >
      <AuroraBackground mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 z-[1]">
        <ParticleField className="absolute inset-0 h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        {/* ---------- Copy ---------- */}
        <motion.div
          style={reduced ? undefined : { x: copyX, y: copyY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="mx-auto max-w-[920px] text-center"
        >
          {/* eyebrow */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
            </span>
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/80">
              The Operating System for Modern Universities
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={reveal}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[clamp(2.5rem,6.2vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white"
          >
            <span className="block">The Operating System</span>
            <span className="block">Powering the</span>
            <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text pb-[0.08em] text-transparent">
              Next Generation
            </span>
            <span className="block">of Universities</span>
          </motion.h1>

          {/* subheadline */}
          <motion.p
            variants={reveal}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-7 max-w-[640px] text-[clamp(1.02rem,1.5vw,1.2rem)] font-medium leading-relaxed text-white/75 [text-shadow:0_1px_18px_rgba(3,7,18,0.7)]"
          >
            CampOS unifies student identity, attendance, credentials, and campus operations
            into a single intelligent platform built for the future of higher education.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton
              onClick={openModal}
              className="group relative w-full overflow-hidden rounded-full bg-white px-8 py-4 text-[0.96rem] font-semibold text-[#030712] shadow-[0_0_30px_rgba(255,255,255,0.18)] transition-shadow duration-300 hover:shadow-[0_0_44px_rgba(165,180,252,0.4)] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Book a Demo</span>
              <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>

            <MagneticButton
              onClick={openModal}
              strength={0.25}
              className="group w-full rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-[0.96rem] font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08] sm:w-auto"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Platform Tour
            </MagneticButton>
          </motion.div>

          {/* layer pills */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[0.66rem] tracking-[0.12em] text-slate-300 [text-shadow:0_1px_12px_rgba(3,7,18,0.85)]"
          >
            {[
              ["IDENTITY LAYER", "bg-indigo-400"],
              ["INFRASTRUCTURE LAYER", "bg-violet-400"],
              ["TRUST LAYER", "bg-emerald-400"],
              ["INTELLIGENCE LAYER", "bg-cyan-400"],
            ].map(([label, dot]) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- Hero visual ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="relative mt-[clamp(32px,5vw,64px)]"
        >
          <FloatingEcosystem mouseX={mouseX} mouseY={mouseY} />
        </motion.div>

        {/* ---------- Trust bar ---------- */}
        <div className="mx-auto mt-[clamp(24px,4vw,48px)] grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 border-t border-white/[0.06] pt-10 md:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1 text-center">
              <CountUp
                to={m.to}
                decimals={m.decimals}
                suffix={m.suffix}
                className={`font-sans text-[clamp(1.9rem,3.2vw,2.6rem)] font-bold leading-none tracking-tight ${
                  m.gradient
                    ? "bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent"
                    : "text-white"
                }`}
              />
              <span className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* ---------- Social proof ---------- */}
        <div className="mt-[clamp(40px,6vw,72px)] text-center">
          <p className="mb-8 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Trusted by forward-thinking universities across Africa
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
            {UNIS.map((u) => (
              <div
                key={u.name}
                className="flex items-center gap-2 text-white/45 transition-colors duration-300 hover:text-white"
              >
                {u.icon}
                <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em]">
                  {u.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
