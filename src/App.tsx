import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { guides, hasGuidePicker } from './data/guides'
import { GuidePage } from './pages/GuidePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={hasGuidePicker ? <HomePage /> : <Navigate to={`/${guides[0].slug}`} replace />}
        />
        <Route path="/:guideSlug" element={<GuidePage />} />
        <Route path="/:guideSlug/:stepId" element={<GuidePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
