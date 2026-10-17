import { useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { LocaleProvider } from './i18n/context'
import { defaultLocale, isLocale, localePath, splitLocale } from './i18n/locales'
import { getGuide } from './data/guides'
import { applyHead, getPageMeta, notFoundMeta } from './lib/seo'
import { AffiliateDisclosurePage } from './pages/AffiliateDisclosurePage'
import { GuidePage } from './pages/GuidePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'

/** The route table, shared by the browser app and the build-time pre-renderer. Every page lives under /en or /he. */
export function AppRoutes() {
  return (
    <>
      <HeadSync />
      <Routes>
        {/* In production Vercel redirects "/" (see vercel.json); this covers the dev server. */}
        <Route path="/" element={<Navigate to={localePath(defaultLocale, '/')} replace />} />
        <Route path="/:lang" element={<LocaleLayout />}>
          <Route index element={<HomePage />} />
          {/* The About page was removed; Vercel redirects /<lang>/about to /<lang> (this covers the dev server). */}
          <Route path="about" element={<Navigate to=".." replace />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="affiliate-disclosure" element={<AffiliateDisclosurePage />} />
          <Route path=":guideSlug" element={<GuidePage />} />
          <Route path=":guideSlug/:stepId" element={<GuidePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

/** Provides the URL's language to everything below it; an unknown prefix is a 404. */
function LocaleLayout() {
  const { lang } = useParams()
  if (!isLocale(lang)) return <NotFoundPage />
  return (
    <LocaleProvider value={lang}>
      <Outlet />
    </LocaleProvider>
  )
}

/** Keeps <html lang/dir>, <title>, description, canonical, hreflang and OG tags in sync during client-side navigation. */
function HeadSync() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getPageMeta(pathname)
    if (meta) return applyHead(meta)
    // Unknown steps inside a guide forward to its hub and get their tags once they land.
    const { locale, rest } = splitLocale(pathname)
    if (!locale || !getGuide(locale, rest.split('/')[1])) applyHead(notFoundMeta)
  }, [pathname])
  return null
}
