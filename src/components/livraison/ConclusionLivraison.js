import styled from 'styled-components'
import OutboundLink from 'components/base/OutboundLink'
import { Section, SectionWideContent } from 'components/base/Section'
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
            <OutboundLink
              title='télécharger le guide de l’ADEME - Nouvelle fenêtre'
              href='https://librairie.ademe.fr/cadic/4466/guide-pratique-econsommateur-responsable.pdf'>
              télécharger le guide de l’ADEME « E-consommateur & responsable »
            </OutboundLink>
          </SimpleText>
        </SectionWideContent>
      </Section>
    </Section>
  )
}

const SimpleText = styled.div`
  color: ${(props) => props.theme.colors.deepDark};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  > a {
    color: ${(props) => props.theme.colors.firstBlue};
  }
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
