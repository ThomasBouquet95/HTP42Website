export type Offering = {
  index: string;
  slug: string;
  name: string;
  promise: string;
  body: string;
  /** Three lines that define what the offering actually is. */
  points: { label: string; detail: string }[];
};

/** The two ways clients work with HTP42. */
export const offerings: Offering[] = [
  {
    index: "01",
    slug: "expert-deployment",
    name: "Expert Deployment",
    promise: "We find proven experts. You sign one contract.",
    body: "You tell us the need. We find the right experts, vet them, and embed them in your team for as long as the need lasts, whether that is a few months or a few years.",
    points: [
      {
        label: "One expert or several, embedded in your team",
        detail:
          "Matched on subject matter for a specific need, over the short to long term, working inside your own team and reporting into it.",
      },
      {
        label: "A fixed day rate, and one contract",
        detail:
          "You face HTP42 as your single counterparty wherever in the world they sit. Contracting, administration, payment and legal sit with us.",
      },
      {
        label: "Proven experts, continuously managed",
        detail:
          "Screened by a partner before onboarding, reviewed on every engagement, and replaced by us if the fit is wrong.",
      },
    ],
  },
  {
    index: "02",
    slug: "consulting-projects",
    name: "Consulting Projects",
    promise: "Senior experts empowered by AI.",
    body: "When you need a result rather than a role filled, we assemble the team from the network and own the delivery of it.",
    points: [
      {
        label: "Defined deliverables, agreed before we start",
        detail:
          "Scope, outputs and outcomes fixed up front, so you know exactly what lands and when.",
      },
      {
        label: "An end to end solution",
        detail:
          "Strategy, design, implementation and the organisational change that decides whether any of it holds.",
      },
      {
        label: "A holistic team shaped to your need",
        detail:
          "Subject matter experts do the work, experienced project managers keep it moving, and a partner stands behind the quality. All of them empowered by AI.",
      },
    ],
  },
];
