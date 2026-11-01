"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { caseStudies, type CaseStudy } from "@/content/cases";
import { copy } from "@/content/copy";

/**
 * The engagements, in full, on the one page there is.
 *
 * Each is a row that opens where it stands. Written out flat this section runs
 * to several screens on its own and buries everything below it; collapsed, the
 * whole body of work is one screen you can scan, and the detail is one click
 * from the line that interested you. That is the only reason this is an
 * accordion rather than seven stacked articles.
 *
 * Several can be open at once, deliberately: the common reason to open a
 * second is to compare it with the first.
 */
export function ClientImpact() {
  const [open, setOpen] = useState<string[]>([]);
  const reduced = useReducedMotionSafe();

  const toggle = (slug: string) =>
    setOpen((was) =>
      was.includes(slug) ? was.filter((s) => s !== slug) : [...was, slug],
    );

  return (
    <section id="impact" className="section bg-paper-2">
      <div className="shell">
        <SectionHeader
          index="04"
          eyebrow={copy.home.cases.eyebrow}
          title={copy.home.cases.title}
          lead={copy.home.cases.lead}
        />

        <Stagger className="mt-14 border-t border-ink/12 md:mt-16">
          {caseStudies.map((study, i) => (
            <StaggerItem key={study.slug}>
              <Row
                study={study}
                index={i + 1}
                open={open.includes(study.slug)}
                onToggle={() => toggle(study.slug)}
                reduced={reduced}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Row({
  study,
  index,
  open,
  onToggle,
  reduced,
}: {
  study: CaseStudy;
  index: number;
  open: boolean;
  onToggle: () => void;
  reduced: boolean;
}) {
  const panelId = `case-${study.slug}`;
  const buttonId = `${panelId}-control`;

  return (
    <div className="border-b border-ink/12">
      <h3>
        <button
          type="button"
          id={buttonId}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start gap-5 py-6 text-left transition-colors duration-500 hover:bg-brand/[0.025] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:gap-8 md:py-7"
        >
          <span className="eyebrow tnum mt-1.5 w-7 shrink-0 text-ink-300">
            {String(index).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-lg leading-tight tracking-[-0.024em] text-ink transition-colors duration-500 group-hover:text-brand md:text-xl">
                {study.title}
              </span>
              <span className="eyebrow text-brand">{study.year}</span>
            </span>

            <span className="mt-2 block text-xs leading-snug font-medium text-ink-400">
              {study.kicker}
            </span>

            {/* The one line consequence, and who and how long. Both are
                closed captions on a phone: four wrapped lines each, times
                seven engagements, is three screens of list to scroll past
                before anything else on the page. They come back the moment
                the row is open. */}
            <span className="mt-3 hidden max-w-[62ch] text-sm leading-relaxed text-ink-600 sm:block">
              {study.headline}
            </span>

            <span className="mt-3 hidden text-xs text-ink-300 sm:block">
              {study.clientType} · {study.duration} · {study.team}
            </span>
          </span>

          {/* A plus that becomes a minus. Two strokes rather than a swapped
              icon, so the change is one rotation and never a reflow. */}
          <span
            className="relative mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-500 group-hover:border-brand group-hover:text-brand"
            aria-hidden="true"
          >
            <Plus
              className={`size-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                open ? "rotate-[135deg]" : ""
              }`}
              strokeWidth={1.75}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: reduced ? 0 : 0.3 },
            }}
            className="overflow-hidden"
          >
            <Detail study={study} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Detail({ study }: { study: CaseStudy }) {
  return (
    <div className="pb-10 md:pb-12 md:pl-[3.25rem]">
      {/* On a phone the row above shows neither of these, so the panel opens
          with them. */}
      <p className="mb-7 max-w-[62ch] text-sm leading-relaxed text-ink-600 sm:hidden">
        {study.headline}
      </p>
      <p className="mb-7 text-xs text-ink-300 sm:hidden">
        {study.clientType} · {study.duration} · {study.team}
      </p>

      {/* What it moved */}
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-3">
        {study.metrics.map((m) => (
          <div key={m.label} className="bg-paper px-6 py-6">
            <dt className="sr-only">{m.label}</dt>
            <dd>
              <span className="block text-figure leading-none tracking-[-0.03em] text-brand">
                {m.value}
              </span>
              <span className="mt-3 block text-xs leading-snug text-ink-400">
                {m.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
        <Part heading="The problem" lead={study.challenge} body={study.challengeDetail} />
        <Part heading="What we did" lead={study.approach} body={study.approachDetail} />
      </div>

      <div className="mt-10">
        <p className="eyebrow text-ink-300">What changed</p>
        <dl className="mt-5 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
          {study.outcomes.map((o) => (
            <div key={o.label} className="border-t border-ink/[0.09] pt-4">
              <dt className="text-base leading-snug font-medium tracking-[-0.012em] text-ink">
                {o.label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-400">
                {o.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-10 max-w-[70ch] border-l-2 border-brand/30 pl-5 text-base leading-relaxed text-ink-600">
        {study.impact}
      </p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-ink/12 px-3 py-1 text-eyebrow font-medium tracking-[0.02em] text-ink-400"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Part({
  heading,
  lead,
  body,
}: {
  heading: string;
  lead: string;
  body: string[];
}) {
  return (
    <div>
      <p className="eyebrow text-ink-300">{heading}</p>
      <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-ink">
        {lead}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {body.map((line) => (
          <li key={line} className="flex gap-3">
            <span
              className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-brand/50"
              aria-hidden="true"
            />
            <span className="max-w-[58ch] text-sm leading-relaxed text-ink-400">
              {line}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
