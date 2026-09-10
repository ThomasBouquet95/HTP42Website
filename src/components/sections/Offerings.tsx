import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { offeringDiagrams } from "@/components/ui/AreaDiagram";
import { offerings } from "@/content/offerings";

/**
 * The two ways clients work with HTP42. This is the commercial model, so it
 * earns full width cards: the distinction between embedding experts and
 * handing over a programme is the thing prospects most need to understand
 * before they call.
 *
 * Each card splits into a tinted header carrying the name, the promise and
 * the diagram, then the detail beneath on the paper ground. That gives the
 * two offerings a clear shape instead of two stacks of prose.
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
              Embed our experts, or{" "}
              <span className="accent-italic text-brand">
                hand us the programme
              </span>
              .
            </>
          }
          lead="Some clients need experts embedded in their own team for a specific need, over months or years. Others need a programme delivered from strategy through implementation. We find and assemble the AI empowered experts for you, and carry the accountability for what they deliver."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 lg:grid-cols-2">
          {offerings.map((offering) => {
            const Diagram = offeringDiagrams[offering.icon];
            return (
              <StaggerItem key={offering.slug}>
                <article className="group flex h-full flex-col bg-paper">
                  {/* Header: identity and promise */}
                  <div className="relative overflow-hidden border-b border-ink/[0.08] bg-paper-2/70 px-7 pt-7 pb-8 transition-colors duration-700 group-hover:bg-brand-soft/45 md:px-9 md:pt-8 md:pb-9">
                    <div className="flex items-start justify-between gap-6">
                      <span className="eyebrow tnum text-ink-300">
                        {offering.index}
                      </span>
                      <Diagram className="h-14 w-[4.75rem] shrink-0 md:h-[4.25rem] md:w-[5.75rem]" />
                    </div>

                    <h3 className="mt-7 text-[1.625rem] tracking-[-0.032em] text-ink md:text-[1.875rem]">
                      {offering.name}
                    </h3>

                    <p className="mt-3 max-w-[30ch] text-[1.0625rem] leading-snug font-medium tracking-[-0.014em] text-brand md:text-[1.125rem]">
                      {offering.promise}
                    </p>
                  </div>

                  {/* Body: how it works */}
                  <div className="flex flex-1 flex-col px-7 pt-7 pb-8 md:px-9 md:pt-8 md:pb-10">
                    <p className="body-copy max-w-[46ch]">{offering.body}</p>

                    <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                      {offering.points.map((point) => (
                        <div key={point.label} className="rule pt-4">
                          <dt className="text-[0.875rem] leading-snug font-medium tracking-[-0.01em] text-ink">
                            {point.label}
                          </dt>
                          <dd className="mt-2 text-[0.8125rem] leading-relaxed text-ink-400">
                            {point.detail}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
