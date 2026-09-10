import Link from "next/link";

/**
 * The HTP42 mark: a lemniscate (∞) drawn as a single continuous stroke —
 * the "42" reference sits in the wordmark rather than the glyph.
 */
export function Mark({
  className = "h-6 w-auto",
  stroke = "currentColor",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 44 22"
      fill="none"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M22 11c3.2-5.6 6.1-8.5 9.9-8.5 5 0 8.6 3.8 8.6 8.5s-3.6 8.5-8.6 8.5c-3.8 0-6.7-2.9-9.9-8.5-3.2-5.6-6.1-8.5-9.9-8.5C7.1 2.5 3.5 6.3 3.5 11s3.6 8.5 8.6 8.5c3.8 0 6.7-2.9 9.9-8.5Z"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="HealthTechPartners 42 — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <Mark
        className={`h-[1.15rem] w-auto transition-colors duration-500 ${
          onDark ? "text-azure" : "text-brand"
        }`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.9375rem] font-semibold tracking-[-0.022em] ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          HealthTech
        </span>
        <span
          className={`mt-[0.15rem] text-[0.6875rem] font-medium tracking-[0.055em] uppercase ${
            onDark ? "text-white/55" : "text-ink-400"
          }`}
        >
          Partners 42
        </span>
      </span>
    </Link>
  );
}
