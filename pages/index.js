import React from 'react'

import Web from 'components/layout/Web'
import Tiles from 'components/misc/Tiles'
import Heading from 'components/home/Heading.js'
import Visualization from 'components/home/Visualizations.js'
import About from 'components/home/About.js'
import Contact from 'components/home/Contact.js'

export default function Home() {
  return (
    <Web>
      <Heading />
      <Visualization />
      <Tiles background title />
      <About />
      <Contact />
    </Web>
  )
}
