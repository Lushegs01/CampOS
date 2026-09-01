/**
 * The hero diagram: every function a university runs, collected onto one bus,
 * and the ecosystem that hangs off it.
 *
 * Pure SVG — no canvas, no library, no per-frame JavaScript. Routes draw
 * themselves once when the hero reveals (`.draw`), and two short dashes travel
 * the trunk lines (`.signal`) so the system reads as live rather than static.
 * Both stop entirely under prefers-reduced-motion.
 */

const FUNCTIONS = [
  "Identity",
  "Academics",
  "Attendance",
  "Finance",
  "Records",
  "Services",
] as const;

const MODULES = [
  { name: "ScanMark", role: "Attendance" },
  { name: "UniReg", role: "Registration" },
  { name: "NADA", role: "Communication" },
  { name: "Clearr", role: "Finance" },
] as const;

const DESCRIPTION =
  "Diagram: identity, academics, attendance, finance, records and campus services all route into a single layer, CampOS Core, which carries identity, permissions, records and APIs. The ecosystem applications — ScanMark, UniReg, NADA and Clearr — build on that layer.";

function Bracket({ d, len = 700 }: { d: string; len?: number }) {
  return (
    <path
      d={d}
      fill="none"
      className="draw stroke-line-diagram"
      strokeWidth={1}
      style={{ "--len": len } as React.CSSProperties}
    />
  );
}

