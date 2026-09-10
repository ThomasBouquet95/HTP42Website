import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid" | "light" | "outline" | "outline-dark" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[0.875rem] font-medium tracking-[-0.008em] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-offset-4";

const sizes = {
  sm: "h-9 px-4",
  base: "h-11 px-5",
  lg: "h-[3.125rem] px-7",
} as const;

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-paper hover:bg-brand shadow-[0_1px_2px_rgba(10,15,28,0.08)] hover:shadow-[0_8px_24px_-8px_rgba(20,80,200,0.45)]",
  /** The primary action on a dark band. */
  light:
    "bg-white text-ink hover:bg-azure hover:text-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_-8px_rgba(46,127,219,0.5)]",
  outline:
    "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
  "outline-dark":
    "border border-white/20 text-white hover:border-white/45 hover:bg-white/[0.06]",
  ghost: "text-ink hover:bg-ink/[0.04]",
};

export function Button({
  href,
  children,
  variant = "solid",
  size = "base",
  withArrow = false,
  className = "",
  type,
  ...rest
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  withArrow?: boolean;
  className?: string;
  type?: "button" | "submit";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const body = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="arrow-step size-4 shrink-0"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {body}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={cls} {...rest}>
      {body}
    </button>
  );
}
