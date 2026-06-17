import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Modules } from "@/components/Modules";
import { HowItWorks } from "@/components/HowItWorks";
import { Trust } from "@/components/Trust";
import { QuestionsWall } from "@/components/QuestionsWall";
import { InstitutionsCTA } from "@/components/InstitutionsCTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <Modules />
        <HowItWorks />
        <Trust />
        <QuestionsWall />
        <InstitutionsCTA />
      </main>
      <Footer />
    </div>
  );
}
