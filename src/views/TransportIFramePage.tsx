'use client'

import { useEffect, useState } from 'react'
import { Params } from 'src/providers/stores/useAllParams'
import { Category as CategoryType } from 'types/category'
import Category from 'components/outils/Category'
import TransportSimulator from 'components/outils/TransportSimulator'

const bisUrls = ['https://impactco2.webflow.io', 'https://immobilier.lefigaro.fr', 'https://www.terrabotanica.fr']

const TransportIFramePage = ({ category, defaultParams }: { category: CategoryType; defaultParams: Params }) => {
  const [bis, setBis] = useState(false)
  useEffect(() => {
    const url =
      document.location.ancestorOrigins && document.location.ancestorOrigins.length > 0
        ? document.location.ancestorOrigins[0]
        : document.referrer
    if (bisUrls.includes(url.endsWith('/') ? url.slice(0, url.length - 1) : url)) {
      setBis(true)
    }
  }, [])

  return (
    <Category
      category={category}
      simulator={<TransportSimulator bis={bis} defaultParams={defaultParams} />}
      noBottomBorders={bis}
    />
  )
}

export default TransportIFramePage
