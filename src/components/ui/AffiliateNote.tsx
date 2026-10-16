import { Link } from 'react-router-dom'
import { Icon } from './Icon'

/** Short affiliate disclosure for the top of pages that contain affiliate links. */
export function AffiliateNote({ className = '' }: { className?: string }) {
  return (
    <aside className={`flex items-start gap-2 rounded-xl bg-slate-100 px-3.5 py-2.5 text-xs leading-relaxed text-slate-600 ${className}`}>
      <Icon name="info" size={14} className="mt-0.5 shrink-0 text-slate-400" />
      <p>
        Some links on this page are affiliate links. If you book through them, we may earn a small commission at no
        extra cost to you.{' '}
        <Link to="/affiliate-disclosure" className="font-semibold text-slate-700 underline underline-offset-2 hover:text-brand-700">
          Read our affiliate disclosure
        </Link>
        .
      </p>
    </aside>
  )
}
