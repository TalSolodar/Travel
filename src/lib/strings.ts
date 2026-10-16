import type { Rating } from '../types/guide'

/** All UI copy lives here so components stay content-agnostic. */
export const strings = {
  siteName: 'Travel Guides',
  siteTagline: 'Practical, step-by-step guides. No filters.',
  chooseGuide: 'Choose a destination',
  startGuide: 'Start the guide',
  stepsCount: (n: number) => `${n} steps`,
  stepLabel: (n: number) => `Step ${n}`,
  stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
  prev: 'Previous',
  next: 'Next',
  finishTitle: "You've finished the guide!",
  finishText: "Now you're ready. You can go back to any step from the menu.",
  backToStart: 'Back to the first step',
  allGuides: 'All guides',
  openSteps: 'All steps',
  close: 'Close',
  editorsPick: "Editor's pick",
  goldenTip: 'Golden tip',
  pros: 'Pros',
  cons: 'Cons',
  notFound: 'Page not found',
  backHome: 'Back to home',
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ratings: { good: 'Recommended', ok: 'Possible', bad: 'Less recommended' } satisfies Record<Rating, string>,
  climateRatings: { good: 'Recommended', ok: 'Possible', bad: 'Take care' } satisfies Record<Rating, string>,
  bestTime: 'Best time to visit',
  defaultDisclaimer: "We started with what matters most: the weather. Itineraries, hotels and getting around are coming soon. Stay tuned!"
}
