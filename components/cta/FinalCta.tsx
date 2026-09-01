import { Reveal } from "@/components/primitives/Reveal";
import { ArrowRight, ButtonLink } from "@/components/primitives/Button";
import { ContactButton } from "@/components/cta/ContactButton";
import { SYSTEM_FLOWS } from "@/lib/system";

/**
 * The close. The system map comes back one last time — four applications
 * converging on the foundation — so the last thing on the page is the argument
 * the first thing made.
 */
export function FinalCta() {
  const x = (index: number) => 20 + index * 150;
  const cx = (index: number) => x(index) + 65;

  return (
    <section className="on-ink relative overflow-hidden bg-ink py-section text-paper">
      <div
        aria-hidden
        className="grid-wash-invert pointer-events-none absolute inset-0 mask-fade-y opacity-80"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <Reveal>
            <h2 className="display max-w-[16ch] text-balance">
              Build the digital foundation your university deserves.
            </h2>
            <p className="lede mt-6 max-w-prose text-muted-invert">
              Bring identity, academics, attendance, finance, records and campus operations
              together on one institutional platform.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ContactButton className="btn btn-primary">
                Talk to CampOS
                <ArrowRight />
              </ContactButton>
              <ButtonLink href="/#platform" variant="secondary">
                Explore the platform
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <figure className="ticks rounded-panel border border-line-invert bg-ink-2 p-5 sm:p-6">
              <svg viewBox="0 0 620 250" className="h-auto w-full" role="img" aria-label="Four CampOS applications converging on CampOS Core, which serves one connected university.">
                {SYSTEM_FLOWS.map((flow, index) => (
                  <g key={flow.id}>
                    <rect
                      x={x(index)}
                      y={16}
                      width={130}
                      height={38}
                      rx={7}
                      className="fill-ink-3 stroke-line-invert"
                      strokeWidth={1}
                    />
                    <text
                      x={cx(index)}
                      y={40}
                      textAnchor="middle"
                      className="fill-paper text-[12.5px] font-medium"
                    >
                      {flow.module}
                    </text>
                    <path
                      d={`M${cx(index)} 54 C ${cx(index)} 92, 310 92, 310 118`}
                      fill="none"
                      strokeWidth={1}
                      className="draw stroke-line-invert-strong"
                      style={{ "--len": 160, "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                    />
                  </g>
                ))}

                <g className="fade-node" style={{ "--reveal-delay": "260ms" } as React.CSSProperties}>
                  <rect x={140} y={118} width={340} height={62} rx={9} className="fill-paper" />
                  <image href="/logo-mark.webp" x={166} y={131} width={36} height={36} />
                  <text x={214} y={146} className="fill-ink text-[15px] font-medium tracking-[-0.015em]">
                    CampOS Core
                  </text>
                  <text x={214} y={165} className="node-meta fill-faint">
                    ONE INSTITUTIONAL FOUNDATION
                  </text>
                </g>

                <path
                  d="M310 180 V212"
                  fill="none"
                  strokeWidth={1.5}
                  className="draw stroke-sage"
                  style={{ "--len": 40, "--reveal-delay": "320ms" } as React.CSSProperties}
                />
                <g className="fade-node" style={{ "--reveal-delay": "400ms" } as React.CSSProperties}>
                  <rect
                    x={20}
                    y={212}
                    width={580}
                    height={26}
                    rx={6}
                    className="fill-ink-3 stroke-line-invert"
                    strokeWidth={1}
                  />
                  <text x={310} y={229} textAnchor="middle" className="node-meta fill-sage">
                    ONE CONNECTED UNIVERSITY
                  </text>
                </g>
              </svg>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
