"use client";

import { motion } from "framer-motion";
import { container, fadeUp, scaleIn, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";

const FEATURES = [
  {
    accent: "#2E6BFF",
    title: "One identity, proven once",
    body: "Each student gets a single verified CampOS identity. They prove who they are once, then move through class, library, hostel, exams, and wallet without re-registering anywhere.",
    icon: (
      <path d="M14 2l9 4v6c0 6-4 9.5-9 12-5-2.5-9-6-9-12V6l9-4z M9 14l3.5 3.5L19 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    accent: "#8B5CF6",
    title: "Access that can't be shared",
    body: "Attendance codes rotate every few seconds and die on first scan; housing and records are bound to the enrolled device. A screenshot passed down the row is already worthless.",
    icon: (
      <>
        <rect x="6" y="12" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 12V9a4.5 4.5 0 019 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="14" cy="18" r="1.6" fill="currentColor" />
      </>
    ),
  },
  {
    accent: "#34D399",
    title: "Tamper-evident by default",
    body: "Every record — a check-in, a lease, a grade — is written once and logged with who changed it and when. What a campus exports is exactly what happened.",
    icon: (
      <>
        <rect x="5" y="4" width="18" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 10h8M10 14h8M10 18h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
];

const LEDGER = [
  { tag: "CHECK-IN", detail: "CSC 401 · Hall 2B", hash: "0x9f3a…b1", t: "now" },
  { tag: "LEASE", detail: "Skyline Loft · Studio", hash: "0x47c0…e8", t: "2m" },
  { tag: "POST", detail: "Nada · anonymous", hash: "0xd21e…7a", t: "5m" },
  { tag: "ENROLL", detail: "CSC 401 · settled", hash: "0x6b88…3c", t: "8m" },
];

export function Trust() {
  return (
    <section id="trust" className="relative overflow-hidden bg-void py-[clamp(72px,10vw,130px)]">
      <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_85%_15%,rgba(46,107,255,0.18),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(52,211,153,0.12),transparent_45%)]" />

      <div className="relative z-10 mx-auto grid max-w-wrap grid-cols-1 items-start gap-[clamp(44px,6vw,90px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-2">
        {/* left */}
        <div>
          <SectionHeading
            eyebrow="Trust & security"
            eyebrowVariant="primary"
            title={
              <>
                Verified once.
                <br />
                <span className="text-gradient">Trusted everywhere.</span>
              </>
            }
            sub="A campus runs on records people can believe — who attended, who lives where, who earned what. CampOS proves each one at the moment it happens, so nothing downstream has to be taken on faith."
            className="mb-10"
          />

          <motion.div
            variants={container(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-3"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="edge group flex gap-4 rounded-card border border-line bg-surface/50 p-5 transition-colors duration-500 hover:bg-surface"
              >
                <span
                  className="grid h-11 w-11 flex-none place-items-center rounded-xl border"
                  style={{ borderColor: `${f.accent}33`, background: `${f.accent}12`, color: f.accent, boxShadow: `0 0 24px -10px ${f.accent}` }}
                >
                  <svg className="h-[26px] w-[26px]" viewBox="0 0 28 28" fill="none">
                    {f.icon}
                  </svg>
                </span>
                <div>
                  <h4 className="mb-1 text-[1.04rem] font-semibold text-hi">{f.title}</h4>
                  <p className="text-[0.92rem] leading-relaxed text-mute">{f.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* right: campus ledger */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="lg:sticky lg:top-28"
        >
          <div className="edge relative overflow-hidden rounded-xl2 glass-strong p-6 shadow-lift">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M5 4h14v16l-7-3-7 3V4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                </span>
                <div>
                  <p className="text-[0.95rem] font-semibold text-hi">Campus ledger</p>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-faint">append-only · verifiable</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" /> sealed
              </span>
            </div>

            <div className="relative flex flex-col gap-2.5">
              <span className="absolute bottom-5 left-[14px] top-5 w-px bg-gradient-to-b from-primary/50 via-line-2 to-mint/40" />
              {LEDGER.map((r) => (
                <div key={r.hash} className="relative flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-3 pl-4">
                  <span className="relative z-10 -ml-[26px] grid h-7 w-7 flex-none place-items-center rounded-full border border-mint/40 bg-ink">
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5"><path d="M2.5 8.5 6 12l7.5-8" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.66rem] font-medium tracking-[0.06em] text-primary">{r.tag}</span>
                      <span className="truncate text-[0.84rem] text-body">{r.detail}</span>
                    </div>
                    <span className="font-mono text-[0.66rem] text-faint">{r.hash}</span>
                  </div>
                  <span className="font-mono text-[0.66rem] text-faint">{r.t}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[0.7rem] text-mute">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Every record cryptographically chained — exportable, never editable.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
