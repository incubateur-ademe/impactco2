import React from 'react'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Block from 'components/layout/web/Block'
import Sources from 'components/misc/category/Sources'
import styles from '../CategoryPage.module.css'
import Comparateur from './Comparateur'
import Etiquettes from './Etiquettes'

const ComparateurPage = () => {
  return (
    <>
      <Breadcrumbs
        current='Comparateur carbone'
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'Les outils', link: '/outils' },
        ]}
      />
      <Block title='Comparateur carbone' as='h1' description='Le bon outil pour obtenir les bons ordres de grandeur'>
        <Comparateur />
        <Sources
          className={styles.sources}
          sources={[
            {
              label: 'Base Empreinte ADEME',
              href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees',
            },
          ]}
          tracking='Comparateur'
        />
      </Block>
      <Block
        title='Étiquettes'
        description='Le petit format à intégrer dans vos contenus et applications.'
        id='etiquette'>
        <Etiquettes />
      </Block>
    </>
  )
}

export default ComparateurPage
