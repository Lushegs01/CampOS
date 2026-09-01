import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

/**
 * Section 09 — onboarding, as a division of labour rather than three cards.
 *
 * A registrar's real question is not "what are the steps" but "what will you
 * need from us, and what do you do". Each station answers both.
 */
const STEPS = [
  {
    number: "01",
    title: "Connect the institution",
    lead: "The university is provisioned in Core, with its own administrators.",
    yours: "Faculties, departments, programmes and the people who will run it.",
    ours: "We create the institution, model its structure and issue administrator identities.",
  },
  {
    number: "02",
    title: "Configure the university",
    lead: "Roles and rules are set to match how the institution already works.",
    yours: "Who approves, who reads, and who is responsible for which courses and offices.",
    ours: "We turn that into scoped roles and permissions, enforced on every request.",
  },
  {
    number: "03",
    title: "Activate the ecosystem",
    lead: "Modules are switched on one at a time, against what is already in place.",
    yours: "Which module matters first, and when in the academic calendar.",
    ours: "We activate it on the identity, structure and permissions already configured.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-line bg-paper-2 py-section">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="09" eyebrow="How it works" />
          <h2 className="heading mt-6 max-w-[20ch] text-balance">
            Three steps from decision to running.
          </h2>
          <p className="lede mt-5 max-w-prose text-muted">
            Onboarding is deliberate and it is a two-sided job. Here is exactly what we need from
            the institution, and exactly what CampOS does with it.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 70} className="bg-paper px-6 py-7">
              {/* the rail: each station sits on one continuous line */}
              <div className="flex items-center gap-3">
                <span className="text-[1.75rem] font-medium leading-none tracking-[-0.04em] text-forest">
                  {step.number}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line-strong" />
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full ${index === 2 ? "bg-forest" : "bg-sage"}`}
                />
              </div>

              <h3 className="subheading mt-5">{step.title}</h3>
              <p className="body mt-2.5 text-[0.94rem] text-muted">{step.lead}</p>

              <dl className="mt-5 border-t border-line pt-4">
                <div>
                  <dt className="label text-faint">THE INSTITUTION PROVIDES</dt>
                  <dd className="body mt-1.5 text-[0.9rem] text-muted">{step.yours}</dd>
                </div>
                <div className="mt-4">
                  <dt className="label text-forest">CAMPOS DOES</dt>
                  <dd className="body mt-1.5 text-[0.9rem] text-muted">{step.ours}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={60}>
          <p className="mono-xs mt-5 text-faint">
            No self-serve sign-up. An institution&apos;s data is only ever created with the
            institution.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
