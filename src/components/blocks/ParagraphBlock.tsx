import type { ParagraphBlock as ParagraphBlockData } from '../../types/guide'
import { RichText } from '../ui/RichText'

export function ParagraphBlock({ block }: { block: ParagraphBlockData }) {
  return (
    <p
      className={
        block.lead
          ? 'text-base leading-relaxed text-slate-700 md:text-lg md:leading-relaxed'
          : 'leading-relaxed text-slate-600'
      }
    >
      <RichText text={block.text} />
    </p>
  )
}
