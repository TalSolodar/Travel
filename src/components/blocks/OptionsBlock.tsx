import { useStrings } from '../../i18n/context'
import { toneStyles } from '../../lib/tones'
import type { OptionItem, OptionsBlock as OptionsBlockData } from '../../types/guide'
import { ActionLink } from '../ui/ActionLink'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { RichText } from '../ui/RichText'

export function OptionsBlock({ block }: { block: OptionsBlockData }) {
  const cols = block.items.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
  return (
    <div className={`grid gap-5 ${cols}`}>
      {block.items.map((item) => (
        <OptionCard key={item.title} item={item} />
      ))}
    </div>
  )
}

function OptionCard({ item }: { item: OptionItem }) {
  const strings = useStrings()
  const tone = toneStyles[item.tone ?? 'brand']
  const ring = item.recommended ? 'ring-2 ring-brand-500/60' : ''

  return (
    <Card className={`relative flex flex-col overflow-hidden ${ring}`}>
      <div className={`h-1.5 w-full ${tone.solid}`} />
      {item.badge && (
        <span className="absolute end-4 top-4 rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">
          {item.badge}
        </span>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <h3 className={`flex items-center gap-2 text-lg font-bold text-slate-900 ${item.badge ? 'pe-28' : ''}`}>
          {item.icon && <Icon name={item.icon} size={20} className={tone.icon} />}
          {item.title}
        </h3>

        {item.description && (
          <p className="text-sm leading-relaxed text-slate-600">
            <RichText text={item.description} />
          </p>
        )}

        {Boolean(item.pros?.length || item.cons?.length) && (
          <ul className="space-y-2 text-sm text-slate-700">
            {item.pros?.map((pro) => (
              <ProCon key={pro} text={pro} kind="pro" />
            ))}
            {item.cons?.map((con) => (
              <ProCon key={con} text={con} kind="con" />
            ))}
          </ul>
        )}

        {item.tip && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <span className="me-1 inline-flex items-center gap-1 font-bold">
              <Icon name="lightbulb" size={15} />
              {strings.goldenTip}:
            </span>
            <RichText text={item.tip} />
          </div>
        )}

        {item.link && (
          <div className="mt-auto pt-2">
            <ActionLink link={item.link} />
          </div>
        )}
      </div>
    </Card>
  )
}

function ProCon({ text, kind }: { text: string; kind: 'pro' | 'con' }) {
  const strings = useStrings()
  const isPro = kind === 'pro'
  return (
    <li className="flex gap-2">
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${isPro ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}
      >
        <Icon name={isPro ? 'check' : 'x'} size={12} />
        <span className="sr-only">{isPro ? strings.pros : strings.cons}</span>
      </span>
      <span className="leading-relaxed">
        <RichText text={text} />
      </span>
    </li>
  )
}
