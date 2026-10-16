export const locales = ['en', 'he'] as const
export type Locale = (typeof locales)[number]

/** Used for x-default hreflang and for "/" and the old un-prefixed URLs. */
export const defaultLocale: Locale = 'en'

export const localeInfo: Record<Locale, { label: string; short: string; dir: 'ltr' | 'rtl' }> = {
  en: { label: 'English', short: 'EN', dir: 'ltr' },
  he: { label: 'עברית', short: 'עב', dir: 'rtl' },
}

export const isLocale = (value: string | undefined): value is Locale => locales.includes(value as Locale)

/** "/about" in Hebrew → "/he/about"; "/" → "/he". */
export const localePath = (locale: Locale, path: string) => `/${locale}${path === '/' ? '' : path}`

/** Splits "/he/vietnam/weather" into { locale: "he", rest: "/vietnam/weather" }. */
export function splitLocale(pathname: string): { locale: Locale | undefined; rest: string } {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const [, first, ...more] = clean.split('/')
  return isLocale(first) ? { locale: first, rest: '/' + more.join('/') } : { locale: undefined, rest: clean }
}
