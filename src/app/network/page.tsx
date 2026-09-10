import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { ModelComparison } from "@/components/sections/ModelComparison";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, Stagger, StaggerItem, DrawRule } from "@/components/motion/Reveal";
import {
  disciplines,
  expertCount,
  leadership,
  values,
} from "@/content/network";
import { partners, proofPoints } from "@/content/site";

export const metadata: Metadata = {
  title: "The Network",
  description:
    "How HTP42 works: a network of 40+ senior life sciences data, AI and technology experts, assembled per engagement. Not a firm with a bench, and not a freelance marketplace.",
};

const JOIN_CRITERIA = [
  "You have held the role, not just advised on it — head of function, VP, CTO or principal architect at a sponsor, CRO or platform company.",
  "You want senior work in small teams, not a staffing pipeline or a body-shop rate card.",
  "You are comfortable being named on an engagement before it is signed, and accountable for it afterwards.",
  "You would rather tell a client something inconvenient than protect a follow-on sale.",
];

export default function NetworkPage() {
  return (
    <>
      <PageHero
        eyebrow="The network"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "The Network", href: "/network" },
        ]}
        titleLines={[
          "A network is a",
          "better instrument",
          <>
            than a <span className="accent-italic text-azure">firm.</span>
          </>,
        ]}
        lead="HealthTechPartners 42 was founded in Basel by former Novartis leadership on a simple observation: the people who actually know how to fix a pharma data estate do not want to work at a large consultancy, and the clients who need them cannot find them."
        facts={[
          { label: "Senior experts", value: String(expertCount) },
          { label: "Disciplines", value: String(disciplines.length) },
          { label: "Headquarters", value: "Basel, CH" },
          { label: "Also present", value: "Paris · CPH · SG" },
        ]}
      />

      {/* The founding argument */}
      <section className="section bg-paper">
        <div className="shell">
          <DrawRule />
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 pt-7 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <Eyebrow index="01">Our model</Eyebrow>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2
                    id="model"
                    className="mt-7 max-w-[18ch] scroll-mt-28 text-display-sm text-ink"
                  >
                    Neither a firm nor a{" "}
                    <span className="accent-italic text-brand">
                      marketplace
                    </span>
                    .
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="rule mt-9 max-w-[30ch] pt-7 text-[0.9375rem] leading-relaxed text-ink-400">
                    The table opposite is the whole argument. Where a
                    structure forces a compromise, we would rather not have
                    the structure.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <p className="max-w-[48ch] text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.32] tracking-[-0.022em] text-ink">
                  A consultancy has to keep its bench busy. A marketplace has
                  no view on quality. Both structures work against the client
                  in the same place — who is actually in the room.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
                  <p className="body-copy">
                    We hold a curated network of {expertCount} senior experts
                    across six disciplines. Each has held the role they now
                    advise on. None of them sits on a bench — they are
                    practising principals, fractional CTOs and independent
                    advisors who take HTP42 engagements because the work is
                    senior and the teams are small.
                  </p>
                  <p className="body-copy">
                    For each engagement we frame the problem first, then name
                    the two to eight people it requires. You meet them before
                    signature. There are no substitutions afterwards, one
                    engagement partner is accountable, and when the work is
                    done the team stands down rather than looking for the next
                    phase.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="rule mt-12 pt-8">
                  <ModelComparison />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What we hold ourselves to */}
      <section className="section bg-paper-2">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="How we behave"
            title={
              <>
                The four commitments that{" "}
                <span className="accent-italic text-brand">
                  cost us money
                </span>
                .
              </>
            }
            lead="Values are only real when they have a price. These four regularly cost us follow-on work, which is how we know they are load-bearing."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-16 md:grid-cols-2">
            {values.map((value, i) => (
              <StaggerItem key={value.title}>
                <div className="group rule pt-6">
                  <span className="eyebrow tnum text-ink-300">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 max-w-[22ch] text-xl tracking-[-0.028em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.5rem]">
                    {value.title}
                  </h3>
                  <p className="body-copy mt-4 max-w-[52ch]">{value.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Leadership */}
      <section className="grain relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_65%_at_85%_0%,rgba(46,127,219,0.16),transparent_58%)]"
          aria-hidden="true"
        />
        <div className="shell section relative">
          <SectionHeader
            index="03"
            eyebrow="Partners & leadership"
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
            lead="An engagement partner is accountable for every piece of work we take on. These are the people who frame it, name the team, and stay on it to the end."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <StaggerItem key={person.name}>
                <article className="rule-on-dark group pt-6">
                  <h3 className="text-[1.25rem] tracking-[-0.026em] text-white transition-colors duration-500 group-hover:text-azure">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] font-medium tracking-[-0.006em] text-azure/90">
                    {person.role}
                  </p>
                  <p className="mt-4 max-w-[36ch] text-[0.875rem] leading-relaxed text-white/60">
                    {person.note}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The bench, by discipline */}
      <section id="disciplines" className="section scroll-mt-24 bg-paper">
        <div className="shell">
          <SectionHeader
            index="04"
            eyebrow="The bench"
            title={
              <>
                {expertCount} experts across{" "}
                <span className="accent-italic text-brand">
                  six disciplines
                </span>
                .
              </>
            }
            lead="Published as first name and initial where our experts prefer it — most hold current engagements elsewhere. Full profiles are shared under NDA during scoping."
          />

          <div className="mt-14 flex flex-col gap-16 md:mt-16 md:gap-20">
            {disciplines.map((discipline) => (
              <div key={discipline.index}>
                <DrawRule />
                <div className="grid grid-cols-1 gap-x-12 gap-y-8 pt-7 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                      <Reveal>
                        <div className="flex items-baseline justify-between gap-4">
                          <Eyebrow index={discipline.index}>
                            Discipline
                          </Eyebrow>
                          <span className="eyebrow tnum text-ink-300">
                            {discipline.experts.length} experts
                          </span>
                        </div>
                      </Reveal>
                      <Reveal delay={0.06}>
                        <h3 className="mt-6 max-w-[18ch] text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-[1.12] tracking-[-0.03em] text-ink">
                          {discipline.name}
                        </h3>
                      </Reveal>
                      <Reveal delay={0.12}>
                        <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-400">
                          {discipline.summary}
                        </p>
                      </Reveal>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <Stagger
                      stagger={0.05}
                      className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2"
                    >
                      {discipline.experts.map((expert) => (
                        <StaggerItem key={expert.name}>
                          <article className="group border-t border-ink/[0.09] pt-5">
                            <h4 className="text-[1.0625rem] font-medium tracking-[-0.022em] text-ink transition-colors duration-500 group-hover:text-brand">
                              {expert.name}
                            </h4>
                            <p className="mt-1.5 text-[0.8125rem] leading-snug font-medium text-ink-600">
                              {expert.role}
                            </p>
                            <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-400">
                              {expert.note}
                            </p>
                          </article>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the network */}
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
                  We add roughly{" "}
                  <span className="accent-italic text-azure">
                    one expert a month
                  </span>
                  .
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lead mt-7 max-w-md text-white/55">
                  Not because demand is low, but because the bar is the whole
                  proposition. We would rather turn down an engagement than
                  field someone we would not put our own name next to.
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
                      <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-white/60">
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

      {/* Partners */}
      <section id="partners" className="section scroll-mt-24 bg-paper-2">
        <div className="shell">
          <SectionHeader
            index="06"
            eyebrow="Partners"
            title={
              <>
                Two partnerships,{" "}
                <span className="accent-italic text-brand">
                  chosen carefully
                </span>
                .
              </>
            }
            lead="We do not hold reseller agreements or vendor commissions — it would compromise the advice. These two partnerships exist because they extend what we can deliver."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 md:grid-cols-2">
            {partners.map((partner) => (
              <StaggerItem key={partner.name}>
                <div className="flex h-full flex-col bg-paper p-8 md:p-10">
                  <span className="eyebrow text-brand">{partner.role}</span>
                  <h3 className="mt-7 text-[1.5rem] tracking-[-0.03em] text-ink md:text-[1.75rem]">
                    {partner.name}
                  </h3>
                  <p className="body-copy mt-5 max-w-[46ch]">{partner.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Firm facts */}
          <Reveal delay={0.1}>
            <dl className="rule mt-16 grid grid-cols-2 gap-x-10 gap-y-8 pt-8 lg:grid-cols-4">
              {proofPoints.map((point) => (
                <div key={point.label}>
                  <dt className="eyebrow text-ink-300">{point.label}</dt>
                  <dd className="tnum mt-3 text-[2rem] leading-none font-medium tracking-[-0.04em] text-ink">
                    {point.value}
                    {point.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
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
        body="Describe the decision in front of you. We will come back with the two to eight people we would put on it, and why."
        secondary={{ label: "See client impact", href: "/impact" }}
      />
    </>
  );
}
