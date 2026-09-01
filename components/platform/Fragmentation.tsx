import { FRAGMENTS } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

/**
 * Section 01 — the estate as it actually is. Every tile is its own island: a
 * severed connector, a note about where the work goes, and no shared spine.
 * The disorder is deliberate and structural, not decorative.
 */
export function Fragmentation() {
  return (
    <section className="border-b border-line bg-paper-2 py-section">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="01" eyebrow="The problem" />
          <h2 className="heading mt-6 max-w-[22ch] text-balance">
            Universities don&apos;t lack systems. They lack a foundation.
          </h2>
          <p className="lede mt-5 max-w-prose text-muted">
            Attendance runs in one place, registration in another, fees in a third. Each
            keeps its own copy of the student, its own idea of who has permission, and its
            own definition of enrolled.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-4">
            {FRAGMENTS.map((fragment, index) => (
              <li
                key={fragment.name}
                className="group relative bg-paper px-4 py-6 sm:px-5 sm:py-7"
              >
                {/* A connector that leaves the tile and stops. */}
                <svg
                  viewBox="0 0 40 20"
                  width="40"
                  height="20"
                  aria-hidden
                  className={`absolute right-4 top-4 text-clay ${index % 2 ? "rotate-180" : ""}`}
                >
                  <path
                    d="M2 10 H26"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.75"
                  />
                  <path d="m30 6 6 8M36 6l-6 8" stroke="currentColor" strokeWidth="1" opacity="0.75" />
                </svg>

                <p className="label text-faint">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-8 text-[1.02rem] font-medium tracking-[-0.015em]">
                  {fragment.name}
                </p>
                <p className="mono-xs mt-1.5 text-faint">{fragment.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
          <Reveal>
            <p className="subheading max-w-[30ch] text-balance">
              The gaps between systems become the work.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="body max-w-prose text-muted">
              Spreadsheets that reconcile one system against another. Clearance queues that
              exist because finance cannot read academic status. Identities re-keyed at every
              desk, and records nobody fully trusts because there are four versions of them.
              None of this is a software problem in any single system —{" "}
              <span className="em-serif text-ink">it is the absence of a foundation.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
