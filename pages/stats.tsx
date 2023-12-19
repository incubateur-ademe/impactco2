import React from 'react'
import styled from 'styled-components'
import OutboundLink from 'components/base/OutboundLink'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'

const FormatText = styled.div`
  margin-bottom: 5rem;
  h1 {
    font-size: 3rem;
  }
  > h2 {
    margin-top: 3rem;
  }
`

export default function Statistiques() {
  return (
    <Web title='Statistiques'>
      <Section>
        <SectionWideContent>
          <FormatText>
            <h1>Statistiques</h1>
            <h2>Information</h2>
            <p>
              <OutboundLink href='https://stats.data.gouv.fr/index.php?module=CoreHome&action=index&date=yesterday&period=week&idSite=156#?idSite=156&period=week&date=yesterday&category=Dashboard_Dashboard&subcategory=6'>
                Découvrez les statistiques du site Impact CO<sub>2</sub> sur le tableau de bord de notre outil de suivi
                Matomo
              </OutboundLink>
            </p>
          </FormatText>
        </SectionWideContent>
      </Section>
    </Web>
  )
}
