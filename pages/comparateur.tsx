import React from 'react'
import PageTitle from 'components/base/PageTitle'
import { Section, SectionWideContent } from 'components/base/Section'
import Comparateur from 'components/comparateur/Comparateur'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'
import Sources from 'components/misc/category/Sources'

const Convertisseur = () => {
  return (
    <Web
      title='Comparateur carbone'
      description='Comparer et visualiser facilement une quantité de CO₂e grâce au comparateur d’Impact CO₂ et à ses équivalents pour avoir en tête les bons ordres de grandeur.'
      breadcrumb={{
        type: 'accueil',
        page: 'Comparateur carbone',
      }}>
      <PageTitle
        title={
          <>
            Visualisez facilement{' '}
            <span className='text-secondary'>
              une quantité de CO<sub>2</sub>e
            </span>
          </>
        }
        description={
          <>
            Le comparateur permet à vos utilisateurs de se représenter les bons <b>ordres de grandeur</b> d’une
            empreinte carbone.
          </>
        }
      />
      <Comparateur />
      <Section $withoutPadding $margin='1.5rem 0'>
        <SectionWideContent $size='xs'>
          <Sources
            tracking='Comparateur carbone'
            priority='secondary'
            sources={[{ label: 'Base Empreinte ADEME', href: 'https://base-empreinte.ademe.fr/donnees/jeu-donnees' }]}
          />
        </SectionWideContent>
      </Section>
      <Learning from='/comparateur' fromLabel='Comparateur carbone' />
      <SuggestionBanner from='/comparateur' fromLabel='Comparateur carbone' simulatorName='comparateur carbone' />
    </Web>
  )
}

export default Convertisseur
