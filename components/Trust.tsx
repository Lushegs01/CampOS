"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";
import { SectionHeading } from "./Section";

export function Trust() {
  return (
    <section id="trust" className="relative overflow-hidden bg-obsidian py-[clamp(64px,9vw,118px)] text-paper">
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="relative z-10 mx-auto grid max-w-wrap grid-cols-1 items-start gap-[clamp(40px,6vw,90px)] px-[clamp(20px,5vw,56px)] md:grid-cols-2">
        {/* Left Side */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <SectionHeading
            eyebrow="Trust & security"
            eyebrowVariant="primary"
            titleClassName="!text-paper"
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
          
          <motion.div 
            variants={fadeUp}
            className="relative mt-12 w-full max-w-[360px] overflow-hidden rounded-[24px] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] lg:mt-16 group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-10" />
            <img 
              src="/app-mockup.png" 
              alt="CampOS Verified App Mockup" 
              className="w-full h-auto object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" 
            />
            {/* Subtle bottom fade to blend with obsidian bg */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-obsidian to-transparent pointer-events-none z-20" />
          </motion.div>
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
              className="flex-none h-[34px] w-[34px] text-neon-indigo drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
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
              className="flex-none h-[34px] w-[34px] text-neon-indigo drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
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
              className="flex-none h-[34px] w-[34px] text-neon-indigo drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
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
