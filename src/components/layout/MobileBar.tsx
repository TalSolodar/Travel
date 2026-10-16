import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../../i18n/context'
import type { Guide } from '../../types/guide'
import { Icon } from '../ui/Icon'
import { ProgressBar } from './ProgressBar'
import { StepList } from './StepList'

interface MobileBarProps {
  guide: Guide
  activeIndex: number
}

/** Mobile/tablet sticky header: progress, prev/next and a drawer with all steps. */
export function MobileBar({ guide, activeIndex }: MobileBarProps) {
  const { strings, href } = useLocale()
  const [open, setOpen] = useState(false)
  const step = guide.steps[activeIndex]
  const prev = guide.steps[activeIndex - 1]
  const next = guide.steps[activeIndex + 1]

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const navBtn =
    'flex size-10 shrink-0 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 aria-disabled:pointer-events-none aria-disabled:opacity-30'

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-1 px-2 py-2">
          <Link
            to={prev ? href(`/${guide.slug}/${prev.id}`) : '#'}
            aria-disabled={!prev}
            aria-label={strings.prev}
            className={navBtn}
          >
            <Icon name="arrowLeft" size={20} className="rtl:-scale-x-100" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="flex min-w-0 flex-1 flex-col items-center rounded-xl px-2 py-1 hover:bg-slate-50"
          >
            <span className="text-[11px] font-medium text-brand-700">
              {strings.stepOf(activeIndex + 1, guide.steps.length)} · {guide.title}
            </span>
            <span className="flex max-w-full items-center gap-1 truncate text-sm font-bold text-slate-900">
              <span className="truncate">{step.title}</span>
              <Icon name="chevronDown" size={16} className="shrink-0 text-slate-400" />
            </span>
          </button>

          <Link
            to={next ? href(`/${guide.slug}/${next.id}`) : '#'}
            aria-disabled={!next}
            aria-label={strings.next}
            className={navBtn}
          >
            <Icon name="arrowRight" size={20} className="rtl:-scale-x-100" />
          </Link>
        </div>
        <ProgressBar
          current={activeIndex + 1}
          total={guide.steps.length}
          className="rounded-none"
        />
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label={strings.openSteps}>
          <button
            type="button"
            aria-label={strings.close}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="animate-slide-in absolute inset-y-0 start-0 flex w-[min(20rem,85vw)] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <Link
                to={href(`/${guide.slug}`)}
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-slate-900 hover:text-brand-700"
              >
                {guide.title}
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={strings.close}
                className="flex size-9 items-center justify-center rounded-full hover:bg-slate-100"
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <StepList guide={guide} activeIndex={activeIndex} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
