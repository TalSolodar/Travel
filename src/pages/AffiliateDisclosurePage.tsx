import { Link } from 'react-router-dom'
import { StaticPageLayout } from '../components/layout/StaticPageLayout'
import { CONTACT_EMAIL } from '../config/site'
import { useLocale } from '../i18n/context'

// Placeholder copy, one version per language: edit freely.
export function AffiliateDisclosurePage() {
  const { locale, href, siteName } = useLocale()
  const email = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>

  if (locale === 'he') {
    return (
      <StaticPageLayout title="גילוי נאות: קישורי שותפים" intro="עודכן לאחרונה: אוקטובר 2026">
        <p>
          ״{siteName}״ נתמך על ידי הקוראים. חלק מהקישורים באתר הם <strong>קישורי שותפים</strong>: אם תלחצו על אחד מהם
          ותבצעו הזמנה או רכישה, ייתכן שנקבל עמלה קטנה.
        </p>
        <h2>זה אף פעם לא עולה לכם יותר</h2>
        <p>המחיר שתשלמו זהה, בין אם תשתמשו בקישור שלנו ובין אם תגיעו לאתר ישירות. העמלות עוזרות לנו לשמור על המדריכים חינמיים ומעודכנים.</p>
        <h2>עם מי אנחנו עובדים</h2>
        <p>
          אנחנו עובדים עם רשתות שותפים כמו Travelpayouts ועם שותפים כמו 12Go (רכבות ואוטובוסים), וגם עם אתרי הזמנת
          מלונות. השותפים משתמשים בעוגיות כדי לעקוב אחרי הזמנות שבוצעו דרך הקישורים שלנו. פרטים נוספים ב
          <Link to={href('/privacy')}>מדיניות הפרטיות</Link>.
        </p>
        <h2>ההמלצות שלנו הן שלנו</h2>
        <p>אנחנו ממליצים רק על מקומות ושירותים שאנחנו מאמינים שבאמת שימושיים. שותפים לא משלמים על מקום, ועמלה אף פעם לא קובעת מה נמליץ.</p>
        <h2>שאלות</h2>
        <p>כתבו לנו: {email}</p>
      </StaticPageLayout>
    )
  }

  return (
    <StaticPageLayout title="Affiliate Disclosure" intro="Last updated: October 2026">
      <p>
        {siteName} is reader-supported. Some links on this site are <strong>affiliate links</strong>: if you click one
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
        <Link to={href('/privacy')}>privacy policy</Link> for more on cookies.
      </p>
      <h2>Our recommendations are our own</h2>
      <p>
        We only recommend places and services we believe are genuinely useful. Partners don't pay for placement, and a
        commission never decides what we recommend.
      </p>
      <h2>Questions</h2>
      <p>Email us at {email}.</p>
    </StaticPageLayout>
  )
}
