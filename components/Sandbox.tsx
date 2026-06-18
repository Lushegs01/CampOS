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

function ScanmarkSimulation({ progress }: { progress: number }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center h-full">
      {progress < 25 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center"
        >
          {/* Viewfinder scanner box */}
          <div className="relative mb-3 h-20 w-20 rounded-xl border border-white/20 p-2 flex items-center justify-center bg-black/40 overflow-hidden">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-emerald-400" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-emerald-400" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-emerald-400" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-emerald-400" />
            
            {/* Simulated QR matrix */}
            <div className="grid h-full w-full grid-cols-5 gap-[1px] opacity-40">
              {Array.from({ length: 25 }).map((_, i) => (
                <span
                  key={i}
                  className={`rounded-[1px] ${
                    (i * 7 + 3) % 4 === 0 || i < 5 || i % 5 === 0 || i > 20 || i % 5 === 4
                      ? "bg-emerald-400"
                      : "bg-transparent"
                  }`}
                />
              ))}
            </div>
            
            {/* Laser scanning line */}
            <motion.div
              className="absolute left-0 right-0 h-[1.5px] bg-emerald-400 shadow-[0_0_8px_#10b981]"
              animate={{ top: ["4px", "76px", "4px"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
          <span className="font-mono text-[0.55rem] text-white/80 font-bold uppercase tracking-wider">Scanning QR Code</span>
          <p className="mt-1 text-[0.48rem] text-white/40">Searching for class beacon...</p>
        </motion.div>
      )}

      {progress >= 25 && progress < 50 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center"
        >
          {/* Signal wave check */}
          <div className="h-16 w-16 rounded-full border border-emerald-500/20 flex items-center justify-center mb-3 relative bg-emerald-500/5">
            <span className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6 text-emerald-400">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
            </svg>
          </div>
          <span className="font-mono text-[0.55rem] text-emerald-400 font-bold uppercase tracking-wider">Verifying Proximity</span>
          <p className="mt-1 text-[0.48rem] text-white/40">Matching device MAC & Bluetooth...</p>
        </motion.div>
      )}

      {progress >= 50 && progress < 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center w-full px-3"
        >
          <div className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5 text-left mb-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-mono text-[0.55rem] font-bold text-emerald-400">CHECK-IN MATCH</span>
              <span className="text-[0.48rem] text-white/40 font-mono">100% Proximity</span>
            </div>
            <p className="text-[0.52rem] text-white/80 font-sans leading-tight">Student verified in CSC 401 lecture hall (Room 2B).</p>
          </div>
          <span className="font-mono text-[0.55rem] text-emerald-400 font-bold uppercase tracking-wider">Validating Ticket</span>
          <p className="mt-1 text-[0.48rem] text-white/40">Matching registrar timetable...</p>
        </motion.div>
      )}

      {progress >= 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center"
        >
          <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-3 animate-pulse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-mono text-[0.58rem] text-emerald-300 font-bold uppercase tracking-wider">Attendance Sealed</span>
          <p className="mt-1 text-[0.48rem] text-white/50 px-2">Register updated. Permanent block created.</p>
        </motion.div>
      )}
    </div>
  );
}

