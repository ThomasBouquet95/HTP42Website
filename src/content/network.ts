export type Expert = {
  name: string;
  role: string;
  note: string;
};

export type Discipline = {
  index: string;
  name: string;
  summary: string;
  experts: Expert[];
};

export const leadership: Expert[] = [
  {
    name: "Pascal Bouquet",
    role: "Chief Executive Officer, Managing Partner",
    note: "Former Novartis VP and Head of Technology (CTO) for data42. Health data, AI strategy and clinical data platforms.",
  },
  {
    name: "Marius C.",
    role: "Chief Technology Officer",
    note: "Programme director specialising in graph-based data science, open source and pharmaceutical data modelling.",
  },
  {
    name: "Linda D.",
    role: "Executive Director, Head of Data Strategy & Analytics",
    note: "Data strategy leader with deep experience in clinical trial re-engineering and biostatistics.",
  },
  {
    name: "Venkataraman Balasubramaniam",
    role: "Partner, Singapore — Enterprise Technical Architect",
    note: "TOGAF 9 and AWS certified. Designed cloud-based analytics platforms at Novartis.",
  },
  {
    name: "Taline N.",
    role: "Recruitment & Talent Development",
    note: "Builds the network. Attracts high-performing experts and designs performance management programmes.",
  },
];

