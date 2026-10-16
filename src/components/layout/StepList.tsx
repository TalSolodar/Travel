import { useLocale } from '../../i18n/context'
import { Link } from 'react-router-dom'
import type { Guide } from '../../types/guide'
import { Icon } from '../ui/Icon'

interface StepListProps {
  guide: Guide
  activeIndex: number
  onNavigate?: () => void
}

/** Vertical timeline of all steps in a guide. */
export function StepList({ guide, activeIndex, onNavigate }: StepListProps) {
  const { href } = useLocale()
  return (
    <ol className="relative">
      {guide.steps.map((step, index) => {
        const isActive = index === activeIndex
        const isDone = index < activeIndex
        const isLast = index === guide.steps.length - 1

        const dot = isActive
          ? 'bg-brand-600 text-white ring-4 ring-brand-100'
          : isDone
            ? 'bg-brand-100 text-brand-700'
            : 'bg-white text-slate-400 border border-slate-200 group-hover:border-brand-300 group-hover:text-brand-600'

        return (
          <li key={step.id} className="relative">
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute start-[1.6875rem] top-12 h-[calc(100%-2.5rem)] w-0.5 ${isDone ? 'bg-brand-200' : 'bg-slate-200'}`}
              />
            )}
            <Link
              to={href(`/${guide.slug}/${step.id}`)}
              onClick={onNavigate}
              aria-current={isActive ? 'step' : undefined}
              className={`group relative flex items-center gap-3 rounded-xl p-2.5 transition-colors ${isActive ? 'bg-brand-50' : 'hover:bg-slate-50'}`}
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-colors ${dot}`}
              >
                <Icon name={isDone ? 'check' : step.icon} size={17} />
              </span>
              <span className="min-w-0">
                <span className={`block text-sm font-bold ${isActive ? 'text-brand-900' : 'text-slate-800'}`}>
                  {step.title}
                </span>
                <span className={`block truncate text-xs ${isActive ? 'text-brand-700' : 'text-slate-500'}`}>
                  {step.subtitle}
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
