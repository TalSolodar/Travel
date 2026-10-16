import { SITE_NAME, SITE_URL } from '../config/site'
import { getGuide, guides } from '../data/guides'

/** Everything a page needs in its <head>. Adding a page means filling in these fields. */
export interface PageMeta {
  /** Canonical path, e.g. "/vietnam/weather". */
  path: string
  /** Max ~60 characters. */
  title: string
  /** Max ~155 characters. */
  description: string
  type?: 'website' | 'article'
  /** Site-relative ("/images/x.jpg") or absolute URL. */
  image?: string
  /** Keep the page out of search results (e.g. the 404 page). */
  noindex?: boolean
}

/** Pages that don't come from guide data. */
export const staticPages: Record<string, PageMeta> = {
  '/': {
    path: '/',
    title: 'Vietnam Travel Guides: Weather, Visa & Practical Tips',
    description:
      'Practical, step-by-step travel guides. Plan your Vietnam trip: the best time to visit, e-visa, airport fast track, money tips and where to stay.',
    image: '/images/vietnam.jpg',
  },
  '/about': {
    path: '/about',
    title: `About ${SITE_NAME}: Who We Are`,
    description:
      'Who is behind Travel Guides, how we research our step-by-step guides, and how the site is funded through affiliate links.',
  },
  '/privacy': {
    path: '/privacy',
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      'How Travel Guides handles your data: what we collect, how cookies and affiliate partners are used, and how to contact us.',
  },
  '/affiliate-disclosure': {
    path: '/affiliate-disclosure',
    title: `Affiliate Disclosure | ${SITE_NAME}`,
    description:
      'Some links on Travel Guides are affiliate links. Learn how they work, which partners we use, and why they never cost you extra.',
  },
}

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: `Page Not Found | ${SITE_NAME}`,
  description: "The page you were looking for doesn't exist. Head back to the home page to find our travel guides.",
  noindex: true,
}

const normalize = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname)

export const absoluteUrl = (pathOrUrl: string) => (/^https?:\/\//.test(pathOrUrl) ? pathOrUrl : SITE_URL + pathOrUrl)

/** Metadata for a URL, or undefined if the path isn't a page of its own (unknown, or a redirect). */
export function getPageMeta(pathname: string): PageMeta | undefined {
  const path = normalize(pathname)
  if (staticPages[path]) return staticPages[path]

  const [slug, stepId, ...rest] = path.slice(1).split('/')
  const guide = getGuide(slug)
  const step = guide?.steps.find((s) => s.id === stepId)
  if (!guide || !step || rest.length) return undefined
  return {
    path,
    title: step.seo?.title ?? `${step.title} | ${guide.title}`,
    description: step.seo?.description ?? step.subtitle,
    type: 'article',
    image: step.image ?? guide.coverImage,
  }
}

/** Every indexable page, in sitemap order. Guide steps come from the data, so new ones are picked up automatically. */
export function pagePaths(): string[] {
  return [
    '/',
    ...guides.flatMap((guide) => guide.steps.map((step) => `/${guide.slug}/${step.id}`)),
    ...Object.keys(staticPages).filter((p) => p !== '/'),
  ]
}

/** `/<guide>` has no page of its own; it forwards to the guide's first step. */
export function guideRedirects(): { from: string; to: string }[] {
  return guides.map((guide) => ({ from: `/${guide.slug}`, to: `/${guide.slug}/${guide.steps[0].id}` }))
}

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
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE_NAME } },
  ]
  if (meta.noindex) {
    tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } })
  } else {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: url } })
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: url } })
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

/** Syncs the live document's <head> after client-side navigation. */
export function applyHead(meta: PageMeta) {
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
