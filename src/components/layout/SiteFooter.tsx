import { Link } from 'react-router-dom'
import { SITE_NAME } from '../../config/site'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/privacy', label: 'Privacy policy' },
  { to: '/affiliate-disclosure', label: 'Affiliate disclosure' },
]

export function SiteFooter({ className = '' }: { className?: string }) {
  return (
    <footer className={`border-t border-slate-200 pt-6 text-center text-xs text-slate-500 ${className}`}>
      <nav aria-label="Site" className="mb-2 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="font-medium hover:text-brand-700 hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
      <p>
        © {new Date().getFullYear()} {SITE_NAME}
      </p>
    </footer>
  )
}
