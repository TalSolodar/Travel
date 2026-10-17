import { Link } from 'react-router-dom'
import { useLocale } from '../../i18n/context'
import type { Guide, Step } from '../../types/guide'
import { Icon } from '../ui/Icon'
import { SmartImage } from '../ui/SmartImage'

interface StepCardProps {
  guide: Guide
  step: Step
  index: number
  /** h2 on the hub page; h3 on the home page, where it sits under a country heading. */
  headingLevel?: 'h2' | 'h3'
}

/** Card linking to one guide step. Used on the home page and on country hub pages. */
export function StepCard({ guide, step, index, headingLevel: Heading = 'h2' }: StepCardProps) {
  const { strings, href } = useLocale()
  return (
    <Link
      to={href(`/${guide.slug}/${step.id}`)}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 overflow-hidden">
        <SmartImage
          src={step.image}
          alt={step.heading ?? step.title}
          className="size-full transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute start-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
          {strings.stepLabel(index + 1)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="mb-1 flex items-center gap-2 text-xl font-bold text-slate-900">
          <Icon name={step.icon} size={20} className="shrink-0 text-brand-600" />
          {step.heading ?? step.title}
        </Heading>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">{step.subtitle}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          {strings.readGuide}
          <Icon name="arrowRight" size={16} className="transition group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
