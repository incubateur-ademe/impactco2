import React from 'react'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import Chauffage from 'components/chauffage/Chauffage'
import Iframe from 'components/layout/Iframe'

export default function ChauffageIFrame({ category }: { category: CategoryType }) {
  return (
    <Iframe noLogo>
      <Chauffage category={category} iframe />
    </Iframe>
  )
}

export async function getStaticProps() {
  const category = categories.find((category) => category.slug === 'chauffage')
  if (!category) {
    return { notFound: true }
  }
  return {
    props: {
      category,
    },
  }
}
