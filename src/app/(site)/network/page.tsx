import { Fragment } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { ModelComparison } from "@/components/sections/ModelComparison";
import { ValuesTable } from "@/components/sections/ValuesTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import {
  Reveal,
  Stagger,
  StaggerItem,
  DrawRule,
} from "@/components/motion/Reveal";
import { PartnerPortrait } from "@/components/ui/PartnerPortrait";
import { ThreeSides } from "@/components/sections/ThreeSides";
import { getContent } from "@/content/live";

export const metadata: Metadata = {
  title: "The Network",
  description:
    "How HTP42 works: a curated network of 50+ senior life sciences data, AI and technology experts, matched to your subject matter and assembled into accountable teams.",
};

const JOIN_CRITERIA = [
  "You have held the role, not just advised on it. Head of function, VP, CTO or principal architect at a sponsor, a CRO or a clinical technology company.",
  "You know a subject deeply. We match on subject matter, so generalist profiles are not what we are looking for.",
  "You want senior work in small teams, and you are comfortable being named on an engagement before it is signed.",
  "You use AI seriously in your own practice, and you bring the judgment that makes its output trustworthy.",
];

export default async function NetworkPage() {
  const { expertCount: EXPERT_COUNT, disciplines, leadership, networkEffect, proofFacts } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="The network"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "The Network", href: "/network" },
        ]}
        titleLines={[
          "Deep expertise,",
          <Fragment key="matched">
            <span className="accent-italic text-azure">matched</span> to your
          </Fragment>,
          "subject matter.",
        ]}
        lead="Knowing who to trust with a specific problem is not something a CV database can tell you. It sits with the senior leaders who have already worked with these people."
        facts={proofFacts}
      />

      {/* 01. why HTP42: the three sided argument, then the comparison */}
      <section className="section bg-paper">
        <div className="shell">
          <SectionHeader
            index="01"
            eyebrow="Why HTP42"
            title={
              <>
                One network,{" "}
                <span className="accent-italic text-brand">three reasons</span>{" "}
                to be in it.
              </>
            }
            lead={networkEffect}
          />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-6 md:mt-16 md:grid-cols-2">
            <Reveal>
              <p className="body-copy">
                We hold a curated network of more than {EXPERT_COUNT} senior
                experts across six disciplines. Each has held the role they now
                advise on. We match on subject matter rather than availability,
                review every candidate at senior level before onboarding, and
                where the brief calls for expertise we do not already hold, we
                source it through their networks, which reach 500+ senior
                specialists.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="body-copy">
                Clients use that two ways. Either we find vetted experts and
                embed them in your own team, with HTP42 as the single
                contracting party carrying the administration and legal work.
                Or, for more complex needs, we assemble a senior team to
                deliver an end to end solution against agreed deliverables,
                named before you sign and with one engagement partner
                accountable throughout.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 md:mt-14">
            <Reveal>
              <h3 className="eyebrow border-b border-ink/12 pb-4 text-ink-300">
                Why it works, from three sides
              </h3>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="body-copy max-w-[62ch] pt-7">
                HTP42 solves a different problem for each side, and each side
                makes the others better. That is the whole design, and it is
                why the access we can offer clients is difficult to replicate.
              </p>
            </Reveal>
            <div className="mt-9">
              <ThreeSides />
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <Reveal>
              <h3
                id="model"
                className="eyebrow scroll-mt-28 border-b border-ink/12 pb-4 text-ink-300"
              >
                The depth of a specialist, with the reach of a team
              </h3>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="body-copy max-w-[62ch] pt-7">
                The table below is the whole argument. One independent adviser
                gives you depth in one place. A large firm gives you scale
                without it.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-9">
                <ModelComparison />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — partners and leadership */}
      <section className="grain relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_65%_at_85%_0%,rgba(46,127,219,0.16),transparent_58%)]"
          aria-hidden="true"
        />
        <div className="shell section relative">
          <SectionHeader
            index="02"
            eyebrow="Our partners"
            onDark
            title={
              <>
                The people who{" "}
                <span className="accent-italic text-azure">
                  answer the phone
                </span>
                .
              </>
            }
            lead="A partner is accountable for every piece of work we take on. These are the people who frame it, match the expertise, and stay on it to the end."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 max-sm:gap-y-0 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto_auto] lg:gap-y-0">
            {leadership.map((person) => (
              <StaggerItem
                key={person.name}
                as="article"
                className="group grid content-start max-sm:grid-cols-[5.5rem_1fr] max-sm:items-start max-sm:gap-x-5 max-sm:border-t max-sm:border-white/12 max-sm:py-6 max-sm:first:border-t-0 max-sm:first:pt-0 lg:row-span-4 lg:grid-rows-subgrid"
              >
                <div className="max-sm:row-span-3">
                  <PartnerPortrait
                    name={person.name}
                    photo={person.photo}
                    onDark
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 5.5rem"
                  />
                </div>
                <h3 className="mt-6 text-lg tracking-[-0.026em] text-white transition-colors duration-500 group-hover:text-azure max-sm:mt-0">
                  {person.name}
                </h3>
                <p className="mt-2 text-xs leading-snug font-medium tracking-[-0.006em] text-azure/90">
                  {person.role}
                </p>
                <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-white/60 max-sm:col-span-2">
                  {person.note}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 03 — values */}
      <section className="section bg-paper-2">
        <div className="shell">
          <SectionHeader
            index="03"
            eyebrow="Our values"
            title={
              <>
                Six values, and what each one{" "}
                <span className="accent-italic text-brand">
                  looks like in delivery
                </span>
                .
              </>
            }
            lead="Values only matter if you can see them in the work. Each of these has a practical test attached, and we hold our experts to it."
          />

          <div className="mt-14 md:mt-16">
            <ValuesTable />
          </div>
        </div>
      </section>

      {/* 04 — where the depth sits */}
      <section id="disciplines" className="section scroll-mt-24 bg-paper">
        <div className="shell">
          <SectionHeader
            index="04"
            eyebrow="Where the depth sits"
            title={
              <>
                {EXPERT_COUNT}+ experts across{" "}
                <span className="accent-italic text-brand">
                  six disciplines
                </span>
                .
              </>
            }
            lead="We publish the shape of the network and its depth, not the individuals. Named profiles are shared under NDA once we know what the engagement needs."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((discipline) => (
              <StaggerItem key={discipline.index}>
                <div className="group flex h-full flex-col bg-paper p-7 transition-colors duration-700 hover:bg-paper-2 md:p-8">
                  <span className="eyebrow tnum text-ink-300">
                    {discipline.index}
                  </span>
                  <h3 className="mt-7 max-w-[20ch] text-lg leading-tight tracking-[-0.026em] text-ink transition-colors duration-500 group-hover:text-brand md:text-xl">
                    {discipline.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-400">
                    {discipline.summary}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="rule mt-12 pt-7">
              <p className="max-w-[62ch] text-base leading-relaxed text-ink-600">
                Not seeing your subject? The bench is the starting point, not
                the limit. Our experts' own networks reach 500+ more senior
                specialists, and we source from them when a brief calls for
                expertise we do not already hold, under the same qualification
                and senior review as everyone else.
              </p>
              <div className="mt-7">
                <ArrowLink href="/contact">
                  Tell us what you need
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 — join */}
      <section className="section bg-ink-900 text-white">
        <div className="shell">
          <DrawRule onDark />
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 pt-7 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow index="05" onDark>
                  Join the network
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-7 max-w-[18ch] text-display-sm text-white">
                  Every expert is{" "}
                  <span className="accent-italic text-azure">
                    vetted by a partner
                  </span>
                  , then reviewed on every engagement.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lead mt-7 max-w-md text-white/60">
                  Joining is a systematic review by our partners, on subject
                  matter depth and on the soft skills that make someone
                  workable inside a client team. After that, client
                  satisfaction is tracked on every engagement, and it decides
                  who gets the next one.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-9">
                  <ArrowLink href="/contact" onDark>
                    Introduce yourself
                  </ArrowLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                <h3 className="eyebrow text-white/50">What we look for</h3>
              </Reveal>
              <Stagger className="mt-7 flex flex-col">
                {JOIN_CRITERIA.map((criterion, i) => (
                  <StaggerItem key={i}>
                    <div
                      className={`flex gap-5 border-t border-white/12 py-5 ${
                        i === 0 ? "border-0 pt-0" : ""
                      }`}
                    >
                      <span className="eyebrow tnum mt-1 shrink-0 text-azure/90">
                        0{i + 1}
                      </span>
                      <p className="max-w-[52ch] text-base leading-relaxed text-white/60">
                        {criterion}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Work with the network"
        title={
          <>
            You do not need to know
            <br />
            which expert you need.{" "}
            <span className="accent-italic text-azure">That is our job.</span>
          </>
        }
        body="Describe what you need. We will come back with the experts we would put on it, their background, and why each of them."
        secondary={{ label: "See client impact", href: "/impact" }}
      />
    </>
  );
}
