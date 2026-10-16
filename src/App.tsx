import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { getGuide } from './data/guides'
import { applyHead, getPageMeta, notFoundMeta } from './lib/seo'
import { AboutPage } from './pages/AboutPage'
import { AffiliateDisclosurePage } from './pages/AffiliateDisclosurePage'
import { GuidePage } from './pages/GuidePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'

/** The route table, shared by the browser app and the build-time pre-renderer. */
export function AppRoutes() {
  return (
    <>
      <HeadSync />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
        <Route path="/:guideSlug" element={<GuidePage />} />
        <Route path="/:guideSlug/:stepId" element={<GuidePage />} />
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

/** Keeps <title>, description, canonical and OG tags in sync during client-side navigation. */
function HeadSync() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getPageMeta(pathname)
    if (meta) return applyHead(meta)
    // Inside a guide, unknown paths forward to its first step and get their tags once they land.
    if (!getGuide(pathname.split('/')[1])) applyHead(notFoundMeta)
  }, [pathname])
  return null
}
