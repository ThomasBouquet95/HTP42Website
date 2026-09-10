export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  client: string;
  clientType: string;
  year: string;
  duration: string;
  team: string;
  practices: string[];
  tags: string[];
  /** One line consequence, used on cards and in the index. */
  headline: string;
  challenge: string;
  challengeDetail: string[];
  approach: string;
  approachDetail: string[];
  outcomes: { label: string; body: string }[];
  impact: string;
  /** Featured metrics rendered as a strip on the detail page. */
  metrics: { value: string; label: string }[];
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "openstudybuilder-sprint-deployment",
    title: "OpenStudyBuilder Implementation",
    kicker: "Full sprint based deployment",
    client: "US clinical technology company with a global pharma sponsor",
    clientType: "Clinical technology company and Top 20 pharma sponsor",
    year: "2026",
    duration: "26 weeks",
    team: "8 specialists",
    practices: ["Clinical Data & Standards", "Technology Strategy & Architecture"],
    tags: ["OpenStudyBuilder", "CDISC", "AWS", "SDTM and ADaM", "Go live"],
    headline:
      "The largest single OpenStudyBuilder deployment in HTP42's history, delivered end to end as prime technical subcontractor.",
    challenge:
      "A global pharmaceutical sponsor needed a structured, sprint based OpenStudyBuilder implementation integrated with its clinical data environment, inside a multi party governance model where no single supplier owned the whole picture.",
    challengeDetail: [
      "Scope spanned CDISC standards alignment workshops, SDTM and ADaM transformation workflow development, metadata repository configuration, end to end data flow hardening with real study data, and a self service training programme.",
      "The delivery model involved several suppliers and the sponsor's own IT organisation, which meant technical decisions had to be defensible to three separate governance bodies.",
      "The sponsor required a production grade environment rather than a pilot, with full data lineage documentation and a path to self sufficiency after handover.",
    ],
    approach:
      "HTP42 fielded eight named specialists across seven sprints as prime OpenStudyBuilder subcontractor, one expert against each technical domain rather than a generalist team.",
    approachDetail: [
      "One specialist led OSB implementation, architecture and standards across 35 days, owning the coherence of the whole build.",
      "A second handled backend CI/CD and pipeline engineering across 25 days. A third architected the AWS layer across 15 days.",
      "Further experts ran CDISC alignment workshops across 10 days, created the training and video curriculum across 10 days, and provided project management across the multi party governance model across 20 days.",
      "Delivery ran as seven sprints with working software at each boundary, hardened progressively against real study data rather than synthetic fixtures.",
    ],
    outcomes: [
      {
        label: "Production ready environments",
        body: "OpenStudyBuilder deployed across development, test and production on AWS with full metadata repository and controlled terminology configuration.",
      },
      {
        label: "Validated transformation workflows",
        body: "SDTM and ADaM transformation workflows built, validated and hardened against real study data rather than sample datasets.",
      },
      {
        label: "Self sufficiency after handover",
        body: "Self service training programme, go live readiness package and complete data lineage documentation delivered to the sponsor's own team.",
      },
    ],
    impact:
      "The sponsor went live on a production OpenStudyBuilder estate with validated CDISC transformation workflows and an internal team capable of running it. The largest single OSB engagement HTP42 has delivered, and a reference implementation for the wider industry.",
    metrics: [
      { value: "7", label: "Delivery sprints" },
      { value: "3", label: "AWS environments to production" },
      { value: "8", label: "Named senior specialists" },
    ],
    featured: true,
  },
  {
    slug: "digital-data-flow-semantic-harmonization",
    title: "Digital Data Flow Challenge",
    kicker: "OSB and semantic harmonisation engine",
    client:
      "US clinical technology company with a global top 10 pharma client",
    clientType: "Clinical technology company and Top 10 pharma",
    year: "2026",
    duration: "8 weeks",
    team: "7 specialists",
    practices: ["Clinical Data & Standards", "Data & AI"],
    tags: ["USDM 4.0", "DDF", "Semantic harmonisation", "AI access layer", "AWS"],
    headline:
      "A production ready semantic backbone and AI query layer built in eight weeks, positioning the client as a finalist in a global pharma digital data flow programme.",
    challenge:
      "As part of a global pharma Breakthrough Change Accelerator programme, a consortium had eight weeks to demonstrate end to end Digital Data Flow across a corpus of real clinical protocols.",
    challengeDetail: [
      "The demonstration had to prove that heterogeneous protocol inputs could be resolved into a single canonical vocabulary, the problem the industry has been circling for a decade.",
      "Outputs had to be USDM 4.0 compliant with full downstream traceability, and explainable enough that a sponsor's standards organisation would accept them.",
      "Eight weeks covered environment setup through to final presentation, with no room for a discovery phase.",
    ],
    approach:
      "HTP42 coordinated the consortium and provided the clinical data flow expertise, deploying OpenStudyBuilder in AWS, building a five step semantic harmonisation engine and delivering USDM 4.0 compliant study definitions.",
    approachDetail: [
      "One specialist coordinated the consortium and provided clinical data flow expertise across 25 days.",
      "A second led Python development and testing across 40 days. A third architected the OSB graph model. A fourth architected the AWS and AI access layer.",
      "The project ran in four phases from environment setup to final presentation, with every output explicitly marked, explainable and traceable to its source protocol.",
      "Query endpoints were exposed so that downstream AI agents could reach the semantic layer directly rather than through bespoke integration.",
    ],
    outcomes: [
      {
        label: "Standards configuration at depth",
        body: "OpenStudyBuilder deployed on AWS with USDM 4.0 and DDF Terminology configured across 107 codelists and 704 terms.",
      },
      {
        label: "Semantic harmonisation engine",
        body: "A five step engine delivering a single canonical vocabulary across all protocol inputs, with explainable intermediate outputs.",
      },
      {
        label: "An AI queryable data layer",
        body: "Full protocol to ADaM traceability report, with query endpoints exposed for downstream AI agents.",
      },
    ],
    impact:
      "The client entered the final round of a global pharma digital data flow programme with a working, production ready semantic backbone, and a demonstrable answer to the traceability question that decides these evaluations.",
    metrics: [
      { value: "107", label: "DDF codelists configured" },
      { value: "704", label: "Terminology terms" },
      { value: "5", label: "Harmonisation engine steps" },
    ],
    featured: true,
  },
  {
    slug: "clinical-data-operating-model-assessment",
    title: "Clinical Data Management & Operating Model Assessment",
    kicker: "End to end CDM review, TOM scenarios and transformation roadmap",
    client: "Mid size European pharma, R&D and Clinical Development",
    clientType: "Mid size European pharma",
    year: "2026",
    duration: "8 to 10 weeks",
    team: "5 experts",
    practices: [
      "Digital Transformation & Operating Model",
      "Clinical Data & Standards",
    ],
    tags: ["Target operating model", "RACI", "CRO strategy", "RBQM", "Roadmap"],
    headline:
      "Three costed operating model scenarios and an 18 to 36 month roadmap, giving leadership a defensible basis for prioritising CDM investment.",
    challenge:
      "The client faced significant variability in processes, roles and handovers across clinical data management, clinical operations, biostatistics and medical writing.",
    challengeDetail: [
      "Several emerging initiatives, among them risk based quality management, a statistical computing environment and simulation tooling, were advancing without a unifying framework, each with its own assumptions about the target state.",
      "Leadership questioned whether the CRO outsourcing model was optimal for the company's scale, but had no structured evidence either way.",
      "Without a shared view of the current state, every investment case was being argued from a different set of facts.",
    ],
    approach:
      "Five HTP42 experts ran a three stream engagement covering process, technology and target operating model, under a single accountable engagement partner.",
    approachDetail: [
      "As is mapping of processes, RACI, vendors and data flows across all four functions, surfacing where variability was actually generating cost and rework.",
      "Technology and architecture assessment covering EDC, metadata tooling and cloud scenarios.",
      "Design of three future state target operating model scenarios, from an optimised current model through to a cloud native, AI enabled operating model.",
      "The lead engagement partner provided strategic oversight. Two experts led the process and operating model work and the architecture stream respectively.",
    ],
    outcomes: [
      {
        label: "A structured evidence base",
        body: "Eight structured deliverables including a diagnosis report, root cause analysis and future state scenarios.",
      },
      {
        label: "Real choices, costed",
        body: "Three target operating model scenarios spanning an optimised current model through to a cloud native, AI enabled operating model.",
      },
      {
        label: "Sequenced transformation",
        body: "A prioritised 18 to 36 month transformation roadmap with an executive summary deck built for board level decision making.",
      },
    ],
    impact:
      "Delivered the strategic clarity that let the client prioritise CDM transformation investment across process, organisation, technology and vendor strategy, replacing four competing internal narratives with one evidence base.",
    metrics: [
      { value: "8", label: "Structured deliverables" },
      { value: "3", label: "Costed TOM scenarios" },
      { value: "18 to 36", label: "Month roadmap horizon" },
    ],
    featured: true,
  },
  {
    slug: "responsible-ai-eu-ai-act-framework",
    title: "Responsible AI & EU AI Act Compliance Framework",
    kicker: "AI governance policy, client data usage audit and compliance roadmap",
    client: "US clinical data technology company",
    clientType: "Clinical technology company",
    year: "2025",
    duration: "6 weeks",
    team: "2 consultants",
    practices: ["Data & AI"],
    tags: ["EU AI Act", "AI governance", "Risk triage", "Data usage audit"],
    headline:
      "An AI governance policy the client could put in front of pharma customers within six weeks, reducing commercial risk while EU AI Act work continued.",
    challenge:
      "The client faced growing pressure from pharma customers to demonstrate credible AI governance and data usage controls.",
    challengeDetail: [
      "With over 500 business development deliverables per year and a wide AI portfolio, informal controls were no longer defensible in customer due diligence.",
      "The company needed an AI Governance Policy v1.0, a clear internal audit of how client data was being used across technical teams, and a prioritised roadmap aligned to the EU AI Act.",
      "The commercial clock mattered more than the regulatory one. Deals were being slowed by questions the company could not yet answer.",
    ],
    approach:
      "One partner led the engagement and programme design. A senior analytical consultant executed the deep dive analysis, and one expert on the EU AI Act advised on regulatory alignment.",
    approachDetail: [
      "The first stream produced the governance policy, an AI intake and risk triage form, an AI Record template and a governance RACI naming actual owners.",
      "A client data usage report was built from six to seven internal stakeholder interviews across the technical functions.",
      "Findings were risk classified so that remediation could be sequenced by exposure rather than by ease.",
      "The roadmap was aligned to both EU AI Act obligations and existing contractual commitments to customers.",
    ],
    outcomes: [
      {
        label: "Governance the company can operate",
        body: "AI Governance Policy v1.0, enabling immediate client facing compliance statements.",
      },
      {
        label: "An honest internal picture",
        body: "Client data usage report with risk triage classification across all technical functions.",
      },
      {
        label: "Sequenced remediation",
        body: "Prioritised AI and data compliance roadmap aligned to the EU AI Act and to contractual requirements.",
      },
    ],
    impact:
      "Equipped the client to credibly demonstrate AI governance to pharma customers, reducing commercial risk immediately and laying the foundation for full EU AI Act compliance.",
    metrics: [
      { value: "6 wks", label: "To policy v1.0" },
      { value: "500+", label: "Annual BD deliverables covered" },
      { value: "7", label: "Internal functions audited" },
    ],
  },
  {
    slug: "research-data-strategy-governance",
    title: "Research Data Strategy & Governance Foundations",
    kicker: "Research data vision, governance principles and roadmap inputs",
    client: "Mid size European pharma, IT and Research & Development",
    clientType: "Mid size European pharma",
    year: "2026",
    duration: "8 to 10 weeks",
    team: "2 consultants",
    practices: ["Data & AI"],
    tags: ["Data strategy", "Governance", "Use case design", "Cloud"],
    headline:
      "A shared research data vision agreed before the technology decision, avoiding a decade of technology led lock in.",
    challenge:
      "The client was at a critical inflection point. A cloud environment had been selected for Research, the data landscape was fragmented, and the priority use cases in generative chemistry and translational science were data limited rather than AI limited.",
    challengeDetail: [
      "Imminent technology decisions required a clear, business driven data strategy to avoid technology led lock in.",
      "The most valuable use cases were constrained by data availability and quality, not by model capability, a distinction the organisation had not yet made explicit.",
      "Research, IT and business stakeholders each held a different implicit view of what the data estate was for.",
    ],
    approach:
      "Two HTP42 experts ran up to twelve stakeholder engagement sessions and facilitated use case driven workshops, synthesising the strategy themselves rather than delegating it to a template.",
    approachDetail: [
      "Up to twelve structured stakeholder engagements across Research, IT and business functions.",
      "Use case driven workshops that separated data limited problems from AI limited ones, and ranked them by business value.",
      "Synthesis of a Research Data Strategy covering vision, objectives, guiding principles, governance advisory and phased roadmap inputs.",
      "Analytical and workshop support provided throughout, so the client's own team could focus on judgement rather than production.",
    ],
    outcomes: [
      {
        label: "An agreed vision",
        body: "Research Data Strategy document with vision, objectives and guiding principles, aligned across Research, IT and business.",
      },
      {
        label: "Business need made concrete",
        body: "Up to ten strategic use case cards translating business needs into data driven priorities and requirements.",
      },
      {
        label: "Decision ready governance",
        body: "Governance advisory recommendations and an executive summary deck built for the imminent investment decisions.",
      },
    ],
    impact:
      "Established a shared research data vision grounded in business needs, enabling coherent investment decisions ahead of cloud implementation rather than after it.",
    metrics: [
      { value: "12", label: "Stakeholder engagements" },
      { value: "10", label: "Strategic use case cards" },
      { value: "8 to 10", label: "Weeks to agreed strategy" },
    ],
  },
  {
    slug: "genai-bd-operations-automation",
    title: "GenAI Powered BD Operations Automation",
    kicker:
      "Proof of concept for RFP triage, proposal generation and questionnaire response",
    client: "US clinical data technology company",
    clientType: "Clinical technology company",
    year: "2026",
    duration: "6 weeks",
    team: "2 consultants",
    practices: ["Data & AI"],
    tags: ["GenAI", "Benchmarking", "Process automation", "Investment decision"],
    headline:
      "An evidence based decision on production GenAI automation, reached before any major technology or change management investment.",
    challenge:
      "The client's business development operations team of four was producing over 500 deliverables per year and had hit a structural capacity ceiling.",
    challengeDetail: [
      "Existing AI assisted tooling achieved roughly 80% first pass coverage but required heavy SME correction, which absorbed the time it was meant to save.",
      "The team estimated the current model could not sustain projected workload growth beyond two months without meaningful automation.",
      "Leadership needed to know whether GenAI genuinely outperformed the incumbent tooling, a question no vendor demonstration could answer.",
    ],
    approach:
      "One senior lead managed the engagement. One specialist executed two tightly scoped use cases over six weeks, instrumented for comparison rather than for demonstration.",
    approachDetail: [
      "The first use case covered RFP and RFI triage and proposal generation, using Claude and ChatGPT against a Loopio and SharePoint knowledge base.",
      "The second covered questionnaire response automation across live business development submissions.",
      "Both were benchmarked against the existing tooling's output on accuracy, completeness and review burden, not against a blank page.",
      "SME quality evaluation and effort to finalise scoring were applied to every generated deliverable.",
    ],
    outcomes: [
      {
        label: "A working, measured proof of concept",
        body: "AI generated RFP triage and proposal drafts with SME quality evaluation and effort to finalise scoring.",
      },
      {
        label: "An honest benchmark",
        body: "GenAI compared against existing tooling on accuracy, completeness and review burden.",
      },
      {
        label: "A decision, not a demonstration",
        body: "Clear recommendation with toolchain assessment, process gap analysis and phase two scoping.",
      },
    ],
    impact:
      "Delivered objective, evidence based findings that let the client make an informed decision on production GenAI automation before committing to any major technology or change management investment.",
    metrics: [
      { value: "500+", label: "Annual deliverables in scope" },
      { value: "2", label: "Instrumented use cases" },
      { value: "6 wks", label: "To a decision" },
    ],
  },
  {
    slug: "technology-blueprint-enterprise-readiness",
    title: "Technology Blueprint & Roadmap toward Enterprise Readiness",
    kicker: "Pharma integration patterns, deployment models and technical roadmap",
    client: "US clinical AI company",
    clientType: "Clinical AI company",
    year: "2025",
    duration: "6 weeks",
    team: "2 experts",
    practices: ["Technology Strategy & Architecture"],
    tags: [
      "Enterprise readiness",
      "Integration patterns",
      "Clinical AI",
      "Roadmap",
    ],
    headline:
      "Senior sponsor side perspective that aligned a product roadmap with what enterprise pharma actually requires before it buys.",
    challenge:
      "A clinical trial simulation and AI company needed to define its technology blueprint and enterprise readiness roadmap to support commercial expansion into large pharma accounts.",
    challengeDetail: [
      "The company required an expert perspective on pharma enterprise requirements, deployment patterns and integration expectations to guide both product and commercial strategy.",
      "Product decisions were being made without a reliable model of how large sponsors actually deploy, validate and integrate third party clinical AI.",
      "Commercial conversations were stalling on questions the product roadmap had not yet anticipated.",
    ],
    approach:
      "A senior technology executive and a medical expert contributed structured input across two three hour workshops, with HTP42 leading the engagement end to end.",
    approachDetail: [
      "Workshops covered process integration in clinical study design, summarised pharma enterprise requirements, and produced actionable roadmap inputs.",
      "Preparation materials were built in advance so that both sessions were spent on judgement rather than on briefing.",
      "Outputs were framed as roadmap inputs the product organisation could act on directly, and as positioning the commercial team could use immediately.",
    ],
    outcomes: [
      {
        label: "Focused senior input",
        body: "Two structured expert workshops with preparation materials and actionable outputs.",
      },
      {
        label: "Requirements made explicit",
        body: "Pharma enterprise requirements and deployment pattern summary informing the product roadmap.",
      },
      {
        label: "Commercial positioning",
        body: "Process integration recommendations for study design, enabling commercial scale up positioning.",
      },
    ],
    impact:
      "Rapid senior advisory that let the client align its product roadmap with enterprise pharma deployment and integration expectations ahead of commercial scale up.",
    metrics: [
      { value: "6 wks", label: "Engagement length" },
      { value: "2", label: "Structured workshops" },
      { value: "2", label: "Senior experts" },
    ],
  },
];

export const featuredCases = caseStudies.filter((c) => c.featured);

export function getCase(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
