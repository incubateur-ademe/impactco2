import React from 'react'

import categories from 'data/categories.json'

import Web from 'components/layout/Web'
import Category from 'components/misc/Category'

export default function CategoryPage(props) {
  return (
    <Web
      title={props.category.title}
      description={props.category.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}
    >
      <Category category={props.category} />
    </Web>
  )
}

export async function getStaticPaths() {
  return {
    paths: categories
      .filter((category) => ![1, 2, 4, 9].includes(category.id))
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
