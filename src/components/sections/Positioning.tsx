import { Eyebrow } from "@/components/ui/Eyebrow";
import { Mark } from "@/components/ui/Logo";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, DrawRule } from "@/components/motion/Reveal";
import { clientTypes } from "@/content/site";

/**
 * The statement of intent. Deliberately one long editorial paragraph at
 * headline scale — it is the only place on the site where we simply assert
 * what the firm is, without proof alongside it.
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
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 pt-7 lg:grid-cols-12 lg:pt-10">
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow index="00">The firm</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[24ch] text-sm leading-relaxed text-ink-400">
                Founded in Basel. Built as a network rather than a firm, on
                purpose.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="rule mt-8 hidden pt-6 lg:block">
                <Mark className="h-5 w-auto text-brand/40" />
                <dl className="mt-6 space-y-4">
                  {[
                    { k: "Headquarters", v: "Basel, Switzerland" },
                    { k: "Also present", v: "Paris · Copenhagen · Singapore" },
                    { k: "Team size", v: "2–8 seniors per engagement" },
                  ].map((row) => (
                    <div key={row.k}>
                      <dt className="eyebrow text-ink-300">{row.k}</dt>
                      <dd className="mt-1.5 text-[0.8125rem] leading-snug text-ink-600">
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <Reveal delay={0.06}>
              <p className="max-w-[34ch] text-[clamp(1.6rem,1.1rem+1.7vw,2.6rem)] leading-[1.16] tracking-[-0.03em] text-ink">
                Large consultancies sell you the team they have available.
                Marketplaces sell you whoever bids. We do{" "}
                <span className="accent-italic text-brand">neither</span>.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
                <p className="body-copy">
                  HTP42 is a network of forty-plus senior experts in life
                  sciences data, AI and technology — former VPs, CTOs, heads of
                  function and principal architects from Novartis, Roche,
                  Sanofi, Novo Nordisk, Johnson &amp; Johnson and Amgen. For
                  each engagement we assemble the specific people your problem
                  requires, name them before you sign, and stand the team down
                  when the work is done.
                </p>
                <p className="body-copy">
                  It means no pyramid to feed and no juniors learning your
                  domain on your budget. It also means we can be honest: three
                  of our last ten engagements recommended against the
                  investment the client expected to make. That is the point of
                  a network — nobody has a bench to keep busy.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-11">
                <ArrowLink href="/network">How the model works</ArrowLink>
              </div>
            </Reveal>

            {/* Who we work with */}
            <Reveal delay={0.26}>
              <div className="rule mt-14 pt-7">
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
      </div>
    </section>
  );
}
