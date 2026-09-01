import Link from "next/link";
import { NAV_LINKS, SIGN_IN_HREF } from "@/lib/site";
import { Wordmark } from "@/components/primitives/Wordmark";
import { ContactButton } from "@/components/cta/ContactButton";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { HeaderScrollState } from "./HeaderScrollState";

/**
 * Sticky header. No scroll listener and no theme switching: the bar is opaque
 * paper with a hairline, so it reads correctly over every section below it.
 */
export function SiteNav() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-[6px]">
      <HeaderScrollState />
      <div className="header-row shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group -my-2 flex items-center py-2 text-forest"
          aria-label="CampOS — home"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={SIGN_IN_HREF}
            className="text-[0.92rem] font-medium text-muted transition-colors duration-200 ease-system hover:text-ink"
          >
            Sign in
          </Link>
          <ContactButton className="btn btn-primary h-10 min-h-0 text-[0.9rem]" />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ContactButton className="btn btn-primary h-10 min-h-0 px-3.5 text-[0.86rem]">
            Talk to us
          </ContactButton>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
