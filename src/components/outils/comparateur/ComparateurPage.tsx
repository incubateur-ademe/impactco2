import React from 'react'
import { Example } from 'types/example'
import { FAQ } from 'types/faq'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
import styles from '../CategoryPage.module.css'
import Comparateur from './Comparateur'
import Etiquettes from './Etiquettes'

const ComparateurPage = ({ examples, faqs }: { examples: Example[]; faqs: FAQ[] }) => {
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
      <Examples
        title='Exemples'
        description='Ils utilisent le comparateur ou les étiquettes avec brio.'
        link='/doc/exemples'
        linkLabel='Tous les exemples'
        examples={examples.filter((example) => example.tags.includes('Comparateur carbone'))}
      />
      <FAQs faqs={faqs.filter((faq) => faq.pages.includes('Comparateur carbone'))} page='Comparateur carbone' />
    </>
  )
}

export default ComparateurPage
