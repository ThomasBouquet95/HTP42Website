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
- Colour, and from the same shoot where possible. The cards render portraits
  as supplied, so a photograph in a noticeably different treatment will read as
  the odd one out.
- If a partner has no file here, drop the `photo` line for them in
  `src/content/network.ts` and the card falls back to a typeset monogram.

## Provenance

All four are the branded studio set, cropped from the square originals. The
HealthTech Partners 42 wordmark sits in the top right corner of each original
and has been filled out, so the cards do not repeat the wordmark four times
against a page that already carries it in the header. The fill is a Coons patch
interpolated from the surrounding gradient, which leaves no visible seam.
