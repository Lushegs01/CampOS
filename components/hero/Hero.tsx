import { ArrowRight, ButtonLink } from "@/components/primitives/Button";
import { ContactButton } from "@/components/cta/ContactButton";
import { CoreSystem } from "./CoreSystem";
import { CampusPlan } from "./CampusPlan";

const FOUNDATIONS = [
  "Multi-institution by design",
  "Row-Level Security in PostgreSQL",
  "Scoped, auditable permissions",
];

/**
 * The hero composes itself once, in one order: the campus plan settles, the
 * system map rises onto it, and the map then traces its own routes.
 *
 * The headline is deliberately outside that sequence. An opacity transition on
 * it would push Largest Contentful Paint out by the length of the animation,
 * so the text paints with the document and only the ground and the frame move.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line bg-paper">
      {/* The institution, drawn from above, with the survey grid over it. */}
      <div aria-hidden className="hero-plan pointer-events-none absolute inset-0">
        <CampusPlan />
      </div>
      <div
        aria-hidden
        className="grid-wash pointer-events-none absolute inset-0 mask-fade-y opacity-70"
      />

      <div className="shell relative py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
          <div>
            <h1 className="display max-w-[17ch] text-balance">
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

          <div className="hero-figure lg:pl-4">
            <figure className="ticks border border-line bg-paper p-4 shadow-[0_24px_60px_-40px_rgba(10,13,12,0.5)] sm:p-5">
              <figcaption className="mono-xs mb-3 flex items-center justify-between gap-4 border-b border-line pb-3 text-faint">
                <span>System map · CampOS Core</span>
                <span className="hidden sm:inline">Many functions. One foundation.</span>
              </figcaption>
              <CoreSystem />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
