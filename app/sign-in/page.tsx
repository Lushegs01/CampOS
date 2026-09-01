import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/primitives/Prose";
import { ContactButton } from "@/components/cta/ContactButton";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "CampOS access is issued by your institution. How students, lecturers and administrators sign in to CampOS.",
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <PageShell
      eyebrow="Access"
      title="Sign-in is issued by your institution."
      intro="CampOS has no public sign-up. Every account belongs to a university, is created inside that institution, and is reached through the entry point the institution issues."
    >
      <div className="not-prose mb-10 flex items-center gap-4 rounded-lg border border-line bg-paper/60 p-4">
        <Image
          src="/logo.png"
          alt="CampOS"
          width={40}
          height={40}
          className="h-10 w-10 flex-none object-contain drop-shadow-sm"
        />
        <div className="text-sm">
          <p className="font-medium text-ink">Institutional Verification Layer</p>
          <p className="text-muted">
            CampOS authenticates through your university&apos;s verified domain.
          </p>
        </div>
      </div>

      <h2>If your university runs CampOS</h2>
      <p>
        Use the CampOS address your institution gave you — usually published by the registry
        or ICT directorate alongside your student or staff credentials. Your identity is the
        same across every CampOS module, so one sign-in covers registration, attendance,
        finance and records.
      </p>

      <h2>If you have lost your access</h2>
      <p>
        Accounts are administered by your institution, not by CampOS. Contact your ICT
        directorate or registry: they can reissue access, correct your record and adjust your
        role.
      </p>

      <h2>If your university does not run CampOS yet</h2>
      <p>
        We onboard institutions deliberately, with their own administrators, rather than
        through self-serve sign-up. If you would like your university evaluated for CampOS,
        start the conversation and we will take it from there.
      </p>
      <p className="mt-8">
        <ContactButton className="btn btn-primary">Talk to CampOS</ContactButton>
      </p>
    </PageShell>
  );
}
