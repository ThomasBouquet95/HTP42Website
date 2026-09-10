# Partner portraits

Square portraits for the partner cards on the homepage network section and on
`/network`. Referenced from `photo` in `src/content/network.ts`.

## Contract

| Partner | File |
| --- | --- |
| Pascal Bouquet | `pascal-bouquet.jpg` |
| Gabriel Eichler | `gabriel-eichler.jpg` |
| Jennifer Cubino | `jennifer-cubino.jpg` |
| Linda D. | `linda-d.jpg` |

- Square, 800 x 800 or larger. The cards crop to a square and anchor to the
  top of the frame, so leave a little headroom above the head and keep the
  eyes in the upper third.
- JPEG, quality 85 or so. These are lazy loaded and served through the Next.js
  image optimiser, which handles the responsive sizes and WebP conversion.
- Colour or black and white both work. The cards render every portrait
  greyscale and bring it up to full colour on hover, which is what keeps a row
  of four from different shoots looking consistent.
- If a partner has no file here, drop the `photo` line for them in
  `src/content/network.ts` and the card falls back to a typeset monogram.

## Provenance

All four are the branded studio set, cropped from the square originals. The
HealthTech Partners 42 wordmark sits in the top right corner of each original
and has been filled out, so the cards do not repeat the wordmark four times
against a page that already carries it in the header. The fill is a Coons patch
interpolated from the surrounding gradient, which leaves no visible seam.
