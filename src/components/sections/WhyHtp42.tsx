import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { differentiators } from "@/content/site";

/**
 * Six reasons, set as an editorial grid rather than cards — the hairlines do
 * the containing, so nothing floats. Each item carries one hard metric so the
 * claim is falsifiable.
 */
export function WhyHtp42() {
  return (
    <section className="section bg-paper">
      <div className="shell">
        <SectionHeader
          index="02"
          eyebrow="Why HTP42"
          title={
            <>
              The reasons clients choose us are{" "}
              <span className="accent-italic text-brand">
                structural, not stylistic
              </span>
              .
            </>
          }
          lead="Every consultancy claims senior people and pragmatic delivery. The difference is whether the operating model makes it true. Ours does, because there is nothing else it could be."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-x-12 gap-y-11 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <StaggerItem key={item.index}>
              <article className="group rule flex h-full flex-col pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow tnum text-ink-300">
                    {item.index}
                  </span>
                  <span className="eyebrow text-brand">{item.metric}</span>
                </div>

                <h3 className="mt-7 text-xl tracking-[-0.028em] text-ink transition-colors duration-500 group-hover:text-brand md:text-[1.375rem]">
                  {item.title}
                </h3>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-400">
                  {item.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
