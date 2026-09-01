"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SYSTEM_FLOWS } from "@/lib/system";

/**
 * The signature object of the site: the CampOS Core system map.
 *
 * Four university functions run down into one layer and back out to four
 * applications. Selecting a module lights its route — domain, Core, module,
 * university — dims the rest, and names the operation Core performs for it.
 * Until someone takes over, the map cycles itself so the system reads as live.
 *
 * All of it is one piece of state over a static SVG: no canvas, no library, no
 * per-frame work. The idle cycle stops on the first interaction and never runs
 * under prefers-reduced-motion.
 */

const X = (index: number) => 16 + index * 156;
const CX = (index: number) => X(index) + 70;
const CYCLE_MS = 3800;

export function CoreSystem() {
  const [active, setActive] = useState(0);
  const engaged = useRef(false);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    // Only start cycling on the client, and only where motion is welcome.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCycling(true);
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % SYSTEM_FLOWS.length),
      CYCLE_MS
    );
    return () => window.clearInterval(id);
  }, [cycling]);

  const select = useCallback((index: number) => {
    engaged.current = true;
    setCycling(false);
    setActive(index);
  }, []);

  const flow = SYSTEM_FLOWS[active];

  return (
    <div
      className="core-system"
      onPointerLeave={() => {
        // Hovering explores; leaving does not resume the cycle once someone has
        // chosen — their selection stays put.
      }}
    >
      <SystemMapDesktop active={active} onSelect={select} />
      <SystemMapMobile active={active} onSelect={select} />

      <div className="mt-4 border-t border-line pt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="label text-faint">
            ACTIVE ROUTE ·{" "}
            <span className="text-forest">{flow.module.toUpperCase()}</span>
          </p>
          <p className="mono-xs text-faint">
            {cycling ? "Cycling — select a module" : "Select a module"}
          </p>
        </div>
        <p aria-live="polite" className="body mt-3 min-h-[3.25rem] text-[0.95rem] text-muted">
          {flow.caption}
        </p>
      </div>
    </div>
  );
}

type MapProps = { active: number; onSelect: (index: number) => void };