function Route({
  d,
  len,
  delay = 0,
  accent = false,
}: {
  d: string;
  len: number;
  delay?: number;
  accent?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={accent ? 1.5 : 1}
      className={`draw ${accent ? "stroke-forest" : "stroke-line-diagram"}`}
      style={{ "--len": len, "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    />
  );
}

function Signal({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      className="signal stroke-forest"
      style={{ "--signal-delay": `${delay}ms` } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}

export function SystemMapDesktop() {
  const boxW = 90;
  const gap = 14;
  const x = (i: number) => 8 + i * (boxW + gap); // 8 → 528, ends at 618
  const centre = (i: number) => x(i) + boxW / 2;

  return (
    <svg
      viewBox="0 0 620 392"
      role="img"
      aria-label={DESCRIPTION}
      className="mx-auto hidden h-auto w-full max-w-[660px] sm:block"
    >
      {/* the university */}
      <text x="310" y="12" textAnchor="middle" className="label fill-faint">
        THE UNIVERSITY
      </text>
      <Bracket d="M8 30 V22 H612 V30" len={640} />

      {FUNCTIONS.map((name, index) => (
        <g key={name} className="fade-node" style={{ "--reveal-delay": `${66 + index * 33}ms` } as React.CSSProperties}>
          <rect
            x={x(index)}
            y={42}
            width={boxW}
            height={30}
            rx={5}
            className="fill-paper-2 stroke-line-diagram"
            strokeWidth={1}
          />
          <text
            x={centre(index)}
            y={61}
            textAnchor="middle"
            className="fill-ink text-[11px] font-medium"
          >
            {name}
          </text>
        </g>
      ))}

      {/* collected onto one rail */}
      {FUNCTIONS.map((name, index) => (
        <Route
          key={`drop-${name}`}
          d={`M${centre(index)} 72 V132`}
          len={70}
          delay={231 + index * 24}
        />
      ))}
      <Route d={`M${centre(0)} 132 H${centre(5)}`} len={540} delay={352} />
      <Route d="M310 132 V150" len={30} delay={429} accent />
      <Signal d={`M${centre(1)} 72 V132 H310 V150`} />
      <Signal d={`M${centre(4)} 72 V132 H310 V150`} delay={1320} />

      {/* the core */}
      <g className="fade-node" style={{ "--reveal-delay": "451ms" } as React.CSSProperties}>
        <rect x="8" y="150" width="604" height="68" rx="7" className="fill-ink" />
        <text x="30" y="182" className="fill-paper text-[15px] font-medium tracking-[-0.01em]">
          CampOS Core
        </text>
        <text x="30" y="201" className="label fill-sage">
          IDENTITY · PERMISSIONS · RECORDS · APIS
        </text>
        <g className="fill-sage-soft">
          <circle cx="580" cy="176" r="2.5" />
          <circle cx="590" cy="176" r="2.5" opacity="0.55" />
          <circle cx="600" cy="176" r="2.5" opacity="0.3" />
        </g>
        <text x="604" y="200" textAnchor="end" className="label fill-faint-invert">
          ONE INSTITUTION
        </text>
      </g>

      {/* distributed to the ecosystem */}
      <Route d="M310 218 V248" len={40} delay={495} accent />
      <Route d="M78 248 H542" len={480} delay={528} />
      {MODULES.map((module, index) => {
        const cx = 8 + index * 152 + 70;
        return (
          <Route key={`feed-${module.name}`} d={`M${cx} 248 V286`} len={45} delay={561 + index * 36} />
        );
      })}
      <Signal d="M310 218 V248 H78 V286" delay={660} />

      {MODULES.map((module, index) => {
        const bx = 8 + index * 152;
        return (
          <g
            key={module.name}
            className="fade-node"
            style={{ "--reveal-delay": `${594 + index * 42}ms` } as React.CSSProperties}
          >
            <rect
              x={bx}
              y={286}
              width={140}
              height={46}
              rx={6}
              className="fill-paper stroke-line-diagram"
              strokeWidth={1}
            />
            <text x={bx + 14} y={308} className="fill-ink text-[12.5px] font-medium">
              {module.name}
            </text>
            <text x={bx + 14} y={323} className="label fill-faint">
              {module.role.toUpperCase()}
            </text>
          </g>
        );
      })}

      <Bracket d="M8 352 V360 H612 V352" len={640} />
      <text x="310" y="378" textAnchor="middle" className="label fill-faint">
        THE ECOSYSTEM
      </text>
    </svg>
  );
}

export function SystemMapMobile() {
  const colX = [6, 118, 230];
  const rows = [
    FUNCTIONS.slice(0, 3),
    FUNCTIONS.slice(3, 6),
  ];

  return (
    <svg
      viewBox="0 0 340 534"
      role="img"
      aria-label={DESCRIPTION}
      className="h-auto w-full sm:hidden"
    >
      <text x="170" y="11" textAnchor="middle" className="label fill-faint">
        THE UNIVERSITY
      </text>
      <Bracket d="M6 28 V20 H334 V28" len={360} />

      {rows.map((row, rowIndex) =>
        row.map((name, colIndex) => (
          <g
            key={name}
            className="fade-node"
            style={{ "--reveal-delay": `${55 + (rowIndex * 3 + colIndex) * 27}ms` } as React.CSSProperties}
          >
            <rect
              x={colX[colIndex]}
              y={40 + rowIndex * 38}
              width={104}
              height={30}
              rx={5}
              className="fill-paper-2 stroke-line-diagram"
              strokeWidth={1}
            />
            <text
              x={colX[colIndex] + 52}
              y={59 + rowIndex * 38}
              textAnchor="middle"
              className="fill-ink text-[11px] font-medium"
            >
              {name}
            </text>
          </g>
        ))
      )}

      {colX.map((cx, index) => (
        <Route key={`m-drop-${cx}`} d={`M${cx + 52} 108 V140`} len={40} delay={209 + index * 30} />
      ))}
      <Route d="M58 140 H282" len={230} delay={286} />
      <Route d="M170 140 V164" len={30} delay={341} accent />
      <Signal d="M110 108 V140 H170 V164" />

      <g className="fade-node" style={{ "--reveal-delay": "363ms" } as React.CSSProperties}>
        <rect x="6" y="164" width="328" height="74" rx="7" className="fill-ink" />
        <text x="20" y="196" className="fill-paper text-[15px] font-medium tracking-[-0.01em]">
          CampOS Core
        </text>
        <text x="20" y="215" className="label fill-sage">
          IDENTITY · PERMISSIONS · RECORDS
        </text>
        <g className="fill-sage-soft">
          <circle cx="300" cy="190" r="2.5" />
          <circle cx="310" cy="190" r="2.5" opacity="0.55" />
          <circle cx="320" cy="190" r="2.5" opacity="0.3" />
        </g>
      </g>

      {/* one spine carrying the ecosystem */}
      <Route d="M28 238 V466" len={240} delay={418} accent />
      {MODULES.map((module, index) => {
        const y = 268 + index * 52;
        return (
          <g
            key={module.name}
            className="fade-node"
            style={{ "--reveal-delay": `${451 + index * 42}ms` } as React.CSSProperties}
          >
            <path
              d={`M28 ${y + 20} H56`}
              fill="none"
              strokeWidth={1}
              className="draw stroke-line-diagram"
              style={{ "--len": 32, "--reveal-delay": `${462 + index * 42}ms` } as React.CSSProperties}
            />
            <rect
              x={56}
              y={y}
              width={278}
              height={40}
              rx={6}
              className="fill-paper stroke-line-diagram"
              strokeWidth={1}
            />
            <text x={70} y={y + 25} className="fill-ink text-[12.5px] font-medium">
              {module.name}
            </text>
            <text x={320} y={y + 24} textAnchor="end" className="label fill-faint">
              {module.role.toUpperCase()}
            </text>
          </g>
        );
      })}
      <Signal d="M28 238 V466" delay={495} />

      <Bracket d="M6 494 V502 H334 V494" len={360} />
      <text x="170" y="520" textAnchor="middle" className="label fill-faint">
        THE ECOSYSTEM
      </text>
    </svg>
  );
}
