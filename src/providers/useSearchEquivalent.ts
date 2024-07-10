import Fuse from 'fuse.js'
import { useEffect, useState } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { categories } from 'data/categories'
import { getName } from 'utils/Equivalent/equivalent'
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

const equivalents = computedEquivalents.map((equivalent) => {
  const category = categories.find((category) => equivalent.category === category.id)
  return category && category.synonyms
    ? {
        ...equivalent,
        synonyms: [...category.synonyms, ...(equivalent.synonyms || [])],
      }
    : equivalent
})

export const useSearchEquivalent = (search: string, excludeEmpty?: boolean, category?: number) => {
  const [results, setResults] = useState<ComputedEquivalent[]>([])
  const [fuses, setFuses] = useState<{ fuse: Fuse<ComputedEquivalent>; nonEmptyFuse: Fuse<ComputedEquivalent> }>()

  const { language } = useParamContext()
  useEffect(() => {
    const translatedEquivalents = equivalents
      .filter((equivalent) => !category || equivalent.category === category)
      .map((equivalent) => ({
        ...equivalent,
        name: getName(language, equivalent),
      }))
    setFuses({
      fuse: new Fuse([...translatedEquivalents], config),
      nonEmptyFuse: new Fuse([...translatedEquivalents.filter((equivalent) => equivalent.value)], config),
    })
  }, [language, category])

  useEffect(() => {
    if (fuses) {
      excludeEmpty
        ? setResults(
            search.length > 0
              ? fuses.nonEmptyFuse
                  .search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
                  .map(({ item }) => item)
              : computedEquivalents.filter((equivalent) => equivalent.value).sort((a, b) => (a.slug > b.slug ? 1 : -1))
          )
        : setResults(
            search.length > 0
              ? fuses.fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).map(({ item }) => item)
              : computedEquivalents.sort((a, b) => (a.slug > b.slug ? 1 : -1))
          )
    }
  }, [search, fuses])

  return results
}
