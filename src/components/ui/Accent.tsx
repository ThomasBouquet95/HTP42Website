import type { ReactNode } from "react";

/**
 * Renders a headline written as plain text, with the italic accent marked by
 * asterisks: "Embed our experts, or *hand us the solution*."
 *
 * The accent used to be a span written directly in the component, which meant
 * every headline on the site was markup rather than content and so could not
 * be edited from /admin. Marking it in the text keeps the design and makes the
 * sentence a string like any other.
 */
export function Accent({
  text,
  onDark = false,
}: {
  text: string;
  onDark?: boolean;
}): ReactNode {
  return text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        className={`accent-italic ${onDark ? "text-azure" : "text-brand"}`}
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** True when a headline is plain text rather than pre-built markup. */
export function isCopy(value: unknown): value is string {
  return typeof value === "string";
}
