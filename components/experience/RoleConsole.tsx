"use client";

import { useRef, useState } from "react";
import { ROLE_VIEWS } from "@/lib/roles";

/**
 * Section 11 — the platform tour.
 *
 * Two levels of real navigation: the seat you are sitting in, and the area of
 * the product you are looking at. Both change what the console shows, and the
 * trace under each panel names the Core operation that produced it — including
 * the scope that stops one role from reaching another's data.
 */
export function RoleConsole() {
  const [role, setRole] = useState(0);
  const [panel, setPanel] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const view = ROLE_VIEWS[role];
  const current = view.panels[Math.min(panel, view.panels.length - 1)];

  function chooseRole(index: number) {
    setRole(index);
    setPanel(0);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const last = ROLE_VIEWS.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = role === last ? 0 : role + 1;
    if (event.key === "ArrowLeft") next = role === 0 ? last : role - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    chooseRole(next);
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
        {ROLE_VIEWS.map((item, index) => {
          const selected = index === role;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              role="tab"
              id={`role-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`role-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => chooseRole(index)}
              className={`min-h-[2.5rem] rounded-tile px-4 text-[0.92rem] font-medium transition-colors duration-200 ease-system ${
                selected ? "bg-paper text-ink" : "text-muted-invert hover:bg-ink-3 hover:text-paper"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`role-panel-${view.id}`}
        aria-labelledby={`role-tab-${view.id}`}
        tabIndex={0}
        className="mt-6 overflow-hidden rounded-panel border border-line-invert bg-ink-2"
      >
        <div className="border-b border-line-invert px-5 py-5 sm:px-6">
          <h3 className="subheading max-w-[28ch] text-balance">{view.headline}</h3>
          <p className="body mt-2.5 max-w-prose text-[0.95rem] text-muted-invert">
            {view.summary}
          </p>
          <p className="label mt-4 inline-flex items-center gap-2 rounded-full border border-line-invert px-3 py-1.5 text-sage">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sage" />
            {view.scope.toUpperCase()}
          </p>
        </div>

        <div className="grid md:grid-cols-[184px_minmax(0,1fr)]">
          {/* the module's own navigation — real, and scoped to the role */}
          <div className="min-w-0 border-b border-line-invert p-3 md:border-b-0 md:border-r">
            <p className="label px-2 py-2 text-faint-invert">{view.label.toUpperCase()}</p>
            <ul className="flex gap-1 overflow-x-auto md:block md:overflow-visible">
              {view.panels.map((item, index) => {
                const on = index === Math.min(panel, view.panels.length - 1);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-current={on ? "page" : undefined}
                      onClick={() => setPanel(index)}
                      className={`w-full whitespace-nowrap rounded-tile px-2.5 py-2 text-left text-[0.88rem] transition-colors duration-200 ease-system ${
                        on
                          ? "bg-ink-3 text-paper"
                          : "text-muted-invert hover:bg-ink-3/60 hover:text-paper"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div key={`${view.id}-${current.id}`} className="panel-fade min-w-0 p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h4 className="text-[1.1rem] font-medium tracking-[-0.02em]">{current.title}</h4>
              <p className="label text-faint-invert">{view.label.toUpperCase()} VIEW</p>
            </div>
            <p className="body mt-2 max-w-prose text-[0.94rem] text-muted-invert">
              {current.note}
            </p>

            <dl className="mt-5 overflow-hidden rounded-tile border border-line-invert">
              {current.rows.map((row, index) => (
                <div
                  key={row.label + index}
                  className="flex items-baseline justify-between gap-4 border-b border-line-invert bg-ink px-4 py-3 last:border-b-0"
                >
                  <dt className="min-w-0 truncate text-[0.9rem] font-medium text-paper">
                    {row.label}
                  </dt>
                  <dd
                    className={`mono-xs flex-none text-right ${
                      row.tone === "positive"
                        ? "text-sage-soft"
                        : row.tone === "pending"
                          ? "text-clay-light"
                          : "text-muted-invert"
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mono-xs mt-4 flex items-center gap-2 text-faint-invert">
              <span aria-hidden className="h-1.5 w-1.5 flex-none rounded-full bg-sage" />
              {current.trace}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
