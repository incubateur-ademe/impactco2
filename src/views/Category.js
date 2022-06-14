import React, { useState } from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import ShareButton from 'components/misc/ShareButton'
import CategorySlider from 'components/misc/CategorySlider'
import CategoryList from 'components/misc/CategoryList'

const Title = styled.h1``
export default function Category(props) {
  const [category, setCategory] = useState(props.category)
  return (
    <>
      <Section>
        <Section.Content flex>
          <Title>Catégories</Title>
          <ShareButton title />
        </Section.Content>
      </Section>
      <CategorySlider
        category={category}
        setCategory={(category) => {
          window.history.pushState({}, '', `/categories/${category.slug}`)
          document.title = `${category.name.fr} | Mon Convertisseur CO2`
          setCategory(category)
        }}
      />
      <CategoryList category={category} small />
    </>
  )
}
