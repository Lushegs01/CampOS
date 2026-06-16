import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Modules } from "@/components/Modules";
import { Trust } from "@/components/Trust";
import { QuestionsWall } from "@/components/QuestionsWall";
import { InstitutionsCTA } from "@/components/InstitutionsCTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <Modules />
        <Trust />
        <QuestionsWall />
        <InstitutionsCTA />
      </main>
      <Footer />
    </>
  );
}
