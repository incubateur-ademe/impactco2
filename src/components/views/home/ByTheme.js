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
            <div>
              <ThemeCard slug='usagenumerique' />
              <ThemeCard slug='chauffage' />
              <ThemeCard slug='transport' />
              <ThemeCard slug='repas' />
              <ThemeCard slug='habillement' />
              <ThemeCard slug='boisson' />
            </div>
            <div>
              <ThemeCardBlue1>&nbsp;</ThemeCardBlue1>
              <ThemeCard slug='mobilier' />
              <ThemeCard slug='electromenager' />
              <ThemeCard slug='livraison' />
              <ThemeCardBlue2 />
            </div>
          </ThemeCards>
        </div>
      </SectionWideContent>
    </Section>
  )
}

const ThemeCards = styled.div`
  > div {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 1rem;
    div + div {
      margin-left: 0.5rem;
    }
    ${(props) => props.theme.mq.large} {
      flex-direction: column;
      margin-top: 0;
      margin-bottom: 1rem;
      width: 200px;
      div + div {
        margin-left: 0;
      }
    }
    > div + div {
      ${(props) => props.theme.mq.large} {
        margin-top: 1rem;
      }
    }
  }
`

const ThemeCardBlue1 = styled.div`
  background: linear-gradient(90deg, #ebf2ff -0.22%, #ccdcfd 99.78%);
  border-radius: 8px;
  width: 150px;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`
const ThemeCardBlue2 = styled.div`
  background: linear-gradient(270deg, #ebf2ff -0.22%, #ccdcfd 99.78%);
  border-radius: 8px;
  width: 150px;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`
