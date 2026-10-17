import { SITE_NAME, SITE_URL } from '../config/site'
import { getGuide, getGuides } from '../data/guides'
import { defaultLocale, localeInfo, localePath, locales, splitLocale, type Locale } from '../i18n/locales'

/** Everything a page needs in its <head>. Adding a page means filling in these fields. */
export interface PageMeta {
  /** Full path including the language prefix, e.g. "/en/vietnam/weather". */
  path: string
  locale: Locale
  /** Max ~60 characters. */
  title: string
  /** Max ~155 characters. */
  description: string
  type?: 'website' | 'article'
  /** Site-relative ("/images/x.jpg") or absolute URL. */
  image?: string
  /** Keep the page out of search results (e.g. the 404 page). */
  noindex?: boolean
  /** The same page in each language that has it, for hreflang and the language switcher. */
  alternates?: Partial<Record<Locale, string>>
}

type BaseMeta = Pick<PageMeta, 'title' | 'description' | 'type' | 'image'>

/** Pages that don't come from guide data, per language. Paths are without the language prefix. */
export const staticPagePaths = ['/', '/about', '/privacy', '/affiliate-disclosure'] as const
type StaticPath = (typeof staticPagePaths)[number]

const staticMeta: Record<Locale, Record<StaticPath, BaseMeta>> = {
  en: {
    '/': {
      title: 'Vietnam Travel Guides: Weather, Visa & Practical Tips',
      description:
        'Practical, step-by-step travel guides. Plan your Vietnam trip: the best time to visit, e-visa, airport fast track, money tips and where to stay.',
      image: '/images/vietnam.jpg',
    },
    '/about': {
      title: `About ${SITE_NAME.en}: Who We Are`,
      description: `Who is behind ${SITE_NAME.en}, how we research our step-by-step travel guides, and how the site is funded through affiliate links.`,
    },
    '/privacy': {
      title: `Privacy Policy | ${SITE_NAME.en}`,
      description: `How ${SITE_NAME.en} handles your data: what we collect, how cookies and affiliate partners are used, and how to contact us.`,
    },
    '/affiliate-disclosure': {
      title: `Affiliate Disclosure | ${SITE_NAME.en}`,
      description: `Some links on ${SITE_NAME.en} are affiliate links. Learn how they work, which partners we use, and why they never cost you extra.`,
    },
  },
  he: {
    '/': {
      title: 'מדריכי טיול לויאטנם: מזג אוויר, ויזה וטיפים מעשיים',
      description:
        'מדריכי טיול מעשיים צעד אחר צעד. מתכננים טיול לויאטנם? מתי הכי כדאי לטוס, ויזה אלקטרונית, פאסט טרק בשדה התעופה, טיפים לכסף ואיפה לישון.',
      image: '/images/vietnam.jpg',
    },
    '/about': {
      title: `אודות ״${SITE_NAME.he}״: מי אנחנו`,
      description: `מי עומד מאחורי ״${SITE_NAME.he}״, איך אנחנו בונים את מדריכי הטיול צעד אחר צעד, ואיך האתר ממומן באמצעות קישורי שותפים.`,
    },
    '/privacy': {
      title: `מדיניות פרטיות | ${SITE_NAME.he}`,
      description: `איך ״${SITE_NAME.he}״ מטפל במידע שלכם: מה נאסף, איך משתמשים בעוגיות ובשותפים עסקיים, ואיך יוצרים איתנו קשר.`,
    },
    '/affiliate-disclosure': {
      title: `גילוי נאות: קישורי שותפים | ${SITE_NAME.he}`,
      description: `חלק מהקישורים ב״${SITE_NAME.he}״ הם קישורי שותפים. כאן מוסבר איך הם עובדים, עם מי אנחנו עובדים, ולמה הם אף פעם לא עולים לכם יותר.`,
    },
  },
}

export const notFoundMeta: PageMeta = {
  path: '/404',
  locale: defaultLocale,
  title: `Page Not Found | ${SITE_NAME.en}`,
  description: "The page you were looking for doesn't exist. Head back to the home page to find our travel guides.",
  noindex: true,
}

