import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="sticky bottom-0 -z-10 w-full border-t border-white/10 bg-obsidian pb-[40px] pt-[clamp(56px,7vw,90px)] text-paper">
      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        <div className="mb-[clamp(40px,5vw,64px)] grid grid-cols-1 gap-[32px] md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-[40px]">
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="#top" className="brand mb-[1.1rem] inline-flex">
              <Logo />
            </Link>
            <p className="max-w-[30ch] text-[0.92rem] text-white/70">
              One operating system powering the entire campus. Attendance,
              housing, records, and identity — unified, verified, and connected.
            </p>
          </div>

          <div>
            <h5 className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.1em] text-white/50">
              Modules
            </h5>
            <ul className="flex flex-col gap-[0.7rem] list-none">
              <li>
                <Link href="#modules" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  ScanMark · Attendance
                </Link>
              </li>
              <li>
                <Link href="#modules" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Krib · Housing
                </Link>
              </li>
              <li>
                <Link href="#modules" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Nada · Records
                </Link>
              </li>
              <li>
                <Link href="#trust" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Identity &amp; security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.1em] text-white/50">
              For institutions
            </h5>
            <ul className="flex flex-col gap-[0.7rem] list-none">
              <li>
                <Link href="#institutions" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Book a demo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Rollout
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Accreditation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.1em] text-white/50">
              Company
            </h5>
            <ul className="flex flex-col gap-[0.7rem] list-none">
              <li>
                <Link href="#" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-white/70 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[16px] border-t border-white/10 pt-[24px]">
          <p className="font-mono text-[0.74rem] tracking-[0.02em] text-white/50">
            © {year} CampOS — the operating system for modern campuses.
          </p>
          <p className="font-mono text-[0.74rem] tracking-[0.02em] text-white/50">
            Nigeria · Ghana · United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
