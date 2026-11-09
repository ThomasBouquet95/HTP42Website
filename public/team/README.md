# Partner portraits

Square portraits for the partner cards in the network section. Referenced
from `photo` in `src/content/network.ts`.

## Contract

| Partner | File |
| --- | --- |
| Pascal Bouquet | `pascal-bouquet.jpg` |
| Gabriel Eichler | `gabriel-eichler.jpg` |
| Jennifer Cubino | `jennifer-cubino.jpg` |
| Linda Dib | `linda-dib.jpg` |
| Rachel Ougier Simonin | `rachel-ougier-simonin.jpg` |

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

The first four are the branded studio set, cropped from the square originals.
The
HealthTech Partners 42 wordmark sits in the top right corner of each original
and has been filled out, so the cards do not repeat the wordmark four times
against a page that already carries it in the header. The fill is a Coons patch
interpolated from the surrounding gradient, which leaves no visible seam.

Rachel's is a supplied photograph taken against a domestic wall, matted out of
it and stood in the same backdrop so the row reads as one shoot. The backdrop
is not a guess: it is a smooth surface fitted to every background pixel of the
other four, which between them cover the whole frame. The matting works off
the wall being warm and light where her top is a cooler grey and darker, then
off how far each pixel sits from the wall's colour at that point, which is
what carries the curls. She is also slid left so her head sits on the centre
line with the others.
