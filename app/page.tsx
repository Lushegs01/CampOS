import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Modules } from "@/components/Modules";
import { Trust } from "@/components/Trust";
import { QuestionsWall } from "@/components/QuestionsWall";
import { InstitutionsCTA } from "@/components/InstitutionsCTA";
import { Footer } from "@/components/Footer";

function Divider() {
  return <div aria-hidden className="h-px w-full bg-line" />;
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Divider />
        <ProofStrip />
        <Divider />
        <Modules />
        <Divider />
        <Trust />
        <Divider />
        <QuestionsWall />
        <Divider />
        <InstitutionsCTA />
      </main>
      <Footer />
    </>
  );
}
