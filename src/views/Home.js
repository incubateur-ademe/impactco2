import React from 'react'

import Heading from './home/Heading.js'
import Tiles from 'components/Misc/Tiles'
import Categories from 'components/Misc/Categories'

export default function Home() {
  return (
    <>
      <Heading />
      <Tiles weight background />
      <Categories />
    </>
  )
}
