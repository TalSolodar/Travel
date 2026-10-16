import type { GeoKey } from '../data/geo'
import type { IconName } from '../lib/icons'
import type { BrandTheme } from '../lib/themes'

/**
 * Text fields marked `RichText` support **bold** inline markup.
 */
export type RichText = string

/** Semantic color used by callouts, option cards, list markers, etc. */
export type Tone = 'brand' | 'accent' | 'warning' | 'danger' | 'info' | 'neutral'

/** A season / suitability rating used by tables and the season grid. */
export type Rating = 'good' | 'ok' | 'bad'

export interface LinkAction {
  label: string
  href: string
  icon?: IconName
  variant?: 'primary' | 'outline' | 'text'
  /** Marks the link as an affiliate link (rel="sponsored"). Defaults to true for external links. */
  sponsored?: boolean
}

export interface HeadingBlock {
  type: 'heading'
  text: string
  icon?: IconName
}

export interface ParagraphBlock {
  type: 'paragraph'
  text: RichText
  /** Larger intro-style paragraph. */
  lead?: boolean
}

export interface CalloutBlock {
  type: 'callout'
  tone: Tone
  title: string
  text: RichText
  icon?: IconName
  /** Render as quiet small print (e.g. a disclaimer) instead of a colored box. */
  subtle?: boolean
  /** Optional button under the text. */
  link?: LinkAction
}

export interface OptionItem {
  title: string
  icon?: IconName
  tone?: Tone
  /** Small ribbon such as "The authentic choice". */
  badge?: string
  /** Visually highlights this option as the recommended one. */
  recommended?: boolean
  description?: RichText
  pros?: RichText[]
  cons?: RichText[]
  tip?: RichText
  link?: LinkAction
}

/** Side-by-side comparison cards (train vs bus, cruise vs day trip...). */
export interface OptionsBlock {
  type: 'options'
  items: OptionItem[]
}

export type TableCell =
  | string
  | {
      text: string
      rating?: Rating
      icon?: IconName
      /** Smaller explanation under the text, e.g. "Pleasant, mild spring". */
      note?: string
    }

export interface TableBlock {
  type: 'table'
  title?: string
  columns: string[]
  rows: TableCell[][]
}

export interface SeasonRegion {
  name: string
  note?: RichText
  /** Exactly 12 ratings, January → December. */
  ratings: Rating[]
}

/** Month-by-month "when to go" grid per region. */
export interface SeasonsBlock {
  type: 'seasons'
  title?: string
  description?: RichText
  regions: SeasonRegion[]
}

export interface ClimatePeriod {
  /** e.g. "March - April | September - November" */
  months: string
  /** e.g. "Spring & autumn", "Typhoon season" */
  season?: string
  /** e.g. "20°-28°" */
  temp?: string
  rating: Rating
  text: RichText
}

export interface ClimateRegion {
  name: string
  /** Main places in the region, e.g. "Hanoi, Sapa, Ha Long Bay". */
  places?: string
  /** Matches the region's color on the map. */
  color?: string
  intro?: RichText
  /** The short answer, highlighted at the top, e.g. "March-April, September-November". */
  best?: string
  periods: ClimatePeriod[]
}

/** Detailed, tabbed weather breakdown per region. */
export interface ClimateBlock {
  type: 'climate'
  title?: string
  description?: RichText
  regions: ClimateRegion[]
}

/** [longitude, latitude] */
export type LngLat = [number, number]

export interface MapPlace {
  name: string
  coords: LngLat
  /** Side of the dot the name sits on. Defaults to 'left'. */
  labelSide?: 'left' | 'right'
}

export interface MapRegion {
  /** Must match `properties.id` of a feature in the geo source. */
  id: string
  /** Label shown under the pin, e.g. "Northern Vietnam". */
  name: string
  /** Tooltip card title. */
  title: string
  text: RichText
  /** Fill color of the region, any CSS hex color. */
  color: string
  /** Where the pin (and its tooltip card) sits. */
  pin: LngLat
  /** Small labeled dots, e.g. cities in the region. */
  places?: MapPlace[]
}

/** Interactive map of a country split into regions, each with a tooltip card. */
export interface MapBlock {
  type: 'map'
  title?: string
  description?: RichText
  geo: GeoKey
  /** ISO 3166-1 alpha-2 code. Hides the basemap's own label for this country so it doesn't clash with the pins. */
  countryCode?: string
  regions: MapRegion[]
}

export interface PlaceTag {
  label: string
  icon?: IconName
}

export interface Place {
  name: string
  image?: string
  /** Star rating, 1-5. */
  stars?: number
  badge?: string
  description: RichText
  tags?: PlaceTag[]
  links?: LinkAction[]
}

/** Hotel / restaurant / attraction cards. */
export interface PlacesBlock {
  type: 'places'
  items: Place[]
}

/** Highlighted call-to-action banner (e.g. booking partner). */
export interface CtaBlock {
  type: 'cta'
  title: string
  text: RichText
  link: LinkAction
}

export interface ListBlock {
  type: 'list'
  title?: string
  /** Colored dot shown next to the title. */
  tone?: Tone
  /** Numbered steps instead of bullets. */
  ordered?: boolean
  items: RichText[]
  /** Optional button under the list. */
  link?: LinkAction
}

export interface Fact {
  icon: IconName
  /** Small caption, e.g. "Valid for". */
  label: string
  /** The figure itself, e.g. "Up to 90 days". */
  value: string
}

/** A row of small "at a glance" tiles. */
export interface FactsBlock {
  type: 'facts'
  items: Fact[]
}

export interface TimelineTask {
  /** Anchor id of the task's section, unique on the page. */
  id: string
  /** When to do it, e.g. "6-8 weeks before". */
  when: string
  title: string
  /** One line shown in the timeline. */
  summary: RichText
  icon: IconName
  /** Small pill under the summary, e.g. "Takes 3-5 business days". */
  note?: string
  /** The full explanation, shown in the task's section under the timeline. */
  details: Block[]
}

/** A clickable pre-trip timeline; each task scrolls to its own section below. */
export interface TimelineBlock {
  type: 'timeline'
  title?: string
  description?: RichText
  items: TimelineTask[]
}

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | CalloutBlock
  | OptionsBlock
  | TableBlock
  | SeasonsBlock
  | MapBlock
  | ClimateBlock
  | PlacesBlock
  | CtaBlock
  | ListBlock
  | TimelineBlock
  | FactsBlock

export interface Step {
  /** URL slug, unique inside the guide. */
  id: string
  /** Set to false to hide the step without deleting it. Defaults to true. */
  display?: boolean
  /** Search-engine title (max ~60 chars) and description (max ~155 chars). Falls back to title/subtitle. */
  seo?: SeoFields
  icon: IconName
  /** Short name, used in menus and cards. */
  title: string
  /** The page's H1: descriptive and close to the SEO title. Falls back to `title`. */
  heading?: string
  subtitle: string
  image?: string
  blocks: Block[]
}

export interface SeoFields {
  title: string
  description: string
}

export interface Guide {
  /** URL slug, e.g. "vietnam". Use the same slug in every language so the pages link up as translations. */
  slug: string
  country: string
  title: string
  tagline: string
  description: string
  /** The guide's hub page (/<lang>/<slug>): its H1, intro text and search metadata. */
  hub: {
    heading: string
    intro: RichText
    seo: SeoFields
  }
  coverImage: string
  icon: IconName
  theme?: BrandTheme
  disclaimer?: string
  steps: Step[]
}
