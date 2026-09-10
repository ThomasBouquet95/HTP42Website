import { clients } from "@/content/site";

/**
 * The client strip. Each entry renders its real logo when one is available
 * under public/logos/, and a typeset wordmark until then, so the row stays
 * visually consistent either way. Brand casing is respected as published.
 */
export function ClientStrip({ onDark = false }: { onDark?: boolean }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-14">
      {clients.map((client) => (
        <li key={client.name}>
          {client.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={client.logo}
              alt={client.name}
              className={`h-6 w-auto object-contain transition-opacity duration-500 md:h-7 ${
                onDark
                  ? "opacity-70 brightness-0 invert hover:opacity-100"
                  : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
              }`}
            />
          ) : (
            <span
              className={`text-[1.0625rem] font-medium tracking-[-0.014em] transition-colors duration-500 md:text-[1.1875rem] ${
                onDark
                  ? "text-white/70 hover:text-white"
                  : "text-ink-400 hover:text-ink"
              }`}
            >
              {client.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
