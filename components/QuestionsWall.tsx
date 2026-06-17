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
    a: `FunaaBnB only lists housing with a confirmed owner ID and verified photos. Students browse and sign near-campus leases inside CampOS, so there's no stranger and no deposit to a ghost.`,
    by: `Dr. Amara O.`,
    role: `Dean of Students`,
  },
  {
    q: `"Verifying a graduate's transcript for an employer takes us weeks. Does this change that?"`,
    a: `Records are sealed to the ledger and verifiable in seconds. An employer checks a credential against the campus itself — no letters, no phone calls, no forgeries to chase.`,
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
    <section id="faculty" className="relative border-y border-line bg-ink py-[clamp(72px,10vw,130px)]">
      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        <SectionHeading
          eyebrow="From the people who run campus"
          title={
            <>
              The questions registrars
              <br />
              <span className="text-gradient">actually ask.</span>
            </>
          }
          className="mb-[clamp(34px,4vw,56px)]"
        />

        <motion.div
          variants={container(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="columns-1 gap-[clamp(14px,1.4vw,20px)] md:columns-2 lg:columns-3"
        >
          {QUESTIONS.map((item, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className="edge group mb-[clamp(14px,1.4vw,20px)] break-inside-avoid rounded-card border border-line bg-surface/50 p-6 transition-all duration-400 hover:-translate-y-1 hover:bg-surface"
            >
              <svg viewBox="0 0 24 24" fill="none" className="mb-4 h-7 w-7 text-primary/60">
                <path d="M10 8c-3 1-4 3.5-4 6.5V18h5v-5H8c0-2 .8-3.4 2.6-4L10 8Zm9 0c-3 1-4 3.5-4 6.5V18h5v-5h-3c0-2 .8-3.4 2.6-4L19 8Z" fill="currentColor" />
              </svg>
              <p className="mb-3.5 font-display text-[1.14rem] leading-[1.34] tracking-[-0.01em] text-hi" style={{ fontVariationSettings: '"opsz" 40,"SOFT" 70,"wght" 440' }}>
                {item.q}
              </p>
              <p className="mb-5 text-[0.92rem] leading-relaxed text-mute">{item.a}</p>
              <p className="flex items-center gap-2 border-t border-line pt-4 font-mono text-[0.7rem] tracking-[0.02em] text-faint">
                <b className="font-body font-semibold text-body">{item.by}</b> · {item.role}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
