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
  of four from four different shoots looking consistent.
- If a partner has no file here, drop the `photo` line for them in
  `src/content/network.ts` and the card falls back to a typeset monogram.

## Current state

`pascal-bouquet.jpg` and `linda-d.jpg` are cropped from the portraits published
on htp42.com. `gabriel-eichler.jpg` and `jennifer-cubino.jpg` are not present
yet, so those two cards show monograms. Adding the files and the matching
`photo` lines is all that is needed.
