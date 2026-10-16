import type { FactsBlock as FactsBlockData } from '../../types/guide'
import { Icon } from '../ui/Icon'

export function FactsBlock({ block }: { block: FactsBlockData }) {
  return (
    // Phones: one row per fact. Wider: a row of tiles.
    <dl className="divide-y divide-brand-100 rounded-2xl bg-brand-50 sm:grid sm:grid-cols-3 sm:gap-3 sm:divide-y-0 sm:bg-transparent">
      {block.items.map((fact) => (
        <div
          key={fact.label}
          className="flex items-center gap-3 px-4 py-3 sm:flex-col sm:gap-0 sm:rounded-2xl sm:bg-brand-50 sm:px-2 sm:py-4 sm:text-center"
        >
          <Icon name={fact.icon} size={20} className="shrink-0 text-brand-600 sm:mb-1.5" />
          <dt className="flex-1 text-sm text-slate-600 sm:flex-none sm:text-xs sm:font-medium sm:text-slate-500">{fact.label}</dt>
          <dd className="text-sm font-bold text-slate-900 sm:text-base">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
