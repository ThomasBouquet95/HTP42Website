import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/cases";

/**
 * The canonical case-study row: an indexed editorial line, meta rail on the
 * left, the claim on the right. Used on the homepage and the impact index so
 * the two read as the same publication.
 */
export function CaseRow({
  study,
  index,
  isLast = false,
}: {
  study: CaseStudy;
  index: number;
  /** Each row is wrapped for animation, so `last:` cannot resolve here. */
  isLast?: boolean;
}) {
  return (
    <Link
      href={`/impact/${study.slug}`}
      className={`group relative block border-t border-ink/12 py-8 transition-colors duration-700 md:py-10 ${
        isLast ? "border-b" : ""
      }`}
    >
      {/* Hover wash — bleeds slightly past the gutters so it reads as a band. */}
      <span
        className="pointer-events-none absolute -inset-x-4 inset-y-0 -z-10 rounded-sm bg-brand/[0.035] opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:-inset-x-6"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
        {/* Meta rail */}
        <div className="lg:col-span-3">
          <div className="flex items-baseline gap-4">
            <span className="eyebrow tnum text-ink-300">
              {String(index).padStart(2, "0")}
            </span>
            <span className="eyebrow text-brand">{study.year}</span>
          </div>
          <p className="mt-4 max-w-[24ch] text-[0.8125rem] leading-snug text-ink-400">
            {study.clientType}
          </p>
          <p className="mt-2.5 text-[0.8125rem] text-ink-300">
            {study.duration} · {study.team}
          </p>
        </div>

        {/* Claim */}
        <div className="lg:col-span-8">
          <h3 className="text-[1.375rem] leading-[1.12] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.75rem] lg:text-[2rem]">
            {study.title}
          </h3>
          <p className="mt-2.5 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink-400">
            {study.kicker}
          </p>
          <p className="mt-5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-600">
            {study.headline}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-ink/10 px-3 py-1 text-[0.6875rem] font-medium tracking-[0.02em] text-ink-400 transition-colors duration-700 group-hover:border-brand/25 group-hover:text-ink-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Affordance */}
        <div className="flex items-start lg:col-span-1 lg:justify-end">
          <span
            className="inline-flex size-10 items-center justify-center rounded-full border border-ink/12 text-ink transition-all duration-700 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowRight className="arrow-step size-4" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </Link>
  );
}
