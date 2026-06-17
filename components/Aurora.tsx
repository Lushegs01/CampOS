/**
 * Aurora — layered, slowly-drifting color blobs used behind dark hero / CTA
 * sections. Pure CSS (no JS), respects prefers-reduced-motion via the global
 * animation kill-switch. `pointer-events-none` so it never traps clicks.
 */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -left-[12%] top-[-18%] h-[60vw] max-h-[760px] w-[60vw] max-w-[760px] rounded-full bg-primary/30 blur-[120px] animate-aurora" />
      <div className="absolute right-[-14%] top-[6%] h-[48vw] max-h-[620px] w-[48vw] max-w-[620px] rounded-full bg-violet/25 blur-[120px] animate-aurora-slow" />
      <div className="absolute bottom-[-24%] left-[28%] h-[46vw] max-h-[560px] w-[46vw] max-w-[560px] rounded-full bg-cyan/15 blur-[130px] animate-aurora" />
    </div>
  );
}
