import { Link } from 'react-router-dom'
import { SITE_NAME } from '../../config/site'
import { useLocale } from '../../i18n/context'
import { Icon } from '../ui/Icon'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

/** Top bar for the home, hub and text pages: brand link and language switcher. */
export function SiteHeader() {
  const { href } = useLocale()
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link to={href('/')} className="inline-flex items-center gap-2 font-extrabold text-slate-900 hover:text-brand-700">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Icon name="compass" size={16} />
          </span>
          {SITE_NAME}
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
