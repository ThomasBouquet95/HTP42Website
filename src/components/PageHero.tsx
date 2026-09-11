import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accent, isCopy } from "@/components/ui/Accent";
import { Reveal, RevealLines } from "@/components/motion/Reveal";

/**
 * Every interior page opens on the same dark band: breadcrumb, eyebrow,
 * a masked line-by-line headline, a lead, and an optional facts rail.
 * Consistency here is what makes the site feel like one publication.
 */
export function PageHero({
  eyebrow,
  titleLines,
  lead,
  breadcrumb,
  facts,
  children,
}: {
  eyebrow: string;
  /** Each line as plain text, accent marked as *like this*, or markup. */
  titleLines: (ReactNode | string)[];
  lead?: ReactNode;
  breadcrumb?: { label: string; href: string }[];
  facts?: { label: string; value: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-44 lg:pb-24">
      <HeroField />

      <div className="shell relative">
        {breadcrumb && breadcrumb.length > 0 && (
          <Reveal y={10} duration={0.5}>
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="flex flex-wrap items-center gap-1.5">
                {breadcrumb.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <ChevronRight
                        className="size-3 text-white/45"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    )}
                    <Link
                      href={crumb.href}
                      className="eyebrow text-white/55 transition-colors hover:text-azure"
                    >
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <Reveal y={10} duration={0.5}>
          <Eyebrow onDark>{eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="mt-7 max-w-[19ch] text-display text-white md:text-display-lg">
          <RevealLines
            lines={titleLines.map((line, i) =>
              isCopy(line) ? <Accent key={i} text={line} onDark /> : line,
            )}
            delay={0.12}
          />
        </h1>

        {lead && (
          <Reveal delay={0.34}>
            <p className="lead mt-8 max-w-2xl text-white/60">{lead}</p>
          </Reveal>
        )}

        {children && <Reveal delay={0.42}>{children}</Reveal>}

        {facts && facts.length > 0 && (
          <Reveal delay={0.44}>
            <dl className="rule-on-dark mt-14 grid grid-cols-2 gap-x-8 gap-y-7 pt-8 md:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="eyebrow text-white/50">{fact.label}</dt>
                  <dd className="mt-2.5 text-lg font-medium tracking-[-0.02em] text-white md:text-xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/** Ambient field: a soft brand glow plus faint grid ticks. */
function HeroField() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_88%_-10%,rgba(46,127,219,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_-5%_105%,rgba(20,80,200,0.14),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.035)_0_1px,transparent_1px_8.3333%)]" />
    </div>
  );
}
