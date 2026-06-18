import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | CampOS",
  description: "Terms and conditions for using CampOS.",
};

export default function TermsPage() {
  return (
    <>
      <div className="relative z-10 bg-paper shadow-[0_20px_40px_rgba(0,0,0,0.1)] min-h-screen">
        <Navbar />
        <main className="pt-32 pb-24 px-[clamp(20px,5vw,56px)] max-w-[800px] mx-auto">
          <h1 className="display text-4xl mb-8">Terms of Service</h1>
          <div className="text-[1.1rem] leading-relaxed text-ink-soft space-y-6">
            <p>Last updated: June 2026</p>
            <h2 className="text-2xl font-bold text-ink mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the CampOS platform, including the ScanMark, FunaaBnB, and Nada modules, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
            <h2 className="text-2xl font-bold text-ink mt-8 mb-4">2. User Responsibilities</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their account credentials. You agree not to misuse the platform, forge identities, or engage in any fraudulent activity, particularly regarding attendance marking and housing leases.
            </p>
            <h2 className="text-2xl font-bold text-ink mt-8 mb-4">3. Institutional Agreements</h2>
            <p>
              For universities and institutions, specific service level agreements (SLAs) and data processing addendums (DPAs) supersede these general terms where explicitly stated in your deployment contract.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
