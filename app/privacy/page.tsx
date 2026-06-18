import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | CampOS",
  description: "How CampOS handles and protects your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="relative z-10 bg-paper shadow-[0_20px_40px_rgba(0,0,0,0.1)] min-h-screen">
        <Navbar />
        <main className="pt-32 pb-24 px-[clamp(20px,5vw,56px)] max-w-[800px] mx-auto">
          <h1 className="display text-4xl mb-8">Privacy Policy</h1>
          <div className="text-[1.1rem] leading-relaxed text-ink-soft space-y-6">
            <p>Last updated: June 2026</p>
            <h2 className="text-2xl font-bold text-ink mt-8 mb-4">1. Information We Collect</h2>
            <p>
              CampOS collects information necessary to provide our unified campus services. This includes basic account profiles, device information for authentication, and usage data across the ScanMark, FunaaBnB, and Nada modules.
            </p>
            <h2 className="text-2xl font-bold text-ink mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use your data solely to operate, secure, and improve the CampOS platform. We do not sell your personal information to third parties. Data is used to verify identities, process housing leases, and record academic attendance accurately.
            </p>
            <h2 className="text-2xl font-bold text-ink mt-8 mb-4">3. Data Security</h2>
            <p>
              We implement industry-standard encryption and security measures to protect your academic records and personal data. Access to sensitive data is strictly controlled and audited on an institutional level.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
