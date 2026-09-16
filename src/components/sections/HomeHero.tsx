"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { NetworkField } from "@/components/ui/NetworkField";
import { usePointerField } from "@/components/motion/usePointerField";
import { RevealLines } from "@/components/motion/Reveal";
import { capabilityKeywords } from "@/content/site";
import { Accent } from "@/components/ui/Accent";
import { copy } from "@/content/copy";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Centres a layer on the cursor. Written once because the light and the grid
 * window have to sit on exactly the same point. */
const GLOW_AT =
  "translate3d(var(--pointer-x, 0px), var(--pointer-y, 0px), 0) translate(-50%, -50%)";

const REVEAL_MASK =
  "radial-gradient(closest-side, #000 0%, rgba(0,0,0,0.4) 48%, transparent 74%)";


export function HomeHero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // The cursor drives two things: the light and grid below, through CSS custom
  // properties, and the constellation itself, which reads the ref inside its
  // own animation frame. Neither route re-renders this component.
  const {
    ref: sectionRef,
    styleRef: ambientRef,
    pointer,
  } = usePointerField<HTMLElement>(!reduced);

  // A slow lift on the graphic only — the type stays put so it never blurs.
  const fieldY = useTransform(scrollY, [0, 700], [0, -70]);
  const fieldOpacity = useTransform(scrollY, [0, 520], [1, 0.25]);

  return (
    <section
      ref={sectionRef}
      className="grain relative flex min-h-[clamp(38rem,92svh,58rem)] flex-col justify-end overflow-hidden bg-ink pt-28 pb-0 md:pt-32"
    >
      {/* Ambient field. overflow-clip because the cursor layers inside are
          deliberately larger than the hero and get moved past its edges, and
          must not extend the section's scroll box. */}
      <div
        ref={ambientRef}
        className="pointer-events-none absolute inset-0 overflow-clip"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(115%_75%_at_78%_0%,rgba(46,127,219,0.26),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_55%_at_-8%_100%,rgba(20,80,200,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.035)_0_1px,transparent_1px_8.3333%)]" />

        {/* Under the cursor: a light, and the structure it falls on. The grid
            is the same 12 columns already in the layer above, drawn brighter
            and crossed with rules, so the pointer looks like it is uncovering
            the page's own construction rather than painting on top of it.

            Both layers are a fixed size moved by transform, rather than a
            gradient whose position changes. A moving gradient repaints the
            full width of the hero on every frame; a moving layer is handed to
            the compositor and costs nothing per frame. That difference is the
            whole reason this is three nested elements rather than one. */}
        <div
          className="absolute top-0 left-0 size-[48rem] transition-opacity duration-500 ease-out"
          style={{
            opacity: "var(--pointer-on, 0)",
            transform: GLOW_AT,
            willChange: "transform",
            background:
              "radial-gradient(closest-side, rgba(30,145,249,0.30), transparent 72%)",
          }}
        />
        <div
          className="absolute top-0 left-0 size-[34rem] transition-opacity duration-500 ease-out"
          style={{
            opacity: "var(--pointer-on, 0)",
            transform: GLOW_AT,
            willChange: "transform",
            maskImage: REVEAL_MASK,
            WebkitMaskImage: REVEAL_MASK,
          }}
        >
          {/* The rules themselves. Their origin is pushed back to the hero's
              own, so they stay locked to the page grid while the window over
              them moves — and the column pitch is the hero's width over
              twelve, matching the faint grid in the layer above exactly. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(255,255,255,0.20) 0 1px, transparent 1px calc(var(--pointer-w, 100vw) / 12)), repeating-linear-gradient(to bottom, rgba(255,255,255,0.14) 0 1px, transparent 1px 7.5rem)",
              backgroundPosition:
                "calc(17rem - var(--pointer-x, 0px)) calc(17rem - var(--pointer-y, 0px))",
            }}
          />
        </div>
      </div>

      {/* Constellation */}
      <motion.div
        style={reduced ? undefined : { y: fieldY, opacity: fieldOpacity }}
        className="pointer-events-none absolute top-[2%] -right-[48%] w-[30rem] max-w-none opacity-[0.18] sm:-right-[16%] sm:w-[34rem] sm:opacity-45 lg:top-[4%] lg:right-[-4%] lg:w-[42rem] lg:opacity-100 xl:right-[2%] xl:w-[46rem]"
        aria-hidden="true"
      >
        <NetworkField className="h-auto w-full" pointer={pointer} />
      </motion.div>

      <div className="shell relative w-full">
        <div className="max-w-4xl">

          <h1 className="text-display-lg leading-[0.98] text-white lg:text-display-xl">
            <RevealLines
              delay={0.14}
              stagger={0.1}
              lines={copy.home.heroLines.map((line, i) => (
                <Accent key={i} text={line} onDark />
              ))}
            />
          </h1>

          <motion.p
            className="lead mt-8 max-w-xl text-white/60"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          >
            {copy.home.heroLead}
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
              {copy.ui.startConversation}
            </Button>
            <Button href="/impact" variant="outline-dark" size="lg">
              {copy.ui.seeClientImpact}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Capability marquee on the section seam */}
      <motion.div
        className="rule-on-dark relative mt-20 py-5 md:mt-24"
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
