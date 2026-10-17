# Travel Guides

English and Hebrew step-by-step travel guides. Built with React, TypeScript, Vite and Tailwind CSS v4.

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
    en/vietnam.ts         ← a guide (English)
    he/vietnam.ts         ← the same guide (Hebrew)
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

## Adding a new country (e.g. Taiwan)

Nothing outside the data files needs to change. The home page, hub page, routes, sitemap, hreflang and the home page's title and description are all built from the registered guides.

1. Create `src/data/guides/en/taiwan.ts` (and `he/taiwan.ts` for Hebrew; the two can have different content):

   ```ts
   import { themes } from '../../../lib/themes'
   import type { Guide } from '../../../types/guide'

   export const taiwan: Guide = {
     slug: 'taiwan', // same slug in every language, so the pages link up as translations
     country: 'Taiwan', // heading of the country's section on the home page
     title: 'No Hassle, Taiwan!', // short name in the sidebar and mobile bar
     tagline: 'The practical guide',
     description: '...', // one line under the country heading on the home page; only mention published steps
     hub: {
       heading: 'Taiwan Travel Guide: ...', // H1 of /en/taiwan
       intro: '...',
       seo: { title: '...', description: '...' }, // max ~60 / ~155 characters
     },
     coverImage: '/images/taiwan.jpg',
     icon: 'mountain',
     theme: themes.crimson,
     steps: [
       {
         id: 'weather', // URL: /en/taiwan/weather; use the same id in Hebrew for the translation
         icon: 'weather',
         title: 'Weather & planning', // short name in menus
         heading: 'Best Time to Visit Taiwan: ...', // the page H1
         subtitle: '...',
         seo: { title: '...', description: '...' },
         image: '/images/taiwan-weather.jpg',
         blocks: [
           { type: 'paragraph', lead: true, text: 'Text with **bold**' },
         ],
       },
     ],
   }
   ```

2. Register it per language in `src/data/guides/index.ts`, e.g. `en: [vietnamEn, taiwanEn]`. The order there is the order on the home page.
3. Optional: a region map needs its own GeoJSON in `src/data/geo/` (see [Maps](#maps)).
4. Run `npm run build`. It fails with a clear message if a title or description is too long or duplicated, or a page doesn't have exactly one H1.

A step with `display: false` stays hidden everywhere (home, hub, sitemap) until you're ready to publish it.

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

## Languages (English + Hebrew)

Every page lives under a language prefix: `/en/...` and `/he/...`. Hebrew pages get `lang="he" dir="rtl"`.

- **Content per language:** `src/data/guides/en/*.ts` and `src/data/guides/he/*.ts`, registered in `src/data/guides/index.ts`. The two can differ freely (e.g. Israel-specific info in Hebrew). Use the **same slug and step ids** for pages that are translations of each other: that links them with `hreflang`. There is no on-page language switcher; the language comes only from the URL. A page that exists in only one language simply has no alternate.
- **UI strings:** `src/lib/strings.ts` (one block per language). Components read them with `useLocale()` / `useStrings()` from `src/i18n/context.tsx`.
- **Text pages** (Privacy & Transparency) have one version per language inside the page component in `src/pages/`.
- **Adding a language:** add it to `locales` in `src/i18n/locales.ts`, then fill in strings, guides and static page metadata. TypeScript points out every missing piece.

## SEO and pre-rendering

`npm run build` outputs fully pre-rendered static HTML for every page in every language. React hydrates on top for the interactive parts.

1. `vite build` builds the browser app into `dist/`.
2. `vite build --ssr src/entry-server.tsx` builds a small Node renderer into `dist-ssr/`.
3. `scripts/prerender.mjs` renders every route to `dist/<path>.html` and writes `404.html`, `sitemap.xml` (with hreflang alternates) and `robots.txt`. It fails the build if a title or description is too long or duplicated, a page doesn't have exactly one `<h1>`, or a page with affiliate links lacks the disclosure note.

- **Brand and URL:** `SITE_NAME` and the default `SITE_URL` are in `src/config/site.ts`. Override the URL with the `SITE_URL` environment variable.
- **Titles and descriptions:** guide hubs use `hub.seo`, steps use `seo` (falling back to title/subtitle), other pages are in `staticMeta` in `src/lib/seo.ts`. Each step's H1 is its `heading`.
- **Hub pages:** `/<lang>/<guide>` lists every published step of a guide, from `hub` in the guide data.
- **Affiliate note:** shown automatically at the top of any step whose content has affiliate links (any link not marked `sponsored: false`, including `#` placeholders). For other pages, place `<AffiliateNote />`.
- **Maps** need a browser, so the pre-rendered HTML shows a placeholder until the map loads.

## Deployment

`vercel.json` uses `cleanUrls`, so `/en/vietnam/weather` serves `en/vietnam/weather.html`, and unknown URLs get `404.html` with a real 404 status. There is no catch-all rewrite. It also redirects `/` to `/en` and the old un-prefixed URLs (`/vietnam/...`, `/about`, ...) permanently to their `/en/` versions.
