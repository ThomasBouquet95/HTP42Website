import "server-only";
import { cache } from "react";
import { applyOverrides, contentDefaults } from "@/content/registry";
import { readOverrides } from "@/lib/content-store";

/**
 * The content the site renders, with any admin edits applied.
 *
 * Wrapped in React's `cache`, so a single page render reads the store once no
 * matter how many components ask for it. Pages stay statically generated and
 * are revalidated when a save invalidates the content tag.
 */
export const getContent = cache(async () => {
  const overrides = await readOverrides();
  const c = applyOverrides(overrides);

  // Derived values, recomputed from the merged tree rather than stored, so an
  // edit to an expertise area flows into the flattened service list too.
  const allServices = c.expertiseAreas.flatMap((area) =>
    area.services.map((service) => ({ ...service, area: area.name })),
  );
  const featuredCases = c.caseStudies.filter((study) => study.featured);
  const featuredPerspectives = c.perspectives.filter((p) => p.featured);
  const proofFacts = c.proofPoints.map((point) => ({
    label: point.label,
    value: `${point.value}${point.suffix}`,
  }));

  return {
    ...c,
    // The partner count is the number of partners listed, never a typed number.
    proofPoints: c.proofPoints.map((point) =>
      point.label === "Partners"
        ? { ...point, value: c.leadership.length }
        : point,
    ),
    proofFacts: proofFacts.map((fact) =>
      fact.label === "Partners"
        ? { ...fact, value: String(c.leadership.length) }
        : fact,
    ),
    allServices,
    featuredCases,
    featuredPerspectives,
  };
});

export type LiveContent = Awaited<ReturnType<typeof getContent>>;

/** The same shape without touching the store, for metadata and other places
 *  that run before a request. */
export const contentFallback = contentDefaults;
