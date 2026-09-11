import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { formatDate } from "@/lib/format";

export type LegalSection = { heading: string; paragraphs: string[] };

/**
 * Shared shell for the legal pages: the same dark hero as everywhere else,
 * then a single narrow measure. Legal copy still deserves good typography.
 */
export function LegalPage({
  title,
  titleLines,
  intro,
  updated,
  sections,
  crumb,
}: {
  title: string;
  titleLines: ReactNode[];
  intro: string;
  updated: string;
  sections: LegalSection[];
  crumb: string;
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: title, href: crumb },
        ]}
        titleLines={titleLines}
        lead={intro}
        facts={[
          { label: "Last updated", value: formatDate(updated) },
          { label: "Entity", value: "HealthTech Partners 42" },
          { label: "Jurisdiction", value: "Switzerland" },
          { label: "Contact", value: "ops@htp42.com" },
        ]}
      />

      <section className="section bg-paper">
        <div className="shell">
          <div className="max-w-3xl">
            {sections.map((section, i) => (
              <Reveal key={section.heading} delay={i * 0.04} y={14}>
                <div
                  className={`border-t border-ink/12 py-9 md:py-11 ${
                    i === 0 ? "border-t-0 pt-0" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="eyebrow tnum text-ink-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-lg tracking-[-0.026em] text-ink md:text-xl">
                      {section.heading}
                    </h2>
                  </div>
                  <div className="mt-5 flex flex-col gap-4">
                    {section.paragraphs.map((paragraph, j) => (
                      <p key={j} className="body-copy">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Questions"
        title={
          <>
            Something here unclear?{" "}
            <span className="accent-italic text-azure">Ask us directly.</span>
          </>
        }
        body="We would rather answer a question about our terms than have you guess at the answer."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
