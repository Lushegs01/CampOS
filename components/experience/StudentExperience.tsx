import { STUDENT_JOURNEY } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

/** Section 08 — the student's side of the same infrastructure. */
export function StudentExperience() {
  return (
    <section className="border-b border-line bg-paper py-section">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <Reveal>
              <SectionIndex index="08" eyebrow="Student experience" />
              <h2 className="heading mt-6 max-w-[20ch] text-balance">
                For students, none of this is visible.
              </h2>
              <p className="lede mt-5 max-w-prose text-muted">
                A student should never need to know what a tenant boundary is. They sign in
                once and find their identity, their courses, their attendance, their fees and
                their records already connected — because the institution&apos;s systems agree
                with each other underneath.
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-10">
              <ol className="border-l border-line-strong pl-6">
                {STUDENT_JOURNEY.map((item, index) => (
                  <li key={item.step} className="relative pb-6 last:pb-0">
                    <span
                      aria-hidden
                      className="absolute -left-[1.8rem] top-2 h-2.5 w-2.5 rounded-full bg-sage ring-4 ring-paper"
                    />
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="label text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[1rem] font-medium tracking-[-0.015em]">{item.step}</p>
                    </div>
                    <p className="body mt-1 text-[0.94rem] text-muted">{item.detail}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <figure className="mx-auto w-full max-w-[320px]">
              <div className="rounded-[26px] border border-line bg-paper-2 p-2.5">
                <div className="overflow-hidden rounded-[18px] border border-line bg-paper">
                  <div className="flex items-center justify-between border-b border-line bg-ink px-4 py-3 text-paper">
                    <span className="label text-sage">CAMPOS</span>
                    <span className="label text-faint-invert">INSTITUTION A</span>
                  </div>

                  <div className="px-4 py-4">
                    <p className="label text-faint">SIGNED IN AS</p>
                    <p className="mt-2 text-[1.05rem] font-medium tracking-[-0.015em]">
                      Student · 400 level
                    </p>
                    <p className="mono-xs mt-1 text-faint">
                      B.Sc. Computer Science · 2025/26
                    </p>

                    <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-tile border border-line bg-line">
                      <div className="bg-paper px-3 py-3">
                        <dt className="label text-faint">COURSES</dt>
                        <dd className="mt-1.5 text-[1.15rem] font-medium tabular-nums">6</dd>
                      </div>
                      <div className="bg-paper px-3 py-3">
                        <dt className="label text-faint">ATTENDANCE</dt>
                        <dd className="mt-1.5 text-[1.15rem] font-medium tabular-nums">92%</dd>
                      </div>
                    </dl>

                    <ul className="mt-3">
                      {[
                        ["Registration", "Complete"],
                        ["Clearance", "Cleared"],
                        ["Next class", "CSC 401 · 10:00"],
                      ].map(([label, value]) => (
                        <li
                          key={label}
                          className="flex items-baseline justify-between gap-3 border-b border-line py-2.5 last:border-b-0"
                        >
                          <span className="text-[0.9rem] font-medium">{label}</span>
                          <span className="mono-xs text-muted">{value}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 flex items-center gap-2 rounded-tile bg-forest-tint px-3 py-2.5">
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-forest" aria-hidden />
                      <span className="mono-xs text-forest">
                        One identity across every campus service
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="mono-xs mt-3 text-center text-faint">
                Interface illustration.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
