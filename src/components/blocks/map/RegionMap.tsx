import type { FeatureCollection, Position } from 'geojson'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { loadGeo, type GeoKey } from '../../../data/geo'
import type { MapPlace, MapRegion } from '../../../types/guide'
import { RegionCard } from './RegionCard'

/** Free vector basemap: no API key, commercial use allowed. https://openfreemap.org */
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron'

/** Basemap label layers we keep, shown in Hebrew where available. Everything else is hidden. */
const KEEP_LABELS = /^(label_country|water_name)/

const PIN_SIZE = 34
/** Horizontal distance from the pin to its card, clearing the region name under the pin. */
const CARD_GAP = 56

// MapLibre looks for its worker next to its own module, which bundling breaks. Point it at the emitted asset.
maplibregl.setWorkerUrl(workerUrl)

export interface RegionMapProps {
  geo: GeoKey
  countryCode?: string
  regions: MapRegion[]
  activeId: string | null
  onActiveChange: (id: string | null) => void
  /** Float every region's card beside its pin (wide screens). */
  showCards: boolean
}

interface Mounts {
  pins: Record<string, HTMLElement>
  cards: Record<string, HTMLElement>
  popups: Record<string, maplibregl.Popup>
  places: { el: HTMLElement; place: MapPlace }[]
}

export default function RegionMap({
  geo,
  countryCode,
  regions,
  activeId,
  onActiveChange,
  showCards,
}: RegionMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [mounts, setMounts] = useState<Mounts | null>(null)

  // Handlers registered once on the map read the latest props via a ref.
  const latest = useRef({ onActiveChange, showCards })
  latest.current = { onActiveChange, showCards }

  useEffect(() => {
    let cancelled = false
    let map: maplibregl.Map | undefined

    loadGeo(geo).then((data) => {
      if (cancelled || !containerRef.current) return
      const bounds = boundsOf(data)

      map = new maplibregl.Map({
        container: containerRef.current,
        style: STYLE_URL,
        bounds,
        fitBoundsOptions: { padding: fitPadding(latest.current.showCards) },
        attributionControl: { compact: true },
        // A static infographic: keep pointer events, but don't hijack page scroll or drag.
        dragPan: false,
        scrollZoom: false,
        boxZoom: false,
        dragRotate: false,
        keyboard: false,
        doubleClickZoom: false,
        touchZoomRotate: false,
        touchPitch: false,
      })
      mapRef.current = map
      map.on('resize', () =>
        map?.fitBounds(bounds, { padding: fitPadding(latest.current.showCards), animate: false }),
      )

      map.on('load', () => {
        if (!map) return
        localizeBasemap(map, countryCode)
        addRegionLayers(map, data, regions)

        map.on('mousemove', 'regions-fill', (e) => {
          const id = e.features?.[0]?.id
          if (id != null) latest.current.onActiveChange(String(id))
          map!.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', 'regions-fill', () => {
          map!.getCanvas().style.cursor = ''
          if (latest.current.showCards) latest.current.onActiveChange(null)
        })
        map.on('click', 'regions-fill', (e) => {
          const id = e.features?.[0]?.id
          if (id != null) latest.current.onActiveChange(String(id))
        })

        // DOM nodes for pins, cards and place dots; React renders into them via portals.
        const next: Mounts = { pins: {}, cards: {}, popups: {}, places: [] }
        for (const region of regions) {
          const pin = document.createElement('div')
          new maplibregl.Marker({ element: pin, anchor: 'top', offset: [0, -PIN_SIZE] })
            .setLngLat(region.pin)
            .addTo(map)
          next.pins[region.id] = pin

          const card = document.createElement('div')
          next.cards[region.id] = card
          // Cards sit east of the pin. Fine for a coastline facing east; add a per-region side if a country needs it.
          next.popups[region.id] = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false,
            focusAfterOpen: false,
            className: 'region-popup',
            maxWidth: '17rem',
            anchor: 'left',
            offset: [CARD_GAP, -PIN_SIZE * 0.6],
          })
            .setLngLat(region.pin)
            .setDOMContent(card)

          for (const place of region.places ?? []) {
            const el = document.createElement('div')
            // Anchor on the dot's side so the dot, not the label, sits on the coordinates.
            const labelLeft = place.labelSide !== 'right'
            new maplibregl.Marker({
              element: el,
              anchor: labelLeft ? 'right' : 'left',
              offset: [labelLeft ? 4 : -4, 0],
            })
              .setLngLat(place.coords)
              .addTo(map)
            next.places.push({ el, place })
          }
        }
        setMounts(next)
      })
    })

    return () => {
      cancelled = true
      map?.remove()
      mapRef.current = null
      setMounts(null)
    }
  }, [geo, countryCode, regions])

  // Highlight the active region.
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mounts) return
    for (const r of regions) {
      map.setFeatureState({ source: 'regions', id: r.id }, { active: r.id === activeId })
    }
  }, [activeId, mounts, regions])

  // Toggle the floating cards and re-fit, since their room on the side depends on it.
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mounts) return
    for (const popup of Object.values(mounts.popups)) {
      if (showCards && !popup.isOpen()) popup.addTo(map)
      if (!showCards && popup.isOpen()) popup.remove()
    }
    map.resize()

    // The attribution starts expanded and MapLibre only collapses it on drag, which is disabled here.
    // On narrow maps collapse it to its (i) button so it doesn't cover the map.
    const setAttribution = () =>
      containerRef.current
        ?.querySelector('.maplibregl-ctrl-attrib.maplibregl-compact')
        ?.classList.toggle('maplibregl-compact-show', showCards)
    setAttribution()
    map.once('idle', setAttribution)
  }, [showCards, mounts])

  return (
    <div className="relative size-full">
      <div ref={containerRef} className="size-full" />
      {mounts &&
        regions.map((region) => (
          <RegionPortals
            key={region.id}
            region={region}
            pinEl={mounts.pins[region.id]}
            cardEl={mounts.cards[region.id]}
            active={region.id === activeId}
            onActivate={() => onActiveChange(region.id)}
          />
        ))}
      {mounts?.places.map(({ el, place }) =>
        createPortal(
          <div
            className={`pointer-events-none flex items-center gap-1 text-xs font-semibold whitespace-nowrap text-slate-700 [text-shadow:0_0_2px_#fff,0_0_2px_#fff] ${place.labelSide === 'right' ? '' : 'flex-row-reverse'}`}
          >
            <span className="size-2 shrink-0 rounded-full border border-white bg-slate-800 shadow" />
            {place.name}
          </div>,
          el,
          place.name,
        ),
      )}
    </div>
  )
}

