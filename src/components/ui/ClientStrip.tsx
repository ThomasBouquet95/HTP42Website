import { clients } from "@/content/site";

/**
 * The client strip. Set as a hairline bounded band with the names distributed
 * across the full measure, so it reads as a logo row rather than a list. Each
 * entry renders its real logo when one is available under public/logos/, and
 * a typeset wordmark until then, so the row stays consistent either way.
 * Brand casing is respected as published.
 */
export function ClientStrip({ onDark = false }: { onDark?: boolean }) {
  return (
    <div
      className={`border-y ${
        onDark ? "border-white/12" : "border-ink/10"
      }`}
    >
      <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-7 py-7 md:gap-x-12 md:py-9">
        {clients.map((client) => (
          <li key={client.name} className="shrink-0">
            {client.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={client.logo}
                alt={client.name}
                className={`h-6 w-auto object-contain transition-all duration-500 md:h-8 ${
                  onDark
                    ? "opacity-60 brightness-0 invert hover:opacity-100"
                    : "opacity-55 grayscale hover:opacity-100 hover:grayscale-0"
                }`}
              />
            ) : (
              <span
                className={`block text-[1.125rem] leading-none font-medium tracking-[-0.018em] transition-colors duration-500 md:text-[1.375rem] ${
                  onDark
                    ? "text-white/60 hover:text-white"
                    : "text-ink-300 hover:text-ink"
                }`}
              >
                {client.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
