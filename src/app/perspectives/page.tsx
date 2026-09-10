import { Fragment } from "react";
import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem, DrawRule } from "@/components/motion/Reveal";
import { perspectives } from "@/content/perspectives";
import { formatDate } from "@/lib/format";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Perspectives",
  description:
    "Short, specific pieces on life sciences data, AI governance, clinical standards and technology strategy, written by the experts who deliver the work.",
};

const [lead, ...rest] = perspectives;

function requestLink(title: string) {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(
    `Perspectives: ${title}`,
  )}&body=${encodeURIComponent(
    `Hello HTP42,\n\nI'd like to read the full piece: "${title}".\n\nName:\nOrganisation:\nRole:\n`,
  )}`;
}

export default function PerspectivesPage() {
  const categories = [...new Set(perspectives.map((p) => p.category))];

  return (
    <>
      <PageHero
        eyebrow="Perspectives"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Perspectives", href: "/perspectives" },
        ]}
        titleLines={[
          "Specific arguments",
          "about specific",
          <Fragment key="accent">
            problems.{" "}
            <span className="accent-italic text-azure">No trend reports.</span>
          </Fragment>,
        ]}
        lead="Every piece comes out of work we have actually done, written by the expert who did it. Full versions are sent on request."
        facts={[
          { label: "Pieces", value: String(perspectives.length) },
          { label: "Topics", value: String(categories.length) },
          { label: "Authors", value: "HTP42 experts" },
          { label: "Cadence", value: "Roughly monthly" },
        ]}
      />

      {/* Lead piece */}
      <section className="section-sm bg-paper">
        <div className="shell">
          <DrawRule />
          <article id={lead.slug} className="scroll-mt-28 pt-8">
            <div className="grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Reveal>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <Eyebrow>{lead.category}</Eyebrow>
                    <span className="eyebrow text-ink-300">
                      {lead.readTime}
                    </span>
                    <span className="eyebrow text-ink-300">
                      {formatDate(lead.date)}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.06}>
                  <h2 className="mt-7 max-w-[24ch] text-display-sm tracking-[-0.032em] text-ink md:text-[clamp(2rem,1.2rem+2.2vw,3.25rem)]">
                    {lead.title}
                  </h2>
                </Reveal>

                <Reveal delay={0.12}>
                  <p className="lead mt-7 max-w-2xl">{lead.standfirst}</p>
                </Reveal>
              </div>

              <div className="flex flex-col justify-end lg:col-span-4">
                <Reveal delay={0.16}>
                  <div className="rule pt-6">
                    <h3 className="eyebrow text-ink-300">Written by</h3>
                    <p className="mt-3 text-[0.9375rem] font-medium tracking-[-0.012em] text-ink">
                      {lead.author}
                    </p>
                    <a
                      href={requestLink(lead.title)}
                      className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-2.5 text-[0.8125rem] font-medium text-paper transition-colors duration-500 hover:bg-brand"
                    >
                      <Mail className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                      Request the full piece
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* The rest */}
      <section className="section bg-paper-2">
        <div className="shell">
          <SectionHeader
            index="02"
            eyebrow="More perspectives"
            title={
              <>
                Everything else{" "}
                <span className="accent-italic text-brand">
                  we&apos;ve published
                </span>
                .
              </>
            }
            lead="If a title is relevant to something you are working on, ask and we will send it across."
          />

          <Stagger className="mt-14 flex flex-col md:mt-16">
            {rest.map((piece, i) => (
              <StaggerItem key={piece.slug}>
                <article
                  id={piece.slug}
                  className={`group scroll-mt-28 border-t border-ink/12 py-8 md:py-10 ${
                    i === rest.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <div className="flex items-baseline gap-4">
                        <span className="eyebrow tnum text-ink-300">
                          0{i + 2}
                        </span>
                        <span className="eyebrow text-brand">
                          {piece.category}
                        </span>
                      </div>
                      <p className="mt-4 text-[0.8125rem] text-ink-300">
                        {formatDate(piece.date)} · {piece.readTime}
                      </p>
                    </div>

                    <div className="lg:col-span-6">
                      <h3 className="max-w-[30ch] text-[1.25rem] leading-[1.16] tracking-[-0.028em] text-ink md:text-[1.5rem]">
                        {piece.title}
                      </h3>
                      <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-600">
                        {piece.standfirst}
                      </p>
                      <p className="mt-4 text-[0.8125rem] text-ink-400">
                        {piece.author}
                      </p>
                    </div>

                    <div className="flex items-start lg:col-span-3 lg:justify-end">
                      <a
                        href={requestLink(piece.title)}
                        className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-4 py-2 text-[0.8125rem] font-medium text-ink transition-all duration-500 hover:border-brand hover:bg-brand hover:text-white"
                      >
                        <Mail
                          className="size-3.5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        Request
                      </a>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        eyebrow="Briefings"
        title={
          <>
            We also convene these
            <br />
            conversations{" "}
            <span className="accent-italic text-azure">off the record.</span>
          </>
        }
        body="HTP42 runs expert convenings under the Chatham House Rule and bespoke executive meetings for up to fifty participants in Basel, Paris, Nice, Cannes and Singapore. Ask about the next one."
        primary={{ label: "Ask about a briefing", href: "/contact" }}
        secondary={{ label: "Our expertise", href: "/expertise" }}
      />
    </>
  );
}
