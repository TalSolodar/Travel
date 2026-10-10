import type { CtaBlock as CtaBlockData } from '../../types/guide'
import { ActionLink } from '../ui/ActionLink'
import { RichText } from '../ui/RichText'

export function CtaBlock({ block }: { block: CtaBlockData }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/20 md:flex-row md:items-center">
      <div>
        <h3 className="mb-1 text-lg font-bold">{block.title}</h3>
        <p className="text-sm text-slate-300">
          <RichText text={block.text} />
        </p>
      </div>
      <ActionLink link={block.link} className="w-full shrink-0 whitespace-nowrap md:w-auto" />
    </div>
  )
}
