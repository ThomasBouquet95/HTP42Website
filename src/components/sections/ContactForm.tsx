"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/content/site";
import { practices } from "@/content/expertise";

const TOPICS = [
  ...practices.map((p) => p.name),
  "A specific case study",
  "Joining the expert network",
  "Briefings, events and convenings",
  "Something else",
];

const field =
  "w-full rounded-md border border-ink/15 bg-paper px-4 py-3 text-[0.9375rem] tracking-[-0.008em] text-ink transition-colors duration-300 placeholder:text-ink-300 hover:border-ink/30 focus:border-brand focus:outline-none";

const label = "eyebrow block text-ink-400";

/**
 * No backend to depend on: the form validates in the browser and then hands a
 * fully composed message to the visitor's own mail client. That keeps the
 * enquiry in their sent items, which senior buyers tend to prefer anyway.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `${get("topic")}: enquiry from ${get("organisation") || get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Organisation: ${get("organisation")}`,
      `Role: ${get("role")}`,
      `Email: ${get("email")}`,
      `Topic: ${get("topic")}`,
      "",
      "What we need:",
      get("message"),
      "",
      "Sent from htp42.com",
    ].join("\n");

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={`${field} mt-2.5`}
          />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane.doe@company.com"
            className={`${field} mt-2.5`}
          />
        </div>
        <div>
          <label className={label} htmlFor="organisation">
            Organisation
          </label>
          <input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            placeholder="Company or institution"
            className={`${field} mt-2.5`}
          />
        </div>
        <div>
          <label className={label} htmlFor="role">
            Role
          </label>
          <input
            id="role"
            name="role"
            autoComplete="organization-title"
            placeholder="Head of Clinical Data Management"
            className={`${field} mt-2.5`}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="topic">
          What is this about? *
        </label>
        <select
          id="topic"
          name="topic"
          required
          defaultValue={TOPICS[0]}
          className={`${field} mt-2.5 appearance-none bg-[length:0.7rem] bg-[right_1rem_center] bg-no-repeat pr-11 [background-image:url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2012%208%27%20fill%3D%27none%27%20stroke%3D%27%234d5670%27%20stroke-width%3D%271.5%27%3E%3Cpath%20d%3D%27M1%201.5L6%206.5L11%201.5%27%2F%3E%3C%2Fsvg%3E")]`}
        >
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="message">
          What you need *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="A sentence or two is plenty. What are you trying to achieve, and by when?"
          className={`${field} mt-2.5 resize-y leading-relaxed`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="submit"
          className="group inline-flex h-[3.125rem] items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[0.875rem] font-medium tracking-[-0.008em] text-paper transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-brand hover:shadow-[0_8px_24px_-8px_rgba(20,80,200,0.45)]"
        >
          Send enquiry
          <ArrowRight
            className="arrow-step size-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </button>

        {sent && (
          <motion.p
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-brand"
            initial={reduced ? undefined : { opacity: 0, x: -8 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="status"
          >
            <Check className="size-4" strokeWidth={2.25} aria-hidden="true" />
            Opening your mail client. Press send there.
          </motion.p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-ink-300">
        This form composes the message in your own email client, so nothing is
        stored on this site. Prefer to write directly?{" "}
        <a
          href={`mailto:${site.contact.email}`}
          className="link-wipe font-medium text-ink-600"
        >
          {site.contact.email}
        </a>
      </p>
    </form>
  );
}
