"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds. Stacks with any parent Stagger. */
  delay?: number;
  /** Distance travelled, px. */
  y?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  once?: boolean;
};

/**
 * The workhorse scroll reveal: a short, restrained rise. Deliberately subtle —
 * on a consulting site the motion should register as polish, not as an effect.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  duration = 0.7,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

const staggerParent: Variants = {
  hidden: {},
  shown: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Wrap a list; each direct <StaggerItem> child rises in sequence. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={staggerParent}
      custom={stagger}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px -6% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={staggerChild}>
      {children}
    </MotionTag>
  );
}

/**
 * Line-by-line headline reveal. Each line is clipped and rises from its own
 * mask, which reads far more editorially than a word-by-word fade.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.06em", marginBottom: "-0.06em" }}
        >
          {reduced ? (
            <span className={lineClassName}>{line}</span>
          ) : (
            <motion.span
              className={`block ${lineClassName ?? ""}`}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.95,
                delay: delay + i * stagger,
                ease: EASE,
              }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}

/** A hairline that draws itself across on entry. Used as a section opener. */
export function DrawRule({
  className = "",
  delay = 0,
  onDark = false,
}: {
  className?: string;
  delay?: number;
  onDark?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`h-px w-full origin-left ${
        onDark ? "bg-white/18" : "bg-ink/12"
      } ${className}`}
      initial={reduced ? undefined : { scaleX: 0 }}
      whileInView={reduced ? undefined : { scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}
