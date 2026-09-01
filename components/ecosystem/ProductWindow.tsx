import type { ReactNode } from "react";

/**
 * The chassis every product visual sits in. One shape, one header, one status
 * line — so four different products still read as one system.
 */
export function ProductWindow({
  module,
  state,
  children,
  className = "",
}: {
  module: string;
  state: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`ticks overflow-hidden rounded-panel border border-line bg-paper ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-paper-2 px-4 py-2.5">
        <span className="label text-faint">{module}</span>
        <span className="label inline-flex items-center gap-1.5 text-forest">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden />
          {state}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function Row({
  left,
  right,
  meta,
  tone = "default",
}: {
  left: string;
  right: string;
  meta?: string;
  tone?: "default" | "positive" | "pending";
}) {
  const rightTone =
    tone === "positive" ? "text-forest" : tone === "pending" ? "text-clay-deep" : "text-muted";

  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0">
      <span className="min-w-0 truncate text-[0.9rem] font-medium">
        {left}
        {meta ? <span className="ml-2 font-normal text-faint">{meta}</span> : null}
      </span>
      <span className={`mono-xs flex-none ${rightTone}`}>{right}</span>
    </div>
  );
}
