import type { ReactNode } from "react";

/**
 * The one container shape on the site: a hairline rectangle with corner ticks.
 * No shadows, no glass, no gradients — the structure does the work.
 */
export function Panel({
  children,
  tone = "paper",
  className = "",
  ticks = true,
  as: Tag = "div",
}: {
  children: ReactNode;
  tone?: "paper" | "ink";
  className?: string;
  ticks?: boolean;
  as?: "div" | "li" | "article";
}) {
  const base =
    tone === "ink"
      ? "border-line-invert bg-ink-2 text-paper"
      : "border-line bg-paper text-ink";

  return (
    <Tag
      className={`relative border ${base} ${ticks ? "ticks" : ""} rounded-panel ${className}`}
    >
      {children}
    </Tag>
  );
}
