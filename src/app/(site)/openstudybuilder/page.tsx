import type { Metadata } from "next";
import Link from "next/link";
import styles from "./osb.module.css";

/**
 * /openstudybuilder — HTP42 OpenStudyBuilder page
 *
 * Content rules for this page:
 * - Public OSB facts and HTP42 positioning only.
 * - No client names, study identifiers, prices or proposal content.
 * - The Community Sandbox (community resource) and paid engagements are kept
 *   visibly separate, in line with the antitrust guidance agreed with the OSB team.
 *
 * Before go-live, resolve every TODO in LINKS.
 */

const SANDBOX_MAIL = "openstudybuilder@htp42.com";

const LINKS = {
  // The project's own documentation asks people to request sandbox access by
  // email, so that is what this does. There is no contact page to send them to
  // any more: the site is one page, and its sections are anchors on it.
  sandboxRequest: `mailto:${SANDBOX_MAIL}?subject=${encodeURIComponent(
    "Request Sandbox Access",
  )}`,
  talkToExpert: "/#contact",
  // The running Community Sandbox, for people who already have an account.
  sandbox: "https://sandbox.openstudybuilder.com/",
  // The CDISC Maturity Navigator, served from public/ at its own address.
  maturity: "/maturity",
  github: "https://github.com/NovoNordisk-OpenSource/openstudybuilder-solution",
  project: "https://openstudybuilder.com",
  // TODO: still a single issue rather than a newsletter landing page. The OSB
  // project site does not publish one, so this needs the real subscribe URL.
  newsletter:
    "https://www.linkedin.com/pulse/openstudybuilder-43-tiers-webinar-teaser-ddf-recap-phuse-glass-1marf/",
  // Opens that engagement where it now lives, as a row on the one page.
  caseSprint: "/#case-openstudybuilder-sprint-deployment",
  perspective: "/#perspectives",
};

export const metadata: Metadata = {
  title: "OpenStudyBuilder · HTP42",
  description:
    "HTP42 operates the OpenStudyBuilder Community Sandbox and deploys dedicated and production OpenStudyBuilder environments for sponsors.",
};

const path = [
  {
    stage: "Explore",
    title: "Community Sandbox",
    body: "A shared OpenStudyBuilder environment with the latest release and synthetic data. Free, with access on request.",
    points: [
      "Data refreshed with each OSB release",
      "CDISC Controlled Terminology and Biomedical Concepts preloaded",
      "Suited to learning, demos and workshops",
    ],
    cta: { label: "Request Sandbox access", href: LINKS.sandboxRequest },
    community: true,
  },
  {
    stage: "Evaluate",
    title: "Dedicated Sandbox",
    body: "A private OpenStudyBuilder instance for your organisation, hosted in the cloud, to evaluate with your own standards and studies.",
    points: [
      "Data preserved with each OSB release",
      "Your users, your branding, optional single sign-on",
      "Your terminology loaded and studies configured up to the Schedule of Activities",
      "Hands-on training included",
    ],
  },
  {
    stage: "Deploy",
    title: "Production implementation",
    body: "OpenStudyBuilder installed in your own cloud and connected to the systems around it.",
    points: [
      "Target architecture and deployment in your tenant",
      "Integration through the OSB REST APIs",
      "Sprint-based delivery with validation support",
    ],
    cta: { label: "Read the deployment case", href: LINKS.caseSprint },
  },
  {
    stage: "Operate",
    title: "Governance and run",
    body: "Keep the library trustworthy and the platform current once studies depend on it.",
    points: [
      "Library governance for terminology, concepts, activities and templates",
      "Release upgrades on your schedule",
      "On-demand OSB, graph and CDISC expertise",
    ],
  },
];

const capabilities = [
  ["Controlled Terminology", "CDISC and sponsor terminology, versioned and reusable."],
  ["Biomedical Concepts and Activities", "CDISC Biomedical Concepts linked to the assessments in your studies."],
  ["Syntax templates", "Reusable objectives, endpoints, eligibility criteria and more."],
  ["CRFs", "Maintain data collection standards, with Activity mapping, and fully compatible with the ODM standard."],
  ["Study definitions", "Study design and Schedule of Activities as structured metadata, aligned with USDM."],
  ["APIs", "Every object available through REST APIs for downstream automation."],
];

const training = [
  "OpenStudyBuilder overview",
  "Controlled Terminology",
  "Biomedical and Activity Concepts",
  "Using the OSB APIs",
  "OSB templates",
];

const faq = [
  {
    q: "Is the Community Sandbox free?",
    a: "Yes. HTP42 operates it for the OpenStudyBuilder community. Access is free, and you request an account so we know who is using it.",
  },
  {
    q: "Can I load my own studies into the Community Sandbox?",
    a: "Use it with synthetic or public data only. It is a shared environment: what you create is visible to everyone else with access, each entry is tagged with the email address that made it, and data is reset when a new release is deployed. For your own standards and studies, use a Dedicated Sandbox.",
  },
  {
    q: "Which OpenStudyBuilder version does it run?",
    a: "The latest release. The Sandbox is refreshed as new OSB releases are published.",
  },
  {
    q: "Do I need HTP42 to use OpenStudyBuilder?",
    a: "No. OpenStudyBuilder is open source and you can install it yourself from GitHub. We help when you want a hosted environment, a production deployment or support.",
  },
];

