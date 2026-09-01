import type { Metadata } from "next";
import { PageShell } from "@/components/primitives/Prose";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why CampOS is building one digital foundation for universities, and what we are trying to fix.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="A university should run on one foundation."
      intro="CampOS exists because the hardest problems in university administration are not inside any single system — they are in the space between systems."
    >
      <h2>What we are fixing</h2>
      <p>
        Universities have no shortage of software. What they lack is a shared foundation
        underneath it: one verified identity per person, one model of the institution, one
        place where records are written. Without that, every new system adds another copy of
        the student and another reconciliation job for someone in an office.
      </p>

      <h2>How we build</h2>
      <p>
        CampOS Core came first, and the applications followed from it. ScanMark, UniReg, NADA
        and Clearr are useful on their own, but each is deliberately built on the same
        identity, structure and permissions — which is what makes them a platform rather than
        a portfolio. Haloft, our housing product, sits in the wider ecosystem and is outside
        the current core integration rollout.
      </p>

      <h2>What we will not do</h2>
      <p>
        We will not publish an institution as a partner before that partnership is agreed and
        announced by the institution. We will not put invented adoption numbers on a page
        aimed at people who are accountable for public money. And we will not describe a
        security control we cannot demonstrate to your ICT team.
      </p>

      <h2>Where we work</h2>
      <p>
        We are building for African tertiary institutions first — universities with real
        constraints on budget, connectivity and staffing, where the cost of fragmentation is
        highest and the benefit of a shared foundation is most immediate.
      </p>
    </PageShell>
  );
}
