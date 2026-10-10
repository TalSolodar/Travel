import { toneStyles } from '../../lib/tones'
import type { CalloutBlock as CalloutBlockData } from '../../types/guide'
import { Icon } from '../ui/Icon'
import { RichText } from '../ui/RichText'

export function CalloutBlock({ block }: { block: CalloutBlockData }) {
  const tone = toneStyles[block.tone]
  return (
    <aside className={`flex gap-4 rounded-2xl border p-5 ${tone.box}`}>
      <div className={`mt-0.5 shrink-0 ${tone.icon}`}>
        <Icon name={block.icon ?? tone.defaultIcon} size={24} />
      </div>
      <div>
        <h3 className={`mb-1 text-lg font-bold ${tone.title}`}>{block.title}</h3>
        <p className={`text-sm leading-relaxed md:text-base ${tone.text}`}>
          <RichText text={block.text} />
        </p>
      </div>
    </aside>
  )
}
