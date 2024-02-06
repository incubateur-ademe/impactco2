import React from 'react'
import { Category as CategoryType } from 'types/category'
import { Equivalent as EquivalentType } from 'types/equivalent'
import categories from 'data/categories.json'
import usagenumerique from 'data/categories/usagenumerique.json'
import Web from 'components/layout/Web'
import Equivalent from 'components/numerique/Equivalent'
import Text from 'components/views/equivalent/Text'

const equivalents = [...usagenumerique].map((equivalent) => ({
  ...equivalent,
  id: equivalent.slug,
}))

export default function RechercheWebPage({
  equivalent,
  category,
}: {
  equivalent: EquivalentType
  category: CategoryType
}) {
  return (
    <Web
      title={equivalent.meta.title}
      description={equivalent.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: category,
        equivalent: equivalent,
      }}>
      <Equivalent equivalent={equivalent} category={category} name='recherche web' />
      <Text equivalent={equivalent} category={category} />
    </Web>
  )
}

export async function getStaticProps() {
  return {
    props: {
      equivalent: equivalents.find((equivalent) => equivalent.slug === 'rechercheweb'),
      category: categories.find((category) => category.slug === 'usagenumerique'),
    },
  }
}
