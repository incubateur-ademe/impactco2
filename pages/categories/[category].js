import React from 'react'

import categories from 'data/categories.json'

import Web from 'components/layout/Web'
import Section from 'components/base/Section'
import ShareButton from 'components/base/ShareButton'
import CategoryList from 'components/misc/CategoryList'

export default function Category(props) {
  return props.category ? (
    <Web
      title={props.category.title}
      description={props.category.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}
    >
      <Section>
        <Section.Content flex>
          <h1>{props.category.name.fr}</h1>
          <ShareButton title />
        </Section.Content>
      </Section>
      <CategoryList category={props.category} />
    </Web>
  ) : null
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