export const disciplines: Discipline[] = [
  {
    index: "01",
    name: "Data & AI Strategy",
    summary:
      "Data mesh, governance, knowledge graphs and AI enablement inside global pharmaceutical organisations.",
    experts: [
      {
        name: "Steffen H.",
        role: "Data & AI Strategy Leader",
        note: "Builds scalable data ecosystems within global pharmaceutical organisations.",
      },
      {
        name: "Paul R.",
        role: "Data Strategy & Analytics Consultant — Data Mesh",
        note: "20+ years bridging business and IT; specialist in domain-driven data ecosystems.",
      },
      {
        name: "Laurent V.",
        role: "Professor of Mathematics — Data Science, AI & Complex Systems",
        note: "25+ years, 80+ publications; leads funded research in knowledge graphs and NLP.",
      },
      {
        name: "Roozbeh B.",
        role: "Data & AI Advisor, Life Sciences",
        note: "Founded a boutique consultancy for pharma data platforms and MLOps.",
      },
      {
        name: "Tim O.",
        role: "Enterprise Data & Architecture Leader",
        note: "Drives enterprise architecture and AI enablement across pharma.",
      },
    ],
  },
  {
    index: "02",
    name: "Clinical Data Science & Biostatistics",
    summary:
      "CDISC standards, statistical programming, submission readiness and clinical data automation.",
    experts: [
      {
        name: "Eric G.",
        role: "Executive Leader, Clinical Data Science & Biostatistics",
        note: "Built cross-regional teams at Sanofi; established data governance and AI applications.",
      },
      {
        name: "Søren K.",
        role: "Biostatistics Leader & Digital Health Strategist",
        note: "20+ years leading biostatistics units; integrated agile methods and wearable solutions.",
      },
      {
        name: "Phoebe B.",
        role: "Senior Statistical Programmer & Automation Specialist",
        note: "CDISC standards, regulatory submissions and SAS/R/Python automation.",
      },
      {
        name: "Nathalie S.",
        role: "Senior Expert, CDISC Standards & Clinical Data Operations",
        note: "Founded two CROs; delivered CDISC SDTM validation for FDA submissions.",
      },
      {
        name: "Nick De Donder",
        role: "Data Standards Consultant & Programme Director",
        note: "15+ years; former CDISC Open Rules Programme Manager, 25+ international presentations.",
      },
      {
        name: "Yannick L.",
        role: "Senior Clinical Data Management Expert",
        note: "Led clinical data initiatives across pharmaceutical and CRO environments.",
      },
      {
        name: "Juan Carlos R.",
        role: "Graph Data Scientist & Clinical Data Solutions Specialist",
        note: "Graph analytics, metadata management and CDISC-compliant systems.",
      },
      {
        name: "Skander M.",
        role: "Data Scientist & Clinical Programming Innovator",
        note: "Deploys large language models and document-intelligence platforms for trial operations.",
      },
    ],
  },
  {
    index: "03",
    name: "Technology, Architecture & Engineering",
    summary:
      "Enterprise architecture, cloud platforms, GxP validation and full-stack delivery at sponsor scale.",
    experts: [
      {
        name: "Paul F.",
        role: "Senior Technology Executive, Life Sciences & IT Strategy",
        note: "Two decades at Johnson & Johnson leading clinical data platforms and AWS deployments.",
      },
      {
        name: "Homayoun P.",
        role: "Technology Leader",
        note: "30+ years in research, design and architecture; Lead Architect in Clinical Development Digital at Novartis.",
      },
      {
        name: "Antoine N.",
        role: "Full-Stack Developer & Open-Source Contributor",
        note: "20+ years in Python and Vue.js; led open-source healthcare and pharmaceutical tooling.",
      },
      {
        name: "Kannan R.",
        role: "Senior IT Leader, Head of IT",
        note: "15+ years; oversaw Nestlé's global IT and led network and security transformation in biotech.",
      },
      {
        name: "Saurabh",
        role: "Consultant, Technical Product Development & Systems Architecture",
        note: "Leads backend architecture and digital transformation programmes.",
      },
      {
        name: "Michaël P.",
        role: "Product & Technology Leader",
        note: "Held CTO, CPO and CIO roles at startups and research institutions in biomedical AI.",
      },
    ],
  },
  {
    index: "04",
    name: "Digital Health & AI Innovation",
    summary:
      "Digital health strategy, medical imaging AI, genomics and translational innovation.",
    experts: [
      {
        name: "Christian H.",
        role: "Healthcare AI Strategist & Digital Health Transformation Leader",
        note: "Drove global digital innovation at Novartis and Amgen; advises health tech startups.",
      },
      {
        name: "Stéphane R.",
        role: "Global Digital Health & Pharmaceutical Innovation Leader",
        note: "Led data governance frameworks at Roche-Genentech; advises on clinical development optimisation.",
      },
      {
        name: "Christian B.",
        role: "Digital Transformation & Clinical Innovation Advisor",
        note: "MD/PhD with 20+ years; pioneered the digital health journey at Novo Nordisk.",
      },
      {
        name: "Rado A.",
        role: "Digital Health Leader",
        note: "20+ years integrating digital innovation into predictive and personalised medicine.",
      },
      {
        name: "Agata K.",
        role: "Medical Imaging AI Strategist, Oncology",
        note: "Data scientist at Roche developing deep learning models for tumour segmentation.",
      },
      {
        name: "Edward O.",
        role: "Strategic Scientific Director — Genomics, Biotechnology & AI",
        note: "Founder of Oakley Genomics; leads computational genomics and gene therapy solutions.",
      },
      {
        name: "Josephus G.",
        role: "Biomedical AI Specialist",
        note: "Biomedical AI, NLP and predictive modelling; designed CNNs at Novartis.",
      },
    ],
  },
  {
    index: "05",
    name: "Strategy, Transformation & Programme Leadership",
    summary:
      "Operating model design, GxP transformation programmes, PMO leadership and commercial strategy.",
    experts: [
      {
        name: "Marco L.",
        role: "Digital Strategy Transformation & Global Programme Leader",
        note: "Built PMOs and led GxP digital transformation at Novo Nordisk and Novartis.",
      },
      {
        name: "Matthias M.",
        role: "Executive Leader, Pharmaceutical Engineering & Operations",
        note: "Global experience in site transformation, CapEx delivery and manufacturing readiness.",
      },
      {
        name: "François Henri B.",
        role: "Digital R&D Strategy & Partnerships Leader",
        note: "20+ years transforming pharmaceutical R&D through in-silico modelling.",
      },
      {
        name: "Laura P.",
        role: "Strategic Consultant",
        note: "IT transformation, healthcare pathways and value-based funding models.",
      },
      {
        name: "Rachel O.",
        role: "Operational Excellence Expert & Mental Health Innovator",
        note: "Led billion-dollar portfolios; founded the digital mental health platform ROCC GmbH.",
      },
      {
        name: "Karin M.",
        role: "Marketing Advisor, Life Sciences & HealthTech",
        note: "20+ years across pharmaceutical and medical device sectors; PhD in Genetic Engineering.",
      },
      {
        name: "Annette I.",
        role: "Scientific & Strategy Lead, Biotech Innovation & Global Health",
        note: "PhD-trained executive with 15+ years in translational research and global health strategy.",
      },
    ],
  },
  {
    index: "06",
    name: "Drug Development & Regulatory Affairs",
    summary:
      "Clinical development strategy, medical affairs and regulatory pathways for pharma and devices.",
    experts: [
      {
        name: "Hervé J.",
        role: "Expert, Clinical Drug Development & Strategic Programme Leadership",
        note: "25+ years; founded Spes Bioventure to support biotech drug development strategy.",
      },
      {
        name: "Séverine D.",
        role: "Global Medical & Clinical Affairs Leader",
        note: "20+ years leading international clinical trials; former VP at BioScience GmbH.",
      },
      {
        name: "Lars B.",
        role: "Business Development & Regulatory Affairs Executive",
        note: "Senior executive experienced in CE certification and ISO 13485 implementation.",
      },
    ],
  },
];

