import { StaticPageLayout } from '../components/layout/StaticPageLayout'
import { useLocale } from '../i18n/context'

// Privacy & transparency page, one version per language.
// Keep "Third-party services" in sync with what the site actually loads: today OpenFreeMap map tiles
// (map block) and Unsplash images (guide cover photos). Affiliate links (klook.tpx.li) load nothing until clicked.
export function PrivacyAndDisclosurePage() {
  const { locale } = useLocale()

  if (locale === 'he') {
    return (
      <StaticPageLayout title="פרטיות ושקיפות" intro="עודכן לאחרונה: אוקטובר 2026">
        <h2 id="affiliate-disclosure">איך האתר מתממן</h2>
        <p>
          האתר חינמי, והוא מתממן מקישורי שותפים. אם תלחצו על קישור כזה ותזמינו, נקבל עמלה קטנה. אתם לא משלמים שקל
          יותר: המחיר זהה, בין אם תזמינו דרכנו ובין אם תגיעו לאתר ישירות.
        </p>
        <p>
          אנחנו עובדים עם רשת השותפים Travelpayouts, ובינתיים השותף היחיד שלנו הוא Klook. שותפים לא משלמים כדי להופיע
          באתר, ועמלה לא קובעת מה נמליץ.
        </p>

        <h2>המידע באתר</h2>
        <p>
          המידע באתר כללי ומבוסס על הניסיון והבדיקה שלנו. הוא לא מהווה ייעוץ רפואי, משפטי או מקצועי. חוקים, מחירים
          ודרישות כניסה משתנים, אז תמיד בדקו מול המקורות הרשמיים לפני הטיסה.
        </p>

        <h2 id="privacy">פרטיות</h2>
        <p>
          <strong>מידע שאנחנו אוספים:</strong> אנחנו לא מבקשים לפתוח חשבון או למסור פרטים אישיים. ספק האחסון שלנו,
          Vercel, עשוי לתעד מידע טכני בסיסי כמו כתובת IP וסוג הדפדפן, לצורכי אבטחה וביצועים.
        </p>
        <p id="cookies">
          <strong>עוגיות:</strong> האתר עצמו לא משתמש בעוגיות. כשלוחצים על קישור שותפים, האתר של השותף עשוי לשמור עוגייה
          שמתעדת שהגעתם מאיתנו. מרגע שאתם באתר של שותף, חלה מדיניות הפרטיות שלו. אפשר לחסום או למחוק עוגיות בהגדרות
          הדפדפן.
        </p>
        <p>
          <strong>שירותי צד שלישי:</strong> עמוד מזג האוויר טוען מפה מ-OpenFreeMap, וחלק מהעמודים טוענים תמונות
          מ-Unsplash. השירותים האלה עשויים לקבל את כתובת ה-IP שלכם
          כשהם נטענים.
        </p>
        <p>
          <strong>הזכויות שלכם:</strong> בהתאם למקום מגוריכם, ייתכן שיש לכם זכות לעיין במידע עליכם, לתקן אותו או למחוק
          אותו.
        </p>
        <p>
          <strong>שינויים:</strong> אנחנו עשויים לעדכן את הדף הזה מדי פעם. התאריך למעלה מציין את העדכון האחרון.
        </p>
      </StaticPageLayout>
    )
  }

  return (
    <StaticPageLayout title="Privacy & Transparency" intro="Last updated: October 2026">
      <h2 id="affiliate-disclosure">How this site is funded</h2>
      <p>
        This site is free, and it's funded by affiliate links. If you click one and make a booking, we earn a small
        commission. You don't pay a cent more: the price is the same whether you book through us or go to the site
        directly.
      </p>
      <p>
        We work with the Travelpayouts affiliate network, and for now our only partner is Klook. Partners don't pay to be
        featured, and commissions don't decide what we recommend.
      </p>

      <h2>About the information here</h2>
      <p>
        The information on this site is general and based on our own experience and research. It isn't medical, legal or
        professional advice. Rules, prices and entry requirements change, so always check official sources before you
        travel.
      </p>

      <h2 id="privacy">Privacy</h2>
      <p>
        <strong>What we collect:</strong> We don't ask you to create an account or share personal details. Our hosting
        provider, Vercel, may log basic technical data such as your IP address and browser type for security and
        performance.
      </p>
      <p id="cookies">
        <strong>Cookies:</strong> This site doesn't use cookies itself. When you click an affiliate link, the partner's
        site may set a cookie to record that you came from us. Once you're on a partner's site, their privacy policy
        applies. You can block or delete cookies in your browser settings.
      </p>
      <p>
        <strong>Third-party services:</strong> The weather page loads a map from OpenFreeMap, and some pages load images
        from Unsplash. These services may receive
        your IP address when they load.
      </p>
      <p>
        <strong>Your rights:</strong> Depending on where you live, you may have the right to access, correct or delete
        data about you.
      </p>
      <p>
        <strong>Changes:</strong> We may update this page from time to time. The date at the top shows the latest update.
      </p>
    </StaticPageLayout>
  )
}
