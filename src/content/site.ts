export const site = {
  name: "HealthTech Partners 42",
  shortName: "HTP42",
  url: "https://htp42.com",
  tagline: "Senior experts in life sciences data, AI and technology",
  positioning:
    "A senior expert network for life sciences data, AI and technology. We find the right expert for your need, or assemble the team to deliver the whole programme.",
  description:
    "HealthTech Partners 42 is a senior expert network for the life sciences industry. We find and staff the experts you need, or assemble a senior team to deliver a programme end to end, across clinical data, AI, technology strategy and digital transformation.",
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
    label: "Vetted senior experts on call",
    note: "Every expert reviewed by a partner on subject matter depth and delivery record before onboarding",
  },
  {
    value: 200,
    suffix: "+",
    label: "Reachable through our experts' networks",
    note: "Sourced and vetted to the same standard when a brief needs expertise we do not already hold",
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

