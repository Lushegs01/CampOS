import { SECURITY_CONTROLS } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

/**
 * Section 05 — security. Described as architecture, with no absolute claims:
 * every line here is a control an evaluator can ask us to demonstrate.
 */
export function Security() {
  return (
    <section id="security" className="on-ink scroll-mt-16 bg-ink py-section text-paper">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <SectionIndex index="05" eyebrow="Security" tone="ink" />
            <h2 className="heading mt-6 max-w-[16ch] text-balance">
              Security is architecture, not a feature.
            </h2>
            <p className="lede mt-5 max-w-prose text-muted-invert">
              CampOS holds institutional identities and the records a university is
              accountable for. Isolation, access control and auditability are properties of
              how the system is built — not settings switched on afterwards.
            </p>

            <div className="mt-8 rounded-panel border border-line-invert bg-ink-2 px-5 py-5">
              <p className="label text-sage">WHAT WE DO NOT CLAIM</p>
              <p className="body mt-3 text-muted-invert">
                No system is unbreakable, and we will not tell you otherwise. What we will do
                is walk your ICT team through each control below, show it working, and answer
                for it in writing before anything is deployed.
              </p>
            </div>
          </Reveal>

          <div>
            <ul className="grid gap-px overflow-hidden rounded-panel border border-line-invert bg-line-invert sm:grid-cols-2">
              {SECURITY_CONTROLS.map((control, index) => (
                <Reveal
                  as="li"
                  key={control.name}
                  delay={Math.min(index, 5) * 50}
                  className="bg-ink-2 px-5 py-6"
                >
                  <h3 className="text-[1rem] font-medium tracking-[-0.015em]">{control.name}</h3>
                  <p className="body mt-2.5 text-[0.94rem] text-muted-invert">{control.detail}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
