/**
 * The site's section and page copy: eyebrows, headlines, leads and the button
 * labels that go with them.
 *
 * This used to live inline in the components, which meant the most prominent
 * sentences on the site, the ones a reader sees first, were the only ones that
 * could not be edited from /admin. Headlines in particular were markup rather
 * than text, because the italic accent was a span.
 *
 * The accent is now marked in the text itself, as *like this*, and rendered by
 * `Accent`. So a headline is a string, editable like any other, and the design
 * is unchanged.
 *
 * `{expertCount}` is substituted at the call site, so the headline and the
 * number in the network band cannot drift apart.
 */
export const copy = {
  /** Shared labels, used in more than one place. */
  ui: {
    skipToContent: "Skip to content",
    startConversation: "Start a conversation",
    seeClientImpact: "See client impact",
    scrollCue: "Scroll",
    exploreArea: "Explore this area",
    expertiseAtWork: "See this expertise at work",
    allEngagements: "All engagements",
    allCaseStudies: "All case studies",
    viewAllPerspectives: "All perspectives",
  },

  home: {
    positioning: {
      heading: "The firm",
      statement: "We bring the *specific deep expertise* your problem needs.",
      whoWeBring:
        "Business, technology and scientific expertise, all of it with deep life sciences experience. Former VPs, CTOs, heads of function, principal architects and clinical leaders who have held the roles they now advise on, at Novartis, Roche, Sanofi, Novo Nordisk, Johnson & Johnson and Amgen. We match the subject matter your problem actually calls for, name those people before you sign, and stand the team down when the work is done.",
      howItWorks:
        "There are two ways that works. We find vetted experts and embed them in your team for as long as the need lasts, with HTP42 as your single contracting party and the administration and legal work on us. Or, for more complex needs, we assemble a senior team to deliver an end to end solution, against deliverables agreed before we start.",
      networkLink: "How the network works",
      clientsHeading: "Who we work with",
    },
    heroLines: [
      "Life sciences data",
      "and AI, led by the",
      "people who *built it*",
      "*inside pharma.*",
    ],
    heroLead:
      "A senior expert network for life sciences. Business, technology and scientific expertise, all of it with deep industry experience.",

    offerings: {
      eyebrow: "How we work with you",
      title: "Embed our experts, or *hand us the solution*.",
      lead: "Some clients need experts embedded in their own team. Others need an outcome owned end to end. We find and assemble the AI empowered experts, and carry the accountability.",
    },
    expertise: {
      eyebrow: "Expertise",
      title: "The expertise our clients ask for *most often*.",
      lead: "You tell us what you need. We listen, match the senior expert who has already done it, and stay accountable until the work lands.",
    },
    network: {
      eyebrow: "The network",
      title: "One network, *three reasons* to be in it.",
      lead: "It starts with the partners. Each brings deep life sciences experience and a network of their own, which is how we reach the right expertise rather than the available expertise.",
      partnersHeading: "Our partners",
      threeSidesHeading: "Why it works, from three sides",
      threeSidesLead:
        "HTP42 solves a different problem for each side, and each side makes the others better. That is the whole design, and it is why the access we can offer clients is difficult to replicate.",
    },
    cases: {
      eyebrow: "Client impact",
      title: "Engagement examples. *Problem, intervention,* consequence.",
      lead: "We do not name clients, but each of these is written the way we would present it internally, including what was hard.",
    },
    engagement: {
      eyebrow: "How we work",
      title: "Understood in days. *Matched in a week.*",
      lead: "The shape rarely changes. We establish what you need, name the experts it takes, and get them working. The same people stay on it to the end.",
    },
    perspectives: {
      eyebrow: "Perspectives",
      title: "What we think, before *anyone pays us for it*.",
      lead: "Short, specific pieces on the problems we keep meeting. No trend reports.",
    },
  },

  expertisePage: {
    ctaTitle: "Whatever you need, someone in the network has *already done it*.",
    eyebrow: "Expertise",
    heroLines: ["The range our", "experts cover,", "*in detail*."],
    heroLead:
      "You tell us what you need. We match the senior expert who has already done it, and stay accountable until the work lands. The areas below are illustrative.",
    areasEyebrow: "Illustrative areas",
    nextStep: {
      eyebrow: "Next step",
    },
  },

  networkPage: {
    eyebrow: "The network",
    heroLines: ["Deep expertise,", "*matched* to your", "subject matter."],
    heroLead:
      "Knowing who to trust with a specific problem is not something a CV database can tell you. It sits with the senior leaders who have already worked with these people.",
    why: {
      eyebrow: "Why HTP42",
      title: "One network, *three reasons* to be in it.",
      networkIntro:
        "We hold a curated network of more than {expertCount} senior experts across six disciplines. Each has held the role they now advise on. We match on subject matter rather than availability, review every candidate at senior level before onboarding, and where the brief calls for expertise we do not already hold, we source it through their networks, which reach 500+ senior specialists.",
      clientsIntro:
        "Clients use that two ways. Either we find vetted experts and embed them in your own team, with HTP42 as the single contracting party carrying the administration and legal work. Or, for more complex needs, we assemble a senior team to deliver an end to end solution against agreed deliverables, named before you sign and with one engagement partner accountable throughout.",
      threeSidesHeading: "Why it works, from three sides",
      threeSidesLead:
        "HTP42 solves a different problem for each side, and each side makes the others better. That is the whole design, and it is why the access we can offer clients is difficult to replicate.",
      modelHeading: "The depth of a specialist, with the reach of a team",
      modelLead:
        "The table below is the whole argument. One independent adviser gives you depth in one place. A large firm gives you scale without it.",
    },
    partners: {
      eyebrow: "Our partners",
      title: "The people who *answer the phone*.",
      lead: "A partner is accountable for every piece of work we take on. These are the people who frame it, match the expertise, and stay on it to the end.",
    },
    values: {
      eyebrow: "Our values",
      title: "Six values, and what each one *looks like in delivery*.",
      lead: "Values only matter if you can see them in the work. Each of these has a practical test attached, and we hold our experts to it.",
    },
    disciplines: {
      eyebrow: "Where the depth sits",
      title: "{expertCount}+ experts across *six disciplines*.",
      lead: "We publish the shape of the network and its depth, not the individuals. Named profiles are shared under NDA once we know what the engagement needs.",
    },
    join: {
      eyebrow: "Work with the network",
    },
  },

  impactPage: {
    eyebrow: "Client impact",
    heroLines: ["The work, written", "up the way we'd", "*present it* internally."],
    heroLead:
      "We do not name clients. Each study sets out the problem as the client framed it, what our experts did, and what changed as a result.",
    patterns: {
      eyebrow: "Patterns",
      title: "Three things *we keep relearning*.",
      lead: "Read across seven engagements and the same lessons surface. We would rather say them out loud.",
    },
    engagement: {
      eyebrow: "Your engagement",
    },
    similar: {
      eyebrow: "Similar problem?",
    },
  },

  perspectivesPage: {
    eyebrow: "Perspectives",
    heroLines: [
      "Specific arguments",
      "about specific",
      "problems. *No trend reports.*",
    ],
    heroLead:
      "Every piece comes out of work we have actually done, written by the expert who did it. Full versions are sent on request.",
    more: {
      eyebrow: "More perspectives",
      title: "Everything else *we've published*.",
      lead: "If a title is relevant to something you are working on, ask and we will send it across.",
    },
    briefings: {
      eyebrow: "Briefings",
    },
  },

  contactPage: {
    eyebrow: "Contact",
    heroLines: [
      "Tell us what you need.",
      "We'll find you the *right*",
      "expert for it.",
    ],
    heroLead:
      "A first conversation is thirty minutes with a partner. If nobody in the network is the right match, we will say so.",
  },
};
