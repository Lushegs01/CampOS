import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";
import { CoreArchitecture } from "./CoreArchitecture";

/**
 * Section 02 — CampOS Core. The section is the diagram: what the layer holds,
 * and which applications depend on each part of it.
 */
export function CoreLayer() {
  return (
    <section id="platform" className="on-ink scroll-mt-16 bg-ink py-section text-paper">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="02" eyebrow="The foundation" tone="ink" />
          <h2 className="heading mt-6 max-w-[20ch] text-balance">
            One foundation. Every university workflow.
          </h2>
          <p className="lede mt-5 max-w-prose text-muted-invert">
            CampOS Core holds the institution&apos;s structure, the identity of everyone inside
            it, the permissions that govern them and the records they generate — and exposes
            all of it to applications through one set of contracts.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <CoreArchitecture />
        </Reveal>

        <Reveal delay={60}>
          <p className="mono-xs mt-5 text-faint-invert">
            Nine capabilities, four applications, one data layer. Adding the fifth application
            does not add a fifth copy of the student.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
