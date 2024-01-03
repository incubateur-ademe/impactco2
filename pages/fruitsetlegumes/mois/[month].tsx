import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import { getMonthLabel, slugs } from 'utils/months'
import LearningFruit from 'components/fruitsetlegumes/LearningFruit'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Web from 'components/layout/Web'

export default function Month({ category, month }: { category: Category; month: number }) {
  return (
    <Web
      title={getMonthLabel(month) + ' | ' + category.name}
      description={category.description}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Saisons category={category} month={month} />
      <LearningFruit />
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
      month: slugs.indexOf(params.month),
    },
  }
}
