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
import { EXPERT_COUNT, disciplines, leadership } from "@/content/network";
import { proofPoints } from "@/content/site";

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
          "Deep expertise,",
          <>
            <span className="accent-italic text-azure">matched</span> to your
          </>,
          "subject matter.",
        ]}
        lead="HealthTech Partners 42 was founded in Basel by former Novartis leadership on a simple observation: the people who genuinely know how to fix a pharma data problem are rarely the people a firm has available that quarter."
        facts={[
          { label: "Senior experts", value: `${EXPERT_COUNT}+` },
          { label: "Disciplines", value: String(disciplines.length) },
          { label: "Headquarters", value: "Basel, CH" },
          { label: "Also present", value: "Paris · CPH · SG" },
        ]}
      />

      {/* 01 — the model */}
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
                    The depth of a specialist, with the{" "}
                    <span className="accent-italic text-brand">
                      reach of a team
                    </span>
                    .
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="rule mt-9 max-w-[30ch] pt-7 text-[0.9375rem] leading-relaxed text-ink-400">
                    The table opposite is the whole argument. One independent
                    adviser gives you depth in one place. A large firm gives you
                    scale without it.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <p className="max-w-[48ch] text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.32] tracking-[-0.022em] text-ink">
                  Our job is to find the right expertise for your problem, then
                  put enough of it around the table to finish the work.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
                  <p className="body-copy">
                    We hold a curated network of more than {EXPERT_COUNT} senior
                    experts across six disciplines. Each has held the role they
                    now advise on. We match on subject matter rather than
                    availability, review every candidate at senior level before
                    onboarding, and where the brief calls for expertise we do
                    not already hold, we source it through our extended network.
                  </p>
                  <p className="body-copy">
                    A single specialist cannot cover a twenty six week
                    programme. So we assemble two to eight of them into one
                    accountable team, name them before you sign, and keep one
                    engagement partner responsible from framing through to
                    handover. No substitutions afterwards.
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

      {/* 02 — partners and leadership */}
      <section className="grain relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_65%_at_85%_0%,rgba(46,127,219,0.16),transparent_58%)]"
          aria-hidden="true"
        />
        <div className="shell section relative">
          <SectionHeader
            index="02"
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
            lead="An engagement partner is accountable for every piece of work we take on. These are the people who frame it, match the expertise, and stay on it to the end."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <StaggerItem key={person.name}>
                <article className="rule-on-dark group pt-6">
                  <h3 className="text-[1.25rem] tracking-[-0.026em] text-white transition-colors duration-500 group-hover:text-azure">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-snug font-medium tracking-[-0.006em] text-azure/90">
                    {person.role}
                  </p>
                  <p className="mt-4 max-w-[40ch] text-[0.875rem] leading-relaxed text-white/60">
                    {person.note}
                  </p>
                </article>
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
            lead="We publish the shape of the network and its depth, not the individuals. Named profiles, backgrounds and references are shared under NDA once we know what the engagement needs."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((discipline) => (
              <StaggerItem key={discipline.index}>
                <div className="group flex h-full flex-col bg-paper p-7 transition-colors duration-700 hover:bg-paper-2 md:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="eyebrow tnum text-ink-300">
                      {discipline.index}
                    </span>
                    <span className="eyebrow tnum text-brand">
                      {discipline.count} experts
                    </span>
                  </div>
                  <h3 className="mt-7 max-w-[20ch] text-[1.1875rem] leading-tight tracking-[-0.026em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.3125rem]">
                    {discipline.name}
                  </h3>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-400">
                    {discipline.summary}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="rule mt-12 pt-7">
              <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-600">
                Not seeing your subject? The bench is the starting point, not
                the limit. We source new experts through our extended network
                when a brief calls for expertise we do not already hold, under
                the same qualification and senior review as everyone else.
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
                  We add roughly{" "}
                  <span className="accent-italic text-azure">
                    one expert a month
                  </span>
                  .
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lead mt-7 max-w-md text-white/60">
                  Not because demand is low, but because the qualification bar
                  is the whole proposition. Every expert is reviewed at senior
                  level before onboarding, and supported and reviewed after it.
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

              <Reveal delay={0.24}>
                <dl className="rule-on-dark mt-12 grid grid-cols-2 gap-x-10 gap-y-8 pt-8 lg:grid-cols-4">
                  {proofPoints.map((point) => (
                    <div key={point.label}>
                      <dt className="eyebrow text-white/50">{point.label}</dt>
                      <dd className="tnum mt-3 text-[1.75rem] leading-none font-medium tracking-[-0.04em] text-white">
                        {point.value}
                        {point.suffix}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
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
        body="Describe the decision in front of you. We will come back with the two to eight people we would put on it, and why each of them."
        secondary={{ label: "See client impact", href: "/impact" }}
      />
    </>
  );
}
