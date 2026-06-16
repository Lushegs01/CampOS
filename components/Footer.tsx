import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line pb-[40px] pt-[clamp(56px,7vw,90px)]">
      <div className="mx-auto max-w-wrap px-[clamp(20px,5vw,56px)]">
        <div className="mb-[clamp(40px,5vw,64px)] grid grid-cols-1 gap-[32px] md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-[40px]">
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="#top" className="brand mb-[1.1rem] inline-flex">
              <Logo />
            </Link>
            <p className="max-w-[30ch] text-[0.92rem] text-ink-soft">
              One operating system powering the entire campus. Attendance,
              housing, records, and identity — unified, verified, and connected.
            </p>
          </div>

          <div>
            <h5 className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.1em] text-sage">
              Modules
            </h5>
            <ul className="flex flex-col gap-[0.7rem] list-none">
              <li>
                <Link href="#modules" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  ScanMark · Attendance
                </Link>
              </li>
              <li>
                <Link href="#modules" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Krib · Housing
                </Link>
              </li>
              <li>
                <Link href="#modules" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Nada · Records
                </Link>
              </li>
              <li>
                <Link href="#trust" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Identity &amp; security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.1em] text-sage">
              For institutions
            </h5>
            <ul className="flex flex-col gap-[0.7rem] list-none">
              <li>
                <Link href="#institutions" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Book a demo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Rollout
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Accreditation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-[1.1rem] font-mono text-[0.72rem] uppercase tracking-[0.1em] text-sage">
              Company
            </h5>
            <ul className="flex flex-col gap-[0.7rem] list-none">
              <li>
                <Link href="#" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[16px] border-t border-line-soft pt-[24px]">
          <p className="font-mono text-[0.74rem] tracking-[0.02em] text-sage">
            © {year} CampOS — the operating system for modern campuses.
          </p>
          <p className="font-mono text-[0.74rem] tracking-[0.02em] text-sage">
            Nigeria · Ghana · United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
