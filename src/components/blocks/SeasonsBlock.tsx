import { useStrings } from '../../i18n/context'
import { ratingStyles } from '../../lib/tones'
import type { Rating, SeasonsBlock as SeasonsBlockData } from '../../types/guide'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { RichText } from '../ui/RichText'

const legend: Rating[] = ['good', 'ok', 'bad']

export function SeasonsBlock({ block }: { block: SeasonsBlockData }) {
  const strings = useStrings()
  return (
    <Card className="p-5 md:p-6">
      {block.title && (
        <h3 className="mb-1 flex items-center gap-2 text-xl font-bold text-slate-900">
          <Icon name="weather" size={20} className="text-brand-600" />
          {block.title}
        </h3>
      )}
      {block.description && (
        <p className="mb-4 text-sm text-slate-500">
          <RichText text={block.description} />
        </p>
      )}

      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="min-w-[36rem] space-y-4">
          <div className="grid grid-cols-[8rem_repeat(12,1fr)] gap-1 text-center text-xs text-slate-500">
            <span />
            {strings.months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {block.regions.map((region) => (
            <div key={region.name}>
              <div className="grid grid-cols-[8rem_repeat(12,1fr)] items-center gap-1">
                <span className="truncate text-sm font-semibold text-slate-800">{region.name}</span>
                {region.ratings.map((rating, i) => (
                  <span
                    key={i}
                    title={`${strings.months[i]}: ${strings.ratings[rating]}`}
                    className={`h-7 rounded-md ${ratingStyles[rating].cell}`}
                  />
                ))}
              </div>
              {region.note && (
                <p className="ms-[8.25rem] mt-1.5 text-xs leading-relaxed text-slate-500">
                  <RichText text={region.note} />
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-600">
        {legend.map((r) => (
          <span key={r} className="inline-flex items-center gap-1.5">
            <span className={`size-3 rounded ${ratingStyles[r].cell}`} />
            {strings.ratings[r]}
          </span>
        ))}
      </div>
    </Card>
  )
}
