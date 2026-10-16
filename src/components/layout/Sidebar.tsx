import { Link } from 'react-router-dom'
import { hasGuidePicker } from '../../data/guides'
import { strings } from '../../lib/strings'
import type { Guide } from '../../types/guide'
import { Icon } from '../ui/Icon'
import { ProgressBar } from './ProgressBar'
import { StepList } from './StepList'

interface SidebarProps {
  guide: Guide
  activeIndex: number
}

/** Desktop-only sticky sidebar. */
export function Sidebar({ guide, activeIndex }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-80 shrink-0 flex-col border-e border-slate-200 bg-white lg:flex">
      <div className="border-b border-slate-100 p-6">
        {hasGuidePicker && (
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-brand-700"
          >
            <Icon name="arrowLeft" size={14} />
            {strings.allGuides}
          </Link>
        )}
        <h1 className="flex items-center gap-2.5 text-2xl font-extrabold text-slate-900">
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Icon name={guide.icon} size={20} />
          </span>
          {guide.title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{guide.tagline}</p>

        <div className="mt-5">
          <div className="mb-1.5 text-xs font-medium text-slate-500">
            {strings.stepOf(activeIndex + 1, guide.steps.length)}
          </div>
          <ProgressBar current={activeIndex + 1} total={guide.steps.length} />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4" aria-label={strings.openSteps}>
        <StepList guide={guide} activeIndex={activeIndex} />
      </nav>
    </aside>
  )
}
