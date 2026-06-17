import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | CampOS",
  description: "Terms and conditions for using CampOS.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-void">
      <Navbar />
      <main className="relative z-10 mx-auto max-w-[760px] px-[clamp(20px,5vw,56px)] pb-28 pt-36">
        <span className="eyebrow eyebrow-primary mb-6">Legal</span>
        <h1 className="display mt-5 text-[clamp(2.2rem,4.5vw,3.2rem)]">Terms of Service</h1>
        <p className="mt-4 font-mono text-[0.8rem] text-faint">Last updated: June 2026</p>
        <div className="mt-10 space-y-8 text-[1.04rem] leading-relaxed text-body">
          <section>
            <h2 className="mb-3 text-[1.4rem] font-semibold text-hi">1. Acceptance of Terms</h2>
            <p className="text-mute">
              By accessing or using the CampOS platform, including the ScanMark, FunaaBnB, Nada, and Unireg modules, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[1.4rem] font-semibold text-hi">2. User Responsibilities</h2>
            <p className="text-mute">
              Users are responsible for maintaining the confidentiality of their account credentials. You agree not to misuse the platform, forge identities, or engage in any fraudulent activity, particularly regarding attendance marking and housing leases.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[1.4rem] font-semibold text-hi">3. Institutional Agreements</h2>
            <p className="text-mute">
              For universities and institutions, specific service level agreements (SLAs) and data processing addendums (DPAs) supersede these general terms where explicitly stated in your deployment contract.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
