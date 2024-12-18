'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useComparateurStore } from './comparateur'

const ComparateurSync = () => {
  const searchParams = useSearchParams()
  const { setComparisonMode, setComparison } = useComparateurStore()

  useEffect(() => {
    if (!searchParams) {
      return
    }

    if (searchParams.get('defaultMode')) {
      setComparisonMode(searchParams.get('defaultMode') === 'list' ? 'list' : 'comparison')
    } else if (searchParams.get('mode')) {
      setComparisonMode(searchParams.get('mode') === 'list' ? 'list' : 'comparison')
    }

    if (searchParams.get('comparison')) {
      const comparison = searchParams.get('comparison')?.replace(/ /g, '+').split(',') as string[]
      setComparison(comparison)
    }
  }, [searchParams, setComparisonMode, setComparison])

  return null
}

export default ComparateurSync
