"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";

export function Trust() {
  return (
    <section id="trust" className="overflow-hidden bg-ink py-[clamp(64px,9vw,118px)] text-paper">
      <div className="mx-auto grid max-w-wrap grid-cols-1 items-start gap-[clamp(40px,6vw,90px)] px-[clamp(20px,5vw,56px)] md:grid-cols-2">
        {/* Left Side */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <SectionHeading
            eyebrow="Trust & security"
            eyebrowVariant="honey"
            title={
              <>
                Verified once.
                <br />
                Trusted everywhere.
              </>
            }
          />
          <p className="mt-[1.6rem] max-w-[40ch] text-[clamp(1.05rem,1.4vw,1.2rem)] text-[rgba(251,249,245,.78)]">
            A campus runs on records people can believe — who attended, who lives
            where, who earned what. CampOS proves each one at the moment it
            happens, so nothing downstream has to be taken on faith.
          </p>
        </motion.div>

        {/* Right Side */}
        <motion.ul
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col list-none"
        >
          <li className="flex gap-[1.2rem] border-t border-white/10 py-[1.5rem]">
            <svg
              className="flex-none h-[34px] w-[34px] text-honey"
              viewBox="0 0 28 28"
              fill="none"
            >
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
            </svg>
            <div>
              <h4 className="mb-[0.3rem] text-[1.06rem] font-semibold">
                One identity, proven once
              </h4>
              <p className="text-[0.93rem] leading-[1.55] text-[rgba(251,249,245,.66)]">
                Each student gets a single verified CampOS identity. They prove
                who they are once, then move through class, library, hostel,
                exams, and wallet without re-registering anywhere.
              </p>
            </div>
          </li>

          <li className="flex gap-[1.2rem] border-t border-white/10 py-[1.5rem]">
            <svg
              className="flex-none h-[34px] w-[34px] text-honey"
              viewBox="0 0 28 28"
              fill="none"
            >
              <rect
                x="6"
                y="12"
                width="16"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M9.5 12V9a4.5 4.5 0 019 0v3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="14" cy="18" r="1.6" fill="currentColor" />
            </svg>
            <div>
              <h4 className="mb-[0.3rem] text-[1.06rem] font-semibold">
                Access that can't be shared
              </h4>
              <p className="text-[0.93rem] leading-[1.55] text-[rgba(251,249,245,.66)]">
                Attendance codes rotate every few seconds and die on first scan;
                housing and records are bound to the enrolled device. A screenshot
                passed down the row is already worthless.
              </p>
            </div>
          </li>

          <li className="flex gap-[1.2rem] border-y border-white/10 py-[1.5rem]">
            <svg
              className="flex-none h-[34px] w-[34px] text-honey"
              viewBox="0 0 28 28"
              fill="none"
            >
              <rect
                x="5"
                y="4"
                width="18"
                height="20"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10 10h8M10 14h8M10 18h5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <h4 className="mb-[0.3rem] text-[1.06rem] font-semibold">
                Tamper-evident by default
              </h4>
              <p className="text-[0.93rem] leading-[1.55] text-[rgba(251,249,245,.66)]">
                Every record — a check-in, a lease, a grade — is written once and
                logged with who changed it and when. What a campus exports is
                exactly what happened.
              </p>
            </div>
          </li>
        </motion.ul>
      </div>
    </section>
  );
}
