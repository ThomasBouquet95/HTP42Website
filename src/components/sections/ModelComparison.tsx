import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { modelComparison } from "@/content/network";

/**
 * The argument, as a table. On desktop it is a real comparison grid; below the
 * lg breakpoint it becomes stacked per-dimension cards, because a three column
 * table at phone width is unreadable however you style it.
 */
export function ModelComparison() {
  const { rows } = modelComparison;

  return (
    <div>
      {/* Desktop */}
      <Reveal>
        <div className="hidden overflow-hidden rounded-lg border border-ink/12 lg:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              How the HTP42 network compares with a large consultancy and a
              single independent consultant
            </caption>
            <thead>
              <tr className="border-b border-ink/12 bg-paper-2">
                <th scope="col" className="w-[22%] px-6 py-5">
                  <span className="eyebrow text-ink-300">Dimension</span>
                </th>
                <th scope="col" className="w-[28%] bg-brand-soft px-6 py-5">
                  <span className="eyebrow text-brand">HTP42</span>
                </th>
                <th scope="col" className="w-[25%] px-6 py-5">
                  <span className="eyebrow text-ink-300">
                    Large consultancy
                  </span>
                </th>
                <th scope="col" className="w-[25%] px-6 py-5">
                  <span className="eyebrow text-ink-300">
                    Independent consultant
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.dimension}
                  className="group border-b border-ink/[0.08] last:border-0"
                >
                  <th
                    scope="row"
                    className="px-6 py-5 align-top text-[0.875rem] font-medium tracking-[-0.008em] text-ink"
                  >
                    {row.dimension}
                  </th>
                  <td className="bg-brand-soft/60 px-6 py-5 align-top transition-colors duration-500 group-hover:bg-brand-soft">
                    <span className="flex gap-2.5 text-[0.875rem] leading-snug font-medium text-ink">
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-brand"
                        strokeWidth={2.25}
                        aria-hidden="true"
                      />
                      {row.htp42}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <span className="flex gap-2.5 text-[0.875rem] leading-snug text-ink-400">
                      <Minus
                        className="mt-0.5 size-3.5 shrink-0 text-ink-200"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {row.large}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <span className="flex gap-2.5 text-[0.875rem] leading-snug text-ink-400">
                      <Minus
                        className="mt-0.5 size-3.5 shrink-0 text-ink-200"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {row.solo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Tablet and phone */}
      <div className="flex flex-col gap-4 lg:hidden">
        {rows.map((row, i) => (
          <Reveal key={row.dimension} delay={i * 0.05} y={12}>
            <div className="overflow-hidden rounded-lg border border-ink/12">
              <p className="border-b border-ink/10 bg-paper-2 px-5 py-3.5 text-[0.875rem] font-medium tracking-[-0.008em] text-ink">
                {row.dimension}
              </p>
              <dl className="divide-y divide-ink/[0.08]">
                <div className="bg-brand-soft px-5 py-4">
                  <dt className="eyebrow text-brand">HTP42</dt>
                  <dd className="mt-2 flex gap-2.5 text-[0.875rem] leading-snug font-medium text-ink">
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-brand"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                    {row.htp42}
                  </dd>
                </div>
                <div className="grid grid-cols-1 divide-y divide-ink/[0.08] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  <div className="px-5 py-4">
                    <dt className="eyebrow text-ink-300">Large consultancy</dt>
                    <dd className="mt-2 text-[0.875rem] leading-snug text-ink-400">
                      {row.large}
                    </dd>
                  </div>
                  <div className="px-5 py-4">
                    <dt className="eyebrow text-ink-300">
                      Independent consultant
                    </dt>
                    <dd className="mt-2 text-[0.875rem] leading-snug text-ink-400">
                      {row.solo}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
