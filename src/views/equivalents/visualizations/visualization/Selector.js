import React, { useContext } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

import DataContext from 'utils/DataContext'
import Equivalent from './selector/Equivalent'

const Wrapper = styled.div`
  max-width: 21rem;
  margin: 0 auto;
`
const Title = styled.div`
  margin: 0 0.5rem;
  padding: 1rem;
  font-size: 1.25rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: 1rem;
`
export default function Selector(props) {
  const { equivalents, visualizedEquivalent, setVisualizedEquivalent } =
    useContext(DataContext)

  return (
    <Wrapper>
      <Slider
        dots={false}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        initialSlide={equivalents
          .filter((equivalent) => equivalent.visualization)
          .findIndex((equivalent) => equivalent.id === visualizedEquivalent.id)}
        afterChange={(index) =>
          setVisualizedEquivalent(
            equivalents.filter((equivalent) => equivalent.visualization)[index]
          )
        }
      >
        {equivalents
          .filter((equivalent) => equivalent.visualization)
          .map((equivalent) => (
            <Equivalent
              equivalent={equivalent}
              key={equivalent.id}
              weight={props.weight}
            />
          ))}
      </Slider>
    </Wrapper>
  )
}
