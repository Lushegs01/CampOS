/**
 * The claims here used to be "1.2M+ verified actions a month", "60+ campuses
 * running CampOS" and "Live across Nigeria · Ghana · United Kingdom". None of
 * those were measurements, and the last one asserted operations in three
 * countries. Replaced with statements about how the system is designed, which
 * are true independently of how many campuses have adopted it.
 */
const POINTS: { figure: string; accent?: string; label: string }[] = [
  { figure: "1", accent: " ID", label: "Per student, every service" },
  { figure: "4", accent: " modules", label: "On one shared record" },
  { figure: "0", accent: " re-entry", label: "Data is captured once" },
];

export function ProofStrip() {
  return (
    <section className="border-y border-line-soft bg-paper-2">
      <div className="mx-auto flex max-w-wrap flex-wrap items-center justify-between gap-[clamp(20px,4vw,56px)] px-[clamp(20px,5vw,56px)] py-[30px]">
        {POINTS.map((point) => (
          <div key={point.label} className="flex flex-col gap-[0.15rem]">
            <span
              className="font-display text-[1.9rem] leading-none"
              style={{ fontVariationSettings: '"opsz" 60,"SOFT" 60,"wght" 480' }}
            >
              {point.figure}
              <span className="text-primary-deep">{point.accent}</span>
            </span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-slate">
              {point.label}
            </span>
          </div>
        ))}
        <div className="w-full text-left font-mono text-[0.78rem] tracking-[0.03em] text-ink-soft md:ml-auto md:w-auto md:text-right">
          Built for universities in
          <br />
          Nigeria and across Africa
        </div>
      </div>
    </section>
  );
}
