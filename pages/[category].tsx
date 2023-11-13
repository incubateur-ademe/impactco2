import React from 'react'
import { Category as CategoryType } from 'types/category'
import categories from 'data/categories.json'
import Web from 'components/layout/Web'
import Category from 'components/misc/Category'
import Learning from 'components/misc/Learning'
import OsezChanger from 'components/osezchanger/OsezChanger'

export default function CategoryPage({ category }: { category: CategoryType }) {
  return (
    <Web
      title={category.meta.title}
      description={category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: category,
      }}>
      <Category category={category} />
      <Learning category={category} />
      {category.slug === 'habillement' && <OsezChanger />}
    </Web>
  )
}

const independantCategories = [4, 9, 10, 12]

export async function getStaticPaths() {
  return {
    paths: categories
      .filter((category) => !independantCategories.includes(category.id))
      .map((category) => ({
        params: { category: category.slug },
      })),
    fallback: 'blocking',
  }
}
export async function getStaticProps({ params }: { params: { category: string } }) {
  const category = categories?.find((category) => category.slug === params.category)
  if (!category) {
    return { notFound: true }
  }
  return {
    props: {
      category,
    },
  }
}
