import { IDENTITY_JOURNEY } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

const RECORD_FIELDS = [
  ["Institution", "Institution A"],
  ["Identity", "Issued at admission"],
  ["Programme", "B.Sc. Computer Science"],
  ["Level", "400 · 2025/26"],
  ["Status", "Enrolled · cleared"],
];

/**
 * Section 04 — the identity thread. One rail, seven stations, and the same
 * record travelling the length of it. Horizontal on desktop, vertical on
 * mobile; the rail is drawn with borders rather than absolute positioning, so
 * it survives any font size the reader chooses.
 */
export function IdentityThread() {
  return (
    <section className="border-b border-line bg-paper-2 py-section">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="04" eyebrow="Identity" />
          <h2 className="heading mt-6 text-balance">One ID. Everywhere.</h2>
          <p className="lede mt-5 max-w-prose text-muted">
            A student is created once, at admission, and that same verified identity carries
            through every system the university runs. Nothing downstream re-invents who they
            are — it reads the record and writes back to it.
          </p>
        </Reveal>

        {/* horizontal rail */}
        <Reveal delay={80} className="mt-14 hidden lg:block">
          <ol className="relative grid grid-cols-7 gap-x-4">
            {/* One rail behind every station, ending at the first and last dot. */}
            <span
              aria-hidden
              className="absolute left-[7.14%] right-[7.14%] top-3 h-px bg-line-strong"
            />
            {IDENTITY_JOURNEY.map((station, index) => (
              <li key={station.stage} className="relative pt-9">
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-paper-2 ${
                    index === 1 ? "bg-forest" : "bg-sage"
                  }`}
                />
                <p className="label text-faint">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2.5 text-[0.98rem] font-medium leading-tight tracking-[-0.015em]">
                  {station.stage}
                </p>
                <p className="mono-xs mt-2 text-faint">{station.detail}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* vertical rail */}
        <Reveal delay={80} className="mt-12 lg:hidden">
          <ol className="border-l border-line-strong pl-6">
            {IDENTITY_JOURNEY.map((station, index) => (
              <li key={station.stage} className="relative pb-7 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-[1.8rem] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-paper-2 ${
                    index === 1 ? "bg-forest" : "bg-sage"
                  }`}
                />
                <p className="label text-faint">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-[1.02rem] font-medium tracking-[-0.015em]">
                  {station.stage}
                </p>
                <p className="body mt-1 text-muted">{station.detail}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <Reveal>
            <h3 className="subheading max-w-[24ch] text-balance">
              The same record, from admission to graduation.
            </h3>
            <p className="body mt-4 max-w-prose text-muted">
              When identity is issued once and read everywhere, the questions that normally
              cost a university weeks stop being research projects. Is this student enrolled?
              Were they in class? Have they paid? Are they cleared? Each is a lookup against
              one record rather than a reconciliation between four systems.
            </p>
            <p className="body mt-4 max-w-prose text-muted">
              It also means access can be withdrawn the way it was granted:{" "}
              <span className="em-serif text-ink">once, centrally, everywhere.</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <figure>
              <div className="ticks overflow-hidden rounded-panel border border-line bg-paper">
                <div className="flex items-center justify-between border-b border-line bg-paper-2 px-4 py-2.5">
                  <span className="label text-faint">INSTITUTIONAL IDENTITY</span>
                  <span className="label inline-flex items-center gap-1.5 text-forest">
                    <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden />
                    VERIFIED
                  </span>
                </div>
                <dl className="px-4 py-2">
                  {RECORD_FIELDS.map(([term, value]) => (
                    <div
                      key={term}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0"
                    >
                      <dt className="label text-faint">{term.toUpperCase()}</dt>
                      <dd className="text-[0.9rem] font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="border-t border-line bg-paper-2 px-4 py-3">
                  <p className="label text-faint">READ BY</p>
                  <p className="mono-xs mt-2 text-muted">
                    UniReg · ScanMark · Clearr · NADA · Institutional analytics
                  </p>
                </div>
              </div>
              <figcaption className="mono-xs mt-3 text-faint">
                Illustrative record. Institution names are placeholders.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
