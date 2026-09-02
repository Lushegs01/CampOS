import type { ModuleId } from "@/lib/system";

/**
 * The ground the hero sits on: a university seen from above, drawn as a plan.
 *
 * Not decoration — the plan is wired to the system map above it. Whichever
 * route is live lights the part of the campus that module actually touches:
 * ScanMark the teaching blocks, UniReg administration, Clearr the bursary,
 * NADA the residences, and Identity all of it, because identity is everywhere.
 *
 * Server-drawn inline SVG from a fixed seed: no image request, nothing to
 * decode, no layout shift, and identical output on server and client.
 */

export type Zone = "teaching" | "admin" | "finance" | "residence";

/** Which part of the campus each application reaches. */
export const ZONE_FOR_MODULE: Record<ModuleId, Zone> = {
  scanmark: "teaching",
  unireg: "admin",
  clearr: "finance",
  nada: "residence",
};

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

type Block = { x: number; y: number; w: number; h: number; zone: Zone };

function buildPlan() {
  const random = seeded(20260902);
  const blocks: Block[] = [];

  const bands: { y: number; h: number; count: number; zone: Zone }[] = [
    { y: 84, h: 128, count: 6, zone: "teaching" },
    { y: 258, h: 138, count: 5, zone: "admin" },
    { y: 452, h: 112, count: 6, zone: "finance" },
    { y: 630, h: 130, count: 5, zone: "residence" },
  ];

  bands.forEach((band, bandIndex) => {
    const gap = 1160 / band.count;
    for (let index = 0; index < band.count; index += 1) {
      const jitterX = random() * 26 - 13;
      const jitterY = random() * 22 - 11;
      const width = gap * (0.52 + random() * 0.3);
      const height = band.h * (0.62 + random() * 0.34);
      // The quadrangle: leave the middle of the second band open.
      if (bandIndex === 1 && index === 2) continue;
      blocks.push({
        x: 30 + index * gap + jitterX,
        y: band.y + jitterY,
        w: width,
        h: height,
        zone: band.zone,
      });
    }
  });

  const trees = Array.from({ length: 38 }, () => ({
    cx: 24 + random() * 1150,
    cy: 60 + random() * 720,
    r: 3.5 + random() * 4.5,
  }));

  return { blocks, trees };
}

const { blocks, trees } = buildPlan();

export function CampusPlan({ zone }: { zone: Zone | "all" }) {
  return (
    <svg
      viewBox="0 0 1200 820"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
    >
      <g className="plan-line" strokeWidth={1.2} fill="none">
        <path d="M0 402 H1200" />
        <path d="M0 426 H1200" />
        <path d="M232 0 V820" />
        <path d="M256 0 V820" />
        <path d="M726 0 V820" />
        <path d="M0 596 C 240 574, 420 636, 620 606 S 980 552, 1200 578" />
        <path d="M0 210 C 260 232, 460 174, 700 202 S 1010 240, 1200 214" />
      </g>

      {/* the quadrangle */}
      <g className="plan-line" strokeWidth={1.2} fill="none">
        <rect x={470} y={272} width={214} height={118} rx={4} strokeDasharray="6 7" />
        <circle cx={577} cy={331} r={28} strokeDasharray="4 6" />
      </g>

      <g>
        {blocks.map((block, index) => (
          <rect
            key={index}
            x={Math.round(block.x)}
            y={Math.round(block.y)}
            width={Math.round(block.w)}
            height={Math.round(block.h)}
            rx={3}
            className={`plan-block ${zone === "all" || zone === block.zone ? "plan-block-live" : ""}`}
          />
        ))}
      </g>

      {/* the field */}
      <g className="plan-line" strokeWidth={1.2} fill="none">
        <rect x={800} y={648} width={340} height={150} rx={74} />
        <circle cx={970} cy={723} r={32} />
        <path d="M970 648 V798" />
      </g>

      <g className="plan-tree">
        {trees.map((tree, index) => (
          <circle key={index} cx={Math.round(tree.cx)} cy={Math.round(tree.cy)} r={Math.round(tree.r)} />
        ))}
      </g>
    </svg>
  );
}
