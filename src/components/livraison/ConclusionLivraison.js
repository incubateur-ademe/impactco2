import styled from 'styled-components'
import OutboundLink from 'components/base/OutboundLink'
import { Section2, Section2InnerMargin } from 'components/base/Section2'
import { Emojis } from 'components/visualizations/Visualization.styles'

export default function ConclusionLivraison() {
  return (
    <>
      <Wrapper>
        <Section2>
          <Section2InnerMargin>
            <UpperBubble>
              <Icon>
                <Emojis>📖</Emojis>
              </Icon>
            </UpperBubble>
            <TextContainer>
              <SimpleText>
                Pour plus de conseils,{' '}
                <OutboundLink
                  title='télécharger le guide de l’ADEME - Nouvelle fenêtre'
                  href='https://librairie.ademe.fr/cadic/4466/guide-pratique-econsommateur-responsable.pdf'>
                  télécharger le guide de l’ADEME « E-consommateur & responsable »
                </OutboundLink>
              </SimpleText>
            </TextContainer>
          </Section2InnerMargin>
        </Section2>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  background-color: #ebf2ff;
  margin-top: 2.5rem;
`

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
  top: -21px;
  > span {
    display: block;
    font-size: 2rem;
    margin-bottom: 0;
    padding: 0.25rem;
    padding-top: 0.1rem;
    text-align: left;
  }
`

const TextContainer = styled.div`
  padding: 1.5rem 0 1.5rem 3rem;
`
