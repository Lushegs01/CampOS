"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useModal } from "@/context/ModalContext";

export function Footer() {
  const { openModal } = useModal();
  const year = new Date().getFullYear();

  return (
    <div className="w-full bg-black flex flex-col pt-16">
      
      {/* The Giant Sinking Logo Section (Like Resend) */}
      <div className="relative flex w-full items-end justify-center overflow-hidden border-b border-white/[0.08] h-[12vw] min-h-[80px]">
        <div 
          className="absolute font-display font-bold leading-none tracking-tighter text-[#111111] select-none pointer-events-none"
          style={{ 
            fontSize: "26vw", 
            bottom: "-35%", // Sinks the text beneath the border horizon
            whiteSpace: "nowrap"
          }}
        >
          Camp<span style={{ WebkitTextStroke: "3px rgba(5, 150, 105, 0.3)", color: "transparent" }}>OS</span>
        </div>
      </div>

      {/* The Footer Links Grid */}
      <footer className="w-full bg-black text-white pt-[80px] pb-[60px]">
        <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-1 gap-[64px] lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
            
            {/* Column 1: Info & Socials */}
            <div className="flex flex-col gap-8">
              <div className="text-[0.8rem] leading-relaxed text-white/50 font-mono">
                CampOS Technologies<br />
                Lagos, Nigeria · London, UK
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#111] px-3 py-1.5 transition-colors hover:bg-white/5">
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[0.75rem] font-medium text-white/80">All systems operational</span>
              </div>
            </div>

            {/* Column 2: Modules */}
            <div className="flex flex-col gap-4">
              <h5 className="text-[0.85rem] font-semibold text-white">Modules</h5>
              <ul className="flex flex-col gap-3">
                <li><Link href="#modules" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">ScanMark</Link></li>
                <li><Link href="#modules" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">FunaaBnB</Link></li>
                <li><Link href="#modules" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Nada</Link></li>
                <li><Link href="#trust" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Identity</Link></li>
                <li><button onClick={openModal} className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Ledger</button></li>
              </ul>
            </div>

            {/* Column 3: Institutions */}
            <div className="flex flex-col gap-4">
              <h5 className="text-[0.85rem] font-semibold text-white">Institutions</h5>
              <ul className="flex flex-col gap-3">
                <li><button onClick={openModal} className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Book a demo</button></li>
                <li><button onClick={openModal} className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Rollout Guide</button></li>
                <li><button onClick={openModal} className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={openModal} className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Hardware</button></li>
                <li><button onClick={openModal} className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Accreditation</button></li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div className="flex flex-col gap-4">
              <h5 className="text-[0.85rem] font-semibold text-white">Company</h5>
              <ul className="flex flex-col gap-3">
                <li><Link href="/about" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">About us</Link></li>
                <li><Link href="/#modules" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/#modules" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Customers</Link></li>
                <li><Link href="/#top" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Brand</Link></li>
              </ul>
            </div>

            {/* Column 5: Legal */}
            <div className="flex flex-col gap-4">
              <h5 className="text-[0.85rem] font-semibold text-white">Legal</h5>
              <ul className="flex flex-col gap-3">
                <li><Link href="/terms" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/#trust" className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Security</Link></li>
                <li><button onClick={openModal} className="text-[0.85rem] text-white/50 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>

          </div>

          {/* Bottom copyright line */}
          <div className="mt-[80px] flex items-center justify-between border-t border-white/10 pt-6">
            <p className="text-[0.8rem] text-white/40 font-mono">
              © {year} CampOS Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 opacity-40"><Logo /></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
