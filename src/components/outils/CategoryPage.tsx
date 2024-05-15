import React from 'react'
import { Category as CategoryType } from 'types/category'
import { Example } from 'types/example'
import Reset from 'components/base/Reset'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import Block from 'components/layout/Block'
import Category from './Category'
import styles from './CategoryPage.module.css'
import ExtraSimulator from './ExtraSimulator'
import { extraSimulators } from './simulators'

const CategoryPage = ({ category, examples }: { category: CategoryType; examples: Example[] }) => {
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
        {category.resetable && <Reset slug={category.slug} />}
        {category.sources && <Sources className={styles.sources} sources={category.sources} tracking={category.name} />}
      </Block>
      {extraSimulator && (
        <Block id={extraSimulator.slug} title={extraSimulator.title} description={extraSimulator.description}>
          <ExtraSimulator tracking={extraSimulator.tracking} slug={extraSimulator.slug}>
            {extraSimulator.simulator}
          </ExtraSimulator>
        </Block>
      )}
      <Examples
        title='Exemples'
        description={category.examples || 'Ils utilisent nos outils à la perfection.'}
        link='/exemples'
        linkLabel='Tous les exemples'
        examples={examples.filter((example) => example.tags.includes(category.name))}
      />
    </>
  )
}

export default CategoryPage
