import type { ReactNode } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { SiteFooter } from "@/components/footer/SiteFooter";

/**
 * Shell for the secondary pages: same header, same footer, one readable column.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main id="main" className="bg-paper">
        <div className="shell py-16 md:py-24">
          <div className="max-w-prose">
            <p className="label text-faint">{eyebrow.toUpperCase()}</p>
            <h1 className="heading mt-5 text-balance">{title}</h1>
            {intro ? <p className="lede mt-5 text-muted">{intro}</p> : null}
          </div>
          <div className="prose-campos mt-12 max-w-prose border-t border-line pt-10">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
