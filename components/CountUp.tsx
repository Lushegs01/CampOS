"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

function format(
  value: number,
  decimals: number,
  separator: string,
  prefix: string,
  suffix: string,
) {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return `${prefix}${decPart ? `${withSep}.${decPart}` : withSep}${suffix}`;
}

/**
 * Animated number that counts up from `from` to `to` the first time it
 * scrolls into view. Falls back to the final value instantly when the user
 * prefers reduced motion.
 */
export function CountUp({
  to,
  from = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      node.textContent = format(to, decimals, separator, prefix, suffix);
      return;
    }
    if (!inView) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        node.textContent = format(value, decimals, separator, prefix, suffix);
      },
    });
    return () => controls.stop();
  }, [inView, reduced, to, from, duration, decimals, separator, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {format(from, decimals, separator, prefix, suffix)}
    </span>
  );
}
