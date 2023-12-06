type BaseEquivalent = {
  name: string
  slug: string
  emoji: string
  category: number
  default: boolean
  tile: boolean
  meta: {
    title: string
    description: string
  }

  id?: string | number
  source?: string
  prefix?: string
  subtitle?: string
  synonyms?: string[]
  hypothesis?: string
}

type BaseEquivalentValue =
  | {
      total: number
    }
  | { ecv: EquivalentValue[] }

export type ChauffageEquivalent = BaseEquivalent & {
  total: number
  multiplier: number
}

export type RepasEquivalent = BaseEquivalent & {
  total: number
}

export type UsageNumeriqueEquivalent = BaseEquivalent & {
  ecv: EquivalentValue[]
}

export type DeplacementType = 'car' | 'foot' | 'rail' | 'plane'
export type DeplacementEquivalent = BaseEquivalent &
  BaseEquivalentValue & {
    type: string
    secondEmoji?: string
    carpool?: boolean
    display?: {
      min?: number
      max?: number
    }
    ecvs?: {
      max?: number
      subtitle: string
      ecv: EquivalentValue[]
    }[]
  }

export type DiversEquivalent = BaseEquivalent & BaseEquivalentValue

export type BoissonEquivalent = BaseEquivalent &
  (
    | {
        Code_CIQUAL: number
        ecv: EquivalentValue[]
      }
    | {
        total: number
      }
  )

export type FruitsEtLegumesEquivalent = BoissonEquivalent & {
  months: number[]
}

export type UsableEquivalent = BaseEquivalent &
  (
    | {
        ecv: EquivalentValue[]
        usage: {
          peryear: number
          defaultyears: number
        }
        end: number
      }
    | { total: number }
  )

export type EquivalentValue = { value: number; id: number }

export type Equivalent =
  | BoissonEquivalent
  | ChauffageEquivalent
  | DeplacementEquivalent
  | DiversEquivalent
  | UsableEquivalent
  | RepasEquivalent
  | UsageNumeriqueEquivalent
  | FruitsEtLegumesEquivalent
