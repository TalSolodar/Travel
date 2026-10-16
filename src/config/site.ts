/**
 * Site-wide settings. SITE_URL feeds canonical URLs, Open Graph URLs, the sitemap and robots.txt.
 * Override it with the SITE_URL environment variable at build time (e.g. in Vercel's project settings).
 */
export const SITE_URL = (import.meta.env.SITE_URL || 'https://travel-tau-three-57.vercel.app').replace(/\/+$/, '')

export const SITE_NAME = 'Travel Guides'

/** Shown on the About and Privacy pages. */
export const CONTACT_EMAIL = 'hello@example.com'
