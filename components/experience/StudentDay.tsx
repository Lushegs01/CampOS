import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

/**
 * Section 08 — a day, from the student's side. The right-hand trace shows what
 * Core did; the student never sees any of it, which is the point.
 */
const DAY = [
  {
    time: "08:42",
    event: "Signed in once",
    detail: "One institutional identity, on their own phone.",
    trace: "session.create · institution-scoped",
  },
  {
    time: "09:03",
    event: "Registration confirmed",
    detail: "Six courses, 15 units, accepted for the semester.",
    trace: "enrolment.write → Core",
  },
  {
    time: "10:14",
    event: "CSC 401 attendance recorded",
    detail: "Checked in at the lecture, verified against enrolment.",
    trace: "enrolment.read → attendance.write",
  },
  {
    time: "13:27",
    event: "Clearance confirmed",
    detail: "Fees resolved against the same record, no queue.",
    trace: "finance.read → clearance.write",
  },
  {
    time: "16:42",
    event: "Academic record updated",
    detail: "Results attached to the identity issued at admission.",
    trace: "records.write · audited",
  },
];

export function StudentDay() {
  return (
    <section className="border-b border-line bg-paper py-section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <SectionIndex index="08" eyebrow="For students" />
            <h2 className="heading mt-6 max-w-[18ch] text-balance">
              None of this is visible to a student.
            </h2>
            <p className="lede mt-5 max-w-prose text-muted">
              They sign in once and find their courses, their attendance, their fees and their
              records already agreeing with each other. No architecture to understand, no
              second login, no office to visit to reconcile two systems.
            </p>
          </Reveal>

          <ol className="space-y-px overflow-hidden rounded-panel border border-line bg-line">
            {DAY.map((entry, index) => (
              <Reveal
                as="li"
                key={entry.time}
                delay={index * 60}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 bg-paper px-5 py-6 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-6 sm:px-7"
              >
                <p className="mono-xs pt-1 tabular-nums text-forest">{entry.time}</p>
                <div className="min-w-0">
                  <h3 className="text-[1.05rem] font-medium tracking-[-0.02em]">{entry.event}</h3>
                  <p className="body mt-1.5 text-[0.95rem] text-muted">{entry.detail}</p>
                  <p className="mono-xs mt-3 flex items-center gap-2 text-faint">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sage" />
                    {entry.trace}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
