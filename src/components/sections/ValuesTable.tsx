import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { getContent } from "@/content/live";

/**
 * The six values as an editorial three column register: the value, what it
 * means, and what it looks like in delivery. Rendered as rows rather than
 * cards so the "what it means practically" column stays comparable down the
 * page, and stacked below the lg breakpoint.
 */
export async function ValuesTable() {
  const { values } = await getContent();

  return (
    <div>
      {/* Column headings, desktop only. The rows carry their own labels below. */}
      <div className="hidden grid-cols-12 gap-x-10 border-b border-ink/12 pb-4 lg:grid">
        <h3 className="eyebrow col-span-4 text-ink-300">Value</h3>
        <h3 className="eyebrow col-span-4 text-ink-300">Definition</h3>
        <h3 className="eyebrow col-span-4 text-ink-300">
          What it means practically
        </h3>
      </div>

      <Stagger className="flex flex-col">
        {values.map((value, i) => (
          <StaggerItem key={value.index}>
            <div
              className={`group grid grid-cols-1 gap-x-10 gap-y-5 border-ink/[0.09] py-8 lg:grid-cols-12 lg:py-9 ${
                i === 0 ? "border-t-0 lg:border-t-0" : "border-t"
              }`}
            >
              {/* Value */}
              <div className="lg:col-span-4">
                <div className="flex items-baseline gap-4">
                  <span
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-eyebrow font-medium text-brand tnum transition-colors duration-500 group-hover:bg-brand group-hover:text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h4 className="text-lg leading-tight tracking-[-0.024em] text-ink transition-colors duration-500 group-hover:text-brand">
                    {value.title}
                  </h4>
                </div>
              </div>

              {/* Definition */}
              <div className="lg:col-span-4">
                <p className="max-w-[44ch] text-base leading-relaxed text-ink-600">
                  {value.definition}
                </p>
              </div>

              {/* Practice */}
              <div className="lg:col-span-4">
                <h5 className="eyebrow mb-3 text-ink-300 lg:hidden">
                  In practice
                </h5>
                <ul className="flex flex-col gap-2">
                  {value.practice.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-snug text-ink-400"
                    >
                      <span
                        className="mt-[0.4375rem] size-1 shrink-0 rounded-full bg-brand/50"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
