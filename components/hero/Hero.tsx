import { Reveal } from "@/components/primitives/Reveal";
import { ArrowRight, ButtonLink } from "@/components/primitives/Button";
import { ContactButton } from "@/components/cta/ContactButton";
import { SystemMapDesktop, SystemMapMobile } from "./SystemMap";

const FOUNDATIONS = [
  "Multi-institution by design",
  "Row-Level Security in PostgreSQL",
  "Scoped, auditable permissions",
];

/**
 * Above the fold, nothing fades in: an opacity transition on the headline would
 * push Largest Contentful Paint out by the length of the animation. The hero
 * text paints with the document; only the diagram, which is not the LCP
 * element, is revealed on entry.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line bg-paper">
      {/* Structural grid, faded out at the edges. Two gradients, no image. */}
      <div
        aria-hidden
        className="grid-wash pointer-events-none absolute inset-0 mask-fade-y opacity-70"
      />

      <div className="shell relative py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          <div>
            <h1 className="display max-w-[19ch] text-balance">
              The digital infrastructure behind the modern university.
            </h1>

            <p className="lede mt-6 max-w-[46ch] text-muted">
              CampOS gives an institution one verified identity, one permission model and one
              record of truth — then connects registration, attendance, finance, records and
              campus services on top of it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ContactButton className="btn btn-primary">
                Talk to CampOS
                <ArrowRight />
              </ContactButton>
              <ButtonLink href="/#platform" variant="secondary">
                Explore the platform
              </ButtonLink>
            </div>

            <ul className="mt-10 grid gap-2.5 border-t border-line pt-6">
              {FOUNDATIONS.map((item) => (
                <li key={item} className="mono-xs flex items-center gap-2.5 text-faint">
                  <svg
                    viewBox="0 0 12 12"
                    width="11"
                    height="11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden
                    className="flex-none text-forest"
                  >
                    <path d="M2 6.4 4.6 9 10 3.2" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={80} className="lg:pl-4">
            <figure className="ticks border border-line bg-paper/70 p-4 sm:p-6">
              <SystemMapDesktop />
              <SystemMapMobile />
              <figcaption className="mono-xs mt-4 flex items-center justify-between gap-4 border-t border-line pt-3 text-faint">
                <span>System map · CampOS Core</span>
                <span className="hidden sm:inline">Many functions. One foundation.</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
