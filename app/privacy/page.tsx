import type { Metadata } from "next";
import { PageShell } from "@/components/primitives/Prose";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How CampOS handles institutional and personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal · Last updated June 2026"
      title="Privacy"
      intro="CampOS processes data on behalf of the institutions that deploy it. This page describes that relationship in plain terms; a deployed institution's data processing agreement governs the detail."
    >
      <h2>1. What we collect</h2>
      <p>
        CampOS collects the information needed to operate the platform for an institution:
        account and identity records issued by that institution, the academic, attendance and
        finance records generated inside the modules, and technical data such as session and
        device information used to authenticate and secure access.
      </p>

      <h2>2. How it is used</h2>
      <p>
        Data is used to operate, secure and support the platform for the institution that owns
        it — verifying identity, resolving enrolment, recording attendance and processing
        clearance. We do not sell personal information, and we do not use institutional data
        to advertise.
      </p>

      <h2>3. Who controls the data</h2>
      <p>
        The institution is the controller of its own records. CampOS processes those records
        under the institution&apos;s instruction. Each institution&apos;s data is isolated
        from every other institution on the platform, enforced in the database rather than in
        application code.
      </p>

      <h2>4. Security</h2>
      <p>
        Access is governed by per-institution roles and scoped permissions, sessions are
        server-tracked and revocable, secrets are stored encrypted, and privileged actions are
        recorded in an audit trail. No system is beyond risk; we document our controls so an
        institution can assess them for itself.
      </p>

      <h2>5. Retention and requests</h2>
      <p>
        Records are retained for as long as the institution requires them under its own
        policies and applicable law. Requests about a student or staff record should be made
        to the institution that issued the identity, which can act on it directly.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about this policy from an institution or a prospective institution can be
        raised through the &ldquo;Talk to CampOS&rdquo; form on this site.
      </p>
    </PageShell>
  );
}
