"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./Section";

interface UniversityNode {
  id: string;
  name: string;
  shortName: string;
  location: string;
  x: number;
  y: number;
  students: string;
  fraudReduction: string;
  sealedLatency: string;
  description: string;
}

const PARTNERS: UniversityNode[] = [
  {
    id: "unilag",
    name: "University of Lagos",
    shortName: "UNILAG",
    location: "Lagos, Nigeria",
    x: 160,
    y: 840,
    students: "58,000+",
    fraudReduction: "100%",
    sealedLatency: "0.41s",
    description: "Full exam registers and digital student credentials authenticated via Verity Node.",
  },
  {
    id: "funaab",
    name: "FUNAAB",
    shortName: "FUNAAB",
    location: "Abeokuta, Nigeria",
    x: 130,
    y: 790,
    students: "18,500+",
    fraudReduction: "100%",
    sealedLatency: "0.39s",
    description: "Verified student housing leases and landlord profiles active in FunaaBnB node.",
  },
  {
    id: "abu",
    name: "Ahmadu Bello University",
    shortName: "ABU Zaria",
    location: "Zaria, Nigeria",
    x: 520,
    y: 350,
    students: "45,000+",
    fraudReduction: "99.8%",
    sealedLatency: "0.44s",
    description: "Instant ledger course registration and student identity verification active campus-wide.",
  },
  {
    id: "unn",
    name: "University of Nigeria",
    shortName: "UNN Nsukka",
    location: "Nsukka, Nigeria",
    x: 590,
    y: 750,
    students: "36,000+",
    fraudReduction: "100%",
    sealedLatency: "0.38s",
    description: "Class attendance registers sealed on the ledger using ScanMark proximity beacons.",
  },
  {
    id: "uniport",
    name: "University of Port Harcourt",
    shortName: "UNIPORT",
    location: "Port Harcourt, Nigeria",
    x: 500,
    y: 890,
    students: "28,000+",
    fraudReduction: "99.9%",
    sealedLatency: "0.42s",
    description: "Student identity gate pass system and academic record seals active across all faculties.",
  },
];

