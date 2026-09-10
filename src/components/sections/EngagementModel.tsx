import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { engagementModel } from "@/content/expertise";

/**
 * How an engagement actually runs. Four steps on a single horizontal spine —
 * the connecting line is what turns four cards into one process.
 */
export function EngagementModel() {
  return (
    <section className="grain relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_80%_0%,rgba(46,127,219,0.16),transparent_58%)]"
        aria-hidden="true"
      />
      <div className="shell section relative">
        <SectionHeader
          index="05"
          eyebrow="How we work"
          onDark
          title={
            <>
              Understood in days.{" "}
              <span className="accent-italic text-azure">
                Matched in a week.
              </span>
            </>
          }
          lead="The shape rarely changes. We establish what you need, name the experts it takes, and get them working. The same people stay on it to the end."
        />

        <div className="relative mt-16 md:mt-20">
          {/* The spine */}
          <div
            className="absolute top-[0.4375rem] right-0 left-0 hidden h-px bg-white/12 lg:block"
            aria-hidden="true"
          />

          <Stagger className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {engagementModel.map((step) => (
              <StaggerItem key={step.step}>
                <div className="relative">
                  <div className="mb-7 hidden lg:block">
                    <span
                      className="relative flex size-3.5 items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-0 rounded-full bg-ink" />
                      <span className="absolute inset-0 rounded-full border border-azure/40" />
                      <span className="size-1.5 rounded-full bg-azure" />
                    </span>
                  </div>

                  <div className="rule-on-dark flex items-baseline justify-between gap-4 pt-5 lg:border-0 lg:pt-0">
                    <span className="eyebrow tnum text-white/50">
                      {step.step}
                    </span>
                    <span className="eyebrow text-azure">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl tracking-[-0.028em] text-white md:text-[1.375rem]">
                    {step.name}
                  </h3>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-white/60">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
