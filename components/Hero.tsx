"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { HeroCard } from "./HeroCard";
import { fadeUp, container } from "@/lib/motion";
import { useModal } from "@/context/ModalContext";

export function Hero() {
  const { openModal } = useModal();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative overflow-hidden bg-black pt-[clamp(100px,12vw,140px)] pb-[clamp(80px,10vw,120px)] border-b border-white/10">
      
      {/* Deep Space Background Glows */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-emerald-600/10 blur-[120px]" />
      </div>

      {/* Technical Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      {/* Giant Background Parallax Logo */}
      <motion.div 
        style={{ y, opacity }}
        className="pointer-events-none absolute left-0 right-0 top-[10%] flex justify-center opacity-[0.02] select-none z-0"
      >
        <h1 
          className="font-display font-bold leading-none tracking-tighter text-white"
          style={{ fontSize: "min(40vw, 500px)" }}
        >
          Camp<span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.5)" }}>OS</span>
        </h1>
      </motion.div>

      <motion.div 
        variants={container(0.12)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid max-w-wrap grid-cols-1 items-center gap-[64px] px-[clamp(20px,5vw,56px)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[80px]"
      >
        
        {/* Left Copy */}
        <motion.div variants={fadeUp} className="text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[0.75rem] font-medium tracking-wide text-white/80 uppercase">
              Live across 60+ Campuses
            </span>
          </div>
          
          <h1 className="font-display font-bold tracking-tight text-[clamp(3rem,6.5vw,5.5rem)] leading-[1.05] mb-6">
            The whole campus,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-300">
              running as one.
            </span>
          </h1>
          
          <p className="font-body text-[clamp(1.1rem,1.5vw,1.25rem)] text-white/60 leading-relaxed mb-10 max-w-[90%]">
            CampOS unifies attendance, housing, enrollment, and identity into a
            single verified ecosystem. One student login opens every door on
            campus—and nothing along the way can be forged.
          </p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={openModal} 
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-8 font-medium text-black transition-all hover:scale-[1.02] hover:bg-gray-100 sm:w-auto"
            >
              Book a demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <Link 
              href="#modules" 
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 font-medium text-white transition-all hover:bg-white/10 backdrop-blur-md sm:w-auto"
            >
              Explore the modules
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Signature Card */}
        <motion.div
          variants={fadeUp}
          className="mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none perspective-[1000px]"
        >
          <HeroCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
