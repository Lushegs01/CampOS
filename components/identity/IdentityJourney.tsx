"use client";

import { useEffect, useRef, useState } from "react";
import { IDENTITY_JOURNEY } from "@/lib/content";

/**
 * Section 04 — one ID, everywhere.
 *
 * The card on the left is the student's institutional record. It does not
 * change hands as you scroll; it accumulates. Each stage that passes the middle
 * of the viewport fills in the line it is responsible for, so by graduation the
 * card holds everything the university wrote to it — which is the argument.
 *
 * One IntersectionObserver, one index in state.
 */

/** What each stage adds to the record. */
const RECORD_ROWS = [
  { term: "Identity", value: "Issued at admission" },
  { term: "Institution", value: "Institution A" },
  { term: "Programme", value: "B.Sc. Computer Science · 400" },
  { term: "Attendance", value: "92% across 6 courses" },
  { term: "Finance", value: "Cleared · 2025/26" },
  { term: "Records", value: "7 semesters recorded" },
  { term: "Award", value: "Verified transcript" },
];

export function IdentityJourney() {
  const [active, setActive] = useState(0);
  const stages = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = stages.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          setActive(index);
        }
      },
      // A narrow band across the middle: whichever stage crosses it is current.
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-b border-line bg-paper-2 py-section">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="label flex items-center gap-3 text-faint">
            <span className="text-forest">04</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <span>Identity</span>
          </p>
          <h2 className="heading mt-6 text-balance">One ID. Everywhere.</h2>
          <p className="lede mt-5 max-w-prose text-muted">
            A student is created once, at admission. Every system they touch afterwards reads
            that identity and writes back to it — so the record the university holds at
            graduation is the one it has been keeping all along.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* mobile: the record as a sticky readout that fills while you scroll */}
          <div className="sticky top-16 z-20 -mx-gutter mb-2 border-y border-line bg-paper-2/95 px-gutter py-3 backdrop-blur-[6px] lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <p className="label text-faint">
                CAMPOS ID · <span className="text-forest">CS/21/0418</span>
              </p>
              <p className="mono-xs text-forest">
                {String(active + 1).padStart(2, "0")} / {IDENTITY_JOURNEY.length}
              </p>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-paper-3">
              <div
                className="h-full rounded-full bg-forest transition-[width] duration-500 ease-system"
                style={{ width: `${((active + 1) / IDENTITY_JOURNEY.length) * 100}%` }}
              />
            </div>
            <p className="mono-xs mt-2 truncate text-muted">
              {RECORD_ROWS[active].term}: {RECORD_ROWS[active].value}
            </p>
          </div>

          {/* the record */}
          <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <div className="ticks overflow-hidden rounded-panel border border-line bg-paper">
              <div className="flex items-center justify-between gap-3 border-b border-line bg-ink px-4 py-3 text-paper">
                <span className="label text-sage">CAMPOS INSTITUTIONAL IDENTITY</span>
                <span className="label text-faint-invert">CS/21/0418</span>
              </div>

              <dl className="px-4 py-1">
                {RECORD_ROWS.map((row, index) => {
                  const filled = index <= active;
                  return (
                    <div
                      key={row.term}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0"
                    >
                      <dt className="label flex items-center gap-2 text-faint">
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 flex-none rounded-full transition-colors duration-300 ease-system ${
                            filled ? "bg-forest" : "bg-line-strong"
                          }`}
                        />
                        {row.term.toUpperCase()}
                      </dt>
                      <dd
                        className={`text-right text-[0.9rem] font-medium transition-all duration-300 ease-system ${
                          filled ? "text-ink opacity-100" : "text-faint opacity-45"
                        }`}
                      >
                        {filled ? row.value : "—"}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <div className="border-t border-line bg-paper-2 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="label text-faint">STAGE</span>
                  <span className="mono-xs text-forest">
                    {String(active + 1).padStart(2, "0")} / {IDENTITY_JOURNEY.length} ·{" "}
                    {IDENTITY_JOURNEY[active].stage}
                  </span>
                </div>
                <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-paper-3">
                  <div
                    className="h-full rounded-full bg-forest transition-[width] duration-500 ease-system"
                    style={{
                      width: `${((active + 1) / IDENTITY_JOURNEY.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <p className="mono-xs mt-3 text-faint">
              Illustrative record. Institution names are placeholders.
            </p>
          </div>

          {/* the journey */}
          <ol className="border-l border-line-strong pl-6 sm:pl-8">
            {IDENTITY_JOURNEY.map((station, index) => {
              const on = index === active;
              const passed = index < active;
              return (
                <li
                  key={station.stage}
                  data-index={index}
                  ref={(node) => {
                    stages.current[index] = node;
                  }}
                  className="relative py-6 first:pt-0 last:pb-0 lg:py-9"
                >
                  <span
                    aria-hidden
                    className={`absolute -left-[calc(1.5rem+5px)] top-9 h-2.5 w-2.5 rounded-full ring-4 ring-paper-2 transition-colors duration-300 ease-system first:top-1 sm:-left-[calc(2rem+5px)] lg:top-[2.6rem] ${
                      on ? "bg-forest" : passed ? "bg-sage" : "bg-line-strong"
                    }`}
                  />
                  <p className="label text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={`mt-3 text-[1.35rem] font-medium tracking-[-0.025em] transition-colors duration-300 ease-system sm:text-[1.6rem] ${
                      on ? "text-ink" : "text-muted"
                    }`}
                  >
                    {station.stage}
                  </h3>
                  <p className="body mt-2 max-w-prose text-muted">{station.detail}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
