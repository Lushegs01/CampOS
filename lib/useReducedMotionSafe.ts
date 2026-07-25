"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * `useReducedMotion()` that cannot desynchronise hydration.
 *
 * Framer's hook reads the media query during the first client render, but the
 * server has no way to know the preference. Components here use the result to
 * decide *what to render* — whether the core hub emits its pulsing rings,
 * whether the hero copy carries a parallax transform — so the server and the
 * client disagreed on the markup and React bailed out with a hydration error
 * (#418) and re-rendered the tree from scratch for exactly the users who asked
 * for less work.
 *
 * Reporting `false` until after mount makes the first client render match the
 * server's. The real preference applies on the effect immediately after, which
 * is still before any animation has had time to play.
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && reduced;
}
