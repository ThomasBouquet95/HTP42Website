import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PartnerPortrait } from "@/components/ui/PartnerPortrait";
import { ThreeSides } from "@/components/sections/ThreeSides";
import { EXPERT_COUNT, leadership } from "@/content/network";
import { networkEffect } from "@/content/audiences";
import { copy } from "@/content/copy";

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
          eyebrow={copy.home.network.eyebrow}
          title={copy.home.network.title}
          lead={copy.home.network.lead}
        />

        {/* The partners */}
        <div className="mt-14 md:mt-16">
          <h3 className="eyebrow border-b border-ink/12 pb-4 text-ink-300">
            {copy.home.network.partnersHeading}
          </h3>
          <Stagger className="grid grid-cols-1 gap-x-8 gap-y-10 pt-9 max-sm:gap-y-0 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto_auto] lg:gap-y-0">
            {leadership.map((person) => (
              <StaggerItem
                key={person.name}
                as="article"
                className="group grid content-start max-sm:grid-cols-[5.5rem_1fr] max-sm:items-start max-sm:gap-x-5 max-sm:border-t max-sm:border-ink/10 max-sm:py-6 max-sm:first:border-t-0 max-sm:first:pt-0 lg:row-span-4 lg:grid-rows-subgrid"
              >
                <div className="max-sm:row-span-3">
                  <PartnerPortrait
                    name={person.name}
                    photo={person.photo}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 5.5rem"
                  />
                </div>
                <h4 className="mt-5 text-lg tracking-[-0.024em] text-ink transition-colors duration-500 group-hover:text-brand max-sm:mt-0">
                  {person.name}
                </h4>
                <p className="mt-1.5 text-xs font-medium tracking-[-0.006em] text-brand">
                  {person.role}
                </p>
                <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-ink-400 max-sm:col-span-2 max-sm:mt-4">
                  {person.note}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Why the model works, from three sides */}
        <div className="mt-16 md:mt-20">
          <Reveal>
            <h3 className="eyebrow border-b border-ink/12 pb-4 text-ink-300">
              {copy.home.network.threeSidesHeading}
            </h3>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="body-copy max-w-[62ch] pt-7">
              {copy.home.network.threeSidesLead}
            </p>
          </Reveal>

          <div className="mt-9">
            <ThreeSides />
          </div>
        </div>

        {/* What the three sides add up to */}
        <Reveal delay={0.1}>
          <div className="rule mt-14 flex flex-col gap-8 pt-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[52ch] text-statement leading-[1.32] tracking-[-0.022em] text-ink">
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
