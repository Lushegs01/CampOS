"use client";

import { motion } from "framer-motion";
import { fadeUp, container, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";

const QUESTIONS = [
  {
    q: `"What stops one student scanning attendance for three friends who skipped the lecture?"`,
    a: `The code rotates every fifteen seconds and burns on first scan, and each check-in is tied to the student's enrolled device. One phone can't sign in a row of empty seats.`,
    by: `Dr. Bisi A.`,
    role: `Registrar · 1,400 students`,
  },
  {
    q: `"Our students keep getting scammed by fake hostel agents online. Can CampOS actually help?"`,
    a: `Krib only lists housing with a confirmed owner ID and verified photos. Students browse and sign near-campus leases inside CampOS, so there's no stranger and no deposit to a ghost.`,
    by: `Dr. Amara O.`,
    role: `Dean of Students`,
    anon: true,
  },
  {
    q: `"Verifying a graduate's transcript for an employer takes us weeks. Does this change that?"`,
    a: `Records on Nada are sealed to the ledger and verifiable in seconds. An employer checks a credential against the campus itself — no letters, no phone calls, no forgeries to chase.`,
    by: `Mrs. Funke I.`,
    role: `Academic Affairs`,
  },
  {
    q: `"We already run a student records system. Do we have to rip it out to adopt CampOS?"`,
    a: `No. CampOS sits on top and syncs by matric number, then exports straight back into your existing rolls and SIS. You keep your system; we make it trustworthy and connected.`,
    by: `Mr. Ngozi U.`,
    role: `IT Director`,
  },
  {
    q: `"What about a student with no smartphone? I won't lock anyone out of class or housing."`,
    a: `Staff can issue a verified manual action in two taps — a check-in, an ID, a record — logged exactly like a scan. No one is left out for the phone they carry.`,
    by: `Prof. Grace M.`,
    role: `Faculty of Engineering`,
    anon: true,
  },
  {
    q: `"One login for everything sounds convenient — and like a single point of failure. Is it safe?"`,
    a: `It's one identity, not one password lying around. Access is verified per action and bound to the device, and every record is tamper-evident. Convenience without a master key to lose.`,
    by: `Mr. Tunde A.`,
    role: `Data Protection Officer`,
  },
];

export function QuestionsWall() {
  return (
    <section id="faculty" className="bg-paper-2 py-[clamp(64px,9vw,118px)]">
      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        <SectionHeading
          eyebrow="From the people who run campus"
          title={
            <>
              The questions registrars
              <br />
              actually ask.
            </>
          }
        />

        <motion.div
          variants={container(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="columns-1 md:columns-2 lg:columns-3 gap-[clamp(16px,1.6vw,22px)]"
        >
          {QUESTIONS.map((item, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className={`mb-[clamp(16px,1.6vw,22px)] break-inside-avoid rounded-[14px] border border-line p-[22px_22px_18px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-30px_rgba(24,36,30,.5)] ${
                item.anon
                  ? "bg-gradient-to-br from-white to-paper"
                  : "bg-paper"
              }`}
            >
              <p className="mb-[0.9rem] font-display text-[1.12rem] leading-[1.32] tracking-[-0.005em]" style={{ fontVariationSettings: '"opsz" 40,"SOFT" 70,"wght" 440' }}>
                {item.q}
              </p>
              <p className="mb-[1rem] text-[0.92rem] leading-[1.55] text-ink-soft">
                {item.a}
              </p>
              <p className="flex items-center gap-[0.5em] border-t border-line-soft pt-[0.85rem] font-mono text-[0.71rem] tracking-[0.02em] text-sage">
                <b className="font-body font-semibold text-ink">{item.by}</b> ·{" "}
                {item.role}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
