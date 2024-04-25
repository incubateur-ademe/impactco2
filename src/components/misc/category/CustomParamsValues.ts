import { Params } from 'components/providers/ParamProvider'
import { CustomParamValue } from './CustomParam'

const values: Record<string, (params: Params) => Record<string, CustomParamValue>> = {
  chauffage: (params: Params) => ({
    m2: { value: params.chauffage.m2, setter: params.chauffage.setM2 } as CustomParamValue,
  }),
}

export const getCustomParams = (slug: string, params: Params) => {
  if (values[slug]) {
    return values[slug](params)
  }
  return {}
}
