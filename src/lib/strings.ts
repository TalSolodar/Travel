import type { Rating } from '../types/guide'

/** All UI copy lives here so components stay content-agnostic. */
export const strings = {
  siteName: 'מדריכי מסע',
  siteTagline: 'מדריכים מעשיים, צעד אחר צעד, בלי פילטרים.',
  chooseGuide: 'בחרו יעד',
  startGuide: 'מתחילים במסלול',
  stepsCount: (n: number) => `${n} תחנות`,
  stepLabel: (n: number) => `תחנה ${n}`,
  stepOf: (n: number, total: number) => `תחנה ${n} מתוך ${total}`,
  prev: 'הקודם',
  next: 'הבא',
  finishTitle: 'סיימתם את המסלול!',
  finishText: 'עכשיו אתם מוכנים. אפשר לחזור לכל תחנה מהתפריט.',
  backToStart: 'חזרה לתחנה הראשונה',
  allGuides: 'כל המדריכים',
  openSteps: 'כל התחנות',
  close: 'סגירה',
  editorsPick: 'בחירת העורכת',
  goldenTip: 'טיפ זהב',
  pros: 'יתרונות',
  cons: 'חסרונות',
  notFound: 'העמוד לא נמצא',
  backHome: 'חזרה לעמוד הבית',
  months: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
  ratings: { good: 'מומלץ', ok: 'אפשרי', bad: 'פחות מומלץ' } satisfies Record<Rating, string>,
  climateRatings: { good: 'מומלץ', ok: 'אפשרי', bad: 'להיזהר' } satisfies Record<Rating, string>,
  bestTime: 'הזמן הכי טוב לבקר',
  defaultDisclaimer: 'התחלנו עם הכי חשוב – מזג האוויר. מסלולים, מלונות ודרכי הגעה יעלו בקרוב. יש למה לחכות!'
}
