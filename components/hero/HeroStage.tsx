"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { SYSTEM_FLOWS } from "@/lib/system";
import { CampusPlan, ZONE_FOR_MODULE, type Zone } from "./CampusPlan";
import { CoreSystem, IDENTITY } from "./CoreSystem";

/**
 * The hero as one instrument.
 *
 * A single piece of state — the live route — drives both the system map and
 * the campus plan behind it, so the lights coming on across the institution
 * and the route being traced through Core are always the same statement.
 *
 * The map cycles itself until someone chooses, which is what makes the ground
 * move: every few seconds a different part of the campus is in play. Cycling
 * never starts under prefers-reduced-motion.
 *
 * The copy column is passed in as children so it stays server-rendered markup:
 * the headline must paint with the document, not with the hydration.
 */
const ORDER = [IDENTITY, 0, 1, 2, 3];
const CYCLE_MS = 3800;

export function HeroStage({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<number>(IDENTITY);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCycling(true);
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const id = window.setInterval(() => {
      setActive((current) => ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [cycling]);

  const select = useCallback((next: number) => {
    setCycling(false);
    setActive(next);
  }, []);

  const zone: Zone | "all" =
    active === IDENTITY ? "all" : ZONE_FOR_MODULE[SYSTEM_FLOWS[active].id];

  return (
    <>
      <div aria-hidden className="hero-plan pointer-events-none absolute inset-0">
        <CampusPlan zone={zone} />
      </div>
      <div
        aria-hidden
        className="grid-wash pointer-events-none absolute inset-0 mask-fade-y opacity-60"
      />

      <div className="shell relative py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
          {children}

          <div className="hero-figure lg:pl-4">
            <figure className="ticks border border-line bg-paper p-4 shadow-[0_24px_60px_-40px_rgba(10,13,12,0.5)] sm:p-5">
              <figcaption className="mono-xs mb-3 flex items-center justify-between gap-4 border-b border-line pb-3 text-faint">
                <span>System map · CampOS Core</span>
                <span className="hidden sm:inline">Many functions. One foundation.</span>
              </figcaption>
              <CoreSystem active={active} cycling={cycling} onSelect={select} />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
