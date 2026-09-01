"use client";

import { useEffect, useRef, useState } from "react";
import { FRAGMENTS } from "@/lib/content";
import { SectionIndex } from "@/components/primitives/Section";

/**
 * Section 01 — the estate, before and after.
 *
 * Eight systems start scattered and unconnected. Scrolling into the section
 * aligns them and drops the foundation underneath; a toggle lets anyone move
 * between the two states directly, which is also what makes the moment work
 * without motion or without scrolling.
 *
 * Everything animated here is transform and opacity on eleven elements.
 */

/**
 * Fixed scatter — deterministic, so server and client render identically. The
 * numbers are composed in CSS against a scale factor, which is smaller on
 * narrow screens so a tile can never push the page sideways.
 */
const SCATTER: [number, number, number][] = [
  [-14, 18, -2.2],
  [20, -12, 1.8],
  [-8, -20, 1.2],
  [16, 14, -1.4],
  [-20, -10, 2],
  [10, 20, -2],
  [-16, 12, 1.6],
  [18, -16, -1.1],
];

export function Fragmentation() {
  const [connected, setConnected] = useState(false);
  const touched = useRef(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setConnected(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (touched.current) return;
        // Connect once the visual is properly on screen, not on first pixel.
        if (entry.intersectionRatio > 0.55) {
          setConnected(true);
          observer.disconnect();
        }
      },
      { threshold: [0, 0.55, 1] }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function choose(next: boolean) {
    touched.current = true;
    setConnected(next);
  }

  return (
    <section className="border-b border-line bg-paper-2 py-section">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionIndex index="01" eyebrow="The problem" />
            <h2 className="heading mt-6 max-w-[20ch] text-balance">
              Universities have systems for everything.
            </h2>
            <p className="lede mt-5 max-w-prose text-muted">
              They were rarely designed to work as one. Each keeps its own copy of the
              student, its own idea of who has permission, and its own definition of
              enrolled — and the gaps between them become the work.
            </p>
          </div>

          <div
            role="group"
            aria-label="System state"
            className="inline-flex flex-none rounded-panel border border-line bg-paper p-1"
          >
            {[
              { label: "Fragmented", value: false },
              { label: "On CampOS", value: true },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={connected === option.value}
                onClick={() => choose(option.value)}
                className={`min-h-[2.5rem] rounded-tile px-4 text-[0.9rem] font-medium transition-colors duration-200 ease-system ${
                  connected === option.value
                    ? "bg-ink text-paper"
                    : "text-muted hover:text-ink"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={stage}
          data-connected={connected ? "true" : "false"}
          className="estate mt-12"
        >
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {FRAGMENTS.map((fragment, index) => (
              <li
                key={fragment.name}
                className="estate-tile rounded-panel border border-line bg-paper px-4 py-5"
                style={
                  {
                    "--sx": SCATTER[index][0],
                    "--sy": SCATTER[index][1],
                    "--sr": SCATTER[index][2],
                  } as React.CSSProperties
                }
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[0.98rem] font-medium tracking-[-0.015em]">
                    {fragment.name}
                  </p>
                  <span className="estate-dot" aria-hidden />
                </div>
                <p className="mono-xs mt-2 text-faint">
                  <span className="estate-before">{fragment.note}</span>
                  <span className="estate-after">{fragment.connected}</span>
                </p>
              </li>
            ))}
          </ul>

          {/* the drop into the foundation */}
          <div aria-hidden className="estate-links">
            {[0, 1, 2, 3].map((column) => (
              <span key={column} className="estate-link" />
            ))}
          </div>

          <div className="estate-core rounded-panel bg-ink px-5 py-5 text-paper sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <p className="text-[1.05rem] font-medium tracking-[-0.015em]">CampOS Core</p>
              <p className="label text-sage">ONE RECORD OF TRUTH</p>
            </div>
          </div>

          <p className="estate-caption mono-xs mt-5 text-center text-faint">
            <span className="estate-before">
              Eight systems. Eight versions of the same student.
            </span>
            <span className="estate-after">
              Eight systems. One identity, one record, one permission model.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
