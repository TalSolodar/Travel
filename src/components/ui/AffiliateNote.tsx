import { Link } from 'react-router-dom'
import { useLocale } from '../../i18n/context'
import { Icon } from './Icon'

/**
 * Short affiliate disclosure for the top of pages that contain affiliate links.
 * Guide steps show it automatically when their content has affiliate links (see lib/affiliate.ts).
 */
export function AffiliateNote({ className = '' }: { className?: string }) {
  const { strings, href } = useLocale()
  return (
    <aside
      data-affiliate-note
      className={`flex items-start gap-2 rounded-xl bg-slate-100 px-3.5 py-2.5 text-xs leading-relaxed text-slate-600 ${className}`}
    >
      <Icon name="info" size={14} className="mt-0.5 shrink-0 text-slate-400" />
      <p>
        {strings.affiliateNote}{' '}
        <Link
          to={href('/affiliate-disclosure')}
          className="font-semibold text-slate-700 underline underline-offset-2 hover:text-brand-700"
        >
          {strings.affiliateNoteLink}
        </Link>
        .
      </p>
    </aside>
  )
}
