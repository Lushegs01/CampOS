import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Aurora } from "@/components/Aurora";

export const metadata = {
  title: "About Us | CampOS",
  description: "The mission behind CampOS.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-void">
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px]">
          <Aurora className="opacity-60" />
        </div>
        <div className="relative z-10 mx-auto max-w-[760px] px-[clamp(20px,5vw,56px)] pb-28 pt-36">
          <span className="eyebrow eyebrow-primary mb-6">Our mission</span>
          <h1 className="display mt-5 text-[clamp(2.4rem,5vw,3.6rem)]">
            The operating system for <span className="text-gradient">modern campuses.</span>
          </h1>
          <div className="mt-10 space-y-6 text-[1.08rem] leading-relaxed text-body">
            <p>
              CampOS was founded on a simple premise: a university should run on a single, unified operating system.
            </p>
            <p>
              For decades, higher education institutions have suffered from fragmented software. Students use one portal for housing, another to register for classes, and rely on physical cards or disjointed apps to prove their identity. This leads to fraud, administrative bloat, and a frustrating student experience.
            </p>
            <p>
              We built CampOS to solve this. By giving every student a single verified identity, we put attendance tracking (ScanMark), housing (FunaaBnB), social (Nada), and enrollment (Unireg) on one seamless, tamper-evident platform. No new hardware, no fragmented ledgers.
            </p>
            <p>
              We are a team of engineers and educators working across Nigeria, Ghana, and the United Kingdom, building the definitive operating system for modern campuses.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
