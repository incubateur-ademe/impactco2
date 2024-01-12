import React from 'react'
import styled from 'styled-components'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import Chauffage from 'components/chauffage/Chauffage'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'

export default function ChauffagePage({ category }: { category: CategoryType }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      image={`meta/${category.slug}.png`}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Container>
        <Chauffage category={category} />
      </Container>
      <SuggestionBanner from='/chauffage' fromLabel='Chauffage' simulatorName='simulateur chauffage' />
    </Web>
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

const Container = styled.div`
  margin-bottom: 2rem;
`
