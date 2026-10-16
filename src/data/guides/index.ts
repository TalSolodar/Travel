import type { Locale } from '../../i18n/locales'
import type { Guide } from '../../types/guide'
import { vietnam as vietnamEn } from './en/vietnam'
import { vietnam as vietnamHe } from './he/vietnam'

/**
 * Register every guide here, per language. Each language has its own data files, so the content can differ
 * (e.g. Israel-specific info in Hebrew). Use the same slug and step ids across languages for pages that are
 * translations of each other; that is what links them with hreflang and the language switcher.
 * Order controls the home page.
 */
const allGuides: Record<Locale, Guide[]> = {
  en: [vietnamEn],
  he: [vietnamHe],
}

/** Hidden steps (`display: false`) are dropped here, so the rest of the app never sees them. */
function visibleSteps(guide: Guide): Guide {
  return { ...guide, steps: guide.steps.filter((step) => step.display !== false) }
}

const visible = Object.fromEntries(
  Object.entries(allGuides).map(([locale, guides]) => [locale, guides.map(visibleSteps)]),
) as Record<Locale, Guide[]>

export const getGuides = (locale: Locale): Guide[] => visible[locale]

export function getGuide(locale: Locale, slug: string | undefined): Guide | undefined {
  return visible[locale].find((g) => g.slug === slug)
}
