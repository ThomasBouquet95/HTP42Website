import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { EXPERT_COUNT, disciplines, leadership } from "@/content/network";

const ALUMNI = [
  "Novartis",
  "Roche · Genentech",
  "Sanofi",
  "Novo Nordisk",
  "Johnson & Johnson",
  "Amgen",
  "Nestlé",
  "CDISC",
  "data42",
] as const;

/**
 * The talent proposition: depth matched to the subject matter, with enough of
 * it to staff a real programme. The disciplines behind it are the evidence.
 */
export function NetworkTeaser() {
  return (
    <section className="grain relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_65%_at_15%_0%,rgba(46,127,219,0.16),transparent_58%)]"
        aria-hidden="true"
      />

      <div className="shell section relative">
        <SectionHeader
          index="04"
          eyebrow="The network"
          onDark
          title={
            <>
              {EXPERT_COUNT}+ senior experts,{" "}
              <span className="accent-italic text-azure">
                matched to your subject.
              </span>
            </>
          }
          lead="Practising principals, fractional CTOs and independent advisors who take HTP42 engagements because the work is senior and the teams are small. That is how we field a former Novartis technology CTO and a CDISC standards programme manager on the same eight week engagement, and source new expertise when a brief calls for it."
        />

        {/* Disciplines */}
        <Stagger className="mt-14 grid grid-cols-1 gap-x-10 gap-y-9 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((discipline) => (
            <StaggerItem key={discipline.index}>
              <Link
                href="/network#disciplines"
                className="group rule-on-dark block pt-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow tnum text-white/50">
                    {discipline.index}
                  </span>
                  <span className="eyebrow tnum text-azure">
                    {discipline.count} experts
                  </span>
                </div>
                <h3 className="mt-6 text-lg tracking-[-0.026em] text-white transition-colors duration-500 group-hover:text-azure md:text-xl">
                  {discipline.name}
                </h3>
                <p className="mt-3.5 text-[0.875rem] leading-relaxed text-white/60">
                  {discipline.summary}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Leadership */}
        <Reveal delay={0.08}>
          <div className="rule-on-dark mt-16 pt-8 md:mt-20">
            <h3 className="eyebrow text-azure">Partners &amp; leadership</h3>
            <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.slice(0, 3).map((person) => (
                <li key={person.name}>
                  <p className="text-[1.0625rem] font-medium tracking-[-0.022em] text-white">
                    {person.name}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] font-medium text-azure/90">
                    {person.role}
                  </p>
                  <p className="mt-3 max-w-[34ch] text-[0.8125rem] leading-relaxed text-white/60">
                    {person.note}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <ArrowLink href="/network" onDark>
                Meet the network
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Alumni marquee */}
      <div className="rule-on-dark relative py-6">
        <div className="shell mb-4">
          <p className="eyebrow text-white/50">
            Our experts held senior roles at
          </p>
        </div>
        <Marquee items={ALUMNI} onDark duration={40} separator="·" />
      </div>
    </section>
  );
}
