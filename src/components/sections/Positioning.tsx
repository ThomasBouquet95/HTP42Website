import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, DrawRule } from "@/components/motion/Reveal";
import { ClientStrip } from "@/components/ui/ClientStrip";
import { EXPERT_COUNT } from "@/content/network";

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
                There are two ways that works. We find an expert and staff them
                onto your team, with HTP42 as your single contracting party and
                the administration and legal work on us. Or, when the work needs
                a team, we assemble one from the network and deliver the
                programme end to end.
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
            <div className="rule mt-16 pt-7">
              <h3 className="eyebrow text-ink-300">Who we work with</h3>
              <div className="mt-7">
                <ClientStrip />
              </div>
              <p className="mt-9 max-w-[56ch] text-[0.8125rem] leading-relaxed text-ink-400">
                {EXPERT_COUNT}+ vetted senior experts you can access directly,
                and 500+ more reachable through their own networks. Every one
                of them reviewed by a partner before they join an engagement.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
