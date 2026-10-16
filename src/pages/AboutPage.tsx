import { Link } from 'react-router-dom'
import { StaticPageLayout } from '../components/layout/StaticPageLayout'
import { CONTACT_EMAIL, SITE_NAME } from '../config/site'

// Placeholder copy: edit freely.
export function AboutPage() {
  return (
    <StaticPageLayout title={`About ${SITE_NAME}`}>
      <p>
        {SITE_NAME} publishes practical, step-by-step travel guides. We focus on the questions that actually come up
        when planning a trip: when to go, what to sort out before you fly, how to get around and where to stay.
      </p>

      <h2>How we write our guides</h2>
      <p>
        Every guide is based on first-hand travel experience and research from official sources, such as government
        visa and immigration websites. Travel rules change often, so we always recommend checking official sources
        before you go.
      </p>

      <h2>How the site is funded</h2>
      <p>
        Some links on this site are affiliate links. If you book through them, we may earn a small commission at no
        extra cost to you. This never affects which places we recommend. Read our{' '}
        <Link to="/affiliate-disclosure">affiliate disclosure</Link> for details.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions, corrections or ideas? Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </StaticPageLayout>
  )
}
