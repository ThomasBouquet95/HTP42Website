export type Offering = {
  index: string;
  slug: string;
  name: string;
  promise: string;
  body: string;
  points: { label: string; detail: string }[];
  icon: "deploy" | "project";
};

/** The two ways clients work with HTP42. */
export const offerings: Offering[] = [
  {
    index: "01",
    slug: "expert-deployment",
    name: "Expert Deployment",
    promise: "We find the expert. You sign one contract.",
    body: "You tell us the need. We find the right expert, vet them, and staff them onto your team. HTP42 is your single counterparty, wherever in the world that expert sits, and we carry the administration, contracting, payment and legal work so you never manage a roster of independents.",
    points: [
      {
        label: "Hard to find expertise, matched to your need",
        detail:
          "Sourced on subject matter rather than availability, from the bench or from our experts' own networks.",
      },
      {
        label: "One counterparty, one contract",
        detail:
          "You face HTP42, not a dozen individuals. One agreement, one invoice, one point of accountability.",
      },
      {
        label: "Administration and legal handled",
        detail:
          "Contracting, timesheets, payments, compliance and cross border arrangements sit with us.",
      },
      {
        label: "Continuously managed talent",
        detail:
          "Vetted before onboarding, reviewed on every engagement, supported throughout.",
      },
    ],
    icon: "deploy",
  },
  {
    index: "02",
    slug: "consulting-projects",
    name: "Consulting Projects",
    promise: "A team of senior experts, not a pyramid of juniors.",
    body: "When the work needs a team, we assemble one from the network. Senior experts who have done it before, amplified by AI rather than padded out with juniors learning your problem on your budget. We cover the full value chain, from strategy through end to end implementation and change management.",
    points: [
      {
        label: "Senior only teams",
        detail:
          "Nobody on the engagement is learning your domain at your expense. Every person is someone you would have hired directly.",
      },
      {
        label: "AI augmented delivery",
        detail:
          "Our experts use AI systematically, so research, analysis and synthesis move faster while judgment stays human.",
      },
      {
        label: "The full value chain",
        detail:
          "Strategy, design, end to end implementation and the change management that makes it stick.",
      },
      {
        label: "One accountable partner",
        detail:
          "A single engagement partner from framing to handover, and the experts named before you sign.",
      },
    ],
    icon: "project",
  },
];
