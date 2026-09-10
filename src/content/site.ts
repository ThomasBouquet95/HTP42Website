export const site = {
  name: "HealthTech Partners 42",
  shortName: "HTP42",
  url: "https://htp42.com",
  tagline: "Senior experts in life sciences data, AI and technology",
  positioning:
    "A senior expert network for life sciences data, AI and technology. Assembled per problem, accountable for outcomes.",
  description:
    "HealthTech Partners 42 is a senior expert network for the life sciences industry. We advise and deliver on clinical data, AI, technology strategy and digital transformation, with teams drawn from the people who ran these functions inside global pharma.",
  contact: {
    email: "ops@htp42.com",
    phone: "+1 (888) 456 7890",
    hq: "Basel, Switzerland",
    presence: ["Basel", "Paris", "Copenhagen", "Singapore"],
    linkedin: "https://www.linkedin.com/company/100788161",
  },
} as const;

export const nav = [
  { label: "Expertise", href: "/expertise" },
  { label: "The Network", href: "/network" },
  { label: "Client Impact", href: "/impact" },
  { label: "Perspectives", href: "/perspectives" },
  { label: "Contact", href: "/contact" },
] as const;

/** Headline proof points. Sourced from HTP42 delivery history. */
export const proofPoints = [
  {
    value: 200,
    suffix: "+",
    label: "Engagements delivered",
    note: "Across pharma, biotech, CROs and clinical technology companies",
  },
  {
    value: 50,
    suffix: "+",
    label: "Senior experts on call",
    note: "Plus the ability to source new experts for your needs through our extended network",
  },
  {
    value: 90,
    suffix: "%",
    label: "Client retention",
    note: "Most engagements are the second, third or fourth with the same client",
  },
  {
    value: 6,
    prefix: "",
    suffix: " wks",
    label: "Typical time to answer",
    note: "Median engagement length before a decision ready recommendation",
  },
] as const;

/** The short version of what makes the model different. */
export const differentiators = [
  {
    index: "01",
    title: "Operators, not observers",
    body: "Our experts held the roles they now advise on, at Novartis, Roche, Sanofi, Novo Nordisk, Johnson & Johnson and Amgen. They have signed off on submissions, owned budgets and lived with the consequences of their own decisions.",
    metric: "Ex VP · CTO · Head of function",
  },
  {
    index: "02",
    title: "Matched to your subject matter",
    body: "We do not send whoever is free. We match the specific subject matter expertise your problem needs, review it at senior level before anyone is onboarded, and tell you exactly who you are getting.",
    metric: "Topic specific expert matching",
  },
  {
    index: "03",
    title: "Hands on, never hand off",
    body: "The expert who frames the recommendation stays to see it through. Nothing gets passed to a delivery team that was not in the room when the decision was made, which is why our advice tends to survive contact with reality.",
    metric: "One team, start to finish",
  },
  {
    index: "04",
    title: "Weeks, not quarters",
    body: "Six to ten weeks to a decision ready answer is the norm. We size the team to the question, run parallel streams and hand over structured deliverables your organisation can act on immediately.",
    metric: "6 to 26 week engagements",
  },
  {
    index: "05",
    title: "Open standards by default",
    body: "CDISC, DDF, USDM, OpenStudyBuilder, COSA. We contribute to the standards our clients depend on, and we hold no reseller agreements or vendor commissions, so our recommendations carry no commercial incentive.",
    metric: "CDISC · COSA contributors",
  },
  {
    index: "06",
    title: "Network economics",
    body: "One independent adviser gives you depth in one place. A large firm gives you scale without it. We assemble the specific experts your problem needs, five for eight weeks or eight across twenty six, and source new ones through our extended network when the brief calls for it.",
    metric: "Assembled per problem",
  },
] as const;

/** Signals used in the hero marquee and capability strips. */
export const capabilityKeywords = [
  "Clinical Data Management",
  "EU AI Act Readiness",
  "OpenStudyBuilder",
  "CDISC · SDTM · ADaM",
  "Target Operating Model",
  "USDM 4.0 · DDF",
  "Secondary Use & RWD",
  "GenAI Operations",
  "Statistical Computing",
  "Data Mesh & Governance",
  "Cloud Architecture",
  "Knowledge Graphs",
  "Metadata Repositories",
  "Responsible AI",
] as const;

export const clientTypes = [
  "Top 10 global pharma",
  "Mid size European pharma",
  "Biotech R&D organisations",
  "Clinical technology companies",
  "Contract research organisations",
  "Health technology investors",
] as const;

