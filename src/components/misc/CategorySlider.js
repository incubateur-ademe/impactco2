import React, { useContext } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

import DataContext from 'utils/DataContext'
import Section from 'components/base/Section'

const StyledSection = styled(Section)`
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme.colors.main};
`
const StyledSectionContent = styled(Section.Content)`
  max-width: 44rem;

  ${(props) => props.theme.mq.medium} {
    width: calc(100vw - 4rem);
  }
`
const Category = styled.div`
  padding: 1rem;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.background};

  ${(props) => props.theme.mq.medium} {
    font-size: 2.5rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: 1.25rem;
  }
`
export default function CategorySlider(props) {
  const { categories } = useContext(DataContext)

  return (
    <StyledSection>
      <StyledSectionContent>
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          initialSlide={props.category.id - 1}
          afterChange={(index) => {
            props.setCategory(categories[index])
          }}
        >
          {categories.map((category) => (
            <Category key={category.id}>{category.name.fr}</Category>
          ))}
        </Slider>
      </StyledSectionContent>
    </StyledSection>
  )
}
