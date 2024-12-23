'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { AlimentationCategories } from 'utils/alimentation'
import { useAlimentationStore } from './alimentation'

const AlimentationSync = () => {
  const searchParams = useSearchParams()
  const { setCategory, setCustomList, setEquivalents } = useAlimentationStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }

    if (searchParams.get('alimentationCategory')) {
      const category = searchParams.get('alimentationCategory') as AlimentationCategories
      if (Object.values(AlimentationCategories).includes(category)) {
        setCategory(category)
      }
    }

    if (searchParams.get('alimentationEquivalents')) {
      const equivalents = searchParams.get('alimentationEquivalents')?.split(',') as string[]
      setCustomList(true)
      setEquivalents(equivalents)
    }
  }, [searchParams, setCategory, setCustomList, setEquivalents])

  return null
}

export default AlimentationSync
