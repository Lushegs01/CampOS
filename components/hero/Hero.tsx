import Image from "next/image";
import { ArrowRight, ButtonLink } from "@/components/primitives/Button";
import { ContactButton } from "@/components/cta/ContactButton";
import { CoreSystem } from "./CoreSystem";

const FOUNDATIONS = [
  "Multi-institution by design",
  "Row-Level Security in PostgreSQL",
  "Scoped, auditable permissions",
];

/**
 * The hero: a photograph of a graduating class as the ground, the system map
 * as the foreground object.
 *
 * The image is treated in the asset itself rather than at runtime — desaturated
 * toward the brand and washed with ink — so paper-white type clears 7:1 against
 * the brightest part of the frame with no CSS filter to paint. It is the LCP
 * element, so it is preloaded and served responsively.
 *
 * Nothing in this section animates.
 */
export function Hero() {
  return (
    <section id="top" className="on-ink relative isolate overflow-hidden bg-ink text-paper">
      <Image
        src="/hero-campus.webp"
        alt=""
        fill
        priority
        quality={62}
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Weighted toward the copy so the left column always reads. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,13,12,0.9)_0%,rgba(10,13,12,0.78)_34%,rgba(10,13,12,0.42)_66%,rgba(10,13,12,0.3)_100%)]"
      />
      <div
        aria-hidden
        className="grid-wash-invert pointer-events-none absolute inset-0 -z-10 mask-fade-y opacity-50"
      />

      <div className="shell relative py-14 md:py-18 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
          <div>
            <h1 className="display max-w-[17ch] text-balance">
              The digital infrastructure behind the modern university.
            </h1>

            <p className="lede mt-6 max-w-[46ch] text-muted-invert">
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

            <ul className="mt-10 grid gap-2.5 border-t border-line-invert pt-6">
              {FOUNDATIONS.map((item) => (
                <li key={item} className="mono-xs flex items-center gap-2.5 text-muted-invert">
                  <svg
                    viewBox="0 0 12 12"
                    width="11"
                    height="11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden
                    className="flex-none text-sage-soft"
                  >
                    <path d="M2 6.4 4.6 9 10 3.2" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-4">
            <figure className="ticks border border-line bg-paper p-4 text-ink shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)] sm:p-5">
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
