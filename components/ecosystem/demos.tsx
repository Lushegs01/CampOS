"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductWindow, Row } from "./ProductWindow";

/**
 * Live product demonstrations.
 *
 * Each one is a small state machine over a fixed script — deterministic, so
 * the server and client agree, and so nothing here can be mistaken for real
 * institutional data. Every timer is cleared on unmount, and each demo shows
 * the operation it performs against Core, because that is the actual point.
 */

/** Chain of timed steps that cancels itself when the component goes away. */
function useSteps() {
  const timers = useRef<number[]>([]);
  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    },
    []
  );
  const run = useCallback((steps: [number, () => void][]) => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = steps.map(([delay, action]) => window.setTimeout(action, delay));
  }, []);
  return run;
}

function CoreTrace({ children, tone = "write" }: { children: string; tone?: "write" | "read" }) {
  return (
    <p className="mono-xs mt-3 flex items-center gap-2 text-faint">
      <span
        className={`inline-block h-1.5 w-1.5 flex-none rounded-full ${
          tone === "write" ? "bg-forest" : "bg-sage"
        }`}
        aria-hidden
      />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* ScanMark — presence, verified                                       */
/* ------------------------------------------------------------------ */

type CheckIn = { id: number; matric: string; state: "verified" | "rejected"; note: string };

const CHECK_IN_SCRIPT: Omit<CheckIn, "id">[] = [
  { matric: "CSC/21/0418", state: "verified", note: "Enrolment matched" },
  { matric: "CSC/21/0092", state: "verified", note: "Enrolment matched" },
  { matric: "CSC/20/0771", state: "rejected", note: "Not enrolled in CSC 401" },
  { matric: "CSC/21/0233", state: "verified", note: "Enrolment matched" },
  { matric: "CSC/21/0506", state: "verified", note: "Enrolment matched" },
  { matric: "CSC/19/0148", state: "rejected", note: "Session already closed" },
];

const CLASS_SIZE = 324;

export function ScanMarkDemo() {
  const [step, setStep] = useState(0);
  const [present, setPresent] = useState(312);
  const [log, setLog] = useState<CheckIn[]>([]);

  const last = log[0];
  const rate = ((present / CLASS_SIZE) * 100).toFixed(1);

  function checkIn() {
    const entry = CHECK_IN_SCRIPT[step % CHECK_IN_SCRIPT.length];
    setStep((value) => value + 1);
    setLog((current) => [{ id: step, ...entry }, ...current].slice(0, 3));
    if (entry.state === "verified") {
      setPresent((value) => Math.min(value + 1, CLASS_SIZE));
    }
  }

  return (
    <ProductWindow module="ScanMark" state="Session live">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[1.05rem] font-medium tracking-[-0.015em]">CSC 401</p>
          <p className="mono-xs mt-1 text-faint">Distributed Systems · Lecture theatre 2</p>
        </div>
        <div className="text-right">
          <p className="whitespace-nowrap text-[1.4rem] font-medium leading-none tabular-nums tracking-[-0.03em]">
            {present}
            <span className="text-faint"> / {CLASS_SIZE}</span>
          </p>
          <p className="label mt-2 text-forest">{rate}% PRESENT</p>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {["Live", "Verified against enrolment", "Session-bound"].map((chip) => (
          <li key={chip} className="label flex items-center gap-2 text-faint">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-forest" />
            {chip.toUpperCase()}
          </li>
        ))}
      </ul>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-paper-3">
        <div
          className="h-full rounded-full bg-forest transition-[width] duration-500 ease-system"
          style={{ width: `${(present / CLASS_SIZE) * 100}%` }}
        />
      </div>

      <div className="mt-4 min-h-[7.5rem]" aria-live="polite">
        {log.length === 0 ? (
          <p className="body py-6 text-center text-[0.9rem] text-faint">
            Waiting for the first check-in of the session.
          </p>
        ) : (
          log.map((entry) => (
            <Row
              key={entry.id}
              left={entry.matric}
              right={entry.note}
              tone={entry.state === "verified" ? "positive" : "pending"}
            />
          ))
        )}
      </div>

      <button type="button" onClick={checkIn} className="btn btn-primary mt-4 w-full">
        Simulate a check-in
      </button>

      <CoreTrace tone={last?.state === "rejected" ? "read" : "write"}>
        {last?.state === "rejected"
          ? "core.enrolment.read → no matching record → attendance not written"
          : "core.enrolment.read → verified → core.attendance.write"}
      </CoreTrace>
    </ProductWindow>
  );
}

/** The real ScanMark student app, beside the live session. */
export function ScanMarkApp() {
  return (
    <figure className="mx-auto w-full max-w-[212px]">
      <div className="overflow-hidden rounded-[22px] border border-line bg-paper-2 p-2">
        <Image
          src="/scanmark-app.webp"
          alt="The ScanMark student app showing a course list and check-in screen"
          width={480}
          height={1024}
          sizes="212px"
          className="w-full rounded-[14px] object-cover"
        />
      </div>
      <figcaption className="mono-xs mt-3 text-center text-faint">
        ScanMark student app · product screenshot
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* UniReg — registration written once                                  */
/* ------------------------------------------------------------------ */

const COURSES = [
  { code: "CSC 401", title: "Distributed Systems", units: 4, required: true },
  { code: "CSC 402", title: "Compiler Construction", units: 4, required: true },
  { code: "MAT 304", title: "Numerical Analysis", units: 3, required: false },
  { code: "GST 302", title: "Entrepreneurship", units: 2, required: false },
  { code: "CSC 429", title: "Machine Learning", units: 3, required: false },
];

const REG_STEPS = [
  "Checking identity and level",
  "Validating unit load and prerequisites",
  "Writing enrolment to CampOS Core",
];

export function UniRegDemo() {
  const [selected, setSelected] = useState<string[]>(["CSC 401", "CSC 402", "MAT 304", "GST 302"]);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [stepIndex, setStepIndex] = useState(-1);
  const run = useSteps();

  const units = COURSES.filter((course) => selected.includes(course.code)).reduce(
    (total, course) => total + course.units,
    0
  );

  function toggle(code: string, required: boolean) {
    if (required || phase !== "idle") return;
    setSelected((current) =>
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code]
    );
  }

  function submit() {
    if (phase === "running") return;
    if (phase === "done") {
      setPhase("idle");
      setStepIndex(-1);
      return;
    }
    setPhase("running");
    run([
      [80, () => setStepIndex(0)],
      [700, () => setStepIndex(1)],
      [1350, () => setStepIndex(2)],
      [
        2050,
        () => {
          setPhase("done");
          setStepIndex(REG_STEPS.length);
        },
      ],
    ]);
  }

  return (
    <ProductWindow module="UniReg" state={phase === "done" ? "Registered" : "Registration open"}>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-[1.05rem] font-medium tracking-[-0.015em]">Computer Science</p>
          <p className="mono-xs mt-1 text-faint">400 level · 2025/26 · First semester</p>
        </div>
        <p className="label text-faint">
          <span className="text-ink">{units}</span> UNITS
        </p>
      </div>

      <ul className="mt-4">
        {COURSES.map((course) => {
          const on = selected.includes(course.code);
          return (
            <li key={course.code}>
              <button
                type="button"
                onClick={() => toggle(course.code, course.required)}
                disabled={course.required || phase !== "idle"}
                aria-pressed={on}
                className="flex w-full items-center gap-3 border-b border-line py-2.5 text-left last:border-b-0 disabled:cursor-default"
              >
                <span
                  aria-hidden
                  className={`flex h-4 w-4 flex-none items-center justify-center rounded-[4px] border transition-colors duration-200 ease-system ${
                    on ? "border-forest bg-forest text-paper" : "border-line-strong bg-paper"
                  }`}
                >
                  {on ? (
                    <svg viewBox="0 0 10 10" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M1.6 5.2 3.8 7.4 8.4 2.6" />
                    </svg>
                  ) : null}
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.9rem] font-medium">
                  {course.code}
                  <span className="ml-2 font-normal text-faint">{course.title}</span>
                </span>
                <span className="mono-xs flex-none text-faint">{course.units}u</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 min-h-[4.5rem] rounded-tile border border-line bg-paper-2 px-3.5 py-3" aria-live="polite">
        {phase === "idle" ? (
          <p className="mono-xs text-faint">
            Select courses, then submit. Nothing is registered until Core accepts it.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {REG_STEPS.map((label, index) => {
              const state = stepIndex > index ? "done" : stepIndex === index ? "active" : "idle";
              return (
                <li key={label} className="mono-xs flex items-center gap-2">
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 flex-none rounded-full ${
                      state === "done"
                        ? "bg-forest"
                        : state === "active"
                          ? "bg-clay"
                          : "bg-line-strong"
                    }`}
                  />
                  <span className={state === "idle" ? "text-faint" : "text-muted"}>{label}</span>
                  {state === "done" ? <span className="text-forest">✓</span> : null}
                </li>
              );
            })}
            {phase === "done" ? (
              <li className="mono-xs pt-1 text-forest">
                Enrolment written · 1 record, read by every module
              </li>
            ) : null}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={phase === "running"}
        className="btn btn-primary mt-4 w-full disabled:opacity-70"
      >
        {phase === "idle"
          ? "Submit registration"
          : phase === "running"
            ? "Submitting…"
            : "Run it again"}
      </button>

      <CoreTrace>core.enrolment.write → visible to ScanMark, Clearr and records</CoreTrace>
    </ProductWindow>
  );
}

/* ------------------------------------------------------------------ */
/* Clearr — clearance resolved against live state                      */
/* ------------------------------------------------------------------ */

const CLEARANCE = [
  { name: "Tuition", detail: "Session fees" },
  { name: "Faculty", detail: "Faculty levy" },
  { name: "Department", detail: "Departmental levy" },
  { name: "Library", detail: "Outstanding item" },
  { name: "Hostel", detail: "Accommodation" },
];

type ItemState = "idle" | "checking" | "clear" | "blocked";

export function ClearrDemo() {
  const [states, setStates] = useState<ItemState[]>(() => CLEARANCE.map(() => "idle"));
  const [phase, setPhase] = useState<"idle" | "running" | "blocked" | "clear">("idle");
  const run = useSteps();

  const setAt = (index: number, value: ItemState) =>
    setStates((current) => current.map((item, i) => (i === index ? value : item)));

  function runClearance() {
    if (phase === "running") return;
    setStates(CLEARANCE.map(() => "idle"));
    setPhase("running");
    const steps: [number, () => void][] = [];
    CLEARANCE.forEach((item, index) => {
      const at = 200 + index * 420;
      steps.push([at, () => setAt(index, "checking")]);
      steps.push([
        at + 300,
        () => setAt(index, item.name === "Library" ? "blocked" : "clear"),
      ]);
    });
    steps.push([200 + CLEARANCE.length * 420 + 320, () => setPhase("blocked")]);
    run(steps);
  }

  function resolveHold() {
    const index = CLEARANCE.findIndex((item) => item.name === "Library");
    setAt(index, "checking");
    run([
      [
        420,
        () => {
          setAt(index, "clear");
          setPhase("clear");
        },
      ],
    ]);
  }

  return (
    <ProductWindow module="Clearr" state={phase === "clear" ? "Cleared" : "Clearance open"}>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-[1.05rem] font-medium tracking-[-0.015em]">Semester clearance</p>
          <p className="mono-xs mt-1 text-faint">2025/26 · First semester</p>
        </div>
        <span
          className={`label rounded-full px-2.5 py-1.5 ${
            phase === "clear"
              ? "bg-forest-tint text-forest"
              : phase === "blocked"
                ? "bg-clay-tint text-clay-deep"
                : "bg-paper-2 text-faint"
          }`}
        >
          {phase === "clear" ? "CLEAR" : phase === "blocked" ? "1 HOLD" : "NOT RUN"}
        </span>
      </div>

      <ul className="mt-4" aria-live="polite">
        {CLEARANCE.map((item, index) => {
          const state = states[index];
          return (
            <li
              key={item.name}
              className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-b-0"
            >
              <span className="min-w-0 truncate text-[0.9rem] font-medium">
                {item.name}
                <span className="ml-2 font-normal text-faint">{item.detail}</span>
              </span>
              <span
                className={`mono-xs flex-none ${
                  state === "clear"
                    ? "text-forest"
                    : state === "blocked"
                      ? "text-clay-deep"
                      : "text-faint"
                }`}
              >
                {state === "idle"
                  ? "—"
                  : state === "checking"
                    ? "checking…"
                    : state === "clear"
                      ? "Cleared"
                      : "Blocking"}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 min-h-[3.25rem]">
        {phase === "blocked" ? (
          <div className="rounded-tile border border-clay/40 bg-clay-tint px-3.5 py-3">
            <p className="mono-xs text-clay-deep">
              Library hold blocks clearance. Clearing it in the library system updates Core, and
              this decision re-resolves.
            </p>
          </div>
        ) : phase === "clear" ? (
          <div className="rounded-tile border border-forest/30 bg-forest-tint px-3.5 py-3">
            <p className="mono-xs text-forest">
              Clear for registration. The state is published to Core — so UniReg unblocks
              registration and the registry reads the same answer, without anyone re-checking.
            </p>
          </div>
        ) : (
          <p className="mono-xs text-faint">
            Clearance is not a stamp. It is a decision resolved against live records.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={phase === "blocked" ? resolveHold : runClearance}
        disabled={phase === "running"}
        className="btn btn-primary mt-4 w-full disabled:opacity-70"
      >
        {phase === "idle"
          ? "Run clearance"
          : phase === "running"
            ? "Resolving…"
            : phase === "blocked"
              ? "Resolve the library hold"
              : "Run it again"}
      </button>

      <CoreTrace tone="read">core.records.read + core.finance.read → clearance.write</CoreTrace>
    </ProductWindow>
  );
}

/* ------------------------------------------------------------------ */
/* NADA — verified membership, anonymous conversation                  */
/* ------------------------------------------------------------------ */

export function NadaDemo() {
  const [view, setView] = useState<"student" | "institution">("student");

  return (
    <ProductWindow module="NADA" state="Membership verified">
      <div
        role="group"
        aria-label="Point of view"
        className="flex rounded-tile border border-line bg-paper-2 p-1"
      >
        {[
          { id: "student", label: "What students see" },
          { id: "institution", label: "What the institution sees" },
        ].map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={view === option.id}
            onClick={() => setView(option.id as typeof view)}
            className={`min-h-[2.25rem] flex-1 rounded-[6px] px-2 text-[0.82rem] font-medium transition-colors duration-200 ease-system ${
              view === option.id ? "bg-paper text-ink shadow-[0_1px_0_rgba(10,13,12,0.06)]" : "text-muted"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-4 min-h-[11.5rem]">
        {view === "student" ? (
          <div className="space-y-3">
            <div className="rounded-tile border border-line bg-paper-2 px-3.5 py-3">
              <p className="label text-faint">VERIFIED STUDENT · ANONYMOUS</p>
              <p className="body mt-2 text-[0.92rem]">
                Is the 400 level timetable clash being fixed before registration closes?
              </p>
            </div>
            <div className="ml-6 rounded-tile border border-line bg-paper px-3.5 py-3">
              <p className="label text-faint">VERIFIED STUDENT · ANONYMOUS</p>
              <p className="body mt-2 text-[0.92rem]">
                Department posted a correction this morning — CSC 429 moved to Thursday.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-tile border border-line bg-paper-2 px-3.5 py-3">
              <p className="label text-faint">MEMBERSHIP CHECK</p>
              <p className="mono-xs mt-2 text-muted">
                core.membership.verify(institution) → true
              </p>
            </div>
            <ul className="rounded-tile border border-line bg-paper px-3.5 py-1">
              {[
                ["Institution", "Confirmed"],
                ["Enrolled this session", "Confirmed"],
                ["Identity of author", "Not requested"],
                ["Message content", "Not readable"],
              ].map(([term, value]) => (
                <li
                  key={term}
                  className="flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-b-0"
                >
                  <span className="text-[0.88rem] font-medium">{term}</span>
                  <span
                    className={`mono-xs ${
                      value === "Confirmed" ? "text-forest" : "text-faint"
                    }`}
                  >
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CoreTrace tone="read">
        core.membership.verify → yes · no identity published, no register to leak
      </CoreTrace>
    </ProductWindow>
  );
}
