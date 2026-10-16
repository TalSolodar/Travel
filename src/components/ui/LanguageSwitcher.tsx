import { Link, useLocation } from 'react-router-dom'
import { useLocale } from '../../i18n/context'
import { localeInfo, localePath, locales, splitLocale } from '../../i18n/locales'
import { getPageMeta } from '../../lib/seo'
import { Icon } from './Icon'

/** Links to the current page in the other language(s), or that language's home page if there is no translation. */
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, strings } = useLocale()
  const { rest } = splitLocale(useLocation().pathname)

  return (
    <nav aria-label={strings.languageSwitcher} className="flex shrink-0 items-center gap-1">
      {locales
        .filter((l) => l !== locale)
        .map((l) => {
          const translated = localePath(l, rest)
          const to = getPageMeta(translated) ? translated : localePath(l, '/')
          return (
            <Link
              key={l}
              to={to}
              hrefLang={l}
              lang={l}
              className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-700 ${compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'}`}
            >
              <Icon name="globe" size={14} />
              {compact ? localeInfo[l].short : localeInfo[l].label}
            </Link>
          )
        })}
    </nav>
  )
}
