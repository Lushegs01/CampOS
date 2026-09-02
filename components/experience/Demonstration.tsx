import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";
import { RoleConsole } from "./RoleConsole";

/** Section 09 — CampOS in use, from three seats in the same institution. */
export function Demonstration() {
  return (
    <section id="demo" className="on-ink scroll-mt-16 bg-ink py-section text-paper">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="09" eyebrow="See it in use" tone="ink" />
          <h2 className="heading mt-6 max-w-[20ch] text-balance">
            One platform, three points of view.
          </h2>
          <p className="lede mt-5 max-w-prose text-muted-invert">
            The same records, the same permissions, three different jobs. Switch seats and
            watch what each role is allowed to see.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <RoleConsole />
        </Reveal>

        <Reveal delay={60}>
          <p className="mono-xs mt-4 text-faint-invert">
            Interface illustration. Figures shown are illustrative and are not drawn from a
            live institution.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
