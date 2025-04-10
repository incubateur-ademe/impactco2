import { Suspense } from 'react'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
import styles from '../CategoryPage.module.css'
import SimulatorsCards from '../SimulatorsCards'
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
        <SimulatorsCards
          tracking='Livraison'
          title='Le comparateur'
          subTitle="L'outil de référence pour comparer une quantité de kg CO₂e avec des équivalents issus du quotidien."
          extraTitle='Les étiquettes'
          extraSubTitle="Ce format mini permet d'illustrer les quantités carbone avec des exemples parlants."
          extraLink='#etiquette'
        />
      </Block>
      <Block
        title='Comparateur'
        description='Comparer une quantité de kg CO₂e avec plus de 200 équivalents'
        id='simulateur'>
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
          filter='Comparateur carbone'
          tool='Comparateur carbone'
        />
      </Suspense>
      <Suspense>
        <FAQs filter='Comparateur carbone' page='Comparateur carbone' />
      </Suspense>
    </>
  )
}

export default ComparateurPage
