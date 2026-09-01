import { HALOFT } from "@/lib/content";
import { SYSTEM_FLOWS } from "@/lib/system";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";
import { ClearrDemo, NadaDemo, ScanMarkApp, ScanMarkDemo, UniRegDemo } from "./demos";

/**
 * Section 03 — the ecosystem, demonstrated rather than described.
 *
 * Each application gets one statement, one sentence of problem, one sentence of
 * mechanism, and a working demo. The chips under each statement name the
 * operations the demo actually performs against Core, so the copy and the
 * interaction say the same thing.
 */

type Product = {
  slug: string;
  name: string;
  statement: string;
  problem: string;
  mechanism: string;
  demo: React.ReactNode;
  aside?: React.ReactNode;
};

const PRODUCTS: Product[] = [
  {
    slug: "scanmark",
    name: "ScanMark",
    statement: "Presence, verified.",
    problem:
      "Attendance is signed on paper, passed down a row, or reconstructed weeks later. Nobody can defend the number.",
    mechanism:
      "Every check-in resolves against the enrolment UniReg wrote to Core, so attendance becomes a live institutional record instead of a paper trail. A student not registered for the course cannot appear in it.",
    demo: <ScanMarkDemo />,
    aside: <ScanMarkApp />,
  },
  {
    slug: "unireg",
    name: "UniReg",
    statement: "Register once. It holds everywhere.",
    problem:
      "Registration is spread across forms, a portal and departmental spreadsheets that disagree with each other.",
    mechanism:
      "Enrolment is written to Core a single time. Attendance, finance and academic records read that record rather than keeping their own copy of it.",
    demo: <UniRegDemo />,
  },
  {
    slug: "clearr",
    name: "Clearr",
    statement: "Clearance, resolved — not stamped.",
    problem:
      "Fees, receipts and clearance sit apart from academic status, so clearance becomes a queue and a signature hunt.",
    mechanism:
      "A clearance decision is computed against live finance and academic state, then published back to Core so every office reads the same answer.",
    demo: <ClearrDemo />,
  },
  {
    slug: "nada",
    name: "NADA",
    statement: "Verified student. Unnamed voice.",
    problem:
      "Campus conversation happens on platforms with no link to the institution, where nobody can tell a student from an outsider.",
    mechanism:
      "Your institution knows you are a student; other students do not need to know who you are. NADA asks Core one question — is this person a member of this institution — and is never told whose answer it is.",
    demo: <NadaDemo />,
  },
];

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
            Each one solves a real operational problem on its own. None of them keeps a private
            copy of the student. Try them — every demonstration below performs the same
            operations against Core that the product does.
          </p>
        </Reveal>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {PRODUCTS.map((product, index) => {
            const flow = SYSTEM_FLOWS.find((item) => item.id === product.slug);
            const flip = index % 2 === 1;

            return (
              <article
                key={product.slug}
                id={product.slug}
                className="scroll-mt-24 border-t border-line pt-10"
              >
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
                  <Reveal className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <h3 className="text-[1.6rem] font-medium tracking-[-0.03em]">
                        {product.name}
                      </h3>
                      <span className="label text-faint">
                        {String(index + 1).padStart(2, "0")} / 04
                      </span>
                    </div>

                    <p className="mt-4 max-w-[16ch] text-[2rem] font-medium leading-[1.05] tracking-[-0.035em] text-balance">
                      {product.statement}
                    </p>

                    <dl className="mt-7 space-y-5 border-t border-line pt-6">
                      <div>
                        <dt className="label text-clay-deep">THE PROBLEM</dt>
                        <dd className="body mt-2 max-w-prose text-[0.95rem] text-muted">
                          {product.problem}
                        </dd>
                      </div>
                      <div>
                        <dt className="label text-forest">INSIDE CAMPOS</dt>
                        <dd className="body mt-2 max-w-prose text-[0.95rem] text-muted">
                          {product.mechanism}
                        </dd>
                      </div>
                    </dl>

                    {flow ? (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        <li className="mono-xs rounded-full border border-forest/30 bg-forest-tint px-3 py-1.5 text-forest">
                          writes · {flow.writes}
                        </li>
                        <li className="mono-xs rounded-full border border-line px-3 py-1.5 text-muted">
                          reads · {flow.reads}
                        </li>
                      </ul>
                    ) : null}
                  </Reveal>

                  <Reveal delay={80} className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
                    {product.aside ? (
                      <div className="grid gap-6 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] sm:items-start">
                        <div className="min-w-0">{product.demo}</div>
                        <div className="min-w-0">{product.aside}</div>
                      </div>
                    ) : (
                      product.demo
                    )}
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

        <Reveal delay={60} className="mt-16">
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
