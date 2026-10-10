// Builds src/data/geo/vietnam-regions.json: Vietnam split into north / center / south.
//
// Source: Natural Earth admin-1 provinces (public domain), 10m resolution:
//   https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson
//
// Usage: node scripts/build-vietnam-regions.mjs <path-to-ne_10m_admin_1_states_provinces.geojson>

import { readFileSync, writeFileSync } from 'node:fs'
import mapshaper from 'mapshaper'

const OUT = 'src/data/geo/vietnam-regions.json'

// Natural Earth's `region` field (Vietnamese sub-regions) → our three regions.
const BY_SUBREGION = {
  'Tây Bắc': 'north',
  'Đông Bắc': 'north',
  'Ðông B?c': 'north',
  'Đồng Bằng Sông Hồng': 'north',
  'Bắc Trung Bộ': 'center',
  'Nam Trung Bộ': 'center',
  'Tây Nguyên': 'center',
  'Đông Nam Bộ': 'south',
  'đồng bằng sông Cửu Long': 'south',
}

// Provinces whose `region` is missing or mislabeled in the source data.
const BY_NAME = {
  'Quàng Nam': 'center',
  'Bình Thuận': 'center',
  'Ninh Thuận': 'center',
  'Hau Giang': 'south',
  'Can Tho': 'south',
  'Đông Nam Bộ': 'south', // Đồng Nai, mislabeled in the source
  'Đông Bắc': 'north', // Bắc Kạn, mislabeled in the source
  'Đồng Bằng Sông Hồng': 'north', // Hưng Yên, mislabeled in the source
}

const [source] = process.argv.slice(2)
if (!source) {
  console.error('Usage: node scripts/build-vietnam-regions.mjs <admin1.geojson>')
  process.exit(1)
}

const all = JSON.parse(readFileSync(source, 'utf8'))
const features = all.features
  .filter((f) => f.properties.adm0_a3 === 'VNM')
  .map((f) => {
    const { name, region } = f.properties
    const id = BY_NAME[name] ?? BY_SUBREGION[region]
    if (!id) throw new Error(`Unclassified province: ${name} (${region})`)
    return { type: 'Feature', properties: { id }, geometry: f.geometry }
  })

const output = await mapshaper.applyCommands(
  '-i input.json -dissolve id -simplify 8% keep-shapes -filter-slivers -o output.json precision=0.001',
  { 'input.json': { type: 'FeatureCollection', features } },
)

writeFileSync(OUT, output['output.json'])
console.log(`Wrote ${OUT} (${features.length} provinces → 3 regions)`)
