import type { ReactNode } from 'react'
import type { IconName } from '../../lib/icons'
import { Icon } from './Icon'

interface BadgeProps {
  children: ReactNode
  icon?: IconName
  variant?: 'solid' | 'soft'
  className?: string
}

export function Badge({ children, icon, variant = 'soft', className = '' }: BadgeProps) {
  const look =
    variant === 'solid' ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${look} ${className}`}
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  )
}