interface RegionPortalsProps {
  region: MapRegion
  pinEl: HTMLElement
  cardEl: HTMLElement
  active: boolean
  onActivate: () => void
}

function RegionPortals({ region, pinEl, cardEl, active, onActivate }: RegionPortalsProps) {
  return (
    <>
      {createPortal(
        <button
          type="button"
          onClick={onActivate}
          onMouseEnter={onActivate}
          aria-label={region.title}
          className="flex flex-col items-center"
        >
          <svg
            width={PIN_SIZE}
            height={PIN_SIZE}
            viewBox="0 0 24 24"
            className={`drop-shadow-md transition-transform ${active ? 'scale-115' : ''}`}
          >
            <path
              d="M12 23s-8-7.6-8-13.5A8 8 0 0 1 20 9.5C20 15.4 12 23 12 23Z"
              fill="var(--color-brand-600)"
              stroke="#fff"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="9.5" r="3" fill="#fff" />
          </svg>
          <span
            className={`mt-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[13px] font-bold leading-5 shadow-sm ring-1 transition-colors ${active ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white/95 text-slate-900 ring-slate-900/10'}`}
          >
            {region.name}
          </span>
        </button>,
        pinEl,
      )}
      {createPortal(<RegionCard region={region} active={active} />, cardEl)}
    </>
  )
}

function addRegionLayers(map: maplibregl.Map, data: FeatureCollection, regions: MapRegion[]) {
  // Below the basemap labels, so country and sea names stay readable.
  const firstSymbol = map.getStyle().layers.find((l) => l.type === 'symbol')?.id
  map.addSource('regions', { type: 'geojson', data, promoteId: 'id' })
  map.addLayer(
    {
      id: 'regions-fill',
      type: 'fill',
      source: 'regions',
      paint: {
        'fill-color': [
          'match',
          ['get', 'id'],
          ...regions.flatMap((r) => [r.id, r.color]),
          '#cbd5e1',
        ] as unknown as maplibregl.ExpressionSpecification,
        'fill-opacity': ['case', ['boolean', ['feature-state', 'active'], false], 0.8, 0.5],
      },
    },
    firstSymbol,
  )
  map.addLayer(
    {
      id: 'regions-line',
      type: 'line',
      source: 'regions',
      paint: { 'line-color': '#ffffff', 'line-width': 1.5 },
    },
    firstSymbol,
  )
}

function fitPadding(showCards: boolean) {
  // Leave room on the east side for the floating cards.
  return showCards
    ? { top: 30, bottom: 30, left: 30, right: 300 }
    : { top: 24, bottom: 24, left: 24, right: 24 }
}

function boundsOf(data: FeatureCollection): maplibregl.LngLatBoundsLike {
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity]
  const visit = (c: unknown): void => {
    if (typeof (c as Position)[0] === 'number') {
      const [x, y] = c as Position
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
    } else {
      ;(c as unknown[]).forEach(visit)
    }
  }
  for (const f of data.features) if ('coordinates' in f.geometry) visit(f.geometry.coordinates)
  return [minX, minY, maxX, maxY]
}

/**
 * Hide basemap clutter and show the remaining labels in Hebrew where the data has it.
 * The label of `countryCode` itself is blanked, since the region pins already name it.
 */
function localizeBasemap(map: maplibregl.Map, countryCode?: string) {
  const name: maplibregl.ExpressionSpecification = ['coalesce', ['get', 'name:he'], ['get', 'name_en'], ['get', 'name']]
  for (const layer of map.getStyle().layers) {
    if (layer.type !== 'symbol') continue
    if (KEEP_LABELS.test(layer.id)) {
      map.setLayoutProperty(
        layer.id,
        'text-field',
        countryCode ? ['case', ['==', ['get', 'iso_a2'], countryCode], '', name] : name,
      )
    } else {
      map.setLayoutProperty(layer.id, 'visibility', 'none')
    }
  }
}
