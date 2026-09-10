export const site = {
  name: "HealthTechPartners 42",
  shortName: "HTP42",
  url: "https://htp42.com",
  tagline: "Data, AI and technology strategy for life sciences",
  positioning:
    "A senior expert network for life sciences data, AI and technology — assembled per problem, accountable for outcomes.",
  description:
    "HealthTechPartners 42 is a senior expert network for the life sciences industry. We advise and deliver on clinical data, AI, technology strategy and digital transformation — with teams drawn from the people who built these functions inside global pharma.",
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
  { label: "Client Impact", href: "/impact" },
  { label: "The Network", href: "/network" },
  { label: "Perspectives", href: "/perspectives" },
  { label: "Contact", href: "/contact" },
] as const;

/** Headline proof points. Sourced from HTP42 delivery history. */
export const proofPoints = [
  {
    value: 200,
    suffix: "+",
    label: "Engagements delivered",
    note: "Across pharma, biotech, CROs and clinical technology vendors",
  },
  {
    value: 40,
    suffix: "+",
    label: "Senior experts on call",
    note: "Former VPs, CTOs, heads of function and principal architects",
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
    note: "Median engagement length before a decision-ready recommendation",
  },
] as const;

/** The short version of what makes the model different. */
export const differentiators = [
  {
    index: "01",
    title: "Operators, not observers",
    body: "Our experts held the roles they now advise on — Novartis, Roche, Sanofi, Novo Nordisk, Johnson & Johnson, Amgen. They have signed off on submissions, owned platform budgets and lived with the consequences of their own architecture decisions.",
    metric: "Ex-VP · CTO · Head of function",
  },
  {
    index: "02",
    title: "Seniors only — no pyramid",
    body: "There is no leverage model to feed. You are not funding a bench of analysts learning your domain on your budget. Every person on the engagement is someone you would have hired directly if you could find them.",
    metric: "Zero junior workstreams",
  },
  {
    index: "03",
    title: "We build, not just advise",
    body: "The same team that writes the strategy deploys the platform. OpenStudyBuilder in AWS, USDM 4.0 semantic engines, SDTM/ADaM pipelines, MCP endpoints for AI agents — production systems, not reference architectures.",
    metric: "One contract, one team",
  },
  {
    index: "04",
    title: "Weeks, not quarters",
    body: "Six to ten weeks to a decision-ready answer is the norm. We size the team to the question, run in parallel streams and hand over structured deliverables your organisation can act on immediately.",
    metric: "6–26 week engagements",
  },
  {
    index: "05",
    title: "Open standards by default",
    body: "CDISC, DDF, USDM, OpenStudyBuilder, COSA. We contribute to the standards our clients depend on, which means no vendor lock-in dressed up as an architecture recommendation.",
    metric: "CDISC · COSA contributors",
  },
  {
    index: "06",
    title: "Network economics",
    body: "A large firm sells you the team it has available. We assemble the team your problem requires — five experts for eight weeks, or eight specialists across twenty-six — then stand down. You pay for expertise, not overhead.",
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
  "Top-10 global pharma",
  "Mid-size European pharma",
  "Clinical data platform vendors",
  "Biotech R&D organisations",
  "Contract research organisations",
  "Health technology investors",
] as const;

export const partners = [
  {
    name: "Appsilon",
    role: "Validated open-source computing",
    body: "A technology partner for pharmaceutical companies that want to speed up drug development and become ready for the open-source and AI revolution within validated, regulatory-compliant computing environments.",
  },
  {
    name: "Rekonnekt",
    role: "Executive network & convening",
    body: "A transformational networking community that fuses movement, adventure and purpose to spark genuine connections among high-performing business professionals and entrepreneurs.",
  },
] as const;
