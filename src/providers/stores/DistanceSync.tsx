'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDistanceStore } from './distance'

const DistanceSync = () => {
  const searchParams = useSearchParams()
  const { setKm } = useDistanceStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }

    if (searchParams.get('km')) {
      const km = Number.parseInt(searchParams.get('km') as string)
      if (!Number.isNaN(km)) {
        setKm(km)
      }
    }
  }, [searchParams, setKm])

  return null
}

export default DistanceSync
