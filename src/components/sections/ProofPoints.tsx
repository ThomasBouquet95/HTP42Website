import { Counter } from "@/components/ui/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { getContent } from "@/content/live";

/** The numbers band. Counters, tabular figures, no chart — restraint reads as confidence. */
export async function ProofPoints() {
  const { proofPoints } = await getContent();

  return (
    <section className="grain relative overflow-hidden bg-ink-900">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_0%,rgba(46,127,219,0.14),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="shell section-sm relative">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
            <Eyebrow onDark>By the numbers</Eyebrow>
            <p className="max-w-md text-sm leading-relaxed text-white/55">
              Every expert vetted before onboarding, and reviewed on every
              engagement afterwards.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <StaggerItem key={point.label}>
              <div className="rule-on-dark pt-6">
                <p className="text-figure-lg leading-none font-medium tracking-[-0.04em] text-white">
                  <Counter value={point.value} suffix={point.suffix} />
                </p>
                <p className="mt-5 text-base font-medium tracking-[-0.01em] text-azure">
                  {point.label}
                </p>
                <p className="mt-2.5 max-w-[26ch] text-xs leading-relaxed text-white/55">
                  {point.note}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
