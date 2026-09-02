import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";
import { TenantSwitch } from "./TenantSwitch";

const ISOLATION_FACTS = [
  "Every row belongs to exactly one institution",
  "Isolation enforced by the database, not the application",
  "Roles, permissions and modules configured per institution",
  "No cross-institution reads, including for CampOS staff",
];

/**
 * Section 05 — multi-institution architecture. Institution names are neutral
 * placeholders: nothing here implies a customer we have not announced.
 */
export function MultiInstitution() {
  return (
    <section id="institutions" className="scroll-mt-16 border-b border-line bg-paper py-section">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="05" eyebrow="Multi-institution architecture" />
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
          <TenantSwitch />
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
