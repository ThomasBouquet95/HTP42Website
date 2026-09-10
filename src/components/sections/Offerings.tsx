import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { offeringDiagrams } from "@/components/ui/AreaDiagram";
import { offerings } from "@/content/offerings";

/**
 * The two ways clients work with HTP42. This is the commercial model, so it
 * earns full width cards rather than a compact list: the distinction between
 * staffing one expert and assembling a delivery team is the thing prospects
 * most need to understand before they call.
 */
export function Offerings() {
  return (
    <section id="offerings" className="section scroll-mt-24 bg-paper-2">
      <div className="shell">
        <SectionHeader
          index="01"
          eyebrow="How we work with you"
          title={
            <>
              Two ways in.{" "}
              <span className="accent-italic text-brand">One network</span>{" "}
              behind both.
            </>
          }
          lead="Some clients need one expert placed inside their team. Others need a team to deliver a programme end to end. The sourcing, the vetting and the accountability are the same either way."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 lg:grid-cols-2">
          {offerings.map((offering) => {
            const Diagram = offeringDiagrams[offering.icon];
            return (
              <StaggerItem key={offering.slug}>
                <article className="group flex h-full flex-col bg-paper p-7 transition-colors duration-700 hover:bg-paper/60 md:p-9 lg:p-11">
                  <div className="flex items-start justify-between gap-6">
                    <span className="eyebrow tnum text-ink-300">
                      {offering.index}
                    </span>
                    <Diagram className="h-14 w-[4.75rem] shrink-0 md:h-[4.5rem] md:w-24" />
                  </div>

                  <h3 className="mt-8 text-[1.625rem] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.875rem]">
                    {offering.name}
                  </h3>

                  <p className="mt-4 max-w-[34ch] text-[1.0625rem] leading-relaxed font-medium tracking-[-0.012em] text-brand">
                    {offering.promise}
                  </p>

                  <p className="body-copy mt-5 max-w-[48ch]">{offering.body}</p>

                  <ul className="rule mt-9 flex flex-col pt-6">
                    {offering.points.map((point, i) => (
                      <li
                        key={point.label}
                        className={`flex gap-4 border-ink/[0.08] py-4 ${
                          i === 0 ? "pt-0" : "border-t"
                        }`}
                      >
                        <span className="eyebrow tnum mt-1.5 shrink-0 text-brand">
                          0{i + 1}
                        </span>
                        <div>
                          <h4 className="text-[0.9375rem] leading-snug font-medium tracking-[-0.01em] text-ink">
                            {point.label}
                          </h4>
                          <p className="mt-1.5 max-w-[44ch] text-[0.875rem] leading-relaxed text-ink-400">
                            {point.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
