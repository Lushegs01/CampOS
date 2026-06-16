export function ProofStrip() {
  return (
    <section className="border-y border-line-soft bg-paper-2">
      <div className="mx-auto flex max-w-wrap flex-wrap items-center justify-between gap-[clamp(20px,4vw,56px)] px-[clamp(20px,5vw,56px)] py-[30px]">
        <div className="flex flex-col gap-[0.15rem]">
          <span className="font-display text-[1.9rem] leading-none" style={{ fontVariationSettings: '"opsz" 60,"SOFT" 60,"wght" 480' }}>
            1.2M<span className="text-honey-deep">+</span>
          </span>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-sage">
            Verified actions a month
          </span>
        </div>
        <div className="flex flex-col gap-[0.15rem]">
          <span className="font-display text-[1.9rem] leading-none" style={{ fontVariationSettings: '"opsz" 60,"SOFT" 60,"wght" 480' }}>
            60<span className="text-honey-deep">+</span>
          </span>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-sage">
            Campuses running CampOS
          </span>
        </div>
        <div className="flex flex-col gap-[0.15rem]">
          <span className="font-display text-[1.9rem] leading-none" style={{ fontVariationSettings: '"opsz" 60,"SOFT" 60,"wght" 480' }}>
            1<span className="text-honey-deep"> ID</span>
          </span>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-sage">
            Per student, every service
          </span>
        </div>
        <div className="w-full text-left font-mono text-[0.78rem] tracking-[0.03em] text-ink-soft md:w-auto md:text-right md:ml-auto">
          Live across
          <br />
          Nigeria · Ghana · United Kingdom
        </div>
      </div>
    </section>
  );
}
