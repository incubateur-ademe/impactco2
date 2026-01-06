import { Equivalent } from 'types/equivalent'
import { isUsageNumeriqueEquivalent } from 'utils/Equivalent/equivalent'

/**
 * Remove duplicate equivalents by `slug`.
 *
 * When multiple items share the same `slug`, prefer the more "complete" entry.
 * Current heuristic:
 * - Keep the first occurrence unless a later item is detected as a
 *   `UsageNumerique` equivalent (via `isUsageNumeriqueEquivalent`) while the
 *   existing one is not — in that case the later item replaces the previous.
 *
 * This keeps items with richer data (like `ecv`) where present while being
 * conservative for other categories.
 *
 * @param equivalents - Array of equivalents to deduplicate
 * @returns Array of equivalents deduplicated by `slug`
 */
export const dedupeEquivalents = (equivalents: Equivalent[]) => {
  type Item = (typeof equivalents)[number]

  const map = equivalents.reduce<Record<string, Item>>(
    (acc, item) => {
      const key = item.slug
      const existing = acc[key]
      if (!existing) {
        acc[key] = item
        return acc
      }

      if (isUsageNumeriqueEquivalent(item) && !isUsageNumeriqueEquivalent(existing)) {
        acc[key] = item
      }

      return acc
    },
    {} as Record<string, Item>
  )

  return Object.values(map)
}
