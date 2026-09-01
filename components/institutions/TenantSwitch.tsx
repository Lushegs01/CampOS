"use client";

import { useState } from "react";

/**
 * Section 06 — many institutions, one platform.
 *
 * Selecting a tenant shows its own structure and its own module set, while the
 * other two visibly recede: same platform, separate configuration, separate
 * data. Names and figures are placeholders — the section says so.
 */

const TENANTS = [
  {
    id: "a",
    name: "Institution A",
    note: "Federal university",
    rows: [
      ["Faculties · departments", "9 · 34"],
      ["Academic session", "2025/26 · first semester"],
      ["Roles defined", "12, scoped per department"],
    ],
    modules: ["ScanMark", "UniReg", "Clearr", "NADA"],
  },
  {
    id: "b",
    name: "Institution B",
    note: "Private university",
    rows: [
      ["Faculties · departments", "5 · 21"],
      ["Academic session", "2025/26 · second semester"],
      ["Roles defined", "8, scoped per faculty"],
    ],
    modules: ["UniReg", "Clearr"],
  },
  {
    id: "c",
    name: "Institution C",
    note: "State polytechnic",
    rows: [
      ["Faculties · departments", "12 · 47"],
      ["Academic session", "2026 · rolling"],
      ["Roles defined", "15, scoped per campus"],
    ],
    modules: ["ScanMark", "UniReg", "NADA"],
  },
];

const ALL_MODULES = ["ScanMark", "UniReg", "Clearr", "NADA"];

export function TenantSwitch() {
  const [active, setActive] = useState(0);
  const tenant = TENANTS[active];

  return (
    <div className="ticks border border-line bg-paper-2 px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-3xl rounded-panel bg-ink px-6 py-5 text-paper">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[1.05rem] font-medium tracking-[-0.015em]">CampOS Core</p>
          <p className="label text-sage">ONE PLATFORM · MANY TENANTS</p>
        </div>
      </div>

      {/* branch connectors */}
      <div aria-hidden className="relative mx-auto hidden h-12 max-w-3xl sm:block">
        <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-line-strong" />
        <span className="absolute left-[16.666%] right-[16.666%] top-5 h-px bg-line-strong" />
        {[16.666, 50, 83.333].map((position, index) => (
          <span
            key={position}
            className={`absolute top-5 h-7 w-px -translate-x-1/2 transition-colors duration-300 ease-system ${
              index === active ? "bg-forest" : "bg-line-strong"
            }`}
            style={{ left: `${position}%` }}
          />
        ))}
      </div>
      <div aria-hidden className="mx-auto h-8 w-px bg-line-strong sm:hidden" />

      <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
        {TENANTS.map((item, index) => {
          const on = index === active;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setActive(index)}
                className={`w-full rounded-panel border px-4 py-4 text-left transition-colors duration-300 ease-system ${
                  on
                    ? "border-forest bg-paper"
                    : "border-line bg-paper/60 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[0.98rem] font-medium tracking-[-0.015em]">{item.name}</p>
                  <span className={`label ${on ? "text-forest" : "text-faint"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mono-xs mt-2 text-faint">{item.note}</p>
                <p
                  className={`label mt-4 flex items-center gap-2 border-t pt-3 ${
                    on ? "border-forest/30 text-forest" : "border-line text-faint"
                  }`}
                >
                  <svg
                    viewBox="0 0 14 14"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    aria-hidden
                    className="flex-none"
                  >
                    <rect x="2.5" y="6" width="9" height="6" rx="1.2" />
                    <path d="M4.75 6V4.25a2.25 2.25 0 0 1 4.5 0V6" />
                  </svg>
                  {on ? "SELECTED" : "ISOLATED"}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      {/* the selected tenant's own configuration */}
      <div
        aria-live="polite"
        className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-panel border border-line bg-paper"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-5 py-4">
          <h3 className="text-[1rem] font-medium tracking-[-0.02em]">
            {tenant.name} · configuration
          </h3>
          <p className="label text-faint">VISIBLE ONLY TO THIS TENANT</p>
        </div>

        <dl className="px-5 py-1">
          {tenant.rows.map(([term, value]) => (
            <div
              key={term}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-3 last:border-b-0"
            >
              <dt className="label text-faint">{term.toUpperCase()}</dt>
              <dd className="text-[0.9rem] font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-line bg-paper-2 px-5 py-4">
          <p className="label text-faint">ACTIVE MODULES</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {ALL_MODULES.map((module) => {
              const on = tenant.modules.includes(module);
              return (
                <li
                  key={module}
                  className={`mono-xs rounded-full border px-3 py-1.5 transition-colors duration-300 ease-system ${
                    on
                      ? "border-forest/30 bg-forest-tint text-forest"
                      : "border-line text-faint line-through decoration-line-strong"
                  }`}
                >
                  {module}
                </li>
              );
            })}
          </ul>
          <p className="mono-xs mt-3 text-faint">
            Each institution activates its own modules. None of them can read another&apos;s data.
          </p>
        </div>
      </div>

      <p className="mono-xs mt-8 text-center text-faint">
        Institution names and figures are placeholders — CampOS does not display a university as
        a customer until that partnership is announced by the institution.
      </p>
    </div>
  );
}
