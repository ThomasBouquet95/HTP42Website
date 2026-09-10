import type { ReactNode } from "react";

/**
 * The section label: mono, uppercase, optionally prefixed with an index.
 * The small leading rule is what ties it to the grid.
 */
export function Eyebrow({
  children,
  index,
  onDark = false,
  className = "",
  withRule = true,
}: {
  children: ReactNode;
  index?: string;
  onDark?: boolean;
  className?: string;
  withRule?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline gap-3 ${
        onDark ? "text-azure" : "text-brand"
      } ${className}`}
    >
      {withRule && (
        <span
          className={`mb-[0.3em] h-px w-6 shrink-0 ${
            onDark ? "bg-azure/50" : "bg-brand/40"
          }`}
          aria-hidden="true"
        />
      )}
      {index && (
        <span
          className={`eyebrow tnum ${
            onDark ? "text-white/50" : "text-ink-300"
          }`}
        >
          {index}
        </span>
      )}
      <span className="eyebrow">{children}</span>
    </div>
  );
}
