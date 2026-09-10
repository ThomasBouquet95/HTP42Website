import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { offerings } from "@/content/offerings";

/**
 * The two ways clients work with HTP42. This is the commercial model, so it
 * earns full width cards: the distinction between embedding experts and
 * handing over a whole solution is the thing prospects most need to understand
 * before they call.
 *
 * Layout note: at two up the cards are a row subgrid, so the number, the name,
 * the promise, the paragraph and each of the three defining points share their
 * track with the matching element in the other card. Everything reads across
 * as well as down, and the two cards are the same height by construction
 * rather than by luck. No icons: with the diagrams gone the typography and the
 * hairline rules carry the structure.
 */
export function Offerings() {
  return (
    <section id="offerings" className="section scroll-mt-24 bg-paper-2">
      <div className="shell">
        <SectionHeader
          index="01"
          eyebrow="How we work with you"
          title={
            <>
              Embed our experts, or{" "}
              <span className="accent-italic text-brand">
                hand us the solution
              </span>
              .
            </>
          }
          lead="Some clients need experts embedded in their own team. Others need a result delivered against defined deliverables. We find and assemble the AI empowered experts, and carry the accountability."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:mt-16 lg:grid-cols-2 lg:grid-rows-[repeat(7,auto)] lg:gap-y-0">
          {offerings.map((offering) => (
            <StaggerItem
              key={offering.slug}
              as="article"
              className="grid bg-paper px-7 pt-7 pb-8 transition-colors duration-700 hover:bg-brand-soft/35 md:px-10 md:pt-9 md:pb-10 lg:row-span-7 lg:grid-rows-subgrid"
            >
              {/* 1. number, on its own rule */}
              <div className="flex items-center gap-5">
                <span className="eyebrow tnum text-ink-300">
                  {offering.index}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-ink/12" />
              </div>

              {/* 2. name */}
              <h3 className="mt-7 text-[1.6875rem] leading-[1.08] tracking-[-0.034em] text-ink md:text-[2rem]">
                {offering.name}
              </h3>

              {/* 3. the promise */}
              <p className="mt-3 max-w-[42ch] text-[1.0625rem] leading-snug font-medium tracking-[-0.016em] text-brand md:text-[1.1875rem]">
                {offering.promise}
              </p>

              {/* 4. how it works */}
              <p className="body-copy mt-6 max-w-[46ch]">{offering.body}</p>

              {/* 5, 6, 7. the three defining points, one per track */}
              <dl className="mt-8 grid lg:row-span-3 lg:grid-rows-subgrid">
                {offering.points.map((point) => (
                  <div
                    key={point.label}
                    className="border-t border-ink/[0.09] pt-5 pb-6 last:pb-0"
                  >
                    <dt className="text-[0.9375rem] leading-snug font-medium tracking-[-0.012em] text-ink">
                      {point.label}
                    </dt>
                    <dd className="mt-2 max-w-[52ch] text-[0.875rem] leading-relaxed text-ink-400">
                      {point.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
