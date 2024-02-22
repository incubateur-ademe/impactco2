import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import categories from 'data/categories.json'
import { computedEquivalents } from 'components/providers/equivalents'
import Iframe from 'components/layout/Iframe'
import Details from 'components/views/equivalent/Details'
import Ecv from 'components/views/equivalent/Ecv'
import VisualizationSlider from 'components/views/equivalent/VisualizationSlider'

export default function Equivalent() {
  const { query } = useRouter()

  const equivalent = useMemo(
    () => computedEquivalents.find((equivalent) => equivalent.slug === query.equivalent),
    [query]
  )
  const category = useMemo(() => categories?.find((category) => category.id === equivalent?.category), [equivalent])

  return equivalent && category ? (
    <Iframe>
      <Details equivalent={equivalent} category={category} />
      <VisualizationSlider equivalent={equivalent} category={category} iframe />
      <Ecv equivalent={equivalent} category={category} />
    </Iframe>
  ) : null
}
