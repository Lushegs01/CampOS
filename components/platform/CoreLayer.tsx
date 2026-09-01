import Image from "next/image";
import { CORE_CAPABILITIES, CORE_INPUTS } from "@/lib/content";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionIndex } from "@/components/primitives/Section";

/**
 * Section 02 — CampOS Core. The diagram is the argument: every institutional
 * concern converges on one layer, and the ecosystem is served from it.
 */
function ConvergenceDiagram() {
  const rowY = (index: number) => 26 + index * 40; // 26 → 306

  return (
    <svg
      viewBox="0 0 620 334"
      role="img"
      aria-label="Diagram: identity, security, institutions, permissions, records, finance, analytics and notifications converge into CampOS Core, which serves the university ecosystem."
      className="mx-auto hidden h-auto w-full max-w-[860px] md:block"
    >
      {CORE_INPUTS.map((input, index) => (
        <g
          key={input}
          className="fade-node"
          style={{ "--reveal-delay": `${40 + index * 30}ms` } as React.CSSProperties}
        >
          <text
            x="150"
            y={rowY(index) + 4}
            textAnchor="end"
            className="fill-paper text-[12.5px] font-medium"
          >
            {input}
          </text>
          <circle cx="162" cy={rowY(index)} r="2.5" className="fill-sage" />
        </g>
      ))}

      {CORE_INPUTS.map((input, index) => (
        <path
          key={`route-${input}`}
          d={`M166 ${rowY(index)} C 240 ${rowY(index)}, 250 167, 322 167`}
          fill="none"
          strokeWidth={1}
          className="draw stroke-line-invert-strong"
          style={{ "--len": 220, "--reveal-delay": `${150 + index * 27}ms` } as React.CSSProperties}
        />
      ))}

      <path
        d="M166 26 C 240 26, 250 167, 322 167"
        fill="none"
        strokeWidth={1.6}
        strokeLinecap="round"
        className="signal stroke-sage-soft"
        aria-hidden
      />
      <path
        d="M166 226 C 240 226, 250 167, 322 167"
        fill="none"
        strokeWidth={1.6}
        strokeLinecap="round"
        className="signal stroke-sage-soft"
        style={{ "--signal-delay": "2600ms" } as React.CSSProperties}
        aria-hidden
      />

      <g className="fade-node" style={{ "--reveal-delay": "280ms" } as React.CSSProperties}>
        <rect
          x="322"
          y="126"
          width="150"
          height="82"
          rx="7"
          className="fill-ink-3 stroke-line-invert-strong"
          strokeWidth={1}
        />
        <image
          href="/logo.png"
          x="379"
          y="136"
          width="36"
          height="36"
          preserveAspectRatio="xMidYMid meet"
        />
        <text
          x="397"
          y="190"
          textAnchor="middle"
          className="fill-paper text-[13.5px] font-medium tracking-[-0.01em]"
        >
          CampOS Core
        </text>
      </g>

      <path
        d="M472 167 H586"
        fill="none"
        strokeWidth={1.5}
        className="draw stroke-sage"
        style={{ "--len": 120, "--reveal-delay": "350ms" } as React.CSSProperties}
      />
      <path
        d="m580 162 6 5-6 5"
        fill="none"
        strokeWidth={1.5}
        className="fade-node stroke-sage"
        style={{ "--reveal-delay": "450ms" } as React.CSSProperties}
      />
      <g className="fade-node" style={{ "--reveal-delay": "470ms" } as React.CSSProperties}>
        <text x="596" y="150" textAnchor="end" className="label fill-faint-invert">
          UNIVERSITY
        </text>
        <text x="596" y="196" textAnchor="end" className="label fill-faint-invert">
          ECOSYSTEM
        </text>
      </g>
    </svg>
  );
}

function ConvergenceStack() {
  return (
    <div className="md:hidden">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-line-invert bg-line-invert">
        {CORE_INPUTS.map((input) => (
          <li key={input} className="bg-ink-2 px-3 py-3.5 text-[0.92rem] font-medium">
            {input}
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center">
        <span aria-hidden className="h-8 w-px bg-line-invert-strong" />
        <div className="flex w-full flex-col items-center rounded-panel border border-line-invert-strong bg-ink-3 px-5 py-5 text-center">
          <Image
            src="/logo.png"
            alt="CampOS"
            width={38}
            height={38}
            className="h-[38px] w-[38px] object-contain drop-shadow-sm"
          />
          <p className="mt-2 text-[1.05rem] font-medium text-paper">CampOS Core</p>
        </div>
        <span aria-hidden className="h-8 w-px bg-line-invert-strong" />
        <p className="label text-faint-invert">UNIVERSITY ECOSYSTEM</p>
      </div>
    </div>
  );
}

export function CoreLayer() {
  return (
    <section id="platform" className="on-ink scroll-mt-16 bg-ink py-section text-paper">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index="02" eyebrow="The foundation" tone="ink" />
          <h2 className="heading mt-6 max-w-[20ch] text-balance">
            One university. One digital foundation.
          </h2>
          <p className="lede mt-5 max-w-prose text-muted-invert">
            CampOS Core is the layer underneath the ecosystem. It holds the institution&apos;s
            structure, the identity of everyone inside it, the permissions that govern them
            and the records they generate — then exposes all of it to applications through one
            set of contracts.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <div className="ticks border border-line-invert bg-ink-2 p-5 sm:p-8">
            <ConvergenceDiagram />
            <ConvergenceStack />
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-panel border border-line-invert bg-line-invert sm:grid-cols-2">
          {CORE_CAPABILITIES.map((capability, index) => (
            <Reveal as="li" key={capability.name} delay={index * 70} className="bg-ink px-6 py-7">
              <p className="label text-sage">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="subheading mt-4">{capability.name}</h3>
              <p className="body mt-3 text-muted-invert">{capability.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
