import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'

/** Renders a route to HTML. Used only by scripts/prerender.mjs at build time. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}

export { SITE_URL } from './config/site'
export { absoluteUrl, getPageMeta, guideRedirects, headTags, notFoundMeta, pagePaths } from './lib/seo'
