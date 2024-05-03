import React from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import ToolCard from 'components/cards/ToolCard'
import { tools } from 'components/cards/tools'
import Block from 'components/layout/web/Block'
import styles from '../CategoryPage.module.css'
import Etiquette from '../etiquettes/Etiquette'
import Equivalent from './Equivalent'
import Infography from './infographies/Infography'
import { infographies } from './infographies/list'

const EquivalentPage = ({ category, equivalent }: { category: Category; equivalent: ComputedEquivalent }) => {
  const tool = tools.find((tool) => tool.slug === category.slug)
  return (
    <>
      <Breadcrumbs
        current={formatName(equivalent.name, 1, true)}
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
          { label: category.name, link: `/outils/${category.slug}` },
        ]}
      />
      <Block title={formatName(equivalent.name, 1, true)} as='h1' description="Détail de l'impact carbone">
        <Equivalent category={category} equivalent={equivalent} />
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
