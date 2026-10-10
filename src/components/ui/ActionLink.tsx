import type { LinkAction } from '../../types/guide'
import { Icon } from './Icon'

const variants: Record<NonNullable<LinkAction['variant']>, string> = {
  primary:
    'bg-brand-600 text-white shadow-md shadow-brand-600/25 hover:bg-brand-700 px-5 py-2.5 rounded-xl',
  outline:
    'border-2 border-brand-600 text-brand-700 hover:bg-brand-50 px-5 py-2 rounded-xl',
  text: 'text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline',
}

interface ActionLinkProps {
  link: LinkAction
  className?: string
}

/** A styled external link. External links open in a new tab and are marked sponsored by default. */
export function ActionLink({ link, className = '' }: ActionLinkProps) {
  const isExternal = /^https?:\/\//.test(link.href)
  const sponsored = link.sponsored ?? isExternal
  const rel = isExternal ? ['noopener', 'noreferrer', sponsored && 'sponsored'].filter(Boolean).join(' ') : undefined

  return (
    <a
      href={link.href}
      target={isExternal ? '_blank' : undefined}
      rel={rel}
      className={`inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${variants[link.variant ?? 'primary']} ${className}`}
    >
      {link.icon && <Icon name={link.icon} size={16} />}
      {link.label}
    </a>
  )
}
