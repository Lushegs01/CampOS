import { LEADER_OUTCOMES } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

const AUDIENCE = [
  "Vice-Chancellor's office",
  "Registry",
  "ICT directorate",
  "Bursary",
  "Deans and faculties",
  "Student affairs",
];

/** Section 07 — the executive case, in outcomes rather than features. */
export function ForLeaders() {
  return (
    <section className="border-b border-line bg-paper-2 py-section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <SectionIndex index="07" eyebrow="For university leaders" />
            <h2 className="heading mt-6 max-w-[18ch] text-balance">
              Built for how universities actually work.
            </h2>
            <p className="lede mt-5 max-w-prose text-muted">
              A university is not a company with students in it. Authority is distributed,
              sessions have deadlines that do not move, and every decision has to be
              defensible later. CampOS is built for that reality rather than around it.
            </p>

            <div className="mt-8 border-t border-line pt-6">
              <p className="label text-faint">WHO THIS IS FOR</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AUDIENCE.map((role) => (
                  <li
                    key={role}
                    className="mono-xs rounded-full border border-line bg-paper px-3 py-2 text-muted"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {LEADER_OUTCOMES.map((outcome, index) => (
              <Reveal
                as="li"
                key={outcome.title}
                delay={Math.min(index, 5) * 50}
                className="border-t border-line pt-5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="label text-forest">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1rem] font-medium tracking-[-0.015em]">
                    {outcome.title}
                  </h3>
                </div>
                <p className="body mt-2.5 text-[0.94rem] text-muted">{outcome.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
