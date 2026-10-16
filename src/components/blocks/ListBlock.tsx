import { toneStyles } from '../../lib/tones'
import type { ListBlock as ListBlockData } from '../../types/guide'
import { ActionLink } from '../ui/ActionLink'
import { Card } from '../ui/Card'
import { RichText } from '../ui/RichText'

export function ListBlock({ block }: { block: ListBlockData }) {
  const dot = toneStyles[block.tone ?? 'brand'].solid
  const Tag = block.ordered ? 'ol' : 'ul'
  return (
    <Card className="p-4 md:p-6">
      {block.title && (
        <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
          <span className={`size-3 rounded-full ${dot}`} />
          {block.title}
        </h3>
      )}
      <Tag className={`text-sm text-slate-600 ${block.ordered ? 'space-y-4' : 'space-y-2.5'}`}>
        {block.items.map((item, i) => (
          <li key={item} className={`flex leading-relaxed ${block.ordered ? 'gap-3' : 'gap-2.5'}`}>
            {block.ordered ? (
              <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${dot}`}>
                {i + 1}
              </span>
            ) : (
              <span className={`mt-2 size-1.5 shrink-0 rounded-full ${dot}`} />
            )}
            <span className={block.ordered ? 'pt-0.5' : ''}>
              <RichText text={item} />
            </span>
          </li>
        ))}
      </Tag>
      {block.link && <ActionLink link={block.link} className="mt-5 w-full sm:w-auto" />}
    </Card>
  )
}
