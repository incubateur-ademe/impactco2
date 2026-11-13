import { ReactNode } from 'react'

export type EquivalentValue = { value: number; id: number }

type EquivalentRange = {
  min?: number
  max?: number
}

export type DeplacementType = 'car' | 'foot' | 'rail' | 'plane'

export type Equivalent = {
  id?: number
  slug: string
  category: number
  default?: boolean
  synonyms?: string[]
  withCarpool?: boolean
  onlyCarpool?: boolean
  carpool?: number
  livraison?: boolean
  percentage?: boolean
  unit?: string
  sources?: {
    label: string
    href: string
  }[]
  type?: DeplacementType
  total?: number
  ecv?: EquivalentValue[]
  ecvs?: {
    display?: EquivalentRange
    subtitle: string
    ecv: EquivalentValue[]
  }[]
  display?: EquivalentRange
  usage?:
    | number
    | {
        peryear: number
        defaultyears: number
      }
  end?: number
  ids?: number[]
  months?: number[]
  ignore?: boolean
}

export type ComputedEquivalent = Equivalent & {
  value: number
  initialValue?: number
  name?: ReactNode
  link: string
}

export type Language = 'en' | 'fr' | 'es'
export type SimpleEquivalent = {
  percentage?: boolean
  value: number
  category: number
} & Record<Language, string>
