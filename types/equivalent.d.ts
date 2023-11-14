export type Equivalent = {
  id: string
  name: string
  prefix?: string
  subtitle?: string
  synonyms?: string[]
  slug: string
  emoji: string
  category: number
  default: boolean
  tile: boolean
  source?: string
  meta: {
    title: string
    description: string
  }
  total?: number
  ecv?: { value: number; id: number; name?: string }[]
}
