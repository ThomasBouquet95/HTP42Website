import Link from "next/link";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { LogoStacked } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { practices } from "@/content/expertise";
import { caseStudies } from "@/content/cases";

const columns = [
  {
    heading: "Expertise",
    links: practices.map((p) => ({
      label: p.name,
      href: `/expertise#${p.slug}`,
    })),
  },
  {
    heading: "Client impact",
    links: caseStudies.slice(0, 5).map((c) => ({
      label: c.title,
      href: `/impact/${c.slug}`,
    })),
  },
  {
    heading: "Firm",
    links: [
      { label: "The network", href: "/network" },
      { label: "Our model", href: "/network#model" },
      { label: "Where the depth sits", href: "/network#disciplines" },
      { label: "Perspectives", href: "/perspectives" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-900 text-white">
      <div className="shell">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-12 md:py-20">
          {/* Identity + contact */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <LogoStacked />
            <p className="eyebrow mt-4 text-white/50">
              Life sciences · Data · AI
            </p>

            <p className="mt-7 max-w-xs text-sm leading-relaxed text-white/60">
              A senior expert network for life sciences data, AI and technology.
              Assembled per problem, accountable for outcomes.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="group inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-azure"
                >
                  <Mail className="size-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="link-wipe">{site.contact.email}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/60">
                <MapPin className="size-3.5 shrink-0" strokeWidth={1.6} />
                {site.contact.hq}
              </li>
              <li>
                <a
                  href={site.contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-azure"
                >
                  <Linkedin className="size-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="link-wipe">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden lg:col-span-1 lg:block" />

          {/* Sitemap */}
          {columns.map((col) => (
            <div key={col.heading} className="md:col-span-4 lg:col-span-2">
              <h3 className="eyebrow text-azure">{col.heading}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm leading-snug text-white/55 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Presence */}
          <div className="col-span-2 md:col-span-12 lg:col-span-2">
            <h3 className="eyebrow text-azure">Presence</h3>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-y-3">
              {site.contact.presence.map((city) => (
                <li key={city} className="text-sm text-white/55">
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/50">
            © {year} HealthTech Partners 42. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-xs text-white/60 transition-colors hover:text-white"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-xs text-white/60 transition-colors hover:text-white"
              >
                Terms &amp; conditions
              </Link>
            </li>
            <li className="eyebrow text-white/45">
              Basel · Switzerland
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
