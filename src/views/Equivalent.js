import React from 'react'

import CategoryList from 'components/misc/CategoryList'
import Tiles from 'components/misc/Tiles'
import Details from './equivalent/Details'

export default function Equivalent(props) {
  return (
    <>
      <Details equivalent={props.equivalent} category={props.category} />
      <Tiles equivalent={props.equivalent} background />
      <CategoryList
        equivalent={props.equivalent}
        category={props.category}
        title
      />
    </>
  )
}
