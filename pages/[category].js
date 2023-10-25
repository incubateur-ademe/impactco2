import React from 'react'
import categories from 'data/categories.json'
import Web from 'components/layout/Web'
import WebBlue from 'components/layout/WebBlue'
import Category from 'components/misc/Category'
import Learning from 'components/misc/Learning'
import Impactlivraison from './impactlivraison'

export default function CategoryPage(props) {
  return (
    <>
      {['livraison'].includes(props.category.slug) ? (
        <>
          <WebBlue
            title={props.category.meta.title}
            description={props.category.meta.description}
            breadcrumb={{
              type: 'equivalent',
              category: props.category,
            }}>
            {props.category.slug === 'livraison' ? <Impactlivraison /> : null}
          </WebBlue>
        </>
      ) : (
        <Web
          title={props.category.meta.title}
          description={props.category.meta.description}
          breadcrumb={{
            type: 'equivalent',
            category: props.category,
          }}>
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
  const category = categories?.find((category) => category.slug === params.category)
  return {
    props: {
      category,
    },
  }
}
