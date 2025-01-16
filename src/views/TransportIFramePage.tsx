'use client'

import { useEffect, useState } from 'react'
import { Category as CategoryType } from 'types/category'
import Category from 'components/outils/Category'
import TransportSimulator from 'components/outils/TransportSimulator'

const bisUrls = ['https://impactco2.webflow.io']

const TransportIFramePage = ({ category }: { category: CategoryType }) => {
  const [bis, setBis] = useState(false)
  useEffect(() => {
    const url =
      document.location.ancestorOrigins && document.location.ancestorOrigins.length > 0
        ? document.location.ancestorOrigins[0]
        : document.referrer
    if (bisUrls.includes(url)) {
      setBis(true)
    }
  }, [])

  return <Category category={category} simulator={<TransportSimulator bis={bis} />} noBottomBorders={bis} />
}

export default TransportIFramePage