function FunaaBnBSimulation({ progress }: { progress: number }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center h-full">
      {progress < 25 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full px-2"
        >
          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-left mb-2">
            <div className="h-20 w-full rounded bg-slate-800/80 animate-pulse mb-2 relative overflow-hidden flex items-center justify-center">
              <span className="text-[0.48rem] text-white/30 font-mono">Loading listing image...</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-sans text-[0.6rem] font-bold text-white">Emerald Heights, Room 14</span>
              <span className="text-[0.48rem] font-mono text-emerald-400 font-bold">₦12,500/mo</span>
            </div>
            <p className="text-[0.48rem] text-white/40 mt-0.5">Owner: Lanre Davies (ID Verified)</p>
          </div>
          <span className="font-mono text-[0.55rem] text-white/70 font-bold uppercase tracking-wider">Selecting Listing</span>
        </motion.div>
      )}

      {progress >= 25 && progress < 50 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="w-full px-2 flex flex-col items-center"
        >
          <div className="w-full rounded-xl border border-white/10 bg-[#112018] p-2.5 text-left mb-2">
            <span className="block font-mono text-[0.45rem] text-emerald-400/60 uppercase mb-1">Contract Signature</span>
            <div className="h-10 border border-dashed border-white/10 rounded flex items-center justify-center relative overflow-hidden bg-black/30">
              <svg className="w-full h-full absolute inset-0 p-1" viewBox="0 0 100 30">
                <motion.path
                  d="M10 20 Q 20 10 30 20 T 50 15 T 70 25"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              </svg>
              <span className="absolute bottom-1 right-2 text-[0.4rem] font-mono text-white/30">Tenant Sign</span>
            </div>
          </div>
          <span className="font-mono text-[0.55rem] text-emerald-400 font-bold uppercase tracking-wider">Signing Smart Lease</span>
          <p className="mt-0.5 text-[0.48rem] text-white/40">Binding tenant key to escrow...</p>
        </motion.div>
      )}

      {progress >= 50 && progress < 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center w-full px-2"
        >
          <div className="h-14 w-14 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center mb-2.5 relative">
            <span className="absolute inset-0 rounded-full border border-emerald-500/20 animate-pulse" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400">
              <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
              <path d="M12 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <span className="font-mono text-[0.55rem] text-emerald-400 font-bold uppercase tracking-wider">Anchoring Escrow</span>
          <p className="mt-0.5 text-[0.48rem] text-white/40">Locking deposit into smart escrow...</p>
        </motion.div>
      )}

      {progress >= 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center"
        >
          <div className="h-12 w-12 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center text-green-400 mb-3 animate-bounce">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="font-mono text-[0.58rem] text-green-300 font-bold uppercase tracking-wider">Lease Secured</span>
          <p className="mt-1 text-[0.48rem] text-white/50 px-2">Agreement sealed. Access tokens released.</p>
        </motion.div>
      )}
    </div>
  );
}

function NadaSimulation({ progress }: { progress: number }) {
  const textToWrite = "Are CSC 401 lecture notes uploaded yet? 😭";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (progress < 25) {
      const charCount = Math.floor((progress / 25) * textToWrite.length);
      setTypedText(textToWrite.substring(0, charCount));
    } else {
      setTypedText(textToWrite);
    }
  }, [progress]);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center h-full">
      {progress < 25 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full px-2"
        >
          <div className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-left mb-2">
            <p className="font-mono text-[0.55rem] text-white/30 mb-1">Post Anonymously to /csc401</p>
            <div className="min-h-[60px] bg-transparent text-[0.6rem] text-white font-sans">
              {typedText}
              <span className="animate-pulse">|</span>
            </div>
          </div>
          <span className="font-mono text-[0.55rem] text-yellow-400 font-bold uppercase tracking-wider">Typing Message</span>
        </motion.div>
      )}

      {progress >= 25 && progress < 50 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center"
        >
          <div className="h-16 w-16 relative flex items-center justify-center mb-2.5">
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-yellow-500/40"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
            <motion.div
              className="absolute h-10 w-10 rounded-full border border-yellow-500/60"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-yellow-400 relative z-10">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="font-mono text-[0.55rem] text-yellow-400 font-bold uppercase tracking-wider">Computing ZK-Proof</span>
          <p className="mt-0.5 text-[0.48rem] text-white/40">Signing anonymously with student root...</p>
        </motion.div>
      )}

      {progress >= 50 && progress < 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center w-full px-2"
        >
          <div className="w-full rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-2 text-left mb-2">
            <span className="font-mono text-[0.5rem] text-yellow-400 block mb-1">✓ ZERO-KNOWLEDGE PROOF VALID</span>
            <p className="text-[0.48rem] text-white/50 leading-tight">Public Verification Key: vk_nada_0xf39... validated against root registry.</p>
          </div>
          <span className="font-mono text-[0.55rem] text-yellow-400 font-bold uppercase tracking-wider">ZK-Proof Verified</span>
          <p className="mt-0.5 text-[0.48rem] text-white/40">Zero student identity traces exposed...</p>
        </motion.div>
      )}

      {progress >= 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center w-full px-2"
        >
          <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-left mb-2">
            <div className="flex justify-between text-[0.48rem] text-white/40 mb-1">
              <span>Anon #382</span>
              <span>1s ago</span>
            </div>
            <p className="text-[0.55rem] text-white/80">{textToWrite}</p>
          </div>
          <span className="font-mono text-[0.58rem] text-yellow-400 font-bold uppercase tracking-wider">Post Published</span>
          <p className="mt-0.5 text-[0.48rem] text-white/50">Post added with cryptographic seal.</p>
        </motion.div>
      )}
    </div>
  );
}

