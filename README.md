# Travel Guides

English, step-by-step travel guides. Built with React, TypeScript, Vite and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
```

## How it works

The guide pages contain no hard-coded content. A guide is a data file, and the components render whatever it contains.

```
src/
  types/guide.ts          ← the data model (Guide → Step → Block)
  data/guides/
    vietnam.ts            ← a guide
    index.ts              ← registry of all guides
  components/
    blocks/               ← one component per block type
    layout/               ← sidebar, mobile bar, hero, pager
    ui/                   ← Card, Badge, ActionLink, Icon, RichText, SmartImage
  lib/
    icons.ts              ← icon name → lucide icon
    themes.ts             ← per-guide color palettes
    tones.ts              ← colors for callouts/options/ratings
    strings.ts            ← all UI copy
```

Routes: `/` lists the guides, `/:guide` redirects to the guide's first step, and `/:guide/:step` shows a step.

## Adding a new guide (e.g. Taiwan)

1. Create `src/data/guides/taiwan.ts`:

   ```ts
   import { themes } from '../../lib/themes'
   import type { Guide } from '../../types/guide'

   export const taiwan: Guide = {
     slug: 'taiwan',
     country: 'Taiwan',
     title: 'Taiwan',
     tagline: '...',
     description: '...',
     coverImage: 'https://...',
     icon: 'mountain',
     theme: themes.crimson,
     steps: [
       {
         id: 'taipei',
         icon: 'city',
         title: 'Taipei',
         subtitle: '...',
         image: 'https://...',
         blocks: [
           { type: 'heading', text: '...' },
           { type: 'paragraph', lead: true, text: 'Text with **bold**' },
         ],
       },
     ],
   }
   ```

2. Register it in `src/data/guides/index.ts`: `export const guides = [vietnam, taiwan]`.

The guide then shows up on the home page with its own color theme.

## Block types

| `type`      | Use for                                        |
| ----------- | ---------------------------------------------- |
| `heading`   | Section title                                  |
| `paragraph` | Text (`lead: true` for the larger intro style) |
| `callout`   | Warning / tip / info box (`tone`)              |
| `options`   | Side-by-side comparison with pros, cons, tip and link |
| `table`     | Table; a cell can carry a `rating`             |
| `seasons`   | Month-by-month "when to go" grid per region    |
| `climate`   | Tabbed weather breakdown per region: best months, then each period with months, temperature and a rating |
| `map`       | Interactive country map split into colored regions, each with a pin and a tooltip card |
| `places`    | Hotel / attraction cards with stars, tags and booking links |
| `cta`       | Dark booking banner                            |
| `list`      | Titled bullet list                             |

Text fields support `**bold**`. Icons are names from `src/lib/icons.ts`; to use a new icon, add it there.

To add a new block type, add its interface to `Block` in `types/guide.ts`, create a component in `components/blocks/`, and add a `case` to `BlockRenderer.tsx`. TypeScript reports an error until all three are done.

## Maps

The `map` block is built on free, open-source tools. It needs no API key and has no usage fees.

- [MapLibre GL JS](https://maplibre.org/) draws the map. It is the open-source fork of Mapbox GL. It loads lazily, so pages without a map don't download it.
- [OpenFreeMap](https://openfreemap.org/) provides the background map tiles. They are free with no key, commercial use is allowed, and the attribution is shown on the map.
- Region shapes are small GeoJSON files in `src/data/geo/`, registered in `src/data/geo/index.ts`. Each feature's `properties.id` must match a region `id` in the guide data.

On wide screens every region's card floats beside its pin. On narrow screens the map stays clean and the card for the selected region appears under it.

To rebuild the Vietnam regions, download Natural Earth's [admin-1 provinces](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson), which are public domain, and run:

```bash
node scripts/build-vietnam-regions.mjs path/to/ne_10m_admin_1_states_provinces.geojson
```

For another country, copy the script, change the province-to-region mapping, and register the output in `src/data/geo/index.ts`.

## Affiliate links

External links open in a new tab with `rel="sponsored noopener noreferrer"`. The links in `vietnam.ts` are still `#` placeholders; replace them with your real affiliate URLs.

## Deployment note

The app uses browser routing (`/vietnam/hanoi`), so the host must rewrite unknown paths to `index.html`. Netlify, Vercel and Cloudflare Pages support this; on GitHub Pages, switch to `HashRouter` in `src/App.tsx`.
