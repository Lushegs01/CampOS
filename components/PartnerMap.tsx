"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./Section";

interface UniversityNode {
  id: string;
  name: string;
  shortName: string;
  location: string;
  x: number;
  y: number;
  /** Publicly reported enrolment for the institution — not a CampOS figure. */
  students: string;
  /** Which CampOS modules address this campus's stated needs. */
  modules: string;
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
    modules: "Verity · NADA",
    description: "Exam registers and degree credentials that an employer can verify without phoning the registrar.",
  },
  {
    id: "funaab",
    name: "FUNAAB",
    shortName: "FUNAAB",
    location: "Abeokuta, Nigeria",
    x: 130,
    y: 790,
    students: "18,500+",
    modules: "FunaaBnB · NADA",
    description: "Off-campus housing with landlords and listings checked before a student pays a deposit.",
  },
  {
    id: "abu",
    name: "Ahmadu Bello University",
    shortName: "ABU Zaria",
    location: "Zaria, Nigeria",
    x: 520,
    y: 350,
    students: "45,000+",
    modules: "NADA · ScanMark",
    description: "Course registration and campus-wide identity running off a single student record.",
  },
  {
    id: "unn",
    name: "University of Nigeria",
    shortName: "UNN Nsukka",
    location: "Nsukka, Nigeria",
    x: 590,
    y: 750,
    students: "36,000+",
    modules: "ScanMark",
    description: "Attendance taken by device-bound proximity check-in, so a register cannot be signed by proxy.",
  },
  {
    id: "uniport",
    name: "University of Port Harcourt",
    shortName: "UNIPORT",
    location: "Port Harcourt, Nigeria",
    x: 500,
    y: 890,
    students: "28,000+",
    modules: "NADA · Verity",
    description: "One student identity for gate access and academic records across every faculty.",
  },
];

/** Partner id -> the id of the state path it lights up in the map SVG. */
const STATE_BY_PARTNER: Record<string, string> = {
  unilag: "lagos",
  funaab: "ogun",
  abu: "kaduna",
  unn: "enugu",
  uniport: "rivers",
};

export function PartnerMap() {
  const [selectedNode, setSelectedNode] = useState<UniversityNode | null>(PARTNERS[0]);
  const [hoveredNode, setHoveredNode] = useState<UniversityNode | null>(null);
  const [svgText, setSvgText] = useState<string>("");
  const sectionRef = useRef<HTMLElement>(null);
  const highlighted = useRef<HTMLElement | null>(null);

  const activeNode = hoveredNode || selectedNode;

  // The states SVG is 66 KB and this section sits well below the fold, so the
  // request waits until the section is within a screen of the viewport instead
  // of competing with the hero on first load.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let cancelled = false;
    const load = () => {
      fetch("/nigeria-states.svg")
        .then((res) => res.text())
        .then((text) => {
          if (!cancelled) setSvgText(text);
        })
        .catch((err) => console.error("Error loading Nigeria map states:", err));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        load();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  // Highlight the active state.
  //
  // This used to walk all 37 paths and rewrite three presentation attributes on
  // each one every time the hover changed. It was also a no-op: a `fill`
  // attribute loses to the `#network-map path` rule in the stylesheet below, so
  // the highlight never appeared. A class the stylesheet knows about both works
  // and touches at most two elements.
  useEffect(() => {
    if (!svgText) return;

    highlighted.current?.classList.remove("is-active");
    highlighted.current = null;

    if (!activeNode) return;
    const stateId = STATE_BY_PARTNER[activeNode.id];
    if (!stateId) return;

    const path = document.getElementById(stateId);
    if (path) {
      path.classList.add("is-active");
      highlighted.current = path;
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
    <section ref={sectionRef} id="network" className="py-[clamp(64px,9vw,118px)] bg-gradient-to-b from-[#08100d] to-[#030712] border-t border-white/[0.05] relative overflow-hidden">
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
        #network-map path.is-active {
          fill: rgba(16, 185, 129, 0.38);
          stroke: rgba(16, 185, 129, 0.65);
          stroke-width: 2;
        }
      `}</style>

      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)] relative z-10">
        <SectionHeading
          eyebrow="BUILT FOR NIGERIAN CAMPUSES"
          title={
            <>
              Designed Around How
              <br />
              Nigerian Universities Run
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
                <m.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
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

                  <div className="grid grid-cols-2 gap-3.5 mt-8 pt-6 border-t border-white/5">
                    <div>
                      <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-white/60">Enrolment</span>
                      <span className="block font-sans text-[1.28rem] font-extrabold text-white mt-1">
                        {activeNode.students}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-white/60">Relevant Modules</span>
                      <span className="block font-sans text-[1.05rem] font-bold text-emerald-300 mt-1">
                        {activeNode.modules}
                      </span>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
