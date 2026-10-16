import type { MapRegion } from '../../../types/guide'
import { useLocale } from '../../../i18n/context'
import { RichText } from '../../ui/RichText'

interface RegionCardProps {
  region: MapRegion
  active?: boolean
  className?: string
}

/** A region's tooltip card: floating on the map on wide screens, under it on narrow ones. */
export function RegionCard({ region, active = false, className = '' }: RegionCardProps) {
  // The map itself is always LTR; the card follows the page language.
  const { dir } = useLocale()
  return (
    <div
      dir={dir}
      className={`rounded-lg border-s-4 bg-white px-3 py-2.5 text-start font-sans transition-shadow ${active ? 'shadow-xl ring-2 ring-slate-900/10' : 'shadow-md'} ${className}`}
      style={{ borderInlineStartColor: region.color }}
    >
      <h4 className="mb-0.5 text-sm font-bold text-slate-900">{region.title}</h4>
      <p className="text-xs leading-relaxed text-slate-600">
        <RichText text={region.text} />
      </p>
    </div>
  )
}
