"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#modules", label: "Modules" },
  { href: "#trust", label: "Trust & security" },
  { href: "#faculty", label: "For faculty" },
  { href: "#institutions", label: "For institutions" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4">
      <div className="relative mx-auto w-full max-w-[1000px]">
        <nav
          className={`flex items-center justify-between gap-6 rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-line bg-[rgba(8,10,20,0.74)] shadow-[0_20px_50px_-26px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-line-soft bg-[rgba(8,10,20,0.48)] backdrop-blur-md"
          }`}
        >
          <Link href="#top" className="flex flex-shrink-0 items-center">
            <Logo />
          </Link>

          {/* desktop nav */}
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[0.9rem] font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#institutions"
              className="hidden text-[0.9rem] font-medium text-ink-soft transition-colors hover:text-ink lg:block"
            >
              Sign in
            </Link>
            <Link
              href="#institutions"
              className="btn btn-primary hidden !px-4 !py-2 text-[0.86rem] sm:inline-flex"
            >
              Book a demo
            </Link>

            {/* mobile toggle */}
            <button
              className="p-[6px] lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <span
                className={`my-[5px] block h-[2px] w-[22px] bg-ink transition-transform ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`my-[5px] block h-[2px] w-[22px] bg-ink transition-opacity ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`my-[5px] block h-[2px] w-[22px] bg-ink transition-transform ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {/* mobile drawer — drops below the floating pill */}
        <div
          className={`absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-line bg-[rgba(8,10,20,0.95)] backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden ${
            isOpen ? "max-h-[380px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col p-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-[0.85rem] text-[0.95rem] font-medium text-ink-soft transition-colors hover:bg-white/5 hover:text-ink"
                  onClick={() => setIsOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-1 pb-1">
              <Link
                href="#institutions"
                className="btn btn-primary w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                Book a demo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
