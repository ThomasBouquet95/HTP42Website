export type Leader = {
  name: string;
  role: string;
  note: string;
  /**
   * Square portrait under `public/team/`. Optional: where we do not hold a
   * photograph the card falls back to a typeset monogram, so a partner can be
   * listed before their portrait arrives.
   */
  photo?: string;
};

export type Discipline = {
  index: string;
  name: string;
  summary: string;
};

/** Headline network size. Extended sourcing sits on top of this. */
export const EXPERT_COUNT = 50;

export const leadership: Leader[] = [
  {
    name: "Pascal Bouquet",
    role: "Managing Director & Partner",
    note: "Former Novartis VP and Head of Technology (CTO) for data42. Health data, AI strategy and clinical data systems.",
    photo: "/team/pascal-bouquet.jpg",
  },
  {
    name: "Gabriel Eichler",
    role: "Partner",
    note: "Former VP and Chief Data Officer for data42 at Novartis. Founder of Oak Health Partners, advising top 10 pharma and investors.",
    photo: "/team/gabriel-eichler.jpg",
  },
  {
    name: "Jennifer Cubino",
    role: "Partner",
    note: "Clinical operations executive, first in human through post authorisation. Real world data, EMR and privacy, across oncology, immunology and rare disease.",
    photo: "/team/jennifer-cubino.jpg",
  },
  {
    name: "Linda D.",
    role: "Partner",
    note: "Data strategy leader with deep experience in clinical trial reengineering and biostatistics.",
    photo: "/team/linda-d.jpg",
  },
];

/**
 * Where the depth sits. We publish the shape of the network and its depth,
 * not the individuals: the bench itself is the firm's intellectual property,
 * and named profiles are shared under NDA during scoping.
 */
export const disciplines: Discipline[] = [
  {
    index: "01",
    name: "Data & AI Strategy",
    summary:
      "Data governance, knowledge graphs, analytics and AI enablement inside global pharmaceutical organisations.",
  },
  {
    index: "02",
    name: "Clinical Data Science & Biostatistics",
    summary:
      "CDISC standards, statistical programming, submission readiness and clinical data automation.",
  },
  {
    index: "03",
    name: "Technology, Architecture & Engineering",
    summary:
      "Enterprise architecture, cloud engineering, GxP validation and full stack delivery at sponsor scale.",
  },
  {
    index: "04",
    name: "Digital Health & AI Innovation",
    summary:
      "Digital health strategy, medical imaging AI, genomics and translational innovation.",
  },
  {
    index: "05",
    name: "Strategy, Transformation & Programme Leadership",
    summary:
      "Operating model design, GxP transformation programmes, PMO leadership and commercial strategy.",
  },
  {
    index: "06",
    name: "Drug Development & Regulatory Affairs",
    summary:
      "Clinical development strategy, medical affairs and regulatory pathways for pharma and devices.",
  },
];

/**
 * Why a curated network sits between a large firm and a single independent
 * adviser: the depth of a specialist, with the ability to assemble a team.
 */
export const modelComparison = {
  columns: [
    { key: "htp42", label: "HTP42", accent: true },
    { key: "large", label: "Large consultancy" },
    { key: "solo", label: "Independent consultant" },
  ],
  rows: [
    {
      dimension: "Who does the work",
      htp42: "Named seniors, agreed before signature",
      large: "Partner sells, associates deliver",
      solo: "The one person you engaged",
    },
    {
      dimension: "Domain depth",
      htp42: "Sourced for your specific subject matter",
      large: "Industry practice, generalist core",
      solo: "Deep, but only where they specialise",
    },
    {
      dimension: "Scaling up",
      htp42: "One expert staffed, or a senior team assembled",
      large: "Large teams, variable seniority",
      solo: "The capacity of one person",
    },
    {
      dimension: "Continuity",
      htp42: "The same expert advises and delivers",
      large: "Advisory, delivery handed off",
      solo: "Ends when they move to the next client",
    },
    {
      dimension: "Speed of access",
      htp42: "Days to a named expert, weeks to a team",
      large: "A procurement cycle, then a staffing cycle",
      solo: "Bound by one person's availability",
    },
    {
      dimension: "Finding the right person",
      htp42: "Curated bench plus an extended sourcing network",
      large: "Whoever the practice has free",
      solo: "You run the search yourself",
    },
  ],
};

export type Value = {
  index: string;
  title: string;
  definition: string;
  practice: string[];
};

/** The six values, and what each one means in day to day delivery. */
export const values: Value[] = [
  {
    index: "01",
    title: "Real Expertise",
    definition:
      "Experts who deeply understand the subject matter, not generic profiles or random consultants.",
    practice: [
      "Topic specific expert matching",
      "Relevant life sciences experience",
      "Senior review before onboarding",
    ],
  },
  {
    index: "02",
    title: "Talent Quality",
    definition:
      "Experts are carefully selected, regularly reviewed and actively supported for consistent delivery.",
    practice: [
      "Structured expert qualification process",
      "Regular performance reviews",
      "Ongoing coaching and support",
    ],
  },
  {
    index: "03",
    title: "AI Augmented Expertise",
    definition:
      "Members with deep expertise leverage AI to its maximum potential, to increase productivity, accelerate delivery and scale their impact.",
    practice: [
      "AI used systematically in day to day work",
      "Faster research, analysis, synthesis and delivery",
      "Expert judgment ensures quality, relevance and trust",
    ],
  },
  {
    index: "04",
    title: "Client First",
    definition:
      "Flexible, responsive support adapted to evolving client needs and continuous feedback.",
    practice: [
      "Frequent client feedback loops",
      "Clear communication and alignment",
      "Fast response to changing needs",
    ],
  },
  {
    index: "05",
    title: "Human Standards",
    definition:
      "Nice, humble, collaborative people with strong soft skills and no ego issues.",
    practice: [
      "Soft skills assessed upfront",
      "No ego collaboration expected",
      "Respectful client team integration",
    ],
  },
  {
    index: "06",
    title: "Practical Impact",
    definition:
      "Useful, grounded solutions that solve real problems, without unnecessary complexity or buzzwords.",
    practice: [
      "Focus on measurable outcomes",
      "No unnecessary complexity",
      "Clear value delivered quickly",
    ],
  },
];
