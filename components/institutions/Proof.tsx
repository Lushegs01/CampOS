import { PROOF_ITEMS } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";
import { ContactButton } from "@/components/cta/ContactButton";

/**
 * Section 08 — proof. CampOS does not display logos, adoption numbers or
 * testimonials it cannot evidence, so this section offers what can actually be
 * put in front of an evaluator instead.
 */
export function Proof() {
  return (
    <section className="border-b border-line bg-paper py-section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <SectionIndex index="08" eyebrow="Proof" />
            <h2 className="heading mt-6 max-w-[18ch] text-balance">
              How we prove it, before you commit.
            </h2>
            <p className="lede mt-5 max-w-prose text-muted">
              Evaluation runs on evidence you can inspect: the architecture, the running
              software, the security design, and a pilot measured on your own data. Four things,
              in this order, before anything is deployed.
            </p>
            <div className="mt-8">
              <ContactButton className="btn btn-primary">
                Request an architecture walkthrough
              </ContactButton>
            </div>
          </Reveal>

          <div>
            <ul className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2">
              {PROOF_ITEMS.map((item, index) => (
                <Reveal as="li" key={item.title} delay={index * 60} className="bg-paper px-5 py-6">
                  <p className="label text-forest">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-[1rem] font-medium tracking-[-0.015em]">
                    {item.title}
                  </h3>
                  <p className="body mt-2.5 text-[0.94rem] text-muted">{item.detail}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={80}>
              <p className="mono-xs mt-4 text-faint">
                You will not find borrowed logos, invented adoption figures or anonymous
                testimonials here. Partner institutions and pilot outcomes appear only once the
                institution agrees to be named.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
