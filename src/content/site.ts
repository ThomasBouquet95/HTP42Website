import { leadership } from "@/content/network";

export const site = {
  name: "HealthTech Partners 42",
  shortName: "HTP42",
  url: "https://htp42.com",
  tagline: "Senior experts in life sciences data, AI and technology",
  positioning:
    "A senior expert network for life sciences data, AI and technology. We find vetted experts for your need, or assemble the team to deliver an end to end solution.",
  description:
    "HealthTech Partners 42 is a network of senior experts helping life sciences companies solve complex data, AI and technology challenges.",
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
    // Derived, so the headline number cannot drift from the partners actually
    // listed on the site. It said five while four were shown.
    value: leadership.length,
    suffix: "",
    label: "Partners",
    note: "Deep life sciences expertise, backed by extensive professional networks",
  },
  {
    value: 50,
    suffix: "+",
    label: "Experts",
    note: "Every expert is personally reviewed by a partner for subject matter depth and proven delivery experience before joining the network",
  },
  {
    value: 500,
    suffix: "+",
    label: "Extended network",
    note: "Additional specialists sourced through our experts' trusted networks and screened to the same standard before joining an engagement",
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


