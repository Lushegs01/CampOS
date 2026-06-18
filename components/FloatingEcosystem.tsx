"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function FloatingEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor movement
  const springX = useSpring(mouseX, { damping: 35, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 35, stiffness: 120 });

  // Transforms for Card 1 (Student ID) - z-30 (Moves the most)
  const card1X = useTransform(springX, (val) => val * 24);
  const card1Y = useTransform(springY, (val) => val * 24);

  // Transforms for Card 2 (Attendance) - z-20 (Moves moderately)
  const card2X = useTransform(springX, (val) => val * 12);
  const card2Y = useTransform(springY, (val) => val * 12);

  // Transforms for Card 3 (Verification) - z-20 (Moves opposite)
  const card3X = useTransform(springX, (val) => val * -10);
  const card3Y = useTransform(springY, (val) => val * -10);

  // Transforms for Card 4 (Intelligence) - z-10 (Moves opposite the most)
  const card4X = useTransform(springX, (val) => val * -22);
  const card4Y = useTransform(springY, (val) => val * -22);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position relative to center: -1 to 1
    const relX = (e.clientX - (rect.left + width / 2)) / (width / 2);
    const relY = (e.clientY - (rect.top + height / 2)) / (height / 2);

    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[550px] w-full items-center justify-center overflow-visible rounded-card bg-slate-950/20 lg:h-[650px]"
    >
      {/* Ambient auroras/glows inside the visual container */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-indigo-500/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-cyan-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      {/* Responsive SVG connections between modules */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="indigo-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="amber-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
            <stop offset="50%" stopColor="#EF4444" stopOpacity="1" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Faint static wires */}
        <path d="M 25,28 Q 50,16 75,32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
        <path d="M 25,28 Q 16,50 30,72" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
        <path d="M 75,32 Q 84,54 75,76" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
        <path d="M 30,72 Q 52,80 75,76" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
        <path d="M 75,32 Q 52,52 30,72" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />

        {/* Glowing animated data pulses */}
        <motion.path
          d="M 25,28 Q 50,16 75,32"
          fill="none"
          stroke="url(#indigo-glow)"
          strokeWidth="1.5"
          strokeDasharray="6 20"
          animate={{ strokeDashoffset: [0, -52] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
        <motion.path
          d="M 25,28 Q 16,50 30,72"
          fill="none"
          stroke="url(#cyan-glow)"
          strokeWidth="1.5"
          strokeDasharray="6 20"
          animate={{ strokeDashoffset: [0, 52] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
        />
        <motion.path
          d="M 75,32 Q 84,54 75,76"
          fill="none"
          stroke="url(#amber-glow)"
          strokeWidth="1.5"
          strokeDasharray="6 20"
          animate={{ strokeDashoffset: [0, -52] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        />
        <motion.path
          d="M 30,72 Q 52,80 75,76"
          fill="none"
          stroke="url(#indigo-glow)"
          strokeWidth="1.5"
          strokeDasharray="6 20"
          animate={{ strokeDashoffset: [0, 52] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
        />
        <motion.path
          d="M 75,32 Q 52,52 30,72"
          fill="none"
          stroke="url(#cyan-glow)"
          strokeWidth="1.5"
          strokeDasharray="6 20"
          animate={{ strokeDashoffset: [0, -52] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
      </svg>

      {/* Floating particles background network */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "20%", left: "45%", size: 3, delay: 0 },
          { top: "60%", left: "20%", size: 4, delay: 1.5 },
          { top: "45%", left: "75%", size: 3, delay: 2.2 },
          { top: "75%", left: "55%", size: 5, delay: 0.8 },
          { top: "35%", left: "15%", size: 3, delay: 1.9 },
          { top: "80%", left: "35%", size: 4, delay: 2.7 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-400/30"
            style={{
              top: pt.top,
              left: pt.left,
              width: pt.size,
              height: pt.size,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + pt.size,
              delay: pt.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ============================================================== */}
      {/* CARD 1: Student Identity (Top-Left)                            */}
      {/* ============================================================== */}
      <motion.div
        style={{ x: card1X, y: card1Y }}
        className="absolute top-[8%] left-[2%] z-30 w-[240px] sm:w-[270px] pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-2xl border border-white/[0.08] bg-black/60 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] group"
        >
          {/* Top subtle glow highlight */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-indigo-500/[0.03] pointer-events-none" />

          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[0.68rem] font-medium uppercase tracking-wider text-slate-400">
              CAMPUS IDENTITY
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[0.62rem] font-bold text-emerald-400">ACTIVE</span>
            </div>
          </div>

          {/* Profile details */}
          <div className="mb-4 flex items-center gap-3">
            {/* Styled Avatar */}
            <div className="relative h-11 w-11 flex-none rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold text-white font-sans">
                AO
              </div>
            </div>
            <div>
              <h4 className="font-sans text-[0.92rem] font-semibold text-white leading-tight flex items-center gap-1">
                Ada Okafor
                {/* Gold seal */}
                <svg className="h-[14px] w-[14px] text-amber-500 flex-none" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708-.523H4.5a.75.75 0 00-.75.75v.9c0 .35.105.69.301.977l3.01 4.385a.75.75 0 00.187.195l1.052.701a.75.75 0 00.832 0l1.052-.701a.75.75 0 00.188-.195l3.01-4.385c.196-.288.301-.628.301-.977v-.9a.75.75 0 00-.75-.75h-1.059a.75.75 0 00-.708.523L10.36 5.89a.75.75 0 01-.72 0l-3.373-2.435z" clipRule="evenodd" />
                  <path d="M12.781 12.382a1.5 1.5 0 11-5.562 0l1.037-3.111a.75.75 0 011.424 0l1.101 3.111z" />
                </svg>
              </h4>
              <span className="block font-mono text-[0.66rem] tracking-wider text-slate-500">
                MAT/2026/043118
              </span>
            </div>
          </div>

          {/* Subtext info */}
          <div className="mb-4 border-t border-white/[0.04] pt-3 flex flex-col gap-1 text-[0.74rem] text-slate-400">
            <span className="font-sans font-medium text-white/70">University of Lagos</span>
            <span className="font-mono text-[0.65rem] text-slate-500">Dept. of Computer Science</span>
          </div>

          {/* QR code section */}
          <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] p-2.5">
            <div className="relative h-12 w-12 flex-none bg-white p-0.5 rounded-lg shadow-inner overflow-hidden">
              {/* Clean Mock QR Code */}
              <div className="grid h-full w-full grid-cols-5 gap-[1px]">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span
                    key={i}
                    className={`rounded-[1px] ${
                      (i * 7 + 3) % 5 === 0 || i < 5 || i % 5 === 0 || i > 20 || i % 5 === 4
                        ? "bg-slate-950"
                        : "bg-white"
                    }`}
                  />
                ))}
              </div>
              {/* Scanning red line */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                animate={{ top: ["4px", "44px", "4px"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
            </div>
            <div className="ml-3 text-right">
              <span className="block font-mono text-[0.64rem] font-bold text-amber-500 tracking-wider">
                SECURE ACCESS
              </span>
              <span className="block text-[0.68rem] text-slate-500 mt-0.5 leading-tight">
                One ID. Every gate & door.
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ============================================================== */}
      {/* CARD 2: Smart Attendance (Top-Right)                           */}
      {/* ============================================================== */}
      <motion.div
        style={{ x: card2X, y: card2Y }}
        className="absolute top-[12%] right-[2%] z-20 w-[250px] sm:w-[280px] pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="relative rounded-2xl border border-white/[0.08] bg-black/60 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group"
        >
          {/* Top subtle glow highlight */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-cyan-500/[0.03] pointer-events-none" />

          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[0.68rem] font-medium uppercase tracking-wider text-slate-400">
              SMART ATTENDANCE
            </span>
            <span className="text-[0.66rem] font-semibold text-cyan-400 flex items-center gap-1 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
              </span>
              LIVE
            </span>
          </div>

          {/* Attendance metric */}
          <div className="mb-3 flex items-baseline gap-2">
            <span className="font-sans text-[2rem] font-bold text-white tracking-tight leading-none">
              96.4%
            </span>
            <span className="font-mono text-[0.7rem] text-emerald-400 font-semibold">
              +1.2% this week
            </span>
          </div>

          <div className="mb-4 text-[0.74rem] text-slate-400 leading-relaxed font-sans">
            Checked into <strong className="text-white">CSC 401: Computer Architecture</strong>
            <div className="text-[0.68rem] font-mono text-slate-500 mt-0.5">
              Verified Hall 2B location via secure beacon.
            </div>
          </div>

          {/* SVG Trend Sparkline */}
          <div className="mb-3 h-10 w-full overflow-hidden rounded-lg bg-white/[0.01] border border-white/[0.04] p-1">
            <svg className="h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 15 Q 15 8 30 14 T 60 7 T 90 10 L 100 12 L 100 20 L 0 20 Z"
                fill="url(#sparkline-grad)"
              />
              <path
                d="M 0 15 Q 15 8 30 14 T 60 7 T 90 10 L 100 12"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Dot at the end */}
              <circle cx="100" cy="12" r="1.5" fill="#10B981" />
            </svg>
          </div>

          {/* Status footer */}
          <div className="flex items-center justify-between border-t border-white/[0.04] pt-3 text-[0.66rem] font-mono text-slate-500">
            <span>Room matching: OK</span>
            <span>Proxies avoided: 100%</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ============================================================== */}
      {/* CARD 3: Credential Verification (Bottom-Left)                 */}
      {/* ============================================================== */}
      <motion.div
        style={{ x: card3X, y: card3Y }}
        className="absolute bottom-[10%] left-[4%] lg:left-[10%] z-20 w-[240px] sm:w-[270px] pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="relative rounded-2xl border border-white/[0.08] bg-black/60 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group"
        >
          {/* Top subtle glow highlight */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-emerald-500/[0.03] pointer-events-none" />

          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[0.68rem] font-medium uppercase tracking-wider text-slate-400">
              TRUST PROTOCOL
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 font-mono text-[0.62rem] font-semibold text-emerald-400">
              VERIFIED
            </div>
          </div>

          {/* Verified credential body */}
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
              {/* Badge/Seal Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 11 2 2 4-4" />
              </svg>
            </div>
            <div>
              <h5 className="font-sans text-[0.88rem] font-semibold text-white leading-snug">
                B.Sc. Computer Science
              </h5>
              <span className="block text-[0.72rem] text-slate-400 mt-0.5">
                Ada Okafor · First Class Hons
              </span>
            </div>
          </div>

          {/* Cryptographic hash details */}
          <div className="rounded-lg bg-white/[0.01] border border-white/[0.04] p-2.5 font-mono text-[0.6rem] text-slate-500">
            <div className="flex justify-between mb-1">
              <span>ISSUER:</span>
              <span className="text-white/75">UNILAG Registrar</span>
            </div>
            <div className="flex justify-between">
              <span>ANCHOR HASH:</span>
              <span className="text-emerald-400/90 select-all">8f2b...d91a</span>
            </div>
          </div>

          {/* Success Status Ticker */}
          <div className="mt-4 border-t border-white/[0.04] pt-3 flex items-center justify-between text-[0.68rem]">
            <span className="font-sans text-slate-500">Instant verification check:</span>
            <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
              SUCCESS
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ============================================================== */}
      {/* CARD 4: Campus Intelligence (Bottom-Right)                     */}
      {/* ============================================================== */}
      <motion.div
        style={{ x: card4X, y: card4Y }}
        className="absolute bottom-[6%] right-[2%] z-10 w-[260px] sm:w-[290px] pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          className="relative rounded-2xl border border-white/[0.08] bg-black/60 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] group"
        >
          {/* Top subtle glow highlight */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-purple-500/[0.03] pointer-events-none" />

          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[0.68rem] font-medium uppercase tracking-wider text-slate-400">
              CAMPUS INTELLIGENCE
            </span>
            <span className="flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 border border-purple-500/20 font-mono text-[0.62rem] font-semibold text-purple-400">
              AI ENGINE
            </span>
          </div>

          {/* Radial engagement meter */}
          <div className="mb-4 flex items-center gap-4">
            <div className="relative h-14 w-14 flex-none">
              {/* Semi-circular gauge */}
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="text-purple-500"
                  strokeWidth="3.2"
                  strokeDasharray="89, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: "89, 100" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-sans text-[0.92rem] font-bold text-white">8.9</span>
              </div>
            </div>
            <div>
              <span className="block text-[0.76rem] font-semibold text-white">Engagement Score</span>
              <span className="block text-[0.66rem] text-slate-500 mt-0.5 leading-tight">
                Predictive GPA increase: <strong className="text-emerald-400 font-semibold">+0.42</strong>
              </span>
            </div>
          </div>

          {/* AI Insight message */}
          <div className="rounded-xl bg-purple-500/[0.03] border border-purple-500/10 p-3 leading-relaxed">
            <div className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-purple-300 mb-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              AI Insight
            </div>
            <p className="text-[0.72rem] text-slate-400">
              Peak library usage detected on Tuesdays. Class retention rates predicted to rise if tutorials align.
            </p>
          </div>

          {/* Anomaly diagnostics check */}
          <div className="mt-4 border-t border-white/[0.04] pt-3 flex items-center justify-between text-[0.66rem] font-mono text-slate-500">
            <span>Predictive Analytics: OK</span>
            <span className="text-emerald-400">NOMINAL</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
