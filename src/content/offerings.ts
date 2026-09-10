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
    promise: "We find the experts. You sign one contract.",
    body: "You tell us the need. We find the right experts, vet them, and embed them in your team for as long as the need lasts, whether that is a few months or a few years. HTP42 is your single counterparty wherever in the world they sit, and we carry the contracting, administration, payment and legal work so you never manage a roster of independents.",
    points: [
      {
        label: "Hard to find expertise, matched to your need",
        detail:
          "Sourced on subject matter rather than availability, from our own experts or through their networks.",
      },
      {
        label: "One counterparty, one contract",
        detail:
          "You face HTP42, not a set of individuals. One agreement, one invoice, one point of accountability, however many experts are involved.",
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
    promise: "Senior experts empowered by AI, not a pyramid of juniors.",
    body: "When you need a programme delivered rather than a role filled, we assemble the team from the network. Senior experts who have done it before, empowered by AI rather than padded out with juniors learning your problem on your budget. We take it from strategy through implementation to the change management that makes it hold.",
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
        label: "Strategy through to change management",
        detail:
          "Strategy, design, end to end implementation, and the organisational change that decides whether any of it lasts.",
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
