import { ArrowRight, ButtonLink } from "@/components/primitives/Button";
import { ContactButton } from "@/components/cta/ContactButton";
import { HeroStage } from "./HeroStage";

const FOUNDATIONS = [
  "Multi-institution by design",
  "Row-Level Security in PostgreSQL",
  "Scoped, auditable permissions",
];

/**
 * The hero composes itself once, in one order: the campus plan settles, the
 * system map rises onto it, and the map then traces its routes — lighting the
 * part of the institution each application touches as it goes.
 *
 * The headline is deliberately outside that sequence, and outside the client
 * component: an opacity transition on it would push Largest Contentful Paint
 * out by the length of the animation.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line bg-paper">
      <HeroStage>
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
      </HeroStage>
    </section>
  );
}
