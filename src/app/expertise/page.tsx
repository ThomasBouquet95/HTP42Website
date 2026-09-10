import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { EngagementModel } from "@/components/sections/EngagementModel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, Stagger, StaggerItem, DrawRule } from "@/components/motion/Reveal";
import { diagrams } from "@/components/ui/PracticeDiagram";
import { practices } from "@/content/expertise";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Four practices: Data & AI, Clinical Data & Standards, Technology Strategy & Architecture, and Digital Transformation & Operating Model — advisory and delivery under one contract.",
};

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Expertise"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Expertise", href: "/expertise" },
        ]}
        titleLines={[
          "Four practices,",
          <>
            <span className="accent-italic text-azure">no seam</span> between
          </>,
          "advice and delivery.",
        ]}
        lead="The team that recommends the architecture is the team that deploys it. That single fact changes what we are willing to recommend — and what we are prepared to be held to."
        facts={[
          { label: "Practices", value: "4" },
          { label: "Service lines", value: "14" },
          { label: "Typical engagement", value: "6–26 weeks" },
          { label: "Team size", value: "2–8 seniors" },
        ]}
      />

      {/* Practice index — a quick jump list before the long-form sections. */}
      <section className="border-b border-ink/10 bg-paper py-10 md:py-12">
        <div className="shell">
          <Reveal>
            <Eyebrow>Jump to a practice</Eyebrow>
          </Reveal>
          <Stagger className="mt-6 flex flex-wrap gap-x-2.5 gap-y-2.5">
            {practices.map((practice) => (
              <StaggerItem key={practice.slug}>
                <a
                  href={`#${practice.slug}`}
                  className="group inline-flex items-baseline gap-2.5 rounded-full border border-ink/12 px-4 py-2 text-[0.8125rem] font-medium tracking-[-0.006em] text-ink-600 transition-all duration-500 hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                >
                  <span className="eyebrow tnum text-ink-300 transition-colors duration-500 group-hover:text-brand">
                    {practice.index}
                  </span>
                  {practice.name}
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {practices.map((practice, i) => {
        const Diagram = diagrams[practice.icon];
        return (
          <section
            key={practice.slug}
            id={practice.slug}
            className={`section scroll-mt-24 ${
              i % 2 === 0 ? "bg-paper" : "bg-paper-2"
            }`}
          >
            <div className="shell">
              <DrawRule />
              <div className="grid grid-cols-1 gap-x-12 gap-y-12 pt-8 lg:grid-cols-12">
                {/* Sticky practice rail */}
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <Reveal>
                      <Eyebrow index={practice.index}>Practice</Eyebrow>
                    </Reveal>

                    <Reveal delay={0.06}>
                      <h2 className="mt-6 max-w-[16ch] text-display-sm tracking-[-0.032em] text-ink">
                        {practice.name}
                      </h2>
                    </Reveal>

                    <Reveal delay={0.12}>
                      <p className="mt-6 max-w-[34ch] text-[1.0625rem] leading-relaxed font-medium tracking-[-0.012em] text-brand">
                        {practice.promise}
                      </p>
                    </Reveal>

                    <Reveal delay={0.18}>
                      <p className="body-copy mt-6 max-w-[42ch]">
                        {practice.lead}
                      </p>
                    </Reveal>

                    <Reveal delay={0.24}>
                      <div className="rule mt-9 pt-7">
                        <Diagram className="h-[4.5rem] w-24" />
                        <p className="mt-6 text-[0.8125rem] text-ink-300">
                          {practice.services.length} service lines
                        </p>
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* Services */}
                <div className="lg:col-span-8">
                  <Stagger className="flex flex-col">
                    {practice.services.map((service, si) => (
                      <StaggerItem key={service.slug}>
                        <article
                          id={service.slug}
                          className={`group scroll-mt-24 border-t border-ink/12 py-9 md:py-11 ${
                            si === 0 ? "border-t-0 pt-0" : ""
                          }`}
                        >
                          <div className="flex items-baseline gap-4">
                            <span className="eyebrow tnum text-ink-300">
                              {practice.index}.{si + 1}
                            </span>
                          </div>

                          <h3 className="mt-5 max-w-[26ch] text-[1.5rem] leading-[1.14] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.75rem]">
                            {service.name}
                          </h3>

                          <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed tracking-[-0.011em] text-ink-600">
                            {service.summary}
                          </p>

                          <p className="body-copy mt-5 max-w-[62ch]">
                            {service.detail}
                          </p>

                          <div className="mt-8">
                            <h4 className="eyebrow text-ink-300">
                              What you get
                            </h4>
                            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                              {service.deliverables.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-3 text-[0.875rem] leading-snug text-ink-600"
                                >
                                  <span
                                    className="mt-[0.4375rem] size-1 shrink-0 rounded-full bg-brand/50"
                                    aria-hidden="true"
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </article>
                      </StaggerItem>
                    ))}
                  </Stagger>

                  <Reveal delay={0.08}>
                    <div className="mt-11">
                      <ArrowLink href="/impact">
                        See this work in practice
                      </ArrowLink>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <EngagementModel />

      <CtaBand
        eyebrow="Next step"
        title={
          <>
            Not sure which practice
            <br />
            your problem sits in?{" "}
            <span className="accent-italic text-azure">Neither are we</span>,
            until we talk.
          </>
        }
        body="Most engagements cross two or three practices. Describe the decision you are facing and we will tell you which experts it needs — and whether we are the right firm at all."
        secondary={{ label: "Meet the network", href: "/network" }}
      />
    </>
  );
}
