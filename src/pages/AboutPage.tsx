import { Link } from 'react-router-dom'
import { StaticPageLayout } from '../components/layout/StaticPageLayout'
import { CONTACT_EMAIL } from '../config/site'
import { useLocale } from '../i18n/context'

// Placeholder copy, one version per language: edit freely.
export function AboutPage() {
  const { locale, href, siteName } = useLocale()
  const email = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>

  if (locale === 'he') {
    return (
      <StaticPageLayout title={`אודות ״${siteName}״`}>
        <p>
          ״{siteName}״ מפרסם מדריכי טיול מעשיים, צעד אחר צעד. אנחנו מתמקדים בשאלות שבאמת עולות כשמתכננים טיול: מתי
          לטוס, מה לסדר לפני הטיסה, איך להתנייד ואיפה לישון.
        </p>
        <h2>איך אנחנו כותבים את המדריכים</h2>
        <p>
          כל מדריך מבוסס על ניסיון אישי מהשטח ועל מקורות רשמיים, כמו אתרי הוויזה וההגירה של הממשלות. הכללים משתנים
          לעיתים קרובות, ולכן תמיד כדאי לבדוק במקורות הרשמיים לפני הנסיעה.
        </p>
        <h2>איך האתר ממומן</h2>
        <p>
          חלק מהקישורים באתר הם קישורי שותפים. אם תזמינו דרכם, ייתכן שנקבל עמלה קטנה, בלי שום עלות נוספת עבורכם. זה
          אף פעם לא משפיע על ההמלצות שלנו. פרטים נוספים ב<Link to={href('/affiliate-disclosure')}>גילוי הנאות</Link>.
        </p>
        <h2>צרו קשר</h2>
        <p>שאלות, תיקונים או רעיונות? כתבו לנו: {email}</p>
      </StaticPageLayout>
    )
  }

  return (
    <StaticPageLayout title={`About ${siteName}`}>
      <p>
        {siteName} publishes practical, step-by-step travel guides. We focus on the questions that actually come up
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
        <Link to={href('/affiliate-disclosure')}>affiliate disclosure</Link> for details.
      </p>
      <h2>Contact us</h2>
      <p>Questions, corrections or ideas? Email us at {email}.</p>
    </StaticPageLayout>
  )
}
