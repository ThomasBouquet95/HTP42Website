import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem, DrawRule } from "@/components/motion/Reveal";
import { caseStudies } from "@/content/cases";
import { getContent } from "@/content/live";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const study = content.caseStudies.find((c) => c.slug === slug);
  if (!study) return { title: "Case study not found" };

  return {
    title: study.title,
    description: study.headline,
    openGraph: {
      title: `${study.title} · HTP42 case study`,
      description: study.headline,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const content = await getContent();
  // Slugs are not editable, so the compiled list still defines the routes;
  // everything shown on the page comes from the merged content.
  const studies = content.caseStudies;
  const study = studies.find((c) => c.slug === slug);
  if (!study) notFound();

  const position = studies.findIndex((c) => c.slug === slug);
  const next = studies[(position + 1) % studies.length];
  const previous =
    studies[(position - 1 + studies.length) % studies.length];

  return (
    <>
      <PageHero
        eyebrow={study.kicker}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Client Impact", href: "/impact" },
          { label: study.title, href: `/impact/${study.slug}` },
        ]}
        titleLines={[study.title]}
        lead={study.headline}
        facts={[
          { label: "Client", value: study.clientType },
          { label: "Year", value: study.year },
          { label: "Duration", value: study.duration },
          { label: "Team", value: study.team },
        ]}
      />

      {/* Metrics strip */}
      <section className="border-b border-ink/10 bg-paper-2">
        <div className="shell">
          <Stagger className="grid grid-cols-1 divide-ink/10 sm:grid-cols-3 sm:divide-x">
            {study.metrics.map((metric, i) => (
              <StaggerItem key={metric.label}>
                <div
                  className={`border-b border-ink/10 px-0 py-8 sm:border-0 sm:px-8 sm:py-10 ${
                    i === study.metrics.length - 1 ? "border-b-0" : ""
                  } ${i === 0 ? "sm:pl-0" : ""}`}
                >
                  <p className="text-figure leading-none font-medium tracking-[-0.04em] text-ink tnum">
                    {metric.value}
                  </p>
                  <p className="mt-4 max-w-[22ch] text-sm leading-snug text-ink-400">
                    {metric.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Problem → intervention */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid grid-cols-1 gap-x-14 gap-y-16 lg:grid-cols-2">
            {/* The challenge */}
            <div>
              <DrawRule />
              <div className="pt-7">
                <Reveal>
                  <Eyebrow index="01">The challenge</Eyebrow>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="mt-7 max-w-[34ch] text-statement leading-[1.24] tracking-[-0.026em] text-ink">
                    {study.challenge}
                  </p>
                </Reveal>
                <Stagger className="mt-8 flex flex-col gap-5">
                  {study.challengeDetail.map((paragraph, i) => (
                    <StaggerItem key={i}>
                      <p className="body-copy max-w-[56ch]">{paragraph}</p>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>

            {/* Our approach */}
            <div>
              <DrawRule delay={0.1} />
              <div className="pt-7">
                <Reveal>
                  <Eyebrow index="02">Our approach</Eyebrow>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="mt-7 max-w-[34ch] text-statement leading-[1.24] tracking-[-0.026em] text-ink">
                    {study.approach}
                  </p>
                </Reveal>
                <Stagger className="mt-8 flex flex-col">
                  {study.approachDetail.map((paragraph, i) => (
                    <StaggerItem key={i}>
                      <div
                        className={`flex gap-5 border-t border-ink/10 py-4 ${
                          i === 0 ? "border-0 pt-0" : ""
                        }`}
                      >
                        <span className="eyebrow tnum mt-1 shrink-0 text-brand">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="body-copy max-w-[52ch]">{paragraph}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key outcomes */}
      <section className="section bg-paper-2">
        <div className="shell">
          <DrawRule />
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 pt-7 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow index="03">Key outcomes</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-7 max-w-[16ch] text-display-sm text-ink">
                  What the client{" "}
                  <span className="accent-italic text-brand">
                    walked away with
                  </span>
                  .
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Stagger className="flex flex-col">
                {study.outcomes.map((outcome, i) => (
                  <StaggerItem key={outcome.label}>
                    <div
                      className={`group flex gap-5 border-t border-ink/12 py-7 md:gap-7 ${
                        i === 0 ? "border-t-0 pt-0" : ""
                      }`}
                    >
                      <span
                        className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand-soft text-brand transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                        aria-hidden="true"
                      >
                        <Check className="size-3.5" strokeWidth={2.25} />
                      </span>
                      <div>
                        <h3 className="text-lg tracking-[-0.024em] text-ink">
                          {outcome.label}
                        </h3>
                        <p className="body-copy mt-2.5 max-w-[58ch]">
                          {outcome.body}
                        </p>
                      </div>
                      <span
                        className="eyebrow tnum ml-auto hidden shrink-0 text-ink-300 md:block"
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* The impact — the one big statement on the page */}
      <section className="grain relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_20%_0%,rgba(46,127,219,0.18),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="shell section relative">
          <Reveal>
            <Eyebrow index="04" onDark>
              The impact
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote className="mt-9 max-w-[42ch] text-display-sm leading-[1.18] tracking-[-0.03em] text-white">
              {study.impact}
            </blockquote>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="rule-on-dark mt-14 grid grid-cols-1 gap-x-12 gap-y-8 pt-8 md:grid-cols-3">
              <div>
                <h3 className="eyebrow text-white/50">Client</h3>
                <p className="mt-3 max-w-[30ch] text-base leading-snug text-white/75">
                  {study.client}
                </p>
              </div>
              <div>
                <h3 className="eyebrow text-white/50">Expertise involved</h3>
                <ul className="mt-3 space-y-1.5">
                  {study.areas.map((area) => (
                    <li key={area} className="text-base text-white/75">
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="eyebrow text-white/50">Capabilities applied</h3>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                  {study.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 text-eyebrow font-medium tracking-[0.02em] text-white/60"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Prev / next */}
      <section className="bg-paper py-10 md:py-14">
        <div className="shell">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:grid-cols-2">
            <Link
              href={`/impact/${previous.slug}`}
              className="group flex flex-col gap-3 bg-paper p-7 transition-colors duration-500 hover:bg-paper-2 md:p-8"
            >
              <span className="inline-flex items-center gap-2 text-ink-300">
                <ArrowLeft
                  className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="eyebrow">Previous</span>
              </span>
              <span className="max-w-[30ch] text-lg leading-snug tracking-[-0.022em] text-ink transition-colors duration-500 group-hover:text-brand md:text-lg">
                {previous.title}
              </span>
            </Link>

            <Link
              href={`/impact/${next.slug}`}
              className="group flex flex-col items-end gap-3 bg-paper p-7 text-right transition-colors duration-500 hover:bg-paper-2 md:p-8"
            >
              <span className="inline-flex items-center gap-2 text-ink-300">
                <span className="eyebrow">Next</span>
                <ArrowRight
                  className="size-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <span className="max-w-[30ch] text-lg leading-snug tracking-[-0.022em] text-ink transition-colors duration-500 group-hover:text-brand md:text-lg">
                {next.title}
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Similar problem?"
        title={
          <>
            If this is the problem
            <br />
            in front of you,{" "}
            <span className="accent-italic text-azure">
              talk to the partner
            </span>{" "}
            who led it.
          </>
        }
        body="We will tell you honestly how closely your situation matches, what we would do differently a second time, and what it would take."
        secondary={{ label: "All case studies", href: "/impact" }}
      />
    </>
  );
}
