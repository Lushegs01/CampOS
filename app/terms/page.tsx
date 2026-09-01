import type { Metadata } from "next";
import { PageShell } from "@/components/primitives/Prose";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of service for the CampOS platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal · Last updated June 2026"
      title="Terms of service"
      intro="These general terms cover use of the CampOS platform and its modules. Where an institution has a signed deployment agreement, that agreement governs."
    >
      <h2>1. Acceptance</h2>
      <p>
        By accessing CampOS or any of its modules — ScanMark, UniReg, NADA or Clearr — you
        agree to these terms and to the applicable laws and institutional policies that govern
        your account.
      </p>

      <h2>2. Accounts and identity</h2>
      <p>
        CampOS accounts are issued by institutions, not by individuals. You are responsible for
        keeping your credentials confidential and for activity carried out under your account.
        Impersonating another person, forging attendance or misrepresenting academic or
        financial status is a breach of these terms and of your institution&apos;s own rules.
      </p>

      <h2>3. Acceptable use</h2>
      <p>
        Do not attempt to access data belonging to another person or another institution,
        interfere with the operation of the platform, or probe its security without written
        authorisation. Responsible disclosure of a suspected vulnerability is welcome and will
        not be treated as a breach.
      </p>

      <h2>4. Institutional agreements</h2>
      <p>
        For universities, the deployment contract — including service levels, data processing
        terms and support commitments — supersedes these general terms wherever the two
        differ.
      </p>

      <h2>5. Availability and changes</h2>
      <p>
        We may update the platform and these terms as the product develops. Material changes
        affecting a deployed institution are communicated to that institution rather than
        applied silently.
      </p>

      <h2>6. Liability</h2>
      <p>
        CampOS is provided to institutions under the terms of their agreement with us. Nothing
        here excludes liability that cannot lawfully be excluded.
      </p>
    </PageShell>
  );
}
