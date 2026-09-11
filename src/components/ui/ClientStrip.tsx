import { clients } from "@/content/site";

/**
 * The client strip, as a continuous rotation. Nine names will not sit in one
 * row at any sensible size, so the row scrolls instead of wrapping or being
 * truncated. Each entry renders its real logo when one is available under
 * public/logos/ and a typeset wordmark until then, so the row stays visually
 * consistent either way. Brand casing follows each company's own usage.
 *
 * The track renders the set twice and translates by half its width, which
 * keeps the loop seamless without measuring anything. It holds still for
 * anyone who has asked for reduced motion.
 */
export function ClientStrip({ onDark = false }: { onDark?: boolean }) {
  const run = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {clients.map((client) => (
        <li key={client.name} className="px-7 md:px-10">
          {client.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={client.logo}
              alt=""
              className={`h-6 w-auto object-contain md:h-8 ${
                onDark
                  ? "opacity-60 brightness-0 invert"
                  : "opacity-55 grayscale"
              }`}
            />
          ) : (
            <span
              className={`block whitespace-nowrap text-lg leading-none font-medium tracking-[-0.018em] md:text-xl ${
                onDark ? "text-white/60" : "text-ink-300"
              }`}
            >
              {client.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`border-y ${onDark ? "border-white/12" : "border-ink/10"}`}
    >
      {/* A readable list for assistive technology, since the track is duplicated. */}
      <h4 className="sr-only">Clients we work with</h4>
      <ul className="sr-only">
        {clients.map((client) => (
          <li key={client.name}>{client.name}</li>
        ))}
      </ul>

      <div className="marquee-mask overflow-hidden py-7 md:py-9">
        <div
          className="marquee-track"
          style={{ ["--marquee-duration" as string]: "46s" }}
        >
          {run}
          {run}
        </div>
      </div>
    </div>
  );
}
