"use client";

import { motion } from "framer-motion";
import { container, fadeUp, scaleIn, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";

const STEPS = [
  {
    n: "01",
    accent: "#2E6BFF",
    title: "Verify once",
    body: "Each student proves who they are a single time and receives one CampOS identity, cryptographically bound to their device.",
  },
  {
    n: "02",
    accent: "#8B5CF6",
    title: "Move freely",
    body: "That one identity opens class check-in, housing, the campus network, and enrollment — no forms, no re-registering, no second login.",
  },
  {
    n: "03",
    accent: "#34D399",
    title: "Trust forever",
    body: "Every action is written to a tamper-evident ledger, so attendance, leases, and records can be verified by anyone in seconds.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden border-y border-line bg-ink-2 py-[clamp(72px,10vw,130px)]">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(circle_at_30%_40%,#000,transparent_75%)]" />

      <div className="relative z-10 mx-auto grid max-w-wrap grid-cols-1 items-center gap-[clamp(48px,7vw,96px)] px-[clamp(20px,5vw,56px)] lg:grid-cols-[0.95fr_1.05fr]">
        {/* left: steps */}
        <div>
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                One identity. <br />
                <span className="text-gradient">Every door on campus.</span>
              </>
            }
            className="mb-12"
          />

          <motion.ol
            variants={container(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative flex flex-col gap-2"
          >
            {/* connecting line */}
            <span className="absolute bottom-6 left-[26px] top-6 w-px bg-gradient-to-b from-primary via-violet to-mint opacity-40" />
            {STEPS.map((s) => (
              <motion.li key={s.n} variants={fadeUp} className="relative flex gap-5 py-3">
                <span
                  className="relative z-10 grid h-[54px] w-[54px] flex-none place-items-center rounded-full border bg-ink font-mono text-[0.82rem] font-medium"
                  style={{ borderColor: `${s.accent}66`, color: s.accent, boxShadow: `0 0 26px -8px ${s.accent}` }}
                >
                  {s.n}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-[1.18rem] font-semibold text-hi">{s.title}</h3>
                  <p className="mt-1.5 max-w-[42ch] text-[0.95rem] leading-relaxed text-mute">{s.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* right: real product (ScanMark app) in a device frame */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mx-auto w-full max-w-[340px]"
        >
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-3xl" />

          {/* phone */}
          <div className="relative mx-auto w-[270px] animate-float rounded-[42px] border border-line-2 bg-surface p-2.5 shadow-lift">
            <div className="overflow-hidden rounded-[34px] border border-line bg-black">
              <img src="/app-mockup.png" alt="ScanMark — the CampOS student portal" className="w-full" />
            </div>
          </div>

          {/* floating verified chips */}
          <div className="absolute -left-3 top-16 hidden rounded-2xl border border-line glass-strong px-3.5 py-2.5 shadow-lift sm:block">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-mint/15">
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5"><path d="M2.5 8.5 6 12l7.5-8" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <p className="text-[0.74rem] font-semibold text-hi">Checked in</p>
                <p className="font-mono text-[0.62rem] text-faint">no proxy possible</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-3 bottom-20 hidden rounded-2xl border border-line glass-strong px-3.5 py-2.5 shadow-lift sm:block">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/15">
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5"><path d="M8 1.5 14 4v4c0 3.5-2.6 5.8-6 7-3.4-1.2-6-3.5-6-7V4l6-2.5Z" stroke="#5B8CFF" strokeWidth="1.4" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <p className="text-[0.74rem] font-semibold text-hi">Device-bound</p>
                <p className="font-mono text-[0.62rem] text-faint">one identity</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
