import { NAV_LINKS, SIGN_IN_HREF } from "@/lib/site";
import { Wordmark } from "@/components/primitives/Wordmark";
import { ContactButton } from "@/components/cta/ContactButton";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky header. No scroll listener and no theme switching: the bar is opaque
 * paper with a hairline, so it reads correctly over every section below it.
 */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-[6px]">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="/" className="-my-2 group flex items-center py-2 text-forest" aria-label="CampOS — home">
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.92rem] font-medium text-muted transition-colors duration-200 ease-system hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={SIGN_IN_HREF}
            className="text-[0.92rem] font-medium text-muted transition-colors duration-200 ease-system hover:text-ink"
          >
            Sign in
          </a>
          <ContactButton className="btn btn-primary h-10 min-h-0 text-[0.9rem]" />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
