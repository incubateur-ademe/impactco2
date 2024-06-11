'use client'

import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import { computedEquivalents } from 'src/providers/equivalents'
import Infography from './Infography'

const IframeInfography = () => {
  const params = useSearchParams()
  const values = useMemo(() => {
    if (!params) {
      return null
    }
    const equivalents = (params.get('equivalents') || '').split(',')
    if (equivalents.length === 0) {
      return null
    }
    const equivalent = computedEquivalents.find((equivalent) => equivalent.slug === equivalents[0])
    if (!equivalent) {
      return null
    }
    return {
      equivalent,
      equivalents,
    }
  }, [params])
  return values ? <Infography {...values} /> : null
}

export default IframeInfography
