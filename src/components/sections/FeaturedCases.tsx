import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { CaseRow } from "@/components/ui/CaseRow";
import { featuredCases } from "@/content/cases";

export function FeaturedCases() {
  return (
    <section className="section bg-paper-2">
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow="Client impact"
          title={
            <>
              Seven engagements.{" "}
              <span className="accent-italic text-brand">
                Problem, intervention,
              </span>{" "}
              consequence.
            </>
          }
          lead="Client names stay confidential. The work does not have to be. Each of these is written the way we would present it internally, including what was hard and what we would do differently."
        />

        <div className="mt-14 md:mt-16">
          {featuredCases.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.06} y={14}>
              <CaseRow
                study={study}
                index={i + 1}
                isLast={i === featuredCases.length - 1}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-11">
            <ArrowLink href="/impact">All seven case studies</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
