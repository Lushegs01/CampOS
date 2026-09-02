import { FAQ } from "@/lib/faq";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

/**
 * Section 07 — FAQ. Native <details>, so it opens without JavaScript, is
 * findable with in-page search, and needs no ARIA of its own.
 */
export function Faq() {
  return (
    <section className="border-b border-line bg-paper py-section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <SectionIndex index="07" eyebrow="Questions" />
            <h2 className="heading mt-6 max-w-[14ch] text-balance">
              Straight answers.
            </h2>
            <p className="lede mt-5 max-w-prose text-muted">
              The questions registrars, ICT directors and bursars actually ask in the first
              meeting.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="border-t border-line">
              {FAQ.map((item) => (
                <li key={item.question} className="border-b border-line">
                  <details className="faq group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.05rem] font-medium tracking-[-0.015em]">
                      <span className="max-w-[46ch]">{item.question}</span>
                      <span
                        aria-hidden
                        className="faq-icon mt-1 flex h-5 w-5 flex-none items-center justify-center text-faint"
                      >
                        <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3">
                          <path d="M7 1.5v11" className="faq-bar" />
                          <path d="M1.5 7h11" />
                        </svg>
                      </span>
                    </summary>
                    <p className="body max-w-prose pb-6 pr-8 text-muted">{item.answer}</p>
                  </details>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
