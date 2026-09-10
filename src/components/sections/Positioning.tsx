import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, DrawRule } from "@/components/motion/Reveal";
import { ClientStrip } from "@/components/ui/ClientStrip";

/**
 * The statement of intent. Deliberately one editorial assertion at headline
 * scale: the only place on the site where we simply say what the firm is,
 * without proof alongside it.
 */
export function Positioning() {
  return (
    <section
      aria-labelledby="the-firm-heading"
      className="section relative bg-paper"
    >
      <div className="shell">
        <h2 id="the-firm-heading" className="sr-only">
          The firm
        </h2>

        <DrawRule />

        <div className="pt-9 lg:pt-12">
          <Reveal>
            <p className="max-w-[34ch] text-[clamp(1.6rem,1.1rem+1.7vw,2.6rem)] leading-[1.16] tracking-[-0.03em] text-ink">
              We bring the{" "}
              <span className="accent-italic text-brand">
                specific deep expertise
              </span>{" "}
              your problem needs, and nothing you do not.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-11 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
              <p className="body-copy">
                Business, technology and scientific expertise, all of it with
                deep life sciences experience. Former VPs, CTOs, heads of
                function, principal architects and clinical leaders who have
                held the roles they now advise on, at Novartis, Roche, Sanofi,
                Novo Nordisk, Johnson &amp; Johnson and Amgen. We match the
                subject matter your problem actually calls for, name those
                people before you sign, and stand the team down when the work
                is done.
              </p>
              <p className="body-copy">
                There are two ways that works. We find vetted experts and
                embed them in your team for as long as the need lasts, with
                HTP42 as your single contracting party and the administration
                and legal work on us. Or, for more complex needs, we
                assemble a senior team to deliver the programme end to end,
                against outcomes agreed before we start.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-11">
              <ArrowLink href="/network">
                How the network works
              </ArrowLink>
            </div>
          </Reveal>

          {/* Who we work with */}
          <Reveal delay={0.22}>
            <div className="mt-16 md:mt-20">
              <h3 className="eyebrow mb-5 text-ink-300">Who we work with</h3>
              <ClientStrip />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
