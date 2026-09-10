export type Perspective = {
  slug: string;
  title: string;
  standfirst: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
};

export const perspectives: Perspective[] = [
  {
    slug: "data-limited-not-ai-limited",
    title: "Most of your AI use cases are data limited, not AI limited",
    standfirst:
      "The uncomfortable finding from nearly every research data engagement we run: the model is rarely the constraint. Why that distinction changes what you should fund next.",
    category: "Data & AI",
    readTime: "8 min read",
    date: "2026-07-22",
    author: "Linda D., Head of Data Strategy & Analytics",
    featured: true,
  },
  {
    slug: "eu-ai-act-vendor-due-diligence",
    title: "The EU AI Act arrives through procurement, not the regulator",
    standfirst:
      "Pharma customers are auditing their suppliers' AI governance now, well ahead of enforcement. What a credible answer looks like, and how long it actually takes to build.",
    category: "Governance",
    readTime: "6 min read",
    date: "2026-05-14",
    author: "HTP42 Responsible AI experts",
    featured: true,
  },
  {
    slug: "openstudybuilder-what-it-takes",
    title: "What an OpenStudyBuilder implementation actually costs you",
    standfirst:
      "The software is free. The standards alignment, the transformation workflows and the organisational change are not. A candid account from seven sprints of production deployment.",
    category: "Clinical Standards",
    readTime: "11 min read",
    date: "2026-03-09",
    author: "Marius C., Chief Technology Officer",
    featured: true,
  },
  {
    slug: "metadata-repository-trends",
    title: "Clinical metadata management is becoming a graph problem",
    standfirst:
      "USDM, DDF and protocol to ADaM traceability all push in the same direction. Why relational metadata repositories are running out of road.",
    category: "Clinical Standards",
    readTime: "9 min read",
    date: "2026-01-28",
    author: "Juan Carlos R., Graph Data Scientist",
  },
  {
    slug: "secondary-use-ai-leverage",
    title: "Leveraging AI for the secondary use of clinical data",
    standfirst:
      "Data collected for one trial is an asset for the next decade, provided the architecture, consent model and metadata make it findable and defensible.",
    category: "Data & AI",
    readTime: "7 min read",
    date: "2025-11-12",
    author: "Steffen H., Data & AI Strategy Leader",
  },
  {
    slug: "cloud-migration-clinical-trials",
    title: "Why cloud migration is still critical for modern clinical trials",
    standfirst:
      "Not for the cost saving, because that argument was always weak. For the elasticity, the data gravity and the AI access layer you cannot build on premise.",
    category: "Technology",
    readTime: "6 min read",
    date: "2025-09-03",
    author: "Venkataraman Balasubramaniam, Partner, Singapore",
  },
];

export const featuredPerspectives = perspectives.filter((p) => p.featured);
