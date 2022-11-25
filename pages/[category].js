import React from 'react'

import categories from 'data/categories.json'

import Web from 'components/layout/Web'
import Category from 'components/misc/Category'

export default function CategoryPage(props) {
  return (
    <Web
      title={props.category.meta.title}
      description={props.category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}
    >
      <Category category={props.category} />
    </Web>
  )
}

export const independantCategories = [1, 2, 4, 9, 10]

export async function getStaticPaths() {
  return {
    paths: categories
      .filter((category) => !independantCategories.includes(category.id))
      .map((category) => ({
        params: { category: category.slug },
      })),
    fallback: false,
  }
}
export async function getStaticProps({ params }) {
  return {
    props: {
      category: categories?.find(
        (category) => category.slug === params.category
      ),
    },
  }
}
