import { SiteNav } from "@/components/navigation/SiteNav";
import { Hero } from "@/components/hero/Hero";
import { Fragmentation } from "@/components/platform/Fragmentation";
import { CoreLayer } from "@/components/platform/CoreLayer";
import { Ecosystem } from "@/components/ecosystem/Ecosystem";
import { IdentityThread } from "@/components/identity/IdentityThread";
import { Security } from "@/components/security/Security";
import { MultiInstitution } from "@/components/institutions/MultiInstitution";
import { ForLeaders } from "@/components/institutions/ForLeaders";
import { StudentExperience } from "@/components/experience/StudentExperience";
import { HowItWorks } from "@/components/platform/HowItWorks";
import { Proof } from "@/components/institutions/Proof";
import { Demonstration } from "@/components/experience/Demonstration";
import { Architecture } from "@/components/architecture/Architecture";
import { Faq } from "@/components/faq/Faq";
import { FinalCta } from "@/components/cta/FinalCta";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { StructuredData } from "@/components/seo/StructuredData";

/**
 * The argument, in order: a fragmented estate, the foundation that replaces it,
 * what the foundation makes possible, why it can be trusted, and what to do next.
 */
export default function Page() {
  return (
    <>
      <StructuredData />
      <SiteNav />
      <main id="main">
        <Hero />
        <Fragmentation />
        <CoreLayer />
        <Ecosystem />
        <IdentityThread />
        <Security />
        <MultiInstitution />
        <ForLeaders />
        <StudentExperience />
        <HowItWorks />
        <Proof />
        <Demonstration />
        <Architecture />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
