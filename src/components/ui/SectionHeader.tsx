import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal, DrawRule } from "@/components/motion/Reveal";

/**
 * The site's canonical section opener: a drawn rule, an indexed eyebrow, a
 * large headline on the left and the lead paragraph set on the right at a
 * comfortable measure. Repeating this exactly is what makes the site read as
 * one system rather than a stack of blocks.
 */
export function SectionHeader({
  eyebrow,
  index,
  title,
  lead,
  aside,
  onDark = false,
  align = "split",
  className = "",
}: {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  onDark?: boolean;
  align?: "split" | "center" | "stack";
  className?: string;
}) {
  if (align === "center") {
    return (
      <div className={`mx-auto max-w-3xl text-center ${className}`}>
        <Reveal>
          <div className="flex justify-center">
            <Eyebrow index={index} onDark={onDark}>
              {eyebrow}
            </Eyebrow>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className={`mt-6 text-display-sm md:text-display ${
              onDark ? "text-white" : "text-ink"
            }`}
          >
            {title}
          </h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.12}>
            <p
              className={`lead mx-auto mt-6 max-w-2xl ${
                onDark ? "text-white/60" : ""
              }`}
            >
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <DrawRule onDark={onDark} />
      <div className="grid grid-cols-1 gap-x-12 gap-y-7 pt-7 lg:grid-cols-12 lg:pt-9">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow index={index} onDark={onDark}>
              {eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className={`mt-6 max-w-[22ch] text-display-sm md:text-display ${
                onDark ? "text-white" : "text-ink"
              }`}
            >
              {title}
            </h2>
          </Reveal>
        </div>
        {(lead || aside) && (
          <div className="lg:col-span-5 lg:pt-2">
            {lead && (
              <Reveal delay={0.12}>
                <p className={`lead ${onDark ? "text-white/60" : ""}`}>
                  {lead}
                </p>
              </Reveal>
            )}
            {aside && <Reveal delay={0.18}>{aside}</Reveal>}
          </div>
        )}
      </div>
    </div>
  );
}
