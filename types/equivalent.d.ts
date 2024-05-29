type BaseEquivalent = {
  id?: string | number
  name: string
  slug: string
  category: number
  default?: boolean
  include?: { pre: string; post?: string; postNewLine?: string }
  source?: string
  prefix?: string
  suffix?: string
  subtitle?: string
  synonyms?: string[]
  carpool?: number
  percentage?: boolean
  unit?: string
  data?: {
    hypothesis?: string
    values: {
      title: string
      withSource?:
        | boolean
        | {
            label: string
            href: string
          }
      value: string
    }[]
  }
}

type BaseEquivalentValue =
  | {
      total: number
    }
  | { ecv: EquivalentValue[] }

export type ChauffageEquivalent = BaseEquivalent & {
  total: number
}

export type RepasEquivalent = BaseEquivalent & {
  total: number
}

export type UsageNumeriqueEquivalent = BaseEquivalent & {
  ecv: EquivalentValue[]
}

export type DeplacementType = 'car' | 'foot' | 'rail' | 'plane'
export type DeplacementEquivalent = BaseEquivalent & {
  id: number
  type: string
  total?: number
  ecv?: EquivalentValue[]
  ecvs?: {
    display?: {
      min?: number
      max?: number
    }
    subtitle: string
    ecv: EquivalentValue[]
  }[]
  display?: {
    min?: number
    max?: number
  }
}

export type BoissonEquivalent = BaseEquivalent &
  (
    | {
        Code_CIQUAL: number
        Code_AGB?: string
        ecv: EquivalentValue[]
      }
    | {
        total: number
      }
  )

export type FruitsEtLegumesEquivalent = BoissonEquivalent & {
  months: number[]
}

export type UsableEquivalent = BaseEquivalent & { ids?: number[] } & (
    | {
        ecv: EquivalentValue[]
        usage?: {
          peryear: number
          defaultyears: number
        }
        end?: number
      }
    | { total: number }
  )
export type EquivalentValue = { value: number; id: number }

export type Equivalent =
  | BoissonEquivalent
  | ChauffageEquivalent
  | DeplacementEquivalent
  | UsableEquivalent
  | RepasEquivalent
  | UsageNumeriqueEquivalent
  | FruitsEtLegumesEquivalent

export type ComputedEquivalent = Equivalent & { value: number; link: string }

export type Language = 'en' | 'fr' | 'de' | 'es'
export type SimpleEquivalent = {
  percentage?: boolean
  value: number
  emoji?: string
  category: number
} & Record<Language, string>
