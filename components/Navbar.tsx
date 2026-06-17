"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { useModal } from "@/context/ModalContext";

const LINKS = [
  { href: "#modules", label: "Modules" },
  { href: "#how", label: "How it works" },
  { href: "#trust", label: "Trust & security" },
  { href: "#institutions", label: "Institutions" },
];

export function Navbar() {
  const { openModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line glass-strong"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-wrap items-center justify-between px-[clamp(20px,5vw,56px)]">
        <Link href="#top" aria-label="CampOS home">
          <Logo />
        </Link>

        {/* desktop nav */}
        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative text-[0.92rem] font-medium text-mute transition-colors hover:text-hi after:absolute after:-bottom-[6px] after:left-0 after:h-[1.5px] after:w-0 after:bg-gradient-to-r after:from-primary after:to-violet after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* right actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={openModal}
            className="hidden text-[0.92rem] font-medium text-mute transition-colors hover:text-hi lg:block"
          >
            Sign in
          </button>
          <button onClick={openModal} className="btn btn-primary hidden h-[42px] !py-0 lg:inline-flex">
            Book a demo
          </button>

          {/* mobile toggle */}
          <button
            className="p-[6px] lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <span className={`my-[5px] block h-[2px] w-[24px] bg-hi transition-transform ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`my-[5px] block h-[2px] w-[24px] bg-hi transition-opacity ${isOpen ? "opacity-0" : ""}`} />
            <span className={`my-[5px] block h-[2px] w-[24px] bg-hi transition-transform ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden border-line bg-ink-2/95 px-[clamp(20px,5vw,56px)] backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-[380px] border-t py-3 pb-6" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block border-b border-line py-[0.95rem] text-[0.96rem] font-medium text-body hover:text-hi"
                onClick={() => setIsOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-4">
            <button
              className="btn btn-primary w-full"
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
