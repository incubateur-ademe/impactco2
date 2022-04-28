import React, { useState } from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import CategorySlider from 'components/misc/CategorySlider'
import CategoryList from 'components/misc/CategoryList'

const Title = styled.h1``
export default function Category(props) {
  const [category, setCategory] = useState(props.category)

  return (
    <>
      <Section>
        <Section.Content>
          <Title>Catégories</Title>
        </Section.Content>
      </Section>
      <CategorySlider category={category} setCategory={setCategory} />
      <CategoryList category={category} small />
    </>
  )
}
