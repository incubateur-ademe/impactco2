import React from 'react'

import Details from './equivalent/Details'
import Category from 'components/misc/Category'
import Tiles from 'components/misc/Tiles'

export default function Equivalent(props) {
  return (
    <>
      <Details equivalent={props.equivalent} />
      <Category category={props.category} />
      <Tiles equivalent={props.equivalent} />
    </>
  )
}
