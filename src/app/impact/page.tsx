import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { CaseFilter } from "@/components/sections/CaseFilter";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { caseStudies } from "@/content/cases";

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
        eyebrow="Client impact"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Client Impact", href: "/impact" },
        ]}
        titleLines={[
          "The work, written",
          "up the way we'd",
          <>
            <span className="accent-italic text-azure">present it</span>{" "}
            internally.
          </>,
        ]}
        lead="Client names stay confidential. Sector, scale, duration and team composition do not. Each study sets out the problem as the client framed it, what our experts actually did, and what changed as a result."
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
            eyebrow="Patterns"
            onDark
            title={
              <>
                Three things{" "}
                <span className="accent-italic text-azure">
                  we keep relearning
                </span>
                .
              </>
            }
            lead="Read across seven engagements and the same lessons surface. We would rather say them out loud than let a case study imply we get it right first time."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-16 md:grid-cols-3">
            {PATTERNS.map((pattern) => (
              <StaggerItem key={pattern.index}>
                <div className="rule-on-dark pt-6">
                  <span className="eyebrow tnum text-white/50">
                    {pattern.index}
                  </span>
                  <h3 className="mt-6 max-w-[20ch] text-xl tracking-[-0.028em] text-white md:text-[1.375rem]">
                    {pattern.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">
                    {pattern.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        eyebrow="Your engagement"
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
