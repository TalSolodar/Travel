import type { CSSProperties } from 'react'

/**
 * Each guide can have its own brand color. A theme overrides the
 * `--color-brand-*` CSS variables that Tailwind's `brand` utilities read.
 */
export interface BrandTheme {
  50: string
  100: string
  200: string
  500: string
  600: string
  700: string
  900: string
}

export const themes = {
  jade: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 500: '#10b981', 600: '#059669', 700: '#047857', 900: '#064e3b' },
  crimson: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 900: '#881337' },
  ocean: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 900: '#0c4a6e' },
  saffron: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 900: '#78350f' },
} satisfies Record<string, BrandTheme>

export function themeStyle(theme?: BrandTheme): CSSProperties | undefined {
  if (!theme) return undefined
  return Object.fromEntries(
    Object.entries(theme).map(([shade, value]) => [`--color-brand-${shade}`, value]),
  ) as CSSProperties
}
