import React, { useContext } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

import DataContext from 'utils/DataContext'
import Equivalent from './equivalents/Equivalent'

const Wrapper = styled.div`
  max-width: 21rem;
  margin: 0 auto;
`
export default function Equivalents() {
  const { equivalents, currentEquivalent, setCurrentEquivalent } =
    useContext(DataContext)

  return equivalents && currentEquivalent ? (
    <Wrapper>
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        initialSlide={equivalents
          .filter((equivalent) => equivalent.default)
          .findIndex((equivalent) => equivalent.id === currentEquivalent.id)}
        afterChange={(index) =>
          setCurrentEquivalent(
            equivalents.filter((equivalent) => equivalent.default)[index]
          )
        }
      >
        {equivalents
          .filter((equivalent) => equivalent.default)
          .map((equivalent) => (
            <Equivalent equivalent={equivalent} key={equivalent.id} />
          ))}
      </Slider>
    </Wrapper>
  ) : null
}
