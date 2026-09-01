import { HALOFT, PRODUCTS } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";
import { PRODUCT_VISUALS } from "./mockups";

const FACETS = [
  { key: "problem", label: "The problem" },
  { key: "inCore", label: "Inside CampOS" },
  { key: "institution", label: "For the institution" },
  { key: "student", label: "For students" },
] as const;

/**
 * Section 03 — the ecosystem. Products are presented as consequences of the
 * foundation: what each one solves, what it reads and writes in Core, and what
 * that changes for the institution and for students.
 */
export function Ecosystem() {
  return (
    <section id="ecosystem" className="scroll-mt-16 border-b border-line bg-paper py-section">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="03" eyebrow="The ecosystem" />
          <h2 className="heading mt-6 max-w-[20ch] text-balance">
            Four applications. One system of record.
          </h2>
          <p className="lede mt-5 max-w-prose text-muted">
            Each application solves a real operational problem on its own. None of them keeps
            a private copy of the student — they read and write through the same foundation,
            which is what makes them one platform rather than four purchases.
          </p>
        </Reveal>

        <div className="mt-14 space-y-14 lg:space-y-20">
          {PRODUCTS.map((product, index) => {
            const Visual = PRODUCT_VISUALS[product.slug];
            const flip = index % 2 === 1;

            return (
              <article
                key={product.slug}
                id={product.slug}
                className="scroll-mt-24 border-t border-line pt-10"
              >
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14">
                  <Reveal className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <h3 className="text-[1.9rem] font-medium tracking-[-0.03em]">
                        {product.name}
                      </h3>
                      <span className="label text-faint">
                        {String(index + 1).padStart(2, "0")} / 04
                      </span>
                    </div>
                    <p className="lede mt-2 text-forest">{product.role}</p>

                    <dl className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                      {FACETS.map((facet) => (
                        <div key={facet.key}>
                          <dt className="label text-faint">{facet.label.toUpperCase()}</dt>
                          <dd className="body mt-2.5 text-muted">{product[facet.key]}</dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>

                  <Reveal delay={80} className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
                    <figure>
                      {Visual ? <Visual /> : null}
                      <figcaption className="mono-xs mt-3 text-faint">
                        {product.slug === "scanmark"
                          ? "ScanMark live mobile interface · student attendance portal."
                          : "Interface illustration. Figures are illustrative, not measured from a live institution."}
                      </figcaption>
                    </figure>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

        <Reveal delay={60} className="mt-14">
          <div className="rounded-panel border border-line bg-paper-2 px-6 py-6 sm:px-8 sm:py-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="subheading">{HALOFT.name}</h3>
              <span className="label text-clay-deep">OUTSIDE THE CORE ROLLOUT</span>
            </div>
            <p className="lede mt-1 text-muted">{HALOFT.role}</p>
            <p className="body mt-4 max-w-prose text-muted">{HALOFT.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
