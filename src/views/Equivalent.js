import React from 'react'

import Details from './equivalent/Details'
import Visualization from './equivalent/Visualization'
import VisualizationSlider from './equivalent/VisualizationSlider'

export default function Equivalent(props) {
  return (
    <>
      <Details equivalent={props.equivalent} category={props.category} />
      {props.equivalent.slug === 'smartphone' ? (
        <VisualizationSlider equivalent={props.equivalent} />
      ) : (
        <Visualization equivalent={props.equivalent} />
      )}
    </>
  )
}
