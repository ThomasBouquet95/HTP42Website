import { Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { featuredPerspectives } from "@/content/perspectives";
import { formatDate } from "@/lib/format";
import { site } from "@/content/site";
import { copy } from "@/content/copy";

/** The pieces are not published on the site; they are sent on request. With
 * no page to open, the card is the request. */
function requestLink(title: string) {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(
    `Perspectives: ${title}`,
  )}&body=${encodeURIComponent(
    `Hello HTP42,\n\nI'd like to read the full piece: "${title}".\n\nName:\nOrganisation:\nRole:\n`,
  )}`;
}

export function PerspectivesTeaser() {
  return (
    <section id="perspectives" className="section bg-paper">
      <div className="shell">
        <SectionHeader
          index="05"
          eyebrow={copy.home.perspectives.eyebrow}
          title={copy.home.perspectives.title}
          lead={copy.home.perspectives.lead}
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 md:grid-cols-3">
          {featuredPerspectives.map((piece) => (
            <StaggerItem key={piece.slug}>
              <a
                href={requestLink(piece.title)}
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
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-ink-400 transition-colors duration-500 group-hover:text-brand">
                    <Mail className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                    <span className="link-wipe">Request it</span>
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
