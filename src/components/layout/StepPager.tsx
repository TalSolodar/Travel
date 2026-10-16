import { Link } from 'react-router-dom'
import { useLocale } from '../../i18n/context'
import type { Guide } from '../../types/guide'
import { Icon } from '../ui/Icon'

interface StepPagerProps {
  guide: Guide
  activeIndex: number
}

/** Prev/next cards at the end of each step, showing where you're heading. */
export function StepPager({ guide, activeIndex }: StepPagerProps) {
  const { strings, href } = useLocale()
  const prev = guide.steps[activeIndex - 1]
  const next = guide.steps[activeIndex + 1]

  return (
    <nav className="mt-14 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2" aria-label={strings.stepNavigation}>
      {prev ? (
        <Link
          to={href(`/${guide.slug}/${prev.id}`)}
          className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
        >
          <Icon name="arrowLeft" size={20} className="text-slate-400 transition group-hover:-translate-x-1 group-hover:text-brand-600 rtl:-scale-x-100 rtl:group-hover:translate-x-1" />
          <span>
            <span className="block text-xs text-slate-500">{strings.prev}</span>
            <span className="block font-bold text-slate-800">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}

      {next ? (
        <Link
          to={href(`/${guide.slug}/${next.id}`)}
          className="group flex items-center justify-end gap-3 rounded-2xl bg-brand-600 p-4 text-end text-white shadow-md shadow-brand-600/25 transition hover:bg-brand-700"
        >
          <span>
            <span className="block text-xs text-white/80">{strings.next}</span>
            <span className="block font-bold">{next.title}</span>
          </span>
          <Icon name="arrowRight" size={20} className="transition group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </Link>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
            <Icon name="flag" size={18} />
          </span>
          <span>
            <span className="block font-bold text-brand-900">{strings.finishTitle}</span>
            <Link to={href(`/${guide.slug}/${guide.steps[0].id}`)} className="text-sm text-brand-700 underline-offset-4 hover:underline">
              {strings.backToStart}
            </Link>
          </span>
        </div>
      )}
    </nav>
  )
}