export function PartnerMap() {
  const [selectedNode, setSelectedNode] = useState<UniversityNode | null>(PARTNERS[0]);
  const [hoveredNode, setHoveredNode] = useState<UniversityNode | null>(null);
  const [svgText, setSvgText] = useState<string>("");

  const activeNode = hoveredNode || selectedNode;

  // Load the detailed states SVG on mount
  useEffect(() => {
    fetch("/nigeria-states.svg")
      .then((res) => res.text())
      .then((text) => setSvgText(text))
      .catch((err) => console.error("Error loading Nigeria map states:", err));
  }, []);

  // Update map state fills dynamically based on activeNode selection
  useEffect(() => {
    if (!svgText) return;

    // Reset all paths
    const paths = document.querySelectorAll("#network-map path");
    paths.forEach((p) => {
      p.setAttribute("fill", "rgba(16, 185, 129, 0.03)");
      p.setAttribute("stroke", "rgba(16, 185, 129, 0.12)");
      p.setAttribute("stroke-width", "1.5");
    });

    // Highlight the active state
    if (activeNode) {
      let activeStateId = "";
      if (activeNode.id === "unilag") activeStateId = "lagos";
      else if (activeNode.id === "funaab") activeStateId = "ogun";
      else if (activeNode.id === "abu") activeStateId = "kaduna";
      else if (activeNode.id === "unn") activeStateId = "enugu";
      else if (activeNode.id === "uniport") activeStateId = "rivers";

      const activePath = document.getElementById(activeStateId);
      if (activePath) {
        activePath.setAttribute("fill", "rgba(16, 185, 129, 0.38)");
        activePath.setAttribute("stroke", "rgba(16, 185, 129, 0.65)");
        activePath.setAttribute("stroke-width", "2");
      }
    }
  }, [activeNode, svgText]);

  // Event delegation click handler on the SVG wrapper
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    if (target && target.tagName === "path") {
      const id = target.getAttribute("id");
      if (id) {
        let node = null;
        if (id === "lagos") node = PARTNERS.find((p) => p.id === "unilag");
        else if (id === "ogun") node = PARTNERS.find((p) => p.id === "funaab");
        else if (id === "kaduna") node = PARTNERS.find((p) => p.id === "abu");
        else if (id === "enugu") node = PARTNERS.find((p) => p.id === "unn");
        else if (id === "rivers") node = PARTNERS.find((p) => p.id === "uniport");

        if (node) {
          setSelectedNode(node);
        }
      }
    }
  };

  // Event delegation hover handlers
  const handleMapMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    if (target && target.tagName === "path") {
      const id = target.getAttribute("id");
      if (id) {
        let node = null;
        if (id === "lagos") node = PARTNERS.find((p) => p.id === "unilag");
        else if (id === "ogun") node = PARTNERS.find((p) => p.id === "funaab");
        else if (id === "kaduna") node = PARTNERS.find((p) => p.id === "abu");
        else if (id === "enugu") node = PARTNERS.find((p) => p.id === "unn");
        else if (id === "rivers") node = PARTNERS.find((p) => p.id === "uniport");

        if (node) {
          setHoveredNode(node);
        }
      }
    }
  };

  const handleMapMouseOut = () => {
    setHoveredNode(null);
  };

  return (
    <section id="network" className="py-[clamp(64px,9vw,118px)] bg-gradient-to-b from-[#08100d] to-[#030712] border-t border-white/[0.05] relative overflow-hidden">
      {/* CSS Stylesheet specifically for the SVG interaction */}
      <style>{`
        #network-map svg {
          width: 100%;
          height: 100%;
        }
        #network-map path {
          fill: rgba(16, 185, 129, 0.03);
          stroke: rgba(16, 185, 129, 0.12);
          stroke-width: 1.5;
          transition: fill 0.35s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #network-map path[id="lagos"],
        #network-map path[id="ogun"],
        #network-map path[id="kaduna"],
        #network-map path[id="enugu"],
        #network-map path[id="rivers"] {
          cursor: pointer;
        }
        #network-map path[id="lagos"]:hover,
        #network-map path[id="ogun"]:hover,
        #network-map path[id="kaduna"]:hover,
        #network-map path[id="enugu"]:hover,
        #network-map path[id="rivers"]:hover {
          fill: rgba(16, 185, 129, 0.22) !important;
          stroke: rgba(16, 185, 129, 0.55) !important;
        }
      `}</style>

      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)] relative z-10">
        <SectionHeading
          eyebrow="CAMPOS NIGERIA NETWORK"
          title={
            <>
              Powering Universities
              <br />
              Across the Country
            </>
          }
          titleClassName="!text-white"
          className="mb-[clamp(34px,4vw,58px)]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,3vw,48px)] items-center">
          {/* Map Column (6/12) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[380px] aspect-[744/600] bg-white/[0.01] border border-white/[0.04] rounded-3xl p-6 backdrop-blur-sm overflow-hidden group shadow-2xl">
              {/* Latitude / longitude lines */}
              <div className="absolute inset-x-0 top-1/4 h-[0.5px] bg-white/[0.03] border-dashed" />
              <div className="absolute inset-x-0 top-2/4 h-[0.5px] bg-white/[0.03] border-dashed" />
              <div className="absolute inset-x-0 top-3/4 h-[0.5px] bg-white/[0.03] border-dashed" />
              <div className="absolute inset-y-0 left-1/3 w-[0.5px] bg-white/[0.03] border-dashed" />
              <div className="absolute inset-y-0 left-2/3 w-[0.5px] bg-white/[0.03] border-dashed" />

              {/* Map wrapper with event delegation */}
              <div
                id="network-map"
                onClick={handleMapClick}
                onMouseOver={handleMapMouseOver}
                onMouseOut={handleMapMouseOut}
                className="w-full h-full relative"
                dangerouslySetInnerHTML={{ __html: svgText }}
              />
            </div>
          </div>

          {/* Details Column (6/12) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Selector Pills to easily toggle universities */}
            <div className="flex flex-wrap gap-2 mb-6">
              {PARTNERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedNode(p)}
                  className={`px-4 py-1.5 rounded-full font-mono text-[0.66rem] font-bold uppercase tracking-wider transition-all duration-300 border ${
                    activeNode?.id === p.id
                      ? "bg-emerald-500 text-white border-emerald-400/20 shadow-lg shadow-emerald-500/15"
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {p.shortName}
                </button>
              ))}
            </div>

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
