import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { formatDate } from "@/lib/format";
import { getContent } from "@/content/live";

export async function PerspectivesTeaser() {
  const { featuredPerspectives } = await getContent();

  return (
    <section className="section bg-paper">
      <div className="shell">
        <SectionHeader
          index="05"
          eyebrow="Perspectives"
          title={
            <>
              What we think, before{" "}
              <span className="accent-italic text-brand">
                anyone pays us for it
              </span>
              .
            </>
          }
          lead="Short, specific pieces on the problems we keep meeting. No trend reports."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 md:grid-cols-3">
          {featuredPerspectives.map((piece) => (
            <StaggerItem key={piece.slug}>
              <Link
                href={`/perspectives#${piece.slug}`}
                className="group flex h-full flex-col bg-paper p-7 transition-colors duration-700 hover:bg-paper-2 md:p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-brand">{piece.category}</span>
                  <span className="eyebrow text-ink-300">
                    {piece.readTime}
                  </span>
                </div>

                <h3 className="mt-7 text-lg leading-[1.16] tracking-[-0.028em] text-ink transition-colors duration-500 group-hover:text-brand md:text-xl">
                  {piece.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-ink-400">
                  {piece.standfirst}
                </p>

                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <div>
                    <p className="text-xs font-medium text-ink-600">
                      {piece.author}
                    </p>
                    <p className="mt-1 text-xs text-ink-300">
                      {formatDate(piece.date)}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="arrow-step size-4 shrink-0 text-ink-300 transition-colors duration-500 group-hover:text-brand"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-11">
            <ArrowLink href="/perspectives">All perspectives</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
