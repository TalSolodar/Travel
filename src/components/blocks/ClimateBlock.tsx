import { useId, useRef, useState, type KeyboardEvent } from 'react'
import type { IconName } from '../../lib/icons'
import { strings } from '../../lib/strings'
import { ratingStyles } from '../../lib/tones'
import type { ClimateBlock as ClimateBlockData, ClimatePeriod, ClimateRegion, Rating } from '../../types/guide'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { RichText } from '../ui/RichText'

const badgeIcons: Record<Rating, IconName> = { good: 'check', ok: 'info', bad: 'warning' }

export function ClimateBlock({ block }: { block: ClimateBlockData }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  const select = (index: number) => {
    const count = block.regions.length
    const next = (index + count) % count
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  // Right arrow moves forward.
  const onKeyDown = (e: KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: block.regions.length - 1,
    }
    if (e.key in moves) {
      e.preventDefault()
      e.stopPropagation()
      select(moves[e.key])
    }
  }

  return (
    <Card className="overflow-hidden">
      {(block.title || block.description) && (
        <div className="p-5 pb-0 md:p-6 md:pb-0">
          {block.title && (
            <h3 className="mb-1 flex items-center gap-2 text-xl font-bold text-slate-900">
              <Icon name="calendar" size={20} className="text-brand-600" />
              {block.title}
            </h3>
          )}
          {block.description && (
            <p className="text-sm text-slate-500">
              <RichText text={block.description} />
            </p>
          )}
        </div>
      )}

      <div className="p-5 md:p-6">
        <div
          role="tablist"
          onKeyDown={onKeyDown}
          className="flex gap-1 rounded-xl bg-slate-100 p-1"
        >
          {block.regions.map((r, i) => {
            const selected = i === activeIndex
            return (
              <button
                key={r.name}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={`${baseId}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(i)}
                className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-center text-[13px] leading-tight font-semibold transition sm:gap-2 sm:px-3 sm:text-sm ${selected ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {r.color && <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: r.color }} />}
                {r.name}
              </button>
            )
          })}
        </div>

        {/* Every panel is in the HTML (so search engines see all regions); only the selected one is shown. */}
        {block.regions.map((r, i) => (
          <div
            key={r.name}
            id={`${baseId}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${i}`}
            hidden={i !== activeIndex}
            className="animate-fade-in pt-5"
          >
            <RegionPanel region={r} />
          </div>
        ))}
      </div>
    </Card>
  )
}

function RegionPanel({ region }: { region: ClimateRegion }) {
  return (
    <div className="space-y-4">
      {(region.places || region.intro) && (
        <div>
          {region.places && (
            <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Icon name="pin" size={13} />
              {region.places}
            </p>
          )}
          {region.intro && (
            <p className="leading-relaxed text-slate-700">
              <RichText text={region.intro} />
            </p>
          )}
        </div>
      )}

      {region.best && (
        <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 p-3.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
            <Icon name="sun" size={18} />
          </span>
          <div>
            <div className="text-xs font-medium text-brand-700">{strings.bestTime}</div>
            <div className="font-bold text-brand-900">{region.best}</div>
          </div>
        </div>
      )}

      <ul className="space-y-3">
        {region.periods.map((period) => (
          <PeriodCard key={period.months} period={period} />
        ))}
      </ul>
    </div>
  )
}

function PeriodCard({ period }: { period: ClimatePeriod }) {
  const style = ratingStyles[period.rating]
  return (
    <li className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 ps-5">
      <span className={`absolute inset-y-0 start-0 w-1.5 ${style.cell}`} aria-hidden="true" />

      <div className="mb-2 flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <div>
          <h4 className="font-bold text-slate-900">{period.months}</h4>
          {period.season && <div className="text-sm text-slate-500">{period.season}</div>}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {period.temp && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              <Icon name="thermometer" size={13} />
              <bdi dir="ltr">{period.temp}</bdi>
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${style.badge}`}
          >
            <Icon name={badgeIcons[period.rating]} size={13} />
            {strings.climateRatings[period.rating]}
          </span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-slate-600">
        <RichText text={period.text} />
      </p>
    </li>
  )
}
