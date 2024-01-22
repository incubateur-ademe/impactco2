import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import { slugs } from 'utils/months'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import LearningFruit from 'components/fruitsetlegumes/LearningFruit'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Web from 'components/layout/Web'

export default function Month({ category, month }: { category: Category; month: string }) {
  return (
    <Web
      title={month + ' | ' + category.name}
      description={category.description}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Saisons category={category} />
      <LearningFruit />
      <SuggestionBanner
        from={category.slug}
        fromLabel={category.name}
        simulatorName={`comparateur ${category.name.toLowerCase()}`}
      />
    </Web>
  )
}
export async function getStaticPaths() {
  return {
    paths: slugs.map((slug) => ({
      params: { month: slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { month: string } }) {
  return {
    props: {
      category: categories.find((item) => item.id === 9),
      month: params.month,
    },
  }
}
