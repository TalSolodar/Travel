import type { Locale } from '../i18n/locales'
import type { Rating } from '../types/guide'

/** All UI copy, per language, so components stay content-agnostic. The site name lives in config/site.ts. */
export interface UiStrings {
  /** The home page H1, also used as its search title. Built from the registered countries, e.g. ["Vietnam", "Taiwan"]. */
  homeHeading: (countries: string[]) => string
  /** The home page's search description, built from the registered countries. */
  homeDescription: (countries: string[]) => string
  siteTagline: string
  readGuide: string
  /** Small link from a country's section on the home page to its hub page. */
  countryHubLink: (country: string) => string
  stepLabel: (n: number) => string
  stepOf: (n: number, total: number) => string
  prev: string
  next: string
  stepNavigation: string
  finishTitle: string
  finishText: string
  backToStart: string
  allGuides: string
  openSteps: string
  close: string
  editorsPick: string
  goldenTip: string
  backToTimeline: string
  pros: string
  cons: string
  stars: (n: number) => string
  notFound: string
  backHome: string
  months: string[]
  ratings: Record<Rating, string>
  climateRatings: Record<Rating, string>
  bestTime: string
  defaultDisclaimer: string
  footerNav: string
  footerLinks: { home: string; privacyAndDisclosure: string }
  affiliateNote: string
  affiliateNoteLink: string
}

/** Uses the specific title while it fits in ~60 characters (search results cut longer ones), else the generic one. */
const fitTitle = (specific: string, generic: string) => (specific.length <= 60 ? specific : generic)

/** "Vietnam", "Vietnam and Taiwan", "Vietnam, Taiwan and Thailand". */
const listEn = (items: string[]) =>
  items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`

/** "לויאטנם", "לויאטנם ולטייוואן", "לויאטנם, לטייוואן ולתאילנד". */
const listHeTo = (items: string[]) => {
  const to = items.map((c) => `ל${c}`)
  return to.length <= 1 ? (to[0] ?? '') : `${to.slice(0, -1).join(', ')} ו${to[to.length - 1]}`
}

export const uiStrings: Record<Locale, UiStrings> = {
  en: {
    homeHeading: (countries) => fitTitle(`${listEn(countries)} Travel Guides: Practical Tips, Step by Step`, 'Practical Travel Guides, Step by Step'),
    homeDescription: (countries) =>
      `Plan your trip to ${listEn(countries)} with practical, step-by-step travel guides: when to go, what to sort out before you fly, and more.`,
    siteTagline: 'Practical, step-by-step guides. No filters.',
    readGuide: 'Read this guide',
    countryHubLink: (country) => `All ${country} guides`,
    stepLabel: (n) => `Step ${n}`,
    stepOf: (n, total) => `Step ${n} of ${total}`,
    prev: 'Previous',
    next: 'Next',
    stepNavigation: 'Step navigation',
    finishTitle: "You've finished the guide!",
    finishText: "Now you're ready. You can go back to any step from the menu.",
    backToStart: 'Back to the first step',
    allGuides: 'All guides',
    openSteps: 'All steps',
    close: 'Close',
    editorsPick: "Editor's pick",
    goldenTip: 'Golden tip',
    backToTimeline: 'Back to timeline',
    pros: 'Pros',
    cons: 'Cons',
    stars: (n) => `${n} stars`,
    notFound: 'Page not found',
    backHome: 'Back to home',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ratings: { good: 'Recommended', ok: 'Possible', bad: 'Less recommended' },
    climateRatings: { good: 'Recommended', ok: 'Possible', bad: 'Take care' },
    bestTime: 'Best time to visit',
    defaultDisclaimer:
      'We started with what matters most: the weather. Itineraries, hotels and getting around are coming soon. Stay tuned!',
    footerNav: 'Site',
    footerLinks: { home: 'Home', privacyAndDisclosure: 'Privacy & transparency' },
    affiliateNote:
      'Some links on this page are affiliate links. If you book through them, we may earn a small commission at no extra cost to you.',
    affiliateNoteLink: 'Privacy & transparency',
  },
  he: {
    homeHeading: (countries) => fitTitle(`מדריכי טיול ${listHeTo(countries)}: טיפים מעשיים, צעד אחר צעד`, 'מדריכי טיול מעשיים, צעד אחר צעד'),
    homeDescription: (countries) =>
      `מתכננים טיול ${listHeTo(countries)}? מדריכי טיול מעשיים, צעד אחר צעד: מתי לטוס, מה לסדר לפני הטיסה ועוד.`,
    siteTagline: 'מדריכים מעשיים, צעד אחר צעד, בתכלס.',
    readGuide: 'למדריך המלא',
    countryHubLink: (country) => `כל המדריכים ל${country}`,
    stepLabel: (n) => `תחנה ${n}`,
    stepOf: (n, total) => `תחנה ${n} מתוך ${total}`,
    prev: 'הקודם',
    next: 'הבא',
    stepNavigation: 'ניווט בין תחנות',
    finishTitle: 'סיימתם את המסלול!',
    finishText: 'עכשיו אתם מוכנים. אפשר לחזור לכל תחנה מהתפריט.',
    backToStart: 'חזרה לתחנה הראשונה',
    allGuides: 'כל המדריכים',
    openSteps: 'כל התחנות',
    close: 'סגירה',
    editorsPick: 'בחירת העורכת',
    goldenTip: 'טיפ זהב',
    backToTimeline: 'חזרה לציר הזמן',
    pros: 'יתרונות',
    cons: 'חסרונות',
    stars: (n) => `${n} כוכבים`,
    notFound: 'העמוד לא נמצא',
    backHome: 'חזרה לעמוד הבית',
    months: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
    ratings: { good: 'מומלץ', ok: 'אפשרי', bad: 'פחות מומלץ' },
    climateRatings: { good: 'מומלץ', ok: 'אפשרי', bad: 'להיזהר' },
    bestTime: 'הזמן הכי טוב לבקר',
    defaultDisclaimer: 'התחלנו עם הכי חשוב: מזג האוויר והכנות לטיסה. מסלולים, מלונות ודרכי הגעה יעלו בקרוב. יש למה לחכות!',
    footerNav: 'האתר',
    footerLinks: { home: 'דף הבית', privacyAndDisclosure: 'פרטיות ושקיפות' },
    affiliateNote:
      'חלק מהקישורים בעמוד הם קישורי שותפים. אם תזמינו דרכם, ייתכן שנקבל עמלה קטנה, בלי שום עלות נוספת עבורכם.',
    affiliateNoteLink: 'פרטיות ושקיפות',
  },
}
