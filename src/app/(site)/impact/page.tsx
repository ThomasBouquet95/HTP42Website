import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { CaseFilter } from "@/components/sections/CaseFilter";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { caseStudies } from "@/content/cases";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: "Client Impact",
  description:
    "Seven engagements written up in full: operating model assessment, OpenStudyBuilder deployment, EU AI Act readiness, semantic harmonisation, GenAI benchmarking and enterprise readiness.",
};

const PATTERNS = [
  {
    index: "01",
    title: "The question is usually wrong",
    body: "Clients arrive with a technology question. In five of these seven engagements, the real question was about organisation, sequencing or evidence. Reframing it in week one is most of the value we add.",
  },
  {
    index: "02",
    title: "Evidence beats conviction",
    body: "Where our experts benchmarked, whether GenAI against incumbent tooling or cloud scenarios against an optimised current state, the result surprised the client at least once. That is what a benchmark is for.",
  },
  {
    index: "03",
title: "Advice without follow through decays",
body: "Three of these engagements carried straight on from recommendation into execution with the same experts. The others handed over deliverables designed to survive without us.",
  },
];

export default function ImpactPage() {
  const years = [...new Set(caseStudies.map((c) => c.year))].sort();

  return (
    <>
      <PageHero
        eyebrow={copy.impactPage.eyebrow}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Client Impact", href: "/impact" },
        ]}
        titleLines={copy.impactPage.heroLines}
        lead={copy.impactPage.heroLead}
        facts={[
          { label: "Case studies", value: String(caseStudies.length) },
          { label: "Years covered", value: years.join(" to ") },
          { label: "Shortest engagement", value: "6 weeks" },
          { label: "Largest team", value: "8 specialists" },
        ]}
      />

      <CaseFilter />

      {/* What the seven have in common */}
      <section className="section bg-ink-900 text-white">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow={copy.impactPage.patterns.eyebrow}
            onDark
            title={copy.impactPage.patterns.title}
            lead={copy.impactPage.patterns.lead}
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-16 md:grid-cols-3">
            {PATTERNS.map((pattern) => (
              <StaggerItem key={pattern.index}>
                <div className="rule-on-dark pt-6">
                  <span className="eyebrow tnum text-white/50">
                    {pattern.index}
                  </span>
                  <h3 className="mt-6 max-w-[20ch] text-xl tracking-[-0.028em] text-white">
                    {pattern.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/60">
                    {pattern.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        eyebrow={copy.impactPage.engagement.eyebrow}
        title={
          <>
            The eighth case study{" "}
            <span className="accent-italic text-azure">could be yours.</span>
          </>
        }
        body="If one of these looks like the problem in front of you, the fastest route is a thirty minute call with the partner who led it."
        secondary={{ label: "See our expertise", href: "/expertise" }}
      />
    </>
  );
}
