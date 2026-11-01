/**
 * The site's section copy: eyebrows, headlines, leads and the button labels
 * that go with them. One page, so one set of sections.
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
      /** Sits above the named technology partners. Deliberately open ended:
       * the list is a sample, not the whole roster. */
      partnersLabel: "Including",
    },
    expertise: {
      eyebrow: "Expertise",
      title: "The expertise our clients ask for *most often*.",
      lead: "You tell us what you need. We listen, match the senior expert who has already done it, and stay accountable until the work lands.",
    },
    network: {
      eyebrow: "The network",
      title: "One network, built from *trusted relationships*.",
      lead: "It starts with the partners. Each brings deep life sciences experience and a network of their own, which is how we reach the right expertise rather than the available expertise.",
      partnersHeading: "Our partners",
      threeSidesHeading: "Why it works, from three sides",
      threeSidesLead:
        "HTP42 solves a different problem for each side of the network. Together, they make the whole model stronger, creating access and expertise that is difficult for clients to replicate elsewhere.",
    },
    cases: {
      eyebrow: "Client impact",
      title: "Engagement examples. *Problem, intervention,* consequence.",
      lead: "We do not name clients, but each of these is written the way we would present it internally, including what was hard.",
    },
    perspectives: {
      eyebrow: "Perspectives",
      title: "What we see, *from the front line*.",
      lead: "Short, specific pieces on the problems we keep meeting. No trend reports.",
    },
  },
};
