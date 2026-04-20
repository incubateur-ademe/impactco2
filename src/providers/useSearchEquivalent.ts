import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import { getComparisonSlug, getName } from 'utils/Equivalent/equivalent'
import { getEquivalentWithCarpool } from 'utils/carpool'
import useParamContext from './ParamProvider'
import { computedEquivalents } from './equivalents'

const config = {
  keys: [
    {
      name: 'name',
      weight: 1,
    },
    {
      name: 'slug',
      weight: 0.7,
    },
    {
      name: 'synonyms',
      weight: 0.2,
    },
  ],
  threshold: 0.3,
  ignoreLocation: true,
}

const allEquivalents = computedEquivalents
  .map((equivalent) => {
    const category = categories.find((category) => equivalent.category === category.id)
    return category && category.synonyms
      ? {
          ...equivalent,
          synonyms: [...category.synonyms, ...(equivalent.synonyms || [])],
        }
      : equivalent
  })
  .flatMap(getEquivalentWithCarpool)
  .filter(
    (equivalent, index, values) =>
      values.findIndex((computedEquivalent) => computedEquivalent.slug === equivalent.slug) === index
  )

export const useSearchEquivalent = (
  search: string,
  excludeEmpty?: boolean,
  category?: number,
  emptyResults?: boolean,
  equivalents?: ComputedEquivalent[]
) => {
  const {
    language,
    transport: { modes },
  } = useParamContext()

  const filteredEquivalents = useMemo(() => {
    return (equivalents || allEquivalents)
      .filter((equivalent) => {
        if (equivalent.category === 4) {
          if (equivalent.withCarpool) {
            const infos = equivalent.slug.split('+')
            let slug = infos[0]
            if (equivalent.slug.startsWith('voiture-')) {
              if (equivalent.slug.includes('hybride')) {
                slug = `voiturehybride`
              } else if (equivalent.slug.includes('electrique')) {
                slug = `voitureelectrique`
              } else {
                slug = 'voiturethermique'
              }
            }

            return infos[1] ? modes.includes(`${slug}+1`) : modes.includes(slug)
          }
          return modes.includes(getComparisonSlug(equivalent.slug))
        }
        return true
      })
      .filter((equivalent) => !category || equivalent.category === category)
      .map((equivalent) => ({
        ...equivalent,
        name: getName(language, equivalent, false, 1, true, true),
      }))
  }, [language, category, modes, equivalents])

  const fuses = useMemo(() => {
    return {
      fuse: new Fuse([...filteredEquivalents], config),
      nonEmptyFuse: new Fuse([...filteredEquivalents.filter((equivalent) => equivalent.value)], config),
    }
  }, [filteredEquivalents])

  const results = useMemo(() => {
    if (fuses) {
      if (emptyResults && search.length === 0) {
        return []
      } else {
        return excludeEmpty
          ? search.length > 0
            ? fuses.nonEmptyFuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).map(({ item }) => item)
            : filteredEquivalents.filter((equivalent) => equivalent.value).sort((a, b) => (a.slug > b.slug ? 1 : -1))
          : search.length > 0
            ? fuses.fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).map(({ item }) => item)
            : filteredEquivalents.sort((a, b) => (a.slug > b.slug ? 1 : -1))
      }
    }
    return []
  }, [search, fuses, emptyResults, excludeEmpty, filteredEquivalents])

  return results
}
