import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

const TENANTS = [
  { label: "Institution A", note: "Own faculties, roles and records" },
  { label: "Institution B", note: "Own modules, own configuration" },
  { label: "Institution C", note: "Own data, own audit trail" },
];

const ISOLATION_FACTS = [
  "Every row belongs to exactly one institution",
  "Isolation enforced by the database, not the application",
  "Roles, permissions and modules configured per institution",
  "No cross-institution reads, including for CampOS staff",
];

/**
 * Section 06 — multi-institution architecture. Institution names are neutral
 * placeholders: nothing here implies a customer we have not announced.
 */
export function MultiInstitution() {
  return (
    <section id="institutions" className="scroll-mt-16 border-b border-line bg-paper py-section">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="06" eyebrow="Multi-institution architecture" />
          <h2 className="heading mt-6 max-w-[20ch] text-balance">
            Many institutions. Separate by construction.
          </h2>
          <p className="lede mt-5 max-w-prose text-muted">
            CampOS runs many universities on one platform without letting any of them see
            another. Each institution configures its own structure and modules, and its data
            stays inside its own boundary — enforced beneath the application, in the database.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <div className="ticks border border-line bg-paper-2 px-5 py-8 sm:px-8 sm:py-10">
            <div className="mx-auto max-w-3xl rounded-panel bg-ink px-6 py-5 text-paper">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[1.05rem] font-medium tracking-[-0.015em]">CampOS Core</p>
                <p className="label text-sage">ONE PLATFORM · MANY TENANTS</p>
              </div>
            </div>

            {/* branch connectors — desktop */}
            <div aria-hidden className="relative mx-auto hidden h-12 max-w-3xl sm:block">
              <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-line-strong" />
              <span className="absolute left-[16.666%] right-[16.666%] top-5 h-px bg-line-strong" />
              <span className="absolute left-[16.666%] top-5 h-7 w-px bg-line-strong" />
              <span className="absolute left-1/2 top-5 h-7 w-px -translate-x-1/2 bg-line-strong" />
              <span className="absolute right-[16.666%] top-5 h-7 w-px bg-line-strong" />
            </div>
            <div aria-hidden className="mx-auto h-8 w-px bg-line-strong sm:hidden" />

            <ul className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
              {TENANTS.map((tenant, index) => (
                <li
                  key={tenant.label}
                  className="rounded-panel border border-line bg-paper px-4 py-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[0.98rem] font-medium tracking-[-0.015em]">
                      {tenant.label}
                    </p>
                    <span className="label text-faint">{`0${index + 1}`}</span>
                  </div>
                  <p className="mono-xs mt-2 text-faint">{tenant.note}</p>
                  <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
                    <svg
                      viewBox="0 0 14 14"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      aria-hidden
                      className="flex-none text-forest"
                    >
                      <rect x="2.5" y="6" width="9" height="6" rx="1.2" />
                      <path d="M4.75 6V4.25a2.25 2.25 0 0 1 4.5 0V6" />
                    </svg>
                    <span className="label text-forest">ISOLATED DATA</span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mono-xs mt-8 text-center text-faint">
              Institution names are placeholders — CampOS does not display a university as a
              customer until that partnership is announced by the institution.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {ISOLATION_FACTS.map((fact, index) => (
            <Reveal
              as="li"
              key={fact}
              delay={index * 60}
              className="flex items-start gap-3 border-t border-line pt-4"
            >
              <span className="label mt-1 flex-none text-forest">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="body text-muted">{fact}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
