"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudy } from "@/content/cases";

/**
 * Engagement examples as a slider. Seven full width rows took more space than
 * they earned this high on the page, and only three of them were shown. A
 * snapping track shows all seven in the room a single row used to occupy.
 *
 * Built on native scroll snap rather than a JS carousel: it stays keyboard
 * scrollable, works with touch and trackpad, degrades to a plain scroller,
 * and never autoplays.
 */
export function FeaturedCases({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const page = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // One card plus its gap, so paging lands on a snap point.
    const card = el.querySelector("article");
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section className="section bg-paper-2">
      <div className="shell">
        <SectionHeader
          index="04"
          eyebrow="Client impact"
          title={
            <>
              Engagement examples.{" "}
              <span className="accent-italic text-brand">
                Problem, intervention,
              </span>{" "}
              consequence.
            </>
          }
          lead="We do not name clients, but each of these is written the way we would present it internally, including what was hard."
        />

        {/* Controls */}
        <Reveal delay={0.08}>
          <div className="mt-12 flex items-center justify-between gap-6 border-b border-ink/12 pb-5">
            <p className="eyebrow text-ink-300">
              {caseStudies.length} engagements
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => page(-1)}
                disabled={atStart}
                aria-label="Previous engagements"
                className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 hover:border-brand hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowLeft className="size-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => page(1)}
                disabled={atEnd}
                aria-label="More engagements"
                className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 hover:border-brand hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Track */}
        <Reveal delay={0.12}>
          <div
            ref={trackRef}
            tabIndex={0}
            role="group"
            aria-label="Engagement examples, scrollable"
            className="-mx-5 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {caseStudies.map((study, i) => (
              <article
                key={study.slug}
                className="group w-[19rem] shrink-0 snap-start sm:w-[21rem] lg:w-[23rem]"
              >
                <Link
                  href={`/impact/${study.slug}`}
                  className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-6 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_12px_32px_-16px_rgba(10,15,28,0.18)] md:p-7"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="eyebrow tnum text-ink-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow text-brand">{study.year}</span>
                  </div>

                  <h3 className="mt-6 text-lg leading-tight tracking-[-0.024em] text-ink transition-colors duration-500 group-hover:text-brand md:text-lg">
                    {study.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-snug font-medium text-ink-400">
                    {study.kicker}
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-ink-600">
                    {study.headline}
                  </p>

                  <div className="mt-auto pt-7">
                    <dl className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-ink/[0.09] pt-4">
                      <div className="flex gap-1.5">
                        <dt className="sr-only">Client</dt>
                        <dd className="text-xs text-ink-400">
                          {study.clientType}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="text-xs text-ink-300">
                        {study.duration} · {study.team}
                      </span>
                      <ArrowUpRight
                        className="arrow-step size-3.5 text-ink-300 transition-colors duration-500 group-hover:text-brand"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10">
            <ArrowLink href="/impact">Read the full case studies</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
