const STATS = [
  { value: "1.2M", accent: "+", label: "Verified actions a month" },
  { value: "60", accent: "+", label: "Campuses running CampOS" },
  { value: "1", accent: " ID", label: "Per student, every service" },
  { value: "3", accent: "", label: "Countries live · NG · GH · UK" },
];

export function ProofStrip() {
  return (
    <section className="bg-paper">
      <div className="wrap">
        <div className="grid grid-cols-2 divide-x divide-y divide-line md:grid-cols-4 md:divide-y-0">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center px-4 py-[clamp(28px,4vw,44px)] text-center"
            >
              <p className="font-display text-[clamp(2rem,3.4vw,2.6rem)] font-bold leading-none tracking-[-0.02em] text-ink [font-variant-numeric:tabular-nums]">
                {s.value}
                <span className="text-honey-deep">{s.accent}</span>
              </p>
              <p className="mt-[0.7rem] font-mono text-[10px] uppercase tracking-[0.12em] text-slate">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
