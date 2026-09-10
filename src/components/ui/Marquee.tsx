import type { ReactNode } from "react";

/**
 * Infinite horizontal scroller. Renders the child set twice and translates by
 * -50%, which keeps the loop seamless without measuring anything.
 */
export function Marquee({
  items,
  duration = 46,
  separator = "·",
  onDark = false,
  className = "",
}: {
  items: readonly string[] | ReactNode[];
  duration?: number;
  separator?: string;
  onDark?: boolean;
  className?: string;
}) {
  const run = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`eyebrow whitespace-nowrap ${
              onDark ? "text-white/60" : "text-ink-400"
            }`}
          >
            {item}
          </span>
          <span
            className={`px-6 text-xs ${
              onDark ? "text-azure/50" : "text-brand/40"
            }`}
          >
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {run}
        {run}
      </div>
    </div>
  );
}
