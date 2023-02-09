import React from 'react'

import Web from 'components/layout/Web'
import Contact from 'components/misc/Contact'
import Tiles from 'components/misc/Tiles'
import About from 'components/views/home/About'
import Heading from 'components/views/home/Heading'
import Visualization from 'components/views/home/Visualizations'

export default function Home() {
  return (
    <Web>
      <Heading />
      <Visualization />
      <Tiles background title />
      <Contact />
      <About />
    </Web>
  )
}