function VeritySimulation({ progress }: { progress: number }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center h-full">
      {progress < 25 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full px-2"
        >
          <div className="w-full aspect-[16/10] rounded-lg border border-white/10 bg-white/5 p-2 flex flex-col justify-between text-left mb-2">
            <div>
              <span className="block font-mono text-[0.45rem] text-white/40 uppercase">University of Lagos</span>
              <span className="block font-sans text-[0.62rem] font-bold text-white leading-tight">B.Sc. Computer Science</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-mono text-[0.45rem] text-white/40">Ada Okafor</span>
              <span className="font-mono text-[0.42rem] text-rose-400 bg-rose-500/10 px-1 border border-rose-500/25 rounded uppercase">UNVERIFIED</span>
            </div>
          </div>
          <span className="font-mono text-[0.55rem] text-white/70 font-bold uppercase tracking-wider">Uploading Certificate</span>
        </motion.div>
      )}

      {progress >= 25 && progress < 50 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center"
        >
          <div className="h-14 w-14 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center mb-2.5 relative">
            <span className="absolute inset-0 rounded-full border border-emerald-500/10 animate-ping" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400">
              <path d="M12 22v-9" />
              <path d="M9 15l3-3 3 3" />
              <path d="M17 10.5a5.5 5.5 0 0 0-10.5-2.2 4 4 0 0 0-.5 7.7" />
            </svg>
          </div>
          <span className="font-mono text-[0.55rem] text-emerald-400 font-bold uppercase tracking-wider">Verifying Signature</span>
          <p className="mt-0.5 text-[0.48rem] text-white/40">Matching registrar digital key...</p>
        </motion.div>
      )}

      {progress >= 50 && progress < 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center w-full px-2"
        >
          <div className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2 text-left mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[0.5rem] text-emerald-300 font-bold">SIGNATURE VALID</span>
              <span className="text-[0.45rem] text-white/40 font-mono">0x2f8a...e911</span>
            </div>
            <p className="text-[0.48rem] text-white/50 leading-tight">UNILAG Registrar credential seal matches root key. Ready to write block.</p>
          </div>
          <span className="font-mono text-[0.55rem] text-emerald-400 font-bold uppercase tracking-wider">Validating Registrar</span>
          <p className="mt-0.5 text-[0.48rem] text-white/40">Matching registry credentials...</p>
        </motion.div>
      )}

      {progress >= 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full px-2 flex flex-col items-center"
        >
          <div className="w-full aspect-[16/10] rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 flex flex-col justify-between text-left mb-2">
            <div>
              <span className="block font-mono text-[0.45rem] text-emerald-400 uppercase">University of Lagos</span>
              <span className="block font-sans text-[0.62rem] font-bold text-white leading-tight">B.Sc. Computer Science</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-mono text-[0.45rem] text-white/40">Ada Okafor</span>
              <span className="font-mono text-[0.42rem] text-emerald-400 bg-emerald-500/20 px-1 border border-emerald-500/35 rounded uppercase">VERIFIED</span>
            </div>
          </div>
          <span className="font-mono text-[0.58rem] text-emerald-300 font-bold uppercase tracking-wider">Credential Sealed</span>
          <p className="mt-0.5 text-[0.48rem] text-white/50">Diploma anchored on secure block.</p>
        </motion.div>
      )}
    </div>
  );
}

interface SimulatorVideoProps {
  type: ModuleType;
  status: "idle" | "loading" | "success";
}

