export const site = {
  name: "HealthTech Partners 42",
  shortName: "HTP42",
  url: "https://htp42.com",
  tagline: "Senior experts in life sciences data, AI and technology",
  positioning:
    "A senior expert network for life sciences data, AI and technology. We find vetted experts for your need, or assemble the team to deliver an end to end solution.",
  description:
    "HealthTech Partners 42 is a senior expert network for life sciences. We find vetted experts for your team, or assemble a senior team to deliver the solution.",
  contact: {
    email: "ops@htp42.com",
    phone: "+1 (888) 456 7890",
    hq: "Basel, Switzerland",
    presence: ["Basel", "Paris", "Copenhagen", "Singapore"],
    linkedin: "https://www.linkedin.com/company/100788161",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Expertise", href: "/expertise" },
  { label: "The Network", href: "/network" },
  { label: "Client Impact", href: "/impact" },
  { label: "Perspectives", href: "/perspectives" },
  { label: "Contact", href: "/contact" },
] as const;

/** Headline proof points. Sourced from HTP42 delivery history. */
export const proofPoints = [
  {
    value: 5,
    suffix: "",
    label: "Partners",
    note: "Deep life sciences experience and extensive networks of their own",
  },
  {
    value: 50,
    suffix: "+",
    label: "Vetted senior experts",
    note: "Every one reviewed by a partner on subject matter depth and delivery record before onboarding",
  },
  {
    value: 500,
    suffix: "+",
    label: "Extended network",
    note: "Reachable through our experts' own networks, and screened to the same standard before they join an engagement",
  },
  {
    value: 200,
    suffix: "+",
    label: "Engagements delivered",
    note: "Across pharma, biotech, CROs and clinical technology companies",
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
  "Data Governance",
  "Cloud Architecture",
  "Knowledge Graphs",
  "Metadata Repositories",
  "Responsible AI",
] as const;

/**
 * Named clients for the logo strip. `logo` points at a file under
 * public/logos/ when the real asset is available; until then the wordmark is
 * set in type. Casing follows each brand's own usage.
 */
export type Client = { name: string; logo?: string };

export const clients: Client[] = [
  { name: "Novartis" },
  { name: "Roche" },
  { name: "Novo Nordisk" },
  { name: "Sandoz" },
  { name: "Pierre Fabre" },
  { name: "argenx" },
  { name: "eClinical Solutions" },
  { name: "QuantHealth" },
  { name: "Appsilon" },
];

/**
 * The same four numbers as a hero facts rail. The homepage band and the
 * interior page heroes read from one source, so they cannot drift apart.
 */
export const proofFacts = proofPoints.map((point) => ({
  label: point.label,
  value: `${point.value}${point.suffix}`,
}));


