import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Modules } from "@/components/Modules";
import { Sandbox } from "@/components/Sandbox";
import { Trust } from "@/components/Trust";
import { PartnerMap } from "@/components/PartnerMap";
import { QuestionsWall } from "@/components/QuestionsWall";
import { InstitutionsCTA } from "@/components/InstitutionsCTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <div className="relative z-10 bg-paper shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        <Navbar />
        <main>
          <Hero />
          <ProofStrip />
          <Modules />
          <Sandbox />
          <Trust />
          <PartnerMap />
          <QuestionsWall />
          <InstitutionsCTA />
        </main>
      </div>
      <Footer />
    </>
  );
}
