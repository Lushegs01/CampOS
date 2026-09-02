import { SiteNav } from "@/components/navigation/SiteNav";
import { Hero } from "@/components/hero/Hero";
import { Fragmentation } from "@/components/core/Fragmentation";
import { CoreLayer } from "@/components/core/CoreLayer";
import { Ecosystem } from "@/components/ecosystem/Ecosystem";
import { IdentityJourney } from "@/components/identity/IdentityJourney";
import { ForLeaders } from "@/components/institutions/ForLeaders";
import { Demonstration } from "@/components/experience/Demonstration";
import { Faq } from "@/components/faq/Faq";
import { FinalCta } from "@/components/cta/FinalCta";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { StructuredData } from "@/components/seo/StructuredData";

/**
 * The argument, in order, with the ground alternating under it: a fragmented
 * estate, the foundation that replaces it, what the foundation makes possible,
 * why it can be trusted, and what to do next.
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
        <IdentityJourney />
        <ForLeaders />
        <Demonstration />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

