import { Params } from 'src/providers/ParamProvider'
import { CustomParamValue } from './CustomParam'

const values: Record<string, (params: Params) => Record<string, CustomParamValue>> = {
  chauffage: (params: Params) => ({
    m2: { value: params.chauffage.m2, setter: params.chauffage.setM2 } as CustomParamValue,
  }),
  fruitsetlegumes: (params: Params) => ({
    month: { value: params.fruitsetlegumes.month, setter: params.fruitsetlegumes.setMonth } as CustomParamValue,
  }),
}

export const getCustomParams = (slug: string, params: Params) => {
  if (values[slug]) {
    return values[slug](params)
  }
  return {}
}

export const getComparateurParams = (params: Params, etiquette?: boolean) => {
  const factor = etiquette && params.comparateur.comparedEquivalent ? params.comparateur.comparedEquivalent.value : 1
  const comparisons =
    etiquette && params.comparateur.comparedEquivalent
      ? [params.comparateur.comparedEquivalent.slug, ...params.comparateur.equivalents]
      : params.comparateur.equivalents
  return {
    comparateur: {
      value: [],
      params: `value=${params.comparateur.baseValue * factor}&comparisons=${comparisons.join(',')}${!etiquette && params.comparateur.comparedEquivalent ? `&equivalent=${params.comparateur.comparedEquivalent.slug}` : ''}`,
    },
  }
}
