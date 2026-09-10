export type Service = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  deliverables: string[];
};

export type Practice = {
  slug: string;
  index: string;
  name: string;
  promise: string;
  lead: string;
  icon: "brain" | "database" | "blueprint" | "transform";
  services: Service[];
};

export const practices: Practice[] = [
  {
    slug: "data-and-ai",
    index: "01",
    name: "Data & AI",
    promise:
      "Turn a fragmented data estate into a strategy your business actually asked for.",
    lead: "Most pharma data programmes fail in the same way: technology decisions get made before anyone has agreed what the business needs the data to do. We start from the use cases — the ones that are data-limited rather than AI-limited — and work backwards to platform, governance and architecture. Then we help you build it.",
    icon: "brain",
    services: [
      {
        slug: "data-and-ai-strategy",
        name: "Data & AI Strategy",
        summary:
          "A business-driven data vision, governance foundation and phased roadmap — set before platform decisions lock you in.",
        detail:
          "We run structured stakeholder engagement across research, development, IT and business functions, then synthesise a data strategy covering vision, objectives, guiding principles and governance. The output is designed to be used: a document your leadership can align on, use-case cards that translate business need into data requirements, and a roadmap sequenced against real dependencies.",
        deliverables: [
          "Research or enterprise data strategy document",
          "Strategic use-case cards with data requirements",
          "Governance principles and decision rights",
          "Phased roadmap with dependency mapping",
          "Executive summary deck for platform decisions",
        ],
      },
      {
        slug: "responsible-ai-governance",
        name: "Responsible AI & EU AI Act",
        summary:
          "AI governance you can show a customer, an auditor or a regulator — not a policy that lives in a drawer.",
        detail:
          "Pharma customers now audit their vendors' AI governance, and the EU AI Act puts a deadline on it. We produce a working governance policy, an AI record and intake process, a RACI that names actual owners, and a risk-triaged audit of how client data is being used across your technical functions. Then we sequence the remediation.",
        deliverables: [
          "AI Governance Policy v1.0",
          "AI intake form, risk-triage and AI Record template",
          "Governance RACI with named accountability",
          "Client data usage report with risk classification",
          "Prioritised compliance roadmap against the EU AI Act",
        ],
      },
      {
        slug: "secondary-use-and-rwd",
        name: "Secondary Use & Real-World Data",
        summary:
          "Design the platform, governance and analytics that let clinical, operational and real-world data serve a second purpose.",
        detail:
          "Data collected for one trial is an asset for the next decade — if the platform, consent model and metadata make it findable and defensible. We design data platforms purpose-built for secondary use, integrate advanced analytics and AI-driven methods, and put the privacy and security controls in place that make regulatory and ethical review straightforward.",
        deliverables: [
          "Secondary-use platform architecture",
          "Data repurposing and provenance model",
          "Analytics and AI enablement design",
          "Privacy, consent and security control framework",
        ],
      },
      {
        slug: "genai-operations",
        name: "GenAI & Operations Automation",
        summary:
          "Tightly scoped proofs of concept that produce an evidence-based go/no-go — before the change programme.",
        detail:
          "Everyone can demo GenAI. Very few organisations know whether it beats their existing tooling on accuracy, completeness and review burden. We build narrow, instrumented POCs against live cases, benchmark them against what you use today, and hand back the numbers plus a toolchain assessment and a Phase 2 scope. Including the case for not proceeding.",
        deliverables: [
          "Working POC against live business cases",
          "Benchmark of GenAI vs existing tooling",
          "SME quality evaluation and effort-to-finalise scoring",
          "Go/no-go recommendation with process gap analysis",
          "Phase 2 scope and toolchain assessment",
        ],
      },
    ],
  },
  {
    slug: "clinical-data-and-standards",
    index: "02",
    name: "Clinical Data & Standards",
    promise:
      "Deep, unglamorous, standards-level expertise — the kind that decides whether a submission goes smoothly.",
    lead: "This is where HTP42 started and where our bench is deepest: metadata, CDISC, statistical computing, study definition. Our experts have led clinical data functions at global sponsors and CROs, chaired standards programmes, and built the open-source tooling the industry now runs on.",
    icon: "database",
    services: [
      {
        slug: "clinical-data-management",
        name: "End-to-End Clinical Data Management",
        summary:
          "Technology selection, assessment, PoC, MVP and integration across the full clinical data lifecycle.",
        detail:
          "No single platform covers clinical data management end to end, which leaves every sponsor with an integration problem. We evaluate technology against a proven framework, validate it through assessments and proofs of concept, build MVPs where the market has a gap, and integrate the result into your infrastructure with the change management and process reengineering that actually makes it stick.",
        deliverables: [
          "Technology evaluation framework and vendor assessment",
          "Proof of concept and MVP development",
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
          "Metadata is the difference between a data estate and a data asset. We design and implement metadata repositories, controlled terminology management and semantic harmonisation layers — including graph-based models — so that a definition made once at study design propagates cleanly to submission, and traceability is a query rather than an archaeology project.",
        deliverables: [
          "Metadata repository (MDR) design and implementation",
          "Controlled terminology governance model",
          "Semantic harmonisation and canonical vocabulary",
          "Graph data model for study definition and traceability",
          "Protocol-to-ADaM traceability reporting",
        ],
      },
      {
        slug: "openstudybuilder",
        name: "OpenStudyBuilder & DDF",
        summary:
          "Strategy, architecture, deployment and governance for OSB — CDISC and DDF aligned, under the COSA framework.",
        detail:
          "We are one of the most experienced OpenStudyBuilder implementation teams in the industry, having delivered the largest single OSB deployment in our history as prime technical subcontractor to a global pharma programme. We cover deployment strategy, technical architecture, security, integration, USDM-compliant study definition, CDISC workshops, training and post-go-live support.",
        deliverables: [
          "OSB deployment strategy and technical architecture",
          "Dev/Test/Prod deployment with MDR and CT configuration",
          "USDM 4.0 and DDF Terminology configuration",
          "SDTM and ADaM transformation workflows",
          "CDISC workshops, training programme and go-live support",
        ],
      },
      {
        slug: "statistical-computing-environment",
        name: "Statistical Computing Environment",
        summary:
          "Define, select and integrate an SCE that stands up to compliance and to your statisticians.",
        detail:
          "An SCE decision commits you for a decade. We help define requirements against your actual analysis workload, evaluate the options — commercial and validated open source — and support integration into existing infrastructure, including the AI-enabled analytics layer that increasingly differentiates one environment from another.",
        deliverables: [
          "SCE requirements definition and workload analysis",
          "Vendor and open-source solution evaluation",
          "Validated environment and compliance design",
          "AI-enhanced analytics enablement",
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
    lead: "Whether you are a sponsor deciding what to keep and what to replace, or a platform company trying to become credible to large pharma buyers, the question is the same: does this architecture hold at enterprise scale, and what does it cost to get there? Our architects have built and bought at that scale.",
    icon: "blueprint",
    services: [
      {
        slug: "technology-assessment",
        name: "Technology Assessment",
        summary:
          "A structured evaluation of your IT landscape across organisation, architecture, change practice, usability and TCO.",
        detail:
          "We assess the current landscape to identify strengths, weaknesses and optimisation opportunities, then recommend a strategy for innovation and efficiency. The framework deliberately spans more than technology: organisational structure, architectural integrity, development and change management practices, usability and total cost of ownership. Most of the value sits in the gaps between those dimensions.",
        deliverables: [
          "Current-state assessment across five dimensions",
          "Optimisation opportunity register, effort-sized",
          "Innovation and emerging technology scan",
          "Strategic recommendations and investment view",
          "Total cost of ownership analysis",
        ],
      },
      {
        slug: "enterprise-architecture",
        name: "Enterprise & Cloud Architecture",
        summary:
          "Cloud-native architecture for clinical and research platforms, designed by people who have run it in production.",
        detail:
          "We design and review the architecture underneath clinical data and research platforms — AWS and Azure landing zones, data layers, integration patterns, MCP and API surfaces for AI agents, and the security and validation posture GxP demands. Our architects hold TOGAF and cloud certifications and have built analytics platforms at global sponsor scale.",
        deliverables: [
          "Target architecture and landing zone design",
          "Integration and API pattern library",
          "AI agent access layer (MCP endpoints, query interfaces)",
          "Security, validation and GxP compliance posture",
          "Build-versus-buy and platform consolidation analysis",
        ],
      },
      {
        slug: "technology-blueprint",
        name: "Technology Blueprint & Enterprise Readiness",
        summary:
          "For platform companies: what large pharma will require of you, and the roadmap to meet it.",
        detail:
          "Selling into enterprise pharma is a different discipline from building good software. We bring senior sponsor-side perspective on integration expectations, deployment models, validation requirements and process fit, then translate that into a technical and organisational roadmap that supports commercial expansion into large accounts.",
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
      "Change the organisation, not just the platform. Otherwise nothing changes.",
    lead: "Technology programmes fail on organisation design far more often than on technology. We work on the operating model itself — roles, handovers, sourcing, governance and the sequencing of change — and we convene the industry conversations where the hard questions get asked honestly.",
    icon: "transform",
    services: [
      {
        slug: "target-operating-model",
        name: "Target Operating Model Design",
        summary:
          "As-is mapping, RACI, sourcing strategy and costed future-state scenarios you can choose between.",
        detail:
          "We map processes, roles, handovers and vendor dependencies across clinical data management, clinical operations, biostatistics and medical writing, diagnose where variability is actually costing you, then design future-state operating model scenarios — typically an optimised current model through to a cloud-native, AI-enabled target — with the transformation roadmap to get from one to the other.",
        deliverables: [
          "As-is process, RACI, vendor and data flow mapping",
          "Root cause analysis and diagnosis report",
          "Multiple costed future-state TOM scenarios",
          "CRO and outsourcing model assessment",
          "18–36 month prioritised transformation roadmap",
        ],
      },
      {
        slug: "programme-leadership",
        name: "Programme Leadership & PMO",
        summary:
          "Senior programme leaders who have run GxP digital transformation at global sponsors, embedded in your team.",
        detail:
          "Some engagements do not need advice, they need someone who has done it before to hold the programme together. We place experienced programme directors and PMO leads into transformation and platform programmes, with the authority and standing to make decisions in the room rather than escalate them.",
        deliverables: [
          "Embedded programme direction and PMO setup",
          "Governance, reporting and decision cadence",
          "Vendor and multi-party delivery coordination",
          "Risk, dependency and benefits tracking",
        ],
      },
      {
        slug: "open-source-and-convening",
        name: "Open Source Initiatives & Convening",
        summary:
          "We build the industry forums where clinical development's hardest questions get discussed off the record.",
        detail:
          "HTP42 convenes senior industry experts under the Chatham House Rule to accelerate collaboration in clinical development and open-source standards. We also design and run bespoke executive meetings and customer group events for up to fifty participants — Basel, Paris, Nice, Cannes and Singapore — where the agenda, the speakers and the setting are all built for candour.",
        deliverables: [
          "Expert convenings under the Chatham House Rule",
          "Open-source community and COSA engagement",
          "Bespoke executive and customer group events",
          "Curated speaker programmes and facilitation",
        ],
      },
    ],
  },
];

export const allServices = practices.flatMap((p) =>
  p.services.map((s) => ({ ...s, practice: p.name, practiceSlug: p.slug })),
);

/** How engagements actually run. */
export const engagementModel = [
  {
    step: "01",
    name: "Frame",
    duration: "Days 1–5",
    body: "We interrogate the question before answering it. A short framing conversation with the sponsor establishes what decision this work has to support, what evidence would change your mind, and which experts the problem actually needs.",
  },
  {
    step: "02",
    name: "Assemble",
    duration: "Week 1",
    body: "We name the team from the network — typically two to eight seniors — and publish who does what. You meet them before the engagement starts. No substitutions after signature.",
  },
  {
    step: "03",
    name: "Run",
    duration: "Weeks 2–8",
    body: "Parallel workstreams with a single accountable lead. Stakeholder interviews, technical deep-dives and workshops run concurrently, with a working session every two weeks so there are no surprises at the end.",
  },
  {
    step: "04",
    name: "Land",
    duration: "Final 2 weeks",
    body: "Structured deliverables and an executive summary designed for the decision you framed in week one. Where the recommendation is to build, the same team can deliver it.",
  },
] as const;
