import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import DataContext from 'components/providers/DataProvider'
import Iframe from 'components/layout/Iframe'
import Section from 'components/base/Section'
import ShareButton from 'components/base/ShareButton'
import CategoryList from 'components/misc/CategoryList'

export default function Category() {
  const { query } = useRouter()
  const { categories } = useContext(DataContext)

  const [category, setCategory] = useState()
  useEffect(() => {
    setCategory(
      categories?.find((category) => category.slug === query.category)
    )
  }, [query, categories])

  return category ? (
    <Iframe>
      <Section>
        <Section.Content flex>
          <h1>{category.name.fr}</h1>
          <ShareButton title />
        </Section.Content>
      </Section>
      <CategoryList category={category} />
    </Iframe>
  ) : null
}
