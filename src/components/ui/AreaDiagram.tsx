/**
 * Four bespoke line diagrams, one per expertise area. Drawn on a shared field
 * with a common 1.4 stroke so they read as a set rather than four icons.
 * Accent strokes pick up the brand blue on hover via `group`.
 */

type Props = { className?: string };

const S = {
  base: "stroke-ink/25 transition-colors duration-700 group-hover:stroke-ink/40",
  accent:
    "stroke-brand/45 transition-colors duration-700 group-hover:stroke-brand",
  fillAccent:
    "fill-brand/20 transition-all duration-700 group-hover:fill-brand/60",
  fillBase: "fill-ink/15 transition-all duration-700 group-hover:fill-ink/25",
};

function Field({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 96 72"
      fill="none"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className ?? "h-[4.5rem] w-24"}
      aria-hidden="true"
      role="presentation"
    >
      {children}
    </svg>
  );
}

/** Data & AI — scattered sources resolving into one inference node. */
export function DiagramDataAI({ className }: Props) {
  return (
    <Field className={className}>
      {[
        [8, 12],
        [8, 30],
        [8, 48],
        [8, 62],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" className={S.fillBase} />
          <path d={`M${x + 5} ${y} C 24 ${y}, 30 37, 44 37`} className={S.base} />
        </g>
      ))}
      <circle cx="48" cy="37" r="9" className={S.accent} />
      <circle cx="48" cy="37" r="3.2" className={S.fillAccent} />
      <path d="M57 37h10" className={S.accent} />
      <path d="M67 21v32" className={S.base} />
      {[21, 30, 44, 53].map((y, i) => (
        <path key={i} d={`M67 ${y}h${i % 2 === 0 ? 21 : 14}`} className={S.base} />
      ))}
    </Field>
  );
}

/** Clinical Data & Standards — layered study data with a traceability spine. */
export function DiagramStandards({ className }: Props) {
  return (
    <Field className={className}>
      {[10, 26, 42, 58].map((y, i) => (
        <g key={y}>
          <rect x="10" y={y} width={70 - i * 6} height="9" rx="1.5" className={S.base} />
          <path d={`M${16 + i * 4} ${y + 4.5}h${18 - i * 2}`} className={i === 0 ? S.accent : S.base} />
        </g>
      ))}
      <path d="M86 14v49" className={S.accent} strokeDasharray="3 3" />
      {[14, 30, 46, 62].map((y) => (
        <circle key={y} cx="86" cy={y} r="2.4" className={S.fillAccent} />
      ))}
    </Field>
  );
}

/** Technology Strategy: a layered blueprint on a common baseline. */
export function DiagramBlueprint({ className }: Props) {
  return (
    <Field className={className}>
      <path d="M8 62h80" className={S.base} />
      <rect x="12" y="42" width="30" height="18" rx="2" className={S.base} />
      <rect x="48" y="42" width="36" height="18" rx="2" className={S.base} />
      <rect x="20" y="24" width="56" height="14" rx="2" className={S.accent} />
      <rect x="34" y="8" width="28" height="12" rx="2" className={S.base} />
      <path d="M27 38v4M48 38v4M69 38v4" className={S.base} />
      <path d="M48 20v4" className={S.accent} />
      <circle cx="48" cy="31" r="2.6" className={S.fillAccent} />
    </Field>
  );
}

/** Transformation — current state stepping to target through a handover arc. */
export function DiagramTransform({ className }: Props) {
  return (
    <Field className={className}>
      <circle cx="14" cy="52" r="7" className={S.base} />
      <circle cx="48" cy="52" r="7" className={S.base} />
      <circle cx="82" cy="52" r="7" className={S.accent} />
      <circle cx="82" cy="52" r="2.6" className={S.fillAccent} />
      <path d="M21 52h20M55 52h20" className={S.base} />
      <path d="M14 45C14 22 48 22 48 45" className={S.accent} strokeDasharray="3 3" />
      <path d="M48 45C48 14 82 14 82 45" className={S.accent} strokeDasharray="3 3" />
      <path d="M8 66h80" className={S.base} strokeDasharray="2 4" />
    </Field>
  );
}

export const diagrams = {
  brain: DiagramDataAI,
  database: DiagramStandards,
  blueprint: DiagramBlueprint,
  transform: DiagramTransform,
} as const;
