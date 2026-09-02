import { ArrowRight } from "@/components/primitives/Button";
import { ContactButton } from "@/components/cta/ContactButton";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * The mid-page ask.
 *
 * Someone who has just worked the demos is as convinced as they will be; making
 * them scroll eight more screens to act is the conversion mistake. One line,
 * one dominant action, a hairline band rather than a section.
 */
export function InlineCta() {
  return (
    <section className="border-b border-line bg-ink text-paper">
      <div className="shell">
        <Reveal className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between md:py-9">
          <div className="max-w-[46ch]">
            <p className="text-[1.15rem] font-medium tracking-[-0.02em]">
              Seen enough of how it works?
            </p>
            <p className="body mt-1.5 text-[0.94rem] text-muted-invert">
              The next step is an architecture walkthrough with your ICT team — not a sales call.
            </p>
          </div>
          <div className="on-ink flex-none">
            <ContactButton className="btn btn-primary">
              Talk to CampOS
              <ArrowRight />
            </ContactButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
