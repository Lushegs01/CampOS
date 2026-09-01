import { ARCHITECTURE_LAYERS } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

/**
 * Section 12 — the stack, for technical evaluators. Top to bottom, each layer
 * with the one sentence that says what it is responsible for.
 */
export function Architecture() {
  return (
    <section id="resources" className="scroll-mt-16 border-b border-line bg-paper-2 py-section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <SectionIndex index="12" eyebrow="Architecture" />
            <h2 className="heading mt-6 max-w-[18ch] text-balance">
              The stack, from application to database.
            </h2>
            <p className="lede mt-5 max-w-prose text-muted">
              For the people who will actually evaluate this: every request enters at the top
              and is resolved against identity, role and tenant on the way down. Isolation is
              not the last layer&apos;s responsibility — it is enforced at the bottom of the
              stack, underneath the application.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ol className="overflow-hidden rounded-panel border border-line">
              {ARCHITECTURE_LAYERS.map((layer, index) => {
                const isCore = layer.layer === "CampOS Core";
                return (
                  <li
                    key={layer.layer}
                    className={`flex gap-4 border-b border-line px-5 py-5 last:border-b-0 sm:px-6 ${
                      isCore ? "bg-ink text-paper" : "bg-paper"
                    }`}
                  >
                    <span
                      className={`label mt-1 flex-none ${
                        isCore ? "text-sage" : "text-faint"
                      }`}
                    >
                      L{index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[1rem] font-medium tracking-[-0.015em]">
                        {layer.layer}
                      </h3>
                      <p
                        className={`body mt-1.5 text-[0.94rem] ${
                          isCore ? "text-muted-invert" : "text-muted"
                        }`}
                      >
                        {layer.detail}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className={`ml-auto hidden flex-none self-center sm:block ${
                        isCore ? "text-sage" : "text-faint"
                      }`}
                    >
                      <svg viewBox="0 0 12 16" width="12" height="16" fill="none" stroke="currentColor" strokeWidth="1.1">
                        {index < ARCHITECTURE_LAYERS.length - 1 ? (
                          <>
                            <path d="M6 2v10" />
                            <path d="m2.5 9 3.5 3.5L9.5 9" />
                          </>
                        ) : (
                          <path d="M2 8h8" />
                        )}
                      </svg>
                    </span>
                  </li>
                );
              })}
            </ol>

            <p className="mono-xs mt-4 text-faint">
              Deeper documentation — data model, integration contracts and the security
              review — is shared with an institution&apos;s technical team during evaluation.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
