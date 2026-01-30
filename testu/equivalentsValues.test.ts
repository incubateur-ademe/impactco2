import { categories } from 'data/categories'
import values from 'utils/Equivalent/values.json'

const allValues = values as Record<string, { value: number; category: number }>
const isClose = (a: number, b: number) => Math.abs(a - b) <= 1e-5

const allComputed = categories.flatMap((cat) =>
  (cat.equivalents || []).map((eq) => ({
    slug: eq.slug,
    valueKg: eq.value,
    categoryId: eq.category,
    ecv: 'ecv' in eq && eq.ecv ? eq.ecv : [],
  }))
)

describe('Equivalents vs values.json', () => {
  it('Categories have unique slugs', () => {
    const seen = new Set<string>()
    const duplicates = new Set<string>()

    for (const { slug } of categories) {
      if (seen.has(slug)) {
        duplicates.add(slug)
      } else {
        seen.add(slug)
      }
    }

    if (duplicates.size) {
      throw new Error(`Duplicate category slugs: ${Array.from(duplicates).join(', ')}`)
    }

    expect(true).toBe(true)
  })

  it('Equivalent slugs are unique', () => {
    const seen = new Set<string>()
    const duplicates = new Set<string>()

    for (const { slug } of allComputed) {
      if (seen.has(slug)) {
        duplicates.add(slug)
      } else {
        seen.add(slug)
      }
    }

    if (duplicates.size) {
      throw new Error(`Duplicate equivalent slugs: ${Array.from(duplicates).join(', ')}`)
    }

    expect(true).toBe(true)
  })

  it('Every category equivalent slug exists in values.json with correct total', () => {
    const missing: string[] = []
    const mismatched: { slug: string; expectedGrams: number; got?: number }[] = []
    const wrongCategory: { slug: string; expectedCategory: number; got?: number }[] = []

    for (const { slug, valueKg, categoryId } of allComputed) {
      const value = allValues[slug]
      if (!value) {
        missing.push(slug)
        continue
      }
      if (value.category !== categoryId) {
        wrongCategory.push({ slug, expectedCategory: categoryId, got: value.category })
      }
      const expectedGrams = valueKg * 1000
      if (!isClose(value.value, expectedGrams)) {
        mismatched.push({ slug, expectedGrams, got: value.value })
      }
    }

    if (missing.length || mismatched.length || wrongCategory.length) {
      const details = [
        missing.length ? `Missing in values.json: ${missing.join(', ')}` : undefined,
        mismatched.length
          ? `Mismatched values (grams): ${mismatched
              .map((m) => `${m.slug} expected=${m.expectedGrams} got=${m.got}`)
              .join('; ')}`
          : undefined,
        wrongCategory.length
          ? `Wrong categories: ${wrongCategory
              .map((w) => `${w.slug} expected=${w.expectedCategory} got=${w.got}`)
              .join('; ')}`
          : undefined,
      ]
        .filter(Boolean)
        .join('\n')

      throw new Error(details)
    }

    expect(true).toBe(true)
  })
})
