import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import DataContext from 'utils/DataContext'
import Web from 'components/layout/Web'
import Section from 'components/base/Section'
import ShareButton from 'components/base/ShareButton'
import CategorySlider from 'components/misc/CategorySlider'
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
    <Web
      title={`Découvrez l'impact de test sur Mon Convertisseur CO2`}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}
    >
      <Section>
        <Section.Content flex>
          <h1>Catégories</h1>
          <ShareButton title />
        </Section.Content>
      </Section>
      <CategorySlider
        category={category}
        setCategory={(category) => {
          window.history.pushState({}, '', `/categories/${category.slug}`)
          document.title = `Découvrez l'impact de ${category.name.fr} sur Mon Convertisseur CO2`
          setCategory(category)
        }}
      />
      <CategoryList category={category} small />
    </Web>
  ) : null
}
