import React from 'react'
import { track } from 'utils/matomo'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'
import Tiles from 'components/misc/Tiles'
import { Sources } from 'components/misc/category/CategoryWrapper.styles'

const Convertisseur = () => {
  return (
    <Web
      title='Comparateur carbone'
      description='Comparer et visualiser facilement une quantité de CO₂e grâce au comparateur d’Impact CO₂ et à ses équivalents pour avoir en tête les bons ordres de grandeur.'
      breadcrumb={{
        type: 'accueil',
        page: 'Comparateur carbone',
      }}>
      <Tiles
        title={
          <>
            Visualisez facilement une quantité de CO<sub>2</sub>e
          </>
        }
      />
      <Section $withoutPadding>
        <SectionWideContent $size='xs'>
          <Sources>
            Source :{' '}
            <Link
              href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'
              color='secondary'
              onClick={() => track('Comparateur', 'Source', 'https://base-empreinte.ademe.fr/donnees/jeu-donnees')}>
              Base Empreinte ADEME
            </Link>
          </Sources>
        </SectionWideContent>
      </Section>
      <Learning />
    </Web>
  )
}

export default Convertisseur
