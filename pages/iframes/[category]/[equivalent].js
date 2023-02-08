import React, { useContext, useMemo } from 'react'
import { useRouter } from 'next/router'

import DataContext from 'components/providers/DataProvider'
import Iframe from 'components/layout/Iframe'
import Details from 'components/views/equivalent/Details'
import VisualizationSlider from 'components/views/equivalent/VisualizationSlider'
import Ecv from 'components/views/equivalent/Ecv'

export default function Equivalent() {
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
    <Iframe>
      <Details equivalent={equivalent} category={category} />
      <VisualizationSlider equivalent={equivalent} />
      <Ecv equivalent={equivalent} />
    </Iframe>
  ) : null
}
