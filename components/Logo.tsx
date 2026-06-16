/* eslint-disable @next/next/no-img-element */

/**
 * CampOS logo lockup — the supplied SVG mark in /public, paired with a clean
 * geometric wordmark so the brand name stays legible at small sizes.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.55em] ${className}`}>
      <img
        src="/campos-logo.svg"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 flex-none rounded-[9px] object-contain ring-1 ring-line"
      />
      <span className="font-display text-[1.32rem] font-semibold tracking-[-0.02em] text-brand">
        CampOS
      </span>
    </span>
  );
}
