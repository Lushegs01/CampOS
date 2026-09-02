"use client";

import Image from "next/image";
import { useState } from "react";
import { IDENTITY_ROUTE, SYSTEM_FLOWS } from "@/lib/system";

/**
 * The CampOS Core system map.
 *
 * University functions run down through one institutional identity into Core,
 * and back out to the applications built on it. Selecting an application lights
 * its route and names the operation Core performs for it; selecting Identity
 * lights the whole system, because identity is the part every route shares.
 *
 * Nothing moves on its own — the map changes only when someone points at it.
 */

const X = (index: number) => 16 + index * 156;
const CX = (index: number) => X(index) + 70;

export const IDENTITY = -1;

export function CoreSystem() {
  const [active, setActive] = useState<number>(IDENTITY);

  const all = active === IDENTITY;
  const flow = all ? IDENTITY_ROUTE : SYSTEM_FLOWS[active];
  const lit = (index: number) => all || index === active;

  return (
    <div className="core-system">
      <SystemMapDesktop active={active} all={all} lit={lit} onSelect={setActive} />
      <SystemMapMobile active={active} all={all} lit={lit} onSelect={setActive} />

      <div className="mt-4 border-t border-line pt-4">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="label text-faint">
            ACTIVE ROUTE · <span className="text-forest">{flow.module.toUpperCase()}</span>
          </p>
          <p className="mono-xs inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1.5 text-faint">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-forest" />
            Tap any node to trace it
          </p>
        </div>
        <p aria-live="polite" className="body mt-3 text-[0.95rem] text-muted sm:min-h-[3.25rem]">
          {flow.caption}
        </p>
      </div>
    </div>
  );
}

type MapProps = {
  active: number;
  all: boolean;
  lit: (index: number) => boolean;
  onSelect: (next: number) => void;
};

