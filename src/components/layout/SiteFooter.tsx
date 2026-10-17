import { Link } from 'react-router-dom'
import { useLocale } from '../../i18n/context'

export function SiteFooter({ className = '' }: { className?: string }) {
  const { strings, href, siteName } = useLocale()
  const links = [
    { to: href('/'), label: strings.footerLinks.home },
    { to: href('/privacy-and-disclosure'), label: strings.footerLinks.privacyAndDisclosure },
  ]
  return (
    <footer className={`border-t border-slate-200 pt-6 text-center text-xs text-slate-500 ${className}`}>
      <nav aria-label={strings.footerNav} className="mb-2 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="font-medium hover:text-brand-700 hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
      <p>
        © {new Date().getFullYear()} {siteName}
      </p>
    </footer>
  )
}
