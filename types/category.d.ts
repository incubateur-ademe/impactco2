import { ComputedEquivalent } from './equivalent'

export type Category = {
  id: number
  name: string
  slug: string
  title?: string
  header: string
  sources?: { label: string; href: string }[]
  description?: string
  gender: string
  unit: string
  list?: boolean
  meta: {
    title: string
    description: string
  }
  equivalents?: ComputedEquivalent[]
}
