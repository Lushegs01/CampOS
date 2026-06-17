import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | CampOS",
  description: "How CampOS handles and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-void">
      <Navbar />
      <main className="relative z-10 mx-auto max-w-[760px] px-[clamp(20px,5vw,56px)] pb-28 pt-36">
        <span className="eyebrow eyebrow-primary mb-6">Legal</span>
        <h1 className="display mt-5 text-[clamp(2.2rem,4.5vw,3.2rem)]">Privacy Policy</h1>
        <p className="mt-4 font-mono text-[0.8rem] text-faint">Last updated: June 2026</p>
        <div className="mt-10 space-y-8 text-[1.04rem] leading-relaxed text-body">
          <section>
            <h2 className="mb-3 text-[1.4rem] font-semibold text-hi">1. Information We Collect</h2>
            <p className="text-mute">
              CampOS collects information necessary to provide our unified campus services. This includes basic account profiles, device information for authentication, and usage data across the ScanMark, FunaaBnB, Nada, and Unireg modules.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[1.4rem] font-semibold text-hi">2. How We Use Your Information</h2>
            <p className="text-mute">
              We use your data solely to operate, secure, and improve the CampOS platform. We do not sell your personal information to third parties. Data is used to verify identities, process housing leases, and record academic attendance accurately.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-[1.4rem] font-semibold text-hi">3. Data Security</h2>
            <p className="text-mute">
              We implement industry-standard encryption and security measures to protect your academic records and personal data. Access to sensitive data is strictly controlled and audited on an institutional level.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