function SimulatorVideo({ type, status }: SimulatorVideoProps) {
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(12); // 12 seconds loop
  const [isPlaying, setIsPlaying] = useState(true);

  // Reset video error and progress when type changes
  useEffect(() => {
    setVideoError(false);
    setProgress(0);
  }, [type]);

  // Handle fake progress bar for CSS simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (duration * 10)); // increment 10 times per second
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const currentSec = Math.floor((progress / 100) * duration);
  const timeString = `0:${String(currentSec).padStart(2, "0")} / 0:${String(duration).padStart(2, "0")}`;
  const videoSrc = `/videos/${type}.mp4`;

  return (
    <div className="relative w-full aspect-[9/13.5] rounded-2xl border border-white/10 bg-[#060b0c] overflow-hidden flex flex-col justify-between shadow-2xl">
      {/* Video top header / overlay */}
      <div className="absolute top-2 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
        <span className="font-mono text-[0.5rem] text-emerald-400 font-bold bg-[#08100d]/80 px-1.5 py-0.5 rounded border border-emerald-500/20 tracking-wider uppercase">
          {type === "scanmark" ? "Scanmark API" : type === "funaabnb" ? "Housing Contracts" : type === "nada" ? "Nada ZKP" : "Verity Registry"}
        </span>
        <span className="flex items-center gap-1 font-mono text-[0.5rem] text-rose-500 font-bold bg-[#08100d]/80 px-1.5 py-0.5 rounded border border-rose-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          WALKTHROUGH
        </span>
      </div>

      {/* Main player content */}
      <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden">
        {!videoError ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          /* High fidelity animated video simulation fallbacks */
          <div className="w-full h-full p-4 flex flex-col justify-center items-center relative bg-gradient-to-b from-[#08100d] to-[#040708]">
            {/* Grid overlay for tech look */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {type === "scanmark" && (
                <ScanmarkSimulation progress={progress} key="scanmark-sim" />
              )}
              {type === "funaabnb" && (
                <FunaaBnBSimulation progress={progress} key="funaabnb-sim" />
              )}
              {type === "nada" && (
                <NadaSimulation progress={progress} key="nada-sim" />
              )}
              {type === "verity" && (
                <VeritySimulation progress={progress} key="verity-sim" />
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Action overlay when status is loading or success */}
        {status !== "idle" && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] z-30 flex flex-col items-center justify-center p-4 text-center">
            {status === "loading" ? (
              <div className="flex flex-col items-center">
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" />
                  <span className="h-8 w-8 rounded-full border-2 border-t-emerald-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                </div>
                <span className="mt-3 font-mono text-[0.6rem] text-emerald-400 tracking-wider uppercase">Sealing ledger block...</span>
                <span className="mt-1 font-mono text-[0.5rem] text-white/40">Broadcasting cryptographic proof</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-mono text-[0.62rem] text-emerald-300 font-bold uppercase tracking-widest">TRANSACTION SEALED</span>
                <span className="mt-1 font-mono text-[0.5rem] text-white/50">Block verified successfully</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video player controls bar */}
      <div className="bg-[#040809] border-t border-white/10 p-2 px-3 flex flex-col gap-1.5 relative z-20">
        <div className="flex items-center justify-between font-mono text-[0.45rem] text-white/50 select-none">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white transition-colors">
              {isPlaying ? (
                <svg width="6" height="7" viewBox="0 0 6 8" fill="currentColor">
                  <rect width="2" height="8" />
                  <rect x="4" width="2" height="8" />
                </svg>
              ) : (
                <svg width="6" height="7" viewBox="0 0 6 8" fill="currentColor">
                  <path d="M0 0l6 4-6 4z" />
                </svg>
              )}
            </button>
            <span>{timeString}</span>
          </div>
          <span className="text-emerald-400/80">1080p HD</span>
        </div>

        {/* Video progress track */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = (clickX / rect.width) * 100;
          setProgress(percentage);
        }}>
          <div
            className="h-full bg-emerald-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function Sandbox() {
  const [activeTab, setActiveTab] = useState<ModuleType>("scanmark");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [logs, setLogs] = useState<LedgerLog[]>(INITIAL_LOGS);
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
        newLog = {
          id: `log-${Date.now()}`,
          type: "nada",
          title: "ZKP Message Broadcasted",
          timestamp: newTimestamp,
          hash: newHash,
          details: `Post payload: "Are CSC 401 lecture notes uploaded yet? 😭" verified via student ZKP signature.`,
          accent: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
        };
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
          titleClassName="!text-white"
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
                  <SimulatorVideo type={activeTab} status={status} />
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
