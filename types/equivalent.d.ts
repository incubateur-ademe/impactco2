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
  usage?: {
    peryear: number
    defaultyears: number
  }
  end?: number
  multiplier?: number
  total?: number
  ecv?: { value: number; id: number; name?: string }[]
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
}
