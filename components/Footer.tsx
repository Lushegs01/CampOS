"use client";

import Link from "next/link";
import { CampMark } from "./Logo";
import { useModal } from "@/context/ModalContext";

const COLS = [
  {
    title: "Modules",
    links: [
      { l: "ScanMark", h: "#modules" },
      { l: "FunaaBnB", h: "#modules" },
      { l: "Nada", h: "#modules" },
      { l: "Unireg", h: "#modules" },
    ],
  },
  {
    title: "Institutions",
    links: [
      { l: "Book a demo", h: "#institutions" },
      { l: "How it works", h: "#how" },
      { l: "Trust & security", h: "#trust" },
      { l: "Pricing", h: "#institutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { l: "About us", h: "/about" },
      { l: "Customers", h: "/#faculty" },
      { l: "Brand", h: "/#top" },
    ],
  },
  {
    title: "Legal",
    links: [
      { l: "Terms of Service", h: "/terms" },
      { l: "Privacy Policy", h: "/privacy" },
      { l: "Security", h: "/#trust" },
    ],
  },
];

export function Footer() {
  const { openModal } = useModal();
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-line bg-void pt-16">
      {/* sinking wordmark */}
      <div className="relative flex w-full items-end justify-center overflow-hidden border-b border-line" style={{ height: "13vw", minHeight: 96 }}>
        <div
          className="pointer-events-none absolute select-none font-display font-bold leading-none tracking-tighter"
          style={{ fontSize: "27vw", bottom: "-36%", whiteSpace: "nowrap", color: "#0E121B" }}
        >
          Camp
          <span style={{ WebkitTextStroke: "2.5px rgba(46,107,255,0.45)", color: "transparent" }}>OS</span>
        </div>
      </div>

      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)] pb-14 pt-[72px]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          {/* brand col */}
          <div className="col-span-2 flex flex-col gap-7 md:col-span-3 lg:col-span-1">
            <Link href="#top" className="inline-flex items-center gap-2.5">
              <CampMark className="h-8 w-8" />
              <span className="font-sans text-[1.2rem] font-semibold tracking-tight text-hi">
                Camp<span className="text-gradient">OS</span>
              </span>
            </Link>
            <p className="font-mono text-[0.78rem] leading-relaxed text-faint">
              CampOS Technologies
              <br />
              Lagos, Nigeria · London, UK
            </p>
            <div className="flex gap-2.5">
              {[
                <path key="x" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
                <path key="li" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
                <path key="gh" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />,
              ].map((p, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.02] text-mute transition-colors hover:border-line-2 hover:text-hi">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">{p}</svg>
                </a>
              ))}
            </div>
            <div className="flex w-fit items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              <span className="text-[0.74rem] font-medium text-body">All systems operational</span>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h5 className="text-[0.82rem] font-semibold text-hi">{col.title}</h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.l}>
                    <Link href={link.h} className="text-[0.85rem] text-mute transition-colors hover:text-hi">
                      {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.78rem] text-faint">© {year} CampOS Inc. All rights reserved.</p>
          <button onClick={openModal} className="font-mono text-[0.78rem] text-mute transition-colors hover:text-hi">
            Contact us →
          </button>
        </div>
      </div>
    </footer>
  );
}
