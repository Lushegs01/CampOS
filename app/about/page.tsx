import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "About Us | CampOS",
  description: "The mission behind CampOS.",
};

export default function AboutPage() {
  return (
    <>
      <div className="relative z-10 bg-paper shadow-[0_20px_40px_rgba(0,0,0,0.1)] min-h-screen">
        <Navbar />
        <main className="pt-32 pb-24 px-[clamp(20px,5vw,56px)] max-w-[800px] mx-auto">
          <h1 className="display text-4xl mb-8">About CampOS</h1>
          <div className="text-[1.1rem] leading-relaxed text-ink-soft space-y-6">
            <p>
              CampOS was founded on a simple premise: a university should run on a single, unified operating system.
            </p>
            <p>
              For decades, higher education institutions have suffered from fragmented software. Students use one portal for housing, another to register for classes, and rely on physical cards or disjointed apps to prove their identity. This leads to fraud, administrative bloat, and a frustrating student experience.
            </p>
            <p>
              We built CampOS to solve this. By giving every student a single verified identity, we put attendance tracking (ScanMark), housing (FunaaBnB), and records (Nada) on one seamless platform. No new hardware, no fragmented ledgers.
            </p>
            <p>
              We are a team of engineers and educators working across Nigeria, Ghana, and the United Kingdom, building the definitive operating system for modern campuses.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
