import type { HeadingBlock as HeadingBlockData } from '../../types/guide'
import { Icon } from '../ui/Icon'

export function HeadingBlock({ block }: { block: HeadingBlockData }) {
  return (
    <h2 className="flex items-center gap-2 pt-4 text-2xl font-bold text-slate-900">
      {block.icon && <Icon name={block.icon} size={22} className="text-brand-600" />}
      {block.text}
    </h2>
  )
}
