import { Link } from 'react-router-dom'
import { StaticPageLayout } from '../components/layout/StaticPageLayout'
import { CONTACT_EMAIL, SITE_NAME } from '../config/site'

// Placeholder copy: edit freely.
export function AffiliateDisclosurePage() {
  return (
    <StaticPageLayout title="Affiliate Disclosure" intro="Last updated: October 2026">
      <p>
        {SITE_NAME} is reader-supported. Some links on this site are <strong>affiliate links</strong>: if you click one
        and make a booking or purchase, we may earn a small commission.
      </p>

      <h2>It never costs you extra</h2>
      <p>
        The price you pay is the same whether you use our link or go to the site directly. Commissions help us keep the
        guides free and up to date.
      </p>

      <h2>Who we work with</h2>
      <p>
        We work with affiliate networks such as Travelpayouts and with travel partners such as 12Go (trains and buses),
        as well as hotel booking sites. Partners use cookies to track bookings made through our links. See our{' '}
        <Link to="/privacy">privacy policy</Link> for more on cookies.
      </p>

      <h2>Our recommendations are our own</h2>
      <p>
        We only recommend places and services we believe are genuinely useful. Partners don't pay for placement, and a
        commission never decides what we recommend.
      </p>

      <h2>Questions</h2>
      <p>
        Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </StaticPageLayout>
  )
}
