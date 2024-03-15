import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Etiquette from './Etiquette'

const PageEquivalent = ({ animated }: { animated?: boolean }) => {
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

  return router.isReady && comparisons.length > 0 ? (
    <Etiquette baseValue={value} comparisons={comparisons} animated={animated} />
  ) : null
}

export default PageEquivalent
