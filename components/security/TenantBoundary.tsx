"use client";

import { useState } from "react";

/**
 * The isolation demonstration.
 *
 * A session scoped to Institution A tries to read a record, first inside its
 * own tenant and then across the boundary. The denial is the honest one: the
 * row-level policy does not raise an error, it returns nothing — the row does
 * not exist for that session.
 */

type Result = null | "allowed" | "denied";

const POLICY =
  "USING (institution_id = current_setting('app.institution')::uuid)";

export function TenantBoundary() {
  const [result, setResult] = useState<Result>(null);
  const [pending, setPending] = useState(false);

  function send(kind: Exclude<Result, null>) {
    if (pending) return;
    setResult(null);
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setResult(kind);
    }, 620);
  }

  return (
    <div className="ticks rounded-panel border border-line-invert bg-ink-2 p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch">
        <Tenant
          name="Institution A"
          note="Session scoped"
          state={result === "allowed" ? "hit" : "source"}
        />

        <div className="relative flex items-center justify-center py-2 sm:w-24 sm:py-0">
          <span
            aria-hidden
            className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-line-invert-strong sm:block"
          />
          <span aria-hidden className="h-px w-full bg-line-invert-strong sm:hidden" />
          <span
            className={`label relative z-10 rounded-full border px-2.5 py-1.5 transition-colors duration-300 ease-system ${
              result === "denied"
                ? "border-clay/60 bg-ink text-clay-light"
                : "border-line-invert bg-ink text-faint-invert"
            }`}
          >
            {result === "denied" ? "BLOCKED" : "BOUNDARY"}
          </span>

          {/* the request itself */}
          <span
            aria-hidden
            data-state={pending ? "moving" : result ? "settled" : "idle"}
            className="packet"
          />
        </div>

        <Tenant
          name="Institution B"
          note="Separate tenant"
          state={result === "denied" ? "shielded" : "idle"}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => send("allowed")}
          className="btn btn-secondary flex-1"
          disabled={pending}
        >
          Read a record in Institution A
        </button>
        <button
          type="button"
          onClick={() => send("denied")}
          className="btn btn-secondary flex-1"
          disabled={pending}
        >
          Read Institution B&apos;s records
        </button>
      </div>

      <dl
        aria-live="polite"
        className="mt-6 space-y-2 rounded-tile border border-line-invert bg-ink px-4 py-4"
      >
        <Line term="REQUEST">
          {result === "denied"
            ? "GET /students/:id  ·  tenant B"
            : "GET /students/:id  ·  tenant A"}
        </Line>
        <Line term="SESSION">app.institution = Institution A</Line>
        <Line term="POLICY">{POLICY}</Line>
        <Line
          term="RESULT"
          tone={result === "denied" ? "denied" : result === "allowed" ? "allowed" : "idle"}
        >
          {pending
            ? "resolving…"
            : result === "allowed"
              ? "200 · 1 row returned"
              : result === "denied"
                ? "0 rows. Not an error — the row does not exist for this session."
                : "Send a request to see how the boundary behaves."}
        </Line>
      </dl>
    </div>
  );
}

function Line({
  term,
  children,
  tone = "idle",
}: {
  term: string;
  children: React.ReactNode;
  tone?: "idle" | "allowed" | "denied";
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <dt className="label w-[4.5rem] flex-none text-faint-invert">{term}</dt>
      <dd
        className={`mono-xs min-w-0 [overflow-wrap:anywhere] ${
          tone === "denied"
            ? "text-clay-light"
            : tone === "allowed"
              ? "text-sage-soft"
              : "text-muted-invert"
        }`}
      >
        {children}
      </dd>
    </div>
  );
}

function Tenant({
  name,
  note,
  state,
}: {
  name: string;
  note: string;
  state: "idle" | "source" | "hit" | "shielded";
}) {
  return (
    <div
      className={`rounded-panel border px-4 py-4 transition-colors duration-300 ease-system ${
        state === "hit"
          ? "border-sage bg-ink-3"
          : state === "shielded"
            ? "border-clay/50 bg-ink-3"
            : "border-line-invert bg-ink-3"
      }`}
    >
      <div>
        <p className="text-[0.98rem] font-medium">{name}</p>
        <span className="label mt-1.5 block text-faint-invert">{note.toUpperCase()}</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {["Identity", "Records", "Finance"].map((row) => (
          <li
            key={row}
            className="mono-xs flex items-center justify-between gap-3 border-t border-line-invert pt-1.5 text-muted-invert"
          >
            {row}
            <span className={state === "hit" ? "text-sage-soft" : "text-faint-invert"}>
              {state === "hit" ? "readable" : state === "shielded" ? "isolated" : "scoped"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
