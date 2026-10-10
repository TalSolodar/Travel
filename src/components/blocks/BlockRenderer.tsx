import type { Block } from '../../types/guide'
import { CalloutBlock } from './CalloutBlock'
import { ClimateBlock } from './ClimateBlock'
import { CtaBlock } from './CtaBlock'
import { HeadingBlock } from './HeadingBlock'
import { ListBlock } from './ListBlock'
import { MapBlock } from './MapBlock'
import { OptionsBlock } from './OptionsBlock'
import { ParagraphBlock } from './ParagraphBlock'
import { PlacesBlock } from './PlacesBlock'
import { SeasonsBlock } from './SeasonsBlock'
import { TableBlock } from './TableBlock'

/** Maps each block `type` in the guide data to its component. */
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock block={block} />
    case 'paragraph':
      return <ParagraphBlock block={block} />
    case 'callout':
      return <CalloutBlock block={block} />
    case 'options':
      return <OptionsBlock block={block} />
    case 'table':
      return <TableBlock block={block} />
    case 'seasons':
      return <SeasonsBlock block={block} />
    case 'climate':
      return <ClimateBlock block={block} />
    case 'map':
      return <MapBlock block={block} />
    case 'places':
      return <PlacesBlock block={block} />
    case 'cta':
      return <CtaBlock block={block} />
    case 'list':
      return <ListBlock block={block} />
  }
}

export function BlockList({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  )
}
