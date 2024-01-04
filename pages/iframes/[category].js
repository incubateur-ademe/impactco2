import React from 'react'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Category from 'components/misc/Category'

export default function CategoryIframe(props) {
  return (
    <Iframe noLogo>
      <Category category={props.category} iframe />
    </Iframe>
  )
}

export async function getStaticPaths() {
  return {
    paths: categories
      .filter((category) => ![4, 8, 9, 10, 12].includes(category.id))
      .map((category) => ({
        params: { category: category.slug },
      })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
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
