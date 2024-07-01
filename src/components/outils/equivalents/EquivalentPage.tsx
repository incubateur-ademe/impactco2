import React, { ReactNode } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import ToolCard from 'components/cards/ToolCard'
import { tools } from 'components/cards/tools'
import Block from 'components/layout/Block'
import styles from '../CategoryPage.module.css'
import Etiquette from '../etiquettes/Etiquette'
import Equivalent from './Equivalent'
import Infography from './infographies/Infography'
import { infographies } from './infographies/list'

const EquivalentPage = ({
  category,
  equivalent,
  simulator,
}: {
  category: Category
  equivalent: ComputedEquivalent
  simulator?: ReactNode
}) => {
  const tool = tools.find((tool) => tool.slug === category.slug)
  return (
    <>
      <Breadcrumbs
        current={getName('fr', equivalent)}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
          { label: category.name, link: `/outils/${category.slug}` },
        ]}
      />
      <Block title={getName('fr', equivalent)} as='h1' description="Détail de l'impact carbone">
        <Equivalent category={category} equivalent={equivalent} simulator={simulator} />
        {category.sources && <Sources className={styles.sources} sources={category.sources} tracking={category.name} />}
      </Block>
      {infographies[equivalent.slug] && (
        <Block title='Infographie' description='Une image vaut mieux que mille mots'>
          <Infography equivalent={equivalent} equivalents={infographies[equivalent.slug]} />
        </Block>
      )}
      <Block title='Étiquette' description='Le petit format à intégrer dans vos contenus et applications.'>
        <Etiquette equivalent={equivalent} />
      </Block>
      {tool && (
        <Block>
          <ToolCard
            horizontal
            title={tool.title}
            description={tool.description}
            slug={tool.slug}
            linkLabel={tool.linkLabel}
          />
        </Block>
      )}
    </>
  )
}

export default EquivalentPage
