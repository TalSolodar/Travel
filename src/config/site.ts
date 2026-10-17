import type { Locale } from '../i18n/locales'

/**
 * Site-wide settings. SITE_URL feeds canonical URLs, Open Graph URLs, the sitemap and robots.txt.
 * Override it with the SITE_URL environment variable at build time (e.g. in Vercel's project settings).
 */
export const SITE_URL = (import.meta.env.SITE_URL || 'https://travel-tau-three-57.vercel.app').replace(/\/+$/, '')

/** The brand name, per language. Used in titles, og:site_name, the header, the footer and the text pages. */
export const SITE_NAME: Record<Locale, string> = {
  en: 'No Hassle Travel',
  he: 'לטייל, בתכלס',
}

/** Shown on the Privacy and Affiliate Disclosure pages. */
export const CONTACT_EMAIL = 'hello@example.com'
