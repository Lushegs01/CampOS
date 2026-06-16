"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";

const ITEMS = [
  {
    title: "One identity, proven once",
    body: "Each student gets a single verified CampOS identity. They prove who they are once, then move through class, library, hostel, exams, and wallet without re-registering anywhere.",
    icon: (
      <>
        <path
          d="M14 2l9 4v6c0 6-4 9.5-9 12-5-2.5-9-6-9-12V6l9-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 14l3.5 3.5L19 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: "Access that can't be shared",
    body: "Attendance codes rotate every few seconds and die on first scan; housing and records are bound to the enrolled device. A screenshot passed down the row is already worthless.",
    icon: (
      <>
        <rect x="6" y="12" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 12V9a4.5 4.5 0 019 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="18" r="1.6" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Tamper-evident by default",
    body: "Every record — a check-in, a lease, a grade — is written once and logged with who changed it and when. What a campus exports is exactly what happened.",
    icon: (
      <>
        <rect x="5" y="4" width="18" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 10h8M10 14h8M10 18h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
];

export function Trust() {
  return (
    <section id="trust" className="relative overflow-hidden bg-paper-2 py-[clamp(64px,9vw,118px)]">
      {/* cobalt glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[6%] top-[10%] h-[60%] w-[40%] rounded-full opacity-60 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(58,91,240,0.22), transparent 70%)" }}
      />
      <div className="wrap relative grid grid-cols-1 items-start gap-[clamp(40px,6vw,90px)] md:grid-cols-2">
        {/* Left */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <SectionHeading
            eyebrow="Trust & security"
            eyebrowVariant="blush"
            title={
              <>
                Verified once.
                <br />
                Trusted everywhere.
              </>
            }
          />
          <p className="mt-[1.6rem] max-w-[42ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-ink-soft">
            A campus runs on records people can believe — who attended, who lives
            where, who earned what. CampOS proves each one at the moment it
            happens, so nothing downstream has to be taken on faith.
          </p>
        </motion.div>

        {/* Right */}
        <motion.ul
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex list-none flex-col"
        >
          {ITEMS.map((item, i) => (
            <li
              key={item.title}
              className={`flex gap-[1.2rem] border-t border-line py-[1.5rem] ${
                i === ITEMS.length - 1 ? "border-b" : ""
              }`}
            >
              <svg className="h-[34px] w-[34px] flex-none text-honey-deep" viewBox="0 0 28 28" fill="none">
                {item.icon}
              </svg>
              <div>
                <h4 className="mb-[0.3rem] text-[1.06rem] font-semibold text-ink">{item.title}</h4>
                <p className="text-[0.93rem] leading-[1.6] text-ink-soft">{item.body}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
