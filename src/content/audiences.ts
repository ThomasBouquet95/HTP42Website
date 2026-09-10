export type Audience = {
  index: string;
  who: string;
  label: string;
  /** The situation, in their words. */
  problem: string;
  /** What HTP42 changes for them. */
  gains: string[];
};

/**
 * The three sided proposition. HTP42 works because it solves a different
 * problem for each side, and each side makes the others better: senior
 * leaders bring the judgment about who to trust, experts bring the depth,
 * and clients get access neither could offer alone.
 */
export const audiences: Audience[] = [
  {
    index: "01",
    who: "Clients",
    label: "Pharma, biotech and clinical technology teams",
    problem:
      "You need highly specific expertise. Large consultancies are costly and generalist, permanent hiring is slow and hard to justify, and managing a handful of independents creates its own overhead in timesheets, contracts and payments.",
    gains: [
      "Access to hard to find experts, matched to each specific need",
      "Vetted, high quality talent through continuous talent management",
      "One counterparty for contracting, administration and expert management",
      "Senior teams for larger work, without a pyramid of juniors",
    ],
  },
  {
    index: "02",
    who: "Senior leaders",
    label: "Partners who bring opportunities and reputation",
    problem:
      "You have the network, and you know who to trust beyond a CV. But putting that judgment to work means finding specialists you would stake your reputation on, then carrying the admin, contracting and payment chasing that comes with it.",
    gains: [
      "You focus on clients and projects, we carry admin, contracting, payment and legal",
      "Specialists you can put your reputation behind, vetted to a shared standard",
      "Opportunities generated across the whole network, not just your own",
      "The scale to lead larger projects than you could staff alone",
    ],
  },
  {
    index: "03",
    who: "Experts",
    label: "Specialists who would rather deliver than sell",
    problem:
      "You want to focus on delivery and value creation, not on selling yourself. Your pipeline depends too heavily on your own network, you sometimes need expertise outside your own domain, and you miss the tools and peer support of a larger firm.",
    gains: [
      "Relevant projects without having to sell continuously",
      "Opportunities generated across the HTP42 network, not just your contacts",
      "Specialists in other domains to call on when a brief reaches past yours",
      "Shared IP, tools and centres of excellence to build on",
    ],
  },
];

/** The point the three sides add up to. */
export const networkEffect =
  "Senior leaders know who to trust beyond a CV. Experts know their subject better than anyone. Put both in one network and clients get access they could not source alone.";
