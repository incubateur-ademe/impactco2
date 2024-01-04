import React from 'react'
import { Category } from 'types/category'
import categories from 'data/categories.json'
import { slugs } from 'utils/months'
import Saisons from 'components/fruitsetlegumes/Saisons'
import Iframe from 'components/layout/Iframe'

export default function Month({ category, month }: { category: Category; month: number }) {
  return (
    <Iframe>
      <Saisons category={category} month={month} />
    </Iframe>
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
