import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/site";
import { Wordmark } from "@/components/primitives/Wordmark";
import { ContactButton } from "@/components/cta/ContactButton";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink border-t border-line-invert bg-ink text-paper">
      <div className="shell py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <Wordmark className="text-paper" />
            <p className="body mt-4 max-w-[34ch] text-[0.94rem] text-muted-invert">
              The institutional infrastructure layer for universities — identity, academic
              operations, attendance, finance, records and campus services on one foundation.
            </p>
            <ContactButton className="btn btn-secondary mt-6">Talk to CampOS</ContactButton>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="label text-sage">{column.title.toUpperCase()}</h2>
                <ul className="mt-3 space-y-1.5">
                  {column.links.map((link) => (
                    <li key={link.label + link.href}>
                      <a
                        href={link.href}
                        className="inline-block py-1 text-[0.92rem] text-muted-invert transition-colors duration-200 ease-system hover:text-paper"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-invert pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-xs text-faint-invert">
            © {year} CampOS. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="/privacy"
              className="mono-xs inline-block py-1.5 text-faint-invert transition-colors duration-200 ease-system hover:text-paper"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="mono-xs inline-block py-1.5 text-faint-invert transition-colors duration-200 ease-system hover:text-paper"
            >
              Terms
            </a>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                rel="me noreferrer"
                target="_blank"
                className="mono-xs inline-block py-1.5 text-faint-invert transition-colors duration-200 ease-system hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
