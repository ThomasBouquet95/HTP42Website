import { Fragment } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { EngagementModel } from "@/components/sections/EngagementModel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, Stagger, StaggerItem, DrawRule } from "@/components/motion/Reveal";
import { diagrams } from "@/components/ui/AreaDiagram";
import { expertiseAreas } from "@/content/expertise";
import { proofFacts } from "@/content/site";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "A senior expert network at the intersection of life sciences, data, AI and technology. The areas shown here are illustrative examples of where our experts work, not a service catalogue."
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
          "The range our",
          "experts cover,",
          <Fragment key="accent">
            <span className="accent-italic text-azure">in detail</span>.
          </Fragment>,
        ]}
        lead="You tell us what you need. We match the senior expert who has already done it, and stay accountable until the work lands. The areas below are illustrative."
        facts={proofFacts}
      />

      {/* A quick jump list before the long form sections. */}
      <section className="border-b border-ink/10 bg-paper py-10 md:py-12">
        <div className="shell">
          <Reveal>
            <Eyebrow>Illustrative areas</Eyebrow>
          </Reveal>
          <Stagger className="mt-6 flex flex-wrap gap-x-2.5 gap-y-2.5">
            {expertiseAreas.map((area) => (
              <StaggerItem key={area.slug}>
                <a
                  href={`#${area.slug}`}
                  className="group inline-flex items-baseline gap-2.5 rounded-full border border-ink/12 px-4 py-2 text-xs font-medium tracking-[-0.006em] text-ink-600 transition-all duration-500 hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                >
                  <span className="eyebrow tnum text-ink-300 transition-colors duration-500 group-hover:text-brand">
                    {area.index}
                  </span>
                  {area.name}
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {expertiseAreas.map((area, i) => {
        const Diagram = diagrams[area.icon];
        return (
          <section
            key={area.slug}
            id={area.slug}
            className={`section scroll-mt-24 ${
              i % 2 === 0 ? "bg-paper" : "bg-paper-2"
            }`}
          >
            <div className="shell">
              <DrawRule />
              <div className="grid grid-cols-1 gap-x-12 gap-y-12 pt-8 lg:grid-cols-12">
                {/* Sticky area rail */}
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <Reveal>
                      <Eyebrow index={area.index}>Example area</Eyebrow>
                    </Reveal>

                    <Reveal delay={0.06}>
                      <h2 className="mt-6 max-w-[16ch] text-display-sm tracking-[-0.032em] text-ink">
                        {area.name}
                      </h2>
                    </Reveal>

                    <Reveal delay={0.12}>
                      <p className="mt-6 max-w-[34ch] text-lg leading-relaxed font-medium tracking-[-0.012em] text-brand">
                        {area.promise}
                      </p>
                    </Reveal>

                    <Reveal delay={0.18}>
                      <p className="body-copy mt-6 max-w-[42ch]">
                        {area.lead}
                      </p>
                    </Reveal>

                    <Reveal delay={0.24}>
                      <div className="rule mt-9 pt-7">
                        <Diagram className="h-[4.5rem] w-24" />
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* Services */}
                <div className="lg:col-span-8">
                  <Stagger className="flex flex-col">
                    {area.services.map((service, si) => (
                      <StaggerItem key={service.slug}>
                        <article
                          id={service.slug}
                          className={`group scroll-mt-24 border-t border-ink/12 py-9 md:py-11 ${
                            si === 0 ? "border-t-0 pt-0" : ""
                          }`}
                        >
                          <div className="flex items-baseline gap-4">
                            <span className="eyebrow tnum text-ink-300">
                              {area.index}.{si + 1}
                            </span>
                          </div>

                          <h3 className="mt-5 max-w-[26ch] text-xl leading-[1.14] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-brand md:text-2xl">
                            {service.name}
                          </h3>

                          <p className="mt-4 max-w-[52ch] text-base leading-relaxed tracking-[-0.011em] text-ink-600">
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
                                  className="flex gap-3 text-sm leading-snug text-ink-600"
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
                        See this expertise at work
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
            Whatever you need,
            <br />
            someone in the network has{" "}
            <span className="accent-italic text-azure">
              already done it
            </span>
            .
          </>
        }
        body="Tell us what you are trying to achieve. We will match the senior expertise to it, from across the network and beyond it when the brief calls for it."
        secondary={{ label: "Meet the network", href: "/network" }}
      />
    </>
  );
}
