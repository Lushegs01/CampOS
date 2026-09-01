"use client";

import { useRef, useState } from "react";
import { ROLE_VIEWS } from "@/lib/roles";

/**
 * Section 11 — the same platform from three seats. A tablist (arrow keys move
 * between roles, as the pattern expects) swapping a single mock console.
 * State is one string; nothing animates except a short fade on the panel.
 */
export function RoleConsole() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const view = ROLE_VIEWS[active];

  function onKeyDown(event: React.KeyboardEvent) {
    const last = ROLE_VIEWS.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="CampOS by role"
        onKeyDown={onKeyDown}
        className="inline-flex flex-wrap gap-1 rounded-panel border border-line-invert bg-ink-2 p-1"
      >
        {ROLE_VIEWS.map((role, index) => {
          const selected = index === active;
          return (
            <button
              key={role.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              role="tab"
              id={`role-tab-${role.id}`}
              aria-selected={selected}
              aria-controls={`role-panel-${role.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={`min-h-[2.5rem] rounded-tile px-4 text-[0.92rem] font-medium transition-colors duration-200 ease-system ${
                selected
                  ? "bg-paper text-ink"
                  : "text-muted-invert hover:bg-ink-3 hover:text-paper"
              }`}
            >
              {role.label}
            </button>
          );
        })}
      </div>

      <div
        key={view.id}
        role="tabpanel"
        id={`role-panel-${view.id}`}
        aria-labelledby={`role-tab-${view.id}`}
        tabIndex={0}
        className="panel-fade mt-6 overflow-hidden rounded-panel border border-line-invert bg-ink-2"
      >
        <div className="grid md:grid-cols-[168px_minmax(0,1fr)]">
          {/* An illustration of the module's own navigation, not site navigation:
              no landmark, no links — the labels are what matter. */}
          <div className="min-w-0 border-b border-line-invert p-3 md:border-b-0 md:border-r">
            <p className="label px-2 py-2 text-faint-invert">{view.label.toUpperCase()}</p>
            <ul className="flex gap-1 overflow-x-auto md:block md:overflow-visible">
              {view.nav.map((item, index) => (
                <li key={item}>
                  <span
                    className={`block whitespace-nowrap rounded-tile px-2.5 py-2 text-[0.88rem] ${
                      index === 0 ? "bg-ink-3 text-paper" : "text-muted-invert"
                    }`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 p-5 sm:p-6">
            <h3 className="subheading max-w-[26ch] text-balance">{view.headline}</h3>
            <p className="body mt-2.5 max-w-prose text-muted-invert">{view.summary}</p>

            <dl className="mt-6 grid gap-px overflow-hidden rounded-tile border border-line-invert bg-line-invert sm:grid-cols-3">
              {view.metrics.map((metric) => (
                <div key={metric.label} className="bg-ink px-4 py-4">
                  <dt className="label text-faint-invert">{metric.label.toUpperCase()}</dt>
                  <dd className="mt-2.5 text-[1.5rem] font-medium tabular-nums tracking-[-0.03em]">
                    {metric.value}
                  </dd>
                  <p className="mono-xs mt-1 text-faint-invert">{metric.note}</p>
                </div>
              ))}
            </dl>

            <div className="mt-5 overflow-x-auto rounded-tile border border-line-invert">
              <table className="w-full min-w-[420px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-invert bg-ink">
                    {view.table.columns.map((column) => (
                      <th key={column} scope="col" className="label px-4 py-3 text-faint-invert">
                        {column.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {view.table.rows.map((row) => (
                    <tr key={row.join()} className="border-b border-line-invert last:border-b-0">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cell + cellIndex}
                          className={`px-4 py-3 text-[0.9rem] ${
                            cellIndex === 0 ? "font-medium text-paper" : "text-muted-invert"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-tile border border-line-invert bg-ink px-4 py-4">
              <p className="label text-sage">SYSTEM TRAIL</p>
              <ul className="mt-3 space-y-2">
                {view.trail.map((entry) => (
                  <li key={entry} className="mono-xs flex gap-2.5 text-muted-invert">
                    <span aria-hidden className="text-sage">
                      ›
                    </span>
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
