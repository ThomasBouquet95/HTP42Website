export type Service = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  deliverables: string[];
};

export type ExpertiseArea = {
  slug: string;
  index: string;
  name: string;
  promise: string;
  lead: string;
  icon: "brain" | "database" | "blueprint" | "transform";
  services: Service[];
};

export const expertiseAreas: ExpertiseArea[] = [
  {
    slug: "data-and-ai",
    index: "01",
    name: "Data & AI",
    promise:
      "Turn a fragmented data estate into a strategy your business actually asked for.",
    lead: "Most data programmes fail the same way: technology gets chosen before anyone agrees what the data is for. Our experts start from the use cases and work backwards.",
    icon: "brain",
    services: [
      {
        slug: "data-and-ai-strategy",
        name: "Data & AI Strategy",
        summary:
          "A business driven data vision, governance foundation and phased roadmap, set before technology decisions lock you in.",
        detail:
          "Our experts run stakeholder engagement across research, development, IT and the business, then set the vision, principles and governance. You get use case cards and a roadmap sequenced against real dependencies.",
        deliverables: [
          "Research or enterprise data strategy document",
          "Strategic use case cards with data requirements",
          "Governance principles and decision rights",
          "Phased roadmap with dependency mapping",
          "Executive summary deck for investment decisions",
        ],
      },
      {
        slug: "responsible-ai-governance",
        name: "Responsible AI & EU AI Act",
        summary:
          "AI governance you can show a customer, an auditor or a regulator.",
        detail:
          "Customers now audit supplier AI governance, and the EU AI Act sets a deadline. Our experts deliver a working policy, an intake process, a RACI with named owners, and a risk triaged audit.",
        deliverables: [
          "AI Governance Policy v1.0",
          "AI intake form, risk triage and AI Record template",
          "Governance RACI with named accountability",
          "Client data usage report with risk classification",
          "Prioritised compliance roadmap against the EU AI Act",
        ],
      },
      {
        slug: "secondary-use-and-rwd",
        name: "Secondary Use & Real World Data",
        summary:
          "Governance, architecture and analytics that let clinical and real world data serve a second purpose.",
        detail:
          "Trial data is an asset for the next decade, if architecture, consent and metadata keep it findable and defensible. Our experts build environments for exactly that, with the privacy controls review demands.",
        deliverables: [
          "Secondary use architecture and data model",
          "Data repurposing and provenance model",
          "Analytics and AI enablement design",
          "Privacy, consent and security control framework",
        ],
      },
      {
        slug: "genai-operations",
        name: "GenAI & Operations Automation",
        summary:
          "Tightly scoped proofs of concept that produce an evidence based go or no go.",
        detail:
          "Everyone can demo GenAI. Few know whether it beats current tooling on accuracy or review burden. Our experts run instrumented proofs against live cases and hand back the numbers, including the case for stopping.",
        deliverables: [
          "Working proof of concept against live business cases",
          "Benchmark of GenAI against existing tooling",
          "SME quality evaluation and effort to finalise scoring",
          "Go or no go recommendation with process gap analysis",
          "Phase two scope and toolchain assessment",
        ],
      },
    ],
  },
  {
    slug: "clinical-data-and-standards",
    index: "02",
    name: "Clinical Data & Standards",
    promise:
      "Deep, unglamorous, standards level expertise. The kind that decides whether a submission goes smoothly.",
    lead: "Where HTP42 started, and where our bench is deepest. Our experts have led data functions at sponsors and CROs, chaired standards programmes, and built the tooling the industry runs on.",
    icon: "database",
    services: [
      {
        slug: "clinical-data-management",
        name: "End to End Clinical Data Management",
        summary:
          "Technology selection, assessment, proof of concept and integration across the full clinical data lifecycle.",
        detail:
          "No single product covers clinical data management end to end, so every sponsor has an integration problem. Our experts evaluate the technology, build what the market leaves as a gap, and integrate it.",
        deliverables: [
          "Technology evaluation framework and vendor assessment",
          "Proof of concept and minimum viable product",
          "Integration architecture and migration plan",
          "Process reengineering and change management support",
          "Data integrity, security and compliance review",
        ],
      },
      {
        slug: "clinical-metadata-management",
        name: "Clinical Metadata Management",
        summary:
          "Metadata repositories, controlled terminology and the semantic backbone that makes study data traceable.",
        detail:
          "Metadata is the difference between a data estate and a data asset. Our experts build repositories, controlled terminology and semantic layers, including graph models, so a definition made once carries through to submission.",
        deliverables: [
          "Metadata repository design and implementation",
          "Controlled terminology governance model",
          "Semantic harmonisation and canonical vocabulary",
          "Graph data model for study definition and traceability",
          "Protocol to ADaM traceability reporting",
        ],
      },
      {
        slug: "openstudybuilder",
        name: "OpenStudyBuilder & DDF",
        summary:
          "Strategy, architecture, deployment and governance for OSB, aligned to CDISC and DDF under the COSA framework.",
        detail:
          "One of the most experienced OpenStudyBuilder teams in the industry, having delivered our largest OSB deployment as prime technical subcontractor to a global pharma. Deployment, architecture, security, integration and USDM study definition.",
        deliverables: [
          "OSB deployment strategy and technical architecture",
          "Dev, test and production deployment with MDR and CT configuration",
          "USDM 4.0 and DDF Terminology configuration",
          "SDTM and ADaM transformation workflows",
          "CDISC workshops, training programme and go live support",
        ],
      },
      {
        slug: "statistical-computing-environment",
        name: "Statistical Computing Environment",
        summary:
          "Define, select and integrate an SCE that stands up to compliance and to your statisticians.",
        detail:
          "An SCE decision commits you for a decade. Our experts define requirements against your real analysis workload, weigh commercial against validated open source, and support integration, including the AI enabled analytics layer.",
        deliverables: [
          "SCE requirements definition and workload analysis",
          "Vendor and open source solution evaluation",
          "Validated environment and compliance design",
          "AI enhanced analytics enablement",
          "Integration and migration support",
        ],
      },
    ],
  },
  {
    slug: "technology-strategy",
    index: "03",
    name: "Technology Strategy & Architecture",
    promise:
      "An honest read on your technology landscape, and a blueprint that survives contact with enterprise pharma.",
    lead: "Sponsor deciding what to replace, or vendor trying to earn credibility with large pharma: the question is the same. Does this architecture hold at enterprise scale, and what does it cost?",
    icon: "blueprint",
    services: [
      {
        slug: "technology-assessment",
        name: "Technology Assessment",
        summary:
          "A structured evaluation across organisation, architecture, change practice, usability and cost of ownership.",
        detail:
          "Our experts assess the landscape for strengths, weaknesses and where value leaks. The framework spans organisation, architecture, change practice, usability and cost of ownership, because most of the value sits between them.",
        deliverables: [
          "Current state assessment across five dimensions",
          "Optimisation opportunity register, effort sized",
          "Innovation and emerging technology scan",
          "Strategic recommendations and investment view",
          "Total cost of ownership analysis",
        ],
      },
      {
        slug: "enterprise-architecture",
        name: "Enterprise & Cloud Architecture",
        summary:
          "Cloud native architecture for clinical and research environments, designed by people who have run it in production.",
        detail:
          "Our architects design and review the architecture underneath clinical and research data: AWS and Azure landing zones, data layers, integration patterns, the API surfaces AI agents query, and the validation posture GxP demands.",
        deliverables: [
          "Target architecture and landing zone design",
          "Integration and API pattern library",
          "AI agent access layer and query interfaces",
          "Security, validation and GxP compliance posture",
          "Build versus buy and consolidation analysis",
        ],
      },
      {
        slug: "technology-blueprint",
        name: "Technology Blueprint & Enterprise Readiness",
        summary:
          "For clinical technology companies: what large pharma will require of you, and the roadmap to meet it.",
        detail:
          "Selling into enterprise pharma is a different discipline from building good software. Our experts bring sponsor side perspective on integration, deployment, validation and process fit, then turn it into a roadmap you can execute.",
        deliverables: [
          "Pharma enterprise requirements summary",
          "Deployment and integration pattern definition",
          "Process integration recommendations",
          "Technical and organisational roadmap inputs",
          "Structured expert workshops with actionable outputs",
        ],
      },
    ],
  },
  {
    slug: "digital-transformation",
    index: "04",
    name: "Digital Transformation & Operating Model",
    promise:
      "Change the organisation, not just the technology. Otherwise nothing changes.",
    lead: "Programmes fail on organisation design far more often than on technology. Our experts work on the operating model itself: roles, handovers, sourcing, governance and the sequencing of change.",
    icon: "transform",
    services: [
      {
        slug: "target-operating-model",
        name: "Target Operating Model Design",
        summary:
          "As is mapping, RACI, sourcing strategy and costed future state scenarios you can choose between.",
        detail:
          "Our experts map processes, roles, handovers and vendor dependencies across clinical data management, operations, biostatistics and medical writing, find where variability costs you, then design costed future state scenarios and the route between them.",
        deliverables: [
          "As is process, RACI, vendor and data flow mapping",
          "Root cause analysis and diagnosis report",
          "Multiple costed future state scenarios",
          "CRO and outsourcing model assessment",
          "Prioritised 18 to 36 month transformation roadmap",
        ],
      },
      {
        slug: "programme-leadership",
        name: "Programme Leadership & PMO",
        summary:
          "Senior programme leaders who have run GxP digital transformation at global sponsors, embedded in your team.",
        detail:
          "Some engagements do not need advice. They need someone who has done it before. We place programme directors and PMO leads with the standing to decide in the room rather than escalate.",
        deliverables: [
          "Embedded programme direction and PMO setup",
          "Governance, reporting and decision cadence",
          "Vendor and multi party delivery coordination",
          "Risk, dependency and benefits tracking",
        ],
      },
      {
        slug: "open-source-and-convening",
        name: "Open Source Initiatives & Convening",
        summary:
          "We build the industry forums where the hardest questions in clinical development get discussed off the record.",
        detail:
          "HTP42 convenes senior experts under the Chatham House Rule to speed collaboration on clinical development and open source standards. We also run executive meetings for up to fifty, from Basel to Singapore.",
        deliverables: [
          "Expert convenings under the Chatham House Rule",
          "Open source community and COSA engagement",
          "Bespoke executive and customer group events",
          "Curated speaker programmes and facilitation",
        ],
      },
    ],
  },
];

export const allServices = expertiseAreas.flatMap((a) =>
  a.services.map((s) => ({ ...s, area: a.name, areaSlug: a.slug })),
);

/** How engagements actually run. */
export const engagementModel = [
  {
    step: "01",
    name: "Understand",
    duration: "Days 1 to 5",
    body: "A short conversation establishes what you are trying to achieve, and therefore which expertise the work needs.",
  },
  {
    step: "02",
    name: "Match",
    duration: "Week 1",
    body: "We match the expertise, name the people, and publish who does what. You meet them before we start.",
  },
  {
    step: "03",
    name: "Run",
    duration: "Weeks 2 to 8",
    body: "Parallel workstreams under one accountable lead, with a working session every two weeks so there are no surprises at the end.",
  },
  {
    step: "04",
    name: "Land",
    duration: "Final 2 weeks",
    body: "Structured deliverables and an executive summary built around what you set out in week one. The same experts stay on to help you act.",
  },
] as const;
