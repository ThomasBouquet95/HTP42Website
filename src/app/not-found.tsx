import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Mark } from "@/components/ui/Logo";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center overflow-hidden bg-ink pt-36 pb-20 md:pt-44">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(110%_70%_at_80%_0%,rgba(46,127,219,0.2),transparent_58%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.035)_0_1px,transparent_1px_8.3333%)]" />
      </div>

      <div className="shell relative">
        <Eyebrow onDark>Error 404</Eyebrow>

        <h1 className="mt-8 max-w-[22ch] text-display text-white md:text-display-lg">
          This page isn&apos;t{" "}
          <span className="accent-italic text-azure">in the network.</span>
        </h1>

        <p className="lead mt-8 max-w-xl text-white/55">
          The address you followed doesn&apos;t resolve to anything we publish.
          It may have moved when we rebuilt the site. The sections below cover
          everything.
        </p>

        <div className="mt-11 flex flex-wrap items-center gap-3">
          <Button
            href="/"
            variant="light"
            size="lg"
            withArrow
          >
            Back to the homepage
          </Button>
          <Button href="/contact" variant="outline-dark" size="lg">
            Contact us
          </Button>
        </div>

        <nav aria-label="Site sections" className="rule-on-dark mt-16 pt-8">
          <h2 className="eyebrow text-white/50">Everything we publish</h2>
          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-baseline gap-3.5 border-b border-white/10 py-3 text-lg tracking-[-0.022em] text-white/80 transition-colors duration-500 hover:text-azure"
                >
                  <span className="eyebrow tnum text-white/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="link-wipe">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 opacity-20" aria-hidden="true">
          <Mark className="h-8 w-auto text-white" />
        </div>
      </div>
    </section>
  );
}
