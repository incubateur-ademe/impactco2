import React, { useContext, useMemo } from 'react'
import { useRouter } from 'next/router'

import DataContext from 'utils/DataContext'
import Web from 'components/layout/Web'
import Details from 'components/views/equivalent/Details'
import VisualizationSlider from 'components/views/equivalent/VisualizationSlider'
import Ecv from 'components/views/equivalent/Ecv'

export default function Equivalent(props) {
  const { query } = useRouter()
  const { equivalents, categories } = useContext(DataContext)

  const equivalent = useMemo(
    () =>
      equivalents?.find((equivalent) => equivalent.slug === query.equivalent),
    [query, equivalents]
  )
  const category = useMemo(
    () => categories?.find((category) => category.id === equivalent?.category),
    [equivalent, categories]
  )

  return equivalent && category ? (
    <Web
      title={`Découvrez l'impact d'un ${equivalent.name.fr} sur Mon Convertisseur CO2`}
      result={equivalent.name.fr}
      breadcrumb={{
        type: 'equivalent',
        category: category,
        equivalent: equivalent,
      }}
      image={`/og-images/${equivalent.slug}.jpeg`}
    >
      <Details equivalent={equivalent} category={category} />
      <VisualizationSlider equivalent={equivalent} />
      <Ecv equivalent={equivalent} />
    </Web>
  ) : null
}
