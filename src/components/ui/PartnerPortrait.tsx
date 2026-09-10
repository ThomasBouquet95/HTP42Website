import Image from "next/image";

/**
 * A partner portrait, or a typeset monogram when we do not yet hold a
 * photograph for that person. The monogram is deliberately designed rather
 * than a grey silhouette: a missing asset should still look like a decision.
 *
 * Portraits run greyscale and come up to full colour on hover. That is partly
 * restraint, and partly practical: the source photographs arrive from
 * different shoots in different treatments, and a single tonal register is
 * what stops a row of four from looking like a collage.
 */
export function PartnerPortrait({
  name,
  photo,
  onDark = false,
  sizes = "(min-width: 1024px) 22vw, (min-width: 768px) 44vw, 88vw",
}: {
  name: string;
  photo?: string;
  onDark?: boolean;
  sizes?: string;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-md ${
        onDark ? "bg-white/[0.06] ring-white/12" : "bg-brand-soft ring-ink/10"
      } ring-1 ring-inset`}
    >
      {photo ? (
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          fill
          sizes={sizes}
          className="object-cover object-top grayscale transition-[filter,transform] duration-[900ms] ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      ) : (
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex items-center justify-center text-[1.75rem] tracking-[-0.03em] transition-colors duration-700 md:text-[2rem] ${
            onDark
              ? "text-white/35 group-hover:text-azure/70"
              : "text-brand/45 group-hover:text-brand/70"
          }`}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
