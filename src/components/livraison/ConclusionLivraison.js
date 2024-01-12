import styled from 'styled-components'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import { Emojis } from 'components/visualizations/Visualization.styles'

export default function ConclusionLivraison() {
  return (
    <Section>
      <SectionWideContent>
        <UpperBubble>
          <Icon>
            <Emojis>📖</Emojis>
          </Icon>
        </UpperBubble>
      </SectionWideContent>
      <Section $theme='color' $noGutter>
        <SectionWideContent>
          <SimpleText>
            Pour plus de conseils,{' '}
            <Link
              priority='secondary-dark'
              title='télécharger le guide de l’ADEME - Nouvelle fenêtre'
              href='https://librairie.ademe.fr/cadic/4466/guide-pratique-econsommateur-responsable.pdf'>
              télécharger le guide de l’ADEME « E-consommateur & responsable »
            </Link>
          </SimpleText>
        </SectionWideContent>
      </Section>
    </Section>
  )
}

const SimpleText = styled.div`
  color: var(--neutral-80);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  svg {
    margin-left: 0.25rem;
  }
`

const UpperBubble = styled.div`
  position: relative;
`

const Icon = styled.div`
  background: #ebf2ff;
  border-radius: 16px;
  position: absolute;
  top: -24px;
  > span {
    display: block;
    font-size: 2rem;
    margin-bottom: 0;
    padding: 0.5rem;
    text-align: left;
  }
`
