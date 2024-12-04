import React, { ReactNode, Suspense } from 'react'
import { Category as CategoryType } from 'types/category'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
import Category from './Category'
import styles from './CategoryPage.module.css'
import ExtraSimulator from './ExtraSimulator'

const CategoryPage = ({
  category,
  simulator,
  extraSimulator,
}: {
  category: CategoryType
  simulator?: ReactNode
  extraSimulator?: {
    slug: string
    tracking: string
    title: string
    description: string
    simulator: ReactNode
    small?: boolean
  }
}) => {
  return (
    <>
      <Breadcrumbs
        current={category.name}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block title={category.name} as='h1' description={category.description}>
        <Category category={category} simulator={simulator} />
        {category.sources && <Sources className={styles.sources} sources={category.sources} tracking={category.name} />}
      </Block>
      {extraSimulator && <ExtraSimulator simulator={extraSimulator}>{extraSimulator.simulator}</ExtraSimulator>}
      <Suspense>
        <Examples
          title='Exemples'
          description={category.examples || 'Ils utilisent nos outils à la perfection.'}
          filter={category.name}
          tool={category.tool}
        />
        <Suspense />
        <FAQs filter={category.name} page={category.name} />
      </Suspense>
    </>
  )
}

export default CategoryPage
