import { FAQ } from "@/lib/faq";
import { SITE } from "@/lib/site";

/**
 * Structured data describing what CampOS is and the questions this page
 * answers. Only facts already stated on the page — no ratings, no counts.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
        description: SITE.description,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        name: "CampOS",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "University infrastructure platform",
        operatingSystem: "Web",
        description: SITE.description,
        image: `${SITE.url}/logo.png`,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repository, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
