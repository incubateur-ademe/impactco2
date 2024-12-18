'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useChauffageStore } from './chauffage'

const ChauffageSync = () => {
  const searchParams = useSearchParams()
  const { setM2 } = useChauffageStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }

    if (searchParams.get('m2')) {
      const m2 = Number.parseInt(searchParams.get('m2') as string)
      if (!Number.isNaN(m2)) {
        setM2(m2)
      }
    }
  }, [searchParams, setM2])

  return null
}

export default ChauffageSync
