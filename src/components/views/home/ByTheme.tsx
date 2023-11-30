import React from 'react'
import styled from 'styled-components'
import { Section, SectionWideContent } from 'components/base/Section'
import ThemeCard from './ThemeCard'
import Header from './heading/Header'

export default function ByTheme() {
  return (
    <Section $theme='color'>
      <SectionWideContent>
        <Header
          title={
            <>
              <span>
                Identifier la <b>thématique environnementale&nbsp;</b>
              </span>
              <span>à aborder dans vos contenus</span>
            </>
          }
          cta={{ to: '/thematiques', label: 'Explorer les thématiques' }}
        />
        <div>
          <ThemeCards>
            <ThemeCard slug='usagenumerique' />
            <ThemeCard slug='chauffage' />
            <ThemeCard slug='transport' />
            <ThemeCard slug='repas' />
            <ThemeCard slug='habillement' />
            <ThemeCard slug='boisson' />
            <ThemeCard slug='fruitsetlegumes' />
            <ThemeCard slug='mobilier' />
            <ThemeCard slug='electromenager' />
            <ThemeCard slug='livraison' />
            <ThemeCard slug='numerique' />
          </ThemeCards>
        </div>
      </SectionWideContent>
    </Section>
  )
}

const ThemeCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin: auto;
  max-width: 1000px;
`
