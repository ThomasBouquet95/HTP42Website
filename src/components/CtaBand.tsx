import { Mark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { copy } from "@/content/copy";

/**
 * The closing band, repeated on every page. Dark, quiet, one clear ask —
 * and a second, lower-commitment route for people who are not ready to talk.
 */
export function CtaBand({
  eyebrow = "Start here",
  title,
  body,
  primary = { label: copy.ui.startConversation, href: "/contact" },
  secondary,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink">
      <Backdrop />
      <div className="shell section relative">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow onDark>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-7 max-w-[20ch] text-display-sm text-white md:text-display">
                {title ?? (
                  <>
                    Tell us what you need.
                    <br />
                    <span className="accent-italic text-azure">
                      We&apos;ll find you
                    </span>{" "}
                    the right expert for it.
                  </>
                )}
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <Reveal delay={0.12}>
              <p className="lead text-white/60">
                {body ??
                  "A first conversation is thirty minutes with a partner, not a sales call. If nobody in the network is the right match, we will say so, and usually point you at who is."}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={primary.href} variant="light" size="lg" withArrow>
                  {primary.label}
                </Button>
                {secondary && (
                  <Button
                    href={secondary.href}
                    variant="outline-dark"
                    size="lg"
                  >
                    {secondary.label}
                  </Button>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="rule-on-dark mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 pt-5">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-wipe text-sm font-medium text-white/85"
                >
                  {site.contact.email}
                </a>
                <span className="eyebrow text-white/50">
                  {site.contact.hq}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** An oversized, very low-contrast mark bleeding off the right edge. */
function Backdrop() {
  return (
    <div
      className="pointer-events-none absolute -right-24 -bottom-28 opacity-[0.045] md:-right-12"
      aria-hidden="true"
    >
      <Mark className="h-[22rem] w-auto text-white md:h-[30rem]" />
    </div>
  );
}
