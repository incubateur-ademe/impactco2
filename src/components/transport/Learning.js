import React, { useRef } from 'react'
import styled from 'styled-components'
import AnimatedNumber from 'animated-number-react'

import useOnScreen from 'hooks/useOnScreen'

import Button from 'components/base/Button'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  width: 47rem;
  max-width: 100%;
  margin: 5rem auto;
  padding: 0 5rem 2rem;

  ${(props) => props.theme.mq.small}  {
    padding: 0 0.75rem 5rem;
  }
`
const Content = styled.div`
  position: relative;
`
const Statistic = styled.div`
  margin-bottom: 1em;
  font-size: 4.3rem;
  font-weight: bold;
  line-height: 0.9;
  text-align: right;

  ${(props) => props.theme.mq.small} {
    font-size: 3.5rem;
    text-align: center;
  }
`
const FirstLine = styled.div``
const Number = styled.span`
  font-size: 14.5rem;
  text-align: right;
  color: ${(props) => props.theme.colors.main};
  opacity: ${(props) => (props.isOnScreen ? 1 : 0)};
  transition: opacity 1000ms;

  ${(props) => props.theme.mq.small} {
    display: block;
    font-size: 46.5vw;
  }
`
const BigText = styled.div``
const Color = styled.span`
  color: ${(props) => props.theme.colors.main};
`
const Strong = styled.p`
  font-size: 1.45rem;
  font-weight: 700;
  font-style: italic;

  ${(props) => props.theme.mq.small} {
    margin-left: 0;
  }
`
const Text = styled.p``
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`
export default function Learning() {
  const ref = useRef()
  const isOnScreen = useOnScreen(ref, '-100px')

  return (
    <Wrapper id='informations'>
      <Content>
        <Statistic ref={ref}>
          <FirstLine>
            <Number isOnScreen={isOnScreen}>
              {isOnScreen ? (
                <AnimatedNumber
                  value={30}
                  formatValue={(value) => Math.round(value) + '%'}
                />
              ) : (
                '0%'
              )}
            </Number>
            des
          </FirstLine>
          <BigText>
            émissions de <Color>CO2</Color>
          </BigText>
        </Statistic>
        <Strong>
          "Hors confinement", le secteur des transports est le 1er secteur
          émetteur de gaz à effet de serre.
        </Strong>
        <Text>
          Jusqu’à peu, se déplacer faisait partie intégrante de notre vie
          sociale et professionnelle. À tel point que tout notre environnement
          est structuré autour des transports. Tout invite au voyage, qu’il soit
          court ou long. Mais comment révolutionner nos trajets ? Découvrez des
          pistes de réflexion avec cette{' '}
          <MagicLink to='https://multimedia.ademe.fr/infographies/infographie-la-mobilite-ademe/'>
            infographie de l'ADEME
          </MagicLink>
        </Text>

        <Text>
          Si vous souhaitez aller plus loin dans votre démarche, vous pouvez
          calculer l'ensemble de votre empreinte sur le climat grace à notre{' '}
          <MagicLink to={'https://nosgestesclimat.fr/'}>
            simulateur Nos Gestes Climat
          </MagicLink>
        </Text>
        <ButtonWrapper>
          <Button to={'https://nosgestesclimat.fr/'}>
            Découvrir Nos Gestes Climat
          </Button>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  )
}
