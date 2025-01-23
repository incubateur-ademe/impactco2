import { ASTNode, PublicodesExpression } from 'publicodes'
import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent } from 'types/equivalent'
import { getRandomEquivalents } from 'components/comparateur/random'
import { AlimentationCategories } from './alimentation'
import { slugs } from './months'
import { usageNumeriqueDefaultValues } from './usageNumerique'

const getInt = (value: string) => {
  const number = Number.parseInt(value)
  if (Number.isNaN(number)) {
    return 0
  }
  return number
}

const getFloat = (value: string) => {
  const number = Number.parseFloat(value)
  if (Number.isNaN(number)) {
    return 0
  }
  return number
}

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
      comparedEquivalent: undefined as ComputedEquivalent | undefined,
    },
    distance: {
      km: 10,
      carpool: {},
      displayAll: false,
    },
    fruitsetlegumes: { month: new Date().getMonth(), search: '', sorting: 'alph_desc' },
    itineraire: {
      roundTrip: false,
      start: '',
      end: '',
    },
    teletravail: {
      start: '',
      end: '',
      transport: 'voiturethermique',
      presentiel: 4,
      homeOffice: 1,
    },
    usageNumerique: {
      situation: { ...usageNumeriqueDefaultValues } as Record<string, PublicodesExpression | ASTNode>,
      numberEmails: 50,
      mode: '',
    },
  }

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

    // Fruits et légumes
    if (searchParams['month']) {
      const monthIndex = Number.parseInt(searchParams['month'] as string)
      if (!Number.isNaN(monthIndex)) {
        defaultParams.fruitsetlegumes.month = monthIndex
      } else {
        defaultParams.fruitsetlegumes.month = slugs.indexOf(searchParams['month'] as string)
      }
    }

    // Itinéraire
    if (searchParams['roundTrip']) {
      defaultParams.itineraire.roundTrip = searchParams['roundTrip'] === 'true'
    }

    defaultParams.itineraire.start = (searchParams['start'] || searchParams['itineraireStart']) as string
    defaultParams.itineraire.end = (searchParams['end'] || searchParams['itineraireEnd']) as string

    // Télétravail
    if (searchParams['transport']) {
      defaultParams.teletravail.transport = searchParams['transport'] as string
    }
    if (searchParams['presentiel']) {
      defaultParams.teletravail.presentiel = Number(searchParams['presentiel'])
    }
    if (searchParams['homeOffice']) {
      defaultParams.teletravail.homeOffice = Number(searchParams['homeOffice'])
    }
    defaultParams.teletravail.start = (searchParams['start'] || searchParams['teletravailStart']) as string
    defaultParams.teletravail.end = (searchParams['end'] || searchParams['teletravailEnd']) as string

    // Usage numérique

    if (searchParams['emails']) {
      defaultParams.usageNumerique.numberEmails = getInt(searchParams['emails'] as string)
    }
    if (searchParams['display']) {
      defaultParams.usageNumerique.mode = searchParams['display'] as string
    }

    if (searchParams['email . appareil']) {
      defaultParams.usageNumerique.situation['email . appareil'] = searchParams['email . appareil'] as string
    }
    if (searchParams['email . transmission . émetteur . réseau']) {
      defaultParams.usageNumerique.situation['email . transmission . émetteur . réseau'] = searchParams[
        'email . transmission . émetteur . réseau'
      ] as string
    }

    if (searchParams['email . taille']) {
      defaultParams.usageNumerique.situation['email . taille'] = getFloat(searchParams['email . taille'] as string)
    }

    if (searchParams['streaming . durée']) {
      defaultParams.usageNumerique.situation['streaming . durée'] = getInt(searchParams['streaming . durée'] as string)
    }

    if (searchParams['streaming . appareil']) {
      defaultParams.usageNumerique.situation['streaming . appareil'] = searchParams['streaming . appareil'] as string
    }

    if (searchParams['streaming . transmission . réseau']) {
      defaultParams.usageNumerique.situation['streaming . transmission . réseau'] = searchParams[
        'streaming . transmission . réseau'
      ] as string
    }

    if (searchParams['streaming . qualité']) {
      defaultParams.usageNumerique.situation['streaming . qualité'] = searchParams['streaming . qualité'] as string
    }

    if (searchParams['visio . durée']) {
      defaultParams.usageNumerique.situation['visio . durée'] = getInt(searchParams['visio . durée'] as string)
    }

    if (searchParams['visio . appareil']) {
      defaultParams.usageNumerique.situation['visio . appareil'] = searchParams['visio . appareil'] as string
    }

    if (searchParams['visio . emplacements']) {
      defaultParams.usageNumerique.situation['visio . emplacements'] = getInt(
        searchParams['visio . emplacements'] as string
      )
    }

    if (searchParams['visio . transmission . réseau']) {
      defaultParams.usageNumerique.situation['visio . transmission . réseau'] = searchParams[
        'visio . transmission . réseau'
      ] as string
    }

    if (searchParams['visio . qualité']) {
      defaultParams.usageNumerique.situation['visio . qualité'] = searchParams['visio . qualité'] as string
    }
  }

  return defaultParams
}

export type DefaultParams = ReturnType<typeof getDefaultParams>
