import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

import Section from 'components/base/Section'
import VisualizationWrapper from './visualization/VisualizationWrapper'
import SmartphoneGeneral from './visualization/SmartphoneGeneral'
import SmartphoneCategory from './visualization/SmartphoneCategory'
import Smartphone from './visualization/Smartphone'

const StyledSection = styled(Section)`
  margin-bottom: 4rem;

  .slick-prev {
    left: -1rem;
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 17.9187C-0.499999 16.764 -0.500001 13.8772 1.5 12.7225L22.5 0.598169C24.5 -0.556532 27 0.886842 27 3.19624L27 27.445C27 29.7544 24.5 31.1977 22.5 30.043L1.5 17.9187Z' fill='%23${(
      props
    ) => props.theme.colors.main.replace('#', '')}'/%3E%3C/svg%3E%0A");
  }

  .slick-next {
    right: -1rem;
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.5 12.7224C27.5 13.8771 27.5 16.7639 25.5 17.9186L4.5 30.0429C2.5 31.1976 -1.38802e-06 29.7543 -1.28708e-06 27.4449L-2.27131e-07 3.19616C-1.26184e-07 0.886754 2.5 -0.556626 4.5 0.598075L25.5 12.7224Z' fill='%23${(
      props
    ) => props.theme.colors.main.replace('#', '')}'/%3E%3C/svg%3E%0A");
  }
`
export default function Visualization(props) {
  return (
    <StyledSection>
      <Section.Content>
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          initialSlide={0}
          afterChange={(index) => {
            // props.setCategory(categories[index])
          }}
        >
          <VisualizationWrapper equivalent={props.equivalent} fixed>
            <SmartphoneGeneral />
          </VisualizationWrapper>
          <VisualizationWrapper equivalent={props.equivalent} fixed>
            <SmartphoneCategory />
          </VisualizationWrapper>
          <VisualizationWrapper equivalent={props.equivalent} fixed>
            <Smartphone />
          </VisualizationWrapper>
        </Slider>
      </Section.Content>
    </StyledSection>
  )
}
