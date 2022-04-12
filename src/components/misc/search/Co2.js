import React, { useEffect, useContext } from 'react'
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
  const { footprints, setWeight } = useContext(DataContext)

  return footprints ? (
    <Wrapper>
      <Slider
        dots={false}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        afterChange={(index) =>
          setWeight(index === 0 ? 1 : footprints[index - 1].value)
        }
      >
        <Weight />
        {footprints.map((footprint) => (
          <Footprint footprint={footprint} key={footprint.id} />
        ))}
      </Slider>
    </Wrapper>
  ) : null
}
