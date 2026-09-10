# Client logos

Drop the real assets here, then point at them from `src/content/site.ts`:

```ts
export const clients: Client[] = [
  { name: "Novartis", logo: "/logos/novartis.svg" },
  ...
];
```

SVG is preferred. The strip renders each logo at a fixed height (24px, 28px
above the md breakpoint) and lets the width follow, so supply assets trimmed to
the wordmark with no surrounding padding. On light bands logos render greyscale
at 60% and come to full colour on hover; on dark bands they are inverted to
white. A single colour asset therefore works best.

Any client without a `logo` path falls back to a typeset wordmark, so the strip
stays consistent while assets are being collected.