export default function OpenStudyBuilderPage() {
  return (
    <div className={styles.page}>
      {/* Hero: the Sandbox is the primary action */}
      <section className={styles.hero} aria-labelledby="osb-title">
        <div className={styles.heroText}>
          <p className={styles.kicker}>Clinical Data & Standards</p>
          <h1 id="osb-title" className={styles.title}>
            OpenStudyBuilder, from first login to production.
          </h1>
          <p className={styles.lead}>
            OpenStudyBuilder is the open-source clinical metadata repository and
            study builder started by Novo Nordisk. HTP42 operates the public
            Community Sandbox, and deploys and runs dedicated environments for
            sponsors.
          </p>
          <div className={styles.actions}>
            <Link href={LINKS.sandboxRequest} className={styles.primary}>
              Request Sandbox access
            </Link>
            <a
              href={LINKS.sandbox}
              className={styles.secondary}
              target="_blank"
              rel="noreferrer"
            >
              Go to OSB Sandbox
            </a>
            <Link href={LINKS.maturity} className={styles.accent}>
              Maturity Assessment of your clinical standard
            </Link>
            <Link href={LINKS.talkToExpert} className={styles.secondary}>
              Talk to an OSB expert
            </Link>
          </div>
        </div>

        <aside className={styles.sandboxCard} aria-label="Community Sandbox at a glance">
          <h2 className={styles.cardTitle}>Community Sandbox</h2>
          <dl className={styles.facts}>
            <div>
              <dt>Version</dt>
              <dd>Latest OSB release</dd>
            </div>
            <div>
              <dt>Data</dt>
              <dd>Synthetic only</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>Free, access on request</dd>
            </div>
            <div>
              <dt>Operated by</dt>
              <dd>HTP42, for the OSB community</dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* Adoption path: the one sequence on the page */}
      <section className={styles.section} aria-labelledby="path-title">
        <h2 id="path-title" className={styles.h2}>
          Start in the Sandbox. Go as far as you need.
        </h2>
        <p className={styles.intro}>
          The OpenStudyBuilder project lists three ways to get the software:
          install it from{" "}
          <a href={LINKS.github} className={styles.inline}>GitHub</a>, use the
          Community Sandbox, or ask HTP42 for a dedicated hosted environment.
          Most organisations move along this path.
        </p>

        <ol className={styles.path}>
          {path.map((step, i) => (
            <li
              key={step.stage}
              className={step.community ? `${styles.step} ${styles.stepCommunity}` : styles.step}
            >
              <span className={styles.marker} aria-hidden="true">{i + 1}</span>
              <p className={styles.stage}>{step.stage}</p>
              <h3 className={styles.h3}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
              <ul className={styles.points}>
                {step.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {step.cta && (
                <Link
                  href={step.cta.href}
                  className={step.community ? styles.primarySmall : styles.textLink}
                >
                  {step.cta.label}
                </Link>
              )}
            </li>
          ))}
        </ol>

        <p className={styles.separation}>
          The Community Sandbox is a shared, best-effort resource for the
          OpenStudyBuilder community. Dedicated, production and support
          engagements are separate services, agreed bilaterally with each
          organisation.
        </p>
      </section>

      {/* What OSB covers: public facts */}
      <section className={styles.section} aria-labelledby="covers-title">
        <h2 id="covers-title" className={styles.h2}>What you can try in OpenStudyBuilder</h2>
        <dl className={styles.capabilities}>
          {capabilities.map(([term, desc]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{desc}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Training and evidence */}
      <section className={`${styles.section} ${styles.split}`} aria-label="Training and delivery evidence">
        <div>
          <h2 className={styles.h2}>Training</h2>
          <p className={styles.body}>
            Five one-hour, hands-on sessions that take a team from first login
            to working independently. Delivered live and recorded for reuse.
          </p>
          <ol className={styles.modules}>
            {training.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className={styles.h2}>What it takes in practice</h2>
          <ul className={styles.evidence}>
            <li>
              <Link href={LINKS.caseSprint}>OpenStudyBuilder implementation</Link>
              <span>A 26-week, sprint-based production deployment.</span>
            </li>
            <li>
              <Link href={LINKS.perspective}>What an OpenStudyBuilder implementation actually costs you</Link>
              <span>The software is free. The standards and change work is not.</span>
            </li>
          </ul>
        </div>
      </section>

      {/*
        TODO: Accelerators block (OSB MCP server, Semantic Traceability Add-On).
        Publish only once release status is confirmed; outcome-level copy only.
      */}

      {/* Community */}
      <section className={styles.section} aria-labelledby="community-title">
        <h2 id="community-title" className={styles.h2}>Part of the OpenStudyBuilder community</h2>
        <p className={styles.intro}>
          OpenStudyBuilder is evolving into an industry initiative, with an
          alliance model that lets organisations take part as owners,
          contributors, consumers or promoters. The software stays open source
          for everyone.
        </p>
        <ul className={styles.communityLinks}>
          <li><a href={LINKS.project}>OpenStudyBuilder project site</a></li>
          <li><a href={LINKS.github}>Source code on GitHub</a></li>
          <li><a href={LINKS.newsletter}>OpenStudyBuilder newsletter</a></li>
        </ul>
      </section>

      {/* FAQ */}
      <section className={styles.section} aria-labelledby="faq-title">
        <h2 id="faq-title" className={styles.h2}>Questions about the Sandbox</h2>
        <div className={styles.faq}>
          {faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className={styles.closing} aria-labelledby="closing-title">
        <h2 id="closing-title" className={styles.h2}>See your study design in OpenStudyBuilder.</h2>
        <div className={styles.actions}>
          <Link href={LINKS.sandboxRequest} className={styles.primary}>
            Request Sandbox access
          </Link>
          <Link href={LINKS.talkToExpert} className={styles.secondary}>
            Talk to an OSB expert
          </Link>
        </div>
      </section>
    </div>
  );
}