function SystemMapDesktop({ active, all, lit, onSelect }: MapProps) {
  return (
    <svg
      viewBox="0 0 640 452"
      className="mx-auto hidden h-auto w-full max-w-[660px] sm:block"
      role="group"
      aria-label="CampOS Core system map. Select an application to trace its route through Core, or select Identity to light the whole system."
    >
      <text x="320" y="14" textAnchor="middle" className="label fill-faint">
        UNIVERSITY FUNCTIONS
      </text>

      {/* routes, under everything */}
      {SYSTEM_FLOWS.map((flow, index) => (
        <g key={`route-${flow.id}`} className={`route ${lit(index) ? "route-on" : ""}`}>
          <path d={`M${CX(index)} 62 V104`} />
          <path d={`M${CX(index)} 250 V302`} />
          <path d={`M${CX(index)} 354 V396`} />
        </g>
      ))}
      <g className="route route-on">
        <path d="M320 138 V156" />
      </g>

      {/* university functions */}
      {SYSTEM_FLOWS.map((flow, index) => (
        <g key={`domain-${flow.id}`} className={`node ${lit(index) ? "node-on" : ""}`}>
          <rect x={X(index)} y={30} width={140} height={32} rx={6} className="node-shell" />
          <text x={CX(index)} y={50} textAnchor="middle" className="node-title text-[12.5px]">
            {flow.domain}
          </text>
        </g>
      ))}

      {/* the identity layer — always live, selectable in its own right */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={all}
        aria-label="Identity — the layer every application passes through"
        className={`node node-tap ${all ? "node-on" : ""}`}
        onClick={() => onSelect(IDENTITY)}
        onPointerEnter={() => onSelect(IDENTITY)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(IDENTITY);
          }
        }}
      >
        <rect x={11} y={99} width={618} height={44} rx={11} className="node-focus" />
        <rect x={16} y={104} width={608} height={34} rx={7} className="node-shell" />
        <text x={32} y={125} className="node-title text-[12.5px] font-medium">
          Institutional identity
        </text>
        <text x={608} y={125} textAnchor="end" className="node-meta node-sub">
          ISSUED ONCE · READ EVERYWHERE
        </text>
      </g>

      {/* the core */}
      <g>
        <rect x={16} y={156} width={608} height={94} rx={10} className="fill-ink" />
        <image href="/logo-mark.webp" x={38} y={182} width={38} height={38} />
        <text x={88} y={198} className="fill-paper text-[16.5px] font-medium tracking-[-0.015em]">
          CampOS Core
        </text>
        <text x={88} y={219} className="node-meta fill-sage">
          IDENTITY · PERMISSIONS · RECORDS · AUDIT
        </text>

        <g className="core-op">
          <rect
            x={404}
            y={174}
            width={200}
            height={58}
            rx={7}
            className="fill-ink-3 stroke-line-invert-strong"
            strokeWidth={1}
          />
          <text x={418} y={191} className="node-meta fill-faint-invert">
            CORE OPERATION
          </text>
          <text x={418} y={208} className="fill-paper text-[11px]">
            <tspan className="fill-sage-soft">WRITE </tspan>
            {(all ? IDENTITY_ROUTE : SYSTEM_FLOWS[active]).writes}
          </text>
          <text x={418} y={223} className="fill-muted-invert text-[10.5px]">
            <tspan className="fill-faint-invert">READ </tspan>
            {(all ? IDENTITY_ROUTE : SYSTEM_FLOWS[active]).reads}
          </text>
        </g>
      </g>

      {/* applications */}
      {SYSTEM_FLOWS.map((flow, index) => (
        <g
          key={flow.id}
          role="button"
          tabIndex={0}
          aria-pressed={index === active}
          aria-label={`${flow.module} — ${flow.role}`}
          className={`node node-tap ${lit(index) ? "node-on" : ""}`}
          onClick={() => onSelect(index)}
          onPointerEnter={() => onSelect(index)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect(index);
            }
          }}
        >
          <rect x={X(index) - 5} y={297} width={150} height={62} rx={10} className="node-focus" />
          <rect x={X(index)} y={302} width={140} height={52} rx={8} className="node-shell" />
          <text x={X(index) + 14} y={325} className="node-title text-[13px] font-medium">
            {flow.module}
          </text>
          <text x={X(index) + 14} y={343} className="node-meta node-sub">
            {flow.role.toUpperCase()}
          </text>
        </g>
      ))}

      {/* the institution */}
      <g>
        <rect
          x={16}
          y={396}
          width={608}
          height={42}
          rx={8}
          className="fill-paper-2 stroke-line-diagram"
          strokeWidth={1}
        />
        <text x={320} y={422} textAnchor="middle" className="label fill-faint">
          ONE CONNECTED UNIVERSITY
        </text>
      </g>
    </svg>
  );
}

function SystemMapMobile({ active, all, onSelect }: MapProps) {
  const flow = all ? IDENTITY_ROUTE : SYSTEM_FLOWS[active];

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-pressed={all}
        onClick={() => onSelect(IDENTITY)}
        className={`flex w-full items-center justify-between gap-3 rounded-tile border px-3 py-3 text-left transition-colors duration-200 ease-system ${
          all ? "border-forest bg-forest-tint text-forest" : "border-line bg-paper text-ink"
        }`}
      >
        <span className="text-[0.95rem] font-medium">Institutional identity</span>
        <span className="label text-faint">ISSUED ONCE</span>
      </button>

      <div className="mt-2 grid grid-cols-2 gap-2">
        {SYSTEM_FLOWS.map((item, index) => {
          const on = index === active;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => onSelect(index)}
              className={`rounded-tile border px-3 py-3 text-left transition-colors duration-200 ease-system ${
                on ? "border-forest bg-forest-tint text-forest" : "border-line bg-paper text-ink"
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
        <Rung label="Institutional identity" caption="Issued once" highlight={all} />
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
              <p className="label mt-1 truncate text-sage">WRITE {flow.writes.toUpperCase()}</p>
            </div>
          </div>
        </div>
        <Connector />
        <Rung
          label={all ? "Every application" : flow.module}
          caption={all ? "ScanMark · UniReg · Clearr · NADA" : flow.role}
          highlight={!all}
        />
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
      className={`rounded-tile border px-4 py-3 transition-colors duration-200 ease-system ${
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
