"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useModal } from "@/context/ModalContext";
import { MagneticButton } from "./MagneticButton";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { openModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[#030712]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      {/* gradient hairline that fades in on scroll */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="mx-auto flex h-[74px] max-w-wrap items-center justify-between px-[clamp(20px,5vw,56px)]">
        <Link href="#top" className="brand flex items-center gap-2">
          <Logo />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#modules"
            className="text-[0.92rem] font-medium text-white/70 transition-all hover:text-white"
          >
            Platform
          </Link>
          <Link
            href="#modules"
            className="text-[0.92rem] font-medium text-white/70 transition-all hover:text-white"
          >
            Solutions
          </Link>
          <Link
            href="#trust"
            className="text-[0.92rem] font-medium text-white/70 transition-all hover:text-white"
          >
            Universities
          </Link>
          <Link
            href="#faculty"
            className="text-[0.92rem] font-medium text-white/70 transition-all hover:text-white"
          >
            Resources
          </Link>
          <button
            onClick={openModal}
            className="text-[0.92rem] font-medium text-white/70 transition-all hover:text-white"
          >
            Pricing
          </button>
        </nav>

        {/* right actions */}
        <div className="flex items-center gap-5">
          <button
            onClick={openModal}
            className="hidden text-[0.92rem] font-medium text-white/70 hover:text-white transition-all md:block"
          >
            Sign in
          </button>
          <MagneticButton
            onClick={openModal}
            className="group relative hidden overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#030712] shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] md:inline-flex"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Book Demo</span>
          </MagneticButton>

          {/* mobile menu toggle button */}
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-5 bg-white transition-all duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-all duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/[0.08] bg-black/95 px-[clamp(20px,5vw,56px)] md:hidden overflow-hidden"
          >
            <ul className="flex flex-col py-4 font-sans">
              <li>
                <Link
                  href="#modules"
                  className="block border-b border-white/[0.04] py-3 text-[0.95rem] font-medium text-white/70 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link
                  href="#modules"
                  className="block border-b border-white/[0.04] py-3 text-[0.95rem] font-medium text-white/70 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="#trust"
                  className="block border-b border-white/[0.04] py-3 text-[0.95rem] font-medium text-white/70 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Universities
                </Link>
              </li>
              <li>
                <Link
                  href="#faculty"
                  className="block border-b border-white/[0.04] py-3 text-[0.95rem] font-medium text-white/70 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Resources
                </Link>
              </li>
              <li>
                <button
                  className="w-full text-left border-b border-white/[0.04] py-3 text-[0.95rem] font-medium text-white/70 hover:text-white"
                  onClick={() => {
                    setIsOpen(false);
                    openModal();
                  }}
                >
                  Pricing
                </button>
              </li>
              <li className="mt-4 flex flex-col gap-3">
                <button
                  className="w-full py-2.5 text-center text-[0.95rem] font-medium text-white/70 hover:text-white"
                  onClick={() => {
                    setIsOpen(false);
                    openModal();
                  }}
                >
                  Sign in
                </button>
                <button
                  className="w-full py-3 text-center text-[0.95rem] font-semibold text-black bg-white rounded-full hover:bg-white/90"
                  onClick={() => {
                    setIsOpen(false);
                    openModal();
                  }}
                >
                  Book Demo
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
