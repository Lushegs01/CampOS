"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useModal } from "@/context/ModalContext";

import { motion } from "framer-motion";

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
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-slate-light/60 glass-light shadow-premium"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-wrap items-center justify-between px-[clamp(20px,5vw,56px)]">
        <Link href="#top" className="brand">
          <Logo />
        </Link>

        {/* desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link
              href="#modules"
              className="relative text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-[5px] after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Modules
            </Link>
          </li>
          <li>
            <Link
              href="#trust"
              className="relative text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-[5px] after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Trust &amp; security
            </Link>
          </li>
          <li>
            <Link
              href="#faculty"
              className="relative text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-[5px] after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              For faculty
            </Link>
          </li>
          <li>
            <Link
              href="#institutions"
              className="relative text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-[5px] after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              For institutions
            </Link>
          </li>
        </ul>

        {/* right actions */}
        <div className="flex items-center gap-[1.1rem]">
          <Link
            href="#institutions"
            className="hidden text-[0.95rem] font-medium text-ink-soft hover:text-ink md:block"
          >
            Sign in
          </Link>
          <button onClick={openModal} className="btn btn-primary hidden md:inline-flex">
            Book a demo
          </button>

          {/* mobile toggle */}
          <button
            className="p-[6px] md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <span
              className={`my-[5px] block h-[2px] w-[24px] bg-ink transition-transform ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`my-[5px] block h-[2px] w-[24px] bg-ink transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`my-[5px] block h-[2px] w-[24px] bg-ink transition-transform ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed inset-x-0 top-[74px] overflow-hidden border-b border-line bg-paper px-[clamp(20px,5vw,56px)] transition-all duration-350 ease-in-out md:hidden ${
          isOpen ? "max-h-[360px] py-3 pb-6" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col">
          <li>
            <Link
              href="#modules"
              className="block border-b border-line-soft py-[0.9rem] text-[0.95rem] font-medium text-ink-soft hover:text-ink"
              onClick={() => setIsOpen(false)}
            >
              Modules
            </Link>
          </li>
          <li>
            <Link
              href="#trust"
              className="block border-b border-line-soft py-[0.9rem] text-[0.95rem] font-medium text-ink-soft hover:text-ink"
              onClick={() => setIsOpen(false)}
            >
              Trust &amp; security
            </Link>
          </li>
          <li>
            <Link
              href="#faculty"
              className="block border-b border-line-soft py-[0.9rem] text-[0.95rem] font-medium text-ink-soft hover:text-ink"
              onClick={() => setIsOpen(false)}
            >
              For faculty
            </Link>
          </li>
          <li>
            <Link
              href="#institutions"
              className="block border-b border-line-soft py-[0.9rem] text-[0.95rem] font-medium text-ink-soft hover:text-ink"
              onClick={() => setIsOpen(false)}
            >
              For institutions
            </Link>
          </li>
          <li className="mt-[14px]">
            <button
              className="btn btn-primary w-full justify-center py-[0.92em]"
              onClick={() => {
                setIsOpen(false);
                openModal();
              }}
            >
              Book a demo
            </button>
          </li>
        </ul>
      </div>
    </motion.header>
  );
}
