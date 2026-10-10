import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { loadGeo } from '../../data/geo'
import type { MapBlock as MapBlockData, MapRegion } from '../../types/guide'
import { MAP_STYLE_URL } from './map/style'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { RichText } from '../ui/RichText'
import { RegionCard } from './map/RegionCard'

// MapLibre is large, so it loads only when a map is actually on screen.
const loadRegionMap = () => import('./map/RegionMap')
const RegionMap = lazy(loadRegionMap)

/** At or above this width every card floats beside its pin; below it, only the active card shows, overlaid on the map. */
const WIDE_MIN = 640

export function MapBlock({ block }: { block: MapBlockData }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [wide, setWide] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Fetch the map code, region shapes and map style in parallel rather than one after another.
  useEffect(() => {
    loadRegionMap()
    loadGeo(block.geo)
    fetch(MAP_STYLE_URL).catch(() => {})
  }, [block.geo])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWide(entry.contentRect.width >= WIDE_MIN))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // On narrow screens a card must always be visible, so fall back to the first region.
  const shownId = activeId ?? (wide ? null : block.regions[0]?.id ?? null)
  const shownRegion = block.regions.find((r) => r.id === shownId)

  return (
    <Card className="overflow-hidden">
      {(block.title || block.description) && (
        <div className="p-5 pb-4 md:p-6 md:pb-4">
          {block.title && (
            <h3 className="mb-1 flex items-center gap-2 text-xl font-bold text-slate-900">
              <Icon name="pin" size={20} className="text-brand-600" />
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

      <div ref={wrapperRef} className="relative h-[30rem] bg-slate-100 sm:h-[34rem]" dir="ltr">
        <Suspense fallback={<div className="size-full animate-pulse bg-slate-100" />}>
          <RegionMap
            geo={block.geo}
            countryCode={block.countryCode}
            regions={block.regions}
            activeId={shownId}
            onActiveChange={setActiveId}
            showCards={wide}
          />
        </Suspense>

        {!wide && shownRegion && (
          // Overlaid on the map, on the side away from the selected region so it never hides it.
          <div
            className={`pointer-events-none absolute inset-x-3 z-10 ${isInSouthernHalf(shownRegion, block.regions) ? 'top-3' : 'bottom-10'}`}
          >
            <RegionCard key={shownRegion.id} region={shownRegion} className="animate-fade-in pointer-events-auto" />
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 p-3 sm:p-4">
        <div className="flex gap-1 rounded-xl bg-slate-100 p-1" role="group">
          {block.regions.map((region) => {
            const isActive = region.id === shownId
            return (
              <button
                key={region.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(isActive && wide ? null : region.id)}
                className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-center text-[13px] leading-tight font-semibold transition sm:gap-2 sm:text-sm ${isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: region.color }} />
                {region.name}
              </button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

/** Whether the region's pin lies south of the average pin, i.e. in the lower part of the map. */
function isInSouthernHalf(region: MapRegion, regions: MapRegion[]) {
  const avgLat = regions.reduce((sum, r) => sum + r.pin[1], 0) / regions.length
  return region.pin[1] < avgLat
}
