import { ComputedEquivalent } from './equivalent'

export type Category = {
  id: number
  slug: string
  name: string
  sources?: { label: string; href: string }[]
  description?: string
  unit: string
  equivalents?: ComputedEquivalent[]
  resetable?: boolean
  more?: string
  examples?: string
  synonyms?: string[]
  tool?: string
}
