import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Mark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { copy } from "@/content/copy";

/**
 * The closing band, and the contact section the navigation points at. Dark,
 * quiet, one clear ask, and the ways to reach us underneath it.
 *
 * There is no form. A form on a one page site is a third party dependency and
 * a spam target in exchange for a field or two, and the ask here is a thirty
 * minute conversation with a partner: an email with a subject line already
 * filled in gets there faster and lands in a place they actually read.
 */
export function CtaBand({
  eyebrow = "Start here",
  title,
  body,
  primary = {
    label: copy.ui.startConversation,
    href: `mailto:${site.contact.email}?subject=${encodeURIComponent(
      "A conversation with HTP42",
    )}`,
  },
  secondary,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section
      id="contact"
      className="grain relative overflow-hidden bg-ink"
    >
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
              <ul className="rule-on-dark mt-10 flex flex-col gap-3 pt-6">
                {reach().map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="group inline-flex items-center gap-2.5 text-sm text-white/70 transition-colors duration-500 hover:text-azure"
                      >
                        <item.icon
                          className="size-3.5 shrink-0"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="link-wipe">{item.label}</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2.5 text-sm text-white/55">
                        <item.icon
                          className="size-3.5 shrink-0"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Every way in, in the order people use them. */
function reach() {
  return [
    {
      icon: Mail,
      label: site.contact.email,
      href: `mailto:${site.contact.email}`,
      external: false,
    },
    {
      icon: Phone,
      label: site.contact.phone,
      href: `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`,
      external: false,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: site.contact.linkedin,
      external: true,
    },
    { icon: MapPin, label: site.contact.hq, href: null, external: false },
  ];
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
