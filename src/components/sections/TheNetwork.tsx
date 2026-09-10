import Link from "next/link";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EXPERT_COUNT, leadership } from "@/content/network";
import { audiences, networkEffect } from "@/content/audiences";

/**
 * The network, in one section. Previously this was split across a "why HTP42"
 * block and a separate network teaser, which read as two takes on the same
 * subject with the case studies in between. Merged, it runs in the order a
 * reader needs: who the partners are, then why the three sided model produces
 * access a client could not source alone.
 */
export function TheNetwork() {
  return (
    <section id="network" className="section scroll-mt-24 bg-paper">
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow="The network"
          title={
            <>
              One network,{" "}
              <span className="accent-italic text-brand">three reasons</span>{" "}
              to be in it.
            </>
          }
          lead="It starts with the partners. Each brings deep life sciences experience and an extensive network of their own, which is how we reach the right expertise rather than the available expertise."
        />

        {/* The partners */}
        <div className="mt-14 md:mt-16">
          <h3 className="eyebrow border-b border-ink/12 pb-4 text-ink-300">
            Our partners
          </h3>
          <Stagger className="grid grid-cols-1 gap-x-10 gap-y-9 pt-9 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <StaggerItem key={person.name}>
                <article className="group">
                  <h4 className="text-[1.125rem] tracking-[-0.024em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.25rem]">
                    {person.name}
                  </h4>
                  <p className="mt-1.5 text-[0.8125rem] font-medium tracking-[-0.006em] text-brand">
                    {person.role}
                  </p>
                  <p className="mt-3 max-w-[40ch] text-[0.875rem] leading-relaxed text-ink-400">
                    {person.note}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Why the model works, from three sides */}
        <div className="mt-16 md:mt-20">
          <Reveal>
            <h3 className="eyebrow border-b border-ink/12 pb-4 text-ink-300">
              Why it works, from three sides
            </h3>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="body-copy max-w-[62ch] pt-7">
              HTP42 solves a different problem for each side, and each side
              makes the others better. That is the whole design, and it is why
              the access we can offer clients is difficult to replicate.
            </p>
          </Reveal>

          <Stagger className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 lg:grid-cols-3">
            {audiences.map((audience) => (
              <StaggerItem key={audience.index}>
                <article className="group flex h-full flex-col bg-paper p-6 transition-colors duration-700 hover:bg-paper-2 md:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="eyebrow tnum text-ink-300">
                      {audience.index}
                    </span>
                    <span className="eyebrow text-brand">
                      For {audience.who}
                    </span>
                  </div>

                  <h4 className="mt-6 max-w-[22ch] text-[1.0625rem] leading-tight tracking-[-0.024em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.1875rem]">
                    {audience.label}
                  </h4>

                  <p className="mt-4 max-w-[40ch] text-[0.875rem] leading-relaxed text-ink-400">
                    {audience.problem}
                  </p>

                  <div className="rule mt-7 pt-5">
                    <h5 className="eyebrow text-ink-300">What changes</h5>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {audience.gains.map((gain) => (
                        <li
                          key={gain}
                          className="flex gap-2.5 text-[0.8125rem] leading-snug text-ink-600"
                        >
                          <Check
                            className="mt-[0.1875rem] size-3 shrink-0 text-brand"
                            strokeWidth={2.5}
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
        </div>

        {/* What the three sides add up to */}
        <Reveal delay={0.1}>
          <div className="rule mt-14 flex flex-col gap-8 pt-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[52ch] text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.32] tracking-[-0.022em] text-ink">
              {networkEffect}
            </p>
            <div className="shrink-0">
              <ArrowLink href="/network">
                {EXPERT_COUNT}+ experts. See how the network works
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
