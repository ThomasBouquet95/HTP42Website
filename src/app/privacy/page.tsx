import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HealthTechPartners 42 handles personal data collected through this website and during client engagements.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "HealthTechPartners 42 (HTP42) is a consulting and expert network business headquartered in Basel, Switzerland. This policy explains how we handle personal data collected through htp42.com and in the course of client and expert relationships.",
      "For any question about this policy or to exercise your rights over your data, write to ops@htp42.com.",
    ],
  },
  {
    heading: "What this website collects",
    paragraphs: [
      "This website does not run advertising trackers, does not sell data, and does not set marketing cookies. The enquiry form on our contact page composes a message in your own email client and submits nothing to our servers — the resulting email reaches us the same way any other email does.",
      "Our hosting provider processes standard server request data (IP address, user agent, requested URL, timestamp) for security and operational purposes. This data is not used to build profiles.",
    ],
  },
  {
    heading: "Data you send us",
    paragraphs: [
      "When you contact us by email, telephone or LinkedIn, we process the contact details and content you provide in order to respond and, where relevant, to scope and deliver an engagement. The legal basis is our legitimate interest in responding to a business enquiry, or the performance of a contract where one follows.",
      "We retain business correspondence for as long as the relationship is active and thereafter for the period required by Swiss commercial and tax law.",
    ],
  },
  {
    heading: "Client and engagement data",
    paragraphs: [
      "In engagements we frequently handle confidential client information and, in clinical contexts, may be granted access to systems containing sensitive data. Access is governed by the engagement contract and any applicable data processing agreement, and is limited to the named experts on the engagement.",
      "We do not use client data to train models, and we do not reuse client material in other engagements or in published material without written consent. Case studies on this website are published without client names.",
    ],
  },
  {
    heading: "Experts in our network",
    paragraphs: [
      "For experts in the HTP42 network we process professional profile information, engagement history and the commercial details necessary to contract and pay for work. Public profiles on this website are published with the level of identification each expert has agreed to — which is why many appear as first name and initial.",
    ],
  },
  {
    heading: "Sharing and transfers",
    paragraphs: [
      "We share personal data only with the service providers necessary to operate the business (hosting, email, accounting) and with experts assigned to an engagement. Where data is transferred outside Switzerland or the EEA, we rely on adequacy decisions or standard contractual clauses.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Subject to Swiss and, where applicable, EU data protection law, you may request access to the personal data we hold about you, its correction or deletion, restriction of processing, or portability, and you may object to processing based on legitimate interest. Send any such request to ops@htp42.com and we will respond within thirty days.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We will update this page when our practices change and revise the date shown above. Material changes affecting existing clients or network experts are communicated directly.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      crumb="/privacy"
      titleLines={["Privacy policy"]}
      intro="What we collect, why, and what you can ask us to do about it. No trackers, no data sales, no marketing cookies."
      updated="2026-09-01"
      sections={SECTIONS}
    />
  );
}