function SystemMapDesktop({ active, onSelect }: MapProps) {
  return (
    <svg
      viewBox="0 0 640 446"
      className="hidden h-auto w-full sm:block"
      role="group"
      aria-label="CampOS Core system map. Select an application to trace its route through Core."
    >
      <text x="320" y="14" textAnchor="middle" className="label fill-faint">
        UNIVERSITY FUNCTIONS
      </text>

      {/* routes, drawn under everything */}
      {SYSTEM_FLOWS.map((flow, index) => {
        const on = index === active;
        return (
          <g key={`route-${flow.id}`} className={on ? "route route-on" : "route"}>
            <path d={`M${CX(index)} 62 V146`} />
            <path d={`M${CX(index)} 240 V292`} />
            <path d={`M${CX(index)} 344 V392`} />
          </g>
        );
      })}
      <path
        key={`signal-${active}`}
        d={`M${CX(active)} 62 V146 M${CX(active)} 240 V292 M${CX(active)} 344 V392`}
        className="route-signal"
        aria-hidden
      />

      {/* university functions */}
      {SYSTEM_FLOWS.map((flow, index) => {
        const on = index === active;
        return (
          <g key={`domain-${flow.id}`} className={`node ${on ? "node-on" : ""}`}>
            <rect x={X(index)} y={30} width={140} height={32} rx={6} className="node-shell" />
            <text x={CX(index)} y={50} textAnchor="middle" className="node-title text-[12.5px]">
              {flow.domain}
            </text>
          </g>
        );
      })}

      {/* the core */}
      <g>
        <rect x={16} y={146} width={608} height={94} rx={10} className="fill-ink" />
        <image href="/logo-mark.webp" x={38} y={172} width={38} height={38} />
        <text x={88} y={188} className="fill-paper text-[16.5px] font-medium tracking-[-0.015em]">
          CampOS Core
        </text>
        <text x={88} y={209} className="node-meta fill-sage">
          IDENTITY · PERMISSIONS · RECORDS · AUDIT
        </text>

        {/* live readout of what Core is doing for the selected route */}
        <g className="core-op">
          <rect
            x={404}
            y={164}
            width={200}
            height={58}
            rx={7}
            className="fill-ink-3 stroke-line-invert-strong"
            strokeWidth={1}
          />
          <text x={418} y={181} className="node-meta fill-faint-invert">
            CORE OPERATION
          </text>
          <text x={418} y={198} className="fill-paper text-[11px]">
            <tspan className="fill-sage-soft">WRITE </tspan>
            {SYSTEM_FLOWS[active].writes}
          </text>
          <text x={418} y={213} className="fill-muted-invert text-[10.5px]">
            <tspan className="fill-faint-invert">READ </tspan>
            {SYSTEM_FLOWS[active].reads}
          </text>
        </g>
      </g>

      {/* applications */}
      {SYSTEM_FLOWS.map((flow, index) => {
        const on = index === active;
        return (
          <g
            key={flow.id}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${flow.module} — ${flow.role}`}
            className={`node node-tap ${on ? "node-on" : ""}`}
            onClick={() => onSelect(index)}
            onPointerEnter={() => onSelect(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(index);
              }
            }}
          >
            <rect
              x={X(index) - 5}
              y={287}
              width={150}
              height={62}
              rx={10}
              className="node-focus"
            />
            <rect x={X(index)} y={292} width={140} height={52} rx={8} className="node-shell" />
            <text x={X(index) + 14} y={315} className="node-title text-[13px] font-medium">
              {flow.module}
            </text>
            <text x={X(index) + 14} y={333} className="node-meta node-sub">
              {flow.role.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* the institution */}
      <g>
        <rect
          x={16}
          y={392}
          width={608}
          height={42}
          rx={8}
          className="fill-paper-2 stroke-line-diagram"
          strokeWidth={1}
        />
        <text x={320} y={418} textAnchor="middle" className="label fill-faint">
          ONE CONNECTED UNIVERSITY
        </text>
      </g>
    </svg>
  );
}

function SystemMapMobile({ active, onSelect }: MapProps) {
  const flow = SYSTEM_FLOWS[active];

  return (
    <div className="sm:hidden">
      <div className="grid grid-cols-2 gap-2">
        {SYSTEM_FLOWS.map((item, index) => {
          const on = index === active;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => onSelect(index)}
              className={`rounded-tile border px-3 py-3 text-left transition-colors duration-200 ease-system ${
                on
                  ? "border-forest bg-forest-tint text-forest"
                  : "border-line bg-paper text-ink"
              }`}
            >
              <span className="block text-[0.95rem] font-medium">{item.module}</span>
              <span className="label mt-1.5 block text-faint">{item.role.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col items-stretch">
        <Rung label={flow.domain} caption="University function" />
        <Connector />
        <div className="rounded-panel bg-ink px-4 py-4 text-paper">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-mark.webp"
              alt=""
              width={30}
              height={30}
              className="h-[30px] w-[30px] flex-none object-contain"
            />
            <div className="min-w-0">
              <p className="text-[0.98rem] font-medium">CampOS Core</p>
              <p className="label mt-1 truncate text-sage">
                WRITE {flow.writes.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        <Connector />
        <Rung label={flow.module} caption={flow.role} highlight />
        <Connector />
        <Rung label="One connected university" caption="" muted />
      </div>
    </div>
  );
}

function Connector() {
  return <span aria-hidden className="mx-auto h-5 w-px bg-line-strong" />;
}

function Rung({
  label,
  caption,
  highlight = false,
  muted = false,
}: {
  label: string;
  caption: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`rounded-tile border px-4 py-3 ${
        highlight ? "border-forest bg-forest-tint" : "border-line bg-paper"
      }`}
    >
      <p
        className={`text-[0.95rem] font-medium ${
          highlight ? "text-forest" : muted ? "text-faint" : "text-ink"
        }`}
      >
        {label}
      </p>
      {caption ? <p className="label mt-1 text-faint">{caption.toUpperCase()}</p> : null}
    </div>
  );
}
