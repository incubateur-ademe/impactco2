import { useRouter } from 'next/router'
import React from 'react'
import PageTitle from 'components/base/PageTitle'
import { Section, SectionWideContent } from 'components/base/Section'
import Comparateur from 'components/comparateur/Comparateur'
import Etiquettes from 'components/comparateur/Etiquettes'
import SuggestionBanner from 'components/contact/SuggestionBanner'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'
import { Separator } from 'components/misc/category/Header.styles'
import Sources from 'components/misc/category/Sources'

const Page = () => {
  const router = useRouter()

  return (
    <Web
      title='Comparateur carbone'
      image={`/api/dynamics${router.asPath}`}
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
            Le comparateur permet à votre communauté de se représenter les bons <b>ordres de grandeur</b> d’une
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
      <Section $withoutPadding $margin='1.5rem 0'>
        <SectionWideContent $size='lg'>
          <Etiquettes />
        </SectionWideContent>
      </Section>
      <Section>
        <SectionWideContent $size='xs'>
          <Separator />
        </SectionWideContent>
      </Section>
      <Learning from='/comparateur' fromLabel='Comparateur carbone' />
      <SuggestionBanner from='/comparateur' fromLabel='Comparateur carbone' simulatorName='comparateur carbone' />
    </Web>
  )
}

export default Page
