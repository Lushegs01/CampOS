import { HOW_IT_WORKS } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

/** Section 07 — onboarding in plain English. Three steps, no jargon. */
export function HowItWorks() {
  return (
    <section className="border-b border-line bg-paper-2 py-section">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="07" eyebrow="How it works" />
          <h2 className="heading mt-6 max-w-[20ch] text-balance">
            Three steps from decision to running.
          </h2>
          <p className="lede mt-5 max-w-prose text-muted">
            Onboarding is deliberate. An institution is set up by CampOS with its own
            administrators, configured to match how it already works, and then switched on
            module by module.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-3">
          {HOW_IT_WORKS.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 80} className="bg-paper px-6 py-8">
              <div className="flex items-baseline justify-between">
                <span className="text-[2.4rem] font-medium leading-none tracking-[-0.04em] text-forest">
                  {step.number}
                </span>
                <span className="label text-faint">
                  STEP {index + 1} OF {HOW_IT_WORKS.length}
                </span>
              </div>
              <h3 className="subheading mt-6">{step.title}</h3>
              <p className="body mt-3 text-muted">{step.detail}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={60}>
          <p className="mono-xs mt-6 text-faint">
            No self-serve sign-up. An institution&apos;s data is only ever created with the
            institution.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
