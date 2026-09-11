export type Audience = {
  index: string;
  who: string;
  label: string;
  /** The situation, in their words. */
  problem: string;
  /** What HTP42 changes for them. */
  gains: string[];
  icon: "clients" | "leaders" | "experts";
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
    icon: "clients",
    label: "Pharma, biotech and clinical technology teams",
    problem:
      "You need highly specific expertise. Large consultancies are often costly and broad, hiring is slow and constrained by headcount, and managing independents creates additional contracting and administrative overhead.",
    gains: [
      "Access to hard to find experts, matched to each specific need",
      "Vetted, high quality talent through continuous talent management",
      "One counterparty for contracting, administration and expert management",
      "Senior teams for larger work, staffed with experts throughout",
    ],
  },
  {
    index: "02",
    who: "Senior leaders",
    icon: "leaders",
    label: "Partners who bring opportunities and reputation",
    problem:
      "You know who to trust beyond a CV. HTP42 gives you the structure to bring those people into engagements without the burden of administration, contracting or payment management.",
    gains: [
      "Focus on clients and delivery while we handle the operational and legal backbone",
      "Bring trusted specialists into projects under a shared quality standard",
      "Access opportunities generated across the full HTP42 network",
      "Lead larger engagements than you could staff independently",
    ],
  },
  {
    index: "03",
    who: "Experts",
    icon: "experts",
    label: "Specialists who would rather deliver than sell",
    problem:
      "You want to apply your expertise, not spend your time on business development. HTP42 brings relevant opportunities, a strong peer network and the support needed to deliver effectively.",
    gains: [
      "Relevant engagements without continuous selling",
      "Opportunities generated across the HTP42 network, not only your own contacts",
      "Access to specialists in adjacent domains when broader expertise is needed",
      "Shared tools, IP, technology partners and delivery support",
    ],
  },
];

/** The point the three sides add up to. */
export const networkEffect =
  "Senior leaders know who to trust. Experts know their subject. Put both in one network and clients get access they could not source alone.";
