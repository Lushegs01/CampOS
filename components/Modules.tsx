"use client";

import { motion } from "framer-motion";
import { container, fadeUp, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";
import { useModal } from "@/context/ModalContext";

interface Mod {
  cat: string;
  name: string;
  body: string;
  gate: string;
  accent: string;
  span: string;
  featured?: boolean;
  icon: React.ReactNode;
}

const I = (accent: string) => ({
  scan: (
    <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
      <path d="M6 14V9a3 3 0 0 1 3-3h5M26 6h5a3 3 0 0 1 3 3v5M34 26v5a3 3 0 0 1-3 3h-5M14 34H9a3 3 0 0 1-3-3v-5" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
      <rect x="14" y="14" width="12" height="12" rx="2" stroke={accent} strokeWidth="2.4" />
      <path d="M6 20h28" stroke={accent} strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
      <path d="M6 18 20 7l14 11" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M10 15v18h20V15" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M17 33V24h6v9" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
      <path d="M8 9h24a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H18l-8 6v-6a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3Z" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M20 15v4M20 23h.02" stroke={accent} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
      <path d="M11 6h13l8 8v20a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M24 6v8h8" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M15 22h10M15 27h7" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
});

const MODULES: Mod[] = [
  {
    cat: "Attendance",
    name: "ScanMark",
    body: "Rotating, single-use QR check-ins bound to each student's phone and the room they're in. Proxy attendance simply stops being possible — and the register reconciles itself.",
    gate: "Rotating codes · device-bound",
    accent: "#2E6BFF",
    span: "lg:col-span-4",
    featured: true,
    icon: I("#2E6BFF").scan,
  },
  {
    cat: "Living",
    name: "FunaaBnB",
    body: "A verified housing marketplace where every listing has a confirmed owner and real photos. Students sign leases near campus without ever meeting a fake agent.",
    gate: "Owner-ID confirmed",
    accent: "#34D399",
    span: "lg:col-span-2",
    icon: I("#34D399").home,
  },
  {
    cat: "Social",
    name: "Nada",
    body: "A campus-exclusive anonymous network. Zero-knowledge proofs verify you're a real enrolled student without ever revealing your identity — verified anonymity, zero bots.",
    gate: "Verified anonymity",
    accent: "#8B5CF6",
    span: "lg:col-span-2",
    icon: I("#8B5CF6").chat,
  },
  {
    cat: "Enrollment",
    name: "Unireg",
    body: "Unified course registration and fee processing without the bottlenecks. Students enroll in one click; the ledger guarantees zero double-booking or lost payments.",
    gate: "Instant · zero conflicts",
    accent: "#22D3EE",
    span: "lg:col-span-2",
    icon: I("#22D3EE").doc,
  },
];

function Card({ m }: { m: Mod }) {
  return (
    <motion.article
      variants={fadeUp}
      className={`edge group relative flex min-h-[260px] flex-col overflow-hidden rounded-card border border-line bg-surface/60 p-[clamp(22px,2.4vw,32px)] transition-all duration-500 hover:-translate-y-1.5 ${m.span} ${m.featured ? "lg:min-h-[300px]" : ""}`}
    >
      {/* accent wash on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 90% at 100% 0%, ${m.accent}1f, transparent 55%)` }}
      />

      {/* featured decorative motif */}
      {m.featured && (
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-3xl border opacity-30 [mask-image:radial-gradient(circle,#000,transparent_70%)]"
          style={{ borderColor: `${m.accent}55` }}
        >
          <div className="bg-dots h-full w-full opacity-60" />
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between">
        <span
          className="grid h-14 w-14 place-items-center rounded-2xl border transition-transform duration-500 group-hover:scale-105"
          style={{ borderColor: `${m.accent}33`, background: `${m.accent}12`, boxShadow: `0 0 30px -12px ${m.accent}` }}
        >
          {m.icon}
        </span>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em]" style={{ color: m.accent }}>
          {m.cat}
        </span>
      </div>

      <h3 className="display-sm relative z-10 mt-6 text-[clamp(1.5rem,2.4vw,2rem)]">{m.name}</h3>
      <p className={`relative z-10 mt-3 text-[0.95rem] leading-relaxed text-mute ${m.featured ? "max-w-[46ch]" : ""}`}>
        {m.body}
      </p>

      <div className="relative z-10 mt-auto flex items-center gap-2 border-t border-line pt-4 font-mono text-[0.7rem] tracking-[0.04em] text-faint">
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" style={{ color: m.accent }}>
          <path d="M2.5 8.5 6 12l7.5-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {m.gate}
      </div>
    </motion.article>
  );
}

export function Modules() {
  const { openModal } = useModal();
  return (
    <section id="modules" className="relative py-[clamp(72px,10vw,130px)]">
      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        <SectionHeading
          eyebrow="What's inside CampOS"
          title={
            <>
              Four campus systems,
              <br />
              <span className="text-gradient">one verified ledger.</span>
            </>
          }
          sub="Each module solves a real campus failure on its own — then writes to the same tamper-evident ledger, so one verified identity carries everywhere."
          className="mb-[clamp(36px,4vw,60px)]"
        />

        <motion.div
          variants={container(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-[clamp(14px,1.4vw,20px)] md:grid-cols-2 lg:grid-cols-6"
        >
          {MODULES.map((m) => (
            <Card key={m.name} m={m} />
          ))}

          {/* ledger CTA tile */}
          <motion.div
            variants={fadeUp}
            className="edge group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-card border border-line bg-gradient-to-br from-surface-2 to-surface p-[clamp(22px,2.4vw,32px)] transition-all duration-500 hover:-translate-y-1.5 lg:col-span-2"
          >
            <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_70%_0%,#000,transparent_70%)]">
              <div className="bg-grid h-full w-full" />
            </div>
            <div className="relative z-10">
              <span className="eyebrow eyebrow-primary">The ledger</span>
              <p className="display-sm mt-4 text-[1.5rem] leading-tight">
                One record of truth for the whole campus.
              </p>
            </div>
            <button
              onClick={openModal}
              className="relative z-10 mt-6 inline-flex items-center gap-2 font-medium text-hi transition-colors hover:text-primary"
            >
              See how it works
              <svg className="arr h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
