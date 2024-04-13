import React from 'react'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import ToolCard from 'components/cards/ToolCard'
import Block from 'components/layout/web/Block'
import styles from './Doc.module.css'

const Doc = () => {
  return (
    <>
      <Breadcrumbs current='La doc' links={[{ link: '/', label: 'Accueil' }]} />
      <Block title='La doc' as='h1' description='Un peu de lecture pour vous emparer plus facilement de nos outils.'>
        <div className={styles.docs}>
          <ToolCard
            slug='guide'
            horizontal
            image='/images/doc-guide.svg'
            title="Guide d'utilisation"
            description='Suivre le guide pour prendre en main les outils d’impact CO2'
            linkLabel='Accéder'
            link='/guide-utilisation'
          />
          <ToolCard
            slug='faq'
            horizontal
            image='/images/doc-faq.svg'
            title='Questions fréquentes'
            description='Explorer la FAQ pour trouver les réponses à vos questions'
            linkLabel='Consulter'
            link='/questions-frequentes'
          />
          <ToolCard
            slug='gallery'
            horizontal
            image='/images/doc-gallery.svg'
            title='Exemples d’utilisation'
            description='Pour s’inspirer et découvrir comment nos outils sont utilisés'
            linkLabel='Découvrir'
            link='/examples'
          />
        </div>
      </Block>
    </>
  )
}

export default Doc
