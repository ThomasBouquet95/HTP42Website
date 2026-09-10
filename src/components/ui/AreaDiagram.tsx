/**
 * Four bespoke line diagrams, one per expertise area. Drawn on a shared field
 * so they read as a set rather than four icons. Accent strokes pick up the
 * brand blue on hover via `group`.
 *
 * On stroke weight: the field is 96 units wide but renders at 54px on the
 * homepage cards, so a stroke set in user units came out under a pixel there
 * and disappeared. The `diagram` class holds the stroke at a constant device
 * width instead, so these read the same at 40px as at 96px. The opacities are
 * set for contrast too: the previous base stroke measured 1.76:1 against
 * paper, well under the 3:1 that a meaningful graphic needs.
 */

type Props = { className?: string };

const S = {
  base: "stroke-ink/50 transition-colors duration-700 group-hover:stroke-ink/70",
  accent:
    "stroke-brand/75 transition-colors duration-700 group-hover:stroke-brand",
  fillAccent:
    "fill-brand/70 transition-all duration-700 group-hover:fill-brand",
  fillBase: "fill-ink/45 transition-all duration-700 group-hover:fill-ink/65",
};

function Field({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 96 72"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`diagram ${className ?? "h-[4.5rem] w-24"}`}
      aria-hidden="true"
      role="presentation"
    >
      {children}
    </svg>
  );
}

/** Data & AI: scattered sources resolving into one inference node. */
export function DiagramDataAI({ className }: Props) {
  return (
    <Field className={className}>
      {[14, 36, 58].map((y) => (
        <g key={y}>
          <circle cx="9" cy={y} r="3.6" className={S.fillBase} />
          <path
            d={`M14 ${y} C 26 ${y}, 30 36, 42 36`}
            className={S.base}
          />
        </g>
      ))}
      <circle cx="48" cy="36" r="10" className={S.accent} />
      <circle cx="48" cy="36" r="3.6" className={S.fillAccent} />
      <path d="M58 36h8" className={S.accent} />
      <path d="M66 20v32" className={S.base} />
      {[20, 36, 52].map((y, i) => (
        <path key={y} d={`M66 ${y}h${i === 1 ? 14 : 22}`} className={S.base} />
      ))}
    </Field>
  );
}

/** Clinical Data & Standards: layered study data with a traceability spine. */
export function DiagramStandards({ className }: Props) {
  return (
    <Field className={className}>
      {[13, 32, 51].map((y, i) => (
        <g key={y}>
          <rect
            x="9"
            y={y}
            width={64 - i * 8}
            height="12"
            rx="2"
            className={S.base}
          />
          {i === 0 ? (
            <path d="M15 19h22" className={S.accent} />
          ) : null}
        </g>
      ))}
      <path d="M84 15v44" className={S.accent} strokeDasharray="4 4" />
      {[19, 38, 57].map((y) => (
        <circle key={y} cx="84" cy={y} r="3" className={S.fillAccent} />
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

/**
 * Three icons for the three sided proposition. Deliberately literal and much
 * simpler than the expertise diagrams: at this size a plain subject reads at a
 * glance where a drawn mechanism does not. Same field and stroke rules, and one
 * accent element each, so they still belong to the same family.
 */

/** For clients: the companies that hire us. */
export function DiagramClients({ className }: Props) {
  return (
    <Field className={className}>
      <path d="M8 60h80" className={S.base} />
      {/* two buildings, so it reads as companies rather than one office */}
      <rect x="16" y="24" width="30" height="36" rx="2" className={S.base} />
      <rect x="54" y="12" width="28" height="48" rx="2" className={S.accent} />
      {[32, 44].map((y) => (
        <rect
          key={y}
          x="24"
          y={y}
          width="7"
          height="7"
          rx="1"
          className={S.base}
        />
      ))}
      {[20, 32, 44].map((y) => (
        <rect
          key={y}
          x="62"
          y={y}
          width="7"
          height="7"
          rx="1"
          className={S.accent}
        />
      ))}
      <rect x="33" y="47" width="7" height="13" rx="1" className={S.base} />
    </Field>
  );
}

/** For senior leaders: one person, and the judgment you can stake on them. */
export function DiagramLeaders({ className }: Props) {
  return (
    <Field className={className}>
      <circle cx="33" cy="24" r="10" className={S.base} />
      <path d="M15 54 C 15 40, 51 40, 51 54" className={S.base} />
      {/* the vouch */}
      <circle cx="70" cy="38" r="13" className={S.accent} />
      <path d="M64 38l5 5 8-10" className={S.accent} />
    </Field>
  );
}

/** For experts: the specialists themselves. */
export function DiagramExperts({ className }: Props) {
  return (
    <Field className={className}>
      <circle cx="19" cy="27" r="7.5" className={S.base} />
      <path d="M6 52 C 6 42, 30 42, 30 52" className={S.base} />
      <circle cx="77" cy="27" r="7.5" className={S.base} />
      <path d="M66 52 C 66 42, 90 42, 90 52" className={S.base} />
      {/* the one matched to the brief */}
      <circle cx="48" cy="22" r="10" className={S.accent} />
      <path d="M34 55 C 34 40, 62 40, 62 55" className={S.accent} />
    </Field>
  );
}

export const diagrams = {
  brain: DiagramDataAI,
  database: DiagramStandards,
  blueprint: DiagramBlueprint,
  transform: DiagramTransform,
} as const;

export const audienceDiagrams = {
  clients: DiagramClients,
  leaders: DiagramLeaders,
  experts: DiagramExperts,
} as const;
