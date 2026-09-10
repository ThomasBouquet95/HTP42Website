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
    <section id="expertise" className="section bg-paper">
      <div className="shell">
        <SectionHeader
          index="02"
          eyebrow="Expertise"
          title={
            <>
              The expertise our clients ask for{" "}
              <span className="accent-italic text-brand">most often</span>.
            </>
          }
          lead="You tell us what you need. We listen, match the senior expert who has already done it, and stay accountable until the work lands."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 md:mt-16 xl:grid-cols-4">
          {expertiseAreas.map((area) => {
            const Diagram = diagrams[area.icon];
            return (
              <StaggerItem key={area.slug}>
                <Link
                  href={`/expertise#${area.slug}`}
                  className="group relative flex h-full flex-col bg-paper p-6 transition-colors duration-700 hover:bg-paper/60 md:p-7"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="eyebrow tnum text-ink-300">
                      {area.index}
                    </span>
                    <Diagram className="h-10 w-[3.375rem] shrink-0 md:h-11 md:w-[3.75rem]" />
                  </div>

                  <h3 className="mt-6 text-[1.1875rem] leading-tight tracking-[-0.026em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.3125rem]">
                    {area.name}
                  </h3>

                  <p className="mt-4 max-w-[30ch] text-[0.875rem] leading-relaxed text-ink-600">
                    {area.promise}
                  </p>

                  <ul className="rule mt-6 flex flex-col pt-4">
                    {area.services.map((service) => (
                      <li
                        key={service.slug}
                        className="border-b border-ink/[0.07] py-2.5 text-[0.8125rem] leading-snug tracking-[-0.005em] text-ink-400 transition-colors duration-500 last:border-0 group-hover:text-ink-600"
                      >
                        {service.name}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink transition-colors duration-500 group-hover:text-brand">
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
