import { toneStyles } from '../../lib/tones'
import type { CalloutBlock as CalloutBlockData } from '../../types/guide'
import { ActionLink } from '../ui/ActionLink'
import { Icon } from '../ui/Icon'
import { RichText } from '../ui/RichText'

export function CalloutBlock({ block }: { block: CalloutBlockData }) {
  const tone = toneStyles[block.tone]
  const icon = block.icon ?? tone.defaultIcon

  if (block.subtle) {
    return (
      <aside className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
        <Icon name={icon} size={14} className="mt-0.5 shrink-0" />
        <p>
          <strong className="font-semibold text-slate-600">{block.title}:</strong> <RichText text={block.text} />
        </p>
      </aside>
    )
  }

  return (
    // Phones: icon beside the title, text full width below. Wider: icon in its own column.
    <aside className={`grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 rounded-2xl border p-4 md:gap-x-4 md:gap-y-0.5 md:p-5 ${tone.box}`}>
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm md:row-span-3 md:self-start ${tone.icon}`}>
        <Icon name={icon} size={18} />
      </span>
      <h3 className={`font-bold md:text-lg ${tone.title}`}>{block.title}</h3>
      <p className={`col-span-2 text-sm leading-relaxed md:col-span-1 md:col-start-2 md:text-base ${tone.text}`}>
        <RichText text={block.text} />
      </p>
      {block.link && (
        <ActionLink link={block.link} className="col-span-2 mt-1 w-full sm:w-auto sm:justify-self-start md:col-span-1 md:col-start-2 md:mt-2.5" />
      )}
    </aside>
  )
}
