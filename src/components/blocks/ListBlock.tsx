import { toneStyles } from '../../lib/tones'
import type { ListBlock as ListBlockData } from '../../types/guide'
import { Card } from '../ui/Card'
import { RichText } from '../ui/RichText'

export function ListBlock({ block }: { block: ListBlockData }) {
  const dot = toneStyles[block.tone ?? 'brand'].solid
  return (
    <Card className="p-5 md:p-6">
      {block.title && (
        <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
          <span className={`size-3 rounded-full ${dot}`} />
          {block.title}
        </h3>
      )}
      <ul className="space-y-2.5 text-sm text-slate-600">
        {block.items.map((item) => (
          <li key={item} className="flex gap-2.5 leading-relaxed">
            <span className={`mt-2 size-1.5 shrink-0 rounded-full ${dot}`} />
            <span>
              <RichText text={item} />
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
