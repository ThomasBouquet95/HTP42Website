# HealthTech Partners 42, Website

A complete redesign and rebuild of [htp42.com](https://htp42.com): a premium,
editorial marketing site for HTP42, the senior expert network for life sciences
data, AI and technology.

## Stack

| Concern    | Choice |
| ---------- | ------ |
| Framework  | Next.js 16 (App Router, React 19, TypeScript strict) |
| Styling    | Tailwind CSS v4, configured entirely in `src/app/globals.css` via `@theme` |
| Motion     | Framer Motion 11 |
| Icons      | Lucide React, plus a bespoke inline-SVG diagram set |
| Type       | Inter Tight · Instrument Serif · JetBrains Mono (self-hosted via `next/font`) |

Every route is statically prerendered. There is no database, no CMS and no API
route, content lives in typed modules under `src/content`, so a copy change is
a reviewable diff.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; also runs the type check
npm start        # serve the production build
```

## Information architecture

The original site had a flat list of nine services and no case studies. This
rebuild leads with evidence. HTP42 does not sell a fixed set of services, so the
four groupings shown are illustrative examples of where its experts work, not a
practice structure.

```
/                       Positioning, expertise areas, proof, why, impact, network, thinking, CTA
/expertise              Illustrative expertise areas, engagement model
/impact                 7 case studies, filterable by expertise area
/impact/[slug]          Problem → intervention → outcomes → impact
/network                The operating model, the comparison, 41 experts, partners, join
/perspectives           Published thinking, requested by email
/contact                Enquiry form (composes mail client) + direct routes
/privacy  /terms        Legal
/sitemap.xml  /robots.txt
```

## Design system

The system is deliberately narrow: **ink navy, warm paper, one blue**. Colour is
information, not decoration.

- **Tokens**, `src/app/globals.css`. Palette, fluid type scale, easing curves.
- **Utilities**, `@utility` blocks define the repeating primitives: `shell`,
  `section`, `eyebrow`, `accent-italic`, `rule`, `grain`, `link-wipe`,
  `card-lift`, `marquee-track`.
- **Rhythm**, every section opens with a drawn hairline, an indexed mono
  eyebrow, a large headline on the left and the lead set right. Repeating that
  exactly is what makes the site read as one publication.
- **Brand** , the mark is the real HTP42 lemniscate, traced from the
  official asset to an SVG path (`MARK_PATH` in `src/components/ui/Logo.tsx`)
  so it stays crisp at every size and takes `currentColor`. Source PNGs are
  versioned in `public/brand/`. Brand blue is `#1e91f9`, sampled from the
  asset. Favicon, apple touch icon and `icon.svg` are all generated from the
  same path.
- **Voice**, headlines mix a tight grotesk with an italic serif accent phrase;
  labels and figures are mono with tabular numerals.
- **Bands**, pages alternate `paper` / `paper-2` / `ink`, and every page opens
  and closes on a dark band.

### Accessibility

- All body and label text meets WCAG AA against every background it appears on
  (the muted greys and white alphas were measured and raised, not eyeballed).
- `prefers-reduced-motion` is honoured by every animated component, reveals,
  counters, marquees, the constellation and the layout transitions all degrade
  to static.
- Semantic landmarks, a skip link, visible focus rings, `aria-live` on the case
  filter, real `<table>` markup for the comparison, and labelled form controls.

## Content

| File | Holds |
| ---- | ----- |
| `src/content/site.ts` | Brand, nav, contact, proof points, differentiators, partners |
| `src/content/expertise.ts` | Illustrative expertise areas, their service lines, engagement model |
| `src/content/cases.ts` | 7 case studies |
| `src/content/network.ts` | Leadership, 6 disciplines, model comparison, values |
| `src/content/perspectives.ts` | Published thinking |

Case studies are drawn from HTP42's engagement references. Client names are
withheld; sector, scale, duration and team composition are not.
