import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, DrawRule } from "@/components/motion/Reveal";
import { ClientStrip } from "@/components/ui/ClientStrip";
import { Accent } from "@/components/ui/Accent";
import { copy } from "@/content/copy";

/**
 * The statement of intent. Deliberately one editorial assertion at headline
 * scale: the only place on the site where we simply say what the firm is,
 * without proof alongside it.
 */
export function Positioning() {
  return (
    <section
      aria-labelledby="the-firm-heading"
      className="section relative bg-paper pb-0"
    >
      <div className="shell">
        <h2 id="the-firm-heading" className="sr-only">
          {copy.home.positioning.heading}
        </h2>

        <DrawRule />

        <div className="pt-9 lg:pt-12">
          <Reveal>
            <p className="max-w-[34ch] text-display-sm leading-[1.16] tracking-[-0.03em] text-ink">
              <Accent text={copy.home.positioning.statement} />
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-11 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
              <p className="body-copy">
                {copy.home.positioning.whoWeBring}
              </p>
              <p className="body-copy">
                {copy.home.positioning.howItWorks}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-11">
              <ArrowLink href="/network">
                {copy.home.positioning.networkLink}
              </ArrowLink>
            </div>
          </Reveal>

          {/* Who we work with */}
          <Reveal delay={0.22}>
            <div className="mt-16 md:mt-20">
              <h3 className="eyebrow mb-5 text-ink-300">{copy.home.positioning.clientsHeading}</h3>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Full width, so the rotation reads as a band rather than a column. */}
      <Reveal delay={0.26}>
        <div className="mt-2">
          <ClientStrip />
        </div>
      </Reveal>
    </section>
  );
}
