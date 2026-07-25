"use client";

import { useRef } from "react";
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useModal } from "@/context/ModalContext";
import { FloatingEcosystem } from "./FloatingEcosystem";
import { AuroraBackground } from "./AuroraBackground";
import { ParticleField } from "./ParticleField";
import { MagneticButton } from "./MagneticButton";


/**
 * What the platform is, rather than how many people use it.
 *
 * This row previously animated four adoption figures — 50+ universities
 * onboarded, 250,000+ students verified, 1M+ credentials secured, 99.99%
 * reliability. None of them were measurements of anything; presenting them as
 * fact on a public page is a claim the product cannot currently support.
 */
const PILLARS: { title: string; body: string }[] = [
  { title: "One student identity", body: "Issued once, recognised by every module on campus." },
  { title: "Four connected modules", body: "Attendance, housing, records and verification in one system." },
  { title: "Verifiable by design", body: "Every record carries a check an outside party can run." },
  { title: "Built for African campuses", body: "Designed around how these institutions actually operate." },
];

export function Hero() {
  const { openModal } = useModal();
  const reduced = useReducedMotionSafe();
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
    // Touch and pen also fire pointermove, so on a phone every scroll drag was
    // driving the hero's parallax springs — six-plus transforms recomputed per
    // frame during the exact gesture that most needs the headroom.
    if (e.pointerType !== "mouse") return;
    if (reduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
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
        <m.div
          style={reduced ? undefined : { x: copyX, y: copyY }}
          className="mx-auto max-w-[920px] text-center"
        >
          {/* eyebrow */}
          <div
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            className="hero-reveal mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/80">
              The Operating System for Modern Universities
            </span>
          </div>

          {/* headline */}
          <h1
            style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            className="hero-reveal font-sans text-[clamp(2.5rem,6.2vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white"
          >
            <span className="block">The Operating System</span>
            <span className="block">Powering the</span>
            <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text pb-[0.08em] text-transparent">
              Next Generation
            </span>
            <span className="block">of Universities</span>
          </h1>

          {/* subheadline */}
          <p
            style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
            className="hero-reveal mx-auto mt-7 max-w-[640px] text-[clamp(1.02rem,1.5vw,1.2rem)] font-medium leading-relaxed text-white/75 [text-shadow:0_1px_18px_rgba(3,7,18,0.7)]"
          >
            CampOS unifies student identity, attendance, credentials, and campus operations
            into a single intelligent platform built for the future of higher education.
          </p>

          {/* CTAs */}
          <div
            style={{ "--reveal-delay": "460ms" } as React.CSSProperties}
            className="hero-reveal mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton
              onClick={openModal}
              className="group relative w-full overflow-hidden rounded-full bg-primary px-8 py-4 text-[0.96rem] font-semibold text-white shadow-[0_0_30px_rgba(5,150,105,0.3)] transition-all duration-300 hover:shadow-[0_0_44px_rgba(16,185,129,0.5)] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
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
          </div>

          {/* layer pills */}
          <div
            style={{ "--reveal-delay": "580ms" } as React.CSSProperties}
            className="hero-reveal mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[0.66rem] tracking-[0.12em] text-white/60"
          >
            {[
              ["IDENTITY LAYER", "bg-emerald-400"],
              ["INFRASTRUCTURE LAYER", "bg-teal-300"],
              ["TRUST LAYER", "bg-emerald-400"],
              ["INTELLIGENCE LAYER", "bg-teal-400"],
            ].map(([label, dot]) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                {label}
              </span>
            ))}
          </div>
        </m.div>

        {/* ---------- Hero visual ---------- */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="relative mt-[clamp(32px,5vw,64px)]"
        >
          <FloatingEcosystem mouseX={mouseX} mouseY={mouseY} />
        </m.div>

        {/* ---------- What the platform is ----------
             This replaced a row of university wordmarks under the line
             "Trusted by forward-thinking universities across Africa". The
             wordmarks were placeholder geometry, not logos, and the named
             institutions are not customers — the page was claiming
             relationships that do not exist. */}
        <div className="mx-auto mt-[clamp(32px,5vw,56px)] grid max-w-5xl grid-cols-1 gap-x-8 gap-y-8 border-t border-white/[0.06] pt-10 sm:grid-cols-2 md:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="text-center md:text-left">
              <h2 className="font-sans text-[1.02rem] font-bold leading-snug tracking-tight text-white">
                {pillar.title}
              </h2>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-white/60">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
