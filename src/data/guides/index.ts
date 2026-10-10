import type { Guide } from '../../types/guide'
import { vietnam } from './vietnam'

/** Hidden steps (`display: false`) are dropped here, so the rest of the app never sees them. */
function visibleSteps(guide: Guide): Guide {
  return { ...guide, steps: guide.steps.filter((step) => step.display !== false) }
}

/** Register every guide here. Order controls the home page. */
export const guides: Guide[] = [vietnam].map(visibleSteps)

/** With a single guide the site opens straight into it and hides the guide picker. */
export const hasGuidePicker = guides.length > 1

export function getGuide(slug: string | undefined): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}
