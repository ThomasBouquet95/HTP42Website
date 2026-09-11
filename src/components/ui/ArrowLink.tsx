import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/** Inline text link with a stepping arrow. The default CTA across the site. */
export function ArrowLink({
  href,
  children,
  onDark = false,
  external = false,
  className = "",
  size = "base",
}: {
  href: string;
  children: ReactNode;
  onDark?: boolean;
  external?: boolean;
  className?: string;
  size?: "sm" | "base";
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const body = (
    <>
      <span className="link-wipe">{children}</span>
      <Icon
        className={`arrow-step ${size === "sm" ? "size-3.5" : "size-4"}`}
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </>
  );

  const cls = `group inline-flex items-center gap-2 font-medium tracking-[-0.01em] transition-colors duration-300 ${
    size === "sm" ? "text-xs" : "text-base"
  } ${
    onDark ? "text-white hover:text-azure" : "text-ink hover:text-brand"
  } ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
