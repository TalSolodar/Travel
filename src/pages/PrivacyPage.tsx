import { Link } from 'react-router-dom'
import { StaticPageLayout } from '../components/layout/StaticPageLayout'
import { CONTACT_EMAIL, SITE_NAME } from '../config/site'

// Placeholder copy: review it (ideally with a professional) before relying on it.
export function PrivacyPage() {
  return (
    <StaticPageLayout title="Privacy Policy" intro="Last updated: October 2026">
      <p>This policy explains what information {SITE_NAME} collects when you visit the site, and how it is used.</p>

      <h2>Information we collect</h2>
      <p>
        We don't ask you to create an account or submit personal details. Like most websites, our hosting provider
        may log basic technical information such as your IP address, browser type and the pages you visit, for
        security and performance.
      </p>

      <h2>Cookies</h2>
      <p>Cookies are small files stored in your browser. This site and its partners may use them to:</p>
      <ul>
        <li>remember your preferences and keep the site working properly;</li>
        <li>measure how the site is used, so we can improve it;</li>
        <li>track bookings made through our affiliate links, so partners can credit us with a commission.</li>
      </ul>
      <p>You can block or delete cookies in your browser settings. Some features may not work as expected without them.</p>

      <h2>Affiliate links and partners</h2>
      <p>
        Some links on this site are affiliate links, provided through networks such as Travelpayouts and partners such
        as 12Go. When you click them, the partner's site may set cookies to record that you came from us. Their own
        privacy policies apply once you are on their sites. See our{' '}
        <Link to="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>

      <h2>Third-party services</h2>
      <p>
        We use third-party services to run the site, such as map tiles and web fonts. These services may receive your
        IP address when they load.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct or delete personal data about you.
        Contact us and we'll help.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </StaticPageLayout>
  )
}
