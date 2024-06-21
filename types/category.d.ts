import { ComputedEquivalent } from './equivalent'

export type Category = {
  id: number
  name: string
  slug: string
  sources?: { label: string; href: string }[]
  description?: string
  unit: string
  meta: {
    title: string
    description: string
  }
  equivalents?: ComputedEquivalent[]
  resetable?: boolean
  more?: string
  examples?: string
}
