import { Check } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { audiences } from "@/content/audiences";

/**
 * The three sided proposition, as one grid. Shared by the homepage network
 * section and the network page so the argument reads identically in both
 * places rather than drifting into two versions of itself.
 *
 * At three up the cards are a row subgrid: the label, the situation and the
 * "what changes" list each share a track across all three, so the lists start
 * on the same line even though the paragraphs above them differ in length.
 */
export function ThreeSides() {
  return (
    <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-brand/20 bg-brand/15 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-y-0">
      {audiences.map((audience) => (
        <StaggerItem
          key={audience.index}
          as="article"
          className="group grid bg-brand-soft p-6 transition-colors duration-700 hover:bg-white md:p-7 lg:row-span-4 lg:grid-rows-subgrid"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="eyebrow tnum text-ink-400">{audience.index}</span>
            <span className="eyebrow text-brand">For {audience.who}</span>
          </div>

          <h4 className="mt-6 max-w-[22ch] text-[1.0625rem] leading-tight tracking-[-0.024em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.1875rem]">
            {audience.label}
          </h4>

          <p className="mt-4 max-w-[40ch] text-[0.875rem] leading-relaxed text-ink-600">
            {audience.problem}
          </p>

          <div className="mt-7 border-t border-brand/20 pt-5">
            <h5 className="eyebrow text-brand">What changes</h5>
            <ul className="mt-4 flex flex-col gap-2.5">
              {audience.gains.map((gain) => (
                <li
                  key={gain}
                  className="flex gap-2.5 text-[0.8125rem] leading-snug text-ink"
                >
                  <Check
                    className="mt-[0.1875rem] size-3 shrink-0 text-brand"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  {gain}
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
