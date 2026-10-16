// Build step 3 of 3: turn the client build into static HTML, one file per route.
//   1. `vite build` writes the browser app to dist/ (dist/index.html is the template).
//   2. `vite build --ssr` writes a Node renderer to dist-ssr/.
//   3. This script renders every route, in every language, into dist/, plus 404.html, sitemap.xml and robots.txt.
// Routes come from the guide data (src/lib/seo.ts), so new guides, steps and languages are picked up automatically.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const ssrDir = resolve('dist-ssr')

const template = await readFile(join(dist, 'index.html'), 'utf8')
const server = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const { SITE_URL, getPageMeta, headTags, htmlAttrs, notFoundMeta, pagePaths, render, sitemapXml } = server

const HTML_TAG = '<html lang="en" dir="ltr">'
if (!template.includes(HTML_TAG) || !template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <html> tag or the <!--app-head--> / <!--app-html--> placeholders')
}

const page = (meta, body) =>
  template
    .replace(HTML_TAG, `<html ${htmlAttrs(meta)}>`)
    .replace('<!--app-head-->', headTags(meta))
    .replace('<!--app-html-->', body)

// "/en" → en.html, "/en/vietnam/weather" → en/vietnam/weather.html (served without ".html" via cleanUrls).
const fileFor = (path) => join(dist, `${path.slice(1)}.html`)

async function write(file, content) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, content)
}

const paths = pagePaths()
const problems = []
const seenTitles = new Map()
const seenDescriptions = new Map()

for (const path of paths) {
  const meta = getPageMeta(path)
  if (!meta) throw new Error(`No metadata for ${path}`)
  if (meta.title.length > 60) problems.push(`${path}: title is ${meta.title.length} chars (max ~60)`)
  if (meta.description.length > 155) problems.push(`${path}: description is ${meta.description.length} chars (max ~155)`)
  if (seenTitles.has(meta.title)) problems.push(`${path}: same title as ${seenTitles.get(meta.title)}`)
  if (seenDescriptions.has(meta.description)) problems.push(`${path}: same description as ${seenDescriptions.get(meta.description)}`)
  seenTitles.set(meta.title, path)
  seenDescriptions.set(meta.description, path)

  const html = render(path)
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length
  if (h1s !== 1) problems.push(`${path}: ${h1s} <h1> elements (expected 1)`)
  if (/rel="[^"]*sponsored/.test(html) && !html.includes('data-affiliate-note')) {
    problems.push(`${path}: has affiliate links but no affiliate disclosure note`)
  }

  await write(fileFor(path), page(meta, html))
}

// One 404 page for the whole site: Vercel serves it with a real 404 status for any unknown URL.
await write(join(dist, '404.html'), page(notFoundMeta, render('/en/404')))

await write(join(dist, 'sitemap.xml'), sitemapXml())
await write(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

// dist/index.html was only the template; "/" redirects to the default language (vercel.json).
await rm(join(dist, 'index.html'))
await rm(ssrDir, { recursive: true, force: true })

console.log(`Pre-rendered ${paths.length} pages for ${SITE_URL}:`)
for (const p of paths) console.log(`  ${p}`)
console.log('  + 404.html, sitemap.xml, robots.txt')

if (problems.length) {
  console.error('\nSEO problems:\n' + problems.map((p) => `  - ${p}`).join('\n'))
  process.exit(1)
}
