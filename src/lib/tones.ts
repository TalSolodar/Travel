import type { Rating, Tone } from '../types/guide'
import type { IconName } from './icons'

interface ToneStyle {
  /** Soft background + border for boxes. */
  box: string
  title: string
  text: string
  /** Solid fill (stripes, dots, icon chips). */
  solid: string
  icon: string
  defaultIcon: IconName
}

export const toneStyles: Record<Tone, ToneStyle> = {
  brand: {
    box: 'bg-brand-50 border-brand-200',
    title: 'text-brand-900',
    text: 'text-brand-900/80',
    solid: 'bg-brand-500',
    icon: 'text-brand-600',
    defaultIcon: 'leaf',
  },
  accent: {
    box: 'bg-sky-50 border-sky-200',
    title: 'text-sky-900',
    text: 'text-sky-900/80',
    solid: 'bg-sky-500',
    icon: 'text-sky-600',
    defaultIcon: 'compass',
  },
  warning: {
    box: 'bg-amber-50 border-amber-200',
    title: 'text-amber-900',
    text: 'text-amber-900/80',
    solid: 'bg-amber-400',
    icon: 'text-amber-600',
    defaultIcon: 'lightbulb',
  },
  danger: {
    box: 'bg-red-50 border-red-200',
    title: 'text-red-900',
    text: 'text-red-900/80',
    solid: 'bg-red-500',
    icon: 'text-red-600',
    defaultIcon: 'warning',
  },
  info: {
    box: 'bg-blue-50 border-blue-200',
    title: 'text-blue-900',
    text: 'text-blue-900/80',
    solid: 'bg-blue-500',
    icon: 'text-blue-600',
    defaultIcon: 'info',
  },
  neutral: {
    box: 'bg-slate-50 border-slate-200',
    title: 'text-slate-900',
    text: 'text-slate-700',
    solid: 'bg-slate-400',
    icon: 'text-slate-500',
    defaultIcon: 'info',
  },
}

interface RatingStyle {
  /** Solid fill (grid cells, stripes). */
  cell: string
  text: string
  /** Soft pill badge. */
  badge: string
  icon: IconName
}

export const ratingStyles: Record<Rating, RatingStyle> = {
  good: {
    cell: 'bg-emerald-500',
    text: 'text-emerald-700',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    icon: 'check',
  },
  ok: {
    cell: 'bg-amber-300',
    text: 'text-amber-700',
    badge: 'bg-amber-50 text-amber-800 ring-amber-600/20',
    icon: 'warning',
  },
  bad: {
    cell: 'bg-rose-400',
    text: 'text-rose-700',
    badge: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    icon: 'x',
  },
}
