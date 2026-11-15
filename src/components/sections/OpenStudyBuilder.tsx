import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Mark } from "@/components/ui/Logo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { copy } from "@/content/copy";

/**
 * The one offering on this page that has a page of its own.
 *
 * It sits directly after the engagements because that is where the argument
 * has just been made: two of the seven are OpenStudyBuilder deliveries, so a
 * reader arrives here having read the evidence and is ready for the offer. It
 * is a compact band rather than a full section because the page was already
 * long before it was added, and because a band reads as a door rather than as
 * another thing to read.
 *
 * The navigation carries it too. Someone who came looking for OpenStudyBuilder
 * by name should not have to scroll two thirds of the page to find it.
 */
export function OpenStudyBuilder() {
  const c = copy.home.osb;
  return (
    <section className="grain relative overflow-hidden bg-ink-900">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_85%_0%,rgba(46,127,219,0.18),transparent_62%)]"
        aria-hidden="true"
      />
      {/* The mark, bled off the edge, the same device the closing band uses. */}
      <div
        className="pointer-events-none absolute -right-20 -bottom-24 opacity-[0.05] md:-right-8"
        aria-hidden="true"
      >
        <Mark className="h-[16rem] w-auto text-white md:h-[21rem]" />
      </div>

      <div className="shell section-sm relative">
        <div className="grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow onDark>{c.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 max-w-[22ch] text-display-sm text-white">
                <Accent text={c.title} onDark />
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <Reveal delay={0.12}>
              <p className="max-w-[52ch] text-sm leading-relaxed text-white/60">
                {c.lead}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/openstudybuilder"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-6 text-sm font-medium tracking-[-0.008em] text-ink transition-colors duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-azure hover:text-white"
                >
                  {c.cta}
                  <ArrowUpRight
                    className="arrow-step size-4"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href={`mailto:${site.contact.osbSandbox}?subject=${encodeURIComponent(
                    "Request Sandbox Access",
                  )}`}
                  className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-sm font-medium tracking-[-0.008em] text-white transition-colors duration-500 hover:border-white/60"
                >
                  {c.sandbox}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.24}>
          <ul className="rule-on-dark mt-11 flex flex-wrap gap-x-8 gap-y-2 pt-5">
            {c.facts.map((fact) => (
              <li key={fact} className="eyebrow text-white/50">
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
