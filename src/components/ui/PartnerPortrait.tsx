import Image from "next/image";
import { Mark } from "@/components/ui/Logo";

/**
 * A partner portrait, or a typeset monogram when we do not yet hold a
 * photograph for that person. The monogram is deliberately designed rather
 * than a grey silhouette: a missing asset should still look like a decision.
 *
 * Portraits render in colour. An earlier version ran them greyscale and
 * brought them up on hover, which was a way of reconciling photographs from
 * different shoots. The four are now one consistent branded set, so the
 * treatment no longer earns its place, and dropping it also removes a state
 * that touch devices could never reach.
 *
 * The mark sits in the top right corner, drawn as SVG over the photograph
 * rather than baked into the pixels. That keeps it crisp at any size, places
 * it identically on all four, and lets it take the right colour on a light or
 * a dark ground. It lands in the same corner the studio originals used, which
 * is background gradient in every one of them.
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
          className="object-cover object-top transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.03]"
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

      {photo ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[4.5%] right-[4.5%] w-[9%] min-w-[0.875rem] text-brand/90"
        >
          <Mark className="h-auto w-full" />
        </span>
      ) : null}
    </div>
  );
}
