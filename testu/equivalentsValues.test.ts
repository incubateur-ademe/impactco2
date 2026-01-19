import { EquivalentValue } from 'types/equivalent'
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

  it('Duplicate slugs across categories have identical computed values', () => {
    const bySlug = new Map<string, number[]>()
    for (const { slug, valueKg } of allComputed) {
      const list = bySlug.get(slug) || []
      list.push(valueKg)
      bySlug.set(slug, list)
    }

    const diffs: { slug: string; values: number[] }[] = []

    for (const [slug, valuesKg] of bySlug.entries()) {
      if (valuesKg.length <= 1) {
        continue
      }
      const first = valuesKg[0]
      for (let i = 1; i < valuesKg.length; i++) {
        if (!isClose(valuesKg[i], first)) {
          diffs.push({ slug, values: valuesKg })
          break
        }
      }
    }

    if (diffs.length) {
      const msg = diffs.map((d) => `${d.slug}: ${d.values.join(' vs ')}`).join('; ')
      throw new Error(`Duplicate slug(s) with differing values: ${msg}`)
    }

    expect(true).toBe(true)
  })

  it('Duplicate slugs across categories have identical ECV', () => {
    const bySlug = new Map<string, EquivalentValue[][]>()
    for (const { slug, ecv } of allComputed) {
      const list = bySlug.get(slug) || []
      list.push(ecv)
      bySlug.set(slug, list)
    }

    const diffs: { slug: string; values: EquivalentValue[][] }[] = []

    for (const [slug, ecvs] of bySlug.entries()) {
      if (ecvs.length <= 1) {
        continue
      }
      const first = ecvs[0]
      for (let i = 1; i < ecvs.length; i++) {
        const ecv = ecvs[i]
        if (ecv.length !== first.length) {
          diffs.push({ slug, values: ecvs })
          break
        }
        if (
          ecv.filter((value) =>
            first.find((firstValue) => firstValue.id === value.id && isClose(firstValue.value, value.value))
          ).length !== ecv.length
        ) {
          diffs.push({ slug, values: ecvs })
          break
        }
      }
    }

    if (diffs.length) {
      const msg = diffs
        .map((d) => `${d.slug}: ${d.values.map((value) => JSON.stringify(value)).join(' vs ')}`)
        .join('\n')
      throw new Error(`Duplicate slug(s) with differing values: ${msg}`)
    }

    expect(true).toBe(true)
  })
})
