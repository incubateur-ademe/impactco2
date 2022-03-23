import React from 'react'

import Category from 'components/misc/Category'
import Tiles from 'components/misc/Tiles'
import Details from './equivalent/Details'
import Source from './equivalent/Source'

export default function Equivalent(props) {
  return (
    <>
      <Details equivalent={props.equivalent} category={props.category} />
      <Category category={props.category} title />
      <Tiles equivalent={props.equivalent} weight={props.equivalent.total} />
      <Source equivalent={props.equivalent} />
    </>
  )
}
