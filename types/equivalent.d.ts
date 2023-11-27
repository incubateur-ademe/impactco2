export type EquivalentValue = { value: number; id: number }

export type Equivalent = {
  id?: string | number
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
  type?: string
  carpool?: boolean
  display?: {
    min?: number
    max?: number
  }
  ecvs?: {
    max: number
    subtitle: string
    ecv: { value: number; id: number; name?: string }[]
  }[]
  secondEmoji?: string
  Code_CIQUAL?: number
  ecv?: EquivalentValue[]
}
