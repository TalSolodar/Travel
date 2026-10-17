import { StaticPageLayout } from '../components/layout/StaticPageLayout'
import { CONTACT_EMAIL } from '../config/site'
import { useLocale } from '../i18n/context'

// Placeholder copy, one version per language: review it (ideally with a professional) before relying on it.
// The affiliate disclosure comes first; cookies (including affiliate tracking) are explained once, under Cookies.
export function PrivacyAndDisclosurePage() {
  const { locale, siteName } = useLocale()
  const email = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>

  if (locale === 'he') {
    return (
      <StaticPageLayout title="פרטיות וגילוי נאות" intro="עודכן לאחרונה: אוקטובר 2026">
        <h2 id="affiliate-disclosure">גילוי נאות: קישורי שותפים</h2>
        <p>
          ״{siteName}״ נתמך על ידי הקוראים. חלק מהקישורים באתר הם <strong>קישורי שותפים</strong>: אם תלחצו על אחד מהם
          ותבצעו הזמנה, ייתכן שנקבל עמלה קטנה. <strong>זה אף פעם לא עולה לכם יותר</strong>: המחיר זהה, בין אם תשתמשו
          בקישור שלנו ובין אם תגיעו לאתר ישירות.
        </p>
        <p>
          אנחנו עובדים עם רשת השותפים Travelpayouts, והשותף היחיד שלנו כרגע הוא Klook. שותפים
          לא משלמים על מקום, ועמלה אף פעם לא קובעת מה נמליץ. איך השותפים עוקבים אחרי הזמנות מוסבר ב
          <a href="#cookies">עוגיות</a>.
        </p>

        <h2 id="privacy">מדיניות פרטיות</h2>
        <p>החלק הזה מסביר איזה מידע ״{siteName}״ אוסף כשאתם גולשים באתר, ואיך משתמשים בו.</p>
        <h3>מידע שאנחנו אוספים</h3>
        <p>
          אנחנו לא מבקשים לפתוח חשבון או למסור פרטים אישיים. כמו ברוב האתרים, ספק האחסון שלנו עשוי לתעד מידע טכני בסיסי
          כמו כתובת IP, סוג הדפדפן והעמודים שבהם ביקרתם, לצורכי אבטחה וביצועים.
        </p>
        <h3 id="cookies">עוגיות (Cookies)</h3>
        <p>עוגיות הן קבצים קטנים שנשמרים בדפדפן. האתר והשותפים שלו עשויים להשתמש בהן כדי:</p>
        <ul>
          <li>לזכור העדפות ולשמור על פעילות תקינה של האתר;</li>
          <li>למדוד איך משתמשים באתר, כדי שנוכל לשפר אותו;</li>
          <li>
            לעקוב אחרי הזמנות שבוצעו דרך קישורי השותפים שלנו: כשלוחצים על קישור כזה, האתר של השותף עשוי לשמור עוגייה
            שמתעדת שהגעתם מאיתנו, כדי לזכות אותנו בעמלה.
          </li>
        </ul>
        <p>
          אפשר לחסום או למחוק עוגיות בהגדרות הדפדפן. ייתכן שחלק מהאפשרויות באתר לא יעבדו כמצופה בלעדיהן. מרגע שאתם באתר
          של שותף, חלה מדיניות הפרטיות שלו.
        </p>
        <h3>שירותי צד שלישי</h3>
        <p>אנחנו משתמשים בשירותי צד שלישי כדי להפעיל את האתר, כמו מפות וגופנים. השירותים האלה עשויים לקבל את כתובת ה-IP שלכם.</p>
        <h3>הזכויות שלכם</h3>
        <p>בהתאם למקום מגוריכם, ייתכן שיש לכם זכות לעיין במידע עליכם, לתקן אותו או למחוק אותו. פנו אלינו ונשמח לעזור.</p>

        <h2>יצירת קשר</h2>
        <p>שאלות על קישורי השותפים או על הפרטיות? כתבו לנו: {email}</p>
      </StaticPageLayout>
    )
  }

  return (
    <StaticPageLayout title="Privacy & Affiliate Disclosure" intro="Last updated: October 2026">
      <h2 id="affiliate-disclosure">Affiliate disclosure</h2>
      <p>
        {siteName} is reader-supported. Some links on this site are <strong>affiliate links</strong>: if you click one and
        make a booking, we may earn a small commission. <strong>It never costs you extra</strong>: the price is the same
        whether you use our link or go to the site directly.
      </p>
      <p>
        We work with the affiliate network Travelpayouts, and our only partner right now is Klook. Partners don't pay for
        placement, and a commission never decides what we recommend. How partners track
        bookings is explained under <a href="#cookies">Cookies</a>.
      </p>

      <h2 id="privacy">Privacy policy</h2>
      <p>This section explains what information {siteName} collects when you visit the site, and how it is used.</p>
      <h3>Information we collect</h3>
      <p>
        We don't ask you to create an account or submit personal details. Like most websites, our hosting provider may log
        basic technical information such as your IP address, browser type and the pages you visit, for security and
        performance.
      </p>
      <h3 id="cookies">Cookies</h3>
      <p>Cookies are small files stored in your browser. This site and its partners may use them to:</p>
      <ul>
        <li>remember your preferences and keep the site working properly;</li>
        <li>measure how the site is used, so we can improve it;</li>
        <li>
          track bookings made through our affiliate links: when you click one, the partner's site may set a cookie
          recording that you came from us, so it can credit us with a commission.
        </li>
      </ul>
      <p>
        You can block or delete cookies in your browser settings. Some features may not work as expected without them.
        Once you are on a partner's site, their own privacy policy applies.
      </p>
      <h3>Third-party services</h3>
      <p>
        We use third-party services to run the site, such as map tiles and web fonts. These services may receive your IP
        address when they load.
      </p>
      <h3>Your rights</h3>
      <p>
        Depending on where you live, you may have the right to access, correct or delete personal data about you. Contact
        us and we'll help.
      </p>

      <h2>Contact us</h2>
      <p>Questions about affiliate links or privacy? Email {email}.</p>
    </StaticPageLayout>
  )
}