export const expertCount = disciplines.reduce(
  (n, d) => n + d.experts.length,
  leadership.length,
);

/** Why a network beats both a large firm and a freelance marketplace. */
export const modelComparison = {
  columns: [
    { key: "htp42", label: "HTP42", accent: true },
    { key: "large", label: "Large consultancy" },
    { key: "freelance", label: "Freelance marketplace" },
  ],
  rows: [
    {
      dimension: "Who does the work",
      htp42: "Named seniors, agreed before signature",
      large: "Partner sells, associates deliver",
      freelance: "Whoever is available and bids",
    },
    {
      dimension: "Domain depth",
      htp42: "Held the role at a global sponsor",
      large: "Industry practice, generalist core",
      freelance: "Variable, unverified",
    },
    {
      dimension: "Accountability",
      htp42: "One engagement partner, one contract",
      large: "Distributed across a hierarchy",
      freelance: "None beyond the individual",
    },
    {
      dimension: "Delivery capability",
      htp42: "Advises and builds production systems",
      large: "Advisory, delivery subcontracted",
      freelance: "Individual contribution only",
    },
    {
      dimension: "Time to answer",
      htp42: "6–10 weeks typical",
      large: "One to two quarters",
      freelance: "Depends entirely on scoping",
    },
    {
      dimension: "Cost structure",
      htp42: "Senior rates, no overhead pyramid",
      large: "Blended rates funding the bench",
      freelance: "Low rate, high management cost",
    },
  ],
};

export const values = [
  {
    title: "Candour over comfort",
    body: "If the answer is that your programme should stop, we will say so and show the working. Three of our last ten engagements recommended against the investment the client expected to make.",
  },
  {
    title: "Evidence over conviction",
    body: "Benchmarks, instrumented proofs of concept and structured interviews — not pattern-matching from another industry. We would rather change our mind in week four than be wrong in month nine.",
  },
  {
    title: "The standards are the commons",
    body: "We contribute to CDISC, DDF and the open-source tooling the industry depends on. What is good for the commons is good for our clients, and it keeps our advice free of vendor incentive.",
  },
  {
    title: "Small teams, real ownership",
    body: "Two to eight people, all senior, all named. Small enough that everyone knows the whole problem; senior enough that nobody needs supervising.",
  },
];
