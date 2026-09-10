import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, DrawRule } from "@/components/motion/Reveal";
import { clientTypes } from "@/content/site";

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
              Large consultancies sell you the team they have available.
              Marketplaces sell you whoever bids. We do{" "}
              <span className="accent-italic text-brand">neither</span>.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-11 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
              <p className="body-copy">
                HTP42 is a network of more than forty senior experts in life
                sciences data, AI and technology. Former VPs, CTOs, heads of
                function and principal architects from Novartis, Roche, Sanofi,
                Novo Nordisk, Johnson &amp; Johnson and Amgen. For each
                engagement we assemble the specific people your problem
                requires, name them before you sign, and stand the team down
                when the work is done.
              </p>
              <p className="body-copy">
                It means no pyramid to feed and no juniors learning your domain
                on your budget. It also means we can be honest: three of our
                last ten engagements recommended against the investment the
                client expected to make. That is the point of a network. Nobody
                has a bench to keep busy.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-11">
              <ArrowLink href="/network">How the model works</ArrowLink>
            </div>
          </Reveal>

          {/* Who we work with */}
          <Reveal delay={0.22}>
            <div className="rule mt-16 pt-7">
              <h3 className="eyebrow text-ink-300">Who we work with</h3>
              <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2.5">
                {clientTypes.map((type) => (
                  <li
                    key={type}
                    className="rounded-full border border-ink/10 bg-paper-2 px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.006em] text-ink-600"
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
