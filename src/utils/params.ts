import { computedEquivalents } from 'src/providers/equivalents'
import { Params } from 'src/providers/stores/useAllParams'
import { getRandomEquivalents } from 'components/comparateur/random'
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
    comparateur: {
      weight: 1,
      baseValue: 100,
      equivalents: [] as string[],
      tiles: [] as string[],
      comparedEquivalent: undefined,
    },
    distance: {
      km: 10,
      carpool: {},
      displayAll: false,
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

    // Comparateur
    if (searchParams['value']) {
      const value = Number(searchParams['value'] as string)
      if (!Number.isNaN(value)) {
        defaultParams.comparateur.baseValue = value
      }
    }

    if (searchParams['equivalent']) {
      const [slug, carpool] = ((searchParams['equivalent'] as string) || '').split(' ')
      const equivalent = computedEquivalents.find((equivalent) => equivalent.slug === slug)
      const comparedEquivalent =
        equivalent && equivalent.withCarpool
          ? {
              ...equivalent,
              carpool: Number(carpool),
              link: `${equivalent.link}+${carpool}`,
              slug: `${equivalent.slug}+${carpool}`,
              value: equivalent.value / (Number(carpool) + 1),
            }
          : equivalent
      defaultParams.comparateur.comparedEquivalent = comparedEquivalent
      defaultParams.comparateur.weight = comparedEquivalent
        ? comparedEquivalent.value / (comparedEquivalent.percentage ? 100 : 1)
        : 1
    }

    if (searchParams['comparisons']) {
      defaultParams.comparateur.equivalents = (searchParams['comparisons'] as string)
        .replace(/ /g, '+')
        .split(',')
        .filter((slug) => slug.includes('+') || computedEquivalents.find((equivalent) => equivalent.slug === slug))
    } else {
      defaultParams.comparateur.equivalents = getRandomEquivalents(searchParams['equivalent'] as string, 3)
    }

    // Distance
    if (searchParams['km']) {
      const km = Number.parseInt(searchParams['km'] as string)
      if (!Number.isNaN(km)) {
        defaultParams.distance.km = km
      }
    }
  }

  return defaultParams
}
