'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { getRandomEquivalents } from 'components/comparateur/random'
import { computedEquivalents } from '../equivalents'
import { useComparateurStore } from './comparateur'

const ComparateurSync = () => {
  const searchParams = useSearchParams()
  const { setBaseValue, setComparedEquivalent, setEquivalents } = useComparateurStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }
    if (searchParams.get('value')) {
      const value = Number(searchParams.get('value') as string)
      if (!Number.isNaN(value)) {
        setBaseValue(value)
      }
    }
    if (searchParams.get('equivalent')) {
      const [slug, carpool] = (searchParams.get('equivalent') || '').split(' ')
      const equivalent = computedEquivalents.find((equivalent) => equivalent.slug === slug)
      setComparedEquivalent(
        equivalent && equivalent.withCarpool
          ? {
              ...equivalent,
              carpool: Number(carpool),
              link: `${equivalent.link}+${carpool}`,
              slug: `${equivalent.slug}+${carpool}`,
              value: equivalent.value / (Number(carpool) + 1),
            }
          : equivalent,
        true
      )
    }

    if (searchParams.get('comparisons')) {
      setEquivalents(
        (searchParams.get('comparisons') as string)
          .replace(/ /g, '+')
          .split(',')
          .filter((slug) => slug.includes('+') || computedEquivalents.find((equivalent) => equivalent.slug === slug))
      )
    } else {
      setEquivalents(getRandomEquivalents(searchParams.get('equivalent') as string, 3))
    }
  }, [searchParams, setBaseValue, setComparedEquivalent, setEquivalents])

  return null
}

export default ComparateurSync
