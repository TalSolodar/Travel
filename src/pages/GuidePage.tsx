import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BlockList } from '../components/blocks/BlockRenderer'
import { MobileBar } from '../components/layout/MobileBar'
import { Sidebar } from '../components/layout/Sidebar'
import { StepHero } from '../components/layout/StepHero'
import { StepPager } from '../components/layout/StepPager'
import { SiteFooter } from '../components/layout/SiteFooter'
import { AffiliateNote } from '../components/ui/AffiliateNote'
import { Icon } from '../components/ui/Icon'
import { getGuide } from '../data/guides'
import { useLocale } from '../i18n/context'
import { containsAffiliateLinks } from '../lib/affiliate'
import { themeStyle } from '../lib/themes'
import { GuideHubPage } from './GuideHubPage'
import { NotFoundPage } from './NotFoundPage'

export function GuidePage() {
  const { guideSlug, stepId } = useParams()
  const navigate = useNavigate()
  const { locale, dir, strings, href } = useLocale()
  const guide = getGuide(locale, guideSlug)
  const activeIndex = guide ? guide.steps.findIndex((s) => s.id === stepId) : -1
  const step = guide?.steps[activeIndex]

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [guide, step])

  // Arrow-key navigation: the arrow pointing in the reading direction goes forward.
  useEffect(() => {
    if (!guide || activeIndex < 0) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.altKey || e.ctrlKey || e.metaKey || target.closest('input, textarea, [contenteditable], [role="tablist"]')) return
      const [forward, back] = dir === 'rtl' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowRight', 'ArrowLeft']
      const delta = e.key === forward ? 1 : e.key === back ? -1 : 0
      const dest = guide.steps[activeIndex + delta]
      if (delta && dest) navigate(href(`/${guide.slug}/${dest.id}`))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [guide, activeIndex, navigate, dir, href])

  if (!guide) return <NotFoundPage />
  if (!stepId) return <GuideHubPage guide={guide} />
  if (!step) return <Navigate to={href(`/${guide.slug}`)} replace />

  return (
    <div style={themeStyle(guide.theme)} className="min-h-dvh bg-slate-50 lg:flex">
      <Sidebar guide={guide} activeIndex={activeIndex} />

      <div className="min-w-0 flex-1">
        <MobileBar guide={guide} activeIndex={activeIndex} />

        <main className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-10">
          <article key={step.id} className="animate-fade-in">
            <StepHero step={step} index={activeIndex} />
            {containsAffiliateLinks(step.blocks) && <AffiliateNote className="-mt-4 mb-6" />}
            <BlockList blocks={step.blocks} />
          </article>

          <StepPager guide={guide} activeIndex={activeIndex} />

          <footer className="mt-10 flex items-start justify-center gap-1.5 text-center text-xs text-slate-400">
            <Icon name="heart" size={13} className="mt-0.5 shrink-0 text-rose-400" />
            {guide.disclaimer ?? strings.defaultDisclaimer}
          </footer>
          <SiteFooter className="mt-8" />
        </main>
      </div>
    </div>
  )
}
