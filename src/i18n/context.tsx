import { createContext, useContext } from 'react'
import { uiStrings } from '../lib/strings'
import { defaultLocale, localeInfo, localePath, type Locale } from './locales'

const LocaleContext = createContext<Locale>(defaultLocale)

export const LocaleProvider = LocaleContext.Provider

/** The current page's language, its direction, its UI strings and a helper for locale-prefixed links. */
export function useLocale() {
  const locale = useContext(LocaleContext)
  return {
    locale,
    dir: localeInfo[locale].dir,
    strings: uiStrings[locale],
    href: (path: string) => localePath(locale, path),
  }
}

export const useStrings = () => uiStrings[useContext(LocaleContext)]
