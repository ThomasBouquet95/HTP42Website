"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { NetworkField } from "@/components/ui/NetworkField";
import { RevealLines } from "@/components/motion/Reveal";
import { capabilityKeywords } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const HERO_FACTS = [
  { value: "40+", label: "Senior experts on call" },
  { value: "200+", label: "Engagements delivered" },
  { value: "Basel", label: "Founded by former Novartis leadership" },
];

export function HomeHero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // A slow lift on the graphic only — the type stays put so it never blurs.
  const fieldY = useTransform(scrollY, [0, 700], [0, -70]);
  const fieldOpacity = useTransform(scrollY, [0, 520], [1, 0.25]);

  return (
    <section className="grain relative flex min-h-[clamp(38rem,92svh,58rem)] flex-col justify-end overflow-hidden bg-ink pt-28 pb-0 md:pt-32">
      {/* Ambient field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(115%_75%_at_78%_0%,rgba(46,127,219,0.26),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_55%_at_-8%_100%,rgba(20,80,200,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.035)_0_1px,transparent_1px_8.3333%)]" />
      </div>

      {/* Constellation */}
      <motion.div
        style={reduced ? undefined : { y: fieldY, opacity: fieldOpacity }}
        className="pointer-events-none absolute top-[2%] -right-[48%] w-[30rem] max-w-none opacity-[0.18] sm:-right-[16%] sm:w-[34rem] sm:opacity-45 lg:top-[4%] lg:right-[-4%] lg:w-[42rem] lg:opacity-100 xl:right-[2%] xl:w-[46rem]"
        aria-hidden="true"
      >
        <NetworkField className="h-auto w-full" />
      </motion.div>

      <div className="shell relative w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Eyebrow onDark>Life sciences · Data &amp; AI</Eyebrow>
          </motion.div>

          <h1 className="mt-7 text-display-lg leading-[0.98] text-white lg:text-display-xl">
            <RevealLines
              delay={0.14}
              stagger={0.1}
              lines={[
                "Life sciences data",
                "and AI, led by the",
                <>
                  people who{" "}
                  <span className="accent-italic text-azure">built it</span>
                </>,
                <span key="l4" className="accent-italic text-azure">
                  inside pharma.
                </span>,
              ]}
            />
          </h1>

          <motion.p
            className="lead mt-8 max-w-xl text-white/60"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          >
            A senior expert network for clinical data, AI, technology strategy
            and digital transformation.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.66, ease: EASE }}
          >
            <Button
              href="/contact"
              variant="light"
              size="lg"
              withArrow
            >
              Start a conversation
            </Button>
            <Button href="/impact" variant="outline-dark" size="lg">
              See client impact
            </Button>
          </motion.div>
        </div>

        {/* Quiet fact rail */}
        <motion.dl
          className="rule-on-dark mt-14 grid grid-cols-1 gap-x-10 gap-y-6 pt-7 sm:grid-cols-3 md:mt-16"
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        >
          {HERO_FACTS.map((fact) => (
            <div key={fact.label} className="flex items-baseline gap-3.5">
              <dt className="text-2xl font-medium tracking-[-0.03em] text-white tnum">
                {fact.value}
              </dt>
              <dd className="max-w-[16ch] text-[0.8125rem] leading-snug text-white/60">
                {fact.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Capability marquee on the section seam */}
      <motion.div
        className="rule-on-dark relative mt-12 py-5 md:mt-14"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 1, delay: 0.95 }}
      >
        <Marquee items={capabilityKeywords} onDark duration={58} />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="pointer-events-none absolute right-5 bottom-24 hidden items-center gap-2.5 lg:flex xl:right-16"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-hidden="true"
      >
        <span className="eyebrow text-white/50">Scroll</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-3.5 text-azure/60" strokeWidth={1.75} />
        </motion.span>
      </motion.div>
    </section>
  );
}
