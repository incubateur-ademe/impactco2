import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import CategorySlider from 'components/misc/CategorySlider'
import CategoryList from 'components/misc/CategoryList'

const Title = styled.h1``
export default function Category(props) {
  return (
    <>
      <Section>
        <Section.Content>
          <Title>Catégories</Title>
        </Section.Content>
      </Section>
      <CategorySlider category={props.category} />
      <CategoryList category={props.category} small />
    </>
  )
}
