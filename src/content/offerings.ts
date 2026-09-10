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
    body: "You tell us the need. We find the right experts from our network or its extended reach, check their credentials and track record, and embed them for as long as the need lasts.",
    points: [
      {
        label: "One expert or several, embedded in your team",
        detail:
          "Matched on subject matter, working inside your team and reporting into it, over the short to long term.",
      },
      {
        label: "A fixed day rate, and one contract",
        detail:
          "One counterparty, wherever in the world they sit. Contracting, administration, payment and legal sit with us.",
      },
      {
        label: "Proven experts, continuously managed",
        detail:
          "Screened by a partner, reviewed on every engagement, and replaced by us if the fit is wrong.",
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
        label: "A holistic team shaped to your need",
        detail:
          "Subject matter experts do the work, project managers keep it moving, a partner stands behind the quality. All empowered by AI.",
      },
      {
        label: "Defined deliverables, agreed before we start",
        detail:
          "Scope and outputs fixed up front, so you know what lands and when.",
      },
      {
        label: "An end to end solution",
        detail:
          "Strategy, design, implementation and the change that decides whether any of it holds.",
      },
    ],
  },
];
