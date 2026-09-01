"use client";

import Image from "next/image";
import { useState } from "react";
import { CORE_CAPABILITIES_MAP, SYSTEM_FLOWS } from "@/lib/system";

/**
 * Section 02 — what Core actually holds, explored rather than listed.
 *
 * Choosing a capability traces it into Core and lights the applications that
 * depend on it. The same interaction language as the hero map, one level
 * deeper: there, routes; here, dependencies.
 */

const ROW_Y = (index: number) => 22 + index * 40;
const CHIP_Y = (index: number) => 54 + index * 62;

export function CoreArchitecture() {
  const [active, setActive] = useState(0);
  const capability = CORE_CAPABILITIES_MAP[active];
  const dependents = new Set(capability.usedBy);

  return (
    <div className="ticks rounded-panel border border-line-invert bg-ink-2 p-5 sm:p-7">
      {/* desktop: the architecture itself */}
      <svg
        viewBox="0 0 660 384"
        className="mx-auto hidden h-auto w-full max-w-[880px] md:block"
        role="group"
        aria-label="CampOS Core architecture. Select a capability to see which applications depend on it."
      >
        {CORE_CAPABILITIES_MAP.map((item, index) => (
          <path
            key={`link-${item.id}`}
            d={`M156 ${ROW_Y(index)} C 220 ${ROW_Y(index)}, 236 192, 302 192`}
            className={`arch-link ${index === active ? "arch-link-on" : ""}`}
          />
        ))}

        {SYSTEM_FLOWS.map((flow, index) => (
          <path
            key={`out-${flow.id}`}
            d={`M456 192 C 496 192, 500 ${CHIP_Y(index) + 20}, 524 ${CHIP_Y(index) + 20}`}
            className={`arch-link ${dependents.has(flow.id) ? "arch-link-on" : ""}`}
          />
        ))}

        {CORE_CAPABILITIES_MAP.map((item, index) => {
          const on = index === active;
          return (
            <g
              key={item.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={item.name}
              className={`arch-node ${on ? "arch-node-on" : ""}`}
              onClick={() => setActive(index)}
              onPointerEnter={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(index);
                }
              }}
            >
              <rect x={4} y={ROW_Y(index) - 14} width={148} height={28} rx={6} className="arch-hit" />
              <text x={140} y={ROW_Y(index) + 4} textAnchor="end" className="arch-label">
                {item.name}
              </text>
              <circle cx={152} cy={ROW_Y(index)} r={2.5} className="arch-pin" />
            </g>
          );
        })}

        {/* the core */}
        <g>
          <rect
            x={302}
            y={140}
            width={154}
            height={104}
            rx={9}
            className="fill-ink stroke-line-invert-strong"
            strokeWidth={1}
          />
          <image href="/logo-mark.webp" x={361} y={158} width={36} height={36} />
          <text x={379} y={214} textAnchor="middle" className="fill-paper text-[13.5px] font-medium">
            CampOS Core
          </text>
          <text x={379} y={231} textAnchor="middle" className="node-meta fill-sage">
            ONE DATA LAYER
          </text>
        </g>

        {SYSTEM_FLOWS.map((flow, index) => {
          const on = dependents.has(flow.id);
          return (
            <g key={flow.id} className={`arch-chip ${on ? "arch-chip-on" : ""}`}>
              <rect x={524} y={CHIP_Y(index)} width={132} height={40} rx={7} className="arch-chip-shell" />
              <text x={538} y={CHIP_Y(index) + 18} className="arch-chip-title text-[12px] font-medium">
                {flow.module}
              </text>
              <text x={538} y={CHIP_Y(index) + 32} className="node-meta arch-chip-sub">
                {on ? "DEPENDS ON THIS" : "—"}
              </text>
            </g>
          );
        })}
      </svg>

      {/* mobile: the same state, stacked */}
      <div className="md:hidden">
        <ul className="flex flex-wrap gap-2">
          {CORE_CAPABILITIES_MAP.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={`mono-xs rounded-full border px-3 py-2 transition-colors duration-200 ease-system ${
                  index === active
                    ? "border-sage bg-ink-3 text-paper"
                    : "border-line-invert text-muted-invert"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-3 rounded-panel bg-ink px-4 py-4">
          <Image
            src="/logo-mark.webp"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 flex-none object-contain"
          />
          <div>
            <p className="text-[0.98rem] font-medium text-paper">CampOS Core</p>
            <p className="label mt-1 text-sage">ONE DATA LAYER</p>
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-2">
          {SYSTEM_FLOWS.map((flow) => {
            const on = dependents.has(flow.id);
            return (
              <li
                key={flow.id}
                className={`rounded-tile border px-3 py-2.5 transition-colors duration-200 ease-system ${
                  on ? "border-sage bg-ink-3" : "border-line-invert opacity-50"
                }`}
              >
                <p className="text-[0.9rem] font-medium text-paper">{flow.module}</p>
                <p className="node-meta mt-1 text-sage">{on ? "DEPENDS ON THIS" : "—"}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div aria-live="polite" className="mt-6 border-t border-line-invert pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="subheading text-paper">{capability.name}</h3>
          <p className="label text-faint-invert">
            {capability.usedBy.length} OF {SYSTEM_FLOWS.length} APPLICATIONS
          </p>
        </div>
        <p className="body mt-3 max-w-prose text-muted-invert">{capability.detail}</p>
      </div>
    </div>
  );
}
