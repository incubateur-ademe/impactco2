import React from 'react'
import { Category as CategoryType } from 'types/category'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Block from 'components/layout/web/Block'
import Category from './Category'
import styles from './CategoryPage.module.css'
import ExtraSimulator from './ExtraSimulator'
import { extraSimulators } from './simulators'

const CategoryPage = ({ category }: { category: CategoryType }) => {
  const extraSimulator = extraSimulators[category.slug]
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
        <Category category={category} />
        {category.sources && <Sources className={styles.sources} sources={category.sources} tracking={category.name} />}
      </Block>
      {extraSimulator && (
        <Block id={extraSimulator.slug} title={extraSimulator.title} description={extraSimulator.description}>
          <ExtraSimulator tracking={extraSimulator.tracking} slug={extraSimulator.slug}>
            {extraSimulator.simulator}
          </ExtraSimulator>
        </Block>
      )}
      <Block
        title='Exemples'
        description='Ils utilisent nos outils à la perfection.'
        link='/exemples'
        linkLabel='Tous les exemples'>
        TODO
      </Block>
    </>
  )
}

export default CategoryPage
