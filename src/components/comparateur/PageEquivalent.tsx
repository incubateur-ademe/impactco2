import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Equivalent from 'components/externalModules/shopify/Equivalent'

const PageEquivalent = () => {
  const router = useRouter()
  const [value, setValue] = useState('1000')
  const [comparisons, setComparisons] = useState<string[]>([])

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (router.query.value) {
      setValue(router.query.value as string)
    }

    if (router.query.comparisons) {
      setComparisons((router.query.comparisons as string).split(','))
    } else {
      setComparisons(['random'])
    }
  }, [router])

  return router.isReady && comparisons.length > 0 ? <Equivalent baseValue={value} comparisons={comparisons} /> : null
}

export default PageEquivalent
