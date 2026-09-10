import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { audiences, networkEffect } from "@/content/audiences";

/**
 * Why HTP42, told from three sides. The model only makes sense as a whole:
 * senior leaders supply the judgment about who to trust, experts supply the
 * depth, and clients get access neither could offer alone. Each column states
 * the situation in that side's own terms, then what changes for them.
 */
export function WhyHtp42() {
  return (
    <section className="section bg-paper">
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow="Why HTP42"
          title={
            <>
              One network,{" "}
              <span className="accent-italic text-brand">
                three reasons
              </span>{" "}
              to be in it.
            </>
          }
          lead="HTP42 solves a different problem for each side, and each side makes the others better. That is the whole design, and it is why the access we can offer clients is difficult to replicate."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 lg:grid-cols-3">
          {audiences.map((audience) => (
            <StaggerItem key={audience.index}>
              <article className="group flex h-full flex-col bg-paper p-7 transition-colors duration-700 hover:bg-paper-2 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow tnum text-ink-300">
                    {audience.index}
                  </span>
                  <span className="eyebrow text-brand">For {audience.who}</span>
                </div>

                <h3 className="mt-7 max-w-[22ch] text-[1.25rem] leading-tight tracking-[-0.026em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.375rem]">
                  {audience.label}
                </h3>

                <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-400">
                  {audience.problem}
                </p>

                <div className="rule mt-8 pt-6">
                  <h4 className="eyebrow text-ink-300">What changes</h4>
                  <ul className="mt-4 flex flex-col gap-3">
                    {audience.gains.map((gain) => (
                      <li
                        key={gain}
                        className="flex gap-3 text-[0.875rem] leading-snug text-ink-600"
                      >
                        <Check
                          className="mt-[0.1875rem] size-3.5 shrink-0 text-brand"
                          strokeWidth={2.25}
                          aria-hidden="true"
                        />
                        {gain}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* What the three sides add up to. */}
        <Reveal delay={0.1}>
          <div className="rule mt-14 pt-8">
            <p className="max-w-[52ch] text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.32] tracking-[-0.022em] text-ink">
              {networkEffect}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
