import React, { useContext } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

import DataContext from 'utils/DataContext'
import Footprint from './co2/Footprint'
import Weight from './co2/Weight'

const Wrapper = styled.div`
  max-width: 21rem;
  margin: 0 auto;
`
export default function Co2() {
  const { footprints } = useContext(DataContext)

  return footprints ? (
    <Wrapper>
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {footprints.map((footprint) => (
          <Footprint footprint={footprint} key={footprint.id} />
        ))}
        <Weight />
      </Slider>
    </Wrapper>
  ) : null
}
