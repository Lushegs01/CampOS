"use client";

import { motion } from "framer-motion";
import { useModal } from "@/context/ModalContext";
import { FloatingEcosystem } from "./FloatingEcosystem";

const UnilagLogo = () => (
  <div className="flex items-center gap-2 text-white/35 hover:text-white/60 transition-colors duration-300">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M6 12h12M8 8l8 8M16 8l-8 8" />
    </svg>
    <span className="font-mono text-[0.74rem] font-bold tracking-[0.16em] uppercase">UNILAG</span>
  </div>
);

const AshesiLogo = () => (
  <div className="flex items-center gap-2 text-white/35 hover:text-white/60 transition-colors duration-300">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 4v16 M4 12h16" />
    </svg>
    <span className="font-mono text-[0.74rem] font-bold tracking-[0.16em] uppercase">ASHESI</span>
  </div>
);

const MakerereLogo = () => (
  <div className="flex items-center gap-2 text-white/35 hover:text-white/60 transition-colors duration-300">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
    <span className="font-mono text-[0.74rem] font-bold tracking-[0.16em] uppercase">MAKERERE</span>
  </div>
);

const CapeTownLogo = () => (
  <div className="flex items-center gap-2 text-white/35 hover:text-white/60 transition-colors duration-300">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3L2 12h3v9h14v-9h3L12 3z" />
    </svg>
    <span className="font-mono text-[0.74rem] font-bold tracking-[0.16em] uppercase">CAPE TOWN</span>
  </div>
);

const NairobiLogo = () => (
  <div className="flex items-center gap-2 text-white/35 hover:text-white/60 transition-colors duration-300">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 2v20M2 12h20" />
    </svg>
    <span className="font-mono text-[0.74rem] font-bold tracking-[0.16em] uppercase">NAIROBI</span>
  </div>
);

export function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative overflow-hidden bg-[#030712] pt-[clamp(64px,8vw,110px)] pb-[clamp(56px,8vw,100px)] border-b border-white/[0.04]">
      {/* 1. CSS Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* 2. Dynamic Aurora glows */}
      <div className="absolute top-[-10%] left-[-15%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] h-[700px] w-[700px] rounded-full bg-cyan-600/8 blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10 mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        {/* Main Grid: Copy on Left, Connected Ecosystem on Right */}
        <div className="grid grid-cols-1 items-center gap-[48px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[clamp(36px,5vw,72px)]">
          {/* Left Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="font-mono text-[0.68rem] font-bold uppercase tracking-wider text-white/80">
                The Operating System for Modern Universities
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-sans text-[clamp(2.4rem,5vw,4.3rem)] font-black leading-[1.06] tracking-tight text-white mb-6">
              The Operating System
              <br />
              Powering the{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Next Generation
              </span>
              <br />
              of Universities
            </h1>

            {/* Subheadline */}
            <p className="text-white/60 text-base sm:text-[1.12rem] font-medium leading-relaxed mb-8 max-w-xl">
              CampOS unifies student identity, attendance, credentials, and campus operations into a single intelligent platform built for the future of higher education.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <button
                onClick={openModal}
                className="btn w-full sm:w-auto bg-white text-black hover:bg-white/90 font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_24px_rgba(255,255,255,0.2)]"
              >
                Book a Demo
                <svg
                  className="h-4 w-4 transform transition-transform group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={openModal}
                className="btn w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                Watch Platform Tour
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white/80"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            {/* Brand Positioning indicators */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.04] pt-6 font-mono text-[0.68rem] tracking-wider text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span>IDENTITY LAYER</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                <span>INFRASTRUCTURE LAYER</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                <span>TRUST LAYER</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                <span>INTELLIGENCE LAYER</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Floating Ecosystem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="w-full relative"
          >
            <FloatingEcosystem />
          </motion.div>
        </div>

        {/* Divider line before Metrics */}
        <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* 3. Trust Bar Metrics */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-4">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-sans text-[2.2rem] sm:text-[2.6rem] font-bold text-white tracking-tight leading-none">
              50+
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-widest text-slate-500 font-bold">
              Universities Onboarded
            </span>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-sans text-[2.2rem] sm:text-[2.6rem] font-bold text-white tracking-tight leading-none">
              250,000+
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-widest text-slate-500 font-bold">
              Students Verified
            </span>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-sans text-[2.2rem] sm:text-[2.6rem] font-bold text-white tracking-tight leading-none">
              1M+
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-widest text-slate-500 font-bold">
              Credentials Secured
            </span>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-sans text-[2.2rem] sm:text-[2.6rem] font-bold text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text tracking-tight leading-none">
              99.99%
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-widest text-slate-500 font-bold">
              Platform Reliability
            </span>
          </div>
        </div>

        {/* 4. Social Proof Section */}
        <div className="mt-16 border-t border-white/[0.04] pt-10 text-center">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-8">
            Trusted by forward-thinking universities across Africa
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
            <UnilagLogo />
            <AshesiLogo />
            <MakerereLogo />
            <CapeTownLogo />
            <NairobiLogo />
          </div>
        </div>
      </div>
    </section>
  );
}
