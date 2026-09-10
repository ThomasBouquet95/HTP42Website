import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { diagrams } from "@/components/ui/PracticeDiagram";
import { practices } from "@/content/expertise";

/**
 * The four practices as large editorial cards. Each carries its own line
 * diagram and the first four services beneath, so the card answers "what do
 * you actually do" without a click.
 */
export function PracticesGrid() {
  return (
    <section id="expertise" className="section bg-paper-2">
      <div className="shell">
        <SectionHeader
          index="01"
          eyebrow="Expertise"
          title={
            <>
              Four practices. One{" "}
              <span className="accent-italic text-brand">
                continuous capability
              </span>{" "}
              from strategy to execution.
            </>
          }
          lead="Most firms hand you off between the people who write the strategy and the people who carry it out. We do not have that seam. The expert who recommends the approach is the expert who sees it through."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 md:grid-cols-2">
          {practices.map((practice) => {
            const Diagram = diagrams[practice.icon];
            return (
              <StaggerItem key={practice.slug}>
                <Link
                  href={`/expertise#${practice.slug}`}
                  className="group relative flex h-full flex-col bg-paper p-7 transition-colors duration-700 hover:bg-paper/60 md:p-9 lg:p-11"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="eyebrow tnum text-ink-300">
                      {practice.index}
                    </span>
                    <Diagram className="h-14 w-[4.75rem] shrink-0 md:h-[4.5rem] md:w-24" />
                  </div>

                  <h3 className="mt-8 text-2xl tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.75rem]">
                    {practice.name}
                  </h3>

                  <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-600">
                    {practice.promise}
                  </p>

                  <ul className="rule mt-8 flex flex-col pt-5">
                    {practice.services.map((service) => (
                      <li
                        key={service.slug}
                        className="border-b border-ink/[0.07] py-2.5 text-[0.8125rem] tracking-[-0.005em] text-ink-400 transition-colors duration-500 last:border-0 group-hover:text-ink-600"
                      >
                        {service.name}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink transition-colors duration-500 group-hover:text-brand">
                    <span className="link-wipe">Explore the practice</span>
                    <ArrowUpRight
                      className="arrow-step size-3.5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
