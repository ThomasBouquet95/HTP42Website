import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { diagrams } from "@/components/ui/AreaDiagram";
import { expertiseAreas } from "@/content/expertise";

/**
 * Illustrative expertise areas as large editorial cards. These are examples of
 * where our experts are asked in, not a practice structure: each carries its
 * own line diagram and a few representative service lines beneath.
 */
export function ExpertiseAreas() {
  return (
    <section id="expertise" className="section bg-paper-2">
      <div className="shell">
        <SectionHeader
          index="01"
          eyebrow="Expertise"
          title={
            <>
              A network at the{" "}
              <span className="accent-italic text-brand">
                intersection
              </span>{" "}
              of life sciences, data and AI.
            </>
          }
          lead="The areas below are illustrative, not exhaustive. They are simply where our experts are most often asked in. Tell us what you need and we match the expertise to it, wherever in the network it sits."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 md:grid-cols-2">
          {expertiseAreas.map((area) => {
            const Diagram = diagrams[area.icon];
            return (
              <StaggerItem key={area.slug}>
                <Link
                  href={`/expertise#${area.slug}`}
                  className="group relative flex h-full flex-col bg-paper p-7 transition-colors duration-700 hover:bg-paper/60 md:p-9 lg:p-11"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="eyebrow tnum text-ink-300">
                      {area.index}
                    </span>
                    <Diagram className="h-14 w-[4.75rem] shrink-0 md:h-[4.5rem] md:w-24" />
                  </div>

                  <h3 className="mt-8 text-2xl tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.75rem]">
                    {area.name}
                  </h3>

                  <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-600">
                    {area.promise}
                  </p>

                  <ul className="rule mt-8 flex flex-col pt-5">
                    {area.services.map((service) => (
                      <li
                        key={service.slug}
                        className="border-b border-ink/[0.07] py-2.5 text-[0.8125rem] tracking-[-0.005em] text-ink-400 transition-colors duration-500 last:border-0 group-hover:text-ink-600"
                      >
                        {service.name}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink transition-colors duration-500 group-hover:text-brand">
                    <span className="link-wipe">Explore this area</span>
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
