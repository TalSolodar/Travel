import type { FeatureCollection } from 'geojson'

/**
 * Region shapes for `map` blocks, loaded on demand. Each feature must have a
 * `properties.id` that matches a region `id` in the guide data.
 * See scripts/build-vietnam-regions.mjs for how these files are generated.
 */
export const geoSources = {
  'vietnam-regions': () => import('./vietnam-regions.json'),
} satisfies Record<string, () => Promise<{ default: unknown }>>

export type GeoKey = keyof typeof geoSources

export async function loadGeo(key: GeoKey): Promise<FeatureCollection> {
  const mod = await geoSources[key]()
  return mod.default as FeatureCollection
}