export const absoluteUrl = (pathOrUrl: string) => (/^https?:\/\//.test(pathOrUrl) ? pathOrUrl : SITE_URL + pathOrUrl)

/** Metadata for a page in one language, by its path without the language prefix. */
function resolve(locale: Locale, rest: string): BaseMeta | undefined {
  if ((staticPagePaths as readonly string[]).includes(rest)) return staticMeta[locale][rest as StaticPath]

  const [slug, stepId, ...extra] = rest.slice(1).split('/')
  const guide = getGuide(locale, slug)
  if (!guide || extra.length) return undefined
  if (!stepId) return { ...guide.hub.seo, image: guide.coverImage }

  const step = guide.steps.find((s) => s.id === stepId)
  if (!step) return undefined
  return {
    title: step.seo?.title ?? `${step.title} | ${guide.title}`,
    description: step.seo?.description ?? step.subtitle,
    type: 'article',
    image: step.image ?? guide.coverImage,
  }
}

/** Full metadata for a URL, or undefined if it isn't a page. */
export function getPageMeta(pathname: string): PageMeta | undefined {
  const { locale, rest } = splitLocale(pathname)
  if (!locale) return undefined
  const base = resolve(locale, rest)
  if (!base) return undefined
  const alternates: Partial<Record<Locale, string>> = {}
  for (const l of locales) if (resolve(l, rest)) alternates[l] = localePath(l, rest)
  return { ...base, path: localePath(locale, rest), locale, alternates }
}

/** Every indexable page, in every language. Guide hubs and steps come from the data, so new ones are picked up automatically. */
export function pagePaths(): string[] {
  return locales.flatMap((locale) => [
    ...staticPagePaths.map((p) => localePath(locale, p)),
    ...getGuides(locale).flatMap((guide) => [
      localePath(locale, `/${guide.slug}`),
      ...guide.steps.map((step) => localePath(locale, `/${guide.slug}/${step.id}`)),
    ]),
  ])
}

const ogLocale: Record<Locale, string> = { en: 'en_US', he: 'he_IL' }

interface HeadTag {
  tag: 'title' | 'meta' | 'link'
  attrs: Record<string, string>
  text?: string
}

function headEntries(meta: PageMeta): HeadTag[] {
  const url = absoluteUrl(meta.path)
  const tags: HeadTag[] = [
    { tag: 'title', attrs: {}, text: meta.title },
    { tag: 'meta', attrs: { name: 'description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:title', content: meta.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:type', content: meta.type ?? 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE_NAME[meta.locale] } },
    { tag: 'meta', attrs: { property: 'og:locale', content: ogLocale[meta.locale] } },
  ]
  if (meta.noindex) {
    tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } })
  } else {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: url } })
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: url } })
    const alternates = meta.alternates ?? {}
    for (const l of locales) {
      const alt = alternates[l]
      if (alt) tags.push({ tag: 'link', attrs: { rel: 'alternate', hreflang: l, href: absoluteUrl(alt) } })
    }
    const fallback = alternates[defaultLocale] ?? meta.path
    tags.push({ tag: 'link', attrs: { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(fallback) } })
  }
  if (meta.image) tags.push({ tag: 'meta', attrs: { property: 'og:image', content: absoluteUrl(meta.image) } })
  return tags
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** The <head> tags as an HTML string, for pre-rendering. */
export function headTags(meta: PageMeta): string {
  return headEntries(meta)
    .map(({ tag, attrs, text }) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => ` ${k}="${escapeHtml(v)}"`)
        .join('')
      return tag === 'title' ? `<title>${escapeHtml(text ?? '')}</title>` : `<${tag} data-head${attrStr} />`
    })
    .join('\n    ')
}

/** `lang` and `dir` for the page's <html> element. */
export const htmlAttrs = (meta: PageMeta) => `lang="${meta.locale}" dir="${localeInfo[meta.locale].dir}"`

/** Syncs the live document's <html> and <head> after client-side navigation. */
export function applyHead(meta: PageMeta) {
  document.documentElement.lang = meta.locale
  document.documentElement.dir = localeInfo[meta.locale].dir
  document.title = meta.title
  document.head.querySelectorAll('[data-head]').forEach((el) => el.remove())
  for (const { tag, attrs } of headEntries(meta)) {
    if (tag === 'title') continue
    const el = document.createElement(tag)
    el.setAttribute('data-head', '')
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
    document.head.appendChild(el)
  }
}

/** sitemap.xml with every page in every language, each listing its translations. */
export function sitemapXml(): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const urls = pagePaths().map((path) => {
    const meta = getPageMeta(path)!
    const alts = Object.entries(meta.alternates ?? {})
      .map(([l, p]) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${esc(absoluteUrl(p!))}" />`)
      .join('')
    const xDefault = `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(meta.alternates?.[defaultLocale] ?? path))}" />`
    return `  <url>\n    <loc>${esc(absoluteUrl(path))}</loc>${alts}${xDefault}\n  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}
