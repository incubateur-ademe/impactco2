import categories from 'data/categories.json'
import React from 'react'

import Web from 'components/layout/Web'
import Web2 from 'components/layout/Web2'
import Category from 'components/misc/Category'
import Learning from 'components/misc/Learning'

export default function CategoryPage(props) {
  return (
    <>
      {props.category.slug === 'impactlivraison' ? (
        <>
          <Web2
            title={props.category.meta.title}
            description={props.category.meta.description}
            breadcrumb={{
              type: 'equivalent',
              category: props.category,
            }}
          ></Web2>
        </>
      ) : (
        <Web
          title={props.category.meta.title}
          description={props.category.meta.description}
          breadcrumb={{
            type: 'equivalent',
            category: props.category,
          }}
        >
          <Category category={props.category} />
          <Learning category={props.category} />
        </Web>
      )}
    </>
  )
}

const independantCategories = [4, 9, 10]

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
export async function getStaticProps({ params }) {
  return {
    props: {
      category: categories?.find(
        (category) => category.slug === params.category
      ),
    },
  }
}
