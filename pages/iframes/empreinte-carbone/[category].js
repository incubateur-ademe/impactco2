import React from 'react'

import categories from 'data/categories.json'

import Iframe from 'components/layout/Iframe'
import Category from 'components/misc/Category'

export default function CategoryIframe(props) {
  return (
    <Iframe>
      <Category category={props.category} />
    </Iframe>
  )
}

export async function getStaticPaths() {
  return {
    paths: categories
      .filter((category) => category.id !== 4)
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
