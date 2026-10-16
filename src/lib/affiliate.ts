import type { LinkAction } from '../types/guide'

/**
 * A link counts as an affiliate link unless it is marked `sponsored: false` or points inside the site.
 * "#" placeholders count too: they are affiliate links waiting for their real URL.
 */
export const isAffiliateLink = (link: LinkAction) =>
  link.sponsored !== false && !link.href.startsWith('/') && !link.href.startsWith('mailto:')

/** Whether any link anywhere in the given content (blocks, nested timeline details, ...) is an affiliate link. */
export function containsAffiliateLinks(content: unknown): boolean {
  if (Array.isArray(content)) return content.some(containsAffiliateLinks)
  if (!content || typeof content !== 'object') return false
  const obj = content as Record<string, unknown>
  if (typeof obj.href === 'string' && typeof obj.label === 'string') return isAffiliateLink(obj as unknown as LinkAction)
  return Object.values(obj).some(containsAffiliateLinks)
}
