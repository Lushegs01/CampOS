"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./Section";

interface UniversityNode {
  id: string;
  name: string;
  location: string;
  x: number; // percentage coordinate on SVG
  y: number; // percentage coordinate on SVG
  students: string;
  fraudReduction: string;
  sealedLatency: string;
  description: string;
}

const PARTNERS: UniversityNode[] = [
  {
    id: "unilag",
    name: "University of Lagos",
    location: "Lagos, Nigeria",
    x: 115,
    y: 240,
    students: "58,000+",
    fraudReduction: "100%",
    sealedLatency: "0.41s",
    description: "Full exam registers and digital student credentials authenticated via Verity Node.",
  },
  {
    id: "ashesi",
    name: "Ashesi University",
    location: "Berekuso, Ghana",
    x: 75,
    y: 248,
    students: "2,200+",
    fraudReduction: "100%",
    sealedLatency: "0.38s",
    description: "Honor Code attendance check-ins sealed via ScanMark secure proximity beacons.",
  },
  {
    id: "makerere",
    name: "Makerere University",
    location: "Kampala, Uganda",
    x: 235,
    y: 285,
    students: "38,000+",
    fraudReduction: "99.8%",
    sealedLatency: "0.44s",
    description: "Unified ledger course registration and instant ledger payments active in 10 faculties.",
  },
  {
    id: "nairobi",
    name: "University of Nairobi",
    location: "Nairobi, Kenya",
    x: 255,
    y: 295,
    students: "84,000+",
    fraudReduction: "99.9%",
    sealedLatency: "0.42s",
    description: "Student identity gate pass system and academic record seal active campus-wide.",
  },
  {
    id: "uct",
    name: "University of Cape Town",
    location: "Cape Town, South Africa",
    x: 195,
    y: 470,
    students: "29,000+",
    fraudReduction: "100%",
    sealedLatency: "0.39s",
    description: "Verified housing leases via FunaaBnB node for off-campus student accommodation.",
  },
];

export function PartnerMap() {
  const [selectedNode, setSelectedNode] = useState<UniversityNode | null>(PARTNERS[0]);
  const [hoveredNode, setHoveredNode] = useState<UniversityNode | null>(null);

  const activeNode = hoveredNode || selectedNode;

  return (
    <section id="network" className="py-[clamp(64px,9vw,118px)] bg-gradient-to-b from-[#08100d] to-[#030712] border-t border-white/[0.05] relative overflow-hidden">
      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)] relative z-10">
        <SectionHeading
          eyebrow="CAMPOS PARTNER NETWORK"
          title={
            <>
              Powering Universities
              <br />
              Across the Continent
            </>
          }
          className="mb-[clamp(34px,4vw,58px)]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,3vw,48px)] items-center">
          {/* Map Column (6/12) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[380px] aspect-[360/520] bg-white/[0.01] border border-white/[0.04] rounded-3xl p-6 backdrop-blur-sm overflow-hidden group shadow-2xl">
              {/* Latitude / longitude lines */}
              <div className="absolute inset-x-0 top-1/4 h-[0.5px] bg-white/[0.03] border-dashed" />
              <div className="absolute inset-x-0 top-2/4 h-[0.5px] bg-white/[0.03] border-dashed" />
              <div className="absolute inset-x-0 top-3/4 h-[0.5px] bg-white/[0.03] border-dashed" />
              <div className="absolute inset-y-0 left-1/3 w-[0.5px] bg-white/[0.03] border-dashed" />
              <div className="absolute inset-y-0 left-2/3 w-[0.5px] bg-white/[0.03] border-dashed" />

              {/* Simplified high-tech SVG outline of Africa */}
              <svg
                viewBox="0 0 360 520"
                className="w-full h-full text-emerald-500/[0.04] fill-current stroke-emerald-500/[0.12] stroke-[1.5]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* stylized dots backing the map shape */}
                <path
                  d="M120,40 C160,20 220,10 260,30 C300,50 320,100 310,140 C300,180 260,220 230,250 C210,270 200,300 200,340 C200,370 190,400 170,430 C160,450 150,470 140,490 C135,500 130,500 125,490 C110,430 115,350 100,310 C90,290 70,270 50,260 C30,250 20,220 20,190 C20,140 40,100 80,70 Z"
                  className="transition-all duration-700 hover:text-emerald-500/[0.06]"
                />

                {/* Decorative radar ping line */}
                <line x1="20" y1="260" x2="340" y2="260" stroke="rgba(16,185,129,0.1)" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* SVG connection lines between nodes for data network visual */}
                {PARTNERS.map((partner, index) => {
                  if (index === PARTNERS.length - 1) return null;
                  const next = PARTNERS[index + 1];
                  return (
                    <line
                      key={`${partner.id}-${next.id}`}
                      x1={partner.x}
                      y1={partner.y}
                      x2={next.x}
                      y2={next.y}
                      stroke="rgba(16, 185, 129, 0.15)"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>

              {/* Pulsing interactive partner dot coordinates */}
              {PARTNERS.map((node) => {
                const isSelected = activeNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    className="absolute cursor-pointer group/dot"
                    style={{
                      left: `${(node.x / 360) * 100}%`,
                      top: `${(node.y / 520) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Ring pings */}
                    <span className={`absolute inset-0 rounded-full h-6 w-6 -left-2 -top-2 transition-all duration-300 ${
                      isSelected
                        ? "bg-emerald-400/25 animate-ping"
                        : "bg-emerald-500/10 group-hover/dot:scale-125"
                    }`} />
                    <span className={`absolute inset-0 rounded-full h-10 w-10 -left-4 -top-4 transition-all duration-300 ${
                      isSelected
                        ? "border border-emerald-400/20 scale-100 opacity-100"
                        : "opacity-0 scale-50"
                    }`} />
                    
                    {/* Centered glowing dot */}
                    <span className={`relative block rounded-full h-2 w-2 shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-300 ${
                      isSelected ? "bg-emerald-400 scale-125" : "bg-emerald-600 group-hover/dot:bg-emerald-400"
                    }`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Column (6/12) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeNode && (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl border border-white/[0.08] bg-[#070b13]/60 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative"
                >
                  <div className="absolute top-6 right-6 h-3 w-3 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <span className="font-mono text-[0.68rem] tracking-wider text-emerald-300 uppercase font-semibold">
                    {activeNode.location}
                  </span>
                  
                  <h3 className="font-sans text-[1.62rem] font-bold text-white tracking-tight leading-tight mt-1">
                    {activeNode.name}
                  </h3>

                  <p className="mt-4 text-[0.92rem] text-white/70 font-sans leading-relaxed">
                    {activeNode.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3.5 mt-8 pt-6 border-t border-white/5">
                    <div>
                      <span className="block font-mono text-[0.55rem] uppercase tracking-wider text-white/40">Verified Students</span>
                      <span className="block font-sans text-[1.28rem] font-extrabold text-white mt-1">
                        {activeNode.students}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[0.55rem] uppercase tracking-wider text-white/40">Fraud Reduction</span>
                      <span className="block font-sans text-[1.28rem] font-extrabold text-emerald-300 mt-1">
                        {activeNode.fraudReduction}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[0.55rem] uppercase tracking-wider text-white/40">Sealed Rate</span>
                      <span className="block font-sans text-[1.28rem] font-extrabold text-teal-300 mt-1">
                        {activeNode.sealedLatency}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
