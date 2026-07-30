import { ReactNode } from 'react'
import { ComputedEquivalent } from './equivalent'

export type Category = {
  id: number
  slug: string
  name: string
  sources?: { label: string; href: string }[]
  description?: ReactNode
  unit: string
  equivalents?: ComputedEquivalent[]
  more?: string
  examples?: string
  synonyms?: string[]
  tool?: string
  withNPS?: boolean
}
