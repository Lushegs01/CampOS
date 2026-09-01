import { Reveal } from "@/components/primitives/Reveal";
import { ArrowRight, ButtonLink } from "@/components/primitives/Button";
import { ContactButton } from "@/components/cta/ContactButton";

const DOMAINS = ["Identity", "Academics", "Attendance", "Finance", "Records", "Services"];

/** The closing ask. One decision, stated plainly. */
export function FinalCta() {
  return (
    <section className="on-ink relative overflow-hidden bg-ink py-section text-paper">
      <div
        aria-hidden
        className="grid-wash-invert pointer-events-none absolute inset-0 mask-fade-y opacity-80"
      />

      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <h2 className="display max-w-[16ch] text-balance">
            Build the digital foundation your university deserves.
          </h2>
          <p className="lede mt-6 max-w-prose text-muted-invert">
            Bring identity, academics, attendance, finance, records and campus operations
            together on one institutional platform.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ContactButton className="btn btn-primary">
              Talk to CampOS
              <ArrowRight />
            </ContactButton>
            <ButtonLink href="/#platform" variant="secondary">
              Explore the platform
            </ButtonLink>
          </div>
        </Reveal>

        {/* A last, quiet restatement of the whole argument. */}
        <Reveal delay={100} className="mt-16">
          <div className="border-t border-line-invert pt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {DOMAINS.map((domain) => (
                <li key={domain} className="label text-faint-invert">
                  {domain.toUpperCase()}
                </li>
              ))}
            </ul>
            <div aria-hidden className="mt-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-line-invert-strong" />
              <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden className="text-sage">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
              <span className="h-px flex-1 bg-line-invert-strong" />
            </div>
            <p className="label mt-5 text-sage">ONE INSTITUTIONAL FOUNDATION</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
