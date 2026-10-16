// Build step 3 of 3: turn the client build into static HTML, one file per route.
//   1. `vite build` writes the browser app to dist/ (dist/index.html is the template).
//   2. `vite build --ssr` writes a Node renderer to dist-ssr/.
//   3. This script renders every route into dist/, plus 404.html, sitemap.xml and robots.txt.
// Routes come from the guide data (src/lib/seo.ts), so new guides and steps are picked up automatically.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const ssrDir = resolve('dist-ssr')

const template = await readFile(join(dist, 'index.html'), 'utf8')
const server = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const { SITE_URL, absoluteUrl, getPageMeta, guideRedirects, headTags, notFoundMeta, pagePaths, render } = server

const page = (meta, body) => template.replace('<!--app-head-->', headTags(meta)).replace('<!--app-html-->', body)

// "/" → index.html, "/vietnam/weather" → vietnam/weather.html (served at /vietnam/weather via cleanUrls).
const fileFor = (path) => join(dist, path === '/' ? 'index.html' : `${path.slice(1)}.html`)

async function write(file, content) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, content)
}

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

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

  await write(fileFor(path), page(meta, html))
}

// Real 404 page: Vercel serves it with a 404 status for any unknown URL.
await write(join(dist, '404.html'), page(notFoundMeta, render('/404')))

// "/vietnam" has no content of its own: send visitors (and crawlers) on to the first step.
for (const { from, to } of guideRedirects()) {
  const target = absoluteUrl(to)
  await write(
    fileFor(from),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Redirecting…</title>
    <link rel="canonical" href="${target}" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${to}" />
  </head>
  <body><a href="${to}">Continue to the guide</a></body>
</html>
`,
  )
}

await write(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${escapeXml(absoluteUrl(p))}</loc></url>`).join('\n')}
</urlset>
`,
)

await write(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

await rm(ssrDir, { recursive: true, force: true })

console.log(`Pre-rendered ${paths.length} pages for ${SITE_URL}:`)
for (const p of paths) console.log(`  ${p}`)
console.log('  + 404.html, sitemap.xml, robots.txt, redirects: ' + guideRedirects().map((r) => r.from).join(', '))

if (problems.length) {
  console.error('\nSEO problems:\n' + problems.map((p) => `  - ${p}`).join('\n'))
  process.exit(1)
}
