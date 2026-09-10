import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms governing use of the HealthTech Partners 42 website, and the basis on which engagements are contracted.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Scope of these terms",
    paragraphs: [
      "These terms govern your use of htp42.com. Consulting engagements are governed by their own written agreement: a signed statement of work, a master services agreement and, where personal or clinical data is involved, a data processing agreement. Nothing on this website forms part of those contracts or amends them.",
    ],
  },
  {
    heading: "Content on this website",
    paragraphs: [
      "The material on this site is provided for general information. It describes capabilities and past work; it is not advice, and it should not be relied on for a regulatory, clinical, technical or investment decision without engaging us or another qualified adviser.",
      "Case studies describe engagements we have delivered. Client names are withheld under confidentiality obligations. Figures are drawn from engagement records; sector descriptions are generalised deliberately so that clients remain unidentifiable.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The content, structure, design and code of this website are owned by HealthTech Partners 42 or licensed to us. You may read, quote briefly with attribution, and link to it. You may not republish substantial extracts, reproduce the design, or use our name or marks to imply endorsement or partnership.",
      "Names, standards and product marks referenced on this site, among them CDISC, DDF, USDM, OpenStudyBuilder, COSA and the names of former employers of our experts, remain the property of their respective owners and are used descriptively.",
    ],
  },
  {
    heading: "Engagements and named teams",
    paragraphs: [
      "Where we describe naming experts before signature and not substituting them afterwards, that commitment takes effect through the engagement contract, subject to the usual carve outs for illness, incapacity and force majeure. In those cases we propose a replacement of equivalent seniority for the client's approval, or reduce scope.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the extent permitted by law, we exclude liability for any loss arising from use of this website or reliance on its content. Liability arising from an engagement is governed exclusively by the relevant engagement contract. Nothing here excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    heading: "External links",
    paragraphs: [
      "This site links to external sites, including those of our partners and our experts' professional profiles. We do not control that content and accept no responsibility for it.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by Swiss law, and the courts of Basel have exclusive jurisdiction over any dispute arising from use of this website. Jurisdiction for engagement disputes is set out in the relevant engagement contract.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about these terms, or requests to reuse material from this site, go to ops@htp42.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      crumb="/terms"
      titleLines={["Terms &", "conditions"]}
      intro="The basis on which you use this website, and how it relates to the contracts that govern our engagements."
      updated="2026-09-01"
      sections={SECTIONS}
    />
  );
}
