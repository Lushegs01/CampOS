"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal. One IntersectionObserver is shared by every instance on the
 * page, each element is unobserved the moment it lands, and the animation
 * itself is pure CSS (opacity + transform). No scroll listeners, no rAF loop.
 *
 * The paint state lives in CSS on [data-reveal]; a <noscript> override in the
 * layout keeps everything visible when JavaScript never runs.
 */

let observer: IntersectionObserver | null = null;

function shared(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "in";
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
  }
  return observer;
}

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds. Kept small — this is emphasis, not choreography. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "figure";
};

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = shared();
    if (!io) {
      node.dataset.reveal = "in";
      return;
    }
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
