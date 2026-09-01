import Image from "next/image";
import { ProductWindow, Row } from "./ProductWindow";

/**
 * Interface illustrations and real product screenshots.
 */

export function ScanMarkVisual() {
  return (
    <ProductWindow module="ScanMark" state="Live app">
      <div className="relative h-[205px] w-full overflow-hidden rounded-lg border border-line bg-paper-2">
        <Image
          src="/scanmark-app.png"
          alt="ScanMark live student portal interface"
          width={480}
          height={1024}
          className="w-full object-cover object-top"
          priority
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-paper to-transparent"
        />
      </div>
      <p className="mono-xs mt-3 text-faint">
        Presence is checked against the enrolment UniReg wrote to Core.
      </p>
    </ProductWindow>
  );
}

export function UniRegVisual() {
  return (
    <ProductWindow module="UniReg" state="Registration open">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-[1.05rem] font-medium tracking-[-0.015em]">Computer Science</p>
          <p className="mono-xs mt-1 text-faint">400 level · 2025/26 · First semester</p>
        </div>
        <p className="label text-faint">18 UNITS</p>
      </div>

      <div className="mt-4">
        <Row left="CSC 401" meta="Distributed Systems" right="Registered" tone="positive" />
        <Row left="CSC 415" meta="Database Design" right="Registered" tone="positive" />
        <Row left="MTH 407" meta="Numerical Analysis" right="Registered" tone="positive" />
        <Row left="CSC 429" meta="Machine Learning" right="Approval required" tone="pending" />
      </div>

      <p className="mono-xs mt-3 text-faint">
        Written once to Core. Attendance, finance and records read it from there.
      </p>
    </ProductWindow>
  );
}

export function NadaVisual() {
  return (
    <ProductWindow module="NADA" state="Membership verified">
      <div className="space-y-3">
        <div className="rounded-tile border border-line bg-paper-2 px-3.5 py-3">
          <p className="label text-faint">VERIFIED STUDENT · ANONYMOUS</p>
          <p className="body mt-2 text-[0.92rem]">
            Is the 400 level timetable clash going to be fixed before registration closes?
          </p>
        </div>
        <div className="ml-6 rounded-tile border border-line bg-paper px-3.5 py-3">
          <p className="label text-faint">VERIFIED STUDENT · ANONYMOUS</p>
          <p className="body mt-2 text-[0.92rem]">
            Department posted a correction this morning. CSC 429 moved to Thursday.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {["Institution-verified", "No identity published", "Campus-scoped"].map((tag) => (
          <span
            key={tag}
            className="label rounded-full border border-line px-2.5 py-1.5 text-faint"
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      <p className="mono-xs mt-3 text-faint">
        Membership proven by institutional identity. The conversation stays anonymous.
      </p>
    </ProductWindow>
  );
}

export function ClearrVisual() {
  return (
    <ProductWindow module="Clearr" state="Clearance resolved">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-[1.05rem] font-medium tracking-[-0.015em]">Semester clearance</p>
          <p className="mono-xs mt-1 text-faint">2025/26 · First semester</p>
        </div>
        <span className="label rounded-full bg-forest-tint px-2.5 py-1.5 text-forest">
          CLEARED
        </span>
      </div>

      <div className="mt-4">
        <Row left="Tuition" right="Paid" tone="positive" />
        <Row left="Faculty levy" right="Paid" tone="positive" />
        <Row left="Departmental levy" right="Paid" tone="positive" />
        <Row left="Library" meta="Outstanding item" right="Blocking" tone="pending" />
      </div>

      <p className="mono-xs mt-3 text-faint">
        Every state resolves against the same enrolment and academic record.
      </p>
    </ProductWindow>
  );
}

export const PRODUCT_VISUALS: Record<string, () => React.JSX.Element> = {
  scanmark: ScanMarkVisual,
  unireg: UniRegVisual,
  nada: NadaVisual,
  clearr: ClearrVisual,
};
