import React from 'react'

import Tiles from 'components/misc/Tiles'
import Heading from './home/Heading.js'
import Visualization from './home/Visualizations.js'
import About from './home/About.js'
import Contact from './home/Contact.js'

export default function Home() {
  return (
    <>
      <Heading />
      <Visualization />
      <Tiles background title />
      <About />
      <Contact />
    </>
  )
}
