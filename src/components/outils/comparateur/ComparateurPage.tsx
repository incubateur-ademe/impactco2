import { Suspense } from 'react'
import Sources from 'components/base/Sources'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import { smallTools } from 'components/cards/tools'
import Examples from 'components/examples/Examples'
import FAQs from 'components/faq/FAQs'
import Block from 'components/layout/Block'
import ToolCard, { ToolCardProps } from 'src/components/cards/ToolCard'
import Comparateur from './Comparateur'
import styles from '../CategoryPage.module.css'

const toolEtiquette = smallTools.find((tool) => tool.slug === 'etiquettes') as ToolCardProps

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
      <Block>
        <ToolCard {...toolEtiquette} horizontal asDiv />
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
