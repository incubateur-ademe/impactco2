import React from 'react'

import Details from './equivalent/Details'
import VisualizationSlider from './equivalent/VisualizationSlider'
import Ecv from './equivalent/Ecv'

export default function Equivalent(props) {
  return (
    <>
      <Details equivalent={props.equivalent} category={props.category} />
      <VisualizationSlider equivalent={props.equivalent} />
      <Ecv equivalent={props.equivalent} />
    </>
  )
}
