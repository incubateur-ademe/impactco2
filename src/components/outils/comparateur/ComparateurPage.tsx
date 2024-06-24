import React, { Suspense } from 'react'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
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
      <Suspense>
        <Examples
          title='Exemples'
          description='Ils utilisent le comparateur ou les étiquettes avec brio.'
          link='/doc/exemples'
          linkLabel='Tous les exemples'
          filter='Comparateur carbone'
        />
      </Suspense>
      <Suspense>
        <FAQs filter='Comparateur carbone' page='Comparateur carbone' />
      </Suspense>
    </>
  )
}

export default ComparateurPage
