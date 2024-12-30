import { Params } from 'src/providers/stores/useAllParams'
import { AlimentationCategories } from './alimentation'

export const getDefaultParams = (searchParams: { [key: string]: string | string[] | undefined }) => {
  const defaultParams = {
    chauffage: {
      m2: 63,
    },
    alimentation: {
      category: AlimentationCategories.Group,
      customList: false,
      equivalents: [] as string[],
    },
  } as Params

  if (searchParams) {
    // Alimentation
    if (searchParams['alimentationCategory']) {
      const category = searchParams['alimentationCategory'] as AlimentationCategories
      if (Object.values(AlimentationCategories).includes(category)) {
        defaultParams.alimentation.category = category
      }
    }

    if (searchParams['alimentationEquivalents']) {
      const equivalents = (searchParams['alimentationEquivalents'] as string).split(',')
      defaultParams.alimentation.customList = true
      defaultParams.alimentation.equivalents = equivalents
    }

    // Chauffage
    if (searchParams['m2']) {
      const m2 = Number.parseInt(searchParams['m2'] as string)
      if (!Number.isNaN(m2)) {
        defaultParams.chauffage.m2 = m2
      }
    }
  }

  return defaultParams
}
