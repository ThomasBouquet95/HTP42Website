import type { Metadata } from "next";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem, DrawRule } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with HealthTech Partners 42. A first call is thirty minutes with a partner, not a sales call. Basel, Paris, Copenhagen, Singapore.",
};

const WHAT_HAPPENS = [
  {
    step: "01",
    title: "You hear back within one working day",
body: "From a partner, not a coordinator. If your enquiry lands outside what we do, we will say so in that first reply rather than book a call to tell you.",
  },
  {
    step: "02",
    title: "Thirty minutes to understand the need",
    body: "We will ask what you are trying to achieve, what subject matter it touches, and what has already been tried. No deck.",
  },
  {
    step: "03",
    title: "Named experts and a fixed shape",
    body: "Within a week you get a one page proposal: the experts we would field, their background, the streams, the duration and the price.",
  },
];

const DIRECT = [
  {
    icon: Mail,
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    icon: Phone,
    label: "Telephone",
    value: site.contact.phone,
    href: `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "HealthTech Partners 42",
    href: site.contact.linkedin,
    external: true,
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: site.contact.hq,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={copy.contactPage.eyebrow}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        titleLines={copy.contactPage.heroLines}
        lead={copy.contactPage.heroLead}
      />

      {/* Form + direct routes */}
      <section className="section bg-paper">
        <div className="shell">
          <DrawRule />
          <div className="grid grid-cols-1 gap-x-14 gap-y-16 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow index="01">Start a conversation</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-7 max-w-[20ch] text-display-sm text-ink">
                  Four fields and a{" "}
                  <span className="accent-italic text-brand">
                    sentence on what you need
                  </span>
                  .
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-10">
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.08}>
                <Eyebrow index="02">Or reach us directly</Eyebrow>
              </Reveal>

              <Stagger className="mt-8 flex flex-col">
                {DIRECT.map((item, i) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink-400 transition-all duration-500 group-hover:border-brand/35 group-hover:bg-brand-soft group-hover:text-brand">
                        <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="eyebrow text-ink-300">
                          {item.label}
                        </span>
                        <span className="mt-1.5 text-base font-medium tracking-[-0.012em] text-ink">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <StaggerItem key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          {...(item.external
                            ? { target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          className={`group flex items-center gap-4 border-t border-ink/[0.09] py-4 ${
                            i === 0 ? "border-0 pt-0" : ""
                          }`}
                        >
                          {content}
                        </a>
                      ) : (
                        <div
                          className={`group flex items-center gap-4 border-t border-ink/[0.09] py-4 ${
                            i === 0 ? "border-0 pt-0" : ""
                          }`}
                        >
                          {content}
                        </div>
                      )}
                    </StaggerItem>
                  );
                })}
              </Stagger>

              <Reveal delay={0.2}>
                <div className="rule mt-10 pt-7">
                  <h3 className="eyebrow text-ink-300">Where we work</h3>
                  <ul className="mt-5 space-y-2.5">
                    {site.contact.presence.map((city) => (
                      <li
                        key={city}
                        className="flex items-baseline gap-3 text-base text-ink-600"
                      >
                        <span
                          className="size-1 shrink-0 rounded-full bg-brand/50"
                          aria-hidden="true"
                        />
                        {city}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-[30ch] text-xs leading-relaxed text-ink-400">
                    Our experts are based across Europe, North America and Asia
                    Pacific. Engagements run wherever the client does.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="grain relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_75%_0%,rgba(46,127,219,0.16),transparent_58%)]"
          aria-hidden="true"
        />
        <div className="shell section relative">
          <DrawRule onDark />
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 pt-7 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow index="03" onDark>
                  What happens next
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-7 max-w-[16ch] text-display-sm text-white">
                  No funnel.{" "}
                  <span className="accent-italic text-azure">
                    No nurture sequence.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-sm text-base leading-relaxed text-white/60">
                  We are a small firm. Every enquiry is read by a partner, and
                  the ones we cannot help get told so quickly.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="flex flex-col">
                {WHAT_HAPPENS.map((item, i) => (
                  <StaggerItem key={item.step}>
                    <div
                      className={`flex gap-6 border-t border-white/12 py-7 ${
                        i === 0 ? "border-0 pt-0" : ""
                      }`}
                    >
                      <span className="eyebrow tnum mt-1.5 shrink-0 text-azure/90">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="max-w-[26ch] text-lg tracking-[-0.024em] text-white">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-white/60">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
