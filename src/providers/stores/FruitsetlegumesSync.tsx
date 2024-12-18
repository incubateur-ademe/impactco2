'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { slugs } from 'utils/months'
import { useFruitsetlegumesStore } from './fruitsetlegumes'

const FruitsetlegumesSync = () => {
  const searchParams = useSearchParams()
  const { setMonth, setSearch, setSorting } = useFruitsetlegumesStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }

    if (searchParams.get('month')) {
      const monthIndex = Number.parseInt(searchParams.get('month') as string)
      if (!Number.isNaN(monthIndex)) {
        setMonth(monthIndex)
      } else {
        setMonth(slugs.indexOf(searchParams.get('month') as string))
      }
    }
  }, [searchParams, setMonth, setSearch, setSorting])

  return null
}

export default FruitsetlegumesSync
