"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaseRow } from "@/components/ui/CaseRow";
import { caseStudies } from "@/content/cases";
import { expertiseAreas } from "@/content/expertise";

const EASE = [0.16, 1, 0.3, 1] as const;
const ALL = "All engagements";

/**
 * Filters the case list by expertise area. Client side and instant: with seven
 * studies there is nothing to fetch, so the interaction should feel free.
 */
export function CaseFilter() {
  const [active, setActive] = useState<string>(ALL);
  const reduced = useReducedMotion();

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const study of caseStudies) {
      for (const area of study.areas) {
        counts.set(area, (counts.get(area) ?? 0) + 1);
      }
    }
    return [
      { label: ALL, count: caseStudies.length },
      ...expertiseAreas
        .filter((a) => counts.has(a.name))
        .map((a) => ({ label: a.name, count: counts.get(a.name) ?? 0 })),
    ];
  }, []);

  const shown =
    active === ALL
      ? caseStudies
      : caseStudies.filter((c) => c.areas.includes(active));

  return (
    <section aria-labelledby="all-cases-heading" className="section bg-paper">
      <div className="shell">
        <h2 id="all-cases-heading" className="sr-only">
          All case studies
        </h2>

        {/* Filter rail */}
        <div className="flex flex-col gap-5 border-b border-ink/12 pb-7 md:flex-row md:items-end md:justify-between">
          <div
            role="group"
            aria-label="Filter case studies by expertise"
            className="flex flex-wrap gap-2"
          >
            {filters.map((filter) => {
              const on = active === filter.label;
              return (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => setActive(filter.label)}
                  aria-pressed={on}
                  className={`group inline-flex items-baseline gap-2 rounded-full border px-4 py-2 text-[0.8125rem] font-medium tracking-[-0.006em] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/12 text-ink-600 hover:border-ink/35 hover:bg-ink/[0.03]"
                  }`}
                >
                  {filter.label}
                  <span
                    className={`eyebrow tnum ${
                      on ? "text-paper/50" : "text-ink-300"
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>

          <p
            className="eyebrow shrink-0 text-ink-300"
            aria-live="polite"
            aria-atomic="true"
          >
            Showing {shown.length} of {caseStudies.length}
          </p>
        </div>

        {/* Rows */}
        <div className="mt-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((study, i) => (
              <motion.div
                key={study.slug}
                layout={!reduced}
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.45, delay: i * 0.03, ease: EASE }}
              >
                <CaseRow
                  study={study}
                  index={i + 1}
                  isLast={i === shown.length - 1}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
