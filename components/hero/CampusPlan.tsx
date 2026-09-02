/**
 * The ground the hero sits on: a university seen from above, drawn as a plan.
 *
 * Not a photograph — an original architectural drawing in the same hairline
 * language as the rest of the site, so the live system map floats over the
 * institution it runs. Server-rendered inline SVG: no image request, no layout
 * shift, nothing for the browser to decode, and it scales to any width.
 *
 * The layout is generated from a fixed seed, so the server and the client draw
 * exactly the same campus.
 */

/** Small deterministic PRNG — same sequence everywhere, every time. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

type Block = { x: number; y: number; w: number; h: number; core: boolean };

function buildPlan() {
  const random = seeded(20260902);
  const blocks: Block[] = [];

  // Four bands of buildings around a central quadrangle and a main avenue.
  const bands = [
    { y: 96, h: 118, count: 6 },
    { y: 262, h: 132, count: 5 },
    { y: 452, h: 104, count: 6 },
    { y: 626, h: 122, count: 4 },
  ];

  bands.forEach((band, bandIndex) => {
    const gap = 1160 / band.count;
    for (let index = 0; index < band.count; index += 1) {
      const jitterX = random() * 26 - 13;
      const jitterY = random() * 22 - 11;
      const width = gap * (0.5 + random() * 0.3);
      const height = band.h * (0.62 + random() * 0.34);
      // The quadrangle: leave the middle of the second band open.
      if (bandIndex === 1 && index === 2) continue;
      blocks.push({
        x: 30 + index * gap + jitterX,
        y: band.y + jitterY,
        w: width,
        h: height,
        // A few buildings read as already connected.
        core: random() > 0.78,
      });
    }
  });

  const trees = Array.from({ length: 34 }, () => ({
    cx: 24 + random() * 1150,
    cy: 60 + random() * 720,
    r: 3 + random() * 4,
  }));

  return { blocks, trees };
}

const { blocks, trees } = buildPlan();

export function CampusPlan() {
  return (
    <svg
      viewBox="0 0 1200 820"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
    >
      {/* walkways and the main avenue */}
      <g className="plan-line" strokeWidth={1} fill="none">
        <path d="M0 402 H1200" />
        <path d="M0 424 H1200" />
        <path d="M232 0 V820" />
        <path d="M254 0 V820" />
        <path d="M726 0 V820" />
        <path d="M0 596 C 240 574, 420 636, 620 606 S 980 552, 1200 578" />
        <path d="M0 214 C 260 236, 460 178, 700 206 S 1010 244, 1200 218" />
      </g>

      {/* the quadrangle */}
      <g className="plan-line" fill="none">
        <rect x={470} y={274} width={214} height={116} rx={4} strokeDasharray="5 6" />
        <circle cx={577} cy={332} r={26} strokeDasharray="4 5" />
      </g>

      {/* buildings */}
      <g>
        {blocks.map((block, index) => (
          <rect
            key={index}
            x={Math.round(block.x)}
            y={Math.round(block.y)}
            width={Math.round(block.w)}
            height={Math.round(block.h)}
            rx={3}
            className={block.core ? "plan-block plan-block-core" : "plan-block"}
          />
        ))}
      </g>

      {/* the field */}
      <g className="plan-line" fill="none">
        <rect x={806} y={640} width={330} height={148} rx={72} />
        <circle cx={971} cy={714} r={30} />
        <path d="M971 640 V788" />
      </g>

      {/* planting */}
      <g className="plan-tree">
        {trees.map((tree, index) => (
          <circle key={index} cx={Math.round(tree.cx)} cy={Math.round(tree.cy)} r={Math.round(tree.r)} />
        ))}
      </g>
    </svg>
  );
}
