import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Tone = "paper" | "paper-2" | "ink";

const TONE: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  ink: "on-ink bg-ink text-paper",
};

/** The mono index label that opens every section: `01 —— THE PROBLEM`. */
export function SectionIndex({
  index,
  eyebrow,
  tone = "paper",
}: {
  index: string;
  eyebrow: string;
  tone?: Tone;
}) {
  const dim = tone === "ink" ? "text-faint-invert" : "text-faint";
  const rule = tone === "ink" ? "bg-line-invert-strong" : "bg-line-strong";
  const accent = tone === "ink" ? "text-sage-soft" : "text-forest";

  return (
    <p className={`label flex items-center gap-3 ${dim}`}>
      <span className={accent}>{index}</span>
      <span aria-hidden className={`h-px w-8 ${rule}`} />
      <span>{eyebrow}</span>
    </p>
  );
}

export function Section({
  id,
  index,
  eyebrow,
  heading,
  lede,
  tone = "paper",
  children,
  className = "",
  headingWidth = "max-w-[20ch]",
}: {
  id?: string;
  index: string;
  eyebrow: string;
  heading: ReactNode;
  lede?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
  className?: string;
  headingWidth?: string;
}) {
  return (
    <section id={id} className={`${TONE[tone]} py-section ${className}`}>
      <div className="shell">
        <Reveal className="max-w-3xl">
          <SectionIndex index={index} eyebrow={eyebrow} tone={tone} />
          <h2 className={`heading mt-6 text-balance ${headingWidth}`}>{heading}</h2>
          {lede ? (
            <p
              className={`lede mt-5 max-w-prose ${
                tone === "ink" ? "text-muted-invert" : "text-muted"
              }`}
            >
              {lede}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
