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
    promise: "Proven experts. One counterparty.",
    body: "Tell us what you need. We identify the right expert from our network or extended reach, validate their expertise and delivery record, and embed them into your team for as long as required.",
    points: [
      {
        label: "One or several experts, embedded with your team",
        detail:
          "Matched to your needs, working directly within your organisation for short term support or longer term assignments.",
      },
      {
        label: "One counterparty, wherever the expert is based",
        detail:
          "We handle contracting, administration, payments and legal, giving you a single point of contact across the engagement.",
      },
      {
        label: "Proven experts, actively managed",
        detail:
          "Every expert is screened by a partner, reviewed throughout the engagement, and replaced by us if the fit is not right.",
      },
    ],
  },
  {
    index: "02",
    slug: "consulting-projects",
    name: "Consulting Projects",
    promise: "A senior team, amplified by AI.",
    body: "When you need an outcome rather than additional capacity, we assemble the right team around your challenge and take ownership of delivery from strategy through execution.",
    points: [
      {
        label: "A holistic team shaped to your need",
        detail:
          "We bring together the right mix of subject matter experts, project leadership and partner oversight around the specific needs of each engagement.",
      },
      {
        label: "End to end support",
        detail:
          "From strategy and design through implementation and adoption, we support the engagement across the full lifecycle and stay involved through delivery.",
      },
      {
        label: "Technology solutions, built in",
        detail:
          "Where technology is part of the answer, we bring in trusted technology partners who can provide and implement the required solution as part of the engagement.",
      },
    ],
  },
];
