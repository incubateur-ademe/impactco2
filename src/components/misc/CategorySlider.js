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
  max-width: 32rem;
`
const Category = styled.div`
  padding: 1rem;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.background};
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
          initialSlide={props.category.id}
          afterChange={(index) => {
            console.log(index)
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
