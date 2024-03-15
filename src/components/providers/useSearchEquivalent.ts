import Fuse from 'fuse.js'
import { useEffect, useState } from 'react'
import { ComputedEquivalent } from 'types/equivalent'
import { computedEquivalents } from './equivalents'

const fuse = new Fuse([...computedEquivalents], {
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
      name: 'subtitle',
      weight: 0.4,
    },
    {
      name: 'synonyms',
      weight: 0.2,
    },
  ],
  threshold: 0.3,
  ignoreLocation: true,
})

export const useSearchEquivalent = (search: string) => {
  const [results, setResults] = useState<ComputedEquivalent[]>([])

  useEffect(() => {
    setResults(
      search.length > 0
        ? fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).map(({ item }) => item)
        : computedEquivalents.sort((a, b) => (a.slug > b.slug ? 1 : -1))
    )
  }, [search])

  return results
}
