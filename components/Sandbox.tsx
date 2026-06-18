"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./Section";

type ModuleType = "scanmark" | "funaabnb" | "nada" | "verity";

interface LedgerLog {
  id: string;
  type: ModuleType;
  title: string;
  timestamp: string;
  hash: string;
  details: string;
  accent: string;
}

const INITIAL_LOGS: LedgerLog[] = [
  {
    id: "log-1",
    type: "verity",
    title: "Credential Sealed",
    timestamp: "13:42:01.085",
    hash: "0x8f2bd91a3c5a6b8e",
    details: "B.Sc. Computer Science (Ada Okafor) · UNILAG Registrar signature matched.",
    accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  {
    id: "log-2",
    type: "scanmark",
    title: "Proximity Check-In Verified",
    timestamp: "13:38:15.922",
    hash: "0x4c8a221f7d9e8b6a",
    details: "Student (MAT/2026/043118) checked into CSC 401 · Hall 2B. Proximity match 100%.",
    accent: "text-teal-400 border-teal-500/20 bg-teal-500/5",
  },
  {
    id: "log-3",
    type: "funaabnb",
    title: "Lease Contract Anchored",
    timestamp: "13:25:30.114",
    hash: "0x9d5b8823c10a4e7f",
    details: "Lease sealed for Room 14, Emerald Heights. Landlord ID verification confirmed.",
    accent: "text-green-400 border-green-500/20 bg-green-500/5",
  },
];

export function Sandbox() {
  const [activeTab, setActiveTab] = useState<ModuleType>("scanmark");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [logs, setLogs] = useState<LedgerLog[]>(INITIAL_LOGS);
  const [inputText, setInputText] = useState("");
  const timelineEndRef = useRef<HTMLDivElement>(null);

  const generateHash = () => {
    const chars = "0123456789abcdef";
    let hash = "0x";
    for (let i = 0; i < 16; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const getTimestamp = () => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const ms = String(now.getMilliseconds()).padStart(3, "0");
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${ms}`;
  };

  const handleAction = () => {
    if (status !== "idle") return;
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      
      const newHash = generateHash();
      const newTimestamp = getTimestamp();
      
      let newLog: LedgerLog;

      if (activeTab === "scanmark") {
        newLog = {
          id: `log-${Date.now()}`,
          type: "scanmark",
          title: "Proximity Check-In Verified",
          timestamp: newTimestamp,
          hash: newHash,
          details: "Student check-in registered. Class register for CSC 401 updated.",
          accent: "text-teal-400 border-teal-500/20 bg-teal-500/5",
        };
      } else if (activeTab === "funaabnb") {
        newLog = {
          id: `log-${Date.now()}`,
          type: "funaabnb",
          title: "Lease Contract Anchored",
          timestamp: newTimestamp,
          hash: newHash,
          details: "Host lease deposit matched. Escrow account initialized successfully.",
          accent: "text-green-400 border-green-500/20 bg-green-500/5",
        };
      } else if (activeTab === "nada") {
        const msg = inputText.trim() || "Hello CampOS network!";
        newLog = {
          id: `log-${Date.now()}`,
          type: "nada",
          title: "ZKP Message Broadcasted",
          timestamp: newTimestamp,
          hash: newHash,
          details: `Post payload: "${msg.length > 40 ? msg.substring(0, 40) + "..." : msg}" verified via student signature token.`,
          accent: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
        };
        setInputText("");
      } else {
        newLog = {
          id: `log-${Date.now()}`,
          type: "verity",
          title: "Credential Sealed",
          timestamp: newTimestamp,
          hash: newHash,
          details: "Ada Okafor B.Sc Diploma verified & permanent ledger hash written.",
          accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        };
      }

      setLogs((prev) => [newLog, ...prev]);

      setTimeout(() => {
        setStatus("idle");
      }, 1500);

    }, 1200);
  };

  return (
    <section id="sandbox" className="py-[clamp(64px,9vw,118px)] bg-gradient-to-b from-[#030712] to-[#08100d] border-t border-white/[0.05] relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        <SectionHeading
          eyebrow="Interactive Ledger Sandbox"
          title={
            <>
              Simulate & Verify
              <br />
              the Ledger Network
            </>
          }
          className="mb-[clamp(34px,4vw,58px)]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,3vw,48px)] items-stretch">
          {/* Simulator Device Column (5/12) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[340px] aspect-[9/18.5] rounded-[48px] border-4 border-white/10 bg-[#08100d] p-3 shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-white/5 shadow-emerald-500/5">
              {/* Speaker / Dynamic Island notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full bg-black/60 border border-white/5 z-20 flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500/40" />
              </div>

              {/* Phone Content Header */}
              <div className="pt-8 pb-3 border-b border-white/[0.05] text-center relative z-10">
                <span className="font-mono text-[0.55rem] font-bold text-white/40 tracking-widest uppercase">CampOS Simulator</span>
              </div>

              {/* Tabs list inside device */}
              <div className="grid grid-cols-4 gap-1 p-1 mt-2.5 rounded-lg bg-white/[0.03] border border-white/5 relative z-10">
                {(["scanmark", "funaabnb", "nada", "verity"] as ModuleType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      if (status === "idle") setActiveTab(tab);
                    }}
                    className={`py-1.5 px-0.5 rounded-md font-mono text-[0.5rem] font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                        : "text-white/45 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab === "scanmark" ? "Scan" : tab === "funaabnb" ? "Housing" : tab === "nada" ? "Social" : "Verify"}
                  </button>
                ))}
              </div>

              {/* Active Simulator Window */}
              <div className="flex-1 mt-3.5 flex flex-col justify-between relative z-10">
                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {activeTab === "scanmark" && (
                      <motion.div
                        key="scanmark"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center flex flex-col items-center"
                      >
                        <div className="relative mb-4 h-24 w-24 rounded-2xl bg-white p-2 shadow-inner flex items-center justify-center overflow-hidden">
                          {/* Simulated QR matrix */}
                          <div className="grid h-full w-full grid-cols-6 gap-[1px]">
                            {Array.from({ length: 36 }).map((_, i) => (
                              <span
                                key={i}
                                className={`rounded-[1px] ${
                                  (i * 9 + 4) % 6 === 0 || i < 6 || i % 6 === 0 || i > 30 || i % 6 === 5
                                    ? "bg-slate-900"
                                    : "bg-white"
                                }`}
                              />
                            ))}
                          </div>
                          <motion.div
                            className="absolute left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.9)]"
                            animate={{ top: ["8px", "88px", "8px"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          />
                        </div>
                        <span className="font-mono text-[0.62rem] font-bold text-teal-300 tracking-wider">SCANMARK REGISTER</span>
                        <p className="mt-1 text-[0.68rem] text-white/50 px-4">Checked into Room 2B · Proximity Active</p>
                      </motion.div>
                    )}

                    {activeTab === "funaabnb" && (
                      <motion.div
                        key="funaabnb"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center text-center px-2"
                      >
                        <div className="w-full rounded-xl border border-white/10 bg-[#112018] p-3 text-left mb-3">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-sans text-[0.82rem] font-bold text-white">Emerald Heights</span>
                            <span className="text-[0.64rem] font-mono text-emerald-300">₦12,500/mo</span>
                          </div>
                          <span className="block text-[0.64rem] text-white/50">Verified Landlord: Lanre Davies</span>
                          <span className="mt-2 inline-flex items-center gap-1 rounded bg-green-500/10 px-1.5 py-0.5 border border-green-500/20 text-[0.55rem] font-bold text-green-300 uppercase">
                            ✓ SECURE CONTRACT
                          </span>
                        </div>
                        <span className="font-mono text-[0.62rem] font-bold text-green-300 tracking-wider">FUNAABNB LEASE</span>
                        <p className="mt-1 text-[0.68rem] text-white/50">Locks key agreement to student wallet</p>
                      </motion.div>
                    )}

                    {activeTab === "nada" && (
                      <motion.div
                        key="nada"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center text-center px-2"
                      >
                        <div className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-2.5 mb-2.5 text-left">
                          <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type anonymous message..."
                            className="w-full h-16 bg-transparent text-[0.7rem] text-white placeholder-white/30 focus:outline-none resize-none"
                          />
                        </div>
                        <span className="font-mono text-[0.62rem] font-bold text-yellow-400 tracking-wider">NADA ZK-PROOF</span>
                        <p className="mt-1 text-[0.68rem] text-white/50">Zero knowledge credential signature</p>
                      </motion.div>
                    )}

                    {activeTab === "verity" && (
                      <motion.div
                        key="verity"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center text-center px-2"
                      >
                        <div className="w-full aspect-[16/10] rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 flex flex-col justify-between text-left mb-3.5">
                          <div>
                            <span className="block font-mono text-[0.55rem] text-emerald-300/60 uppercase">University of Lagos</span>
                            <span className="block font-sans text-[0.76rem] font-bold text-white leading-tight">B.Sc. Computer Science</span>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="font-mono text-[0.55rem] text-white/45">Ada Okafor</span>
                            <span className="font-mono text-[0.52rem] text-emerald-300 bg-emerald-500/10 px-1 border border-emerald-500/25 rounded">UNVERIFIED</span>
                          </div>
                        </div>
                        <span className="font-mono text-[0.62rem] font-bold text-emerald-300 tracking-wider">VERITY CREDENTIAL</span>
                        <p className="mt-1 text-[0.68rem] text-white/50">Verifiable credential registration</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Device action button */}
                <div className="mt-4 pb-4">
                  <button
                    onClick={handleAction}
                    disabled={status !== "idle"}
                    className={`w-full py-2.5 rounded-xl font-mono text-[0.68rem] font-bold uppercase tracking-wider transition-all duration-300 ${
                      status === "loading"
                        ? "bg-white/10 text-white/50 border border-white/5 cursor-not-allowed"
                        : status === "success"
                        ? "bg-emerald-500 text-white border border-emerald-400/20"
                        : "bg-white text-slate-950 hover:bg-emerald-400 hover:text-white"
                    }`}
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                      </span>
                    ) : status === "success" ? (
                      "Sealed ✓"
                    ) : activeTab === "scanmark" ? (
                      "Mark Attendance"
                    ) : activeTab === "funaabnb" ? (
                      "Lock Lease agreement"
                    ) : activeTab === "nada" ? (
                      "Publish Post"
                    ) : (
                      "Authenticate Certificate"
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom bar indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-28 rounded-full bg-white/20 z-20" />
            </div>
          </div>

          {/* Ledger logs Timeline (7/12) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex-1 flex flex-col rounded-3xl border border-white/[0.08] bg-[#070b13]/60 backdrop-blur-md p-5 shadow-inner">
              
              {/* Header of Ledger container */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 font-mono text-[0.68rem] tracking-wider text-white/50">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CAMPOS VERIFIED LEDGER STREAM
                </span>
                <span className="text-[0.55rem] bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 px-2 py-0.5 rounded-full font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Ledger stream viewport */}
              <div className="flex-1 overflow-y-auto max-h-[360px] pr-1.5 flex flex-col gap-3.5 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${log.accent}`}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-mono text-[0.64rem] font-bold uppercase tracking-wider">
                            {log.title}
                          </span>
                          <span className="font-mono text-[0.52rem] text-white/40">
                            {log.timestamp}
                          </span>
                        </div>
                        <p className="text-[0.74rem] text-white/75 font-sans leading-relaxed">
                          {log.details}
                        </p>
                        <div className="mt-2 flex items-center gap-1 font-mono text-[0.58rem] text-white/40">
                          <span>TX HASH:</span>
                          <span className="select-all font-semibold tracking-wide text-white/60">{log.hash}</span>
                        </div>
                      </div>

                      <div className="flex-none self-end sm:self-start">
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[0.52rem] font-bold text-emerald-300 tracking-wider">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          VERIFIED
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Ledger summary banner */}
              <div className="border-t border-white/5 mt-4 pt-4 flex items-center justify-between text-[0.66rem] text-white/40 font-mono">
                <span>TOTAL TRANSACTIONS: {logs.length + 14820}</span>
                <span className="text-emerald-300/80">SEAL RATE: ~0.4s · POS AGREEMENT</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
