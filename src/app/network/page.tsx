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
        lead="Knowing who to trust with a specific problem is not something a CV database can tell you. It sits with senior leaders who have already worked with these people. Put those leaders and the experts they vouch for in one network, and clients get access they cannot source alone."
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
                    not already hold, we source it through their networks,
                    which reach 500+ senior specialists.
                  </p>
                  <p className="body-copy">
                    Clients use that two ways. Either we find vetted experts
                    and embed them in your own team, with HTP42 as the single
                    contracting party carrying the administration and legal
                    work. Or, for more complex needs, we assemble a
                    senior team to deliver an end to end solution against
                    agreed deliverables, named before you sign and with one
                    engagement partner accountable throughout.
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
            lead="A partner is accountable for every piece of work we take on. Each brings deep life sciences experience and an extensive network of their own. These are the people who frame the work, match the expertise, and stay on it to the end."
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
                  <span className="eyebrow tnum text-ink-300">
                    {discipline.index}
                  </span>
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
